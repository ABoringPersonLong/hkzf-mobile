import './index.scss'
import {useEffect} from 'react'

// 按需导入 antd-mobile 组件库
import {Toast} from 'antd-mobile'

// 导入封装的顶部导航栏组件
import NavHeader from '../../components/NavHeader'

// Map 组件
const Map = () => {
  // 初始化地图
  const initMap = () => {
    // 获取当前定位的城市
    const {label, value} = JSON.parse(localStorage.getItem('hkzf_city') + '')

    // 注意：在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
    // @ts-ignore
    const map = new window.BMapGL.Map("allmap")
    // 使用地址解析器获取经纬度
    // @ts-ignore
    new window.BMapGL.Geocoder().getPoint(label, (point: any) => {
      if (point) {
        map.centerAndZoom(point, 11)

        // 添加控件
        // @ts-ignore
        map.addControl(new window.BMapGL.ScaleControl()) // 添加比例尺控件
        // @ts-ignore
        map.addControl(new window.BMapGL.ZoomControl()) // 添加缩放控件

        // 添加文本标注
        // @ts-ignore
        const label = new window.BMapGL.Label('文本遮盖物', {
          position: point, // 设置标注的地理位置
          // @ts-ignore
          offset: new window.BMapGL.Size(10, 20) // 设置标注的偏移量
        })
        map.addOverlay(label) // 将文本标注添加到地图中

        // 设置文本标注的样式
        label.setStyle({
          color: '#000',
          fontSize: '30px',
          border: '2px solid #1E90FF'
        })

        // 监听文本标注点击事件
        label.addEventListener("click", () => {
          alert('您点击了标注')
        })
      } else Toast.show('您选择的地址没有解析到结果！')
    }, label)
  }

  // 组件挂载时执行
  useEffect(() => {
    initMap()
  }, [])

  return (
    <div className="map-container">
      <NavHeader>地图找房</NavHeader>
      <div id='allmap'></div>
    </div>
  )
}

export default Map
