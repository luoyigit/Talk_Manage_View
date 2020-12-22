import createTemplate from './createTemplate'
import editTemplate from './editTemplate'
import getTemplateInfo from './getTemplateInfo'
import getTemplateList from './getTemplateList'
import removeTemp from './removeTemp'
import changeTempStatus from './changeTempStatus'
import getLineStep from './getLineStep'
import getBackLogCount from  './getBackLogCount'
import getMyBacklogList from  './getMyBacklogList'

export default {
  createTemplate, // 创建模板
  editTemplate, // 编辑模板
  getTemplateInfo, // 获取模板信息
  getTemplateList, // 获取模板列表
  removeTemp, // 删除模板
  changeTempStatus, // 修改模板状态
  getLineStep, // 获取直线节点
  getBackLogCount, //获取待办事项总数
  getMyBacklogList, //获取待办事项列表
}
