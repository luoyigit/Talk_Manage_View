
import http from 'utils/http'

//编辑
export default function({form, loading}) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: '/SystemBaseApi/api/SystemEnumItem/Change',
            data: {
                id: form.id,
                name: form.name,
                code: form.code,
                val: form.val,
                sortIndex: form.sortIndex,
                remark: form.remark
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