<template>
    <pms-dialog-frame
        title="配置角色"
        width="600px"
        ref="frame"
        @open="init"
        @close="clearData"
    >
        <v-el-table
            v-loading="loading"
            :element-loading-text="loadingText"
            :element-loading-spinner="loadingSpinner"
            ref="table"
            :data="roleList"
            :columns="columns"
            @selection-change="selectChange"
        >
        </v-el-table>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
import roleApi from 'services/role-manage/index'
import staffApi from 'services/staff-manage/index'
import mixins from 'mixins/index'
import { Promise } from 'q';

export default {
    mixins: [mixins.loadingMixin],
    props: {
        currentStaff: {type: Object}
    },
    data() {
        return {
            columns: [
                {
                    type: 'selection',
                    attrs: {
                        width: '50'
                    }
                },
                {
                    label: '角色名称',
                    prop: 'roleName',
                    attrs: {
                        minWidth: '300'
                    }
                },
                {
                    label: '备注',
                    prop: 'remark'
                }
            ],
            roleList: [],
            staffRoleList: [],
            orginalRoleList: []
        }
    },
    methods: {
        show() {
            this.$refs.frame.show()
        },
        hide() {
            this.$refs.frame.hide()
        },
        clearData() {
            this.$refs.table.clearSelection()
        },
        init() {
            this.loading = true
            Promise.all([roleApi.getAllRoleList({}), staffApi.getStaffGroupList({
                id: this.currentStaff.id
            })]).then(([roleList, staffRoleList]) => {
                this.roleList = roleList.list
                this.staffRoleList = this.roleList.filter(item => {
                    return staffRoleList.some(id => id === item.id)
                })
                this.orginalRoleList = [].concat(this.staffRoleList)
                this.$nextTick(() => {
                    this.setData()
                })
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        setData() {
            this.staffRoleList.forEach(item => {
                this.$refs.table.toggleRowSelection(item, true)
            })
        },
        selectChange(data) {
            this.staffRoleList = data
        },
        confirm() {
            let removedRoleList = this.orginalRoleList.filter(item => {
                return this.staffRoleList.every(role => role !== item)
            })
            let addRoleList = this.staffRoleList.filter(item => {
                return removedRoleList.every(role => role !== item)
            })
            let option = {
                data: {
                    id: this.currentStaff.id,
                    addRoleIds: addRoleList.map(item => item.id),
                    removeRoleIds: removedRoleList.map(item => item.id)
                },
                loading: {
                    target: this.$refs.table.$el
                }
            }
            staffApi.setStaffGroups(option).then(() => {
                this.hide()
            })
        }
    }
}
</script>
