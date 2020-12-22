<template>
    <div class="layout-step-form">
        <el-steps class="step-wrap" :active="activeStep" simple finish-status="success">
            <el-step v-for="item in steps" :key="item.title" :title="item.title"></el-step>
        </el-steps>
        <div class="main">
            <slot></slot>
        </div>
        <div class="btn-wrap">
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layout-step-form',
    props: {
        steps: {
            type: Array,
            default: () => []
        },
        activeStep: {
            type: Number,
            default: 0
        }
    }
}
</script>

<style lang="scss" scoped>
.layout-step-form{
    .main{
        margin-top: $spacing-md
    }
    .btn-wrap{
        margin-top: $spacing-md;
        text-align: center
    }
}
</style>
