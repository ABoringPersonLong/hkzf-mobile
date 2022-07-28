import request from '../utils/request'

// 获取轮播图数据
export const getSwiperAPI = () => request.get('/home/swiper')

// 获取租房小组数据
export const getGroupsAPI = (area: string) => request.get('/home/groups', {params: {area}})

// 获取咨询数据
export const getNewsAPI = (area: string) => request.get('/home/news', {params: {area}})
