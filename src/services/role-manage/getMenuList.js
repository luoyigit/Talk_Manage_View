import http from 'utils/http'
import {createRoleTree} from '../models/role'
//获取所有菜单和功能树列表
export default function(form) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Menu/GetAllMenuListRequest',
            data: form
        }
        http.get(option).then(data => {
            let ret = data.map(item => createRoleTree({
                depth: item.depth,
                id: item.id,
                label: item.label,
                type: item.type,
                parentId: [],
                isIndeterminate: false,
                checkList: [],
                children: item.children
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}