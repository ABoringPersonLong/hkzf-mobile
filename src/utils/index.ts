import {getInfoAPI} from '../api/areaAPI'
import {Toast} from 'antd-mobile'

// 获取当前城市的名称
export const getCurrentCity = () => {
  const localCity = JSON.parse(localStorage.getItem('hkzf_city') + '')
  // 如果 localStorage 中没有，通过 IP 定位获取到当前城市的名称，并存储在 localStorage 中
  if (!localCity) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      new window.BMapGL.LocalCity().get(async (result: {name: string}) => {
        try {
          const {data} = await getInfoAPI(result.name)
          if (data.status !== 200) return Toast.show(data.description)
          localStorage.setItem('hkzf_city', JSON.stringify(data.body))
          resolve(data.body)
        } catch (e) {
          reject(e)
        }
      })
    })
  }

  // 如果 localStorage 中有，直接返回
  return new Promise(resolve => resolve(localCity))
}
