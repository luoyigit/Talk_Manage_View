import storage from 'good-storage'

export default class UserInfoStorage {
    UserInfoKey = 'userInfo'

    saveUserInfo(info) {
        storage.set(this.UserInfoKey, info)
        return info
    }

    getUserInfo() {
        return storage.get(this.UserInfoKey, {})
    }

    clearUserInfo() {
        storage.remove(this.UserInfoKey)
        return {}
    }
}