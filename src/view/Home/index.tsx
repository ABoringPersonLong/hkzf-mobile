import './index.css'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import {TabBar} from 'antd-mobile'
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

const Bottom = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {pathname} = location

  const setRouteActive = (value: string) => navigate(value)

  const tabs = [
    {key: '/home', title: '首页', icon: (<i className='iconfont icon-ind'/>)},
    {key: '/home/houselist', title: '找房', icon: (<i className='iconfont icon-findHouse'/>)},
    {key: '/home/news', title: '咨询', icon: (<i className='iconfont icon-infom'/>)},
    {key: '/home/profile', title: '我的', icon: (<i className='iconfont icon-my'/>)}
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
      {tabs.map(item => (<TabBar.Item key={item.key} title={item.title} icon={item.icon}/>))}
    </TabBar>
  )
}

const Home = () => {
  return (
    <div className='home-container'>
      <div className='body'>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/houselist' element={<HouseList/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
      <div className='bottom'>
        <Bottom/>
      </div>
    </div>
  )
}

export default Home
