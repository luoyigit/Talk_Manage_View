<script>
export default {
    name: 'v-el-radio',
    props: {
        value: {},
        radios: {type: Array, default: () => []},
        size: {type: String},
        disabled: {type: Boolean, default: false},
        textColor: {type: String},
        fill: {type: String}
    },
    computed: {
        val: {
            get: function() {
                return this.value
            },
            set: function(val) {
                this.$emit('input', val)
            }
        }
    },
    render(h) {
        const radios = this.renderRadios(h)
        return (
            <div class="v-el-radio">{radios}</div>
        )
    },
    methods: {
        renderRadios(h) {
            const radios = this.radios.map(item => {
                let node = null
                if (item.button) {
                    node = <el-radio-button
                        vModel={this.val}
                        disabled={item.disabled ? item.disabled : false}
                        label={item.value}
                        name={item.name}
                        vOn:change={this.change}
                    >
                        {item.label}
                    </el-radio-button>
                } else {
                    node = <el-radio 
                        vModel={this.val}
                        label={item.value}
                        disabled={item.disabled ? item.disabled : false}
                        border={item.border ? item.border : false}
                        size={item.size}
                        name={item.name}
                        vOn:change={this.change}
                    >
                        {item.label}
                    </el-radio>
                }
                return node
            })
            return radios
        },
        change(...args) {
            this.$emit('change', ...args)
        }
    }
}
</script>

<style lang="scss" scoped>
.v-el-radio{
    display: inline-block;
}
</style>
