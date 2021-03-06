import http from 'utils/http'
export default function({data,loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.permission}/Client/Add`,
            data:data,
            loading
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}