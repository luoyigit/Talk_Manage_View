<script>
import { setNodeAttrs, setNodeData, setNodeEvent } from '../../utils/vnode.js'

export default {
    name: 'v-el-form',
    props: {
        items: {
            type: Array,
            default: () => [],
        },
        formData: {
            type: Object,
            default: () => {},
        },
    },
    render(h) {
        const formItems = this.renderItems(h)
        return <el-row>{formItems}</el-row>
    },
    methods: {
        // 渲染表单项
        renderItems(h) {
            const formItems = this.items.map((item) => {
                if (!item) return null
                let node = this.setSlotNode(item)
                if (!node) {
                    node = this.renderComNode(h, item)
                }

                return this.renderItemNode(h, item, node)
            })
            return formItems
        },
        // 设置插槽节点
        setSlotNode(item) {
            const isExist = this.$slots.hasOwnProperty(item.prop)
            return isExist ? this.$slots[item.prop] : null
        },
        // 渲染组件节点
        renderComNode(h, item) {
            if (!item.component) return null
            let component = item.component
            let node = null
            if (Array.isArray(component)) {
                node = component.map((com) => {
                    let model = com.model
                    let unbind = com.model && !com.model.bind ? true : false
                    let temp = unbind ? (
                        <com.name />
                    ) : (
                        <com.name vModel={this.formData[item.prop]} />
                    )
                    if (com.attrs) {
                        setNodeAttrs(temp, com.attrs)
                    }
                    if (com.data) {
                        setNodeData(temp, com.data)
                    }
                    if (com.event) {
                        setNodeEvent(temp, com.event)
                    }
                    return temp
                })
            } else {
                let model = component.model
                let unbind = component.model && !component.model.bind
                node = unbind ? (
                    <component.name />
                ) : (
                    <component.name vModel={this.formData[item.prop]} />
                )
                if (component.attrs) {
                    setNodeAttrs(node, component.attrs)
                }
                if (component.data) {
                    setNodeData(node, component.data)
                }
                if (component.event) {
                    setNodeEvent(node, component.event)
                }
            }
            return node
        },
        renderItemNode(h, item, children) {
            if (item) {
                let formItem = (
                    <el-form-item label={item.label} prop={item.prop}>
                        {children}
                    </el-form-item>
                )
                let attrs = item.attrs
                if (attrs) {
                    setNodeAttrs(formItem, attrs)
                }
                return formItem
            } else {
                return null
            }
        },
    },
}
</script>
