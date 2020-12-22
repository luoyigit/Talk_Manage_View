let emptyFormData = {
    id: '',
    itemCode: '',
    itemName: '',
    parentCode: [],
    remark: ''
}
const columnsData = [
    {
        type: 'index',
        attrs: { width: '40'}
    },
    {
        label: '编码',
        prop: 'itemCode',
        attrs: {
            width: 350
        }
    },
    {
        label: '上级编码',
        prop: 'parentCode',
        attrs: {
            width: 350
        }
    },
    {
        label: '品目名称',
        prop: 'itemName',
        attrs: {
            width: 350
        }
    },
    {
        label: '说明',
        prop: 'remark',
        
    },
    {
        label: '操作',
        prop: 'action',
        attrs: {
            width: '120'
        }
    }
]

export { emptyFormData, columnsData}