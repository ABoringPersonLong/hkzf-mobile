import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './view/Home'
import CityList from './view/CityList'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to='/home/home2'/>}/>
          <Route path="/home" element={<Navigate to='/home/home2'/>}/>
          <Route path="/home/*" element={<Home/>}/>
          <Route path="/citylist" element={<CityList/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
