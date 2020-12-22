import getMenu from './get-menu'
import getRole from './get-role'
import getAllRoleList from './getAllRoleList'
import changeRoleInfo from './changeRoleInfo'
import getCreateRole from './getCreateRole'
import getMenuList from './getMenuList'
import getRemoveRole from './getRemoveRole'
import setRole from './set-role'
import getProMgrList from './getProMgrList'
import getUserListByRoleId from './getUserListByRoleId'
import setUserToRole from './setUserToRole'
import removeUserFromRole from './removeUserFromRole'
import editRole from './editRole'
import typeTree from './configure-role-tree'
import client from './configure-role-port'
import addRoleQx from './addRoleQx'
import getRoleMenus from './getRoleMenus'
export default {
    getMenu,
    getRole,
    getAllRoleList,
    changeRoleInfo,
    getCreateRole,
    getMenuList,
    getRemoveRole,
    setRole,
    getProMgrList, // 获取所有角色为项目负责人的人员
    getUserListByRoleId,
    setUserToRole,
    removeUserFromRole,
    editRole,
    typeTree,
    client,
    addRoleQx,
    getRoleMenus
}