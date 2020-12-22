import getList from './getlist'
import add from './add'
import edit from './edit'
import addEvent from './addEvent'
import remove from './remove'
import healthCheck from './healthCheck'
import getOnlineList from './getOnlineList'
import getOfflineList from './getOfflineList'
import savecontentconfig from './savecontentconfig'
import getsystemconfig from './getsystemconfig'
export default {
    getList, // 获取服务列表
    add, //添加服务
    edit, //编辑服务
    addEvent, //添加事件
    remove,
    healthCheck, //健康检查
    getOnlineList, //在线服务
    getOfflineList,//离线服务
    savecontentconfig, //保存配置
    getsystemconfig, //获取配置

}