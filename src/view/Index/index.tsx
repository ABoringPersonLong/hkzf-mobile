import './index.scss'
import {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
// 按需导入 antd-mobile 组件库
import {Swiper, Toast, Grid} from 'antd-mobile'
// 导入 homeAPI 模块
import {getSwiperAPI} from '../../api/homeAPI'
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

  const navigate = useNavigate()

  // 获取轮播图数据
  const getSwipers = async (): Promise<void> => {
    const {data} = await getSwiperAPI()
    if (data.status !== 200) Toast.show(data.description)
    setSwipers(data.body)
    setIsSwipersLoaded(true)
    console.log(data)
  }

  // 发送异步请求
  useEffect(() => {
    getSwipers()
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
          ): ('')
        }
      </div>

      {/* 导航菜单 */}
      <Grid columns={4}>
        {
          navs.map(item => (
            <Grid.Item key={item.id} onClick={() => navigate(item.path)}>
              <img src={item.img} alt=""/>
              <h2>{item.title}</h2>
            </Grid.Item>
          ))
        }
      </Grid>
    </div>
  )
}

export default Index
