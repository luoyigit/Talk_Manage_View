import http from 'utils/http'
const getLoginUserInfo = function() {
  return new Promise((resolve, reject) => {
    let option = {
      url: "/user",
      data: null,
    //   loading: loading ? Object.assign({ text: '数据获取中...' }, loading) : null,
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

export default { getLoginUserInfo }