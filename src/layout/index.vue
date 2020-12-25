<template>
  <div class="home">
    <head-bar :main-menu="moduleMenu" :active-name="mainMenuName"></head-bar>
    <section class="main">
      <!-- 侧边栏 -->
      <section class="aside" :class="{ collapse: isCollapse }">
        <el-scrollbar class="scroll" ref="scrollbar">
          <div class="icon-wrap">
            <a @click="isCollapse = !isCollapse"><i class="el-icon-s-unfold" :class="{ collapse: isCollapse }"></i></a>
          </div>
          <el-menu :default-active="activeRoute" class="aside-menu" :collapse="isCollapse" router unique-opened>
            <template v-for="menu in asideMenu">
              <el-submenu v-if="menu.children && menu.children.length > 0" :key="menu.path" :index="menu.path">
                <template slot="title">
                  <i :class="menu.icon"></i>
                  <span>{{ menu.name }}</span>
                </template>
                <el-menu-item v-for="item in menu.children" :key="item.path" :index="item.path">
                  <template slot="title">
                    <div class="aside-menu-item">
                      <i class="dot"></i>
                      <span class="title">{{ item.name }}</span>
                    </div>
                  </template>
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :key="menu.path" :index="menu.path">
                <i :class="menu.icon"></i>
                <span slot="title">{{ menu.name }}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-scrollbar>
      </section>
      <!-- 主体内容 -->
      <section class="content" :class="{ collapse: isCollapse }">
        <div class="viewport">
          <crumb :main-menu-name="mainMenuName" :is-collapse="isCollapse"></crumb>
          <div class="wrap">
            <div class="view">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </div>
        </div>
        <footer class="footer">
          <pms-copyright></pms-copyright>
        </footer>
      </section>
    </section>
  </div>
</template>

<script>
import deptMenu from '@/assets/menu/dept.js'
import purMenu from '@/assets/menu/pur.js'
import settingMenu from '@/assets/menu/setting.js'
import assetMenu from '@/assets/menu/asset.js'
import develop from '@/assets/menu/develop.js'
import project from '@/assets/menu/project.js'
import man from '@/assets/menu/man.js'
import renovation from '@/assets/menu/renovation.js'
import shop from  '@/assets/menu/shop.js'
import shortvideo from '@/assets/menu/shortvideo.js'
import live from '@/assets/menu/live.js'
import business from '@/assets/menu/business.js'
import money from  '@/assets/menu/money.js'
import service from '@/assets/menu/service.js'
import user from '@/assets/menu/user.js'
import HeadBar from './head-bar'
import Crumb from './crumb'
import home from '@/assets/menu/home.js'
import course from '@/assets/menu/course.js'
export default {
  data() {
    return {
      loading: false,
      loadingText: '',
      isCollapse: false,
      mainMenu: [
         {
          name: 'HOME',
          path: '/home',
          menu: home,
        },
        {
          name: '会员系统',
          path: '/user',
          menu: user,
        },
          {
          name: '人才系统',
          path: '/man',
          menu: man,
        },
        // {
        //   name: '工程系统',
        //   path: '/project',
        //   menu: project,
        // },
        {
          name: '装修系统',
          path: '/renovation',
          menu: renovation,
        },
        {
          name: '电商系统',
          path: '/shop',
          menu: shop,
        },
        {
          name: '内容系统',
          path: '/shortvideo',
          menu: shortvideo,
        },
          {
          name: '直播系统',
          path: '/live',
          menu: live,
        },
        {
          name: '运营系统',
          path: '/business',
          menu: business,
        },
         {
          name: '财务系统',
          path: '/money',
          menu: money,
        },
        {
           name: '服务治理',
          path: '/service',
          menu: service,
        },
        {
           name: '教学系统',
          path: '/course',
          menu: course,
        },
        {
          name: '基础设施',
          path: '/setting',
          menu: settingMenu,
        },
        {
          name: '开发专用',
          path: '/develop',
          menu: develop,
        }
      ],
    }
  },
  computed: {
    mainMenuName() {
      return this.$route.matched[0].name
    },
    asideMenu() {
      var name = this.$route.matched[0].name
      let moduleMenu = this.mainMenu.find((item) => item.name === name)
      if (moduleMenu) {
        return moduleMenu.menu
      } else {
        return []
      }
    },
    activeRoute() {
      return this.$route.meta.permissiblePath ? this.$route.meta.permissiblePath : this.$route.path
    },
    moduleMenu() {
      return this.mainMenu
    },
  },
  methods: {},
  components: {
    HeadBar,
    Crumb,
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.icon-wrap {
  //margin: 0 auto;
  a {
    display: block;
    width: 100%;
    height: 40px;
  }
  a:hover {
    color: red;
    cursor: pointer;
  }
}
.home {
  height: 100%;
  overflow: hidden;
  .main {
    height: calc(100% - 60px);
    .aside {
      position: relative;
      z-index: 11;
      height: 100%;
      width: 230px;
      float: left;
      overflow: hidden;
      box-sizing: border-box;
      border-right: 1px solid $color-third-border;
      // padding-right: 1px;
      text-align: left;
      transition: all 0.3s;
      &.collapse {
        width: 64px;
      }
      .scroll {
        height: 100%;
        overflow: hidden;
        .icon-wrap {
          text-align: center;
          height: 40px;
          line-height: 40px;
          box-sizing: border-box;
          border-bottom: 1px solid $color-second-border;
          i {
            cursor: pointer;
            transform: rotate(180deg);
            font-size: $font-size-large;
            &.collapse {
              transform: rotate(0deg);
            }
          }
        }
        .aside-menu {
          box-sizing: border-box;
          border-right: 0px;
          & /deep/ .el-menu-item,
          & /deep/ .el-submenu__title {
            height: 40px;
            line-height: 40px;
          }
        }

        & /deep/ .el-scrollbar__bar.is-horizontal {
          display: none;
        }
      }
    }
    .content {
      margin-left: 230px;
      padding: 0 $spacing-md;
      height: 100%;
      background: $color-third-border;
      transition: 0.3s;
      overflow: auto;
      &.collapse {
        margin-left: 64px;
      }
      .viewport {
        // height: 100%;
        position: relative;
        height: auto;
        min-height: 100%;
        padding-top: 60px;
        box-sizing: border-box;
        .wrap {
          padding-bottom: 60px;
          .view {
            margin: 0 auto;
          }
        }
      }
      .footer {
        position: relative;
        height: 60px;
        line-height: 60px;
        margin-top: -60px;
      }
    }
  }
  .aside-menu-item {
    vertical-align: middle;
    margin-left: 10px;
    .dot {
      display: inline-block;
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: black;
      margin-right: 10px;
      opacity: 0.5;
    }
  }
  .el-menu-item.is-active /deep/ .dot {
    background: $color-primary;
  }
}
.item {
  margin-top: 0px;
  margin-right: 40px;
}
</style>
