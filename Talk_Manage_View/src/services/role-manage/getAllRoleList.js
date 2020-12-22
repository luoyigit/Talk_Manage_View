import http from 'utils/http'
import {createRoleData} from '../models/role'

//获取角色列表数据
export default function({data, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/Role/List`,
            data: data,
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}

