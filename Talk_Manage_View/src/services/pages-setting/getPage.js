import http from 'utils/http'
import {createPageForm, createParameterForm, createEnumForm} from '../models/pages'

export default function({loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/List`,
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            let ret = data.map(item => createPageForm ({
                id: item.id,
                pageName: item.pageName,
                pageCode: item.code,
                remarks: item.remark,
                fields: item.fields.map(item => createParameterForm({
                    id: item.id,
                    sort: item.sortIndex,
                    fieldName: item.fieldName,
                    label: item.label,
                    fieldType: item.fieldType,
                    remoteUrl: item.remoteUrl,
                    enumDetals: item.details.map(item => createEnumForm ({
                        enumText: item.label,
                        valEnum: item.value
                    }))
                }))
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}