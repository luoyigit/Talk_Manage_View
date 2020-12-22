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
import serviceApi from 'services/menu/index'
export default {
    data() {
        return {
             form:{},
             formRules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
             },
             title: '添加客户端'
        }
    
    },
    computed: {
          items() {
            return [
                {
                    label: 'AppId',
                    prop: 'appId',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: 'AppSecret',
                    prop: 'appSecret',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '客户端名',
                    prop: 'clientName',
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
               this.title = "编辑客户端";
               
            } else{
                this.form = {}
                this.title ="添加客户端"
            }
            
            this.$refs.frame.show()
        },
        init(row) {

        },
         confirm() {
             console.log('sss', this.form)
              this.$refs.form.validate().then(()=>{
                  let option = {
                    data: this.form,
                    loading: {target: this.$refs.form.$el}
                }
                if(this.form.id) {
                    serviceApi.editClient(option).then(()=> {
                    this.hide()
                    this.$emit("search")
                  })
                } else {
                   serviceApi.addClient(option).then(()=> {
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