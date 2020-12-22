export default {
    data() {
        return {
            list: [],
            conditionString: ''
        }
    },
    methods: {
        search(str) {
            this.conditionString = str
            let option = {
                pageIndex: 1,
                pageSize: this.pageSize,
                conditionString: this.conditionString
            }
            this.getList(option)
        },
        pageChange(page) {
            let option = {
                pageIndex: page,
                pageSize: this.pageSize,
                conditionString: this.conditionString
            }
            this.getList(option)
        }
    },
    created() {
        // this.getList()
    },
}