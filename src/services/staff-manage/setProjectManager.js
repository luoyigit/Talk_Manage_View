import http from 'utils/http'

export default function(data) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Employee/SetProjectManager',
            data: {
                ids: data.ids,
                status: data.status
            },
            // loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}