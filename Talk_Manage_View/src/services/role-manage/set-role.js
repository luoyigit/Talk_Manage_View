import http from 'utils/http'

//设置角色的功能
export default function({data, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Role/SetRoleFunctions',
            data: {
                roleId: data.roleId, //角色id
                addFunctionIds: data.addFunctionIds, //添加的功能Id列表
                removeFunctionIds: data.removeFunctionIds, //删除的功能Id列表
                addMenuIds: data.addMenuIds, //添加的菜单Id列表
                removeMenuIds: data.removeMenuIds, //删除的菜单Id列表
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            let ret = {}
            ret.msg = data.Msg  
            resolve(ret) 
        }).catch(() => {
            reject()
        })
    })
}