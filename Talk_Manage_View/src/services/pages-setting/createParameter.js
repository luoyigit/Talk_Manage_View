import http from 'utils/http'
//参数   枚举创建
export default function({form, loading}) {
    console.log('ffff',form.fieldName)
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/add-field`,
            data: {
                fieldName: form.fieldName,
                fieldType: form.fieldType,
                label: form.label,
                sortIndex: form.sort,
                queryPageId: form.pageId, //页面Id
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