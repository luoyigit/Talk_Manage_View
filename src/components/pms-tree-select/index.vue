<template>
    <el-popover
        :placement="position"
        :width="popoverWidth"
        trigger="click"
        v-model="showPopover">
        <div class="popover-wrap">
            <el-scrollbar class="scroll">
                <div class="tree-wrap">
                    <div class="input-wrap">
                        <el-input placeholder="可输入名称搜索" v-model="keyword">
                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                    </div>
                    <el-tree
                        default-expand-all
                        highlight-current
                        ref="tree"
                        :node-key="treeProps[value]"
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                        :data="treeData"                  
                        :props="treeProps"   
                        @node-click="nodeClick">
                    </el-tree>
                </div>
            </el-scrollbar>
        </div>
        <div class="refer-wrap" slot="reference">
            <el-input
                ref="reference"
                v-model="showResult"
                readonly
                autosize
                type="text"
                :placeholder="placeholder">
            </el-input>
        </div>
    </el-popover>
</template>

<script>
const MinPopoverWidth = 400

export default {
    name: 'pms-tree-select',
    props: {
        placeholder: {
            type: String,
            default: '请选择'
        },
        treeProps: {
            type: Object,
            default: () => {
                return {
                    value: 'value',
                    label: 'label',
                    children: 'children'
                }
            }
        },
        treeData: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: ''
        }
    },
    computed: {
        showResult() {
            return this.currentNode && this.currentNode[this.treeProps.label] ? this.currentNode[this.treeProps.label] : ''
        },
    },
    watch: {
        keyword(val) {
            this.$refs.tree.filter(val)
        },
        showPopover(val) {
            if (val) {
                this.popoverOpen()
            }
        },
        value(val) {
            this.findNode(this.treeData, val)
        }
    },
    data() {
        return {
            keyword: '',
            currentNode: null,
            position: 'bottom',
            popoverWidth: MinPopoverWidth,
            showPopover: false
        }
    },
    methods: {
        // 点击节点
        nodeClick(node) {
            this.$emit('input', node[this.treeProps.value])
            this.showPopover = false
        },
        // 节点过滤
        filterNode(value, data) {
            if (!value) return true
            return data[this.treeProps.label].indexOf(value) !== -1
        },
        // 查找节点
        findNode(treeData, nodeId) {
            if(nodeId) {
                treeData.forEach(item => {
                    if (item[this.treeProps.value] === nodeId) {
                        this.currentNode = item
                    }
                    if (item.children) {
                        this.findNode(item.children, nodeId)
                    }
                })
            } else {
                this.currentNode = null
            }
        },
        // 出现下拉时
        popoverOpen() {
            let width = this.referenceWrapEl.clientWidth
            this.popoverWidth = Math.max(width, MinPopoverWidth)
        },
    },
    mounted() {
        // 输入框容器
        this.referenceWrapEl = this.$refs.reference.$el
    }
}
</script>

<style lang="scss" scoped>
.popover-wrap{
    height: 270px;
    overflow-x: hidden;
    box-sizing: border-box;
    .tree-wrap{
        padding: 0 $spacing-xl 0 $spacing-xs
    }
    .scroll{
        height: 100%;
        & /deep/ .el-scrollbar__wrap{
            overflow: auto
        }
    }
}
.refer-wrap{
    & /deep/ .el-input__inner{
        cursor: pointer
    }
}
</style>