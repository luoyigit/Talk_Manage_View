import http from 'utils/http'

const login = function({ data, loading, nomessage }) {
  return new Promise((resolve, reject) => {
    let option = {
      url: 'http://www.c.cn:15001/connect/token',
      // data: Object.assign(data, { noCarryToken: true }),
      data: data,
      loading: loading ? Object.assign({ text: '正在登录' }, loading) : null,
      nomessage,
      ContentType: 'application/x-www-form-urlencoded',
      noCarryToken: true
    }
    http
      .post(option)
      .then((data) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}

const checkLogin = function() {
  return new Promise((resolve, reject) => {
    let option = {
      url: '/Authorize/checkLogin',
    }
    http
      .get(option)
      .then((data) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}
export default { login, checkLogin }
