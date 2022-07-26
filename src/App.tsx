import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Home from './view/Home'

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to='/home'/>}/>
          <Route path="/home/*" element={<Home/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
