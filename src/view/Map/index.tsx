import './index.scss'
import styles from './index.module.css'
import {useEffect, useState} from 'react'

// 按需导入 antd-mobile 组件库
import {Toast} from 'antd-mobile'

// 导入封装的顶部导航栏组件
import NavHeader from '../../components/NavHeader'

// 按需导入 areaAPI 模块
import {getMapAPI} from '../../api/areaAPI'
// 按需导入 housesAPI 模块
import {getHousesAPI} from '../../api/housesAPI'

// 房源的类型
type mapType = { label: string; value: string; coord: { latitude: string; longitude: string }; count: number }

// Map 组件
const Map = () => {
  // 小区下的房源列表
  const [housesList, setHousesList] = useState([])
  // 表示是否展示房源列表
  const [isShowList, setIsShowList] = useState(false)

  let map: any = null

  // 初始化地图
  const initMap = () => {
    // 获取当前定位的城市
    const {label, value} = JSON.parse(localStorage.getItem('hkzf_city') + '')

    // 注意：在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
    // @ts-ignore
    map = new window.BMapGL.Map("allmap")
    // 使用地址解析器获取经纬度
    // @ts-ignore
    new window.BMapGL.Geocoder().getPoint(label, async (point: any) => {
      if (point) {
        map.centerAndZoom(point, 11)

        // 添加控件
        // @ts-ignore
        map.addControl(new window.BMapGL.ScaleControl()) // 添加比例尺控件
        // @ts-ignore
        map.addControl(new window.BMapGL.ZoomControl()) // 添加缩放控件

        // 将以下注释的内容封装成几个方法，然后调用
        renderOverlays(value)

        // // 获取房源数据
        // const {data} = await getMapAPI(value)
        // if (data.status !== 200) return Toast.show(data.description)
        //
        // // 为每一条数据创建房源覆盖物ll
        // data.body.forEach((item: mapType) => {
        //   const {label: areaName, value, coord: {longitude, latitude}, count} = item
        //
        //   // 获取标注的地理位置（经纬度）
        //   // @ts-ignore
        //   const areaPoint = new window.BMapGL.Point(longitude, latitude)
        //
        //   // 添加文本标注
        //   // @ts-ignore
        //   const label = new window.BMapGL.Label('', {
        //     // @ts-ignore
        //     position: areaPoint, // 设置标注的地理位置
        //     // @ts-ignore
        //     offset: new window.BMapGL.Size(-35, -35) // 设置标注的偏移量
        //   })
        //
        //   // 给 label 对象添加一个唯一标识
        //   label.id = value
        //
        //   // 设置房源覆盖物内容
        //   label.setContent(`
        //   <div class="${styles.bubble}">
        //     <p class="${styles.name}">${areaName}</p>
        //     <p>${count}套</p>
        //   </div>
        // `)
        //
        //   // 设置遮盖物的样式
        //   label.setStyle({
        //     border: '0 solid rgb(255, 0, 0)',
        //     padding: '0',
        //     color: 'rgb(255, 255, 255)',
        //     fontSize: '12px',
        //     cursor: 'pointer',
        //     whiteSpace: 'nowrap',
        //     textAlign: 'center'
        //   })
        //
        //   // 监听文本标注点击事件
        //   label.addEventListener("click", () => {
        //     // 以当前点击的覆盖物为中心放大地图
        //     map.centerAndZoom(areaPoint, 13)
        //     // 清除当前覆盖物信息
        //     map.clearOverlays()
        //   })
        //
        //   // 将文本标注添加到地图中
        //   map.addOverlay(label)
        // })
      } else Toast.show('您选择的地址没有解析到结果！')
    }, label)

    // 移动地图隐藏房源列表
    map.addEventListener('movestart', () => {
      // 不知道为什么，状态里是 true，这里获取到的是 false
      // if (isShowList) setIsShowList(false)
      setIsShowList(false)
    })
  }

  // 渲染覆盖物入口
  // 1 接收区域 id 参数，获取该区域下的房源数据
  // 2 获取房源类型以及下级地图缩放级别
  const renderOverlays = async (id: string) => {
    try {
      Toast.show({icon: 'loading', content: '加载中...', duration: 0})
      // 获取房源数据
      const {data} = await getMapAPI(id)
      if (data.status !== 200) return Toast.show(data.description)

      // 调用 getTypeAndZoom 方法获取级别和类型
      const {nextZoom, type} = getTypeAndZoom()

      // 创建覆盖物
      data.body.forEach((item: mapType) => {
        createOverlays(item, nextZoom, type)
      })
      Toast.clear()
    } catch (e) {
      Toast.clear()
    }
  }

  // 计算要绘制的覆盖物类型和下一个缩放级别
  const getTypeAndZoom = () => {
    // 调用地图的 getZoom() 方法，来获取当前缩放级别
    const zoom = map.getZoom()
    let nextZoom = 0, type = ''

    // 区   -> 11 ，范围：>=10 <12
    // 镇   -> 13 ，范围：>=12 <14
    // 小区 -> 15 ，范围：>=14 <16
    if (zoom >= 10 && zoom < 12) { // 区
      // 下一个缩放级别
      nextZoom = 13
      // circle 表示绘制圆形覆盖物（区、镇）
      type = 'circle'
    } else if (zoom >= 12 && zoom < 14) { // 镇
      nextZoom = 15
      type = 'circle'
    } else if (zoom >= 14 && zoom < 16) type = 'rect' // 小区

    return {nextZoom, type}
  }

  // 创建覆盖物
  const createOverlays = (data: mapType, zoom: number, type: string) => {
    const {label, value, coord: {longitude, latitude}, count} = data

    // 获取标注的地理位置（经纬度）
    // @ts-ignore
    const point = new window.BMapGL.Point(longitude, latitude)

    if (type === 'circle') createCircle(point, label, value, count, zoom) // 区或镇
    else createRect(point, label, value, count) // 小区
  }

  // 创建区、镇覆盖物
  const createCircle = (point: any, name: string, id: string, count: number, zoom: number) => {
    // 添加文本标注
    // @ts-ignore
    const label = new window.BMapGL.Label('', {
      // @ts-ignore
      position: point, // 设置标注的地理位置
      // @ts-ignore
      offset: new window.BMapGL.Size(-35, -35) // 设置标注的偏移量
    })

    // 给 label 对象添加一个唯一标识
    label.id = id

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.bubble}">
        <p class="${styles.name}">${name}</p>
        <p>${count}套</p>
      </div>
    `)

    // 设置遮盖物的样式
    label.setStyle({
      border: '0 solid rgb(255, 0, 0)',
      padding: '0',
      color: 'rgb(255, 255, 255)',
      fontSize: '3.2vw',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'center'
    })

    // 监听文本标注点击事件
    label.addEventListener("click", () => {
      // 以当前点击的覆盖物为中心放大地图
      map.centerAndZoom(point, zoom)
      setTimeout(() => { // 为了防止点太快，延迟 100 毫秒再执行
        // 清除当前覆盖物信息
        map.clearOverlays()
        // 调用 renderOverlays 方法，获取该区域下的房源数据
        renderOverlays(id)
      }, 100)
    })

    // 将文本标注添加到地图中
    map.addOverlay(label)
  }

  // 创建小区覆盖物
  const createRect = (point: any, name: string, id: string, count: number) => {
    // 添加文本标注
    // @ts-ignore
    const label = new window.BMapGL.Label('', {
      // @ts-ignore
      position: point, // 设置标注的地理位置
      // @ts-ignore
      offset: new window.BMapGL.Size(-50, -28) // 设置标注的偏移量
    })

    // 给 label 对象添加一个唯一标识
    label.id = id

    // 设置房源覆盖物内容
    label.setContent(`
      <div class="${styles.rect}">
        <span class="${styles.housename}">${name}</span>
        <span class="${styles.housenum}">${count}套</span>
        <i class="${styles.arrow}"></i>
      </div>
    `)

    // 设置遮盖物的样式
    label.setStyle({
      border: '0 solid rgb(255, 0, 0)',
      padding: '0',
      color: 'rgb(255, 255, 255)',
      fontSize: '12px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textAlign: 'center'
    })

    // 监听文本标注点击事件
    label.addEventListener("click", () => {
      getHousesList(id)

      // 点击房源信息将房源信息移动到屏幕中间
      // 不知道为什么没有 changedTouches[0]
      // const target = event.changedTouches[0]
      // map.panBy(window.innerWidth / 2 - target.clientX, (window.innerHeight - 330) / 2 - target.clientY)
    })

    // 将文本标注添加到地图中
    map.addOverlay(label)
  }

  // 获取小区房源数据
  const getHousesList = async (id: string) => {
    try {
      Toast.show({icon: 'loading', content: '加载中...', duration: 0})
      const {data} = await getHousesAPI(id)
      Toast.clear()
      setHousesList(data.body.list)
      setIsShowList(true)
    } catch (e) {
      Toast.clear()
    }
  }

  // 封装渲染房屋列表的函数
  const renderHousesList = () => {
    return housesList.map((item: { houseImg: string; title: string; tags: string[]; price: number; desc: string; houseCode: string }) => (
      <div className={styles.house} key={item.houseCode}>
        <div className={styles.imgWrap}>
          <img className={styles.img} src={`http://localhost:8080${item.houseImg}`} alt=""/>
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.desc}>{item.desc}</div>
          <div>
            {
              item.tags.map((tag, index) => (
                // 第一个 tag
                <span className={[styles.tag, styles['tag' + (index + 1)]].join(' ')} key={tag}>{tag}</span>
              ))
            }
          </div>
          <div className={styles.price}>
            <span className={styles.priceNum}>{item.price}</span> 元/月
          </div>
        </div>
      </div>
    ))
  }

  // 组件挂载时执行
  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="map-container">
      {/* 顶部导航栏 */}
      <NavHeader>地图找房</NavHeader>
      {/* 地图 */}
      <div id='allmap'></div>
      {/* 房源列表 */}
      <div className={[styles.houseList, isShowList ? styles.show : ''].join(' ')}>
        <div className={styles.titleWrap}>
          <h1 className={styles.listTitle}>房屋列表</h1>
          <a className={styles.titleMore} href="/house/list">更多房源</a>
        </div>
        <div className={styles.houseItems}>
          {/* 房源结构 */}
          {renderHousesList()}
        </div>
      </div>
    </div>
  )
}

export default Map
