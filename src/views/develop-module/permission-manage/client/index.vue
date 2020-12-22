<template>
    <div class="staff-manage">
        <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService" >添加客户端</el-button>
            <pms-condition-search slot="right" search-code="rolelist" @search="search"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar>
        
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="servicesList" :columns="columns">
                <el-tag slot="status" slot-scope="scope" :type="scope.row.status === 0 ? 'success' : 'warning'">
                    {{ scope.row.status == 0 ? '在线' : '离线' }}
                </el-tag>
                <template slot="healthCheckAddress" slot-scope="scope">
                       <a :href="scope.row.healthCheckAddress" target="_blank" style="">{{scope.row.healthCheckAddress}}</a>
                </template>
                <template slot="action" slot-scope="scope">
                      <el-button circle type="primary" icon="el-icon-edit" title="编辑" @click="edit(scope.row)"> </el-button>
                </template>
             
            </v-el-table>
            <!-- <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination> -->
        </el-card>
         <addForm ref="add" :form ="formData" @search="search"> </addForm>
    </div>
</template>

<script>
import serviceApi from 'services/menu/index'
import addForm from './add'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: { addForm },
    data() {
        return {
            servicesList: [],
            formData: {},
            columns: [
                {
                    type: 'index',
                    attrs: { width: '40' },
                },
                {
                    label: 'AppId',
                    prop: 'appId',
                },
                {
                    label: 'AppSercret',
                    prop: 'appSecret',
                },
                {
                    label: '客户端名称',
                    prop: 'clientName',
                },
                {
                    label: '描述',
                    prop: 'remark',
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: { width: '80'}
                }
           
            ],
        }
    },
    methods: {
        addService() {
            this.$refs.add.show()
        },
        edit(row) {
           this.$refs.add.show(row)
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
            serviceApi.getclientlist(option).then((data) => {
                    this.servicesList = data
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
    },
    mounted() {
    }
}
</script>

<style scoped lang="scss">
        .red { color: red;}
        
</style>
