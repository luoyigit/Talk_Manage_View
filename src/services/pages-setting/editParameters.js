import http from 'utils/http'

export default function({form, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/edit-field`,
            data: {
                id: form.id,
                queryPageId: form.pageId,
                fieldName: form.fieldName,
                fieldType: form.fieldType,
                label: form.label,
                sortIndex: form.sort,
                remoteUrl: form.remoteUrl, //远程
                enumDetals: form.enumDetals.map(item => {
                    return{
                        label: item.enumText,
                        value: item.valEnum
                    }
                }) 
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            resolve(data.Msg)
        }).catch(() => {
            reject()
        })
    })
}
