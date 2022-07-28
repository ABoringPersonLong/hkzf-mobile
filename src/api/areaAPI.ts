import request from "../utils/request"

// 根据城市名称查询该城市信息
export const getInfoAPI = (name: string) => request.get('/area/info', {params: {name}})
