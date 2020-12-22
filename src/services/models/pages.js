export class System {
    constructor({id, pageName, pageCode, remarks, fields}) {
        this.id = id
        this.pageName = pageName
        this.pageCode = pageCode
        this.remarks = remarks
        this.fields = fields
    }
}

export function initSystem() {
    return new System({
        id: '',
        pageName: '',
        pageCode: '',
        remarks: '',
        fields: ''
    })
}

export function createPageForm(data) {
    return new System (data) 
}

export class Parameter {
    constructor({id, sort, pageId, label, fieldName, fieldType, remoteUrl, enumDetals}) {
        this.id = id //字段管理的ID
        this.sort = sort 
        this.pageId = pageId 
        this.fieldName = fieldName 
        this.label = label 
        this.fieldType = fieldType 
        this.remoteUrl = remoteUrl 
        this.enumDetals = enumDetals
    }
    get setFieldType() {
        switch(this.fieldType) {
            case 1:
            case '1':
                return '字符串'
            case 2:
            case '2': 
                return '数字'
            case 3:
            case '3':
                return '日期'
            case 4:
            case '4':
                return '枚举'
            case 5:
            case '5':
                return '远程'
        }
    }
}

export function initParameter() {
    return new Parameter({
        id: '',
        sort: 1,
        pageId: '',
        fieldName: '',
        label: '',
        fieldType: '',
        remoteUrl: '', //远程
        enumDetals: []//枚举
    })
}

export function createParameterForm(data) {
    return new Parameter (data) 
}

export class EnumDetals {
    constructor({valEnum, enumText}) {
        this.valEnum = valEnum 
        this.enumText = enumText
    }
}

export function initEnum() {
    return new EnumDetals({
        valEnum: '',
        enumText: ''
    })
}

export function createEnumForm(data) {
    return new EnumDetals(data)
}
