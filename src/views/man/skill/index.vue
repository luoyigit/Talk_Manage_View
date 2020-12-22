<template>
    <div class="container">
            <!-- 左部分 -->
            <el-col :span="4" class="left">
                <div class="row-card">
                    <i class="el-icon-circle-plus-outline" style=" font-size:20px ;" @click="add" ></i>
                    <el-tree 
                     default-expand-all
                    highlight-current-row 
                    :data="treeData" 
                    @node-click="handleNodeClick"
                     node-key="id"
                    >
                       <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                         <i class="el-icon-circle-plus" style="font-size: 15px;"  @click.stop="() => append(data)" v-if="data.depth === 0"></i>
                        <i class="el-icon-edit" style="font-size: 15px; margin-left:5px;"  @click.stop="() => edit(node, data)" ></i>
                        <i class="el-icon-delete" type="danger"  style="font-size: 15px; margin-left:5px;" @click.stop="() => remove(node, data)"></i>
                        </span>
                    </span>
                </el-tree>
                </div>
            </el-col>
            <!-- 右部分 -->
             <el-col :span="20" class="right">
                   <div class="row-card thisbox">
                        <div v-for="item in items" :key="item.id" class="box-div" @dblclick="dbedit(item)">
                           <!-- <img src="~/assets/logo.png" alt="默认图片" /> -->
                            
                            <img :src="getImageUrl(item.icon)"  alt="默认图片" />
                           <h3 style="margin-top:1px;">{{item.label}}</h3>
                        </div>
                        <div class="box-div" @click="appendlist">
                            <i class="el-icon-plus" style="font-size: 40px; line-height: 100px;"></i>
                        </div>
                  </div>
            </el-col>
            <addform ref="addf" :formdata="formdata" :currentNode="currentNode" @reload="reload" @reloadEdit="reloadEdit"></addform>
    </div>
</template>
<script>
import addform from './add'
import serviceApi from 'services/skill/index'
import http from 'utils/http'
export default {
   components:{
        addform
    },
    data(){
        return {
            formdata:{},
            fatherId: "",
            currentNode: {},
            treeData:[],
            items:[],
        }
    },
     methods:{
         getImageUrl(id){
            
             if(id) {
                 return http.getFileUrl(id)
             } else {
                  console.log('2222',id)
                 return "~/assets/logo.png"
             }
            
         },
         initData() {
            this.formdata = {
                sortIndex:0
            }
         },
        handleNodeClick(data) {
            console.log('data',data)
            this.currentNode = data
            // if(data.depth == 0){
            //     return
            // }
            serviceApi.getchildren(data.id).then(res=>{
                this.items= []
                 
                this.items = res
            })
        },
        append(data){
            this.currentNode = data
            this.formdata = Object.assign({},this.formdata, {sortIndex:0,id:'',label:'',remark:'',name: '',depth:data.depth+1,fatherId:data.id})
            this.$refs.addf.show(true)
        },
        appendlist(){
              this.formdata = Object.assign({},this.formdata, {sortIndex:0,id:'',label:'',remark:'',name: '',depth: this.currentNode.depth+1,fatherId: this.currentNode.id})
            this.$refs.addf.show(true)
        },
        add(){
             this.formdata = Object.assign({},this.formdata, {sortIndex:0,id:'',label:'',remark:'',name: ''})
              this.$refs.addf.show(this.formdata)
        },
        edit(node,data) {
            this.currentNode = data
            data.name = data.label
            // this.$refs.addf.fileList = []
            this.formdata = Object.assign({},this.formdata, data)
            this.$refs.addf.show(this.formdata)
        },
        //双击图标编辑
        dbedit(data){ 
            data.name = data.label
            this.formdata = Object.assign({},this.formdata, data)
             
            console.log('tttt',this.formdata)
            this.$refs.addf.show(this.formdata)
        },
        reload(data){
            // data.label = data.name
            // if(data.fatherId) {
            //      if(this.currentNode.depth == 0) {
            //          this.currentNode.children.push(data)
            //      } else {
            //          this.items.push(data)
            //      }
                
            // } else  {
            //     this.treeData.push(data)
            // }
            this.getTree()
            serviceApi.getchildren(this.currentNode.id).then(res=>{
                // this.items= []
                this.items = res
            })
          console.log('reload',data)
        },
        reloadEdit(data) {
            console.log('reloadEdit')
            this.getTree()
            serviceApi.getchildren(this.currentNode.id).then(res=>{
                // this.items= []
                this.items = res
            })
        },
        getTree(){
          serviceApi.gettree().then(res => {
              this.treeData = res
          })
        },
        remove(node, data) {
             this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                }).then(() => {
                    serviceApi.remove(data.id).then(res => {
                    const parent = node.parent;
                    const children = parent.data.children || parent.data;
                    const index = children.findIndex(d => d.id === data.id);
                    children.splice(index, 1);
                     serviceApi.getchildren(this.currentNode.id).then(res=>{
                            // this.items= []
                            this.items = res
                        })
                    })
                })
           
        },
        renderContent(h, { node, data, store }) {
            return (
            <span class="custom-tree-node">
                <span>{node.label}</span>
                <span>
                <el-button size="mini" type="text" on-click={ () => this.append(data) }>Append</el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }>Delete</el-button>
                </span>
            </span>);
         }
     },
     created(){
       this.initData()
       this.getTree()
    } 
}
</script>
<style lang="scss" scoped>
    .container {
         display: flex;
        
    }
   .left {
       height: 600px;
       margin-right: 10px;
    //    border-radius: 30px;
    //    padding: 0 10px 0 10px;
    //    background-color: seagreen;
   
       
   }
   .row-card {
       border-radius: 5px;
       height: 100%;
       width: 100%;
       background-color: #FFFFFF
    //    margin: 0 10px 0 10px;
   }

   .right {
       height: 600px;
        // padding: 0 10px 0 10px;
      
   }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  /deep/.el-table__body tr.current-row>td{
  background-color: #69A8EA !important;
  color: #fff;
  }

  .thisbox {
      height: 100%;
     display:flex;
     align-content: flex-start;
     display: -webkit-flex;
     box-sizing: border-box; //设置盒子影响padding
    //  margin: 0 auto;
    padding: 20px 20px 20px 20px;
     flex-wrap:wrap ;
    //  justify-content:space-between;
     flex-flow:row wrap;
     img {
         width: 80px;
         height: 80px;
     }
  }
  .boxp {
          padding: 10px 10px 10px 10px;
  }
  .box-div {
     border: solid #EBEEF5 1px;
    margin-right: 10px;
    width: 100px;
    height: 100px;
    text-align: center;
    // line-height: 120px;
    // background-color: sienna;
  }
</style>