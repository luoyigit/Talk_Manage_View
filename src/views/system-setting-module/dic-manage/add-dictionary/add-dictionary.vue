<!--  -->
<template>
  <div>
    <el-dialog 
        :title="dicTitle" 
        :visible.sync="showDialog"
        ref="dicEl"
        width="500px">
        <el-form ref="form" :rules="rules" :model="dicForm" label-width="100px">
            <v-el-form :items="items" :form-data="dicForm">
            </v-el-form>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="sureDic">保存</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import dictionaryApi from 'services/dictionary-manage/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.dialogMixin],
    data() {
        var validateTabName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入类别名称'));
            } else {
                callback();
            }
        }
        var validateCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入类别编码'));
            } else {
                callback();
            }
        }
        return {
            formLabelWidth: '120px',
            edit: false,
            dicTitle: '添加字典类别',
            rules: {
                tabName: [
                    { required: true, validator: validateTabName, trigger: 'blur' }
                ],
                code: [
                    { required: true, validator: validateCode, trigger: 'blur' }
                ]
            }
        }
    },
    props: {
        dicForm: {
            type: Object,
            default: null
        }
    },
    computed: {
        items() {
            return [
                {
                    label: '类别名称：',
                    prop: 'tabName',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth
                        },
                        data: {
                            class: 'fixed-wrap'
                        },
                    },
                },
                {
                    label: '类别编码：',
                    prop: 'code',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth
                        },
                        data: {
                            class: 'fixed-wrap'
                        },
                    },
                }
            ]
        }
    },
    mounted() {
        this.dicEl = this.$refs.dicEl.$el
    },
    methods: {
        show(flag) {
            this.edit = flag
            if(flag === true) {
                this.dicTitle = '编辑字典类别'
            }else if(flag == false) {
                this.dicTitle = '添加字典类别'
            }
                
            this.showDialog = true
        },
        sureDic() {
            this.$refs.form.validate().then(() => {
                let opt = {
                    from: this.dicForm,
                    loading: {target: this.dicEl}
                }
                if(this.edit === false) {
                    // 添加字典类别
                    dictionaryApi.createTabBaseName(opt).then(data => {
                        this.$emit('update')
                    })
                }else if(this.edit === true) {
                    // 编辑字典类别
                    dictionaryApi.editTitleName(opt).then(date => {
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