class Message {
    constructor({id, isRead, sender, receiver, title, type, body, url, createOn, from}) {
        this.id = id
        this.isRead = isRead // 是否已读
        this.sender = sender // 发送人
        this.receiver = receiver // 接受人
        this.title = title // 标题
        this.type = type // 消息类别
        this.body = body // 消息内容
        this.from = from //来自
        this.url = url, 
        this.createOn = createOn //时间
    }
}

export function createMessage(data) {
    return new Message(data)
}