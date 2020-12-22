<!--  -->
<template>
    <div class="agent">
        <div class="">
            <layout-search-bar>
                <condition-search slot="right" search-code="dljggl" @search="search"></condition-search>
                <el-button slot="left" type="primary" icon="el-icon-circle-plus-outline" @click="addAgent">添加</el-button>
            </layout-search-bar>
            <el-card class="wrap" ref="agent">
                <v-el-table :data="agentData" :columns="columns">
                    <template slot="action" slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" circle title="编辑" @click="editAgent(scope.row)"> </el-button>
                        <el-button type="success" icon="el-icon-refresh" circle title="重置密码" @click="resetPassword(scope.row)"> </el-button>
                        <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="deleteAgent(scope.row)"></el-button>
                    </template>
                </v-el-table>
                <v-el-pagination :total="totalCount" position="right" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
            </el-card>
        </div>
        <el-drawer :title="formTitle" size="960px" :visible.sync="drawer">
            <agent-form :id="currentEditingId" @saveSuccess="handleSaveSucess"></agent-form>
        </el-drawer>
    </div>
</template>

<script>
import agentManage from 'services/agent-manage/index'
import ConditionSearch from 'components/condition-search/index'
import mixins from 'mixins/index'
import deptApi from 'services/dept-manage/index'
import AgentForm from './agent-form'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    data() {
        return {
            drawer: false,
            formTitle: '添加代理机构',
            agentData: [],
            currentEditingId: '',
            columns: [
                {
                    type: 'index',
                    attrs: { width: 40 },
                },
                {
                    label: '代理机构名称',
                    prop: 'name',
                    attrs: {
                        sortable: true,
                    },
                },
                // {
                //     label: '类别',
                //     prop: 'categoryName',
                //     attrs: {
                //         sortable: true
                //     }
                // },

                {
                    label: '地址',
                    prop: 'address',
                    attrs: {
                        sortable: true,
                        width: 250,
                    },
                },
                {
                    label: '电话',
                    prop: 'phone',
                    attrs: {
                        sortable: true,
                        width: 140,
                    },
                },
                {
                    label: '账号',
                    prop: 'loginName',
                    attrs: {
                        sortable: true,
                        width: 100,
                    },
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: 180,
                    },
                },
            ],
        }
    },
    components: {
        ConditionSearch,
        AgentForm,
    },
    mounted() {
        this.agentEl = this.$refs.agent.$el
        this.getData({})
    },
    methods: {
        // 获取代理机构列表数据
        getData(row) {
            let data = {
                categoryCode: row.categoryCode ? row.categoryCode : 1,
                keyword: row.keyword ? row.keyword : '',
            }
            let option = {
                from: data,
                loading: { target: this.agentEl },
            }
            agentManage.getAgentPageList(option).then((data) => {
                this.agentData = data.dataList
                this.pageIndex = data.pageIndex
                this.totalCount = data.totalCount
            })
        },
        search(str) {
            let option = {
                keyword: str,
            }
            this.getData(option)
        },
        editAgent(row) {
            this.formTitle = '编辑代理机构信息'
            this.currentEditingId = row.id
            this.drawer = true
        },
        addAgent() {
            this.formTitle = '添加代理机构'
            this.currentEditingId = ''
            this.drawer = true
        },
        resetPassword(row) {
            this.$prompt('请输入重置的密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /\S/,
                inputErrorMessage: '请输入重置的密码',
                inputType: 'password',
            }).then(({ value }) => {
                const { resetPassword } = agentManage
                const option = {
                    id: row.id,
                    password: value,
                }
                resetPassword(option)
            })
        },
        update(code) {
            let ret = {
                categoryCode: code,
            }
            this.getData(ret)
        },
        // 页码变化
        pageChange(page) {
            let option = {
                pageIndex: page,
                pageSize: this.pageSize,
            }
            this.getData(option)
        },
        deleteAgent(row) {
            this.$confirm('是否删除该代理机构?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let opt = {
                    formId: row.id,
                    loading: { target: this.agentEl },
                }
                agentManage.getAgentRemove(opt).then((date) => {
                    this.update(row.categoryCode)
                })
            })
        },
        handleSaveSucess() {
            this.currentEditingId = ''

            this.drawer = false
            this.search()
        },
    },
}
</script>

<style lang="scss" scoped></style>
