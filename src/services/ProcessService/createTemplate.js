import http from 'utils/http'

export default function({data, status, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: `${http.admin}/Process/AddProcessTemplate`,
            data: {
                name: data.name,
                designData: data.design,
                formId: data.formId,
                conditionString: data.conditionString,
                remark: data.remark,
                status: status
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.post(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}