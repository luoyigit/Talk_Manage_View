<template>
    <pms-dialog-frame
        ref="frame"
        title="判断名称设置"
        append-to-body
        width="800px"
        @open="init"
    >
        <el-form
            class="form"
            ref="form"
            :model="model"
            :rules="rules"
            label-width="100px"
        >
            <el-form-item label="判断名" prop="text">
                <el-input v-model="model.text"></el-input>
            </el-form-item>
        </el-form>

        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm"
            >确定</el-button
        >
    </pms-dialog-frame>
</template>

<script>
export default {
    data() {
        return {
            model: {
                text: '条件判断',
            },
            rules: {
                text: [
                    {
                        required: true,
                        message: '请输入判断名称',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    methods: {
        show() {
            this.$refs.frame.show()
        },
        hide() {
            this.$refs.frame.hide()
        },
        init() {
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        confirm() {
            this.$refs.form.validate().then(() => {
                this.$emit('confirm', this.model.text)
            })
        },
    },
    components: {},
}
</script>

<style lang="scss" scoped></style>
