import router from 'router/index.js'
import {Message, MessageBox} from 'element-ui'

class ErrorHandle {
    forceLogin(msg) {
        MessageBox.alert(msg, '错误', {
            confirmButtonText: '确定',
            type: 'warning'
        }).then(() => {
            router.push('/login')
        }).catch(() => {
            router.push('/login')
        })
    }
    requestError(response) {
        if (response && response.status == 404) {
            Message({ type: 'error', message: '404错误' });
        } else if (response && response.status == 500) {
            Message({ type: 'error', message: '500错误，系统异常了' });
        } else if (response && response.status == 401) {
            // Message({ type: 'warning', message: '登陆信息过期，请重新登陆' })
            router.push('/login')
        } else if(response && response.status == 400) {
             if(response && response.data) {
              if(response.data.error_description) {
                Message({ type: 'error', message: response.data.error_description });
              } else {
                Message({ type: 'error', message: '无法连接服务器' });
              }
          }
        } else if(response && response.status == 405){
            Message({ type: 'error', message: '5405 Method Not Allowed' });
        } 
        else {
            // console.log(response)
            // let msg = '请求错误：' + (response ? response.status : '') + ',' + (response ? response.statusText : '')
            Message({ type: 'error', message: '无法连接服务器' });
        }
    }
}

export default new ErrorHandle()