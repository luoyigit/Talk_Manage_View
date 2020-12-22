<template>
    <pms-dialog-frame ref="frame" title="设置搜索条件" width="750px">
        <pms-composite-query
            :search-code="searchCode"
            :condition-string="conditionString"
            ref="setCondition"
        >
        </pms-composite-query>
        <el-button slot="footer" type="warning" @click="clearConditions">清空</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
export default {
    name: 'pms-set-condition',
    props: {
        searchCode: {
            // 查询Id
            type: String,
            default: ''
        },
        conditionString: {
            // 条件字符串
            type: String,
            default: ''
        }
    },
    methods: {
        hide() {
            this.$refs.frame.hide()
        },
        show() {
            this.$refs.frame.show()
        },
        clearConditions() {
            this.$refs.setCondition.clearConditions()
        },
        confirm() {
            this.$refs.setCondition.sendData().then(data => {
                console.log('高级搜索条件', data)
                this.$emit('search', data)
                this.hide()
            }).catch(() => {
                this.$message({
                    type: 'error',
                    message: '请填写完整条件'
                })
            })
        }
    }
}
</script>