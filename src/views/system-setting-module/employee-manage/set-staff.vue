<template>
    <pms-dialog-frame
        ref="frame"
        :title="title"
        width="500px"
        :show-close="false"
        @open="init">
        <el-form
            :model="form"
            status-icon
            :rules="formRules"
            ref="form"
            label-width="90px">
            <v-el-form :items="items" :form-data="form">
                <template slot="department">
                    <!-- <treeselect v-model="chooseDep" :multiple="true" :options="departments" /> -->
                    <selectDep v-model="form.department" :multiple="false"></selectDep>
                </template>
            </v-el-form>
        </el-form>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
import {initStaff} from 'viewModel/staff'
import staffApi from 'services/staff-manage/index'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import selectDep from 'components/select-departments'
export default {
    props: {
        currentStaff: {
            type: Object,
            default: initStaff()
        }
    },
    components: { 
        Treeselect ,
        selectDep
        },
    data() {
        let checkUserName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入登录名'))
            } else {
                var regx = /^[a-z|A-Z|0-9]{4,20}$/
                if (!regx.test(value)) {
                    callback(new Error('登录名必须是4-20个英文、数字字符的组合'))
                }
                callback()
                
            }
        }
        let checkConfirmPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        let checkPhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入电话号码'))
            } else {
                var regx = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/
                if (!regx.test(value)) {
                    callback(new Error('电话号码格式有误'))
                }
                callback()
            }
        }
        let checkDept = (rule, value, callback) => {
            if (value.length === 0) {
                callback(new Error('请选择部门'))
            } else {
                callback()
            }
        }
        return {
            form: Object.assign({confirmPassword: '', password: ''}, initStaff()),
            formRules: {
                userName: [{ required: true, validator: checkUserName, trigger: 'blur' }],
                // employeeNo: [{ required: true, message: '请填写工号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                confirmPassword: [{required: true, validator: checkConfirmPassword, trigger: 'blur'}],
                realName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
                phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
                //sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                department: [{ required: true, validator: checkDept, trigger: 'change' }],
            },
            chooseDep:null,
            departments: [ {
                    id: 'a',
                    label: 'a',
                    children: [ {
                        id: 'aa',
                        label: 'aa',
                    }, {
                        id: 'ab',
                        label: 'ab',
                    } ],
                    }, {
                    id: 'b',
                    label: 'b',
                    }, {
                    id: 'c',
                    label: 'c',
                    } ],
        }
    },
    computed: {
        title() {
            return this.form.id ? '编辑员工信息' : '添加员工'
        },
        isEdit() {
            return this.form.id ? true : false
        },
        items() {
            return [
                // !this.isEdit ? {
                //     label: '登录名',
                //     prop: 'userName',
                //     component: {
                //         name: 'el-input'
                //     }
                // } : null,
                {
                    label: '登录名',
                    prop: 'userName',
                    component: {
                        name: 'el-input'
                    }
                },
                // {
                //     label: '工号',
                //     prop: 'employeeNo',
                //     component: {
                //         name: 'el-input'
                //     }
                // },
                !this.isEdit ? {
                    label: '密码',
                    prop: 'password',
                    component: {
                        name: 'el-input',
                        attrs: {
                            type: 'password'
                        }
                    }
                } : null,
                !this.isEdit ? {
                    label: '确认密码',
                    prop: 'confirmPassword',
                    component: {
                        name: 'el-input',
                        attrs: {
                            type: 'password'
                        }
                    }
                } : null,
                {
                    label: '姓名',
                    prop: 'realName',
                    component: {
                        name: 'el-input'
                    }
                },
                // {
                //     label: '部门',
                //     prop: 'department',
                // },
                // {
                //     label: '部门',
                //     prop: 'department',
                //     component: {
                //         name: 'pms-select-dept',
                //         attrs: {
                //             multiple: true
                //         }
                //     }
                // },
                // {
                //     label: '性别',
                //     prop: 'sex',
                //     component: {
                //         name: 'v-el-radio',
                //         attrs: {
                //             radios: [
                //                 {
                //                     label: '男',
                //                     value: 1
                //                 },
                //                 {
                //                     label: '女',
                //                     value: 0
                //                 }
                //             ]
                //         }
                //     }
                // },
                {
                    label: '电话',
                    prop: 'phone',
                    component: {
                        name: 'el-input'
                    }
                }
            ]
        }
    },
    methods: {
        hide() {
            this.$refs.frame.hide()
        },
        show() {
            this.$refs.frame.show()
        },
        init() {
            this.form = Object.assign({password: '', confirmPassword: ''}, this.currentStaff)
            if(this.form.department.length == 0) {
                this.form.department = null
            } else {
                this.form.department = this.form.department.map(item => {return item.id})
            }
              
            console.log('初始部门', this.form.department)
            this.$nextTick(() => {
                this.$refs['form'].clearValidate()
            })
        },
        confirm() {
            // console.log('va', this.chooseDep)
            this.$refs.form.validate().then(() => {
                let option = {
                    data: this.form,
                    loading: {target: this.$refs.form.$el}
                }
                if (this.form.id) {
                    staffApi.editStaff(option).then(() => {
                        this.$emit('refresh')
                        this.hide()
                    })
                } else {
                    staffApi.addStaff(option).then(() => {
                        this.$emit('refresh')
                        this.hide()
                    })
                }
            })
        }
    }
}
</script>