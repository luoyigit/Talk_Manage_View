<template>
    <v-el-grid-between
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-spinner="loadingSpinner"
        :left-props="{ span: 9 }"
        :right-props="{ span: 15 }"
        class="dept-manage"
    >
        <el-card slot="left" class="left-wrap">
            <el-scrollbar class="scroll">
                <pms-dept-tree @get-tree-data="getTreeData" @node-click="nodeClick" ref="deptTree"></pms-dept-tree>
            </el-scrollbar>
        </el-card>

        <div class="right-wrap" slot="right">
            <el-card class="top" ref="top">
                <el-form :model="formData" :rules="formRules" status-icon ref="formData" label-width="100px">
                    <v-el-form :items="deptFormItems" :form-data="formData"></v-el-form>
                </el-form>
                <el-row class="btn-wrap">
                    <el-button type="primary" @click="saveForm">保存</el-button>
                    <el-button type="warning" @click="resetForm" v-show="formData.id">重置</el-button>
                    <el-button type="danger" v-show="formData.id" @click="removeDept">删除</el-button>
                </el-row>
            </el-card>

            <el-card class="bottom" ref="bottom">
                <el-tabs v-model="tabName">
                    <el-tab-pane label="员工" name="staff" class="panel">
                        <!-- <layout-search-bar v-show="formData.id">
                            <el-button
                                type="primary" 
                                slot="left" 
                                @click="$refs.selectStaff.show()">
                                添加员工
                            </el-button>
                        </layout-search-bar>
                        <select-dept-staff ref="selectStaff" :dept-staff-list="staffList" :dept-id="formData.id" @add-success="addStaff">
                        </select-dept-staff> -->
                        <v-el-table :data="staffList" :height="360" :columns="columns"> </v-el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </v-el-grid-between>
</template>

<script>
import deptApi from 'services/dept-manage/index'
import { initDept } from 'viewModel/department'
import mixins from 'mixins/index'
import staffApi from 'services/staff-manage/index'
import SelectDeptStaff from './select-dept-staff/index'

export default {
    mixins: [mixins.loadingMixin],
    components: {
        SelectDeptStaff,
    },
    data() {
        return {
            deptTreeList: [], // 属性选择器数据
            treeProps: {
                value: 'id',
                label: 'label',
                children: 'children',
            },
            tabName: 'staff',
            formData: initDept(),
            loading: true,
            formRules: {
                name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
            },
            staffList: [],
            columns: [
                {
                    type: 'index',
                    attrs: {
                        width: 40,
                    },
                },
                {
                    label: '登录名',
                    prop: 'userName',
                },
                {
                    label: '姓名',
                    prop: 'realName',
                },
                {
                    label: '角色名',
                    prop: 'roleName',
                },
                {
                    label: '手机号',
                    prop: 'phone',
                },
            ],
            rootId: '', // 根节点id
        }
    },
    computed: {
        deptFormItems() {
            return [
                {
                    label: '上级部门',
                    prop: 'parentId',
                    component: {
                        name: 'pms-tree-select',
                        attrs: {
                            treeProps: this.treeProps,
                            treeData: this.deptTreeList,
                        },
                        data: {
                            class: 'fixed-wrap',
                        },
                    },
                },
                {
                    label: '部门名称',
                    prop: 'name',
                    component: {
                        name: 'el-input',
                    },
                },
                {
                    label: '排序号',
                    prop: 'sortIndex',
                    component: {
                        name: 'el-input-number',
                        attrs: {
                            min: 1,
                        },
                    },
                },
                // {
                //     label: '部门领导',
                //     prop: 'leaders',
                //     component: {
                //         name: 'pms-select-staff',
                //         attrs: {
                //             multiple: true
                //         }
                //     }
                // },
                // {
                //     label: '上级领导',
                //     prop: 'higherLeaders',
                //     component: {
                //         name: 'pms-select-staff',
                //         attrs: {
                //             multiple: true
                //         }
                //     }
                // },
            ]
        },
    },
    methods: {
        // 获取树形数据
        getTreeData(data) {
            this.loading = false
            this.deptTreeList = data
            if (data.length > 0) {
                this.rootId = data[0].id
            }
        },
        // 刷新页面数据
        refreshData() {
            this.loading = true
            this.$refs.deptTree.getDeptList()
        },
        // 点击节点
        nodeClick(node) {
            this.getDeptInfo(node.id)
            this.getDeptStaff(node.id)
        },
        // 获取部门信息
        getDeptInfo(id) {
            if (id === this.formData.id) return
            let option = {
                data: id,
                loading: { target: this.rightTopEl },
            }
            deptApi.getDeptInfo(option).then((data) => {
                console.log('dddd', data)
                this.formData = data
                this.$refs.formData.clearValidate()
            })
        },
        // 获取部门员工
        getDeptStaff(id) {
            let option = {
                id,
                loading: { target: this.rightBottomEl },
            }
            staffApi.getDeptStaffList(option).then((data) => {
                this.staffList = data
            })
        },
        // 重置表单
        resetForm() {
            this.formData = initDept()
            this.staffList = []
            this.$nextTick(() => {
                this.$refs.formData.clearValidate()
            })
        },
        // 保存表单
        saveForm() {
            this.$refs.formData.validate().then(() => {
                if (this.formData.id) {
                    deptApi
                        .editDept({
                            data: this.formData,
                            loading: { target: this.rightTopEl },
                        })
                        .then(() => {
                            this.refreshData()
                            this.resetForm()
                        })
                } else {
                    deptApi
                        .addDept({
                            data: this.formData,
                            loading: { target: this.rightTopEl },
                        })
                        .then(() => {
                            this.refreshData()
                            this.resetForm()
                        })
                }
            })
        },
        // 删除部门
        removeDept() {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                deptApi.removeDept({ data: this.formData.id }).then(() => {
                    this.refreshData()
                    this.resetForm()
                })
            })
        },
        addStaff(row) {
            this.staffList.push(row)
        },
    },
    mounted() {
        this.rightTopEl = this.$refs.top.$el
        this.rightBottomEl = this.$refs.bottom.$el
    },
}
</script>

<style lang="scss" scoped>
.dept-manage {
    .left-wrap {
        .scroll {
            height: 625px;
        }
    }
    .right-wrap {
        .btn-wrap {
            padding-left: 100px;
        }
        .bottom {
            height: 454px;
        }
    }
    .el-card {
        margin-bottom: $spacing-md;
    }
}
</style>
