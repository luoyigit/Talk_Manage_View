import http from 'utils/http'

export default function(id, nomessage) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Common/DeleteAttachement',
            data: {id},
            nomessage
        }
        http.get(option).then(() => {
            resolve()
        }).catch(() => {
            reject()
        })
    })
}