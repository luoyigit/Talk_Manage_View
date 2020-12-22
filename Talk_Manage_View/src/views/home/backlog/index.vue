<template>
    <div class="staff-manage">
        <!-- <layout-search-bar @search="search" :condition-string="conditionString">
            <pms-condition-search slot="right" search-code="servicelist" @search="search"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar> -->
        
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="servicesList" :columns="columns">
                <el-tag slot="status" slot-scope="scope" :type="scope.row.status === 0 ? 'success' : 'warning'">
                    {{ scope.row.status == 0 ? '在线' : '离线' }}
                </el-tag>
                <template slot="healthCheckAddress" slot-scope="scope">
                       <a :href="scope.row.healthCheckAddress" target="_blank" style="color:#1076F2;">{{scope.row.healthCheckAddress}}</a>
                </template>
               <template slot="swaggerUrl" slot-scope="scope">
                       <a :href="scope.row.swaggerUrl" target="_blank" style="color:#1076F2;">{{scope.row.swaggerUrl}}</a>
                </template>
                <template slot="action" slot-scope="scope">
                      <el-button  type="primary"  title="编辑" @click="edit(scope.row)">去处理</el-button>
                </template>
             
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
    
    </div>
</template>

<script>
import serviceApi from 'services/ProcessService/index'
import mixins from 'mixins/index'

export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: {  },
    data() {
        return {
            servicesList: [],
            formData: {},
            columns: [
                {
                    type: 'index',
                    label: '#',
                    attrs: { width: '40' },
                },
                {
                    label: '标题',
                    prop: 'title',
                },
                {
                    label: '添加时间',
                    prop: 'addTime',
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '150',
                    },
                },
            ],
        }
    },
    methods: {
        renderHeader(h,{column,$index}){
            // return h('div',{
            //     attrs:{
            //     class:'cell',
            //     },
            //     domProps:{
            //     innerHTML:'<span class="red">*</span>'+column.label
            //     }
            // })
             return h('span',{
                // attrs:{
                // class:'cell',
                // },
                domProps:{
                innerHTML:'<span style="color:red;">*</span>'+column.label
                }
            })
        },
        addService() {
            this.$refs.addForm.show()
        },
        edit(row) {
           this.$refs.addForm.show(row)
        },
        search() {
            let option = {
                pageIndex: 1,
                pageSize: this.pageSize,
            }
            this.setQuickObject(option);
            this.getList(option)
        },
        getList(prop) {
            let option = {
                data: prop
                    ? prop
                    : {
                          pageIndex: 1,
                          pageSize: this.pageSize,
                      },
            }
            this.loading = true
            serviceApi.getMyBacklogList(option).then((data) => {
                    this.servicesList = data.dataList
                    this.pageIndex = data.pageIndex
                    this.totalCount = data.totalCount
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
        },

        handleCommand(command, row) {
            if (command === 'edit') {
                this.editStaff(row)
            } else if (command === 'disable') {
                serviceApi.addEvent({serviceId: row.id,eventType:2})
            } else if (command === 'enable') {
                 serviceApi.addEvent({serviceId: row.id,eventType:1})
            } else if (command === 'remove') { 
                  this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                }).then(() => {
                    serviceApi.remove({ids:[row.id]}).then(()=>{
                        this.search()
                    })
                })
               
            } else if(command === 'restart') {
                serviceApi.addEvent({serviceId: row.id,eventType:1})
            } else if(command  === 'healthCheck') {
                serviceApi.healthCheck(row.id).then(()=> {
                     this.search()
                })
                
            }

        },
        pageChange(page) {
            this.getList({
                pageIndex: page,
                pageSize: this.pageSize,
                key: this.keyword
            })
        },
        show() {
            alert('hello world')
        }
    },
    created() {
        this.getList()
        this.signalr.off('RefleshServiceStatus');
        this.signalr.on('RefleshServiceStatus',res=>{
　　　　　　　//可以做相关业务逻辑
            console.log('signalr:',res);
        })
    },
    mounted() {
          this.signalr.start().then(() => {
                console.log('连接');
                // this.signalr.invoke("SendMessage", "luoyi", "sdfsfs").catch(function (err) {
                //     return console.error(err.toString());
                // });
                 this.signalr.invoke("CheckAllService").catch(function (err) {
                    return console.error(err.toString());
                });
            })
    }
}
</script>

<style scoped lang="scss">
        .red { color: red;}
        
</style>
