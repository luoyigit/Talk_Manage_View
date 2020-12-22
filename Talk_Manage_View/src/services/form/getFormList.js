import http from 'utils/http'
import {createForm} from '../models/process-form'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Form/GetFormList'
        }
        http.get(option).then(data => {
            let ret = data.dataList.map(item => createForm({
                id: item.id,
                name: item.name,
                type: item.formType,
                remark: item.remark
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}