import http from 'utils/http'

export default function({data, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `${http.admin}/user/add`,
            data: {
                phone: data.phone,
                PasaswordConfirm: data.confirmPassword,
                id: data.id,
                password: data.password,
                realName: data.realName,
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