<template>
    <div class="log-manage">
        <el-row>
            <div style="font-size:13px;display: inline-block;">
                时间范围：
            </div>
            <div style="display: inline-block;padding-right:100px;">
                <el-date-picker
                    v-model="timeSlot"
                    type="daterange"
                    value-format="yyyy-MM-dd"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </div>
            <el-input 
                style="width:400px"
                placeholder='请输入' 
                v-model="keyword"
                @keyup.enter.native="search"
                class='input-with-select'>
                <el-select 
                    style="width:100px"
                    v-model="searchOption"
                    slot='prepend' 
                    class='select' 
                    placeholder='请选择'>
                    <el-option 
                        label="关键字"
                        value="key">
                    </el-option>
                    <el-option 
                        label='服务名' 
                        value="serviceName">
                    </el-option>
                </el-select>
                <el-button 
                    slot='append' 
                    icon='el-icon-search' 
                    @click='search' 
                    class='search'>
                </el-button>
            </el-input>
        </el-row>
        <br>
        <el-row>
            <el-card class="wrap">
                <v-el-table 
                    ref="dicForm"
                    :data='tableData' 
                    tooltip-effect="light"
                    :highlight-current-row="true"
                    :stripe="true"
                    :columns="columns">
                </v-el-table>
                <v-el-pagination
                    :total="totalCount"
                    position="center"
                    :page-size="pageSize"
                    :current-page="pageIndex"
                    @current-change="pageChange">
                </v-el-pagination>
            </el-card>
        </el-row> 
    </div>
</template>

<script>
import operationLog from 'services/operation-log/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    data() {
        return {
            tableData: [], //表格数据
            timeSlot: '', //时间段
            searchOption: 'key',
            keyword: '',
            columns: 
            [
                {
                    type: 'index'
                },
                {
                    label: '日志类别',
                    prop: 'logName',
                    attrs: {
                        width: '150px'
                    }
                },
                {
                    label: '操作人',
                    prop: 'userName',
                    attrs: {
                        // width: '100px'
                    }
                },
                  {
                    label: '业务标识',
                    prop: 'bussinessId',
                    attrs: {
                        // width: '100px'
                    }
                },
                    {
                    label: '日志内容',
                    prop: 'body',
                    attrs: {
                        // width: '200px'
                    }
                },
                  {
                    label: '生成日期',
                    prop: 'addTime',
                    attrs: {
                        width: '200px'
                    }
                },
            ]
        };
    },
    created() {
        //this.dicFormEl = this.$refs.dicForm.$el
        this.getList()
    },
    computed: {
        condition() {
            if (this.keyword) {
                return {[this.searchOption]: this.keyword}
            } else {
                return {}
            }
        }
    },
    
    methods: {
        // 页码变化
        pageChange(page) {
            let option = {
                pageIndex: page,
                pageSize: this.pageSize
            }
            this.getList(option)
        },
        getList(prop) {
            let option = prop ? prop : {
                pageIndex: 1,
                pageSize: this.pageSize
            }
            // let opt = {
            //     form: option,
            //     loading: {target: this.dicFormEl}
            // }
            operationLog.getOLogList(option).then(data => {
                this.tableData = data.dataList
                this.pageIndex = data.pageIndex
                this.totalCount = data.totalCount
            })
        },
        //获取操作日志列表数据
        search() {
            this.loading = true
            let option = Object.assign({
                pageIndex: this.pageIndex, //请求页
                pageSize: this.pageSize, //每页条数
                beginTime: this.timeSlot[0],
                endTime: this.timeSlot[1],
            }, this.condition)
            var reg = /^[A-Za-z0-9\u4e00-\u9fa5\.]+$/;
            if (this.keyword.length <= 0) {
                this.getList();
            } else if (this.searchOption.length <= 0) {
                this.$message({
                    type: 'info',
                    message: '请选择查询条件'
                });
            } else if (!reg.test(this.keyword)) {
                this.$message.error('输入的查询条件格式错误');
            } else {
                this.getList(option)
            }
        },
    }
};
</script>
