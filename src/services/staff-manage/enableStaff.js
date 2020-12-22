import http from 'utils/http'

export default function({id, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/EnableEmployee',
            data: {employeeId: id},
            loading: loading
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}