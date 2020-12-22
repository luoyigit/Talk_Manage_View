import http from 'utils/http'

// 添加部门员工
export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/UserApi/Api/Department/AddEmployee',
            data: {
                departmentId: data.deptId,
                employeeId: data.staffId
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