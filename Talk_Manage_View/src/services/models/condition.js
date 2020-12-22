// 查询条件
export class Condition {
    constructor({ field, operator, val, linkType }) {
        this.field = field
        this.operator = operator
        this.val = val
        this.linkType = linkType
    }
    get fieldCode() {
        return this.field.code
    }
    get operators() {
        console.log('hhhh', this.field)
        return getOperators(this.field.fieldType)
    }
    get linkCode() {
        return changeLinkType(this.linkType)
    }
    get operatorName() {
        switch (this.operator) {
            case '>=':
                return '大于等于'
            case '<=':
                return '小于等于'
            case '>':
                return '大于'
            case '<':
                return '小于'
            case '=':
                return '等于'
            case '%%':
                return '包含'
            default:
                return ''
        }
    }
    get linkName() {
        switch (this.linkType) {
            case '1':
                return '并且'
            case '2':
                return '或者'
            default:
                return ''
        }
    }
}

export function getOperators(fieldType) {
    switch (fieldType) {
        // 数字类型
        case '2':
        case 2:
            return [
                {
                    label: '大于等于',
                    value: '>=',
                },
                {
                    label: '小于等于',
                    value: '<=',
                },
                {
                    label: '大于',
                    value: '>',
                },
                {
                    label: '等于',
                    value: '=',
                },
                {
                    label: '小于',
                    value: '<',
                },
            ]
        // 字符串
        case '1':
        case 1:
            return [
                {
                    label: '等于',
                    value: '=',
                },
                {
                    label: '不等于',
                    value: '!=',
                },
                {
                    label: '包含',
                    value: '%%',
                },
                {
                    label: '不包含',
                    value: '!$',
                },
            ]
        // 日期类型
        case '3':
        case 3:
            return [
                {
                    label: '大于',
                    value: '>',
                },
                {
                    label: '小于',
                    value: '<',
                },
            ]
        // 枚举类型
        case '4':
        case 4:
            return [
                {
                    label: '等于',
                    value: '=',
                },
            ]
        // 远程搜索类型
        case '5':
        case 5:
            return [
                {
                    label: '等于',
                    value: '=',
                },
            ]
        case '6':
        case 6:
            return [
                {
                    label: '等于',
                    value: '=',
                },
            ]
        default:
            return []
    }
}

export function changeLinkType(linkType) {
    switch (linkType) {
        case '1':
            return '&'
        case '2':
            return '|'
        default:
            return ''
    }
}

export function getConditionString(conditions) {
    let str = ''
    conditions.forEach((item) => {
        if (item.fieldCode && item.operator && item.val) {
            str += item.fieldCode + item.operator + item.val + item.linkCode
        }
    })
    return str
}

export function stringToConditions(fields, str) {
    if (fields && str) {
        let re = /(\w+)([\=\-\+\<\>\%]+)([\w\u4e00-\u9fa5]+)/g
        let linktype = str.includes('&') ? '1' : '2'
        let conditions = []
        let result
        console.log(fields)
        while ((result = re.exec(str)) !== null) {
            let condition = initCondition()
            let code = result[1]
            let field = fields.filter((item) => item.code === code)[0]
            condition.field = field
            condition.operator = result[2]
            condition.val = result[3]
            condition.linkType = linktype
            conditions.push(condition)
        }
         conditions[conditions.length - 1].linkType = '0'
        return conditions
    } else {
        return []
    }
}

export function initCondition() {
    return new Condition({
        field: initField(),
        operator: '',
        val: '',
        linkType: '0',
    })
}

export class Field {
    constructor({ id, code, label, type, sortIndex, options, remoteUrl }) {
        this.id = id
        this.code = code // 字段名
        this.label = label // 名称
        this.type = type // 类型
        this.sortIndex = sortIndex // 排序
        this.options = options // 当字段为枚举类型时的选项
        this.remoteUrl = remoteUrl // 当字段类型为远程搜索类型时的接口地址
    }
    get typeName() {
        switch (parseInt(this.type)) {
            // 数字类型
            case 2:
                return '数字类型'
            // 字符串
            case 1:
                return '字符串'
            // 日期类型
            case 3:
                return '日期'
            // 枚举类型
            case 4:
                return '枚举'
            // 远程搜索类型
            case 5:
                return '远程搜索'
            case 6:
                return '布尔'
            default:
                return []
        }
    }
}

export function createField(field) {
    return new Field(field)
}

export function initField() {
    return new Field({
        id: '',
        code: '',
        label: '',
        type: '',
        sortIndex: 1,
        options: [],
        remoteUrl: '',
    })
}

// 枚举类型时的选项
export class FieldOption {
    constructor({ val, label }) {
        this.val = val
        this.label = label
    }
}

export function createFieldOption(data) {
    return new FieldOption(data)
}

export class ConditionSearch {
    constructor({ name, code, type }) {
        this.name = name
        this.code = code
        this.type = type
    }
    get operator() {
        switch (this.type) {
            case '1':
            case 1:
                return '='
            case '2':
            case 2:
                return '%%'
        }
    }
}

export function createConditionSearch(data) {
    return new ConditionSearch(data)
}
