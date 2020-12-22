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
                <el-button type="primary" @click="sureRole">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import RoleManage from 'services/role-manage/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.dialogMixin],
    data() {
        return {
            formLabelWidth: '80px',
            title: '添加角色',
            edit: false,
            rules: {
                roleName: [
                    {
                        required: true,
                        message: '请输入角色名',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    props: {
        roleForm: {
            type: Object,
            default: null,
        },
    },
    computed: {
        items() {
            return [
                {
                    label: '角色名：',
                    prop: 'roleName',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth,
                        },
                        data: {
                            class: 'fixed-wrap',
                        },
                    },
                    // component: [
                    //     {
                    //         name: 'el-input',
                    //         model: {
                    //             bind: true,
                    //         },
                    //         attrs: {
                    //             // readonly: true
                    //         },
                    //         data: {
                    //             class: 'fixed-wrap',
                    //         },
                    //         event: {
                    //             change: this.inputChange
                    //         }
                    //     },
                    //     {
                    //         name: 'i',
                    //         model: {
                    //             bind: false
                    //         },
                    //         data: {
                    //             class: 'el-icon-refresh',
                    //             style: 'font-size: 24px;'
                    //         },
                    //     }
                    // ]
                },
                {
                    label: '备注：',
                    prop: 'remark',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth,
                        },
                        data: {
                            type: 'textarea',
                            class: 'fixed-wrap',
                        },
                    },
                },
            ]
        },
    },
    mounted() {
        this.roleEl = this.$refs.role.$el
    },
    methods: {
        show(flag) {
            if (flag === true) this.edit = flag
            this.showDialog = true
        },
        sureRole() {
            let opt = {
                data: this.roleForm,
                loading: { target: this.roleEl },
            }
            if (this.edit === false) {
                // 添加角色
                RoleManage.getCreateRole(opt).then((data) => {
                    this.$emit('update')
                })
            } else if (this.edit === true) {
                console.log('fff',this.roleForm)
                RoleManage.changeRoleInfo(opt).then((date) => {
                    this.$emit('update')
                    this.edit = false;
                })
            }
            this.showDialog = false
        },
        inputChange() {},
    },
}
</script>
<style lang="scss" scoped></style>
