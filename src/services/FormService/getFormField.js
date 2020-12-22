import http from 'utils/http'

export default function(formId) {
  return new Promise((resolve, reject) => {
    let option = {
      url: `${http.admin}/Process/GetFormFieldList`,
      data: { formId },
    }
    http.get(option).then((data) => {
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}
