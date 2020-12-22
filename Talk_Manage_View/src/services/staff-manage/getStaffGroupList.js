import http from 'utils/http'

export default function({id, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserApi/api/Employee/GetEmployeeRoleList',
            data: {employeeId: id},
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}