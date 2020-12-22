import http from 'utils/http'

export default function(data, nomessage = true) {
    return new Promise((resolve, reject) => {
        const option = {
            url: '/Common/UploadBigAttachment',
            data,
            nomessage
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(e => {
            reject(e)
        })
    })
}