<template>
    <div class="fast-search">
        <template v-for="item in searchData">
            <template v-if="item.children">
                <dropdown :key="item.label" :data="item" :condition-string="conditionString" :show-active="showActive" @search="search"></dropdown>
            </template>
            <template v-else>
                <span 
                    class="item"
                    :key="item.str"
                    :class="{active: activeItem(item.str)}"
                    @click="search(item)">
                    {{item.label}}
                </span>
            </template>
        </template>
    </div>
</template>

<script>
import Dropdown from './dropdown/index'

export default {
    name: 'pms-fast-search',
    components: {
        Dropdown
    },
    props: {
        searchData: {
            type: Array,
            default: () => []
        },
        showActive: {
            // 是否显示高亮
            type: Boolean,
            default: true
        },
        conditionString: {
            // 当前的条件字符串
            type: String,
            default: ''
        }
    },
    methods: {
        search(item) {
            this.$emit('setLeft', item.str)
            this.$emit('search')
        },
        activeItem(str) {
            // return this.showActive && this.conditionString === str
            // console.log('ddddd', this.conditionString)
            // if(!str && !this.conditionString) {
            //     return false
            // }
            if(this.conditionString) {
                if(!str) {
                    return false
                }
                return this.showActive && this.conditionString.indexOf(str) != -1
            }else {
                return this.showActive && this.conditionString === str
            }
          
        }
    }
}
</script>

<style lang="scss" scoped>
.fast-search{
    display: inline-block;
    .item{
        font-size: $font-size-small;
        margin-right: 5px;
        // color: $color-theme-black;
        cursor: pointer;
        padding: 8px 5px;
        border-radius: 4px;
        &:hover{
            background: rgba(0,0,0,0.1)
        }
        &.active{
            color: $color-primary
        }
    }
}
</style>
