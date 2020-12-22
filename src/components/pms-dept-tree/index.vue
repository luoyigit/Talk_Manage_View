<template>
    <div class="dept-tree">
        <div class="input-wrap">
            <el-input placeholder="可输入部门名称搜索" v-model="searchName">
                <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div class="tree-wrap">
            <el-tree
                default-expand-all
                highlight-current
                ref="tree"
                node-key="id"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                :data="deptTreeList"                  
                :props="treeProps"   
                @node-click="nodeClick">
            </el-tree>
        </div>
    </div>
</template>

<script>
import deptApi from 'services/dept-manage/index'
import {createDept} from 'viewModel/department'

export default {
    name: 'pms-dept-tree',
    data() {
        return {
            searchName: '',
            deptTreeList: [],
            treeProps: {
                // 树形组件参数
                children: 'children',
                label: 'label'
            },
        }
    },
    watch: {
        searchName(val) {
            this.$refs.tree.filter(val)
        }
    },
    methods: {
        // 获取部门列表
        getDeptList() {
            deptApi.getDeptTreeList().then(data => {
                console.log('ddd', data)
                this.deptTreeList = data
                this.$emit('get-tree-data', data)
            })
        },
        // 节点过滤
        filterNode(value, data) {
            if (!value) return true
            return data.label.indexOf(value) !== -1
        },
        // 点击节点
        nodeClick(node) {
            let dept = createDept({
                id: node.id,
                name: node.label
            })
            this.$emit('node-click', dept)
        },
        // 设置当前节点
        setCurrentNode(node) {
            this.$refs.tree.setCurrentNode(node)
        }
    },
    created() {
        this.getDeptList()
    },
}
</script>

<style lang="scss" scoped>
.dept-tree{
    padding: 0 $spacing-md 0 $spacing-xs;
    .input-wrap{
        margin-bottom: $spacing-xs
    }
}
</style>