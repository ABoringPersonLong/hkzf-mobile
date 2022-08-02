import './index.scss'
import {useEffect, useRef, useState} from 'react'
import {useNavigate} from 'react-router-dom'

// 按需导入 antd-mobile 组件库
import {Toast} from 'antd-mobile'

// 按需导入 react-virtualized 组件
// @ts-ignore
import {AutoSizer, List} from 'react-virtualized'

// 按需导入 areaAPI 模块
import {getCityAPI, getHotAPI} from '../../api/areaAPI'
// 导入获取当前城市方法
import {getCurrentCity} from '../../utils'

// 导入封装的顶部导航栏组件
import NavHeader from '../../components/NavHeader'

// 城市的类型
type cityType = { label: string; value: string; pinyin: string; short: string }

// 格式化城市列表数据的函数
const formatCityData = (list: cityType[]) => {
  const cityList: { [key: string]: cityType[] } = {} // 渲染城市列表的数据格式

  list.forEach(item => {
    const first = item.short.substring(0, 1)
    if (cityList[first]) cityList[first].push(item)
    else cityList[first] = []
  })

  const cityIndex: string[] = Object.keys(cityList).sort() // 渲染右侧索引的数据格式

  return {
    cityList,
    cityIndex
  }
}

// 处理字母索引的函数
const formatCityIndex = (letter: string) => {
  switch (letter) {
    case '#':
      return '当前城市'
    case 'hot':
      return '热门城市'
    default:
      return letter.toUpperCase()
  }
}

// 索引（A、B、等）的高度
const TITLE_HEIGHT = 36
// 每个城市名称的高度
const NAME_HEIGHT = 50

// 有房源的城市
const HOUSE_CITY = ['北京', '上海', '广州', '深圳']

// CityList 组件
const CityList = () => {
  // 城市列表数据
  const [cityList, setCityList]: any = useState({})
  // 右侧索引数据
  const [cityIndex, setCityIndex]: any = useState([])
  // 当前高亮的索引
  const [activeIndex, setActiveIndex]: any = useState(0)

  // 使用编程式跳转
  const navigate = useNavigate()

  // 创建城市列表组件的 ref 对象
  const ListRef = useRef(null)

  // 初始化城市列表数据
  const initCityData = async () => {
    // 获取城市列表数据，并格式化出 cityList 和 cityIndex 两个列表
    const {data} = await getCityAPI(1)
    if (data.status !== 200) Toast.show(data.description)
    const {cityList, cityIndex} = formatCityData(data.body)

    // 获取热门城市数据
    const response = await getHotAPI()
    if (response.data.status !== 200) return Toast.show(response.data.description)
    cityList['hot'] = response.data.body
    cityIndex.unshift('hot')

    // 获取当前城市
    const curCity: any = await getCurrentCity()
    cityList['#'] = [curCity]
    cityIndex.unshift('#')
    setCityList(cityList)
    setCityIndex(cityIndex)
  }

  // 点击切换城市
  const changeCity = ({label, value}: { label: string; value: string }) => {
    // 判断点击的是否是有房源的城市（目前只有北京、广州、上海、深圳有房源）
    if (HOUSE_CITY.includes(label)) {
      localStorage.setItem('hkzf_city', JSON.stringify({label, value}))
      navigate(-1)
    } else Toast.show('该城市暂无房源信息')
  }

  // 渲染每一条数据的函数
  const rowRenderer = ({key, index, style}: { key: string; index: number; style: object }) => {
    let letter = cityIndex[index]
    return (
      <div key={key} style={style} className='city'>
        <div className='title'>{formatCityIndex(letter)}</div>
        {cityList[letter].map((item: cityType) => (
          <div className='name' key={item.value} onClick={() => changeCity(item)}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }

  // 动态计算每一行的高度
  const getRowHeight = ({index}: { index: number }) => {
    return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
  }

  // 渲染城市索引列表的函数
  const renderCityIndex = () => {
    return (
      cityIndex.map((item: string, index: number) => (
        <li className='city-index-item' key={item} onClick={() => {
          // @ts-ignore
          ListRef.current.scrollToRow(index) // 让 List 组件跳转到指定行，必须是在页面中显示过的，不然有精确度问题
        }}>
          <span className={index === activeIndex ? 'index-active' : ''}>
            {item === 'hot' ? '热' : item.toUpperCase()}
          </span>
        </li>
      ))
    )
  }

  // 滚动城市列表让对应索引高亮
  const rowsRendered = ({startIndex}: { startIndex: number }) => {
    if (startIndex !== activeIndex) setActiveIndex(startIndex)
  }

  // 为了在使用 useEffect 时能够同步执行
  const asyncEffect = async () => {
    await initCityData()

    // 调用 measureAllRows 方法，提前计算 List 中每一行的高度，实现 scrollToRow 的精确跳转
    // @ts-ignore
    ListRef.current.measureAllRows()
  }

  // 组件挂载后执行
  useEffect(() => {
    asyncEffect()
  }, [])

  return (
    <div className="city-list-container">
      {/* 顶部导航栏 */}
      <NavHeader>地图找房</NavHeader>
      {/* 城市列表 */}
      <AutoSizer>
        {
          ({width, height}: { width: number; height: number }) => (
            <List
              ref={ListRef}
              width={width}
              height={height}
              rowCount={cityIndex.length}
              rowHeight={getRowHeight}
              rowRenderer={rowRenderer}
              onRowsRendered={rowsRendered}
              scrollToAlignment='start'
            />
          )
        }
      </AutoSizer>
      {/* 右侧城市索引 */}
      <ul className="city-index">{renderCityIndex()}</ul>
    </div>
  )
}

export default CityList
