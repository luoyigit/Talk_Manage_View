import http from 'utils/http'
//获取系统日志列表数据
export default function(form, loading) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.log}/log/List`,
            data: form,
            loading

        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}