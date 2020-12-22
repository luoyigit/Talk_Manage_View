<template>
    <div class="v-el-float-between">
        <div 
            class="float-chunk" 
            :class="{
                ['left-chunk']: float==='left',
                ['right-chunk']: float==='right'
            }" 
            :style="{width: floatWidth}"
        >
            <slot name="float"></slot>
        </div>
        <div class="content-chunk">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-el-float-between',
    props: {
        float: {
            type: String,
            default: 'left'
        },
        floatWidth: {
            type: String,
            default: '150px'
        }
    }
}
</script>

<style lang="scss" scoped>
.v-el-float-between{
    overflow: hidden;
    .float-chunk{
        box-sizing: border-box;
        &.left-chunk{
            float: left;
            margin-right: 20px;
        }
        &.right-chunk{
            float: right;
            margin-left: 20px;
        }
    }
    .content-chunk{
        box-sizing: border-box;
        overflow: auto;
    }
}
</style>
