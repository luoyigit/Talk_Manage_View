<script>
export default {
    name: 'v-el-table',
    props: {
        columns: {
            type: Array,
            default: () => []
        }
    },
    inheritAttrs: false,
    watch: {
        columns() {
            this.$nextTick(() => {
                this.$refs.table.doLayout()
            })
        }
    },
    render(h) {
        let columns = this.renderColumns(h, this.columns)
        let table = (
            <el-table
                class="pms-table"
                ref="table"
                tooltip-effect="light"
                {...{
                    on: this.$listeners,
                    attrs: this.$attrs
                }}
            >
                {columns}
            </el-table>
        )
        return table
    },
    methods: {
        // 获取插槽节点
        getSlotNode(item) {
            
            const isExist = this.$scopedSlots.hasOwnProperty(item.prop)
            return isExist ? this.$scopedSlots[item.prop] : undefined
        },
        // 渲染column
        renderColumns(h, columns) {
            let ret = columns.map(item => {
                if (!item) return null
                if(item.isHide) return null;
                let { children, attrs, ...props } = item
                if (item.children) {
                    console.log('a');
                    let childNodes = this.renderColumns(h, item.children)
                    const column = (
                        <el-table-column show-overflow-tooltip={true} key={item.label} {...{ attrs: Object.assign(props, attrs) }}>
                            {childNodes}
                        </el-table-column>
                    )
                    return column
                } else {
                    //console.log(item);
                    let slot = this.getSlotNode(item)
                    let node = (
                        <el-table-column
                            show-overflow-tooltip={true}
                            key={item.type ? item.type : item.prop}
                            {...{ attrs: Object.assign(props, attrs) }}
                        >
                            {slot}
                        </el-table-column>
                    )
                    return node
                }
            })
            return ret
        },
        clearSelection() {
            this.$refs.table.clearSelection()
        },
        toggleRowSelection(row, selected) {
            this.$refs.table.toggleRowSelection(row, selected)
        },
        toggleAllSelection() {
            this.$refs.table.toggleAllSelection()
        },
        toggleRowExpansion(row, expanded) {
            this.$refs.table.toggleRowExpansion(row, expanded)
        },
        setCurrentRow(row) {
            this.$refs.table.setCurrentRow(row)
        },
        clearSort() {
            this.$refs.table.clearSort()
        },
        clearFilter(columnKey) {
            this.$refs.table.clearFilter(columnKey)
        },
        doLayout() {
            this.$refs.table.doLayout()
        },
        sort(prop, order) {
            this.$refs.table.sort(prop, order)
        }
    }
}
</script>

<style lang="scss" scoped>
.pms-table {
    & /deep/ .el-form-item {
        margin-bottom: 0;
    }
    & /deep/ .required-field > .cell:after {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
}
</style>
