import http from 'utils/http'

export default function(userid, roleId) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Role/RemoveUserFromRole',
            data: {
                userId: userid,
                roleId: roleId
            },
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            console.log('cccccc')
            reject()
        })
    })
}