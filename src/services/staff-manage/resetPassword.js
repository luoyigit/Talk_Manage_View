import http from 'utils/http'

export default function({id, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/ResetPassword',
            data: {id},
            loading: loading
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}