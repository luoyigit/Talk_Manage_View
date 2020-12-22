import http from 'utils/http'

export default function(data, nomessage) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Common/ReadMsg',
            data,
            nomessage
        }
        http.post(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}