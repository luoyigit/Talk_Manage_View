import http from 'utils/http'
import {createField, createFieldOption} from '../models/condition'

// 获取页面查询字段
export default function({code, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url:`/${http.admin}/QueryPage/FindByCode`,
            data: {
                code
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            let ret = data.fields.map(item => createField({
                label: item.fieldName,
                code: item.label,
                type: item.fieldType,
                remoteUrl: item.remoteUrl,
                options: item.details.map(item => createFieldOption({
                    val: item.value,
                    label: item.label
                }))
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}