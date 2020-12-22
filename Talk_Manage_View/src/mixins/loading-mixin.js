export default {
    data() {
        return {
            loading: false,
            loadingText: window.GlobalConfig.loadingText,
            loadingSpinner: window.GlobalConfig.loadingSpinner
        }
    },
    methods: {
        openLoading() {
            this.loading = true
        },
        closeLoading() {
            this.loading = false
        }
    },
}