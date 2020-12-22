import http from 'utils/http'

export default function({id, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.admin}/user/Delete`,
            data: {ids: [id]},
            loading
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}