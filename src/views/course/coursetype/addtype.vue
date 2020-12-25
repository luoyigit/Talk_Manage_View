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
import serviceApi from 'services/course/index'
export default {
    data() {
        return {
             form:{},
             formRules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
             },
             title: '添加类别'
        }
    
    },
    computed: {
          items() {
            return [
                {
                    label: '名称',
                    prop: 'name',
                    component: {
                        name: 'el-input'
                    }
                },
                {
                    label: '排序',
                    prop: 'sortIndex',
                    component: {
                        name: 'el-input-number'
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
               this.title = "编辑类别";
               
            } else{
                this.form = {sortIndex:0}
                this.title ="添加类别"
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
                    serviceApi.editcoursetype(option).then(()=> {
                    this.hide()
                    this.$emit("search")
                  })
                } else {
                   serviceApi.addcoursetype(option).then(()=> {
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