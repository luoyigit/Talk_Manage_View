<template>
    <div class="v-el-table-between">
        <div class="cell left" :style="leftStyle">
            <slot name="left"></slot>
        </div>
        <div class="cell right" :style="rightStyle">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'v-el-table-between',
    props: {
        leftStyle: {type: Object},
        rightStyle: {type: Object}
    }
}
</script>

<style lang="scss" scoped>
.v-el-table-between{
    display: table;
    width: 100%;
    .cell{
        display: table-cell;
        width: 50%;
        vertical-align: middle;
    }
    .left{
        text-align: left;
    }
    .right{
        text-align: right;
    }
}
</style>
