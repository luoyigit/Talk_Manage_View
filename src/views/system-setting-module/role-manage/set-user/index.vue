<template>
    <div>
        <pms-dialog-frame title="设置角色用户" ref="userWin" width="800px">
            <el-row>
                <el-col :span="20">
                    <!-- <pms-select-staff :multiple="true" v-model="values" size="medium"> </pms-select-staff> -->
                     <el-select v-model="userId" filterable placeholder="请选择" style="width:400px;">
                        <el-option
                        v-for="item in allUser"
                        :key="item.id"
                        :label="`${item.userName}--${item.realName}`"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="4" style="padding-left:10px;">
                    <el-button type="primary" class="btn-primary" @click="chooseUser">确定添加</el-button>
                </el-col>
            </el-row>
            <el-row style="margin-top:10px; height:500px;">
                <el-scrollbar class="scroll">
                    <v-el-table :data="roleUserList" :columns="items">
                        <template slot="action" slot-scope="scope">
                            <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="deleteRoleUser(scope.row)"></el-button>
                        </template>
                    </v-el-table>
                </el-scrollbar>
            </el-row>
        </pms-dialog-frame>
    </div>
</template>
<script>
import RoleApi from 'services/role-manage/index'
import UserApi from 'services/staff-manage/index'
export default {
    props: {},
    data() {
        return {
            roleId: '',
            allUser:[],
            userId:'',
            values: [],
            showDialog: false,
            userTitle: '选择用户',
            items: [
                {
                    label: '用户名',
                    prop: 'userName',
                    attrs: { width: '120' },
                },
                {
                    label: '姓名',
                    prop: 'realName',
                    attrs: { width: '150' },
                },
                {
                    label: '角色',
                    prop: 'roleName',
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: { width: '80' },
                },
            ],
            roleUserList: [],
            chooseUserItems: [
                {
                    label: '用户名',
                    prop: 'userName',
                    attrs: { width: '120' },
                },
                {
                    label: '姓名',
                    prop: 'realName',
                },
            ],
        }
    },
    methods: {
        show(row) {
            this.$refs.userWin.show()
            this.roleId = row.id
            this.getList()
        },
        chooseUser() {
           var options = {
               userId:this.userId,
               roleId: this.roleId
           }
            UserApi.setUserRole(options).then(() => {
                this.getList()
            })
        },
        getList() {
            RoleApi.getUserListByRoleId(this.roleId).then((data) => {
                this.roleUserList = data
           
            })

            UserApi.getStaffList({data:{pageSize:-1}}).then(res => {
                this.allUser = res.dataList
            })
        },
        deleteRoleUser(row) {
            UserApi.clearUserRole({userId: row.id, roleId: this.roleId}).then((t) => {
                this.roleUserList = this.roleUserList.filter((item) => {
                    return item.id != row.id
                })
            })
        },
    },
}
</script>
<style lang="scss" scoped>
.el-scrollbar__wrap.default-scrollbar__wrap {
    overflow-x: auto;
}
.scroll {
    height: 100%;
    & /deep/ .el-scrollbar__wrap {
        overflow: auto;
    }
}
</style>
