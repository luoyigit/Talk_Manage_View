import http from 'utils/http'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/IsAssignor'
        }
        http.get(option).then(data => {
            let ret = data;
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}