<!-- 角色管理 -->
<template>
    <div class="role">
        <layout-search-bar>
            <el-button 
                slot="right"
                type="primary"
                class="btn-primary"
                icon="el-icon-circle-plus-outline" 
                @click="addRoleMeth">添加角色</el-button>
            <pms-condition-search slot="right" search-code="rolelist" @search="getData"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar>
        <el-card class="wrap">
            <v-el-table :data="roleData" :columns="columns" ref="role">
                <template slot="action" slot-scope="scope">
                    <el-button v-if="!scope.row.isProjectManager" @click="setUsers(scope.row)" circle icon="el-icon-user-solid" type="primary" title="批量设置用户"></el-button>
                    <el-button 
                        type="primary" 
                        icon="el-icon-edit" 
                        circle
                        title="编辑"
                        @click="editRole(scope.row)"></el-button>
                    <el-button
                        icon="el-icon-setting" 
                        aria-hidden="true"
                        title="配置角色权限"
                        type="success"
                        circle
                        @click='setRole(scope.row)'></el-button>
                    <el-button 
                        type="danger" 
                        icon="el-icon-delete" 
                        circle
                        title="删除"
                        @click='deleteRole(scope.row)'></el-button>
                </template>
            </v-el-table>
            <v-el-pagination
                :total="totalCount"
                position="right"
                :page-size="pageSize"
                :current-page="pageIndex"
                @current-change="pageChange">
            </v-el-pagination>
        </el-card>
        <add-role 
            ref="addRole"
            :roleForm="roleFrom"
            @update="update"></add-role>
        <add-user ref="addUser">

        </add-user>
            
  </div>
</template>

<script>
import AddRole from './add-role/add-role'
import AddUser from './set-user/index'
import RoleApi from 'services/role-manage/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin, mixins.paginationMixin],
    data() {
        return {
            roleData: [],
            roleFrom: {},
            columns: [
                {
                    type: 'index',
                    attrs: {width: '40'}
                },
                {
                    label: '角色名',
                    prop: 'roleName'
                },
                {
                    label: '备注',
                    prop: 'remark'
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '250'
                    }
                }
            ],
        }
    },
    components: {
        AddRole,
        AddUser
    },
    mounted() {
        this.roleEl = this.$refs.role.$el
        this.getData()
    },
    methods: {
        //获取角色列表数据
        getData() {
            let opt = {
                loading: {target: this.roleEl}
            }
            var obj = {}
            this.setQuickObject(obj);
            opt.data = obj
            RoleApi.getAllRoleList(opt).then(data => {
                this.roleData = data.dataList
            })
        },
        // 添加角色
        addRoleMeth() {
            this.roleFrom = {}
            this.$refs.addRole.show()
            this.$refs.addRole.title = '添加角色'
        },
        // 编辑角色
        editRole(row) {
            this.roleFrom = Object.assign({}, this.roleFrom, row)
            this.$refs.addRole.show(true)
            this.$refs.addRole.title = '编辑角色'
        },
        // 配置权限
        setRole(row) {
            this.$router.push({
                path: '/system/role-manage/set-role',
                query: {
                    roleName: row.roleName,
                    id: row.id
                },
            })
        },
        // 更新数据
        update() {
            this.getData()
        },
        deleteRole(row) {
            let opt = {
                Id: row.id,
                loading: {target: this.roleEl}
            }
            this.$confirm('是否删除该角色?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                RoleApi.getRemoveRole(opt).then(data => {
                    this.update()
                })
            })
            
        },
        pageChange(page) {
            let option = {
                pageIndex: page,
                pageSize: this.pageSize
            }
            this.getData(option)
        },
        setUsers(row) {
            this.$refs.addUser.show(row)
        }
    }
}

</script>
