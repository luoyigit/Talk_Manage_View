import http from 'utils/http'
import {createBaseData} from '../models/dictionary'

//基础数据 获取表头数据列表
export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnum/GetCreateDropdownList',
        }
        http.get(option).then(data => {
            let ret = data.map(item => createBaseData ({
                titleId: item.id,
                tabName: item.categoryName,
                code: item.code
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}
