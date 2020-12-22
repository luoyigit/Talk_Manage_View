  <template>
    <div>
        <el-form 
            :label-position='labelPosition'
            :inline="true" 
            :rules="rules"
            :model="formline" 
            ref="dicForm"
            class="demo-form-inline a_form">
            <el-form-item label="字段编码:"
                prop="label">
                <el-input 
                    v-model="formline.label"></el-input>
            </el-form-item>
            <el-form-item label="字段名称:"
                prop="fieldName">
                <el-input 
                    v-model="formline.fieldName"></el-input>
            </el-form-item>
            <el-form-item label="字段类型:"
                prop="fieldType">
                <el-select v-model="formline.fieldType" placeholder="请选择字段类型">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item 
                label="排序号:"
                class="padlefe">
                <el-input 
                    v-model="formline.sort"
                    type="number" ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">{{typeName}}</el-button>
            </el-form-item>
        </el-form>
        <el-table
            v-loading="loading"
            :element-loading-text="loadingText"
            :element-loading-spinner="loadingSpinner"
            class="r_Table"
            :data="tableData"
            style="width: 100%"
            width="200">
        <el-table-column
            prop="label"
            label="字段编码"
            min-width="300">
        </el-table-column>
        <el-table-column
            prop="fieldName"
            label="字段名称"
            width="200">
        </el-table-column>
        <el-table-column
            prop="setFieldType"
            label="字段类型"
            width="200">
        </el-table-column>
        <el-table-column
            prop="sort"
            label="排序号">
        </el-table-column>
        <el-table-column label='操作' width="160">
            <template slot-scope='scope'>
                <el-button 
                    type="primary" 
                    icon="el-icon-edit" 
                    circle
                    title="编辑"
                    @click="editRole(scope.row)"></el-button>
                <el-button 
                    type="success" 
                    v-if="scope.row.setFieldType==='枚举'"
                    icon="el-icon-plus" 
                    circle
                    title="添加明细"
                    @click="addDetial(scope.row)"></el-button>
                <el-button 
                    type="warning" 
                    v-if="scope.row.setFieldType==='远程'"
                    icon="el-icon-news" 
                    circle
                    title="远程地址"
                    @click="addUrl(scope.row)"></el-button>
                <el-button 
                    type="danger" 
                    icon="el-icon-delete" 
                    circle
                    title="删除"
                    @click='deleteRole(scope.row)'></el-button>
            </template>
        </el-table-column>
        </el-table>
        <edit-pages 
            :tableData="formData.enumDetals"
            :allData="formData"
            ref="editPages"></edit-pages>
        <set-url
            :allData="formData"
            ref="setUrl"></set-url>
    </div>
  </template>

<script>
import SetUrl from './setUrl/setUrl'
import EditPages from './edit-pages/edit-pages'
import pagesSetting from 'services/pages-setting/index'
import {initParameter} from 'viewModel/pages'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin],
    data() {
        return {
            formData: {}, //枚举详情表
            formline: initParameter(),
            labelPosition: 'right',
            typeName: '添加',
            typeAdd: true,
            options: [{
                value: 1,
                label: '字符串',
            }, {
                value: 2,
                label: '数字',
            }, {
                value: 3,
                label: '日期',
            }, {
                value: 4,
                label: '枚举',
            }, {
                value: 5,
                label: '远程',
            }, {
                value: 6,
                label: '布尔'
            }],
            rules: {
                label: [
                    { required: true, message: '请输入字段编码', trigger: 'blur' }
                ],
                fieldName: [
                    { required: true, message: '请输入字段名称', trigger: 'blur' }
                ],
                fieldType: [
                    { required: true, message: '请选择字段类型', trigger: 'blur' }
                ],
            }
        }
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        pageId: {
            type: String,
            default: ''
        }
    },
    components: {
        EditPages,
        SetUrl
    },
    mounted() {
        this.dicFormEl = this.$refs.dicForm.$el
    },
    methods: {
        onSubmit() {
            this.$refs.dicForm.validate().then(() => {
                this.formline.pageId = this.pageId
                let opt = {
                    form: this.formline,
                    loading: {target: this.dicFormEl}
                }
                if(this.typeAdd) {
                    // 添加
                    pagesSetting.createParameter(opt).then(date => {
                        this.$emit('update', this.pageId)
                        this.formline = initParameter()
                        
                    })
                }else {
                    // 确认修改
                    pagesSetting.editParameters(opt).then(date => {
                        this.$emit('update', this.pageId)
                        this.formline = initParameter()
                        this.typeName = '添加'
                        this.typeAdd = true
                    })
                }
            })
        },
        // 编辑
        editRole(row) {
            this.formline = Object.assign(this.formline, row)
            this.typeName = '确认修改'
            this.typeAdd = false
        },
        deleteRole(row) {
            this.$confirm('确定要删除 ' + row.fieldName + ' 吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let opt = {
                    parameter: row,
                    loading: {target: this.dicFormEl}
                }
                pagesSetting.removeParameters(opt).then(date => {
                    this.$emit('update', this.pageId)
                })
            })
            
        },
        addDetial(row) {
            row.pageId = this.pageId
            this.formData = row
            this.$refs.editPages.show()
        },
        addUrl(row) {
            row.pageId = this.pageId
            this.formData = row
            this.$refs.setUrl.show()
        }
    }
}
</script>
<style lang='scss' scoped>

.a_form{
    .el-form-item{
        margin-left: 10px;
    }
    .padlefe{
        padding-left: 12px;
    }
}
</style>