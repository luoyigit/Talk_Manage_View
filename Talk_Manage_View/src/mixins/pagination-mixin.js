export default {
    data() {
        return {
            totalCount: 0, // 列表总数
            pageSize: 10, // 每页显示的列表数
            pageSizes: [10, 15, 30, 50, 100, 200], // 可调整每页条数
            pageIndex: 1, // 当前分页
            conditionString: '', // 高级条件查询字符串
            // quickCondition: '', //快捷查询
            quickFields: [],
            tableSearchFields: {}, // 表格查询字段
        }
    },
    computed: {
        tableSearchString() {
            let fields = []
            for(let key in this.tableSearchFields) {
                fields.push(this.tableSearchFields[key])
            }
            return fields.map(item => `${item.searchProp}=${item.value}`).join('&')
        },
        quickCondition() {
            let fields = []
            for(let key in this.tableSearchFields) {
                fields.push(this.tableSearchFields[key])
            }
            return fields.map(item => `${item.searchProp}=${item.value}`).join('&')
        },
        // quickObject() {
        //     let obj = {}
        //     for(let item in this.quickFields) {
        //         var kv = this.quickFields[item].split(/[%%,=]/);
        //         if( kv[1] !== null ||  kv[1] !== undefined ||  kv[1] !== '') {
        //             obj[kv[0]] = kv[1]
        //         }
               
        //     }
        //     this.quickFields = []
        //     return obj;
        // }
    },
    methods: {
        addQuickCondition(str) {
            console.log(str)
            this.quickFields.push(str)
        },
        setQuickObject(option) {
            let obj = {}
            for(let item in this.quickFields) {
                var kv = this.quickFields[item].split(/[%%,=]/);
                if( kv[1] !== null &&  kv[1] !== undefined &&  kv[1] !== '') {
                    console.log('ttt',kv[1])
                    obj[kv[0]] = kv[1]
                }
               
            }
            this.quickFields = []
            Object.assign(option,obj)
            return obj;
        }
    }
}