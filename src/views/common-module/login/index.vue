<template>
  <div class="login-page">
    <div class="main">
      <div class="logo-wrap">
        <img class="logo" src="./image/logo.png" width="70" height="70" />
        <p class="text">{{ appName }}</p>
      </div>
      <div class="banner">
        <!-- <div class="right-bg"></div> -->
        <div class="content">
          <!-- <div class="bg-img"></div> -->
          <div class="login-form">
            <el-tabs v-model="tabName">
              <el-tab-pane label="登陆" name="teacher" class="panel" v-loading="loading" :element-loading-text="loadingText">
                <el-form ref="form" :model="form" :rules="rules">
                  <el-form-item prop="userName">
                    <el-input v-model="form.userName" size="small" :autofocus="true" placeholder="用户名">
                      <i slot="prefix" class="el-input__icon fa fa-user-o"></i>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input size="small" type="password" placeholder="密码" v-model="form.password" @keyup.enter.native="submit">
                      <i slot="prefix" class="el-input__icon fa fa-key"></i>
                    </el-input>
                  </el-form-item>
                  <div class="btn-wrap">
                    <el-button class="btn" size="medium" type="primary" @click="submit">
                      登 录
                    </el-button>
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
    <pms-copyright></pms-copyright>
  </div>
</template>

<script>
import authorizeService from '@/services/authorizeService'
import LoginUserInfoService from '@/services/getLoginUserInfo'
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      loading: false,
      loadingText: '正在检查登录状态...',
      form: {
        userName: '',
        password: '',
      },
      tabName: 'teacher',
      rules: {
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      items: [
        {
          label: '用户名',
        },
      ],
      appName: '五次方装修平台',
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.userInfo,
    }),
  },
  methods: {
    submit() {
      this.$refs.form.validate().then(() => {
        this.form.loginName = this.form.userName
        let options = {
          data: {
                client_id: "talkAdmin",
                grant_type: "admin_auth_psw",
                username: this.form.userName,
                password: this.form.password
          }
        }
        
        
var qs = require('qs');  //参数序列化组件
// axios.create({
//         baseURL: 'http://192.168.1.208:61114',
//         timeout: 10000,
//         headers: { 'Content-Type': 'application/json' }
//       }).post('/connect/token',qs.stringify({
//           client_id: "mzAdmin",
//                 grant_type: "admin_auth_psw",
//                 username: this.form.userName,
//                 password: this.form.password
//         }),{
//           headers:{
//             'Content-Type': 'application/x-www-form-urlencoded'
//           }
//         }).then(function(response){
//           console.log(JSON.stringify(response));
//         }).catch(function(error){
//           console.log(error);
//         });


        options.data = qs.stringify({
                client_id: "talkAdmin",
                grant_type: "admin_auth_psw",
                username: this.form.userName,
                password: this.form.password
        })
      
        authorizeService.login(options).then((data) => {
          var saveData =  {
             token: data.access_token,
             refreshToken: data.refresh_token,
             userName: ''
          }
           this.$store.dispatch('saveUserInfo', saveData)
           LoginUserInfoService.getLoginUserInfo().then(data => {
                saveData.userName = data.userName
                saveData.realName = data.realName
                this.$store.dispatch('saveUserInfo', saveData)
                 this.$router.push({ path: '/' })

           });
      
        })


      // this.$store.dispatch('saveUserInfo', { token: "sss", UserId: "1", realName:"罗艺", userName: "罗艺"})
      //  this.$router.push({ path: '/' })
        // login(options).then((data) => {
        //   const userRoutes = data.routes ? data.routes : []
        //   // const hasPersonalModule = userRoutes.some(
        //   //     (item) => item === '/personal/overview'
        //   // )
        //   // const hasHostModule = userRoutes.some(
        //   //     (item) => item === '/host/overview'
        //   // )
        //   // const hasSettingModule = userRoutes.some(
        //   //     (item) => item === '/setting/dept'
        //   // )
        //   //this.$store.dispatch('saveUserInfo', data)
        //   //baseDataApi.getAllBaseDataItem()
        //   //parameterApi.getAllParameterList()
        //   //commonApi.getServerAddress()
        //   //this.$router.push({ path: '/userCenter/home' })
        // })
      })
    },
  },
  created() {},
}
</script>

<style lang="scss" scoped>
.login-page {
  min-width: 1200px;
  .main {
    padding-bottom: $spacing-md;
    .logo-wrap {
      height: 70px;
      line-height: 70px;
      width: 1200px;
      margin: 0 auto $spacing-md auto;
      padding-top: $spacing-md;
      text-align: left;
      .logo {
        float: left;
        margin-right: $spacing-xl;
        // background: $color-primary;
        // border-radius: 50%;
      }
      .text {
        font-size: 24px;
      }
    }
    .banner {
      background-image: url('./image/598ab67ad79a1.jpg');
      background-repeat: repeat-x;
      position: relative;
      height: 560px;
      // background-color: $color-primary;
      //background-image: linear-gradient(-90deg, rgb(10, 72, 209) 0px, rgb(17, 131, 251) 100%);
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-attachment: initial;
      background-origin: initial;
      background-clip: initial;
      // background-color:$color-primary;
      .right-bg,
      .left-bg {
        position: absolute;
        width: 430px;
        height: 300px;
      }
      .left-bg {
        top: 0;
        left: 10;
        // background-image: url('./image/login-bg-left.png');
      }
      .right-bg {
        right: 0;
        bottom: 0;
        background-image: url('./image/login-bg-right.png');
        background-position-x: 50px;
        background-repeat: no-repeat;
      }
      .content {
        width: 1200px;
        height: 560px;
        margin: 0 auto;
        position: relative;
        overflow: hidden;
      
        .bg-img {
          margin-top: 80px;
          margin-left: $spacing-xl;
          height: 400px;
          width: 700px;
          // height: 100%;
          // width: 100%;
          background-image: url('./image/run.jpg');
          background-repeat: no-repeat;
          z-index:99;
        }
        .login-form {
          position: absolute;
          width: 350px;
          top: 50%;
          right: 0px;
          transform: translateY(-50%);
          height: 320px;
          background: #fff;
          padding: $spacing-xl $spacing-md 0 $spacing-md;
          border-radius: 5px;
          .panel {
            padding: $spacing-md;
            & /deep/ .el-form-item--mini.el-form-item {
              margin-bottom: 30px;
            }
            .btn-wrap {
              margin-top: $spacing-md;
              .btn {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
