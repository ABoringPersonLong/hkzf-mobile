import './index.css'
import React, {FC} from 'react'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import {NavBar, TabBar} from 'antd-mobile'
import {AppOutline, UnorderedListOutline, MessageOutline, UserOutline} from 'antd-mobile-icons'

const Bottom: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname.substring(location.pathname.lastIndexOf('/') + 1) // 截取最后一个路径，例如 /aaa/bbb 截取出 bbb

  const setRouteActive = (value: string) => navigate(value)

  const tabs = [
    {key: 'home2', title: '首页', icon: <AppOutline/>},
    {key: 'todo', title: '我的待办', icon: <UnorderedListOutline/>},
    {key: 'message', title: '我的消息', icon: <MessageOutline/>},
    {key: 'me', title: '个人中心', icon: <UserOutline/>}
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (<TabBar.Item key={item.key} title={item.title} icon={item.icon}/>))}
    </TabBar>
  )
}

function Home2() {
  return <div>首页</div>
}

function Todo() {
  return <div>我的待办</div>
}

function Message() {
  return <div>我的消息</div>
}

function PersonalCenter() {
  return <div>个人中心</div>
}

const Home = () => {
  return (
    <div className='home-container'>
      <div className='top'>
        <NavBar>配合路由使用</NavBar>
      </div>
      <div className='body'>
        <Routes>
          <Route path='home2' element={<Home2/>}/>
          <Route path='todo' element={<Todo/>}/>
          <Route path='message' element={<Message/>}/>
          <Route path='me' element={<PersonalCenter/>}/>
        </Routes>
      </div>
      <div className='bottom'>
        <Bottom/>
      </div>
    </div>
  )
}

export default Home
