import axios from 'axios'
import errorHandle from './error-handle'
import { MessageBox, Message } from 'element-ui'
import pmsStorage from 'utils/storage/index'

const baseUrl = window.GlobalConfig.baseUrl
//const baseUrl = 'http://gxt-api.youzuowei.com.cn'

axios.defaults.baseURL = `${baseUrl}`

// 设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post') {
      if (!config.noCarryToken && config.noCarryToken !== true) {
        config.headers.Authorization = 'bearer ' + pmsStorage.getUserInfo().token
      }
      if(config.ContentType) {
        config.headers['Content-Type'] = config.ContentType
      }
    }
    if (config.method === 'get') {
      console.log("geggggg")
      if (!config.params.noCarryToken && config.params.noCarryToken !== true) {
        config.headers.Authorization = 'bearer ' + pmsStorage.getUserInfo().token
      }
    }
    return config
  },
  (err) => {
    console.log(err)
  }
)

// 设置响应拦截器, 集中处理接口消息
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      if(res.data.access_token) { //登陆比较特殊
          return Promise.resolve(res.data)
      }
      else {
        if (res.data.success) {
          // if (res.data.message && !res.config.nomessage) {
          //     Message({type: 'success', message: res.data.message})
          // }
          if (res.data.msg) {
            if (res.config.nomessage === undefined || res.config.nomessage === false) {
              Message({ type: 'success', message: res.data.msg })
            }
          }
          let data = res.data.data ? res.data.data : {}
          return Promise.resolve(data)
        } else {
          if (res.data.msg) {
            MessageBox.alert(res.data.msg, '提示', { confirmButtonText: '确定', type: 'error' })
          }
          return Promise.reject()
        }
      }
    } 
    else {
      errorHandle.requestError(res)
      return Promise.reject(res)
    }
  },
  (err) => {
     //非200状态
    errorHandle.requestError(err.response)
    return Promise.reject(err.response)
  }
)
