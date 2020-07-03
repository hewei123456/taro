import Taro from '@tarojs/taro'

const baseUrl = 'http://127.0.0.1:3000/api'

const rq = (url, data, method, header) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url, data, method, header,
      success (response) {
        switch (response.statusCode) {
          case 401:
            console.log('401 您没有该操作权限')
            break
          case 403:
            console.log('403 您没有该操作权限')
            break
          case 500:
            console.log('500 服务器错误')
            break
          default:
            resolve(response.data)
        }
      },
      fail (error) {
        Taro.showToast({
          title: '网络故障...',
          icon: 'none',
          duration: 800
        })
        reject(error)
      }
    })
  })
}

export const get = (url, data) => rq(url, data, 'GET', { 'content-type': 'application/json' })
export const post = (url, data) => rq(url, data, 'POST', { 'content-type': 'application/json' })
