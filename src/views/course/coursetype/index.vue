<template>
<div>
    <div class="staff-manage" >
        <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addType" >添加类别</el-button>
            <!-- <pms-condition-search slot="right" search-code="userlist" @search="search" @setRight="setRight" @addQuickCondition="addQuickCondition"></pms-condition-search> -->
        </layout-search-bar>
 
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="datalist" :columns="columns">
                <template slot="action" slot-scope="scope">
                       <el-button circle type="primary" icon="el-icon-edit" title="编辑" @click="editType(scope.row)"> </el-button>
                       <el-button circle type="danger" icon="el-icon-delete" title="删除" @click="deleteType(scope.row)"> </el-button>
                </template>
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
    </div>
          <addForm ref="addForm" @search="search"> </addForm>
</div>
 
</template>

<script>
import serviceApi from 'services/course/index'
import addForm from './addtype'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: {addForm},
    data() {
        return {
            datalist: [],
            keyword: '',
            formData: {},
            searchOption: 'userName',
            columns: [
                {
                    type: 'index',
                    // attrs: { width: '40' },
                },
                {
                    label: '名称',
                    prop: 'name',
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
            serviceApi.getcoursetypelist(option).then((data) => {
                    this.datalist = data.dataList
                    this.pageIndex = data.pageIndex
                    this.totalCount = data.totalCount
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
       addType(){
               this.$refs.addForm.show()
       },
       editType(row){
          this.$refs.addForm.show(row)
       },
       deleteType(row){
            this.$confirm('确定要删除 ' + row.name + ' 吗?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning',
                        }).then(() => {
                            serviceApi.deleteCourseType({ id: row.id }).then(() => {
                                this.getList({
                                    pageIndex: this.pageIndex,
                                    pageSize: this.pageSize,
                                })
                            })
                        })
       },
        // 删除人员
        removeStaff(row) {
           
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
