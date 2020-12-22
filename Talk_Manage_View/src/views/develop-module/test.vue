<template>
  <div>
      <h1>测试页面</h1>
    <div class="text-center">
  <el-button type="primary" @click="playVideo">获取视频</el-button>
    <video id="sound" width="720" height="480" controls="controls"></video>
  </div>
  </div>
</template>
<script>
import http from 'utils/http'
export default {
    data() {
        return {

        };
    },
    mounted() {

    },
    components: {

    },
    computed: {
        
    },
    methods: {
        playVideo(){
           //创建XMLHttpRequest对象
            var xhr = new XMLHttpRequest();
            //配置请求方式、请求地址以及是否同步
            xhr.open('GET', `${http.downfileurl}?fileid=15fcdf7323ffc2b65701a578c`, true);
            //设置请求结果类型为blob
            xhr.responseType = 'blob';
            //请求成功回调函数
            xhr.onload = function(e) {
                if (this.status === 200) {//请求成功
                    //获取blob对象
                    var blob = this.response;
                    //获取blob对象地址，并把值赋给容器
                    var dom = document.getElementById('sound');
                    dom.src = URL.createObjectURL(blob);
                    // $("#sound").attr("src", URL.createObjectURL(blob));
                }
            };
            xhr.send();
        }
    }
}
</script>

