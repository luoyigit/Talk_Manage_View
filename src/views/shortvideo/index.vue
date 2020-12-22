<template>
    <div class="staff-manage" >
        <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService" >添加视频</el-button>
            <pms-condition-search slot="right" search-code="videolist" @search="search"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar>
        
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="userList" :columns="columns">
                 <span slot="gender" slot-scope="scope">{{ scope.row.gender === 1 ? '男' : '女' }}</span>
                <el-tag slot="isEnable" slot-scope="scope" :type="scope.row.isEnable === true ? 'success' : 'warning'">
                    {{ scope.row.isEnable == true ? '可用' : '禁用' }}
                </el-tag>
                <template slot-scope="scope" slot="totalSeconds">
                 <span >{{scope.row.video.totalSeconds}}</span>
                </template>
                <template slot-scope="scope" slot="frameSize">
                    <span >{{scope.row.video.frameSize}}</span>
                </template>
                <template slot-scope="scope" slot="length">
                    <span >{{scope.row.video.length}}</span>
                </template>
                <template slot="action" slot-scope="scope">
                      <el-button circle type="primary" icon="el-icon-edit" title="编辑" @click="edit(scope.row)"> </el-button>
                         <!-- <el-button circle type="info" icon="el-icon-medal" title="设置技能" @click="edit(scope.row)"> </el-button> -->
                    <el-dropdown @command="handleCommand($event, scope.row)" trigger="hover" >
                        <el-button title="更多操作" circle type="success" icon="el-icon-more"> </el-button>
                        <el-dropdown-menu slot="dropdown" class="btn-dropdown">
                            <el-dropdown-item
                                v-if="scope.row.isEnable === false"
                                command="enable"
                            >
                                启用
                            </el-dropdown-item>
                            <el-dropdown-item
                                v-if="scope.row.isEnable === true"
                                command="disable"
                            >
                                禁用
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </v-el-table>
            <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination>
        </el-card>
    </div>

</template>

<script>
import serviceApi from 'services/ugc/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: {  },
    data() {
        return {
            projectList: [],
            formData: {},
            userList:[],
            columns: [
                {
                    type: 'index',
                    attrs: { width: '40' },
                },
                {
                    label: '标题',
                    prop: 'title',
                },
                {
                    label: '类别',
                    prop: 'categoryName',
                },
                {
                    label: '发布人',
                    prop: 'userNickName',
                },
                {
                    label: '添加时间',
                    prop: 'addTime',
                },
                {
                    label: '视频时长(秒)',
                    prop: 'totalSeconds',
                },
                 {
                    label: '分辨率',
                    prop: 'frameSize',
                },
                {
                    label: '文件大小(M)',
                    prop: 'length',
                },
                 {
                    label: '发布时间',
                    prop: 'releaseTime',
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
        addService() {
            this.$router.push('/shortvideo/add');
        },
        edit(row) {
            // this.$refs.eform.init(row)
           this.$refs.eform.show(row)
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
                loading: this.loading
            }
            this.loading = true
            serviceApi.getVideoList(option).then((data) => {
                    this.userList = data.dataList
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
    },
    mounted() {
      
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
