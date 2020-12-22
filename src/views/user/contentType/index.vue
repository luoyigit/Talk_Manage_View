<template>
    <div>
        <router-view></router-view>
        <div class="staff-manage" v-show="$route.meta.showRole">

            <layout-search-bar @search="search" :condition-string="conditionString">
                <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addChannel">添加内容
                </el-button>

                <pms-condition-search slot="right" search-code="viplist" @search="search"
                                      @addQuickCondition="addQuickCondition"></pms-condition-search>
            </layout-search-bar>

            <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
                <v-el-table :data="channelList" :columns="columns"><!--@row-click="goDetail"-->

                    <div slot-scope="scope" slot="isRecommend">
                        <el-switch
                                v-model="scope.row.isRecommend"
                                active-color="#13ce66"
                                @change="changeRecommend(scope.row)"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                    <template slot="action" slot-scope="scope">
                        <el-button circle type="primary" icon="el-icon-edit" title="编辑"
                                   @click="edit(scope.row)"></el-button>
                        <el-button circle type="danger" icon="el-icon-delete" title="删除"
                                   @click="deleted(scope.row)"></el-button>
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
        <addChannel ref="addData" @getlist="getChannelList"></addChannel>
    </div>
</template>

<script>
    import serviceApi from 'services/vip/index'
    import mixins from 'mixins/index'
    import addChannel from './addChannel'

    export default {
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        name: "index",
        components: {addChannel},
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
                        label: '名称',
                        prop: 'name',
                    },
                    {
                        label: '热度',
                        prop: 'hotLevel',
                        sortable: true,
                    },
                    {
                        label: '创建时间',
                        prop: 'addTime',
                        sortable: true,
                    },
                    {
                        label: '是否推荐',
                        prop: 'isRecommend',
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
        created() {
            this.getChannelList();
        },
        methods: {
            edit(row) {
                // this.$refs.eform.init(row)
                this.$refs.addData.show(row)
            },
            deleted(row) {
                let option = {
                    data: {
                        id: row.id
                    }
                }
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    serviceApi.deleteChannel(option).then((data) => {
                        this.getChannelList();
                        this.loading = false;
                    }).catch(() => {
                        this.loading = false
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            changeRecommend(val) {
                let option = {
                    data: val,

                }
                serviceApi.editChannel(option).then(() => {

                }).catch(() => {
                    this.loading = false
                })
            },
            addChannel() {
                this.$refs.addData.show()
            },
            search() {
                let option = {
                    pageIndex: 1,
                    pageSize: this.pageSize,
                    order: "DESC"
                }
                this.setQuickObject(option);
                this.getChannelList(option)
            },
            getChannelList(prop) {
                let option = {
                    data: prop
                        ? prop
                        : {
                            pageIndex: 1,
                            pageSize: this.pageSize,
                            order: "DESC"
                        },
                    loading: this.loading
                }
                this.loading = true
                serviceApi.channelList(option).then((data) => {
                    this.channelList = data.dataList
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