import http from 'utils/http'
export default function(data) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.admin}/address/Citys`,
            data
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}