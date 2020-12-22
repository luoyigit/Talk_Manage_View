import {createAttachment} from '../models/attachment'

export default function(data) {
    let isArray = Array.isArray(data)
    return createAttachment(isArray ? {
        id: data[0].id,
        name: data[0].fileName,
        url: data[0].url,
        operater: data[0].operator,
        remark: data[0].remark
    } : {
        id: data.id,
        name: data.fileName,
        url: data.url,
        operater: data.operator,
        remark: data.remark
    })
}