<template>
    <el-dialog
        title="添加部门员工"
        :visible.sync="showDialog"
        width="600px"
        :close-on-click-modal="false">
        <div
            ref="content"
            class="dialog-content"
            v-loading="loading"
            :element-loading-text="loadingText"
            :element-loading-spinner="loadingSpinner"
        >
            <layout-search-bar>
                <el-input 
                    slot="center" 
                    v-model="keyword" 
                    placeholder="输入关键字">
                    <v-el-select 
                        v-model="searchOption" 
                        slot="prepend"
                        placeholder="请选择"
                        style="width: 120px"
                        :options="options"
                    >
                    </v-el-select>
                    <el-button slot="append" icon="el-icon-search" @click="search">搜索</el-button>
                </el-input>
            </layout-search-bar>
            <v-el-table :data="staffList" :columns="columns">
                <template slot="action" slot-scope="scope">
                    <el-button
                        :disabled="disableBtn(scope.row)"
                        class="el-button-obtn" 
                        type="text" 
                        @click="select(scope.row, scope.$index)">
                        选择
                    </el-button>
                </template>
            </v-el-table>
            <v-el-pagination
                position="center"
                :total="totalCount"
                :page-size="pageSize"
                :current-page="pageIndex"
                @current-change="pageChange"
            >
            </v-el-pagination>
        </div>
    </el-dialog>
</template>

<script>
import mixins from 'mixins/index'
import staffApi from 'services/staff-manage/index'
import deptApi from 'services/dept-manage/index'

export default {
    mixins: [mixins.dialogMixin, mixins.paginationMixin, mixins.loadingMixin],
    props: {
        deptStaffList: {
            type: Array,
            default: () => []
        },
        deptId: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            staffList: [],
            pageSize: 10,
            keyword: '',
            searchOption: 'userName',
            columns: [
                {
                    type: 'index',
                    attrs: {width: '40'}
                },
                {
                    label: '工号',
                    prop: 'employeeNo'
                },
                {
                    label: '姓名',
                    prop: 'realName'
                },
                {
                    label: '职位',
                    prop: 'post'
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '60'
                    }
                }
            ],
            options: [
                {
                    label: '用户名',
                    value: 'userName'
                },
                {
                    label: '姓名',
                    value: 'realName'
                },
                {
                    label: '工号',
                    value: 'number'
                },
            ]
        }
    },
    methods: {
        // 判断是否禁用按钮
        disableBtn(row) {
            return this.deptStaffList.some(item => item.id === row.id)
        },
        // 获取员工列表
        getList(prop) {
            let option = {
                data: prop ? prop : {
                    pageIndex: 1,
                    pageSize: this.pageSize
                },
            }
            this.loading = true
            staffApi.getStaffList(option).then(data => {
                this.staffList = data.list
                this.pageIndex = data.index
                this.totalCount = data.count
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        // 搜索
        search() {
            let option = {
                pageIndex: 1,
                pageSize: this.pageSize,
                [this.searchOption]: this.keyword
            }
            this.getList(option)
        },
        // 选择员工
        select(row) {
            let option = {
                data: {
                    deptId: this.deptId,
                    staffId: row.id
                },
                loading: {target: this.$refs.content}
            }
            deptApi.addDeptStaff(option).then(() => {
                this.$emit('add-success', row)
            })
        },
        // 页码变化
        pageChange(page) {
            let option = {
                pageIndex: page,
                pageSize: this.pageSize
            }
            this.getList(option)
        }
    },
    created() {
        this.getList()
    }
}
</script>