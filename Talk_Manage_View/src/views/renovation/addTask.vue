<template>
    <pms-dialog-frame
            ref="frame"
            :title="title"
            width="500px"
            :show-close="false"
            @open="init">
        <div style="display: flex">
            <el-form
                    :model="form"
                    status-icon
                    :rules="formRules"
                    ref="form"
                    :label-position="labelPosition"
                    label-width="120px">
                <v-el-form :items="items" :form-data="form">
                    <template slot="taskName">
                        <div style="display: flex">
                            <el-select v-model="form.taskName" style="width: 30px" placeholder="" clearable>
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <el-input v-model="form.taskName" style="width: 170px" clearable></el-input>
                        </div>
                    </template>
                    <template slot="sortIndex">
                        <el-input-number v-model="form.sortIndex" @change="handleChange" :min="0"></el-input-number>
                    </template>
                    <template slot="request">
                        <el-input type="textarea" :rows="8" v-model="form.request" clearable></el-input>
                    </template>
                </v-el-form>
            </el-form>
            <el-form
                    :model="form"
                    status-icon
                    :rules="formRules"
                    ref="form"
                    :label-position="labelPosition"
                    label-width="120px"
                    style="margin-left: 30px">
                <v-el-form :items="itemsTwo" :form-data="form">

                    <template slot="durationDays">
                        <el-input type="number" v-model="form.durationDays" clearable></el-input>

                    </template>
                    <template slot="progress">
                        <!--<el-progress :percentage="Progress" style="line-height: 33px"></el-progress>-->
                        <!--<progress class="c-progress" :percent="Progress"  />-->
                        <!--<CProgress class="c-progress" :percent="70" @percentChange="onPercentChange" />-->
                        <CProgress class="c-progress" :percent="form.progress" @percentChange="onPercentChange"></CProgress>
                    </template>
                    <template slot="remark">
                        <el-input type="textarea" :rows="8" v-model="form.remark" clearable></el-input>

                    </template>
                </v-el-form>
            </el-form>
        </div>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm('form')">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
    import serviceApi from 'services/vip/index'
    import CProgress from "components/progress/progress";
    import mixins from 'mixins/index'

    export default {
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        name: "addTask",
        components: {
            CProgress
        },
        data() {
            return {
                form: {},
                title: '添加任务',
                chooseData: "",
                hotSize: "",
                labelPosition: 'top',
                requirementText: "",
                taskDescriptionText: "",
                estimateTimeText: "",
                taskName: "",
                options: [],
                sortIndex: "",
                task: [],
                progress: 0,
                index: 0,
                formRules: {
                    taskName: [
                        {
                            required: true, message: '请输入任务名称', trigger: 'blur'
                        }
                        ],
                    remark: [{required: true, message: '请输入任务描述', trigger: 'blur'}],
                    request: [{required: true, message: '请输入材料要求', trigger: 'blur'}],
                    durationDays: [{required: true, message: '请输入预计工期', trigger: 'blur'}]
                }
            }

        },
        computed: {
            items() {
                return [
                    {
                        label: '任务名称',
                        prop: 'taskName',
                        component: {
                            name: 'el-input',

                        },

                    },
                    {
                        label: '排序',
                        prop: 'sortIndex',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '材料要求',
                        prop: 'request',
                        component: {
                            name: 'el-input',

                        },


                    },


                ]
            },
            itemsTwo() {
                return [
                    {
                        label: '预计工期',
                        prop: 'durationDays',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '进度',
                        prop: 'progress',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '任务描述',
                        prop: 'remark',
                        component: {
                            name: 'el-input'
                        }
                    },


                ]
            }
        },

        methods: {
            onPercentChange(per) {
                this.form.progress = per
            },
            handleChange(value) {
                this.num = value
            },
            hide() {
                this.$refs.frame.hide()
            },
            show(row) {

                if (row) {
                    this.form = Object.assign({}, this.form, row)
                    console.log(this.form)
                    //    Object.assign(this.form,row) //这样并不会刷新页面
                    this.title = "编辑任务";
                    // this.taskName = row.taskName;
                    // this.requirementText = row.request;
                    // this.progress = row.progress;
                    // this.sortIndex = row.sortIndex
                    // this.estimateTimeText = row.durationDays;
                    // this.taskDescriptionText = row.remark;


                } else {
                    // this.taskName = "";
                    // this.requirementText = "";
                    // this.taskDescriptionText = "";
                    // this.estimateTimeText = ""
                    // this.sortIndex = 1;
                    // this.progress = 0;
                    this.form = {};
                    this.form.sortIndex = 0
                    this.title = "添加任务"
                }

                this.$refs.frame.show()
            },
            init(row) {

            },
            confirm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.task = {
                            taskName: this.form.taskName,
                            request: this.form.request,
                            remark: this.form.remark,
                            sortIndex: this.form.sortIndex,
                            progress: this.form.progress == undefined?0:this.form.progress,
                            durationDays: this.form.durationDays,
                            title: this.title,
                            index: this.form.index !== undefined?this.form.index:this.index++,
                            id:this.form.id
                        }
                        this.hide()
                        this.$emit("getTask", this.task)
                    }



                })
            },

        }
    }
</script>

<style scoped lang="scss">

/deep/.el-icon-circle-check:before {
    content: none;
}
</style>