import http from 'utils/http'

export default function(processId) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Process/GetProcessStepLine',
            data: {processId},
        }
        http.get(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}