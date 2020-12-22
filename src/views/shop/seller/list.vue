<template>
    <div>
        <router-view></router-view>

    <div class="staff-manage" v-show="$route.meta.showRole">
        <layout-search-bar @search="search" :condition-string="conditionString">
            <!-- <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService" >添加商家</el-button> -->
            <pms-condition-search slot="right" search-code="rolelist" @search="search"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar>
        
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="servicesList" :columns="columns">
                <template slot="action" slot-scope="scope">
                      <el-button circle type="primary" icon="el-icon-edit" title="编辑" @click="edit(scope.row)"> </el-button>
               
                </template>
             
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
    </div>
    </div>
</template>

<script>
import serviceApi from 'services/shop/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: {  },
    data() {
        return {
            servicesList: [],
            formData: {},
            columns: [
                {
                    type: 'index',
                    label: '#',
                    // attrs: { width: '40' },
                },
                {
                    label: '用户昵称',
                    prop: 'niceName',
                },
                {
                    label: '身份证',
                    prop: 'idCard',
                },
                {
                    label: '审批状态',
                    prop: 'processStatus',
                },
                {
                    label: '申请时间',
                    prop: 'applyTime',
                },
           
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '150',
                    },
                },
            ],
        }
    },
    methods: {
        addService() {
            this.$refs.addForm.show()
        },
        edit(row) {
           this.$refs.addForm.show(row)
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
                      },
            }
            this.loading = true
            serviceApi.sellerList(option).then((data) => {
                    this.servicesList = data.dataList
                    this.pageIndex = data.pageIndex
                    this.totalCount = data.totalCount
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        pageChange(page) {
            this.getList({
                pageIndex: page,
                pageSize: this.pageSize,
                key: this.keyword
            })
        },
        show() {
            alert('hello world')
        }
    },
    created() {
        this.getList()
   
    },
    mounted() {
        
    }
}
</script>

<style scoped lang="scss">
        .red { color: red;}
        /deep/ .el-table th,
        /deep/ .el-table td {
            text-align: center !important;
        }
</style>
