import http from 'utils/http'

//获取角色已经拥有的功能列表
export default function({Id, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Role/GetRoleFunctionList',
            data: {
                roleId: Id
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            if (data) {
                resolve(data)
            }else {
                reject(data.Msg)
            }
        }).catch(() => {
            reject()
        })
    })
}