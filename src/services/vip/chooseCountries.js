import http from 'utils/http'
export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.admin}/address/countries`,
            data,
            loading
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}