import http from 'utils/http'
import store from 'store/index'

export default function() {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Common/GetApiDomain'
        }
        http.get(option).then(ip => {
            store.dispatch('saveServerAddress', ip)
            resolve(ip)
        }).catch(() => {
            reject()
        })
    })
}