import http from 'utils/http'

export default function({form, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/QueryPage/Add`,
            data: {
                pageName: form.pageName,
                code: form.pageCode,
                remark: form.remarks
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(data => {
            let ret = {}
            ret.msg = data.Msg  
            resolve(ret) 
            
        }).catch(() => {
            reject()
        })
    })
}