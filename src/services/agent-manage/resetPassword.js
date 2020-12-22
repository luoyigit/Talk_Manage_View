import http from 'utils/http'

export default function(data) {
    return new Promise((resolve, reject) => {
        const option = {
            url: '/Agent/ResetPassword',
            data
        }
        http.post(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}