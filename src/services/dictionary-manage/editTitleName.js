import http from 'utils/http'
//修改字段类型信息  编辑标签名
export default function({from, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnum/UpdateSystemEnum',
            data: {
                id: from.id,
                categoryName: from.tabName,
                code: from.code,
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