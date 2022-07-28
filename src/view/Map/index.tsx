import './index.scss'
import {useEffect} from "react";

// Map 组件
const Map = () => {
  // 组件挂载时执行
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // 获取经纬度
      const {longitude, latitude} = position.coords
      // @ts-ignore
      // 注意：在 react 脚手架中全局对象需要使用 window 来访问，否则，会造成 ESLint 校验错误
      const map = new window.BMapGL.Map("container")
      // @ts-ignore
      const point = new window.BMapGL.Point(longitude, latitude)
      map.centerAndZoom(point, 15)
    })
  }, [])

  return (
    <div className="map-container">
      <div id='container'></div>
    </div>
  )
}

export default Map
