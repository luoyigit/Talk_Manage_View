import mix from 'utils/mixClass.js'
import storage from 'good-storage'
import UserInfoStorage from './userinfo'
import ServerAddressStorage from './server-address'

const mixins = [UserInfoStorage, ServerAddressStorage]

class PmsStorage extends mix(mixins) {
  NotClearItems = ['global-font-size', 'routerList', 'loglevel:webpack-dev-server']

  // 清空本地存储
  clearStorage() {
    let removeList = []
    storage.forEach((key) => {
      let isExist = this.NotClearItems.some((item) => item === key)
      let isInclude = key.includes(this.ProcessNumberKey)
      if (!isExist && !isInclude) {
        removeList.push(key)
      }
    })
    removeList.forEach((key) => {
      storage.remove(key)
    })
  }
}

export default new PmsStorage()
