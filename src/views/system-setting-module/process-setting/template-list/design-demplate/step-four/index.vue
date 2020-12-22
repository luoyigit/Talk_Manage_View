<template>
  <layout-success-page>
    <span slot="tip" class="tip">发布流程成功</span>
    <div class="row-wrap">
      <el-button type="success" @click="back">返回列表</el-button>
    </div>
  </layout-success-page>
</template>

<script>
export default {
  methods: {
    back() {
      this.$router.push({
        path: '/setting/process-template',
      })
    },
  },
}
</script>
