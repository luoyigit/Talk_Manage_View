import storage from 'good-storage'

export default class ServerAddressStorage {
    ServerAddressKey = 'serverAddress'

    saveServerAddress(address) {
        storage.set(this.ServerAddressKey, address)
        return address
    }

    getServerAddress() {
        return storage.get(this.ServerAddressKey, '')
    }
}