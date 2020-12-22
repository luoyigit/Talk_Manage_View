import http from 'utils/http'
//删除字段
export default function({page, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnumItem/Remove',
            data: {
                id: page.id
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            resolve(data.Msg)
        }).catch(() => {
            reject()
        })
    })
}