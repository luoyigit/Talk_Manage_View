import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font-icon/css/font-awesome.min.css'
import './assets/style/index.scss'
import './utils/axios-setting.js'
import signalr from './utils/signalR'
import './components/index.js'
import './packages/element/index.js'
import router from './router'
import store from './store'
import BaiduMap from 'vue-baidu-map'

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
// import 'videojs-flash'; //引入才能播放rtmp视屏
import hls from 'videojs-contrib-hls' //引入才能播放m3u8文件
//npm i videojs-flash -S 安装______播放rtmp
// npm i videojs-contrib-hls -S 安装_______播放m3u8
Vue.use(VideoPlayer)
Vue.config.productionTip = false
// const hls = require('videojs-contrib-hls')

Vue.use(hls)
Vue.use(ElementUI, {size: 'small'})
Vue.use(signalr);

Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'fgk0jc8xRHCAv91AGDOjd5ZgYhK0gSbk'
})
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
