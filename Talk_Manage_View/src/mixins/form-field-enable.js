export default {
    methods: {
        enable(code) {
            let index = this.revisableFields.findIndex(item => item === code)
            if (index === -1) {
                return true
            } else {
                return false
            }
        }
    }
}