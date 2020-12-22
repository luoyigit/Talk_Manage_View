import http from 'utils/http'

//获取角色已经拥有的菜单列表
export default function({Id, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Role/GetRoleMenuList',
            data: {
                roleId: Id
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}