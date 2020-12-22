<template>
    <div class="search-bar" :class="{center: $slots && $slots.center}">
        <slot name="left">
            <slot name="left-prepend"></slot>
            <pms-fast-search
                v-if="searchData"
                :search-data="searchData"
                :condition-string="conditionString"
                @search="search"
                @setLeft="setLeft">
            </pms-fast-search>
            <slot name="left-append"></slot>
        </slot>
        <slot name="center"></slot>
        <div class="right">
            <slot name="right" >
                <slot name="right-prepend"></slot>
                <pms-condition-search
                    v-if="searchCode"
                    :search-code="searchCode"
                    @search="search"
                    @setRight="setRight">
                </pms-condition-search>
                <el-button v-if="!$refs.right && searchCode && isShowRight" type="text" @click="$refs.setCondition.show()">高级搜索</el-button>
                <slot name="right-append"></slot>
            </slot>
        </div>
        <pms-set-condition
            v-if="!$refs.right && searchCode"
            ref="setCondition"
            :condition-string="conditionString"
            :search-code="searchCode"
            @search="search">
        </pms-set-condition>
    </div>
</template>

<script>
export default {
    name: 'layout-search-bar',
    props: {
        searchData: {
            type: Array,
            default: null
        },
        searchCode: {
            type: String, 
            default: ''
        },
        conditionString: {
            type: String,
            default: ''
        },
        isShowRight: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            leftStr: '',
            rightStr: '',
            quickCondition: []
        }
    },
    methods: {
        search(vStr) {
            let str = ''
            if(this.leftStr && this.rightStr) {
                str = `${this.leftStr}&${this.rightStr}`
            } else if (this.leftStr && !this.rightStr) {
                str = this.leftStr
            } else if (this.rightStr && !this.leftStr) {
                str = this.rightStr
            }
            if(vStr) {
               if(str) {
                  str = `${str}&${vStr}`
               } else {
                  str = vStr
               }
              
            }
            // console.log('汇总', str)
            this.$emit('search', str)
        },
        setLeft(str) {
            this.leftStr = str
        },
        setRight(str) {
            this.rightStr = str
        },
        setQuickCondition(str) {
            console.log('wqerwer')
            this.quickCondition.push(str)
        }
    },
    created() {
  
    }
}
</script>

<style lang="scss" scoped>
.search-bar{
    height: 36.4px;
    line-height: 36.4px;
    margin-bottom: $spacing-xs;
    text-align: left;
    &.center{
        text-align: center
    }
    & /deep/ .block-wrap{
        display: inline-block;
        vertical-align: middle;
        height: 36px;
        line-height: 36px;
        margin: 0 $spacing-xs
    }
    .right{
        float: right;
        vertical-align: top;
        overflow: hidden;
        text-align: right;
    }
}
</style>