import getStaffList from './getStaffList'
import getDeptStaffList from './getDeptStaffList'
import searchStaff from './searchStaff'
import addStaff from './addStaff'
import editStaff from './editStaff'
import disableStaff from './disableStaff'
import enableStaff from './enableStaff'
import removeStaff from './removeStaff'
import setStaffGroups from './setStaffGroups'
import getStaffGroupList from './getStaffGroupList'
import changePassword from './changePassword'
import resetPassword from './resetPassword'
import getProjectMgr from './getProjectMgr'
import setProjectManager from './setProjectManager'
import isAssignor from './isAssignor'
import setUserRole from './setUserRole'
import clearUserRole from './clearUserRole'

export default {
    getStaffList, // 获取员工列表
    getDeptStaffList, // 获取部门员工列表
    searchStaff, // 搜索员工
    addStaff, // 添加员工
    editStaff, // 编辑员工
    disableStaff, // 禁用员工
    enableStaff, // 启用员工
    removeStaff, // 删除员工
    setStaffGroups, //设置人员用户组
    getStaffGroupList, //获取人员用户组
    changePassword, // 修改密码
    resetPassword, // 重置密码
    getProjectMgr, // 获取项目负责人
    setProjectManager, //设置和取消项目负责人,
    isAssignor, //是否是任务分配人
    setUserRole, //给用户分配角色
    clearUserRole,//取消用户角色
}