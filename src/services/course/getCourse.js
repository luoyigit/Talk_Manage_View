import http from 'utils/http'

export default function(id) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Project/FindProjectDetail',
            data:{id}
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}