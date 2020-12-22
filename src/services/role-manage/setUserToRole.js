import http from 'utils/http'

//设置角色的功能
export default function(data) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Role/AddUsersToRole',
            data: {
                userIds: data.ids, 
                roleId: data.roleId
            },
        }
        http.post(option).then(data => {
            resolve(data) 
        }).catch(() => {
            reject()
        })
    })
}