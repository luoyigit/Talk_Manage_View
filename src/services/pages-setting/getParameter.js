import http from 'utils/http'
//参数管理
export default function({parameter, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/QueryPage/GetQueryPageField',
            data: {
                queryPageId: parameter.pageId
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            let ret = data.map(item => createParameterForm({
                pageId: item.queryPageId,
                id: item.id,
                sort: item.sortIndex,
                fieldName: item.dieldName,
                label: item.label,
                fieldType: item.fieldType,
                remoteUrl: item.remoteUrl,
                enumDetals: item.enumDetals.map(item => createEnumForm ({
                    enumText: item.label,
                    valEnum: item.value
                }))
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}