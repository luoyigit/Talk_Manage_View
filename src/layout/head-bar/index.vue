<template>
  <div class="head-bar" >
    <div class="logo-wrap" style="display: flex;width: 15%">
     <div style="display: flex;align-items: center"><img class="logo" src="./image/logo.png" /></div>
      <div ><span class="title" >{{ appName }}</span></div>
  </div>
    <ul class="main-menu" style="width: 70%">
      <li class="item" v-for="item in headerMenu" :key="item.name" :class="{ active: item.name === activeName }">
        <router-link class="link" :to="item.path">{{ item.name }}</router-link>
      </li>
    </ul>
    <div class="right" style="width: 15%">
      <span>您好！ </span>
      <a href="javascript:void(0)" class="userName"> {{ userName }} </a>
      <el-badge :value="auditCount"  size="mini" class="audit" :max="99" @click.native="toBacklogList">
        <el-tooltip content="待办事项" effect="light" placement="bottom">
          <i class="el-icon-document"></i>
        </el-tooltip>
      </el-badge>

      <el-tooltip content="已办事项" effect="light" placement="bottom">
        <a style="color:#fff" href="javascript:void(0)"><i class="el-icon-document-checked"></i></a>
      </el-tooltip>

      <el-badge :value="0" :hidden="true" size="mini" class="message" :max="99">
        <el-tooltip content="站内消息" effect="light" placement="bottom">
          <i class="el-icon-message" @click="gotoMessage"></i>
        </el-tooltip>
      </el-badge>

      <el-tooltip content="退出登录" effect="light" placement="bottom">
        <el-button class="whiteText" type="text" @click="logout">退出</el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import storage from 'utils/storage/index'
import processService from 'services/ProcessService/index'
export default {
  props: {
    mainMenu: {
      type: Array,
      default: () => [],
    },
    activeName: {
      type: String,
      default: '基础设施',
    },
  },
  data() {
    return {
      appName: '五次方装修管理平台',
      auditCount: 0
    }
  },
  computed: {
    headerMenu() {
      return this.mainMenu.filter((item) => !item.hidden)
    },
    ...mapState({
      userName: (state) => state.userInfo.realName,
    }),
  },
  methods: {
    logout() {
      this.$confirm('点击“确定”将退出登录！', '确定要退出系统吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        storage.clearStorage()
        this.$router.push({ path: '/login' })
      })
    },
    gotoMessage() {
      this.$router.push({ path: '/message' })
    },
     toBacklogList(){
       console.log('sfstst')
         this.$router.push({ path: '/home/backlog' })
     }
  },
  components: {},
   created() {
       processService.getBackLogCount().then((res) => {
          this.auditCount = Number(res)
       })
      
    }
}
</script>

<style lang="scss" scoped>
.userName {
  margin-left: 15px;
  margin-right: 10px;
   color: white;
}
.userName:hover {
  text-decoration: underline;
}
.whiteText {
  color: #fff;
}
.head-bar {
  height: 60px;
  // background: #595959;
  //background-image: linear-gradient(-90deg, rgb(10, 72, 209) 0px, rgb(17, 131, 251) 100%);
  // background-image: linear-gradient(-90deg, rgb(248, 133, 17) 0px, rgb(248, 171, 29) 100%);
  //  background-image: linear-gradient(-90deg, rgb(45, 45, 48) 0px, rgb(56, 56, 61) 100%);
  // background-image: linear-gradient(-90deg,$lime-8 0px,$lime-10 100%);
  background-image: url('./image/head.jpg');

  background-position: center 0; 
  background-size: cover; 
-webkit-background-size: cover;/* 兼容Webkit内核浏览器如Chrome和Safari */ 
-o-background-size: cover;/* 兼容Opera */ 
  background-position-x: initial;

  background-repeat: no-repeat;

  background-position-y: initial;
  background-size: initial;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
 // background-color: $color-primary;
  color: #fff;
  overflow: hidden;
  display: flex;
  text-align: left;
  .logo-wrap {
    float: left;
    // width: 300px;
    height: 60px;
    line-height: 60px;
    font-size: 0;
    overflow: hidden;
    box-sizing: border-box;
    .logo,
    .title {
      display: inline-block;
      vertical-align: middle;
      margin-left: $spacing-xs;
      // color: #0071BC;
    }
    .logo {
      width: 36px;
      height: 36px;
    }
    .title {
      font-size: 24px;
    }
  }
  .main-menu {
    margin-left: $spacing-md;
    display: inline-block;
    line-height: 60px;
    .item {
      float: left;
      display: block;
      cursor: pointer;
      &.active,
      &:hover {
        //background: rgba(0, 0, 0, 0.1);
        background: goldenrod;
        // background:$color-fu;
      }
      .link {
        padding: 8px 12px;
        font-size: $font-size-medium;
        font-weight: 700;
        color: #fff;
      }
    }
  }
  .right {
    float: right;
    margin-right: $spacing-xs;
    height: 60px;
    line-height: 68px;
    & /deep/ .el-dropdown-link {
      color: #fff;
      cursor: pointer;
    }
    .message,
    .audit {
      margin: 0 $spacing-md;
      cursor: pointer;
      & /deep/ .el-badge__content.is-fixed {
        top: 15px;
      }
    }
  }
}
</style>
