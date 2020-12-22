<!--  -->
<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="showDialog"
            width="500px"
            ref="role"
        >
            <el-form :rules="rules" :model="roleForm" label-width="100px">
                <v-el-form :items="items" :form-data="roleForm"> </v-el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import serviceApi from 'services/address/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.dialogMixin],
    data() {
        return {
            formLabelWidth: '80px',
            title: '添加地址',
            edit: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入地址名',
                        trigger: 'blur',
                    },
                ],
            },
            action:1 , //1：国家，2:省份;3:城市；4：县区
            roleForm:{}
        }
    },
    props: {
        // roleForm: {
        //     type: Object,
        //     default: null,
        // },
        countryId: {
            type: String,
            default: ""
        },
        provinceId: {
            type: String,
            default:""
        },
        cityId: {
            type: String,
            default: ""
        }


    },
    computed: {
        items() {
            return [
                {
                    label: '地址名',
                    prop: 'name',
                    component: {
                        name: 'el-input',
                        attrs: {
                            // labelWidth: this.formLabelWidth,
                        },
                        data: {
                            class: 'fixed-wrap',
                        },
                    }
                }
            ]
        },
    },
    mounted() {
    
    },
    methods: {
        show(flag) {
            if (flag === true) this.edit = flag
            this.showDialog = true
            this.roleForm = {}
        },
        sure(){
           if(this.action === 1) {
              serviceApi.addcountry({name:this.roleForm.name}).then(res => {
                   this.showDialog = false
                   this.$emit("reload",1)
              })
           } else if(this.action === 2) {
                serviceApi.addprovince({name:this.roleForm.name,countryId:this.countryId }).then(res => {
                   this.showDialog = false
                   this.$emit("reload",2)
              })
           } else if(this.action === 3) {
                  serviceApi.addcity({name:this.roleForm.name,provinceId: this.provinceId }).then(res => {
                   this.showDialog = false
                   this.$emit("reload",3)
              })
           } else if(this.action === 4) {
                serviceApi.addArea({name:this.roleForm.name,cityId: this.cityId }).then(res => {
                   this.showDialog = false
                   this.$emit("reload",4)
              })
           }
        }
    },
}
</script>
<style lang="scss" scoped></style>
