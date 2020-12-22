import http from 'utils/http'
export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.permission}/Client/list`,
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}