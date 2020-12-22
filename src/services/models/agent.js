// 代理机构
export class AgentData {
    constructor({address, oftenBidUrl, categoryCode, contactsPhone, contacts, contactsCellPhone, email, fax, id, indentityNO, introduction, name, phone, zipCode, qq, loginName, categoryName, password}) {
        this.address = address //地址
        this.categoryCode = categoryCode // 代理商类别
        this.contacts = contacts // 联系人
        this.contactsCellPhone = contactsCellPhone // 联系人手机
        this.contactsPhone = contactsPhone // 联系人电话
        this.email = email // 邮箱
        this.fax = fax // 
        this.id = id //
        this.indentityNO = indentityNO // 机构代码
        this.introduction = introduction // 介绍
        this.name = name // 代理机构名称
        this.phone = phone // 电话号码
        this.zipCode = zipCode // 
        this.qq = qq
        this.loginName = loginName
        this.password = password
        this.categoryName = categoryName,
        this.oftenBidUrl = oftenBidUrl
    }
    get categoryCodeName() {
        switch(this.categoryCode) {
            case 1:
            case '1':
                return '综合'
            case 2:
            case '2':
                return '货物'
            case 3:
            case '3':
                return '工程'
            case 4:
            case '4':
                return '服务'
            default:
                return ''
        }
    }
}

export function createAgentData(data) {
    return new AgentData(data)
}

export function initAgentData() {
    return new AgentData({
        address: '', //地址
        categoryCode: '', // 代理商类别
        contacts: '', // 联系人
        contactsCellPhone: '', // 联系人手机
        contactsPhone: '', // 联系人电话
        email: '', // 邮箱
        fax: '', // 
        id: '', //
        indentityNO: '', // 机构代码
        introduction: '', // 介绍
        name: '', // 代理机构名称
        phone: '', // 电话号码
        zipCode: '', // 
        qq: '',
        loginName: '',
        password: '',
        categoryName: '',
    })
}