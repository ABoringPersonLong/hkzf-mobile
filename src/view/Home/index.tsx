import React, {FC} from 'react'
import {NavBar, TabBar} from 'antd-mobile'
import {Route, Switch, useHistory, useLocation, MemoryRouter as Router,} from 'react-router-dom'
import {AppOutline, MessageOutline, UnorderedListOutline, UserOutline,} from 'antd-mobile-icons'

import styles from './index.css'

const Bottom: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const {pathname} = location

  const setRouteActive = (value: string) => {
    history.push(value)
  }

  const tabs = [
    {
      key: '/home',
      title: '首页',
      icon: <AppOutline/>,
    },
    {
      key: '/todo',
      title: '我的待办',
      icon: <UnorderedListOutline/>,
    },
    {
      key: '/message',
      title: '我的消息',
      icon: <MessageOutline/>,
    },
    {
      key: '/me',
      title: '个人中心',
      icon: <UserOutline/>,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
      ))}
    </TabBar>
  )
}















import {Routes, Route} from "react-router-dom"
import News from '../News'

const Home = () => {
  return (
    <div className='home-container'>
      <h2>Home 组件</h2>
      <Routes>
        <Route path="news" element={<News/>}/>
      </Routes>
    </div>
  )
}

export default Home
