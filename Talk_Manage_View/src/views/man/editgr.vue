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
                <template slot="skills">
                    <el-select v-model="selectSkills" placeholder="请选择技能"  style="width:100%;" ref="selectReport" multiple @remove-tag="removeTag"> 
                    <el-option  :label="currentChoose.label" :value="currentChoose.id" :key="currentChoose.id" style="height:200px;width:100%;overflow:auto;background-color:#fff">
                        <el-tree
                                :data="skillTree"
                                @node-click="handleNodeClick"
                        ></el-tree>
                    </el-option>
                    </el-select>
                </template>
            </v-el-form>
        </el-form>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
import serviceApi from 'services/vip/index'
import skillApi from 'services/skill/index'
export default {
    data() {
        return {
             form:{},
             formRules: {
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
             },
             title: '添加服务',
             skillTree:[],
             selectSkills:[],
             selectSkillIds:[],
             currentChoose:{}
        }
    
    },
    computed: {
          items() {
            return [
                {
                    label: '真名',
                    prop: 'realName',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '联系电话',
                    prop: 'phone',
                    component: {
                        name: 'el-input'
                    }
                },
                 {
                    label: '技能',
                    prop: 'skills',
                    component: {
                        name: 'el-input'
                    }
                },
                  {
                    label: '个人介绍',
                    prop: 'introduce',
                    component: {
                        name: 'el-input'
                    },
                    attrs: {
                        type: 'textarea',
                    },
                },
            ]
        }
    },
    methods: {
        removeTag(node){
            console.log('nnn', this.selectSkillIds)
            const index = this.selectSkillIds.findIndex(d => d.label === node);
            console.log('index',index)
            if(index >= 0) {
                this.selectSkillIds.splice(index,1);
            }
           
        },
        handleNodeClick(node){
                 if(node.depth <1) {
                     return
                 }
                if(this.selectSkillIds.findIndex(m=>m.id == node.id) < 0) {
                        this.selectSkills.push(node.label)
                        this.selectSkillIds.push(node)
                }
               
                if(node.children){
 
                }else{
                    this.$refs.selectReport.blur()
                }

        },
        hide() {
            this.$refs.frame.hide()
        },
        show(row) {
            if(row) {
               this.form = Object.assign({}, this.form, row)
            //    Object.assign(this.form,row) //这样并不会刷新页面
               this.title = "编辑信息";
                this.selectSkills = row.skills.map(item => {
                 return item.skillName
                })
                this.selectSkillIds = row.skills.map(item => {
                    return {
                          label:item.skillName,
                          id: item.skillId
                    }
                })
            } else{
                console.log('fsf')
                this.form = {}
                this.title ="添加服务"
            }
            
            this.$refs.frame.show()
        },
        init(row) {
            // if(row){
            //      this.selectSkills = row.skills.map(item => {
            //      return item.skillName
            //     })
            //     this.selectSkillIds = row.skills.map(item => {
            //         return item.skillId
            //     })

            // }
            
        },
         confirm() {
             if (!(/^1[34578]\d{9}$/.test(this.form.phone))) {
                 alert("电话号码格式错误");
                 return;
             }
             this.form.skills = this.selectSkillIds.map(item => {
                 return item.id
             })
             this.$refs.form.validate().then(()=>{
                  let option = {
                    data: this.form,
                    loading: {target: this.$refs.form.$el}
                }
                 serviceApi.editworker(this.form).then(res => {
                     this.hide()
                     this.$emit("getlist")
                 })
              })
        }
    },
    created() {
        skillApi.gettree({depth:4}).then(res => {
            this.skillTree = res
        })
    }
}
</script>

<style lang="scss" scoped>
/deep/.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 80%;
}
</style>