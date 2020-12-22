import http from 'utils/http'

export default function(id) {
    return new Promise ((resolve, reject) => {
        let option = {
            url: `/${http.admin}/user/listforrole`,
            data: {
                roleId: id
            },
        }
        http.get(option).then(data => {
            console.log('dsfsf',data)
            resolve(data)
        }).catch((e) => {
            console.log('sdfsdf1111',e)
            reject()
        })
    })
}