import http from 'utils/http'
export default function({parameter, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/delete-field`,
            data: {
                id: parameter.id
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