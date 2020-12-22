<script>
import {setNodeAttrs} from '../../utils/vnode.js'

export default {
    name: 'v-el-grid-between',
    props: {
        leftProps: {
            type: Object,
            default: () => {
                return {span: 12}
            }
        },
        rightProps: {
            type: Object,
            default: () => {
                return {span: 12}
            }
        }
    },
    render(h) {
        let leftSLot = this.$slots.left
        let leftCol = <el-col class="left">{leftSLot}</el-col>
        let rightSlot = this.$slots.right
        let rightCol = <el-col class="right">{rightSlot}</el-col>
        let cols = [leftCol, rightCol]
        let props = [this.leftProps, this.rightProps]
        const children = cols.map((item, index) => {
            return setNodeAttrs(item, props[index])
        })
        return (
            <el-row class="v-el-grid-between">
                {children}
            </el-row>
        )
    }
}
</script>

<style lang="scss" scoped>
.v-el-grid-between{
    .left{
        padding-right: 10px
    }
    .right{
        padding-left: 10px
    }
}
</style>
