import http from 'utils/http'

export default function(type, number) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Form/CheckNumber',
            data: {
                numberType: type,
                number
            },
            nomessage: true
        }
        http.get(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}