import http from 'utils/http'

export default function({id, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/DisableEmployee',
            data: {employeeId: id},
            loading
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}