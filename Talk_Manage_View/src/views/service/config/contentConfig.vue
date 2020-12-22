<template>
   <div>
        <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="水印LOGO">
        <!-- <el-input v-model="form.watermarklogo"></el-input> -->
        <!-- <img :src="logosrc" style="width:60px;heigh:60px;" /> -->
        <el-upload
        class="avatar-uploader"
        :headers="headers"
        :action="fileUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="logosrc" :src="logosrc" class="avatar" style="width:60px;heigh:60px;">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-form-item>
   </el-form>
     <el-button type="primary" plain @click="save">保存</el-button>
   </div>
 
</template>

<script>
   import http from 'utils/http'
   import serviceApi from 'services/services/index'
  export default {
    data() {
      return {
        fileUrl: http.singleUploadUrl,
        activeName: 'first',
        headers: http.getUplaodHeaders(),
        logosrc:'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        form:{ 
          watermarkLogo:""
          }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleAvatarSuccess(response, file, fileList) {
        console.log("xx",response)
        this.logosrc = `${http.downfileurl}?fileid=${response.data}`
        this.form.watermarkLogo = response.data
      },
      beforeAvatarUpload(){

      },
      save(){
          serviceApi.savecontentconfig(this.form).then(res =>{

          })
      }
    },
     created() {
       
     },
     mounted(){
         serviceApi.getsystemconfig().then(res => {
            this.form.watermarkLogo  = res.watermarkLogo
             this.logosrc = `${http.downfileurl}?fileid=${res.watermarkLogo}`
         })
     }
  };
</script>