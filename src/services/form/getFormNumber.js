import http from 'utils/http'
import pmsStorage from 'utils/storage/index'

export default function(type) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Form/GetFormNumber',
            data: {numberType: type},
            nomessage: true
        }
        http.get(option).then(number => {
            resolve(number)
        }).catch(() => {
            reject()
        })
    })
}