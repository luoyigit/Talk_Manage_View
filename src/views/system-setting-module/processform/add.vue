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
            label-width="120px">
            <v-el-form :items="items" :form-data="form">
            </v-el-form>
        </el-form>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
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
             title: '添加表单'
        }
    
    },
    computed: {
          items() {
            return [
                {
                    label: '表单名称',
                    prop: 'name',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '审批路由',
                    prop: 'processUrl',
                    component: {
                        name: 'el-input'
                    }
                },
                    {
                    label: '代办标题',
                    prop: 'title',
                    component: {
                        name: 'el-input'
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
        hide() {
            this.$refs.frame.hide()
        },
        show(row) {
            if(row) {
               this.form = Object.assign({}, this.form, row)
               this.title = "编辑表单";
               
            } else{
                this.form = {}
                this.title ="添加表单"
            }
            
            this.$refs.frame.show()
        },
        init(row) {

        },
         confirm() {
              this.$refs.form.validate().then(()=>{
                  let option = {
                    data: this.form,
                    loading: {target: this.$refs.form.$el}
                }
                if(this.form.id) {
                    serviceApi.editForm(this.form).then(()=> {
                    this.hide()
                    this.$emit("search")
                  })
                } else {
                   serviceApi.addForm(this.form).then(()=> {
                    this.hide()
                    this.$emit("search")
                  })
                }
               
              })
        }
    }
}
</script>

<style>

</style>