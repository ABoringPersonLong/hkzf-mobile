import request from "../utils/request"

// 根据城市名称查询该城市信息
export const getInfoAPI = (name: string) => request.get('/area/info', {params: {name}})

// 获取城市列表数据
export const getCityAPI = (level: number) => request.get('/area/city', {params: {level}})

// 获取热门城市数据
export const getHotAPI = () => request.get('/area/hot')

// 查询房源数据
export const getMapAPI = (id: string) => request.get('/area/map', {params: {id}})
