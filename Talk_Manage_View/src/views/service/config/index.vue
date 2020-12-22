<template>
<div>
  <div>
    
  </div>
     <el-tabs type="border-card">
      <el-tab-pane label="基础配置">
          <baseConfig></baseConfig>
      </el-tab-pane>
      <el-tab-pane label="会员系统">会员系统</el-tab-pane>
      <el-tab-pane label="工程装修">工程装修</el-tab-pane>
      <el-tab-pane label="电商系统">电商系统</el-tab-pane>
      <el-tab-pane label="内容系统">
          <contentConfig> </contentConfig>
      </el-tab-pane>
      <el-tab-pane label="直播">直播</el-tab-pane>
    </el-tabs>
</div>
 
</template>

<script>
import baseConfig from './baseconfig'
import contentConfig from './contentConfig'
  export default {
    components:{
       baseConfig,
       contentConfig
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
