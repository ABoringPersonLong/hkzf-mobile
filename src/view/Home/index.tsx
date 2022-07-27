import './index.scss'
import {Routes, Route, useNavigate, useLocation} from 'react-router-dom'

// 按需导入 antd-mobile 组件库
import {TabBar} from 'antd-mobile'

// 导入路由需要的组件
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'

// Button 组件
const Bottom = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const {pathname} = location

  // 路由链接数据
  const tabs = [
    {key: '/home', title: '首页', icon: (<i className='iconfont icon-ind'/>)},
    {key: '/home/houselist', title: '找房', icon: (<i className='iconfont icon-findHouse'/>)},
    {key: '/home/news', title: '资讯', icon: (<i className='iconfont icon-infom'/>)},
    {key: '/home/profile', title: '我的', icon: (<i className='iconfont icon-my'/>)}
  ]

  return (
    // 渲染路由链接
    <TabBar activeKey={pathname} onChange={value => navigate(value)}>
      {tabs.map(item => (<TabBar.Item key={item.key} title={item.title} icon={item.icon}/>))}
    </TabBar>
  )
}

// Home 组件
const Home = () => {
  return (
    <div className='home-container'>
      {/* 主体区域，路由规则 */}
      <div className='body'>
        <Routes>
          <Route path='/' element={<Index/>}/>
          <Route path='/houselist' element={<HouseList/>}/>
          <Route path='/news' element={<News/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>

      {/* 底部路由链接 */}
      <div className='bottom'>
        <Bottom/>
      </div>
    </div>
  )
}

export default Home
