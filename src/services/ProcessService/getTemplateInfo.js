import http from 'utils/http'

export default function(templateId) {
  return new Promise((resolve, reject) => {
    let option = {
      url: `${http.admin}/Process/GetProcessTemplateInfo`,
      data: { id: templateId },
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
