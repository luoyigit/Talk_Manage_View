<template>
    <div class="staff-manage">
        <!-- <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addStaff" >添加员工</el-button>
            <pms-condition-search slot="right" search-code="userlist" @search="search" @setRight="setRight" @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar> -->
        
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="staffList" :columns="columns">
                <span slot="sex" slot-scope="scope">{{ scope.row.sex === 1 ? '男' : '女' }}</span>
                <span slot="isProjectManager" slot-scope="scope">{{ scope.row.isProjectManager ? '是' : '否' }}</span>
                <el-tag slot="status" slot-scope="scope" :type="scope.row.status === 0 ? 'success' : 'warning'">
                    {{ scope.row.status == 0 ? '正常' : '禁用' }}
                </el-tag>
                <!-- <el-tag slot="userType" slot-scope="scope" :type="scope.row.userType === 1 ? 'success' : 'warning'">
                    {{ scope.row.userType == 1 ? '系统' : 'OA' }}
                </el-tag> -->
                <template slot="action" slot-scope="scope">
                    <!-- <el-button circle type="primary" icon="el-icon-edit" title="配置角色" @click="setRole(scope.row)"> </el-button> -->
                    <el-dropdown @command="handleCommand($event, scope.row)" trigger="hover" >
                        <el-button title="更多操作" circle type="success" icon="el-icon-more"> </el-button>
                        <el-dropdown-menu slot="dropdown" class="btn-dropdown">
                            <el-dropdown-item command="edit" :disabled="scope.row.userName === 'Admin' || scope.row.userName === 'admin'">
                                编辑
                            </el-dropdown-item>
                            <el-dropdown-item
                                v-if="scope.row.status === 1"
                                command="disable"
                                :disabled="scope.row.userName === 'Admin' || scope.row.userName === 'admin'"
                            >
                                禁用
                            </el-dropdown-item>
                            <el-dropdown-item
                                v-if="scope.row.status === 0"
                                command="enable"
                                :disabled="scope.row.userName === 'Admin' || scope.row.userName === 'admin'"
                            >
                                启用
                            </el-dropdown-item>
                            <el-dropdown-item command="resetPwd"  :disabled="scope.row.userName === 'Admin' || scope.row.userName === 'admin'">
                                重置密码
                            </el-dropdown-item>
                            <el-dropdown-item command="remove" :disabled="scope.row.userName === 'Admin' || scope.row.userName === 'admin'">
                                删除
                            </el-dropdown-item>
                        
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
             
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
        <!-- <el-card>
           <el-table
                :data="tableData"
                height="250"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180"
                :render-header="renderHeader">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
  </el-table>
        </el-card> -->
        <set-staff ref="setStaff" :current-staff="currentStaff" @refresh="getList({ pageIndex: pageIndex, pageSize: pageSize })"></set-staff>
        <set-role ref="setRole" :current-staff="currentStaff"></set-role>
        <!-- <set-system-role ref="setSysRole" :form-data="formData"></set-system-role> -->
    </div>
</template>

<script>
import staffApi from 'services/staff-manage/index'
import SetStaff from './set-staff'
import SetRole from './set-role'
import SetSystemRole from './set-system-role'
import mixins from 'mixins/index'
import { initStaff } from 'viewModel/staff'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: { SetStaff, SetRole },
    data() {
        return {
            // tableData: [{
            // date: '2016-05-03',
            // name: '王小虎',
            // address: '上海市普陀区金沙江路 1518 弄'
            // }, {
            // date: '2016-05-02',
            // name: '王小虎',
            // address: '上海市普陀区金沙江路 1518 弄'
            // }],
            staffList: [],
            keyword: '',
            formData: {},
            searchOption: 'userName',
            columns: [
                {
                    type: 'index',
                    // attrs: { width: '40' },
                },
                // {
                //     label: '用户名',
                //     prop: 'userName',
                // },
                {
                    label: '姓名',
                    prop: 'name',
                },
                // {
                //     label: '手机号',
                //     prop: 'phone',
                // },
                // {
                //     label: '性别',
                //     prop: 'sex'
                // },
                // {
                //     label: '状态',
                //     prop: 'status',
                // },
                // {
                //     label: '系统角色',
                //     prop: 'roleName'
                // },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '150',
                    },
                },
            ],
            currentStaff: initStaff(),
        }
    },
    methods: {
        renderHeader(h,{column,$index}){
            // return h('div',{
            //     attrs:{
            //     class:'cell',
            //     },
            //     domProps:{
            //     innerHTML:'<span class="red">*</span>'+column.label
            //     }
            // })
             return h('span',{
                // attrs:{
                // class:'cell',
                // },
                domProps:{
                innerHTML:'<span style="color:red;">*</span>'+column.label
                }
            })
        },
        addStaff() {
            this.currentStaff = initStaff()
            this.$refs.setStaff.show()
        },
        setRight(str) {
            this.conditionString = str
        },
        search() {
            let option = {
                pageIndex: 1,
                pageSize: this.pageSize,
            }
            this.setQuickObject(option);
            this.getList(option)
        },
        getList(prop) {
            let option = {
                data: prop
                    ? prop
                    : {
                          pageIndex: 1,
                          pageSize: this.pageSize,
                          key: this.keyword
                      },
            }
            this.loading = true
            staffApi
                .getStaffList(option)
                .then((data) => {
                    this.staffList = data.dataList
                    this.formData = Object.assign({}, this.staffList)
                    this.pageIndex = data.pageIndex
                    this.totalCount = data.totalCount
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        setSystemRole(row) {
            // this.$refs.setSysRole.show()
        },
        // 配置角色
        setRole(row) {
            this.currentStaff = Object.assign(initStaff(), row)
            this.$refs.setRole.show()
        },
        // 判断是否为项目负责人
        isProjectManager(row) {
            if (row.isProjectManager) {
                this.cancelManager(row)
            } else {
                this.setManager(row)
            }
        },
        handleCommand(command, row) {
            if (command === 'edit') {
                this.editStaff(row)
            } else if (command === 'disable') {
                this.disableStaff(row)
            } else if (command === 'enable') {
                this.enableStaff(row)
            } else if (command === 'resetPwd') {
                this.resetPwd(row)
            } else if (command === 'remove') {
                this.removeStaff(row)
            } else if (command === 'setManager') {
                this.setManager(row)
            } else if (command === 'cancelManager') {
                this.cancelManager(row)
            }
        },
        editStaff(row) {
            console.log('rrrrrr', row)
            this.currentStaff = Object.assign(initStaff(), row)
            console.log('rereree',this.currentStaff)
            this.$refs.setStaff.show()
        },
        // 禁用人员
        disableStaff(row) {
            this.$confirm('确定要禁用 ' + row.realName + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                staffApi.disableStaff({ id: row.id }).then(() => {
                    row.status = 0
                })
            })
        },
        // 启用人员
        enableStaff(row) {
            this.$confirm('确定要启用 ' + row.realName + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                staffApi.enableStaff({ id: row.id }).then(() => {
                    row.status = 1
                })
            })
        },
        // 重置密码
        resetPwd(row) {
            this.$confirm('确定要重置 ' + row.realName + '的密码吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                staffApi
                    .resetPassword({ id: row.id })
                    .then(() => {
                        return
                    })
                    .catch(() => {
                        return
                    })
            })
        },
        // 删除人员
        removeStaff(row) {
            this.$confirm('确定要删除 ' + row.realName + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                staffApi.removeStaff({ id: row.id }).then(() => {
                    this.getList({
                        pageIndex: this.pageIndex,
                        pageSize: this.pageSize,
                    })
                })
            })
        },
        pageChange(page) {
            this.getList({
                pageIndex: page,
                pageSize: this.pageSize,
                key: this.keyword
            })
        },
    },
    created() {
        this.getList()
    },
}
</script>

<style scoped lang="scss">
        .red { color: red;}
        /deep/ .el-table th,
        /deep/ .el-table td {
            text-align: center !important;
        }
</style>
