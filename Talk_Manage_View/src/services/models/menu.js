// 权限菜单的信息
export class MenuInfo {
    constructor({id, parentId, name, path, sortIndex, isShow, functionList}) {
        this.id = id
        this.parentId = parentId // 父节点Id
        this.name = name // 菜单名称
        this.path = path // 菜单路径
        this.sortIndex = sortIndex // 菜单排序号
        this.isShow = isShow // 是否显示 '1'显示 '0'不显示
        this.functionList = functionList // 菜单的功能列表
    }
}

export function createMenuInfo(data) {
    return new MenuInfo(data)
}

export function initMenuInfo() {
    return new MenuInfo({
        id: '',
        parentId: '',
        name: '',
        path: '',
        sortIndex: 1,
        isShow: 1,
        functionList: []
    })
}

// 菜单路由
export class MenuRoute {
    constructor({id, name, path}) {
        this.id = id
        this.name = name
        this.path = path
    }
}

export function createMenuRoute(data) {
    return new MenuRoute(data)
}

export function initMenuRoute() {
    return new MenuRoute({
        id: '',
        name: '',
        path: ''
    })
}

// 菜单权限功能
export class MenuFunction {
    constructor({id, name, remark}) {
        this.id = id
        this.name = name // 名称
        this.remark = remark // 备注
    }
}

export function createMenuFunc(data) {
    return new MenuFunction(data)
}

export function initMenuFunc() {
    return new MenuFunction({
        id: '',
        name: '',
        remark: ''
    })
}

// 菜单功能路由
export class MenuFuncRoute {
    constructor({id, name, path}) {
        this.id = id
        this.name = name // 路由名称
        this.path = path // 路由路径
    }
}

export function createFuncRoute(data) {
    return new MenuFuncRoute(data)
}

export function initFuncRoute() {
    return new MenuFuncRoute({
        id: '',
        name: '',
        path: ''
    })
}

// 界面元素
export class UiKey {
    constructor({id, code, remark}) {
        this.id = id
        this.code = code
        this.remark = remark
    }
}

export function createUiKey(data) {
    return new UiKey(data)
}

export function initUiKey() {
    return new UiKey({
        id: '',
        code: '',
        remark: ''
    })
}

