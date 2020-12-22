<template>
    <div class="staff-manage">
        <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService" >添加服务</el-button>
            <pms-condition-search slot="right" search-code="servicelist" @search="search"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar>
        
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
                      <el-button circle type="primary" icon="el-icon-edit" title="编辑" @click="edit(scope.row)"> </el-button>
                    <el-dropdown @command="handleCommand($event, scope.row)" trigger="hover" >
                        <el-button title="更多操作" circle type="success" icon="el-icon-more"> </el-button>
                        <el-dropdown-menu slot="dropdown" class="btn-dropdown">
                            <el-dropdown-item
                                v-if="scope.row.status === 1"
                                command="enable"
                            >
                                启用
                            </el-dropdown-item>
                            <el-dropdown-item
                                v-if="scope.row.status === 0"
                                command="disable"
                            >
                                停用
                            </el-dropdown-item>
                            <el-dropdown-item command="remove">
                                删除
                            </el-dropdown-item>
                            <el-dropdown-item command="healthCheck">
                               健康检查
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
             
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
      
        <!-- <set-staff ref="setStaff" :current-staff="currentStaff" @refresh="getList({ pageIndex: pageIndex, pageSize: pageSize })"></set-staff>
        <set-role ref="setRole" :current-staff="currentStaff"></set-role> -->
        <!-- <set-system-role ref="setSysRole" :form-data="formData"></set-system-role> -->
        <addService ref="addForm" @search="search"> </addService>
    </div>
</template>

<script>
import serviceApi from 'services/services/index'
import mixins from 'mixins/index'
import addService from './addService'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: { addService },
    data() {
        return {
            servicesList: [],
            formData: {},
            columns: [
                {
                    type: 'index',
                    label: '#',
                    // attrs: { width: '40' },
                },
                {
                    label: '服务名',
                    prop: 'serviceName',
                },
                {
                    label: '安装服务名',
                    prop: 'winServiceName',
                },
                {
                    label: 'Ip',
                    prop: 'ip',
                },
                {
                    label: '端口',
                    prop: 'port',
                },
             {
                    label: '健康检查地址',
                    prop: 'healthCheckAddress'
                },
                {
                    label: '接口文档地址',
                    prop: 'swaggerUrl'
                },
                 {
                    label: '状态',
                    prop: 'status'
                },
                   {
                    label: '备注',
                    prop: 'remark'
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
            serviceApi.getList(option).then((data) => {
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
        /deep/ .el-table th,
        /deep/ .el-table td {
            text-align: center !important;
        }
</style>
