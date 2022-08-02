import './index.scss'
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

// 按需导入 antd-mobile 组件库
import {Swiper, Toast, Grid} from 'antd-mobile'

// 按需导入 homeAPI 模块
import {getSwiperAPI, getGroupsAPI, getNewsAPI} from '../../api/homeAPI'
// 导入获取当前城市方法
import {getCurrentCity} from '../../utils'

// 导入导航菜单的图片
import Nav1 from '../../assets/images/nav-1.png'
import Nav2 from '../../assets/images/nav-2.png'
import Nav3 from '../../assets/images/nav-3.png'
import Nav4 from '../../assets/images/nav-4.png'

// 导航菜单数据
const navs = [
  {
    id: 1,
    img: Nav1,
    title: '整租',
    path: '/home/houselist'
  },
  {
    id: 2,
    img: Nav2,
    title: '合租',
    path: '/home/houselist'
  },
  {
    id: 3,
    img: Nav3,
    title: '地图找房',
    path: '/home/houselist'
  },
  {
    id: 4,
    img: Nav4,
    title: '去出租',
    path: '/home/houselist'
  }
]

// Index 组件
const Index = () => {
  // 轮播图数据
  const [swipers, setSwipers] = useState([{id: 0, imgSrc: '', alt: ''}])
  // 是否已加载轮播图数据
  const [isSwipersLoaded, setIsSwipersLoaded] = useState(false)
  // 租房小组数据
  const [groups, setGroups] = useState([{id: 0, title: '', desc: '', imgSrc: ''}])
  // 资讯数据
  const [news, setNews] = useState([{id: 0, title: '', imgSrc: '', from: '', date: ''}])
  // 当前城市名称
  const [curCityName, setCurCityName] = useState('')

  // 使用编程式跳转
  const navigate = useNavigate()

  // 获取轮播图数据
  const getSwipers = async () => {
    try {
      Toast.show({icon: 'loading', content: '加载中...', duration: 0})
      const {data} = await getSwiperAPI()
      if (data.status !== 200) return Toast.show(data.description)
      setSwipers(data.body)
      setIsSwipersLoaded(true)
      Toast.clear()
    } catch (e) {
      Toast.clear()
    }
  }

  // 获取租房小组数据
  const getGroups = async () => {
    try {
      Toast.show({icon: 'loading', content: '加载中...', duration: 0})
      const {data} = await getGroupsAPI('AREA%7C88cff55c-aaa4-e2e0')
      if (data.status !== 200) return Toast.show(data.description)
      setGroups(data.body)
      Toast.clear()
    } catch (e) {
      Toast.clear()
    }
  }

  // 获取资讯数据
  const getNews = async () => {
    try {
      Toast.show({icon: 'loading', content: '加载中...', duration: 0})
      const {data} = await getNewsAPI('AREA%7C88cff55c-aaa4-e2e0')
      if (data.status !== 200) return Toast.show(data.description)
      setNews(data.body)
      Toast.clear()
    } catch (e) {
      Toast.clear()
    }
  }

  // 组件挂载时执行
  useEffect(() => {
    getSwipers()
    getGroups()
    getNews()

    // 租房小组按住背景变灰
    window.addEventListener('load', () => {
      document.querySelectorAll('.group .adm-grid-item').forEach(item => {
        item.addEventListener('touchstart', function () {
          // @ts-ignore
          this.style.backgroundColor = '#daddda'
        })
        item.addEventListener('touchend', function () {
          // @ts-ignore
          this.style.backgroundColor = '#fff'
        })
      })
    })

    // 获取当前城市
    getCurrentCity().then((response: any) => setCurCityName(response.label))
  }, [])

  return (
    <div className='index-container'>
      {/* 轮播图 */}
      <div className='swiper'>
        {
          // 轮播图数据加载完成，再渲染轮播图
          isSwipersLoaded ? (
            <Swiper autoplay loop>
              {
                swipers.map(item => (
                  <Swiper.Item key={item.id}>
                    <img src={`http://localhost:8080${item.imgSrc}`} alt={item.alt} className='content'/>
                  </Swiper.Item>
                ))
              }
            </Swiper>
          ) : ('')
        }

        {/* 搜索框 */}
        <div className='search-box'>
          <div className='search'>
            <div className='location' onClick={() => navigate('/citylist')}>
              <span>{curCityName}</span>
              <i className="iconfont icon-arrow"/>
            </div>
            <div className='form' onClick={() => navigate('/search')}>
              <i className="iconfont icon-seach"/>
              <span>请输入小区或地址</span>
            </div>
          </div>
          <i className="iconfont icon-map" onClick={() => navigate('/map')}/>
        </div>
      </div>

      {/* 导航菜单 */}
      <Grid columns={4} className='nav'>
        {
          navs.map(item => (
            <Grid.Item key={item.id} onClick={() => navigate(item.path)}>
              <img src={item.img} alt=""/>
              <h2>{item.title}</h2>
            </Grid.Item>
          ))
        }
      </Grid>

      {/* 租房小组 */}
      <div className='group'>
        <h3 className='group-title'>
          租房小组<span className='more'>更多</span>
        </h3>
        <Grid columns={2} gap={10}>
          {
            groups.map(item => (
              <Grid.Item key={item.id}>
                <div className='info'>
                  <p>{item.title}</p>
                  <span>{item.desc}</span>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt=""/>
              </Grid.Item>
            ))
          }
        </Grid>
      </div>

      {/* 最新资讯 */}
      <div className="news">
        <h3 className="title">最新资讯</h3>
        {
          news.map(item => (
            <div className='news-item' key={item.id}>
              <img src={`http://localhost:8080${item.imgSrc}`} alt=""/>
              <div className='content'>
                <h3>{item.title}</h3>
                <div className='info'>
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Index
