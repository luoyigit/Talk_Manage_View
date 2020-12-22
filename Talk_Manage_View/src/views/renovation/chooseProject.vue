<template>
    <pms-dialog-frame
            ref="frame"
            :title="title"
            width="500px"
            :show-close="false"
            @open="init">
        <!--<el-form-->
                <!--:model="form"-->
                <!--status-icon-->
                <!--:rules="formRules"-->
                <!--ref="form"-->
                <!--label-width="120px">-->

            <div style="display: flex;align-items: center;margin-bottom: 20px">

                <div style="padding-right: 10px">项目名称</div>
                <div style="padding-right: 10px">
                    <el-input style="width: 130px" placeholder="请输入项目名称" v-model="projectName" clearable></el-input>
                </div>
                <div style="padding-right: 10px">添加人</div>
                <div style="padding-right: 10px">
                    <el-input style="width: 130px" placeholder="请输入添加人" v-model="publisher" clearable></el-input>
                </div>
                <el-button v-on:click="search()">搜索</el-button>

            </div>


            <v-el-table :data="projectList" :columns="columns" :border="true"
                        :header-cell-style="{background:'#ffffff'}">
                <div slot="projectType" slot-scope="scope">
                    {{ scope.row.projectType === 1 ? '家装' : scope.row.projectType === 2 ? '工装' :'铺面'}}
                </div>
                <div slot="isChoose" slot-scope="scope">
                        <el-radio :label="scope.row.id" v-model="radio" @change="chooseproject">{{text}}</el-radio>
                </div>
            </v-el-table>


            <!--</v-el-form>-->
        <!--</el-form>-->
        <v-el-pagination :total="totalCount" :page-size="pageSize" :current-page="pageIndex"
                         @current-change="pageChange"></v-el-pagination>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
    // import serviceApi from 'services/vip/index'
    import serviceApi from 'services/project/index'
    import mixins from 'mixins/index'
    export default {
        name: "chooseProject",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                form: {},
                projectList: [],
                columns: [
                    {
                        label: '',
                        prop: 'isChoose',

                    },
                    {
                        label: '项目名称',
                        prop: 'name',

                    },
                    {
                        label: '小区名称',
                        prop: 'villageName',

                    },
                    {
                        label: '装修类型',
                        prop: 'projectType',

                    },
                    {
                        label: '添加人',
                        prop: 'publisher',
                    },


                ],
                title: '选择工程',
                chooseData: "",
                hotSize: "",
                text:"",
                radio:"",
                projectId:"",
                publisher:"",
                projectName:"",

            }

        },
        created() {
            this.getList()
        },
        methods: {
            hide() {
                this.$refs.frame.hide()
            },
            show(row) {
                if (row) {
                    this.form = Object.assign({}, this.form, row)
                    //    Object.assign(this.form,row) //这样并不会刷新页面
                    this.title = "编辑服务";
                    console.log(row)
                    this.hotSize = row.hotLevel;
                    this.chooseData = row.isRecommend;

                } else {

                    this.form = {}
                    this.title = "选择工程"
                }

                this.$refs.frame.show()
            },
            init(row) {

            },
            confirm() {
                if (this.radio !== ''){
                    this.hide();
                    this.$emit("ProjectId",this.projectId)
                }

            },
            search() {
                let option = {
                    pageIndex: 1,
                    pageSize: this.pageSize,
                    name:this.projectName,
                    addUser:this.publisher
                }
                // this.setQuickObject(option);
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
                serviceApi.getlist(option).then((data) => {
                    this.projectList = data.dataList
                    this.pageIndex = data.pageIndex
                    this.totalCount = data.totalCount
                    this.loading = false
                })
                    .catch(() => {
                        this.loading = false
                    })
            },
            chooseproject(val){
               this.projectId = val
            },
            pageChange(page) {
                this.getList({
                    pageIndex: page,
                    pageSize: this.pageSize,
                    // key: this.keyword
                })
            },
        }
    }
</script>

<style scoped>


</style>