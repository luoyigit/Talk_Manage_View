<!--  -->
<template>
  <div>
    <el-dialog 
        title="字段明细" 
        :visible.sync="showDialog"
        width="800px">
        <el-form  ref="form" :model="formData" :inline="true" label-width="100px" :rules="rules">
            <v-el-form :items="items" :form-data="formData">
                <el-button slot="surePage" type="primary" @click="surePage">{{btuName}}</el-button>
            </v-el-form>
        </el-form>
        <el-table
            class="r_Table"
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            :element-loading-text="loadingText"
            :element-loading-spinner="loadingSpinner"
            width="200">
            <el-table-column
                prop="enumText"
                label="标签"
                min-width="300">
            </el-table-column>
            <el-table-column
                prop="valEnum"
                label="值"
                width="200">
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
                        type="danger" 
                        icon="el-icon-delete" 
                        circle
                        title="删除"
                        @click='deleteRole(scope.row)'></el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
import pagesSetting from 'services/pages-setting/index'
import mixins from 'mixins/index'
import { truncate } from 'fs';
export default {
    mixins: [mixins.dialogMixin, mixins.loadingMixin],
    data() {
        return {
            formLabelWidth: '60px',
            formData: {},
            OldData: {},
            btuName: '添加',
            rules: {
                enumText: [{ required: true, message: '请填写标签', trigger: 'blur' }],
                valEnum: [{ required: true, message: '请填写值', trigger: 'blur' }],
            },
        };
    },
    props: {
        tableData: {
            type: Array,
            default: () => []
        },
        allData: {
            type: Object,
            default: null
        }
    },
    computed: {
        items() {
            return [
                {
                    label: '标签：',
                    prop: 'enumText',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth,
                        },
                    },
                },
                {
                    label: '值：',
                    prop: 'valEnum',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth
                        },
                    },
                },
                {
                    prop: 'surePage',
                }
            ]
        }
    },
    methods: {
        show() {
            this.showDialog = true
        },
        surePage() {
            this.$refs.form.validate().then(() => {
                if(this.btuName === '添加') {
                    this.allData.enumDetals.push(this.formData)
                    this.getData()
                    this.formData = {}
                }else if(this.btuName === '确认修改') {
                    this.allData.enumDetals.forEach((item, index) => {
                        if(item.valEnum === this.OldData.valEnum && item.enumText === this.OldData.enumText) {
                            this.allData.enumDetals.splice(index, 1, this.formData)
                        }
                    })
                    this.getData()
                    this.formData = this.OldData = {}
                    this.btuName = '添加'
                }
            })
        },
        getData() {
            let opt = {
                form: this.allData,
            }
            this.loading = true
            pagesSetting.editParameters(opt).then(date => {
                this.loading = false
            }).catch(() => {
                this.loading = true
            })
        },
        editRole(row) {
            this.formData = row
            this.OldData = row
            this.btuName = '确认修改'
        },
        deleteRole(row) {
            this.allData.enumDetals.forEach((item, index) => {
                if(item.valEnum === row.valEnum && item.enumText === row.enumText) {
                    this.allData.enumDetals.splice(index, 1)
                }
            });
            this.getData()
        }
    }
};
</script>
<style lang='scss' scoped>
</style>