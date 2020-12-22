<template>
    <div>
        <router-view></router-view>
        <div class="staff-manage" v-show="$route.meta.showRole">

            <layout-search-bar @search="search" :condition-string="conditionString">
                <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService">添加会员
                </el-button>

                <pms-condition-search slot="right" search-code="viplist" @search="search"
                                      @addQuickCondition="addQuickCondition"></pms-condition-search>
            </layout-search-bar>
            <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
                <v-el-table :data="userList" :columns="columns"><!--@row-click="goDetail"-->
                    <template slot-scope="scope" slot="nickName">
                        <a @click="goDetail(scope.row)" class="link" style="color:#409EFF;">{{scope.row.nickName}}</a>
                    </template>
                    <el-tag slot="isEnable" slot-scope="scope"
                            :type="scope.row.isEnable === true ? 'success' : 'warning'">
                        {{ scope.row.isEnable == true ? '可用' : '禁用' }}
                    </el-tag>
                    <el-tag slot="gender" slot-scope="scope" :type="scope.row.gender === 0 ? 'success' : 'warning'">
                        {{ scope.row.gender === 0 ? '男' : '女' }}
                    </el-tag>
                    <div slot="userType" slot-scope="scope">
                        {{ scope.row.userType === 0 ? '普通' : scope.row.userType === 1 ? '业主':scope.row.userType === 2
                        ?'工长':scope.row.userType === 3 ?'工人':scope.row.userType === 4 ?'商家':''}}
                    </div>
                    <template slot="action" slot-scope="scope">
                        <el-button circle type="primary" icon="el-icon-edit" title="编辑"
                                   @click="edit(scope.row)"></el-button>
                        <el-button v-if="scope.row.userType !== 3" circle type="warning" icon="el-icon-s-custom"
                                   title="工人申请" style="margin-left: 10px" @click="apply(scope.row)"></el-button>
                        <el-button v-if="scope.row.userType !== 4" circle type="warning"
                                   icon="el-icon-circle-plus-outline" title="商家申请" style="margin-left: 10px"
                                   @click="sellerApply(scope.row)"></el-button>

                        <el-dropdown @command="handleCommand($event, scope.row)" trigger="hover">
                            <el-button title="更多操作" circle type="success" icon="el-icon-more"></el-button>
                            <el-dropdown-menu slot="dropdown" class="btn-dropdown">
                                <el-dropdown-item
                                        v-if="scope.row.isEnable === false"
                                        command="enable">
                                    启用
                                </el-dropdown-item>
                                <el-dropdown-item
                                        v-if="scope.row.isEnable === true"
                                        command="disable">
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
    import serviceApi from 'services/vip/index'
    import mixins from 'mixins/index'
    import ElSlPanel from "element-ui/packages/color-picker/src/components/sv-panel";


    export default {
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {ElSlPanel},
        data() {
            return {
                userList: [],
                formData: {},

                columns: [
                    {
                        type: 'index',
                        label: '#',
                        // attrs: {width: '40'},
                    },
                    {
                        label: '用户昵称',
                        prop: 'nickName',
                    },
                    {
                        label: '手机号',
                        prop: 'phone',
                    },
                    {
                        label: '性别',
                        prop: 'gender',
                    },
                    {
                        label: '类型',
                        prop: 'userType',
                    },
                    {
                        label: '个性签名',
                        prop: 'title',
                    },
                    {
                        label: '注册时间',
                        prop: 'registerTime',
                        attrs: {width: '150'}
                    },
                    {
                        label: '项目数量',
                        prop: 'projectCount',
                    },
                    {
                        label: '是否可用',
                        prop: 'isEnable',
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
                this.getList();//我的初始化方法
            }
        },

        methods: {
            goDetail(row) {
                this.$router.push({
                    path: '/user/list/userDetail',
                    query: {
                        userId: row.id
                    }
                })
            },
            addService() {

                this.$router.push('/user/list/addUser')
            },
            edit(row) {
                this.$router.push({
                    path: '/user/list/editUser',
                    query: {
                        userId: row.id
                    }
                })
            },
            apply(row) {
                this.$router.push({
                    path: '/man/list/addWorker',
                    query: {
                        userId: row.id
                    }
                })

            },
            sellerApply(row) {
                this.$router.push({
                    path: '/shop/sellerapply',
                    query: {
                        userId: row.id
                    }
                })
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
                serviceApi.getuserlist(option).then((data) => {
                    this.userList = data.dataList
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
            }
        },
        created() {
            this.getList();

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
