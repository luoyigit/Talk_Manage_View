<template>
    <div>
        <router-view></router-view>
        <div class="staff-manage" v-show="$route.meta.showRole">
            <layout-search-bar @search="search" :condition-string="conditionString">
                <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addRenovation">添加装修
                </el-button>

                <pms-condition-search slot="right" search-code="viplist" @search="search"
                                      @addQuickCondition="addQuickCondition"></pms-condition-search>
            </layout-search-bar>

            <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
                <v-el-table :data="renovationList" :columns="columns"><!--@row-click="goDetail"-->

                      <template slot="status" slot-scope="scope">
                            <renovationStatus-item :formValue="scope.row.status"></renovationStatus-item>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button circle type="primary" icon="el-icon-edit" title="编辑"
                                   @click="edit(scope.row)"></el-button>

                        <el-dropdown @command="handleCommand($event, scope.row)" trigger="hover">
                            <el-button title="更多操作" circle type="success" icon="el-icon-more"></el-button>
                            <el-dropdown-menu slot="dropdown" class="btn-dropdown">
                                <el-dropdown-item
                                        v-if="scope.row.isEnable === false"
                                        command="enable"
                                >
                                    启用
                                </el-dropdown-item>
                                <el-dropdown-item
                                        v-if="scope.row.isEnable === true"
                                        command="disable"
                                >
                                    禁用
                                </el-dropdown-item>
                                <!-- <el-dropdown-item command="remove">
                                    删除
                                </el-dropdown-item>
                                <el-dropdown-item command="healthCheck">
                                   健康检查
                                </el-dropdown-item> -->
                            </el-dropdown-menu>
                        </el-dropdown>

                    </template>

                </v-el-table>
                <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex"
                                 @current-change="pageChange"></v-el-pagination>
            </el-card>
        </div>

    </div>
</template>

<script>
    import serviceApi from 'services/renovation/index'
    import mixins from 'mixins/index'
    export default {
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components:{

        },
        data() {
            return {
                channelList: [],
                formData: {},

                columns: [
                    {
                        type: 'index',
                        // attrs: {width: '40'},
                    },
                    {
                        label: '项目名称',
                        prop: 'projectName',
                    },
                    {
                        label: '小区名称',
                        prop: 'villageName',
                        sortable:true,
                    },
                    {
                        label: '开始时间',
                        prop: 'beginTime',
                        sortable:true,
                        attrs:{width:'150'}
                    },
                    {
                        label: '总工期',
                        prop: 'durationDays',
                    },
                    {
                        label: '剩余工期',
                        prop: 'leftDurations',
                    },
                    {
                        label: '负责人',
                        prop: 'managerName',
                    },
                    {
                        label: '施工队',
                        prop: 'team',
                    },
                      {
                        label: '状态',
                        prop: 'status',
                    },
                    {
                        label: '操作',
                        prop: 'action',
                        attrs: {
                            width: '150',
                        },
                    },

                ],
                renovationList:[]

            }
        },
        watch:{
            '$route'() {
                this.getRenavationList();//我的初始化方法
            }
        },
        created() {

            this.getRenavationList();

        },
        methods: {
            edit(row) {
                // this.$refs.eform.init(row)

                this.$router.push({
                    path:'/renovation/list/editRenovation',
                    query:{
                        renovationId:row.id,
                        projectId:row.projectId
                    }
                });

            },
            // deleted(row){
            //     let option = {
            //         data:{
            //             id:row.id
            //         }
            //     }
            //     serviceApi.deleteChannel(option).then((data) => {
            //         this.getRenavationList();
            //         this.loading = false;
            //     }).catch(() =>{
            //         this.loading = false
            //     })
            //
            // },
            addRenovation() {
                // this.$refs.addData.show()
                this.$router.push('/renovation/list/addRenovation')
            },
            search() {
                let option = {
                    pageIndex: 1,
                    pageSize: this.pageSize,

                }
                this.setQuickObject(option);
                this.getRenavationList(option)
            },
            getRenavationList(prop) {
                let option = {
                    data: prop
                        ? prop
                        : {
                            pageIndex: 1,
                            pageSize: this.pageSize,

                        },
                    loading: this.loading
                }
                this.loading = true
                serviceApi.getList(option).then((data) => {
                    this.renovationList = data.dataList
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
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }
</style>