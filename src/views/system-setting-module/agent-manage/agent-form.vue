<!--  -->
<template>
   <el-card class="wrap" 
   v-loading="loading"
   :element-loading-text="loadingText"
   :element-loading-spinner="loadingSpinner">
       <el-form :inline="true"  ref="agentForm" :rules="rules" :model="agentForm" label-width="150px">
           <v-el-form :items="items" :form-data="agentForm">
           </v-el-form>
           <el-form-item label="机构介绍:">
               <el-input class="textareaBox" v-model="agentForm.introduction" type="textarea" placeholder="请输入内容"></el-input>
           </el-form-item>
       </el-form>
       <div class="btn-save">
           <el-button 
           type="primary"
           @click="save">保存</el-button>
       </div>
   </el-card>
</template>
<script>
import {initAgentData} from 'viewModel/agent'
import agentManage from 'services/agent-manage/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin],
    data() {
        var checkName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入代理商名称'));
            } else {
                callback();
            }
        };
        var checkCategoryCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请选择代理商类别'));
            } else {
                callback();
            }
        };
        return {
            agentForm: initAgentData(),
            rules: {
                name: [{ validator: checkName, trigger: 'blur', required: true }],
                // categoryCode: [{ validator: checkCategoryCode, trigger: 'blur', required: true }],
                indentityNO: [{ required: true, message: '请填写机构代码', trigger: 'blur' }],
                phone: [{ required: true, message: '请填写公司电话', trigger: 'blur' }],
                oftenBidUrl: [{ required: true, message: '请填写开标地址', trigger: 'blur' }],
                address: [{ required: true, message: '请填写地址', trigger: 'blur' }],
                contacts: [{ required: true, message: '请填写联系人', trigger: 'blur' }],
                contactsPhone: [{ required: true, message: '请填写联系人电话号码', trigger: 'blur' }],
                email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
                loginName: [{ required: true, message: '请填写账号', trigger: 'blur' }],
                password: [{ required: true, message: '请填写密码', trigger: 'blur' }]
            }
        };
    },
    created() {
        if(this.id) {
            this.getData()
        }else{
            this.agentForm = initAgentData()
        }
    },
    watch: {
        id(val) {
            if(val) {
                this.getData()
            }else{
                this.agentForm = initAgentData()
            }
        }
    },
    props: {
        id: {
            type: String,
            default: ''
        }
    },
    computed: {
        items() {
            return [
                {
                    label: '代理机构名称',
                    prop: 'name',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                {
                    label: '机构代码',
                    prop: 'indentityNO',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                // {
                //     label: '代理商类别:',
                //     prop: 'categoryCode',
                //     component: {
                //         name: 'el-select',
                //         attrs: {
                //             placeholder: '请选择',
                //         },
                //         data: {
                //             options: this.typeList,
                //             class: 'fixed-wrap'
                //         }
                //     }
                // },
                // {
                //     label: '代理商类别:',
                //     prop: 'categoryCode',
                //     component: {
                //         name: 'el-input',
                //         data: {
                //             class: 'fixed-wrap'
                //         }
                //     }
                // },
                {
                    label: '公司电话',
                    prop: 'phone',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                {
                    label: '地址',
                    prop: 'address',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                {
                    label: '邮箱',
                    prop: 'email',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                // {
                //     label: '传真:',
                //     prop: 'fax',
                //     component: {
                //         name: 'el-input',
                //         data: {
                //             class: 'fixed-wrap'
                //         }
                //     }
                // },
                // {
                //     label: '邮政编码:',
                //     prop: 'zipCode',
                //     component: {
                //         name: 'el-input',
                //         data: {
                //             class: 'fixed-wrap'
                //         }
                //     }
                // },
                {
                    label: '联系人',
                    prop: 'contacts',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                {
                    label: '联系人电话号码',
                    prop: 'contactsPhone',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                // {
                //     label: 'QQ:',
                //     prop: 'qq',
                //     component: {
                //         name: 'el-input',
                //         data: {
                //             class: 'fixed-wrap'
                //         }
                //     }
                // },
                // {
                //     label: '联系人手机号码:',
                //     prop: 'contactsCellPhone',
                //     component: {
                //         name: 'el-input',
                //         data: {
                //             class: 'fixed-wrap'
                //         }
                //     }
                // },
                {
                    label: '常用开标地址',
                    prop: 'oftenBidUrl',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                
                this.id ? null : {
                    label: '登录名',
                    prop: 'loginName',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        }
                    }
                },
                this.id ? null : {
                    label: '密码',
                    prop: 'password',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        },
                        attrs: {
                            type: 'password',
                        },
                    }
                }
            ]
        }
    },
    methods: {
        getData() {
            let opt = {
                agentId: this.id,
            }
            this.loading = true
            agentManage.getAgentInfo(opt).then(data => {
                this.agentForm = data
                setTimeout(() => {
                    this.$refs['agentForm'].validate((valid) => {})
                }, 200);
                
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        save() {
            this.$refs['agentForm'].validate((valid) => {
                if (valid) {
                    let opt = {
                        from: this.agentForm,
                    }
                    this.loading = true
                    if(this.agentForm.id) {
                        agentManage.getUpdateeAgent(opt).then(date => {
                            this.$emit('saveSuccess')
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    }else{
                        agentManage.getCreateAgent(opt).then(date => {
                            this.$emit('saveSuccess')
                            this.loading = false
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                } else {
                    return false;
                }
            });
        }
    }
}

</script>
<style lang='scss' scoped>
.btn-save{
    text-align: center;
}
.textareaBox /deep/.el-textarea__inner{
    min-width: 710px;
    min-height: 100px !important;
    max-height: 300px;
}

</style>