<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userName: (state) => state.userInfo.userName,
    }),
  },
  created() {
    console.log('uuu', this.userName)
    //TODO 这里根据登录人的信息来判断跳转到哪个页面
    if (!this.userName) {
      this.$router.push({ name: '登录' })
    } else {
      this.$router.push({ name: '会员系统' })
    }
  },
}
</script>
