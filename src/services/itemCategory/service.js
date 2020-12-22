import http from 'utils/http'

export default function(option) {
    return new Promise((resolve, reject) => {
        if (!option) {
            reject()
        }
        if (option.method && option.method.toUpperCase() === 'POST') {
            http.post(option).then(data => {
                resolve(data)
            }).catch(() => {
                reject()
            })
        } else {
            http.get(option).then(data => {
                resolve(data)
            }).catch(() => {
                reject()
            })
        }
        
    })
}