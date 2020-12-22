import http from 'utils/http'
//删除代理商
export default function({formId, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Agent/Remove',
            data: {
                id: formId
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}
