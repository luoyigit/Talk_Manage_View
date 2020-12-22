import http from 'utils/http'

export default function(temp) {
    return new Promise((resolve, reject) => {
        let option = {
            url: temp.status === 0 ? '/NewProcess/PublishTemplate' : '/NewProcess/UnPublishTemplate',
            data: {
                templateId: temp.id
            }
        }
        http.get(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}