<!--  -->
<template>
  <div>
    <el-card class="wrap"
        v-loading="loading"
        :element-loading-text="loadingText"
        :element-loading-spinner="loadingSpinner">
      <div class="btn-add">
          <el-button 
            icon="el-icon-circle-plus-outline"
            v-show="showDictionary"
            type="primary"
            @click="addTab">添加</el-button>
      </div>
        <el-tabs 
            class="edTab"
            id="edTab"
            ref="dicEl"
            v-model="editableTabsValue"
            :tab-position="tabPosition" 
            style="height: auto;"
            @tab-remove="removeTab">
            <el-tab-pane
                v-for="item in editableTabs"
                :key="item.id"
                :label="item.tabName"
                :name="item.code">
                <div class="tabTop">
                    <el-button 
                        type="primary" 
                        v-show="showDictionary"
                        icon="el-icon-edit-outline"
                        circle
                        @click="editTab(item)"></el-button>
                    <el-button 
                        type="danger" 
                        v-show="showDictionary"
                        icon="el-icon-delete"
                        circle
                        @click="removeTab(item)"></el-button>
                </div>    
                <div class="clear"></div>
                <dic-table
                    :tableData="item.items"
                    :tabCode="item.code"
                    @update="update"></dic-table>
            </el-tab-pane>
        </el-tabs>
    </el-card>    
    <add-dic-dialog
        ref="addDicDialog"
        :dicForm="dicForm"
        @update="update"></add-dic-dialog>

  </div>
</template>

<script>
import dictionaryApi from 'services/dictionary-manage/index'
import systemEnumApi from 'services/systemEnumItem/index'
import {initBaseData} from 'viewModel/dictionary'
import AddDicDialog from './add-dictionary/add-dictionary'
import DicTable from './dictionary-table/dictionary-table'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin],
    data() {
        return {
            tableData: [],
            tabPosition: 'left',
            editableTabsValue: '',
            editableTabs: [],
            dicForm: initBaseData(),
            // showDictionary: window.GlobalConfig.showDictionary,
            showDictionary: true
        };
    },
    updated() {
        this.setheight()
    },
    mounted() {
        this.dicEl = this.$refs.dicEl.$el
        this.getData('')
    },
    components: {
        DicTable,
        AddDicDialog
    },
    methods: {
        setheight() {
            // let navScroll = document.getElementsByClassName('el-tabs__nav-scroll')[0];
            // let edTab = document.getElementById('edTab')
            // let ret = document.getElementById('edTab').offsetHeight
            // navScroll.style.height = ret + 'px';
        },
        removeTab(res) {
            let name
            this.editableTabs.forEach(item => {
                if(item.code === res.code) {
                    name = item.tabName
                }
            })
            this.$confirm('确定要删除 ' + name + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let tabs = this.editableTabs;
                let activeName = this.editableTabsValue;
                if (activeName === res.code) {
                    tabs.forEach((tab, index) => {
                        if (tab.code === res.code) {
                            let nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.code;
                            }
                        }
                    });
                }
                this.editableTabsValue = activeName;
                this.editableTabs = tabs.filter(tab => tab.code !== res.code);
                // 删除这个标签  
                let opt = {
                    id: res.id,
                    loading: {target: this.dicEl}
                }
                dictionaryApi.removeTitleName(opt).then(date => {
                })
            })
        },
        // 获取表头数据
        getData(code) {
            this.loading = true
            systemEnumApi.getAllBaseDataItem().then(date => {
                this.editableTabs = date
                if(this.editableTabs.length > 0 && code === '') {
                    this.editableTabsValue = this.editableTabs[0].code
                }else if(code) {
                    this.editableTabsValue = code
                }
                console.log(this.editableTabs)
                this.loading = false
            }).catch(() => {
                this.loading = false
            })
        },
        update(code) {
            this.getData(code)
        },
        // 添加数据头标签
        addTab() {
            this.dicForm = initBaseData()
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
.borli{
    background-color: red;
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
