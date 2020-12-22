<script>
export default {
    name: 'v-el-pagination',
    props: {
        // 分页位置 center left right
        position: {type: String, default: 'center'},
        small: {type: Boolean, default: false},
        background: {type: Boolean, default: true},
        pageSize: {type: Number, default: 10},
        total: {type: Number},
        pageCount: {type: Number},
        pagerCount: {type: Number, default: 7},
        currentPage: {type: Number, default: 1},
        layout: {type: String, default: 'prev, pager, next'},
        pageSizes: {type: Array, default: () => [10, 20, 30, 40, 50, 100]},
        popperClass: {type: String},
        prevText: {type: String},
        nextText: {type: String},
        disabled: {type: Boolean, default: false},
        hideOnSinglePage: {type: Boolean, default: false}
    },
    render(h) {
        const pagination = <el-pagination
            small={this.small}
            background={this.background}
            page-size={this.pageSize}
            total={this.total}
            page-count={this.pageCount}
            pager-count={this.pagerCount}
            current-page={this.currentPage}
            layout={this.layout}
            page-sizes={this.pageSizes}
            popper-class={this.popperClass}
            prev-text={this.prevText}
            next-text={this.nextText}
            disabled={this.disabled}
            hide-on-single-page={this.hideOnSinglePage}
            vOn:size-change={this.sizeChange}
            vOn:current-change={this.currentChange}
            vOn:prev-click={this.prevClick}
            vOn:next-click={this.nextClick}>
        </el-pagination>
        let hidePagination = this.total <= this.pageSize ? true : false
        if (this.position === 'center') {
            return hidePagination ? null : <div class="v-el-pagination">
                {pagination}
            </div>
        } else {
            const relativePos = this.position === 'left' ? 'right' : 'left'
            const slotNode = this.$slots[relativePos]
            return (
                <div class="v-el-pagination">
                    <v-el-table-between>
                        <template slot={this.position}>{hidePagination ? null : pagination}</template>
                        <template slot={relativePos}>{slotNode}</template>
                    </v-el-table-between>
                </div>
            )
        }
    },
    methods: {
        sizeChange(...args) {
            this.$emit('size-change', ...args)
        },
        currentChange(...args) {
            this.$emit('current-change', ...args)
        },
        prevClick(...args) {
            this.$emit('prev-click', ...args)
        },
        nextClick(...args) {
            this.$emit('next-click', ...args)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-el-pagination{
    text-align: center;
    margin-top: 20px;
}
</style>
