import http from 'utils/http'

export default function(url) {
    return new Promise((resolve, reject) => {
        let option = {
            url
        }
        http.get(option).then(data => {
            let ret = data ? data.map(item => {
                return {
                    val: item.Val,
                    label: item.Name
                }
            }) : []
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}