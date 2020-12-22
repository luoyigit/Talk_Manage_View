import http from 'utils/http'

export default function({form, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/Edit`,
            data: {
                id: form.id,
                pageName: form.pageName,
                code: form.pageCode,
                remark: form.remarks
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