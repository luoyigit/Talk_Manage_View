import http from 'utils/http'

export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserApi/Api/Department/RemoveDepartment',
            data: {departmentId: data},
            loading
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}