import './index.scss'
import {NavBar, Toast} from 'antd-mobile'

// CityList 组件
const CityList = () => {
  const back = () => Toast.show({content: '点击了返回区域', duration: 1000})

  return (
    <div className="citylist-container">
      <NavBar onBack={back}>标题</NavBar>
    </div>
  )
}

export default CityList
