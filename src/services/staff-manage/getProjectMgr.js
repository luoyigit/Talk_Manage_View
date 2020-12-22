import http from 'utils/http'
import {createStaff} from '../models/staff'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/FindProjectManagers'
        }
        http.get(option).then(data => {
            let ret = data.users.map(item => createStaff({
                id: item.id,
                realName: item.userName
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}