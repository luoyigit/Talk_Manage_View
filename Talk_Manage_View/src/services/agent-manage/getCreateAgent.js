import http from 'utils/http'
//添加代理机构
export default function({from, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Agent/CreateAgent',
            data: from,
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            resolve(data.Msg)
        }).catch(() => {
            reject()
        })
    })
}
