import {createStaff} from '../models/staff'
import http from 'utils/http'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/PermissionApi/api/Role/FindAllProjectManager'
        }
        http.get(option).then(data => {
            let ret = data.map(item => createStaff({
                id: item.Id,
                realName: item.UserName
            }))
            resolve(ret)
          
        }).catch(() => {
            reject()
        })
    })
}