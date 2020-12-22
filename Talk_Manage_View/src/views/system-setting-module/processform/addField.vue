<template>
    <pms-dialog-frame
        ref="frame"
        :title="title"
        width="800px"
        :show-close="true"
        @open="init">
        <div class="container">
            <div class="left">
                <el-form
                :model="form"
                status-icon
                :rules="formRules"
                ref="form"
                label-width="120px">
                <v-el-form :items="items" :form-data="form">
                </v-el-form>
            </el-form>
            <el-button slot="footer" type="warning" @click="hide">取消</el-button>
              <el-button slot="footer" type="info" @click="clear">清空</el-button>
            <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
            </div>
            <div class="right">
                <v-el-table :data="fieldList" :columns="columns">
                    <template slot="action" slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="edit(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="remove(scope.row)"></el-button>
                    </template>
                </v-el-table>
            </div>
        </div>
      
     
      
    </pms-dialog-frame>
</template>

<script>
import serviceApi from 'services/FormService/index'
export default {
    data() {
        return {
             form:{},
             formRules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
             },
             title: '管理表单字段',
             fieldTypeEnum:[
                 { name: '字符串', value: 1},
                 { name: '整数', value: 2},
                 { name: '日期', value: 3},
                 { name: '布尔', value: 6},
                 { name: '浮点', value: 7}
             ],
             fieldList:[],
             
             columns: [
                {
                    label: '字段名',
                    prop: 'code',
                },
                 {
                    label: '显示名',
                    prop: 'name',
                },
                {
                    label: '字段类型',
                    prop: 'fieldType',
                },
                    {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: "100"
                    }
                },
             ]
        }
    
    },
    computed: {
          items() {
            return [
                {
                    label: '字段名',
                    prop: 'code',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '显示名',
                    prop: 'name',
                    component: {
                        name: 'el-input'
                    }
                },
                   {
                    label: '字段类型',
                    prop: 'fieldType',
                    component: {
                        name: 'v-el-select',
                        attrs: {
                                options: this.fieldTypeEnum ? this.fieldTypeEnum.map((item) => {
                                    return {
                                    label: item.name,
                                    value: item.value,
                                    }
                                }):[],
                                placeholder: '请选择表单',
                                },
                         }
                },
                 {
                    label: '排序号',
                    prop: 'sortIndex',
                    component: {
                        name: 'el-input-number'
                    }
                },
                  {
                    label: '是否显示',
                    prop: 'isShow',
                    component: {
                        name: 'el-switch',
                        attrs: {
                            activeText:"是",
                            inactiveText:"否"
                        }
                    }
                },
                  {
                    label: '备注',
                    prop: 'remark',
                    component: {
                        name: 'el-input'
                    }
                }
            ]
        }
    },
    methods: {
        clear(){
            this.form = Object.assign({}, {formId: this.form.formId,sortIndex:0,isShow:true})
        },
        hide() {
            this.$refs.frame.hide()
        },
        show(formId) {
              console.log('rrrr',formId)
            this.form = Object.assign({}, this.form, {formId: formId,sortIndex:0,isShow:true})
            this.getFormfile()
             this.$refs.frame.show()
           
        },
        init(row) {

        },
        edit(row){
            this.form = Object.assign({}, this.form, row)
        },
        remove(row){
            serviceApi.deleteFormField(row.id).then(res => {
                this.getFormfile()
            })
        },
        getFormfile(){
           serviceApi.getFormField(this.form.formId).then(res =>{
               this.fieldList = res
           })
        },
        confirm() {
              this.$refs.form.validate().then(()=>{
                  let option = {
                    data: this.form,
                    loading: {target: this.$refs.form.$el}
                }
                if(this.form.id) {
                    serviceApi.editFormField(this.form).then(()=> {
                    this.getFormfile()
                  })
                } else {
                   serviceApi.addFormField(this.form).then(()=> {
                       this.getFormfile()
                  })
                }
               
              })
        }
    }
}
</script>

<style scoped lang="scss">
   .left {
      width: 250px;
   }

   .right {
       margin-left: 20px;
       width: 500px;
       height: 300px;
   }

   .container {
       display: flex;
   }
</style>