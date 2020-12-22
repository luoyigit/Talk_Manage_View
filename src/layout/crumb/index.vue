<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="home-crumb" :class="{ collapse: isCollapse }">
    <el-breadcrumb-item v-for="item in crumbs" :key="item.name">
      {{ item.name }}
    </el-breadcrumb-item>
    <!-- <span class="moneyUnit">金额单位：<span class="unit">万元</span></span> -->
  </el-breadcrumb>
</template>

<script>
export default {
  props: {
    mainMenuName: {
      type: String,
    },
    isCollapse: {
      type: Boolean,
    },
  },
  computed: {
    crumbs() {
      let matched = this.$route.matched
      let index = matched.findIndex((item) => item.name === this.mainMenuName)
      return matched.slice(index)
    },
  },
}
</script>

<style lang="scss" scoped>
.moneyUnit {
  float: right;
  margin-right: 10px;
  color: #ccc;
  .unit {
    color: red;
  }
}
.home-crumb {
  position: absolute;
  top: 0;
  left: -20px;
  right: -20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid $color-first-border;
  box-sizing: border-box;
  padding-left: $spacing-md;
  background: #fff;
  transition: 0.3s;
}
</style>
