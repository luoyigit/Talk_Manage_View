class ProcessTemplate {
    constructor({ id, name, conditionString, conditionText, design, formList, formType, remark, status, fieldList, subProcessFunctions }) {
        this.id = id
        this.name = name // 模板名称
        this.conditionString = conditionString // 条件字符串
        this.conditionText = conditionText // 条件描述
        this.design = design // 流程图数据
        this.formList = formList ? formList : [] // 表单列表
        this.formType = formType // 表单类型
        this.remark = remark // 备注
        this.status = status // 状态 0未发布 1已发布
        this.fieldList = fieldList ? fieldList : [] // 表单权限字段
        this.subProcessFunctions = subProcessFunctions ? subProcessFunctions : [] // 子流程方法列表
    }
    get formId() {
        let index = this.formList.findIndex((item) => item.type === this.formType)
        return index >= 0 ? this.formList[index].id : ''
    }
    get formName() {
        let index = this.formList.findIndex((item) => item.type === this.formType)
        return index >= 0 ? this.formList[index].name : ''
    }
    get statusName() {
        switch (this.status) {
            case 0:
                return '未发布'
            case 1:
                return '已发布'
            default:
                return ''
        }
    }
}

export function createTemplate(data) {
    return new ProcessTemplate(data)
}

export function initTemplate() {
    return createTemplate({
        id: '',
        name: '',
        conditionString: '',
        conditionText: '',
        design: '',
        formId: '',
        formName: '',
        formType: '',
        remark: '',
        fieldList: [],
    })
}

// 模板节点
class TempNode {
    constructor({
        text,
        nodeRemark,
        signTitle,
        handlerType,
        department,
        departmentIds,
        roleIds,
        employeeIds,
        employeeList,
        fiedlSettings,
        allowGoBack,
        autoAudit,
        allowRevoke,
        allowBackTo,
        goBackMode,
        allowAttach,
        ext,
    }) {
        this.hasData = true
        this.text = text
        this.nodeRemark = nodeRemark // 步骤备注
        this.signTitle = signTitle // 签名标题
        this.handlerType = handlerType
        this.department = department ? department : [] // 部门列表
        this.departmentIds = departmentIds ? departmentIds : [] // 部门id
        this.roleIds = roleIds ? roleIds : [] // 角色id
        this.employeeIds = employeeIds ? employeeIds : [] // 人员id
        this.employeeList = employeeList ? employeeList : [] // 人员列表
        ;(this.fiedlSettings = fiedlSettings ? fiedlSettings : []), // 字段权限设置
            (this.allowGoBack = allowGoBack ? allowGoBack : false) // 是否允许退回
        this.autoAudit = autoAudit ? autoAudit : false // 是否自动审批
        this.allowRevoke = allowRevoke ? allowRevoke : false // 是否允许撤回
        this.allowBackTo = allowBackTo ? allowBackTo : false // 是否允许退回此节点
        this.goBackMode = goBackMode ? goBackMode : 1 // 退回后重新提交模式 1: 逐重新审批 2: 提交回本步骤
        this.allowAttach = allowAttach ? allowAttach : false
        this.ext = ext
    }
}

export function createTempNode(data) {
    return new TempNode(data)
}

export function initTempNode(text) {
    return new TempNode({
        text: text ? text : '审核步骤',
        nodeRemark: '',
        signTitle: '签名',
        handlerType: 8, //主办人类型
        department: [],
        departmentIds: [],
        roleIds: [],
        employeeIds: [],
        employeeList: [],
        fiedlSettings: [],
        allowGoBack: true,
        autoAudit: true,
        allowRevoke: true,
        allowBackTo: true,
        allowAttach: false,
        goBackMode: 1,
        ext: '',
    })
}

// 模板连线
class TempLine {
    constructor({ text, hasCondition, conditions, formId }) {
        this.hasData = true // 是否有数据
        this.text = text // 连线名称
        this.hasCondition = hasCondition // 是否设置条件
        this.conditions = conditions // 条件字符串
    }
}

export function createTempLine(data) {
    return new TempLine(data)
}

export function initTempLine() {
    return new TempLine({
        text: '条件判断',
        hasCondition: false,
        conditions: '',
    })
}

// 子流程
class SubProcess {
    constructor({ text, designData, processFunction }) {
        this.hasData = true
        this.text = text // 流程名称
        this.designData = designData // 子流程图数据
        this.processFunction = processFunction // 子流程方法
    }
}

export function createSubProcess(data) {
    return new SubProcess(data)
}

export function initSubProcess(text) {
    return new SubProcess({
        text: text ? text : '子流程',
        designData: '',
        processFunction: '',
    })
}

// 转交步骤
class MergingStep {
    constructor({ text, handlerType, department, departmentIds, roleIds, employeeIds, employeeList, allowBackTo, goBackMode, allowAttach }) {
        this.hasData = true
        this.text = text
        this.handlerType = handlerType
        this.department = department ? department : [] // 部门列表
        this.departmentIds = departmentIds ? departmentIds : [] // 部门id
        this.roleIds = roleIds ? roleIds : [] // 角色id
        this.employeeIds = employeeIds ? employeeIds : [] // 人员id
        this.employeeList = employeeList ? employeeList : [] // 人员列表
        this.allowBackTo = allowBackTo ? allowBackTo : false
        this.goBackMode = goBackMode ? goBackMode : 1 // 退回后重新提交模式 1: 逐重新审批 2: 提交回本步骤
        this.allowAttach = allowAttach ? allowAttach : false
    }
}

export function createMergingStep(data) {
    return new MergingStep(data)
}

export function initMergingStep() {
    return new MergingStep({
        text: '转交步骤',
        handlerType: 1,
        department: [],
        departmentIds: [],
        roleIds: [],
        employeeIds: [],
        employeeList: [],
        allowBackTo: true,
        goBackMode: 1,
        allowAttach: false,
    })
}

class FreeProcess {
    constructor({ text }) {
        this.hasData = true
        this.text = text
    }
}

export function createFreeProcess(data) {
    return new FreeProcess(data)
}

export function initFreeProcess() {
    return new FreeProcess({
        text: '自由流程',
    })
}
