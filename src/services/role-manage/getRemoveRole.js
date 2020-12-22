import http from 'utils/http'
//删除角色
export default function({Id, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/Role/Delete`,
            data: {
                Ids: [Id]
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}