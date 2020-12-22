// 附件
export class Attachment {
    constructor({id, name, url, domain, createdOn, operater, remark, type, ownerId, extentsion, time}) {
        this.id = id
        this.name = name
        this.url = url
        this.domain = domain //附件域名
        this.createdOn = createdOn // 创建时间
        this.operater = operater //上传人
        this.remark = remark
        this.type = type // 类型
        this.ownerId = ownerId
        this.extentsion = extentsion // 文件拓展名
        this.time = time
    }
}

export function createAttachment(data) {
    return new Attachment(data)
}

export function initAttachment() {
    return new Attachment({
        id: '',
        name: '',
        url: '',
        domain: '',
        createdOn: '',
        operater: '',
        remark: '',
        extentsion: '',
    })
}