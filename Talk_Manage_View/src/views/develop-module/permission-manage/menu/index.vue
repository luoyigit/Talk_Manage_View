<template>
<div>
     <el-row class="header" >
           <el-button  type="primary" icon="el-icon-circle-plus-outline" @click="addModule">模块</el-button>
          <el-select v-model="clientId" placeholder="请选择" style="margin-left:10px;" @change="clientChange">
            <el-option
            v-for="item in clients"
            :key="item.id"
            :label="item.clientName"
            :value="item.id">
            </el-option>
        </el-select>
     </el-row>
     <el-row :gutter="20">
     <el-col :span="6"> 
        <div class="left" >
                
            <!-- <p>菜单模块</p> -->
              <el-tree
                :data="menuTree"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                >
                         <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                         <i class="el-icon-circle-plus" style="font-size: 15px;"  @click.stop="() => append(data)" v-if="data.pt < 2"></i>
                        <i class="el-icon-edit" style="font-size: 15px; margin-left:5px;"  @click.stop="() => edit(node, data)" ></i>
                        <i class="el-icon-delete" type="danger"  style="font-size: 15px; margin-left:5px;" @click.stop="() => remove(node, data)"></i>
                        </span>
                    </span>
                </el-tree>
        </div>

     </el-col>
    <el-col :span="18"> 
        <div class="right">
             <!-- <div class="addIco"> <i class="el-icon-circle-plus-outline " style=" font-size:20px ;"></i></div> -->
             <p>功能细分</p>
        </div>
    </el-col>
 </el-row>
  <addForm ref="addf" @search = "getTree" :clientId="clientId" > </addForm>
</div>

</template>

<script>
import serviceApi from 'services/menu/index'
import addForm from './addMenu'
export default {
     components:{
        addForm
     },
     data() {
        return {
           clients:[],
           menuTree: [],
           clientId: '',
           father: null,
        }
     },
    methods:{
        clientChange(value){
             serviceApi.getMenutree(value).then(res => {
                        this.menuTree = res
                    })
        },
        init() {
            serviceApi.getclientlist().then(res => {
              this.clients = res
              if(this.clients.length > 0) {
                  this.clientId = this.clients[0].id
                   serviceApi.getMenutree(this.clientId).then(res => {
                        this.menuTree = res
                    })
              }
            })

           
        },
        getTree(){
           serviceApi.getMenutree(this.clientId).then(res => {
                        this.menuTree = res
                    })
        },
        addModule() {
           this.$refs.addf.father = null
            this.$refs.addf.pt = 0
           this.$refs.addf.show()
        },
        append(data){
            this.$refs.addf.father = data.id
            this.$refs.addf.pt = data.pt +1
            this.$refs.addf.show()
        },
        edit(node, data) {
               this.$refs.addf.show(data.id)
        }

    },
    created() {
       this.init()
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
    .header {
        // width: 100%;
        // background-color: #FFFFFF;
        margin-bottom: 10px;    
    }
    .left {
        // width: 500px;
        height: 600px;
        background-color: #FFFFFF;
         border-radius: 4px;
         text-align: center;
        padding-top: 5px;
    }

    .right {
        // width: 100%;
        // padding-left: 15px;
        height: 600px;
         background-color: #FFFFFF;
         border-radius: 4px;
          text-align: center;
          padding-top: 5px;
         position:relative;
    }
    .addIco{
        position: relative;
        top: 5px;
        left: -50%;
    }
    h2 {
        color: blueviolet;
    }

    /deep/.el-input__inner{
        width: 80%;
    }

      .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>