import './index.scss'
import {useState, useEffect, createRef} from "react"
import {useNavigate} from "react-router-dom"

// 按需导入 antd-mobile 组件库
import {Swiper, Toast, Grid} from 'antd-mobile'

// 按需导入 homeAPI 模块
import {getSwiperAPI, getGroupsAPI} from '../../api/homeAPI'

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

  const navigate = useNavigate()

  // 获取轮播图数据
  const getSwipers = async () => {
    const {data} = await getSwiperAPI()
    if (data.status !== 200) Toast.show(data.description)
    setSwipers(data.body)
    setIsSwipersLoaded(true)
  }

  // 获取轮播图数据
  const getGroups = async () => {
    const {data} = await getGroupsAPI('AREA%7C88cff55c-aaa4-e2e0')
    if (data.status !== 200) Toast.show(data.description)
    setGroups(data.body)
  }

  // 发送异步请求
  useEffect(() => {
    getSwipers()
    getGroups()
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
                    <img src={'http://localhost:8080' + item.imgSrc} alt={item.alt} className='content'/>
                  </Swiper.Item>
                ))
              }
            </Swiper>
          ) : ('')
        }
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
                <img src={'http://localhost:8080' + item.imgSrc} alt=""/>
              </Grid.Item>
            ))
          }
        </Grid>
      </div>

      {/* 最新资讯 */}
      <div></div>
    </div>
  )
}

// 操作 DOM
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

export default Index
