import http from 'utils/http'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: `${http.admin}/Process/FindPrcessBackLogList`,
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}