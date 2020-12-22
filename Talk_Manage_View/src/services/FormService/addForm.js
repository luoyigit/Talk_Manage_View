import http from 'utils/http'

export default function(data) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `${http.admin}/Process/AddForm`,
            data: data
        }
        http.post(option).then((res) => {
            resolve(res)
        }).catch(() => {
            reject()
        })
    })
}