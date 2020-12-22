import http from 'utils/http'
import {createMessage} from '../models/message'

export default function(data) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Common/FindMyMessageList',
            data,
        }
        http.get(option).then(data => {
            let ret = {
                list: data.dataList.map(item => createMessage({
                    id: item.id,
                    title: item.body,
                    isRead: item.isRead,
                    createOn: item.receiveTime,
                })),
                index: data.pageIndex,
                count: data.totalCount
            }
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}