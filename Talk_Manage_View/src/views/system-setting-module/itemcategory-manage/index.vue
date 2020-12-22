<!--  -->
<template>
    <div v-loading="loading" :element-loading-text="loadingText">
        <layout-search-bar>
            <condition-search slot="right" search-code="itemCategoryList" @search="search"></condition-search>
            <el-button slot="left" type="primary" icon="el-icon-circle-plus-outline" @click="addCategory">添加</el-button>
            <el-button slot="left" type="danger" icon="el-icon-circle-close" @click="clearCategory">清空</el-button>
            <pms-upload
                slot="left"
                style="display: inline;margin-left:10px"
                ref="upload"
                :action="`${uploadAddress}/itemCategory/AddFromFile`"
                :headers="uploadHeader"
                :on-success="uploadSuccess"
                :beforeUpload="beforeUpload"
                :onError="onError"
            >
                <el-button icon="el-icon-cpu">导入</el-button>
            </pms-upload>
            <a slot="left" style="margin-left: 10px" target="_blank" :href="`${uploadAddress}/temp/品目模板数据.xlsx`">下载导入模板</a>
        </layout-search-bar>
        <el-card>
            <v-el-table
                :data="categoryData"
                :columns="columns"
                v-loading="loading"
                :element-loading-text="loadingText"
                :element-loading-spinner="loadingSpinner"
            >
                <template slot="parentCode" slot-scope="scope">
                    <span>{{
                        scope.row.parentCode && scope.row.parentCode.length > 0 ? scope.row.parentCode[scope.row.parentCode.length - 1] : ''
                    }}</span>
                </template>
                <template slot="action" slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" circle title="编辑" @click="editCategory(scope.row)"> </el-button>
                    <el-button type="danger" icon="el-icon-delete" circle title="删除" @click="deleteCategory(scope.row)"></el-button>
                </template>
            </v-el-table>
            <v-el-pagination :total="totalCount" position="right" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange">
            </v-el-pagination>
        </el-card>
        <el-dialog
            :title="formData.id.length > 0 ? '编辑品目' : '添加品目'"
            :visible.sync="showDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            width="720px"
        >
            <div class="dialogContainer">
                <el-form :model="formData" label-width="100px" :rules="formRules">
                    <!-- <v-el-form :items="formItems" :form-data="formData"> 
                                <template slot="button">
                                    <el-button type="primary" @click="saveCategory">保存</el-button>
                                    <el-button @click="handleCancel">取消</el-button>
                                </template>
                            </v-el-form> -->
                    <el-form-item label="上级品目" prop="parentCode">
                        <el-cascader clearable v-model="formData.parentCode" :options="treeData" :filterable="true" style="width:530px">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="编码" prop="itemCode">
                        <el-input v-model="formData.itemCode"></el-input>
                    </el-form-item>
                    <el-form-item label="品目名称" prop="itemName">
                        <el-input v-model="formData.itemName"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                        <el-input v-model="formData.remark" type="textarea" :rows="4"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">取 消</el-button>
                <el-button type="primary" @click="saveCategory">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import itemCategoryApi from 'services/itemCategory/index'
import ConditionSearch from 'components/condition-search/index'
import mixins from 'mixins/index'
import { emptyFormData, columnsData } from './const'
import { mapState, mapGetters } from 'vuex'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin, mixins.uploadMixin],
    data() {
        return {
            showDialog: false,
            categoryData: [],
            columns: columnsData,
            formData: emptyFormData,
            keyword: '',
            conditonString: '',
            pageIndex: 1,
            treeData: {},
            formRules: {},
        }
    },
    components: {
        ConditionSearch,
    },
    created() {
        this.getCategoryTreeData()
        this.getCategoryList()
    },
    computed: {
        ...mapGetters(['uploadAddress']),
    },
    methods: {
        setFormDataEmpty() {
            this.formData = {
                id: '',
                itemCode: '',
                itemName: '',
                parentCode: [],
                remark: '',
            }
        },
        // 获取代理机构列表数据
        getCategoryList() {
            let option = {
                conditionString: this.conditonString,
                keyword: this.keyword,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize, //待使用页面滚动加载来优化
            }
            this.loading = true
            itemCategoryApi
                .getCategoryList(option)
                .then((data) => {
                    console.log(data)
                    this.loading = false
                    this.categoryData = data.dataList
                    this.totalCount = data.totalCount
                    this.totalPage = data.totalPage
                    this.pageIndex = data.pageIndex
                })
                .catch(() => {
                    this.loading = false
                })
        },
        getCategoryTreeData() {
            itemCategoryApi.getCategoryTreeData().then((data) => {
                this.treeData = data
            })
        },
        search(str) {
            this.conditonString = str
            this.getCategoryList()
        },
        editCategory(row) {
            this.formData = Object.assign(this.formData, row)

            this.showDialog = true
        },
        addCategory() {
            this.setFormDataEmpty()
            this.showDialog = true
        },
        updateCategory(item) {},
        saveCategory() {
            if (this.formData.id) {
                itemCategoryApi.updateCategory(this.formData).then(() => {
                    this.initDataAndHideDialog()
                    this.getCategoryTreeData()
                    this.getCategoryList()
                })
            } else {
                itemCategoryApi.addCategory(this.formData).then(() => {
                    this.initDataAndHideDialog()
                    this.getCategoryTreeData()
                    this.getCategoryList()
                })
            }
        },
        initDataAndHideDialog() {
            this.setFormDataEmpty()
            this.showDialog = false
        },
        clearCategory() {
            this.$confirm('确定要清除所有品目数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            })
                .then(() => {
                    itemCategoryApi.clearCategories().then(() => {
                        this.getCategoryList()
                        this.getCategoryTreeData()
                    })
                })
                .catch(() => {
                    return
                })
        },
        importCategory() {},
        handleCancel() {
            this.initDataAndHideDialog()
        },
        // 页码变化
        pageChange(pageIndex) {
            this.pageIndex = pageIndex
            this.getCategoryList()
        },
        deleteCategory(row) {
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                itemCategoryApi.removeCategory(row.id).then(() => {
                    this.getCategoryList()
                })
            })
        },
        uploadSuccess(data) {
            this.loading = false
            this.getCategoryList()
            this.getCategoryTreeData()
        },
        beforeUpload() {
            this.loading = true
            this.loadingText = '正在上传...'
        },
        onError() {
            this.loading = false
            this.$message({
                type: 'error',
                message: '上传过程中发生了错误',
            })
        },
        uploadError(err) {
            this.$message({ type: 'error', message: '导入失败' })
        },
    },
}
</script>

<style lang="scss" scoped>
.el-form {
    & /deep/ .fixed-wrap {
        width: 350px;
    }
}
.dialog-footer {
    text-align: center;
}
.dialogContainer {
    padding-right: 30px;
}
</style>
