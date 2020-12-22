import http from 'utils/http'

export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.admin}/user/edit`,
            data: {
                phone: data.phone,
                // confirmPassword: data.confirmPassword,
                // departmentIds: data.department.map(item => item.id),
                // departmentIds: data.department,
                id: data.id,
                // employeeNo: data.employeeNo,
                // password: data.password,
                realName: data.realName,
                // sex: data.sex,
                userName: data.userName
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