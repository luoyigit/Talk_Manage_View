import http from 'utils/http'
const createApplication = function({ data, loading, nomessage }) {
  return new Promise((resolve, reject) => {
    let option = {
      url: '/Application/Create',
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

export default { createApplication }
