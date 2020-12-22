// 员工
class Staff {
    constructor({id, phone, department, createdOn, employeeNo, loginId, sex, status, realName, userName, post, isProjectManager, roleName, userType}) {
        this.id = id
        this.phone = phone // 电话
        this.department = department // 部门列表
        this.createdOn = createdOn // 创建时间
        this.employeeNo = employeeNo // 工号
        this.loginId = loginId // 登陆id
        this.sex = sex // 性别 0女 1男
        this.status = status // 状态 1正常 0禁用
        this.realName = realName // 真实姓名
        this.userName = userName // 用户名
        this.post = post // 职位
        this.isProjectManager = isProjectManager
        this.roleName = roleName //角色名称
        this.userType = userType //用户类别
    }
}

export function createStaff(data) {
    return new Staff(data)
}

export function initStaff() {
    return new Staff({
        id: '',
        phone: '', // 电话
        department: [], // 部门列表
        createdOn: '', // 创建时间
        employeeNo: '', // 工号
        loginId: '', // 登陆id
        sex: 0, // 性别 0女 1男
        status: 1, // 状态 1正常 0禁用
        realName: '', // 真实姓名
        userName: '', // 用户名
        post: '', // 职位
        roleName: ''
    })
}