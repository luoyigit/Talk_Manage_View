<template>
    <div>
        <el-card class="box-card" header="基础信息">

            <div style="background-color: white;">
                <div style="display: flex;margin-bottom: 50px;margin-left: 20px">
                    <div style="width: 50%">
                        <div class="list">
                            <div class="text textName">昵称：</div>
                            <div>{{nickName}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">手机号：</div>
                            <div>{{iphone}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">注册时间：</div>
                            <div>{{registerTime}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">关注数量：</div>
                            <div>{{fansCount}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">获赞数量：</div>
                            <div>{{supportCount}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">项目数量：</div>
                            <div>{{projectCount}}</div>
                        </div>
                        <div style=" display: flex;">
                            <div class="text textName" style="margin-top: 20px">头像：</div>
                            <div><img :src="imgUrl+iconid" style="width: 100px;height: 100px"></div>
                        </div>
                    </div>
                    <div>
                        <div class="list">
                            <div class="text textName">真名：</div>
                            <div>{{realName}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">邮箱：</div>
                            <div>{{email}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">个性签名：</div>
                            <div>{{autograph}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">粉丝数量：</div>
                            <div>{{fansCount}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName">收藏数量：</div>
                            <div>{{collectionCount}}</div>
                        </div>
                        <div class="list">
                            <div class="text textName" style="margin-top: 20px">简介：</div>
                            <div class="introduce">
                                <!--<el-input type="textarea" :rows="8" v-model="introduce"></el-input>--><div style="margin: 10px">{{introduce}}</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="display_flex" style="justify-content: flex-end;margin-right: 70px;padding-top: 30px">

                    <el-button v-on:click="goBack()">返回</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import http from 'utils/http'
    import serviceApi from 'services/vip/index'
    import Enum from 'utils/systemEnum'
    import moment from 'moment'
    export default {
        name: "userDetail",
        data() {
            return {
                userId: "",
                imgUrl: http.downfileurl + '?fileid=',
                introduce: "",
                nickName:"",
                iphone:"",
                iconid:"",
                realName:"",
                autograph:"",
                projectCount:"",
                fansCount:"",
                email:"",
                registerTime:"",
                collectionCount:"",
                focusCount:"",
                supportCount:""
            }
        },
        created() {
            this.userId = this.$route.query.userId;
            this.getUserDetail()
        },
        methods: {
            goBack() {
                this.$router.go(-1);

            },
            getUserDetail() {
                let option = {
                    data: {
                        id: this.userId
                    }
                }
                serviceApi.editUserDetail(option).then((data) => {

                    console.log(this.imgUrl + data.avatar)
                    this.realName = data.realName;
                    this.nickName = data.nickName;
                    this.iphone = data.phone
                    this.iconid = data.avatar;
                    this.projectCount = data.projectCount;
                    this.fansCount = data.fansCount;
                    this.email = data.email;
                    this.registerTime = moment(data.registerTime).format("YYYY-MM-DD hh:mm:ss");
                    this.collectionCount = data.collectionCount;
                    this.focusCount = data.focusCount;
                    this.supportCount = data.supportCount;
                    // this.sex = data.gender == 0 ? '男' : '女';

                    // this.provincesId = data.provinceId,
                    //     this.provincesName = data.province,
                    //     this.cityId = data.cityId,
                    //     this.cityName = data.city,
                    //     this.longitude = data.longitude
                    // this.latitude = data.latitude
                    this.introduce = data.introduction;
                    //
                    this.autograph = data.title;
                    // this.countriesName = data.country;
                    // this.countriesId = data.countryId

                }).catch(() => {
                    this.loading = false
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/userCss/vipUser.css";
    @import "../../assets/css/detail/allDetail.css";


</style>