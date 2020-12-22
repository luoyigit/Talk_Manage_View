  <template>
    <div>
        <el-form ref="form" :rules="rules" :inline="true" :label-position='labelPosition' :model="formline">
            <v-el-form :items="items" :form-data="formline">
                <el-button slot="typeName" type="primary" @click="onSubmit">{{typeName}}</el-button>
            </v-el-form>
        </el-form>
        <v-el-table :data="tableData" :columns="columns" ref="systemEnumEl">
            <template slot="action" slot-scope="scope">
                <el-button 
                type="primary" 
                icon="el-icon-edit" 
                circle
                title="编辑"
                @click="editRole(scope.row)"></el-button>
            <el-button 
                type="danger" 
                icon="el-icon-delete" 
                circle
                title="删除"
                @click='deleteRole(scope.row)'></el-button>
            </template>
        </v-el-table>
    </div>
  </template>

<script>
import systemEnumApi from 'services/systemEnumItem/index'
import {initBaseData} from 'viewModel/dictionary'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin],
    data() {
        var validateName = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入名称'));
            } else {
                callback();
            }
        }
        var validatVal = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入值'));
            } else {
                callback();
            }
        }
        var sortIndexVal = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入排序号'));
            } else {
                callback();
            }
        }
        return {
            formline: initBaseData(),
            labelPosition: 'lefe',
            typeName: '添加',
            typeAdd: true,
            rules: {
                name: [
                    { required: true, validator: validateName, trigger: 'blur' }
                ],
                val: [
                    { required: true, validator: validatVal, trigger: 'blur' }
                ],
                sortIndex: [
                    { required: true, validator: sortIndexVal, trigger: 'blur' }
                ]
            },
            columns: [
                {
                    type: 'index',
                    attrs: {width: '40'}
                },
                {
                    label: '名称',
                    prop: 'name'
                },
                {
                    label: '值',
                    prop: 'val'
                },
                {
                    label: '排序号',
                    prop: 'sortIndex'
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: {
                        width: '160'
                    }
                }
            ],
        }
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        tabCode: {
            type: String,
            default: ''
        }
    },
    computed: {
        items() {
            return [
                {
                    label: '名称：',
                    prop: 'name',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        },
                    },
                },
                {
                    label: '值：',
                    prop: 'val',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        },
                    },
                },
                {
                    label: '排序号：',
                    prop: 'sortIndex',
                    component: {
                        name: 'el-input',
                        data: {
                            class: 'fixed-wrap'
                        },
                    },
                },
                {
                    prop: 'typeName',
                },
            ]
        }
    },
    mounted() {
        this.systemEnumEl = this.$refs.systemEnumEl.$el
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate().then(() => {
                let opt = {
                    form: this.formline,
                    loading: {target: this.systemEnumEl}
                }
                this.formline.code = this.tabCode
                if(this.typeAdd) {
                    // 添加
                    systemEnumApi.createTab(opt).then(date => {
                        this.$emit('update', this.tabCode)
                        this.formline = initBaseData()
                    })
                }else {
                    // 确认修改
                    systemEnumApi.editTab(opt).then(date => {
                        this.formline = initBaseData()
                        this.$emit('update', this.tabCode)
                    })
                }
            })
            
        },
        // 编辑
        editRole(row) {
            this.formline = Object.assign({}, this.formline, row)
            this.typeName = '确认修改'
            this.typeAdd = false
        },
        deleteRole(row) {
            let opt = {
                page: row,
                loading: {target: this.systemEnumEl}
            }
            this.$confirm('确定要删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                systemEnumApi.removeDic(opt).then(date => {
                    this.$emit('update', this.tabCode)
                })
            }).catch(() => {
                return
            })
            
        }
    }
}
</script>
<style lang='scss' scoped>

</style>