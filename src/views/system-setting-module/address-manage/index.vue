<template>
<div>
    <el-row :gutter="20" style="background-color:#EBEEF5;" >
        <el-col :span="4" class="col-bg">
            <div class="center">
                <i class="el-icon-circle-plus-outline add-ico" @click="add" ></i>
               <h3>国家</h3> 
            </div>
            <div class="row-card">
                   <v-el-table :data="countrylist" :columns="columns" class="thistb" @row-click="clickCountry" highlight-current-row >
                       <template slot="action" slot-scope="scope">
                             <el-button circle type="danger" icon="el-icon-delete" title="删除" @click="remove(scope.row,1)"> </el-button>
                       </template>
                   </v-el-table>
            </div>
        </el-col>
        <el-col :span="4" class="col-bg">
            <div class="center">
                    <i class="el-icon-circle-plus-outline add-ico" @click="addprovince" ></i>
                <h3>省份</h3>
            </div>
            <div class="row-card" >
                  <v-el-table :data="provincelist" :columns="columns" class="thistb" @row-click="clickProvince" highlight-current-row >
                       <template slot="action" slot-scope="scope">
                             <el-button circle type="danger" icon="el-icon-delete" title="删除" @click="remove(scope.row,2)"> </el-button>
                       </template>
                   </v-el-table>
            </div>
        </el-col>
         <el-col :span="4" class="col-bg">
              <div class="center">
                      <i class="el-icon-circle-plus-outline add-ico" @click="addcity" ></i>
                <h3>城市</h3>
            </div>
             <div class="row-card">
                   <v-el-table :data="citylist" :columns="columns" class="thistb" @row-click="clickCity" highlight-current-row >
                        <template slot="action" slot-scope="scope">
                             <el-button circle type="danger" icon="el-icon-delete" title="删除" @click="remove(scope.row,3)"> </el-button>
                       </template>
                   </v-el-table>
            </div>
        </el-col>
          <el-col :span="4" class="col-bg"  >
              <div class="center">
                      <i class="el-icon-circle-plus-outline add-ico"  @click="addArea"  ></i>
                <h3>县区</h3>
            </div>
             <div class="row-card">
                   <v-el-table :data="arealist" :columns="columns" class="thistb" highlight-current-row >
                            <template slot="action" slot-scope="scope">
                             <el-button circle type="danger" icon="el-icon-delete" title="删除" @click="remove(scope.row,4)"> </el-button>
                       </template>
                   </v-el-table>
            </div>
        </el-col>
    </el-row>
    <addform ref="add"  @reload="reload" :countryId="countryid" :provinceId="provinceid" :cityId ="cityid"> </addform>
</div>
</template>
<script>
import addform from './add'
import serviceApi from 'services/address/index'
export default {
    components:{
        addform
    },
    data() {
        return {
           countrylist:[],
           provincelist:[],
           citylist:[],
           arealist: [],
           columns:[
                 {
                    type: 'index',
                    label: '序号',
                    attrs: { width: '80' },
                },
               {
                 label: '名称',
                 prop: 'name',
               },
                  {
                 label: '#',
                 prop: 'action',
                  attrs: { width: '80' },
               }
           ],
           countryid:'',
           provinceid:'',
           cityid:'',
           areaid: '',
           roleFrom:{},
        }
    },

    methods:{
        getcountrylist(){
             serviceApi.getcountrylist().then(res => {
                 this.countrylist = res;
             })
        },
        getprovincelist(){
            if(this.countryid) {
                  serviceApi.getprovincelist({countryid: this.countryid}).then(res => {
                 this.provincelist = res;
             })
            }
            
        },
        getcitylist(){
            if(this.provinceid){
                   serviceApi.getcitylist({provinceId: this.provinceid}).then(res => {
                 this.citylist = res;
             })
            }
            
        },
        getarealist() {
           if(this.cityid) {
                 serviceApi.getarealist({cityId: this.cityid}).then(res => {
                 this.arealist = res;
             })
           }
        },
        add(){
              this.$refs.add.action =1
              this.$refs.add.title ="添加国家"
              this.$refs.add.edit = false
              this.$refs.add.show(true)
        },
        addprovince(){
              this.$refs.add.action =2
              this.$refs.add.title ="添加省份"
              this.$refs.add.edit = false
              this.$refs.add.show(true)
        },
        addcity(){
              this.$refs.add.action =3
              this.$refs.add.title ="添加省份"
              this.$refs.add.edit = false
              this.$refs.add.show(true)
        },
        addArea() {
              this.$refs.add.action =4
              this.$refs.add.title ="添加县区"
              this.$refs.add.edit = false
              this.$refs.add.show(true)
        },
        reload(dowath) {
            if(dowath === 1) {
                this.getcountrylist();
            } else if(dowath === 2) {
                 this.getprovincelist();
            } else if(dowath === 3) {
                this.getcitylist();
            } else if(dowath === 4) {
                this.getarealist()
            }
            
        },
        remove(row,type) {
            console.log('ttt',type)
              this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                }).then(() => {
                    serviceApi.remove({id:row.id,type:type}).then(()=>{
                        this.reload(type)
                    })
                })
        },
        clickCountry(row, column, event) {
            // this.selectedBid = data
           this.countryid = row.id
           this.getprovincelist();
           this.citylist=[];
           this.arealist=[];
        },
        clickProvince(row, column, event) {
            this.provinceid = row.id
            this.getcitylist();
            this.arealist=[];
        },
         clickCity(row, column, event) {
            // this.selectedBid = data
           this.cityid = row.id
           this.getarealist()
        },
        
    },
    created(){
        this.getcountrylist()
     }

}
</script>
<style lang="scss" scoped>
.center{
    text-align: center;
    position: relative;
    height: 30px;
    
    
}
 .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .col-bg{
    padding: 10px 0;
    background-color: #f9fafc;

  }
  .row-card {
         min-height: 550px;
      background-color:#EBEEF5;
  
  }

  .add-ico {
    display:inline-block;
    position:absolute;
    left: 10px;
    top: -10px;
    font-size: 30px;
  }

  .thistb {
      cursor:pointer; height: 550px; 
      overflow-y: scroll;
      -ms-overflow-style: none;
        overflow: -moz-scrollbars-none;
        scrollbar-width: none;
  }
  .thistb::-webkit-scrollbar {display:none}
  /deep/.el-table__body tr.current-row>td{
  background-color: #69A8EA !important;
  color: #fff;
}
</style>