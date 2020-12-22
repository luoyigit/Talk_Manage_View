<template>
    <pms-dialog-frame
        ref="frame"
        title="设置自由流程"
        append-to-body
        width="500px"
    >
        <div class="dialog-content">
            <el-form ref="form" :model="freeProcess" :rules="rules" label-width="100px">
                <el-form-item label="流程名称" prop="text">
                    <el-input 
                        type="text" 
                        v-model="freeProcess.text" 
                        :autofocus="true">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
export default {
    props: {
        formData: {type: Object},
        freeProcess: {type: Object},
    },
    data() {
        return {
            rules: {
                text: [{required: true, message: '请输入流程名称', trigger: 'blur'}],
            }
        }
    },
    methods: {
        show() {
            this.$refs.frame.show()
        },
        hide() {
            this.$refs.frame.hide()
        },
        confirm() {
            this.$refs.form.validate().then(() => {
                this.$emit('confirm')
            })
        }
    }
}
</script>