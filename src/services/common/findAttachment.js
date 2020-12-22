import http from 'utils/http'
import {createAttachment} from '../models/attachment'
import store from 'store/index'

export default function({ownerId, category, loading}) {
    return new Promise((resolve, reject) => {
        let option = {
            url: '/Common/FindAttachmentList',
            data: {
                ownerId,
                category
            },
            loading
        }
        http.get(option).then(list => {
            let ret = list.map(item => createAttachment({
                id: item.id,
                name: item.fileName,
                type: item.category,
                ownerId: item.ownerId,
                operater: item.operater,
                remark: item.remark,
                url: item.downUrl,
                extentsion: item.fileExtentsion
            }))
            resolve(ret)
        }).catch(() => {
            reject()
        })
    })
}