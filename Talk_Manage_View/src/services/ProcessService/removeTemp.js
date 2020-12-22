import http from 'utils/http'

export default function(templateId) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `${http.admin}/Process/DeleteProcessTemplate`,
            data: {id: templateId}
        }
        http.get(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}