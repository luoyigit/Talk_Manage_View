<template>
    <div>
        <router-view></router-view>

        <div class="staff-manage" v-show="$route.meta.showRole">
            <layout-search-bar @search="search" :condition-string="conditionString">
                <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addGoods">添加商品
                </el-button>
                <pms-condition-search slot="right" search-code="servicelist" @search="search"
                                      @addQuickCondition="addQuickCondition"></pms-condition-search>
                <el-button slot="right" type="primary" icon="el-icon-search" @click="marySearch">更多搜索</el-button>
            </layout-search-bar>

            <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
                <div v-show="isSearch" style="width: 100%;height: 350px">
                    <div style="width: 100%;display: flex;justify-content: flex-end">
                        <el-button icon="el-icon-close" v-on:click="isSearch = false">关闭</el-button>
                    </div>
                </div>

                <v-el-table :data="sellerList" :columns="columns">
                    <template slot="coverImg" slot-scope="scope">
                        <div style="display: flex;justify-content: center">
                            <el-image :src="imgUrl+scope.row.coverImg" style="width: 20px;height: 20px" fit="fill">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </div>
                    </template>
                    <template slot="isOpenSku" slot-scope="scope">
                        <span>{{scope.row.isOpenSku}}</span>
                    </template>
                    <template slot="action" slot-scope="scope">
                        <el-button circle type="primary" icon="el-icon-edit" title="编辑"
                                   @click="edit(scope.row)"></el-button>
                        <el-button circle type="danger" icon="el-icon-delete" title="删除"
                                   @click="deleteGoods(scope.row)"></el-button>

                    </template>

                </v-el-table>
                <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex"
                                 @current-change="pageChange"></v-el-pagination>
            </el-card>
        </div>
    </div>
</template>
<script>
    import serviceApi from 'services/shop/index'
    import mixins from 'mixins/index'
    import http from 'utils/http'

    export default {
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {},
        data() {
            return {
                sellerList: [],
                formData: {},
                imgUrl: http.downfileurl + '?fileid=',
                name: "",
                columns: [
                    {
                        type: 'index',
                        label: '#',
                        attrs: {width: '40'},
                    },
                    {
                        label: '商品名称',
                        prop: 'name',
                    },
                    {
                        label: '商品封面',
                        prop: 'coverImg',
                    },
                    {
                        label: '商品类别',
                        prop: 'catalogTypeName',
                    },
                    {
                        label: '是否单品',
                        prop: 'isOpenSku',
                    },
                    {
                        label: '操作',
                        prop: 'action',
                        attrs: {
                            width: '150',
                        },
                    },
                ],
                isSearch: false
            }
        },
        watch: {
            '$route'() {
                this.getList();
            }
        },
        methods: {
            marySearch() {
                this.isSearch = true
            },
            addGoods() {
                // this.$refs.addForm.show()
                this.$router.push('/shop/list/addGoods')
            },
            edit(row) {
                // this.$refs.addForm.show(row)
                this.$router.push(
                    {
                        path: '/shop/list/editGoods',
                        query: {
                            goodsId: row.id
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
                            name: this.name
                        },
                }
                this.loading = true
                serviceApi.goodsList(option).then((data) => {
                    this.sellerList = data.dataList
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
            },
            deleteGoods(row) {
                alert("稍等稍等")

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
    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }
</style>