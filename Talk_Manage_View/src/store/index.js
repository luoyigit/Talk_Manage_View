import Vue from 'vue'
import Vuex from 'vuex'
import pmsStorage from '@/utils/storage/index'

Vue.use(Vuex)

const state = {
  userInfo: pmsStorage.getUserInfo(), // 用户信息
  serverAddress: pmsStorage.getServerAddress(), // 服务器地址
  messageCount: 0, // 未读消息总数
  auditCount: 0, //未审批事项总数 ,
}

const getters = {
  // 上传文件地址
  uploadAddress(state) {
    return `${state.serverAddress}/api/${window.GlobalConfig.apiVersion}`
    //return ''
  },
}

const mutations = {
  setUserInfo(state, info) {
    state.userInfo = info
  },
  setServerAddress(state, address) {
    state.serverAddress = address
  },
  setMessageCount(state, count) {
    state.messageCount = count
  },
  setAuditCount(state, count) {
    state.auditCount = count
  },
}

const actions = {
  saveUserInfo({ commit }, info) {
    commit('setUserInfo', pmsStorage.saveUserInfo(info))
  },
  saveServerAddress({ commit }, address) {
    commit('setServerAddress', pmsStorage.saveServerAddress(address))
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
