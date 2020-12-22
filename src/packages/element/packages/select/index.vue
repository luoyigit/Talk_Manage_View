<script>
import { setNodeAttrs } from '../../utils/vnode';
export default {
    name: 'v-el-select',
    props: {
        value: {}, // v-model的值
        attrs: { type: Object, default: null }, // el-select属性
        options: { type: Array, default: () => [] }
    },
    computed: {
        val: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    render(h) {
        const options = this.options.map(item => {
            return this.renderOption(h, item);
        });
        const select = (
            <el-select
                class="v-el-select"
                vModel={this.val}
                vOn:change={this.change}
                vOn:visible-change={this.visibleChange}
                vOn:remove-tab={this.removeTag}
                vOn:clear={this.clear}
                vOn:blur={this.blur}
                vOn:focus={this.focus}
            >
                {options}
            </el-select>
        );
        const attrs = this.attrs;
        if (attrs) {
            setNodeAttrs(select, attrs);
        }
        return select;
    },
    methods: {
        renderOption(h, item) {
            let node = null;
            if (item.children) {
                const options = item.children.map(option => {
                    return (
                        <el-option
                            value={option.value}
                            label={option.label}
                            disabled={option.disabled ? option.disabled : false}
                        ></el-option>
                    );
                });
                node = (
                    <el-option-group
                        label={item.label}
                        disabled={item.disabled ? item.disabled : false}
                    ></el-option-group>
                );
            } else {
                node = (
                    <el-option
                        value={item.value}
                        label={item.label}
                        disabled={item.disabled ? item.disabled : false}
                    ></el-option>
                );
            }
            return node;
        },
        change(...args) {
            this.$emit('change', ...args);
        },
        visibleChange(...args) {
            this.$emit('visible-change', ...args);
        },
        removeTag(...args) {
            this.$emit('remove-tag', ...args);
        },
        clear(...args) {
            this.$emit('clear', ...args);
        },
        blur(...args) {
            this.$emit('blur', ...args);
        },
        focus(...args) {
            this.$emit('focus', ...args);
        }
    }
};
</script>

<style lang="scss" scoped>
.v-el-select {
    width: 100%;
}
</style>
