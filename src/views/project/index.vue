<template>
    <div>
        <router-view></router-view>

        <div class="staff-manage" v-show="$route.meta.showRole">
            <layout-search-bar @search="search" :condition-string="conditionString">
                <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService">添加项目
                </el-button>
                <pms-condition-search slot="right" search-code="projectlist" @search="search"
                                      @addQuickCondition="addQuickCondition"></pms-condition-search>
            </layout-search-bar>

            <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
                <v-el-table :data="projectList" :columns="columns">
                    <template slot-scope="scope" slot="name">
                        <a @click="goDetail(scope.row)" class="link">{{scope.row.name}}</a>
                    </template>
                    <el-tag slot="projectType" slot-scope="scope" :type="scope.row.projectType === 1 ? 'primary' :scope.row.projectType === 2 ?'warning':'success'">
                        {{ scope.row.projectType === 1 ? '家装' : scope.row.projectType === 2 ? '工装' :'铺面'}}
                    </el-tag>
                    <template slot="action" slot-scope="scope">
                        <el-button circle type="primary" icon="el-icon-edit" title="编辑"
                                   @click="edit(scope.row)"></el-button>
                        <el-button circle type="warning" icon="el-icon-circle-plus-outline" title="添加"
                                   @click="add(scope.row)"></el-button>
                        <!-- <el-button circle type="info" icon="el-icon-medal" title="设置技能" @click="edit(scope.row)"> </el-button> -->

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
    import serviceApi from 'services/project/index'
    import mixins from 'mixins/index'

    export default {
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {},
        data() {
            return {
                projectList: [],
                formData: {},
                columns: [
                    {
                        type: 'index',
                        // attrs: {width: '40'},
                    },
                    {
                        label: '工程编号',
                        prop: 'id',
                    },
                    {
                        label: '工程名称',
                        prop: 'name',
                    },
                    {
                        label: '工程类型',
                        prop: 'projectType',
                    },
                    {
                        label: '面积(㎡)',
                        prop: 'areaSize',
                    },
                    {
                        label: '预算(元)',
                        prop: 'budget',
                    },
                    {
                        label: '联系电话',
                        prop: 'phone',
                    },
                    {
                        label: '发布时间',
                        prop: 'publishTime',
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
        watch: {
            '$route'() {
                //我的初始化方法
                this.getList();
            }
        },
        methods: {
            addService() {
                this.$router.push('/project/list/addProject')
                // this.$refs.addForm.show()
            },
            edit(row) {

                // this.$refs.eform.init(row)
                // this.$refs.eform.show(row)
                this.$router.push({
                    path:'/project/list/editProject',
                    query:{
                        projectId:row.id
                    }
                });
            },
            add(row){
                this.$router.push({
                    path:'/renovation/list/addRenovation',
                    query:{
                        projectId:row.id
                    }
                });
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
                    loading: this.loading
                }
                this.loading = true
                serviceApi.getlist(option).then((data) => {
                    this.projectList = data.dataList
                    this.pageIndex = data.pageIndex
                    this.totalCount = data.totalCount
                    this.loading = false
                })
                    .catch(() => {
                        this.loading = false
                    })
            },

            handleCommand(command, row) {
                if (command === 'edit') {
                    this.editStaff(row)
                } else if (command === 'disable') {
                    serviceApi.addEvent({serviceId: row.id, eventType: 2})
                } else if (command === 'enable') {
                    serviceApi.addEvent({serviceId: row.id, eventType: 1})
                } else if (command === 'remove') {
                    this.$confirm('确定要删除吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        serviceApi.remove({ids: [row.id]}).then(() => {
                            this.search()
                        })
                    })

                } else if (command === 'restart') {
                    serviceApi.addEvent({serviceId: row.id, eventType: 1})
                } else if (command === 'healthCheck') {
                    serviceApi.healthCheck(row.id).then(() => {
                        this.search()
                    })

                }

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
            },
            goDetail(row) {
                this.$router.push({
                    path: '/project/list/projectDetail',
                    query: {
                        projectId: row.id
                    }
                })
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
    .red {
        color: red;
    }

    .link:hover,
    .server-table i.el-tooltip:hover {
        cursor: pointer;
        color: #409EFF;
    }
    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }
</style>
