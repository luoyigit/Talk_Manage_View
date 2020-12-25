import http from 'utils/http'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Project/FindProjectTypeList'
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}