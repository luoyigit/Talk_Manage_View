import http from 'utils/http'

export default function(id) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `${http.admin}/Process/DeleteFormField`,
            data: {id}
        }
        http.get(option).then((res) => {
            resolve(res)
        }).catch(() => {
            reject()
        })
    })
}