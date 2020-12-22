<!--  -->
<template>
  <div>
    <el-card class="wrap" ref="dicForm">
        <div class="btn-add">
            <el-button 
                icon="el-icon-plus"
                type="primary"
                circle
                @click="addTab"></el-button>
        </div>
        <el-tabs 
            class="edTab"
            v-model="editableTabsValue"
            :tab-position="tabPosition" 
            style="height: auto;"
            @tab-remove="removeTab">
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.id"
                :label="item.pageName"
                :name="item.id">
                <div class="tabTop">
                    <el-button 
                        type="primary" 
                         icon="el-icon-edit" 
                        circle
                        @click="editTab(item)"></el-button>
                    <el-button 
                        type="danger" 
                        icon="el-icon-delete" 
                        circle
                        @click="removeTab(item.id)"></el-button>
                </div>    
                <div class="clear"></div>
                <page-table
                    :tableData="item.fields"
                    :pageId="item.id"
                    @update="update"></page-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>    
    <add-page-dialog
        ref="addDicDialog"
        :dicForm="dicForm"
        @update="update"></add-page-dialog>
  </div>
</template>

<script>
import pagesSetting from 'services/pages-setting/index'
import {initSystem} from 'viewModel/pages'
import AddPageDialog from './add-pages/add-pages'
import PageTable from './pages-table/pages-table'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin],
    data() {
        return {
            tableData: [],
            tabPosition: 'left',                                                
            editableTabsValue: '',
            editableTabs: [],
            dicForm: initSystem()
        };
    },
    mounted() {
        this.dicFormEl = this.$refs.dicForm.$el
        this.getData('')
    },
    components: {
        PageTable,
        AddPageDialog
    },
    computed: {
        
    },
    methods: {
        removeTab(targetId) {
            let name
            this.editableTabs.forEach(item => {
                if(item.id === targetId) {
                    name = item.pageName
                }
            })
            this.$confirm('确定要删除 ' + name + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === targetId) {
                    tabs.forEach((tab, index) => {
                        if (tab.id === targetId) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.id;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.id !== targetId);
                // 删除这个标签  targetId
                let opt = {
                    targetId: targetId,
                    loading: {target: this.dicFormEl}
                }
                pagesSetting.removePage(opt).then(date => {
                })
            })
        },
        // 获取表头数据
        getData(code) {
            let opt = {
                loading: {target: this.dicFormEl}
            }
            pagesSetting.getPage(opt).then(date => {
                this.editableTabs = date
                if(this.editableTabs.length > 0 && code === '') {
                    this.editableTabsValue = this.editableTabs[0].id
                }else if(code) {
                    this.editableTabsValue = code
                }
            })
        },
        update() {
            this.getData()
        },
        // 获取表格中的数据
        getTableData(parameter) {
            
        },
        // 添加数据头标签
        addTab() {
            this.dicForm = initSystem()
            this.$refs.addDicDialog.show(false)
        },
        editTab(row) {
            // 编辑数据头标签
            this.dicForm = row
            this.$refs.addDicDialog.show(true)
        }
    }
}

</script>
<style lang='scss' scoped>
.btn-add{
    margin-left: 1%;
}
.edTab{
    & >>> .el-tabs__header.is-left{
        width: 10% !important;
    }
    .tabTop{
        float: right;
        margin-bottom: $spacing-sm;
    }
}
.clear{
    clear: both;
}

</style>