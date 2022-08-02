import request from '../utils/request'

// 根据条件查询房屋
export const getHousesAPI = (cityId: string) => request.get('/houses', {params: {cityId}})
