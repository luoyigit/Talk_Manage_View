import http from 'utils/http'

export default function({targetId, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/Delete`,
            data: {
                ids: [targetId]
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