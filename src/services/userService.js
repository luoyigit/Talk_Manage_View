import http from 'utils/http'
const login = function({ data, loading, nomessage }) {
  return new Promise((resolve, reject) => {
    let option = {
      url: '/Auth/Login',
      data: data,
      loading: loading ? Object.assign({ text: '数据提交中' }, loading) : null,
      nomessage,
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
export default { login }
