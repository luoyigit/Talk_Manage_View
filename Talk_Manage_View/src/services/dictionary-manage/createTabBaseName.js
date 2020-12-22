import http from 'utils/http'
// 创建基础数据标签名 添加新的字段类型
export default function({from, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnum/CreateSystemEnum',
            data: {
                categoryName: from.tabName,
                code: from.code
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