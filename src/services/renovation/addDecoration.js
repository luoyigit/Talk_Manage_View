import http from 'utils/http'
export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.project}/renovationitem/add`,
            data,
            loading
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}