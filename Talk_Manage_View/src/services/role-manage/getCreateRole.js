import http from 'utils/http'
//添加角色
export default function({data, loading, nomessage}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/Role/Add`,
            data: {
                roleName: data.roleName,
                remark: data.remark
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null,
            // nomessage: nomessage
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}