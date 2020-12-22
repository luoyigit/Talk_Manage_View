<template>
    <div>
        <el-card class="box-card" header="工程编辑">

            <div style="background-color: white">

                <div v-show="isShow">
                    <vue-baidu-map v-on:mapData="mapData" :isShow="isShow"></vue-baidu-map>
                </div>
                <div>

                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="display_flex">
                            <div style=" width: 30%">
                                <el-form-item label="工程名称" prop="projectName">
                                    <el-input v-model="ruleForm.projectName" placeholder="请输入工程名称"
                                              style=" width: 202px;" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="工程面积" prop="areaSize">
                                    <el-input v-model="ruleForm.areaSize" placeholder="请输入工程面积"
                                              style="width: 202px;" type="number" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="联系电话" prop="phone">
                                    <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"
                                              Oninput="if(value.length>11)value=value.slice(0,11)"
                                              type="tel" style=" width: 202px;" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="小区名字" prop="villageName">
                                    <el-input v-model="ruleForm.villageName" placeholder="请输入小区名字"
                                              style=" width: 202px;" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="工作要求" prop="jobRequirement">
                                    <el-input v-model="ruleForm.jobRequirement" placeholder="请输入工作要求"
                                              style=" width: 202px;" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="封面图片" prop="headerImg">
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
                                    <img v-if="converImg" :src="converImg" style="width: 110px;">
                                    <img v-if="!converImg" :src="imgUrl+iconid" style="width: 110px;">
                                </div>
                            </div>
                            <div style=" width: 50%">
                                <el-form-item label="工程类别" prop="projectTypeName">
                                    <el-select placeholder="请选择工程类别" v-model="ruleForm.projectTypeName"
                                               @change="getProjectId" style=" width: 202px;" clearable>
                                        <el-option
                                                v-for="item in projectTypeList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="工程预算" prop="budget">
                                    <el-input v-model="ruleForm.budget" placeholder="请输入工程预算" type="number"
                                              style=" width: 202px;" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="经纬度" prop="longitude">
                                    <div style="display: flex;align-items: center">
                                        <div>
                                            <el-input v-model="ruleForm.longitude" placeholder="请输入经度"
                                                      clearable></el-input>
                                        </div>
                                        <div style="width: 30px;height: 2px;background-color: darkgray;margin-left: 10px;margin-right: 10px;"></div>
                                        <div>
                                            <el-input v-model="ruleForm.latitude" placeholder="请输入纬度"
                                                      clearable></el-input>
                                        </div>
                                        <div style="margin-left: 10px;color: dodgerblue" v-on:click="getMap()">地图获取?
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="所属区域" prop="areaName">
                                    <div style="align-items: center;display: flex;margin-bottom: 20px">
                                        <div style="margin-right: 20px">省份</div>
                                        <div>
                                            <el-select placeholder="请选择省份" v-model="ruleForm.provincesName"
                                                       @change="getProvincesId" style="width: 122px" clearable>
                                                <el-option
                                                        v-for="item in provinces"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id+','+item.name"
                                                >
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div style="margin-right: 20px;margin-left: 20px"> 城市</div>
                                        <div>
                                            <el-select placeholder="请选择城市" v-model="ruleForm.cityName"
                                                       @change="getCity" style="width: 122px" clearable>
                                                <el-option
                                                        v-for="item in city"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id+','+item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div style="margin-right: 20px;margin-left: 20px"> 区县</div>
                                        <div>
                                            <el-select placeholder="请选择区县" v-model="ruleForm.areaName"
                                                       @change="getArea" style="width: 122px" clearable>
                                                <el-option
                                                        v-for="item in area"
                                                        :key="item.id"
                                                        :label="item.name"
                                                        :value="item.id+','+item.name">
                                                </el-option>
                                            </el-select>
                                        </div>
                                    </div>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="address">
                                    <el-input v-model="ruleForm.address" placeholder="请输入详细地址"
                                              style=" width: 310px;" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="工程描述" prop="projectIntroduce">
                                    <el-input type="textarea" :rows="8" v-model="ruleForm.projectIntroduce"
                                              style=" width: 310px;" clearable></el-input>
                                </el-form-item>
                            </div>

                        </div>
                    </el-form>

                    <div class="display_flex" style="justify-content: flex-end;margin-right: 70px;padding-top: 30px">
                        <el-button v-on:click="editProject('ruleForm')">保存</el-button>
                        <el-button v-on:click="goBack()">返回</el-button>
                    </div>


                </div>

            </div>
        </el-card>

    </div>
</template>

<script>
    import http from 'utils/http'
    import serviceProjectApi from 'services/project/index'
    import serviceApi from 'services/vip/index'
    import Enum from 'utils/systemEnum'
    import mixins from 'mixins/index'

    export default {
        name: "editProject",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                isShow: false,
                fileUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                filetype: Enum.fileType.vipUser_img,
                converImg: "",
                provinces: "",
                provincesId: "",
                city: "",
                cityId: "",
                area: "",
                areaId: "",
                iconid: "",
                projectTypeList: [
                    {
                        id: Enum.projectType.home_decoration,
                        name: '家装'
                    },
                    {
                        id: Enum.projectType.worker_decoration,
                        name: '工装'
                    },
                    {
                        id: Enum.projectType.pavement,
                        name: '铺面'
                    }
                ],
                projectType: "",
                projectId: "",
                imgUrl: http.downfileurl + '?fileid=',
                fileList: [],
                ruleForm: {
                    projectName: "",
                    areaSize: "",
                    phone: "",
                    villageName: "",
                    longitude: "",
                    latitude: "",
                    budget: "",
                    address: "",
                    provincesName: "",
                    cityName: "",
                    areaName: "",
                    projectTypeName: "",
                    projectIntroduce: "",
                    jobRequirement: "",
                },
                rules: {
                    projectName: [
                        {required: true, message: '请填写工程名称', trigger: 'blur'}
                    ],
                    areaSize: [
                        {required: true, message: '请填写工程面积', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请填写联系电话', trigger: 'blur'}
                    ],
                    villageName: [
                        {required: true, message: '请填写小区名字', trigger: 'blur'}
                    ],
                    jobRequirement: [
                        {required: true, message: '请填写工作要求', trigger: 'blur'}
                    ],
                    projectTypeName: [
                        {required: true, message: '请选择工程类别', trigger: 'change'}
                    ],
                    budget: [
                        {required: true, message: '请填写工程预算', trigger: 'blur'}
                    ],
                    longitude: [
                        {required: true, message: '请填写经纬度', trigger: 'blur'}
                    ],
                    areaName: [
                        {required: true, message: '请填写所属区域', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请填写详细地址', trigger: 'blur'}
                    ],
                    projectIntroduce: [
                        {required: true, message: '请填写工程描述', trigger: 'blur'}
                    ],

                }

            }
        },
        watch: {
            phone(val) {
                this.ruleForm.phone = val.replace(/[^1-9]/g, '');
            }
        },
        created() {
            this.projectId = this.$route.query.projectId;
            this.getProvinceList();
            this.detailList()
        },
        methods: {
            detailList() {
                let option = {
                    data: {
                        id: this.projectId
                    }
                }
                serviceProjectApi.projectDetail(option).then((data) => {
                    this.ruleForm.projectName = data.name;
                    this.ruleForm.areaSize = data.areaSize;
                    this.ruleForm.budget = data.budget;
                    this.ruleForm.phone = data.phone;
                    this.ruleForm.publisher = data.publisher;
                    this.ruleForm.projectTypeName = data.projectType == 1 ? '家装' : data.projectType == 2 ? '工装' : '铺面';
                    this.projectType = data.projectType;
                    this.ruleForm.address = data.address;
                    this.ruleForm.villageName = data.villageName;
                    this.ruleForm.jobRequirement = data.requirement;
                    this.iconid = data.converImg;
                    this.ruleForm.projectIntroduce = data.description;
                    this.ruleForm.longitude = data.longitude;
                    this.ruleForm.latitude = data.latitude;
                    this.ruleForm.provincesName = data.province;
                    this.ruleForm.cityName = data.city;
                    this.ruleForm.areaName = data.area;

                }).catch(() => {
                    this.loading = false
                })

            },


            beforeupload(file) {
                console.log(file)
            },
            imgSuccess(response, file, fileList) {
                this.converImg = URL.createObjectURL(file.raw);
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
            getProjectId(projectType) {
                this.projectType = projectType;
            },
            getProvinceList() {
                let option = {
                    data: {
                        countryid: '5f8962f48c7c5c4e94547757'
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
                this.getArealist();
            },
            getCitylist() {
                let option = {
                    data: {
                        provinceId: this.provincesId
                    }
                }
                serviceApi.chooseCity(option).then((data) => {
                    this.city = data;

                }).catch(() => {
                    this.loading = false
                })
            },
            getArea(areaId) {
                let area = areaId.split(",");
                this.areaId = area[0];
                this.ruleForm.areaName = area[1];

            },
            getArealist() {
                let option = {
                    data: {
                        cityId: this.cityId
                    }
                }
                serviceApi.chooseArea(option).then((data) => {
                    this.area = data
                }).catch(() => {
                    this.loading = false
                })
            },

            getMap() {

                this.isShow = true

            },
            mapData(data) {
                this.isShow = data.iSShow;
                this.ruleForm.longitude = data.lng;
                this.ruleForm.latitude = data.lat;
                this.ruleForm.address = data.address;

            },
            editProject(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!(/^1[34578]\d{9}$/.test(this.ruleForm.phone))) {
                            alert("电话号码格式错误");
                            return;
                        }
                        let option = {
                            data: {
                                id: this.projectId,
                                name: this.ruleForm.projectName,
                                projectType: this.projectType,
                                areaSize: Number(this.ruleForm.areaSize),
                                budget: Number(this.ruleForm.budget),
                                phone: this.ruleForm.phone,
                                villageName: this.ruleForm.villageName,
                                longitude: this.ruleForm.longitude,
                                latitude: this.ruleForm.latitude,
                                converImg: this.iconid,
                                provinceId: this.provincesId,
                                province: this.ruleForm.provincesName,
                                cityId: this.cityId,
                                city: this.ruleForm.cityName,
                                area: this.ruleForm.areaName,
                                areaId: this.areaId,
                                address: this.ruleForm.address,
                                description: this.ruleForm.projectIntroduce,
                                requirement: this.ruleForm.jobRequirement

                            }
                        }
                        serviceProjectApi.editProject(option).then((data) => {
                            this.$router.go(-1);

                        }).catch(() => {
                            this.loading = false
                        })
                    }
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
</style>