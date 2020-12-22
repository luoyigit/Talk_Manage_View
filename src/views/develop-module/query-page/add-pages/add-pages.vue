<!--  -->
<template>
  <div>
    <el-dialog 
        :title="dicTitle" 
        :visible.sync="showDialog"
        width="500px"
        ref="dicForm">
        <el-form ref="form" :model="dicForm" :rules="rules" label-width="100px">
            <v-el-form :items="items" :form-data="dicForm">
            </v-el-form>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="surePage">保存</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import pagesSetting from 'services/pages-setting/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.dialogMixin, mixins.loadingMixin],
    data() {
        var validatePageCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入页面Code'));
            } else {
                callback();
            }
        }
        var validatePageName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入类别名称'));
            } else {
                callback();
            }
        }
        return {
            formLabelWidth: '120px',
            edit: false,
            dicTitle: '添加查询页面',
            rules: {
                pageCode: [
                    { required: true, validator: validatePageCode, trigger: 'blur' }
                ],
                pageName: [
                    { required: true, validator: validatePageName, trigger: 'blur' }
                ]
            }
        };
    },
    props: {
        dicForm: {
            type: Object,
            default: null
        }
    },
    mounted() {
        this.dicFormEl = this.$refs.dicForm.$el
    },
    computed: {
        items() {
            return [
                {
                    label: '页面Code：',
                    prop: 'pageCode',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth,
                            autocomplete: 'off',
                        },
                    },
                },
                {
                    label: '页面名称：',
                    prop: 'pageName',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth
                        },
                    },
                },
                // {
                //     label: '排序号：',
                //     prop: 'number',
                //     component: {
                //         name: 'el-input',
                //         attrs: {
                //             labelWidth: this.formLabelWidth
                //         },
                //     },
                // }
            ]
        }
    },
    methods: {
        show(flag) {
            this.edit = flag
            if(flag === true) {
                this.dicTitle = '编辑查询页面'
            }else if(flag == false) {
                this.dicTitle = '添加查询页面'
            }
            this.showDialog = true
        },
        surePage() {
            this.$refs.form.validate().then(() => {
                let opt = {
                    form: this.dicForm,
                    loading: {target: this.dicFormEl}
                }
                if(this.edit === false) {
                    // 添加页面类别
                    pagesSetting.createPages(opt).then(data => {
                        this.$emit('update')
                    })
                }else if(this.edit === true) {
                    // 编辑页面类别
                    pagesSetting.editPages(opt).then(date => {
                        this.$emit('update')
                    })
                }
                this.showDialog = false
            })
        }
    }
};
</script>
<style lang='scss' scoped>
</style>