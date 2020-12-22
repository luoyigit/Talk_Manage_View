export function setNodeAttrs(node, attrs) {
    if (!node || !attrs) return null
    node.data = node.data ? node.data : {}

    if (Array.isArray(node)) {
        node.map(item => {
            let props = item.componentOptions.propsData
            item.data.attrs = item.data.attrs ? item.data.attrs : {}
            let nodeAttrs = item.data.attrs
            item.componentOptions.propsData = props ? Object.assign(props, attrs) : Object.assign({}, attrs)
            nodeAttrs = Object.assign(nodeAttrs, attrs)
        })
    } else {
        let props = node.componentOptions.propsData
        node.data.attrs = node.data.attrs ? node.data.attrs : {}
        let nodeAttrs = node.data.attrs
        node.componentOptions.propsData = props ? Object.assign(props, attrs) : Object.assign({}, attrs)
        nodeAttrs = Object.assign(nodeAttrs, attrs)
    }
    return node
}

export function setNodeData(node, data) {
    if (!node || !data) return null

    if (Array.isArray(node)) {
        node.map(item => {
            let itemData = item.data
            item.data = itemData ? Object.assign(itemData, data) : Object.assign({}, data)
        })
    } else {
        let nodeData = node.data
        node.data = nodeData ? Object.assign(nodeData, data) : Object.assign({}, data)
    }
    return node
}

export function setNodeEvent(node, event) {
    if (node.componentOptions) {
        // 组件
        let listeners = node.componentOptions.listeners
        node.componentOptions.listeners = listeners ? Object.assign(listeners, event) : Object.assign({}, event)
        return node
    } else {
        // 原生
        node.data = node.data ? node.data : {}
        let listeners = node.data.on
        node.data.on = listeners ? Object.assign(listeners, event) : Object.assign({}, event)
        return node
    }
}