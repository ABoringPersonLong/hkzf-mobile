import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './view/Home'
import CityList from './view/CityList'
import Map from './view/Map'

// App 组件
const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* 首页的路由规则 */}
        <Routes>
          <Route path="/" element={<Navigate to='/home'/>}/>
          <Route path="/home/*" element={<Home/>}/>
          <Route path="/citylist" element={<CityList/>}/>
          <Route path="/map" element={<Map/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
