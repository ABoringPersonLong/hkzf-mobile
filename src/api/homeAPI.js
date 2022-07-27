import request from '../utils/request'

// 获取轮播图数据
export const getSwiperAPI = () => {
  return request.get('/home/swiper')
}
