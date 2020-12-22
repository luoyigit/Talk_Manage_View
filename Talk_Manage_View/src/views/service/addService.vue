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
import serviceApi from 'services/services/index'
export default {
    data() {
        return {
             form:{},
             formRules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
             },
             title: '添加服务'
        }
    
    },
    computed: {
          items() {
            return [
                {
                    label: '服务名',
                    prop: 'serviceName',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '安装服务名',
                    prop: 'winServiceName',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: 'Ip地址',
                    prop: 'ip',
                    component: {
                        name: 'el-input'
                    }
                },
                  {
                    label: '端口号',
                    prop: 'port',
                    component: {
                        name: 'el-input'
                    }
                },
                {
                label: '健康检查地址',
                prop: 'healthCheckAddress',
                component: {
                    name: 'el-input'
                }
                },
                  {
                label: '接口文档地址',
                prop: 'swaggerUrl',
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
                },
             
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
            //    Object.assign(this.form,row) //这样并不会刷新页面
               this.title = "编辑服务";
               
            } else{
                console.log('fsf')
                this.form = {}
                this.title ="添加服务"
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
                    serviceApi.edit(option).then(()=> {
                    this.hide()
                    this.$emit("search")
                  })
                } else {
                   serviceApi.add(option).then(()=> {
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