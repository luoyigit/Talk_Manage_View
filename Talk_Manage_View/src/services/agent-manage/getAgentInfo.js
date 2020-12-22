import {createAgentData} from '../models/agent'
import http from 'utils/http'

//获取代理商列表
export default function({agentId, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Agent/GetAgentInfo',
            data: {
                agentId
            },
            loading: loading ? Object.assign({text: '数据提交中'}, loading) : null
        }
        http.get(option).then(data => {
            let ret = createAgentData({
                id: data.id,
                categoryCode: data.categoryCode,
                categoryName: data.categoryName,
                name: data.name,
                indentityNO: data.indentityNO,
                zipCode: data.zipCode,
                address: data.address,
                phone: data.phone,
                fax: data.fax,
                loginName: data.loginName,
                email: data.email,
                contacts: data.contacts,
                contactsPhone: data.contactsPhone,
                contactsCellPhone: data.contactsCellphone,
                introduction: data.introduction,
                qq: data.qq,
                oftenBidUrl: data.oftenBidUrl
            })
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}
