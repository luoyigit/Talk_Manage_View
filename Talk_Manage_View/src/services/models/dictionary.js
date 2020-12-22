// 基础数据
export class BaseData {
    constructor({id, val, code, name, sortIndex, remark, titleId, tabName}) {
        this.id = id
        this.val = val // 1，2，3
        this.name = name // 名称
        this.sortIndex = sortIndex // 排序
        this.remark = remark // 记录
        this.code = code // 标签编码
        this.titleId = titleId // 标签的ID
        this.tabName = tabName // 标签名
    }
}

export function createBaseData(data) {
    return new BaseData(data)
}

export function initBaseData() {
    return new BaseData({
        id: '',
        val: '',
        code: '',
        name: '',
        sortIndex: '',
        remark: '',
        titleId: '',
        tabName: '',
    })
}