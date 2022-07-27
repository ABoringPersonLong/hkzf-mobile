import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './view/Home'

// App 组件
const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* 首页的路由规则 */}
        <Routes>
          <Route path="/" element={<Navigate to='/home'/>}/>
          <Route path="/home/*" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
