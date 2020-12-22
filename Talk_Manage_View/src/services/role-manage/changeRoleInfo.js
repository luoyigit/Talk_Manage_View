import http from 'utils/http'
//修改角色
export default function({data, loading, nomessage}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/Role/Edit`,
            data: {
                id: data.id,
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