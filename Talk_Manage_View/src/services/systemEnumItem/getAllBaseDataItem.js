import storage from 'good-storage'
import {createBaseData} from '../models/dictionary'
import http from 'utils/http'

// 获取所有基础数据列表并缓存
export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnumItem/GetAllItemList',
        }
        http.get(option).then(data => {
            let ret = data.map(item => {
                return {
                    id: item.id,
                    tabName: item.categoryName,
                    code: item.code,
                    items: item.items ? item.items.map(item => createBaseData({
                        id: item.id,
                        val: item.val,
                        code: item.code,
                        name: item.name,
                        sortIndex: item.sortIndex,
                        remark: item.remark
                    })) : []
                }
            })
            ret.forEach(item => {
                let key = 'base-data-' + item.code
                storage.set(key, item.items)
            })
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}