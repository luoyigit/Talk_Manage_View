<template>
    <el-dropdown :key="data.label" class="dropdown" :show-timeout="150">
        <span class="trigger" :class="{active: showActive && currentName}">
            {{currentName ? currentName : data.label}}
            <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" class="str-list">
            <el-dropdown-item
                v-for="item in data.children"
                :key="item.str"
                @click.native="search(item)">
                <span 
                    class="item"
                    :key="item.str"
                    :class="{active: showActive && item.str === conditionString}">
                    {{item.label}}
                </span>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            default: null
        },
        conditionString: {
            type: String,
            default: ''
        },
        showActive: {
            // 是否显示高亮
            type: Boolean,
            default: false
        },
    },
    watch: {
        conditionString(val) {
            let isExist = this.data.children.some(item => item.str === val)
            if (!isExist) {
                this.currentName = ''
            }
        }
    },
    data() {
        return {
            currentName: ''
        }
    },
    methods: {
        search(item) {
            this.currentName = item.label
            this.$emit('search', item)
        }
    }
}
</script>

<style lang="scss" scoped>
.active{
    color: $color-primary
}
</style>