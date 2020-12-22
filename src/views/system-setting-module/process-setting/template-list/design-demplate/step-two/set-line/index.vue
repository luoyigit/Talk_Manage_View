<template>
    <pms-dialog-frame ref="frame" title="条件设置" append-to-body width="800px" @open="init">
        <el-form class="form" :model="currentLine" label-width="100px">
            <el-form-item label="备注" prop="text">
                <el-input v-model="currentLine.text"></el-input>
            </el-form-item>
            <el-form-item label="条件" prop="hasCondition">
                <el-radio v-model="currentLine.hasCondition" :label="false">无条件</el-radio>
                <el-radio v-model="currentLine.hasCondition" :label="true">有条件</el-radio>
            </el-form-item>
        </el-form>
        <pms-composite-query v-if="currentLine.hasCondition" ref="query" :form-id="formData.formId" :condition-string="currentLine.conditions">
        </pms-composite-query>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
export default {
    props: {
        currentLine: { type: Object },
        formData: { type: Object },
    },
    methods: {
        show() {
            this.$refs.frame.show()
        },
        hide() {
            this.$refs.frame.hide()
        },
        init() {
            if (this.currentLine.hasCondition) {
                this.$nextTick(() => {
                    this.$refs.query.clearData()
                    this.$refs.query.init()
                })
            }
        },
        confirm() {
            if (this.currentLine.hasCondition) {
                if (this.$refs.query.validate()) {
                    this.$refs.query.sendData().then((data) => {
                        this.currentLine.conditions = data
                        this.$emit('confirm')
                    })
                }
            } else {
                this.currentLine.conditions = ''
                this.$emit('confirm')
            }
        },
    },
}
</script>
