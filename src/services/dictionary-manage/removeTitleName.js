import http from 'utils/http'
//删除字段类型  删除标签名
export default function({id, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnum/RemoveSystemEnum',
            data: {
                Id: id
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