import http from 'utils/http'

export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/SetEmployeeRoles',
            data: {
                employeeId: data.id,
                addRoleIds: data.addRoleIds,
                removeRoleIds: data.removeRoleIds
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}