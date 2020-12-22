import http from 'utils/http'

export default function(data, nomessage = true) {
    return new Promise((resolve, reject) => {
        const option = {
            url: '/Common/ValidateFile',
            data,
            nomessage
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}