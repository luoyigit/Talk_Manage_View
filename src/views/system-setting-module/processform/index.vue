<template>
    <div class="staff-manage">
        <layout-search-bar @search="search" :condition-string="conditionString">
            <el-button slot="right" type="primary" icon="el-icon-circle-plus-outline" @click="addService" >添加表单</el-button>
            <pms-condition-search slot="right" search-code="rolelist" @search="search"  @addQuickCondition="addQuickCondition"></pms-condition-search>
        </layout-search-bar>
        
        <el-card v-loading="loading" :element-loading-text="loadingText" :element-loading-spinner="loadingSpinner">
            <v-el-table :data="servicesList" :columns="columns">
                <template slot="action" slot-scope="scope">
                      <el-button  type="primary" icon="el-icon-edit" title="编辑" @click="edit(scope.row)"> </el-button>
                      <el-button type="warning" icon="el-icon-menu" title="设置表单字段" @click="editField(scope.row)"></el-button>
                </template>
             
            </v-el-table>
            <!-- <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex" @current-change="pageChange"> </v-el-pagination> -->
        </el-card>
         <addForm ref="add" :form ="formData" @search="search"> </addForm>
         <addFormField ref="addField" :form="formFieldData" > </addFormField>
    </div>
</template>

<script>
import serviceApi from 'services/FormService/index'
import addForm from './add'
import addFormField from './addField'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: { addForm , addFormField},
    data() {
        return {
            servicesList: [],
            formData: {},
            formFieldData: {},
            columns: [
                {
                    type: 'index',
                    attrs: { width: '40' },
                },
                {
                    label: '表单名称',
                    prop: 'name',
                },
                {
                    label: '审批路由',
                    prop: 'processUrl',
                },
                {
                    label: '备注',
                    prop: 'remark',
                },
                {
                    label: '操作',
                    prop: 'action',
                    attrs: { width: '200'}
                }
           
            ],
        }
    },
    methods: {
        editField(row){
        
             this.$refs.addField.show(row.id)
        },
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
            serviceApi.getFormList(option).then((data) => {
                    this.servicesList = data
                    this.loading = false
                })
                .catch(() => {
                    this.loading = false
                })
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
