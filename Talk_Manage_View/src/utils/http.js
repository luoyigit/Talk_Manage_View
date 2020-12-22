import axios from 'axios'
import {Loading} from 'element-ui'
import {MessageBox, Message} from 'element-ui'
import pmsStorage from 'utils/storage/index'

const text = window.GlobalConfig.loadingText
const spinner = window.GlobalConfig.loadingSpinner
const host = window.GlobalConfig.baseUrl

class Http {
    get(options) {
        return new Promise((resolve, reject) => {
            let {data, loading, ...config} = options
            let option = {
                method: 'get',
                params: data ? data : {},
            }
            let params = Object.assign(option, config)
            let loadingOpt = loading ? Object.assign({text, spinner}, loading) : null
            let loadingIns = loadingOpt ? Loading.service(loadingOpt) : null
            axios(params)
                .then((res) => {
                    if (loadingIns) {
                        loadingIns.close()
                    }
                    resolve(res)
                })
                .catch((err) => {
                    if (loadingIns) {
                        loadingIns.close()
                    }
                    reject()
                })
        })
    }

    post(options) {
        return new Promise((resolve, reject) => {
            let option = {method: 'post', data: {}}
            let {loading, ...config} = options
            let params = Object.assign(option, config)
            let loadingOpt = loading ? Object.assign({text, spinner}, loading) : null
            let loadingIns = loadingOpt ? Loading.service(loadingOpt) : null
            axios(params)
                .then((res) => {
                    if (loadingIns) {
                        loadingIns.close()
                    }
                    resolve(res)
                })
                .catch((err) => {
                    if (loadingIns) {
                        loadingIns.close()
                    }
                    // if(err && err.data) {
                    //     if(err.data.error_description) {
                    //         MessageBox.alert(err.data.error_description, '提示', { confirmButtonText: '确定', type: 'error' })
                    //         return;
                    //     }
                    // }
                    reject(err)
                })
        })
    }

    getUplaodHeaders() {
        return {
            Authorization: 'bearer ' + pmsStorage.getUserInfo().token
        }
    }

    getFileUrl(fileid) {
        return `${host}/${this.file}/mzfile?fileid=${fileid}`
    }

    constructor() {
        this.admin = "z" //后台管理系统的路由前缀
        this.log = "l" //日志服务
        this.user = "u"  // 用户服务
        this.file = "f0" //文件服务
        this.goods = "g0" //商品服务
        this.project = "p" //项目服务
        this.permission = "qx" //权限服务
        this.singleUploadUrl = `${host}/${this.file}/BufferedSingleFileUploadPhysical`
        this.multiUploadUrl = `${host}/${this.file}/BufferedMultipleFileUploadPhysical`
        this.downfileurl = `${host}/${this.file}/mzfile`
        this.StaticFilesUrl = `${host}/mzfiles`
        this.downvideourl = `${host}/${this.file}/video`
    }

}

export default new Http()
