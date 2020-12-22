import http from 'utils/http'
export default function(id) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Common/FindPbAttaachementByDealConfirmId',
            data: {id: id},
        }
        http.get(option).then(res => {
            resolve(res)
        }).catch(() => {
            reject()
        })
    })
}