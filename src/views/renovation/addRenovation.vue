<template>
    <div>
        <div id="0" class="condition-container">
            <el-card class="box-card">
                <div style="display: flex;margin-bottom: 10px;align-items: center">
                    <div style="font-size: 18px;margin-right: 20px">工程信息</div>
                    <el-button v-on:click="choose()" v-if="projectId ===undefined">选择项目</el-button>
                </div>
                <div style="height: 1px;background-color: #eaecf0;margin-bottom: 20px"></div>
                <div style="background-color: white">
                    <div style="display: flex;margin-bottom: 50px;margin-left: 20px">
                        <div style="width: 50%">
                            <div class="list">
                                <div class="text textName">工程名称：</div>
                                <div>{{projectName}}</div>
                            </div>
                            <div class="list">
                                <div class="text textName">联系电话：</div>
                                <div>{{phone}}</div>
                            </div>
                            <div class="list">
                                <div class="text textName">工程类别：</div>
                                <div>{{projectType}}</div>
                            </div>

                        </div>
                        <div>
                            <div class="list">
                                <div class="text textName">小区名称：</div>
                                <div>{{villageName}}</div>
                            </div>
                            <div class="list">
                                <div class="text textName">工程预算：</div>
                                <div>{{budget}}</div>
                            </div>
                            <div class="list">
                                <div class="text textName">详细地址：</div>
                                <div>{{address}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div id="1" class="condition-container">
            <el-card class="box-card" style="margin-top: 20px">
                <div style="display: flex;margin-bottom: 10px;align-items: center">
                    <div style="font-size: 18px;margin-right: 20px">装修信息</div>
                </div>
                <div style="height: 1px;background-color: #eaecf0;"></div>
                <div style="background-color: white;margin-left: 30px">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm"
                             :label-position="labelPosition" style="margin-top: 30px">
                        <div style="display: flex">
                            <div style="width: 50%">
                                <el-form-item label="开始时间" prop="beginTime">
                                    <el-date-picker type="date" style="width: 202px" placeholder="选择日期"
                                                    v-model="ruleForm.beginTime" clearable></el-date-picker>
                                </el-form-item>
                                <el-form-item label="总工期" prop="durationDays">
                                    <el-input v-model="ruleForm.durationDays" style="width: 202px" placeholder="请输入总工期"
                                              type="number" clearable></el-input>

                                </el-form-item>
                            </div>
                            <div>
                                <el-form-item label="施工方" prop="team">
                                    <el-input v-model="ruleForm.team" style="width: 202px"
                                              placeholder="请输入施工方" clearable></el-input>
                                </el-form-item>
                                <div style="display: flex;align-items: center;height: 75px">
                                    <div class="texts" style=" margin-top:0;margin-bottom: 0px;margin-right: 0">项目负责人
                                    </div>
                                    <div>
                                        <el-checkbox v-model="checked" @change="changeCheckbox"></el-checkbox>
                                    </div>
                                    <div style="margin-right: 10px;margin-left: 20px">项目添加人</div>

                                    <el-select
                                            v-model="managerName"
                                            multiple
                                            filterable
                                            remote
                                            reserve-keyword
                                            placeholder="请输入关键词"
                                            :remote-method="remoteMethod"
                                            :loading="loading"
                                            :disabled="disabled" clearable>
                                        <el-option
                                                v-for="item in managerList"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                    </el-form>
                </div>
            </el-card>
        </div>
        <div id="2" class="condition-container">
            <el-card class="box-card" style="margin-top: 20px">
                <div style="display: flex;margin-bottom: 10px;align-items: center">
                    <div style="font-size: 18px;margin-right: 20px">任务</div>
                    <el-button v-on:click="addTask()">添加任务</el-button>
                </div>
                <div style="height: 1px;background-color: #eaecf0;margin-bottom: 20px"></div>
                <div style="background-color: white">
                    <v-el-table :data="taskList" :columns="columns" :border="true"
                                :header-cell-style="{background:'#ffffff'}">
                        <template slot="action" slot-scope="scope">
                            <div style="display: flex;justify-content: center">
                                <el-button v-on:click="edit(scope.row)">编辑</el-button>
                                <el-button v-on:click="deleted(scope.row)">删除</el-button>
                            </div>
                        </template>
                    </v-el-table>
                </div>
            </el-card>
        </div>
        <div class="navigation">
            <ul>
                <li style="line-height: 40px" :class="activeClass == 0 ? 'active':''" @click="getActive(0)">工程信息</li>
                <li style="line-height: 40px" :class="activeClass == 1 ? 'active':''" @click="getActive(1)">装修信息</li>
                <li style="line-height: 40px" :class="activeClass == 2 ? 'active':''" @click="getActive(2)">任务信息</li>
            </ul>
        </div>
        <choose ref="chooseProject" @ProjectId="getProjectId"></choose>
        <addTask ref="addTask" @getTask="getTaskData"></addTask>

        <div class="display_flex"
             style="justify-content: flex-end;position: fixed;bottom: 0;right: 70px;z-index: 99999">
            <el-button v-on:click="add('ruleForm')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
            <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>
        </div>
    </div>
</template>

<script>
    import choose from './chooseProject'
    import addTask from './addTask'
    import serviceProjectApi from 'services/project/index'
    import serviceRenovationApi from 'services/renovation/index'
    import moment from 'moment'
    import Vue from "vue";
    import mixins from 'mixins/index'

    export default {
        name: "addRenovation",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {
            choose,
            addTask
        },
        data() {
            return {
                activeClass: 0,
                form: {},
                taskList: [],
                ruleForm: {

                    beginTime: '',
                    durationDays: "",
                    team: "",
                },
                rules: {
                    beginTime: [
                        {type: 'date', required: true, message: '请选择开始日期', trigger: 'change'}
                    ],
                    durationDays: [
                        {required: true, message: '请输入总工期', trigger: 'blur'}
                    ],
                    team: [
                        {required: true, message: '请输入施工方', trigger: 'blur'}
                    ]
                },
                labelPosition: "top",
                columns: [

                    {
                        label: '序号',
                        prop: 'sortIndex',


                    },
                    {
                        label: '任务名称',
                        prop: 'taskName',

                    },
                    {
                        label: '用料要求',
                        prop: 'request',

                    },
                    {
                        label: '任务描述',
                        prop: 'remark',

                    },
                    {
                        label: '操作',
                        prop: 'action',
                    },


                ],
                checked: true,
                disabled: true,
                projectId: "",
                address: "",
                budget: "",
                projectName: "",
                phone: "",
                projectType: "",
                villageName: "",
                // beginTime: "",
                // durationDays: "",
                // team: "",
                managerId: "",
                userName: "",
                managerName: "",
                managerList: []

            }
        },
        watch: {
            beginTime(val) {
                this.beginTime = moment(val).format("YYYY-MM-DD hh:mm:ss")

            },
            managerName(val) {

                if (val.length !== 0) {
                    this.getSearch(val);
                }

            }
        },
        created() {

            this.projectId = this.$route.query.projectId;
            if (this.projectId) {
                this.getProjectId(this.projectId)
            }

        },

        methods: {
            getSearch(text) {
                let option = {
                    data: {
                        key: text
                    }
                };
                serviceRenovationApi.search(option).then((data) => {

                }).catch(() => {
                    this.loading = false
                })
            },


            getActive(index) {
                this.activeClass = index
                let jump = document.querySelectorAll('.condition-container')
                jump[index].scrollIntoView({
                    block: 'start',// 上边框与视窗顶部平齐
                    behavior: 'smooth' // 平滑过渡
                })

            },
            choose() {
                this.$refs.chooseProject.show()
            },
            addTask() {

                this.$refs.addTask.show()
            },
            changeCheckbox(val) {
                if (val == false) {
                    this.disabled = false
                } else {
                    this.disabled = true
                }
            },
            getProjectId(id) {
                this.projectId = id;
                let option = {
                    data: {
                        id: id
                    }
                }
                serviceProjectApi.projectDetail(option).then((data) => {

                    this.projectName = data.name;
                    // this.projectSize = data.areaSize;
                    this.budget = data.budget;
                    this.phone = data.phone;
                    this.publisher = data.publisher;
                    this.projectType = data.projectType == 1 ? '家装' : data.projectType == 2 ? '工装' : '铺面';
                    this.address = data.address;
                    this.villageName = data.villageName;
                    // this.jobRequirement = data.requirement;
                    // this.iconid = data.converImg;
                    // this.projectIntroduce = data.description;

                }).catch(() => {
                    this.loading = false
                })
            },
            getTaskData(data) {
                if (data.title !== '编辑任务') {
                    this.taskList.push(data);
                } else {
                    let index = data.index;
                    Vue.set(this.taskList, index, data)
                }



            },
            add(formName) {
                this.$refs[formName].validate((valid) => {

                    let option = {
                        data: {
                            projectId: this.projectId,
                            beginTime: this.ruleForm.beginTime,
                            team: this.ruleForm.team,
                            durationDays: Number(this.ruleForm.durationDays),
                            taskList: this.taskList

                        }
                    }
                    serviceRenovationApi.addRenovation(option).then((data) => {
                        if (this.projectId) {
                            this.$router.push('/renovation/list')
                        } else {
                            this.$router.go(-1);
                        }
                    }).catch(() => {
                        this.loading = false
                    })
                });
                // if (this.beginTime == "") {
                //     alert("请选择开始时间");
                //     return
                // }
                // if (this.team == "") {
                //     alert("请输入施工方");
                //     return
                // }
                //
                // if (this.projectId == "" || this.projectId == undefined) {
                //     alert("请在工程信息选择项目");
                //     return
                // }


            },
            goBack() {
                if (this.projectId) {
                    this.$router.push('/renovation/list')
                } else {
                    this.$router.go(-1);
                }

            },
            remoteMethod(query) {
                alert(query)
            },
            edit(row) {
                console.log(row)
                this.$refs.addTask.show(row)
            },
            deleted(row) {

                this.taskList = this.taskList.filter((item) => {
                    return item.index != row.index
                });
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/userCss/vipUser.css";
    @import "../../assets/css/detail/allDetail.css";

    .navigation {
        background-color: white;
        width: 100px;
        text-align: center;
        border-radius: 10px;
        position: fixed;
        top: 400px;
        right: 80px;
        box-shadow: 2px 2px 15px #e8e8e8;
        cursor: pointer;
    }

    .active {
        color: #5B7FF1;
    }

    .texts {
        margin-right: 15px;
        width: 90px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 20px;
    }

    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }

    /deep/ .el-form--label-top .el-form-item__label {

        font-weight: 600;
    }
</style>