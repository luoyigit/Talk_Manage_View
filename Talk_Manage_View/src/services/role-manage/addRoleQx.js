import http from 'utils/http'
export default function(data) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.permission}/Menu/AddMenuToRole`,
            data
        }
        http.post(option).then(data => {
            resolve(data)
        }).catch(() => {
            reject()
        })
    })
}