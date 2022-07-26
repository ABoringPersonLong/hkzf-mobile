import {BrowserRouter, Routes, Route, Link, Navigate} from "react-router-dom"
import Home from './view/Home'
import CityList from './view/CityList'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Link to='/home'>Home 组件</Link>&nbsp;
        <Link to='/home/news'>Home/News 组件</Link>
        <Link to='/citylist'>CityList 组件</Link>&nbsp;
        <Routes>
          <Route path="/home/*" element={<Home/>}/>
          <Route path="/citylist" element={<CityList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
