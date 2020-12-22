import getRemoteResult from './getRemoteResult'
import getServerAddress from './getServerAddress'
import findAttachment from './findAttachment'
import findAttachment2 from './findAttachment2'
import removeAttachment from './removeAttachment'
import getAttachment from './getAttachment'
import getMyMessage from './getMyMessage'
import readMessage from './readMessage'
import patchUpload from './patchUpload'
import validateFile from './validateFile'
import findOpenBidAttachmentList from './findOpenBidAttachmentList'
import findPbAttaachementByDealConfirmId from './findPbAttaachementByDealConfirmId'
export default {
    getRemoteResult, // 获取远程搜索字段
    getServerAddress, // 获取服务器ip
    findAttachment, // 获取附件列表
    removeAttachment, // 删除附件
    getAttachment, // 上传成功转换附件对象
    getMyMessage, // 获取我的消息列表
    readMessage, // 阅读消息
    patchUpload, // 分片上传
    validateFile, // 验证上传文件
    findAttachment2,
    findOpenBidAttachmentList,
    findPbAttaachementByDealConfirmId
}