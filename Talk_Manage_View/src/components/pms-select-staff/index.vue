<template>
    <el-popover :placement="position" :width="popoverWidth" trigger="click" v-model="showPopover">
        <el-row class="popover-wrap">
            <el-col :span="12">
                <div class="tree-wrap">
                    <el-scrollbar class="scroll">
                        <pms-dept-tree ref="deptTree" @node-click="getDeptStaff" @get-tree-data="setCurrentNode"> </pms-dept-tree>
                    </el-scrollbar>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="table-wrap">
                    <el-scrollbar class="scroll">
                        <div class="input-wrap">
                            <el-input v-model="keyword">
                                <el-button slot="append" icon="el-icon-search" @click="searchStaff"></el-button>
                            </el-input>
                        </div>
                        <el-table
                            v-loading="loading"
                            :element-loading-text="loadingText"
                            :element-loading-spinner="loadingSpinner"
                            :data="staffList"
                            class="table"
                        >
                            <!-- <el-table-column
                                prop="employeeNo"
                                label="工号"
                                width="100">
                            </el-table-column> -->
                            <el-table-column prop="realName" label="姓名" width="120">
                                <template slot="header">
                                    <el-checkbox @change="checkChange"></el-checkbox>
                                    姓名
                                </template>
                                <template slot-scope="scope">
                                    <el-button size="mini" type="text" @click="selectStaff(scope.row)">
                                        {{ scope.row.realName }}
                                    </el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="roleName" label="角色"> </el-table-column>
                        </el-table>
                    </el-scrollbar>
                </div>
            </el-col>
        </el-row>
        <div class="refer-wrap" slot="reference">
            <div v-if="multiple" class="multiple-result" :class="{ active: showPopover }">
                <div ref="tagWrap" class="tag-wrap">
                    <el-tag class="tag" v-for="item in value" :key="item.id" closable disable-transitions @close="removeStaff(item)">
                        {{ item.realName }}
                    </el-tag>
                </div>
            </div>
            <el-input ref="reference" class="" v-model="showResult" readonly autosize type="text" :placeholder="placeholder"> </el-input>
        </div>
    </el-popover>
</template>

<script>
import staffApi from 'services/staff-manage/index'
import mixins from 'mixins/index'
import { mapState } from 'vuex'
import { createDept } from 'viewModel/department'

const MinPopoverWidth = 700

export default {
    name: 'pms-select-staff',
    mixins: [mixins.loadingMixin],
    props: {
        value: {
            // 绑定值
            type: [Object, Array],
            default: null,
        },
        placeholder: {
            type: String,
            default: '请选择',
        },
        multiple: {
            // 是否多选
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'small',
        },
    },
    watch: {
        value() {
            if (this.multiple) {
                this.refreshDom()
            }
        },
        showPopover(val) {
            if (val) {
                this.popoverOpen()
            }
        },
    },
    computed: {
        staff: {
            get: function() {
                return this.value
            },
            set: function(val) {
                return this.$emit('input', val)
            },
        },
        showResult() {
            if (this.multiple) {
                return this.value && this.value.length > 0 ? ' ' : ''
            } else {
                return this.value ? this.value.realName : ''
            }
        },
        ...mapState({
            defaultDept: (state) => {
                return createDept({
                    id: state.userInfo.deptId,
                    name: state.userInfo.deptName,
                })
            },
        }),
    },
    data() {
        return {
            position: 'bottom',
            showPopover: false,
            popoverWidth: MinPopoverWidth,
            staffList: [],
            keyword: '',
        }
    },
    methods: {
        // 刷新dom元素高度
        refreshDom(isReduce) {
            if (this.multiple) {
                this.$nextTick(() => {
                    let referH = this.referenceEl.clientHeight
                    let tagH = this.tagWrapEl.clientHeight + 2
                    let height
                    if (isReduce && this.value.length > 0) {
                        height = Math.min(tagH, referH)
                    } else {
                        height = Math.max(tagH, referH)
                    }
                    this.referenceEl.style.height = height < 28 ? '28px' : height + 'px'
                })
            }
        },
        // 出现下拉时
        popoverOpen() {
            let width = this.referenceWrapEl.clientWidth
            this.popoverWidth = Math.max(width, MinPopoverWidth)
        },
        // 选择部门
        getDeptStaff(node) {
            this.loading = true
            staffApi
                .getDeptStaffList({ id: node.id })
                .then((data) => {
                    this.staffList = data
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },
        // 获取人员列表
        getStaffList() {
            staffApi
                .getStaffList({
                    data: {
                        pageIndex: 1,
                        pageSize: 15,
                    },
                })
                .then((data) => {
                    this.staffList = data.list
                })
        },
        // 选择人员
        selectStaff(row) {
            if (this.multiple) {
                let index = this.value.findIndex((item) => item.id === row.id)
                if (index < 0) {
                    this.value.push(row)
                    this.refreshDom()
                }
            } else {
                this.staff = row
                this.showPopover = false
            }
        },
        // 搜索人员
        searchStaff() {
            this.loading = true
            staffApi
                .getStaffList({
                    data: {
                        key: this.keyword,
                        pageSize: 2000,
                    },
                })
                .then((data) => {
                    this.staffList = data.list
                    this.loading = false
                })
                .catch(() => {
                    this.staffList = []
                    this.loading = false
                })
        },
        // 设置默认部门高亮
        setCurrentNode() {
            if (this.defaultDept.id) {
                this.$nextTick(() => {
                    this.$refs.deptTree.setCurrentNode(this.defaultDept)
                })
            }
        },
        // 初始化状态
        init() {
            if (this.defaultDept.id) {
                this.getDeptStaff(this.defaultDept)
            } else {
                this.getStaffList()
            }
        },
        // 删除人员
        removeStaff(staff) {
            let index = this.value.findIndex((item) => item.id === staff.id)
            this.value.splice(index, 1)
            this.refreshDom(true)
        },
        checkChange(e) {
            if (e) {
                this.staffList.forEach((item) => {
                    this.value.push(item)
                })
            } else {
                // this.value = []
                this.value.splice(0, this.value.length)
            }
            console.log('变化值', e)
        },
    },
    created() {
        this.init()
    },
    mounted() {
        // 输入框容器
        this.referenceWrapEl = this.$refs.reference.$el
        // 输入框DOM
        this.referenceEl = this.$refs.reference.$el.getElementsByTagName('input')[0]
        // 标签容器
        this.tagWrapEl = this.$refs.tagWrap
    },
}
</script>

<style lang="scss" scoped>
.popover-wrap {
    .tree-wrap,
    .table-wrap {
        height: 270px;
        overflow-x: hidden;
        box-sizing: border-box;
        // padding: 0 $spacing-sm;
        padding: 0 $spacing-xl 0 $spacing-xs;
        .scroll {
            height: 100%;
            & /deep/ .el-scrollbar__wrap {
                overflow: auto;
            }
            .input-wrap {
                padding: 0 $spacing-xl 0 $spacing-xs;
                margin-bottom: $spacing-xs;
            }
        }
    }
}

.refer-wrap {
    position: relative;
    .multiple-result {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        padding: 0 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        min-height: 30px;
        line-height: 30px;
        cursor: pointer;
        z-index: 1;
        &.active {
            border: 1px solid $color-primary;
        }
        .tag-wrap {
            min-height: 30px;
            .tag {
                margin-right: 5px;
            }
        }
    }
    & /deep/ .el-input__inner {
        cursor: pointer;
    }
}
</style>
