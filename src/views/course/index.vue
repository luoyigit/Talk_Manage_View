<template>
<div>
    <router-view></router-view>
    <div class="staff-manage" v-show="$route.meta.showRole">
        <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addProject" >添加作品</el-button>
            <!-- <pms-condition-search slot="right" search-code="userlist" @search="search" @setRight="setRight" @addQuickCondition="addQuickCondition"></pms-condition-search> -->
        </layout-search-bar>
 
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="staffList" :columns="columns">
                    <el-tag slot="status" slot-scope="scope" :type="scope.row.status === 0 ? 'info' : 'success'">
                        {{ scope.row.status == 0 ? '草稿' : '上架' }}
                    </el-tag>
                <template slot="action" slot-scope="scope">
                       <el-button circle type="primary" icon="el-icon-edit" title="编辑" @click="editProject(scope.row)"> </el-button>
                       <el-button circle type="warning" icon="el-icon-picture-outline-round" title="下架" @click="editProject(scope.row)"> </el-button>
                </template>
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
    </div>
</div>
 
</template>

<script>
import serviceApi from 'services/course/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: { },
    data() {
        return {
            staffList: [],
            keyword: '',
            formData: {},
            searchOption: 'userName',
            columns: [
                {
                    type: 'index',
                    // attrs: { width: '40' },
                },
                {
                    label: '标题',
                    prop: 'title',
                },
                {
                    label: '类别',
                    prop: 'typeName',
                },
                {
                    label: '作者',
                    prop: 'authorName',
                },
                {
                    label: '创建时间',
                    prop: 'createTime'
                },
                {
                    label: '状态',
                    prop: 'status'
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '150',
                    },
                },
            ]
        }
    },
    methods: {
        setRight(str) {
            this.conditionString = str
        },
        search() {
            let option = {
                pageIndex: 1,
                pageSize: this.pageSize,
            }
            // this.setQuickObject(option);
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
            serviceApi.getlist(option).then((data) => {
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
       addProject(){
             this.$router.push('/course/index/add')
       },
       editProject(){
             this.$router.push('/course/index/edit')
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
