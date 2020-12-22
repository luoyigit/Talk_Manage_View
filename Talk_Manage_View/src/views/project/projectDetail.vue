<template>
    <div>
        <el-card class="box-card" header="基础信息">

            <div style="background-color: white;">
                <div style="display: flex;margin-bottom: 50px;margin-left: 20px">
                    <div style="width: 50%">
                        <div class="list">
                            <div class="text textName">工程名称：</div>
                            <div>{{projectName}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">工程面积：</div>
                            <div>{{projectSize}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">联系电话：</div>
                            <div>{{phone}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">小区名称：</div>
                            <div>{{villageName}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">工作要求：</div>
                            <div>{{jobRequirement}}</div>
                        </div>

                        <div style=" display: flex;">
                            <div class="text textName" style="margin-top: 20px">封面图片：</div>
                            <div><img :src="imgUrl+iconid" style="width: 100px;height: 100px"></div>
                        </div>
                    </div>
                    <div>
                        <div class="list">
                            <div class="text textName">工程类别：</div>
                            <div>{{projectType}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">工程预算：</div>
                            <div>{{budget}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">详细地址：</div>
                            <div>{{address}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">发布人：</div>
                            <div>{{publisher}}</div>
                        </div>

                        <div class="list">
                            <div class="text textName" style="margin-top: 20px">工程描述：</div>
                            <div class="introduce">
                                <!--<el-input type="textarea" :rows="8" v-model="introduce"></el-input>-->
                                <div style="margin: 10px">{{projectIntroduce}}</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="display_flex" style="justify-content: flex-end;margin-right: 70px;padding-top: 30px">
                    <!--<el-button v-on:click="determine()">确定</el-button>-->
                    <el-button v-on:click="goBack()">取消</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import http from 'utils/http'
    import serviceProjectApi from 'services/project/index'
    import mixins from 'mixins/index'
    export default {
        name: "projectDetail",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                projectName: "",
                projectSize: "",
                phone: "",
                jobRequirement: "",
                imgUrl: http.downfileurl + '?fileid=',
                iconid: "",
                projectType: "",
                budget: "",
                address: "",
                publisher: "",
                projectIntroduce: "",
                projectId: "",
                villageName: ""
            }
        },
        created() {
            this.projectId = this.$route.query.projectId;
            this.detailList();
        },
        methods: {
            detailList() {
                let option = {
                    data: {
                        id: this.projectId
                    }
                }
                serviceProjectApi.projectDetail(option).then((data) => {
                    this.projectName = data.name;
                    this.projectSize = data.areaSize;
                    this.budget = data.budget;
                    this.phone = data.phone;
                    this.publisher = data.publisher;
                    this.projectType = data.projectType == 1 ? '家装' : data.projectType == 2 ? '工装' : '铺面';
                    this.address = data.address;
                    this.villageName = data.villageName;
                    this.jobRequirement = data.requirement;
                    this.iconid = data.converImg;
                    this.projectIntroduce = data.description;

                }).catch(() => {
                    this.loading = false
                })

            },
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/userCss/vipUser.css";
    @import "../../assets/css/detail/allDetail.css";
</style>