import http from 'utils/http'
export default function(id) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.admin}/service/HealthCheck`,
            data:{id}
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}