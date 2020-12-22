import http from 'utils/http'

export default function(type) {
  return new Promise((resolve, reject) => {
    let option = {
      url: '/Form/GetFormNumber',
      data: { numberType: type },
      nomessage: true,
    }
    http
      .get(option)
      .then((number) => {
        resolve(number)
      })
      .catch(() => {
        reject()
      })
  })
}
