<template>
  <div class="copyright">Copyright <span v-html="copy"></span> {{ year }} {{ footText }}</div>
</template>
<script>
const date = new Date()
const year = date.getFullYear()
export default {
  name: 'pms-copyright',
  data() {
    return {
      copy: '&copy',
      year: year,
      footText: window.GlobalConfig.footerText,
    }
  },
}
</script>

<style scoped lang="scss">
.copyright {
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
  text-align: center;
  font-size: $font-size-small;
}
</style>
