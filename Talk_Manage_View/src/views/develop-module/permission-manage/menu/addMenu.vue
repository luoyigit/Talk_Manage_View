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
                 <template slot="pt">
                      <el-radio v-model="pt" :label="0">模块</el-radio>
                      <el-radio v-model="pt" :label="1">菜单</el-radio>
                      <el-radio v-model="pt" :label="2">功能</el-radio>
                      <el-radio v-model="pt" :label="3">资源</el-radio>
                 </template>
                 <template slot="isShow">
                     <el-switch
                    v-model="isShow"
                    active-text="是"
                    inactive-text="否">
                    </el-switch>
                 </template>
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
                name: [{ required: true, message: '请输入权限名', trigger: 'blur' }],
             },
             title: '添加权限',
             pt: 0,
             isShow: true,
             father:''
        }
    
    },
    props: {
        clientId: {type: String},
      
    },
    computed: {
          items() {
            return [
                {
                    label: '权限名',
                    prop: 'name',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '权限的key',
                    prop: 'key',
                    component: {
                        name: 'el-input',
                        attrs: {
                           disabled: true
                        }
                    },
                   
                },
                  {
                    label: '前端路由',
                    prop: 'htmlRoute',
                    component: {
                        name: 'el-input'
                    }
                },
                {
                    label: '权限类别',
                    prop: 'pt',
                    component: {
                        name: 'el-input'
                    }
                },
                   {
                    label: '是否显示',
                    prop: 'isShow'
                },
                 {
                    label: '排序号',
                    prop: 'sortIndex',
                    component: {
                        name: 'el-input-number'
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
        show(id) {
            if(id) {
                serviceApi.getMenuDetail(id).then(res => {
                    this.form = Object.assign({}, this.form, res)
                    this.form.pt = res.pt
                    this.form.father = res.father
                    this.form.isShow = res.isShow
                    this.pt = res.pt
                    this.father = res.father
                    this.isShow = res.isShow
                })
               
               this.title = "编辑权限";
               
            } else{
                this.form = {}
                serviceApi.getMenuKey().then(res => {
                         this.form.sortIndex = 0 
                         this.form.key = res 
                         this.title ="添加权限"
                })
             
            }
            
            this.$refs.frame.show()
        },
        init(row) {

        },
         confirm() {
            //  console.log('sss', this.form)
             this.form.isShow = this.isShow
             this.form.pt = this.pt
             this.form.clientId = this.clientId
             this.form.father = this.father
              this.$refs.form.validate().then(()=>{
                  let option = {
                    data: this.form,
                    loading: {target: this.$refs.form.$el}
                }
                if(this.form.id) {
                    serviceApi.editMenu(option).then(()=> {
                    this.hide()
                    this.$emit("search")
                  })
                } else {
                    // console.log('fsfsdfsf',option)
                   serviceApi.addMenu(option).then(()=> {
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