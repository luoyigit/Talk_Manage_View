import errorHandle from 'utils/error-handle'
import {mapState, mapGetters} from 'vuex'

export default {
    computed: {
        uploadHeader() {
            return {
                Authorization: 'bearer ' + this.userInfo.token
            }
        },
        ...mapState({
            userInfo: state => state.userInfo
        }),
        ...mapGetters([
            'uploadAddress'
        ])
    },
    data() {
        return {
            enableExtensions: ['xls', 'xlsx', 'doc', 'docx'],
            maxUploadSize: 20 * 1024 * 1024, // 上传最大文件限制

        }
    },
    methods: {
        uploadErr(err) {
            if (err.response && err.response.status) {
                errorHandle.requestError(err)
            } else {
                this.$message({type: 'error', message: '文件上传失败'})
            }
        },
        // 检查附件类型
        checkAttachmentType(file) {
            let index = this.enableExtensions.findIndex(item => item === file.name.split('.')[1])
            if (index < 0) {
                let tip = this.enableExtensions.join('、')
                this.$message({type: 'error', message: `请上传${tip}文件`})
            }
            return index >= 0
        }
    }
}