import http from 'utils/http'
import {createField} from '../models/condition'

export default function(formId) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Form/GetFormFieldList',
            data: {formId}
        }
        http.get(option).then(data => {
            let ret = data.map(item => createField({
                id: item.id,
                code: item.code,
                label: item.name,
                type: item.fieldType,
                sortIndex: item.sortIndex
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}