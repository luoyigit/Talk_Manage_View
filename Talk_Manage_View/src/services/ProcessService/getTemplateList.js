import http from 'utils/http'

export default function() {
  return new Promise((resolve, reject) => {
    let option = {
      url: `${http.admin}/Process/GetProcessTemplateList`,
    }
    http
      .get(option)
      .then((data) => {
        // let ret = data.map(item => createTemplate({
        //     id: item.id,
        //     name: item.templateName,
        //     design: item.designData,
        //     remark: item.remark,
        //     status: item.status,
        // }))
        resolve(data)
      })
      .catch(() => {
        reject()
      })
  })
}
