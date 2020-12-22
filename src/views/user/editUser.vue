<template>
    <div>
        <el-card class="box-card" header="会员编辑">

            <div style="background-color: white">

                <div v-show="isShow">
                    <vue-baidu-map v-on:mapData="mapData" :isShow="isShow"></vue-baidu-map>
                </div>
                <div>


                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="display_flex">
                            <div style=" width: 30%">
                                <el-form-item label="真名" prop="realName">
                                    <el-input v-model="ruleForm.realName" placeholder="请输入真名" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="昵称" prop="nickName">
                                    <el-input v-model="ruleForm.nickName" placeholder="请输入昵称" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="个性签名" prop="autograph">
                                    <el-input v-model="ruleForm.autograph" placeholder="请输入个性签名" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="出生日期" prop="birthday">
                                    <el-date-picker
                                            v-model="ruleForm.birthday"
                                            value-forma="yyyy-MM-dd"
                                            type="date"
                                            placeholder="选择出生日期" clearable>
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="性别" prop="sex">
                                    <el-radio-group v-model="ruleForm.sex">
                                        <el-radio :label="0">男</el-radio>
                                        <el-radio :label="1">女</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="头像" prop="headerImg">
                                    <el-upload
                                            class="upload-demo"
                                            :headers="headers"
                                            :action="fileUrl"
                                            :multiple="false"
                                            :file-list="fileList"
                                            :on-success="imgSuccess"
                                            :on-remove="imgRemove"
                                            :before-upload="beforeupload"
                                            :data="{fileType: filetype,}"
                                    >
                                        <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                </el-form-item>
                                <div style="margin-left: 60px">
                                    <img v-if="imageUrl" :src="imageUrl" style="width: 110px;">
                                    <img v-if="!imageUrl" :src="imgUrl+iconid" style="width: 110px;">
                                </div>
                            </div>
                            <div style=" width: 50%">
                                <el-form-item label="联系电话" prop="iphone">
                                    <el-input v-model="ruleForm.iphone" placeholder="请输入联系电话" type="number"
                                              Oninput="if(value.length>11)value=value.slice(0,11)" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="经纬度" prop="longitude">
                                    <div style="display: flex;align-items: center">
                                        <div>
                                            <el-input v-model="ruleForm.longitude" placeholder="请输入经度" clearable></el-input>
                                        </div>
                                        <div style="width: 30px;height: 2px;background-color: darkgray;margin-left: 10px;margin-right: 10px;"></div>
                                        <div>
                                            <el-input v-model="ruleForm.latitude" placeholder="请输入纬度" clearable></el-input>
                                        </div>
                                        <div style="margin-left: 10px;color: dodgerblue" v-on:click="getMap()">地图获取?
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="常住地" prop="cityName">
                                    <div class="display_flex" style="align-items: center;">
                                        <div style="margin-right: 20px"> 国家</div>
                                        <div>
                                            <el-select placeholder="请选择国家" v-model="ruleForm.countriesName"
                                                       @change="getCountries" clearable>
                                                <el-option
                                                        v-for="item in countries"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id+','+item.name"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div style="margin-right: 20px;margin-left: 20px"> 省</div>
                                        <div>
                                            <el-select placeholder="请选择省" v-model="ruleForm.provincesName"
                                                       @change="getProvincesId" clearable>
                                                <el-option
                                                        v-for="item in provinces"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id+','+item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div style="margin-right: 20px;margin-left: 20px"> 市</div>
                                        <div>
                                            <el-select placeholder="请选择市" v-model="ruleForm.cityName" @change="getCity" clearable>
                                                <el-option
                                                        v-for="item in city"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id+','+item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="个人简介" prop="introduce">
                                    <el-input type="textarea" :rows="8" v-model="ruleForm.introduce" clearable></el-input>
                                </el-form-item>
                            </div>

                        </div>
                    </el-form>
                    <div class="display_flex" style="justify-content: flex-end;margin-right: 70px;padding-top: 30px">
                        <el-button v-on:click="edit('ruleForm')">提交</el-button>
                        <el-button v-on:click="goBack()">返回</el-button>
                    </div>


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
        name: "editUser",
        data() {
            return {
                fileUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                fileList: [],
                iconid: "",
                countries: [],
                provinces: [],
                city: [],
                countriesId: "",
                provincesId: "",
                cityId: "",
                imageUrl: "",
                isShow: false,
                center: {lng: 0, lat: 0},
                zoom: 15,
                filetype: Enum.fileType.vipUser_img,
                userId: "",
                imgUrl: http.downfileurl + '?fileid=',
                ruleForm: {
                    realName: "",
                    nickName: "",
                    autograph: "",
                    birthday: "",
                    introduce: "",
                    sex: 0,
                    iphone: "",
                    longitude: "",
                    latitude: "",
                    skillsName: [],
                    countriesName: "",
                    provincesName: "",
                    cityName: "",
                },
                rules: {
                    realName: [
                        {required: true, message: '请填写真名', trigger: 'blur'}
                    ],
                    nickName: [
                        {required: true, message: '请填写昵称', trigger: 'blur'}
                    ],
                    autograph: [
                        {required: true, message: '请填写个性签名', trigger: 'blur'}
                    ],
                    birthday: [
                        {required: true, message: '请填写出生日期', trigger: 'blur'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    iphone: [
                        {required: true, message: '请填写联系电话', trigger: 'blur'}
                    ],
                    longitude: [
                        {required: true, message: '请填写经纬度', trigger: 'blur'}
                    ],
                    cityName: [
                        {required: true, message: '请填写国家', trigger: 'blur'}
                    ],
                    introduce: [
                        {required: true, message: '请填写个人简介', trigger: 'blur'}
                    ],

                }
            }
        },
        watch: {
            iphone(val) {
                this.ruleForm.iphone = val.replace(/[^1-9]/g, '');

            }
        },
        created() {
            this.userId = this.$route.query.userId
            this.getCountriesList();
            this.getUserDetail();
        },
        methods: {
            getUserDetail() {
                let option = {
                    data: {
                        id: this.userId
                    }
                }
                serviceApi.editUserDetail(option).then((data) => {
                    let birthDate = new Date(data.birthDate).getTime()
                    console.log(this.imgUrl + data.avatar)
                    this.ruleForm.realName = data.realName;
                    this.ruleForm.nickName = data.nickName;
                    this.ruleForm.iphone = data.phone
                    this.ruleForm.sex = data.gender;
                    this.iconid = data.avatar
                    this.provincesId = data.provinceId,
                        this.ruleForm.provincesName = data.province,
                        this.cityId = data.cityId,
                        this.ruleForm.cityName = data.city,
                        this.ruleForm.longitude = data.longitude
                    this.ruleForm.latitude = data.latitude
                    this.ruleForm.introduce = data.introduction;
                    this.ruleForm.birthday = moment(birthDate).format("YYYY-MM-DD");
                    this.ruleForm.autograph = data.title;
                    this.ruleForm.countriesName = data.country;
                    this.countriesId = data.countryId
                    this.getProvinceList();
                    this.getCitylist();
                }).catch(() => {
                    this.loading = false
                })
            },


            beforeupload(file) {
                console.log(file)
            },
            imgSuccess(response, file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.fileList = []
                this.fileList.push(file)
                this.iconid = response.data

            },
            imgRemove(file, fileList) {

                this.fileList = []
                this.iconid = ''
                //    const index = this.fileList.findIndex(d => d.fid === data.fid);
                //    children.splice(index, 1);
            },

            getCountriesList() {

                serviceApi.chooseCountries({}).then((data) => {
                    this.countries = data;

                }).catch(() => {
                    this.loading = false
                })

            },
            getCountries(countriesId) {

                let countries = countriesId.split(",")
                this.ruleForm.countriesName = countries[1];
                this.countriesId = countries[0];

                this.getProvinceList();
            },
            getProvinceList() {
                let option = {
                    data: {
                        countryid: this.countriesId
                    }
                }
                serviceApi.chooseProvince(option).then((data) => {
                    this.provinces = data
                }).catch(() => {
                    this.loading = false
                })
            },
            getProvincesId(provincesId) {
                let provinces = provincesId.split(",")
                this.provincesId = provinces[0];
                this.ruleForm.provincesName = provinces[1];
                this.getCitylist();
            },
            getCity(cityId) {
                let city = cityId.split(",");

                this.cityId = city[0];
                this.ruleForm.cityName = city[1];
            },
            getCitylist() {
                let option = {
                    data: {
                        provinceId: this.provincesId
                    }
                }
                serviceApi.chooseCity(option).then((data) => {
                    this.city = data
                }).catch(() => {
                    this.loading = false
                })
            },
            edit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!(/^1[34578]\d{9}$/.test(this.ruleForm.iphone))) {
                            alert("电话号码格式错误");
                            return;
                        }
                        let option = {
                            data: {
                                realName: this.ruleForm.realName,
                                nickName: this.ruleForm.nickName,
                                phone: this.ruleForm.iphone,
                                gender: this.ruleForm.sex,
                                avatar: this.iconid,
                                provinceId: this.provincesId,
                                province: this.ruleForm.provincesName,
                                cityId: this.cityId,
                                city: this.ruleForm.cityName,
                                longitude: this.ruleForm.longitude,
                                latitude: this.ruleForm.latitude,
                                introduce: this.ruleForm.introduce,
                                birthDate: this.ruleForm.birthday,
                                title: this.ruleForm.autograph,
                                country: this.ruleForm.countriesName,
                                countryId: this.countriesId,
                                id: this.userId

                            }
                        }
                        serviceApi.editUser(option).then((data) => {
                            this.$router.go(-1);
                        }).catch(() => {
                            this.loading = false
                        })
                    }
                    })
            },
            goBack() {
                this.$router.go(-1);

            },
            getMap() {

                this.isShow = true

            },
            mapData(data) {
                this.isShow = data.iSShow;
                this.ruleForm.longitude = data.lng;
                this.ruleForm.latitude = data.lat;

            }

        }
    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/userCss/vipUser.css";
    /deep/ .el-input--small .el-input__inner {
        width: 202px;
    }
    /deep/.el-input {
        width: 202px;
    }
</style>