<template>
    <div>
        <el-card header="申请信息">
            <div style="background-color: white;">
                <el-form
                        :model="form"
                        status-icon
                        :rules="formRules"
                        ref="form"
                        :inline="true"
                        label-width="125px">

                    <v-el-form :items="item" :form-data="form"></v-el-form>
                    <v-el-form :items="items" :form-data="form">

                        <template slot="businessLicenseImage">
                            <el-upload
                                    class="upload-demo"
                                    :headers="headers"
                                    :action="businessUrl"
                                    :multiple="false"
                                    :file-list="businessList"
                                    :on-success="businessSuccess"
                                    :on-remove="businessRemove"
                                    :before-upload="beforeupload"
                                    :data="{fileType: businesstype,}"
                                    style="width: 202px"
                            >
                                <el-button size="small" type="primary">点击上传</el-button>
                            </el-upload>
                            <img :src="Image+businessImageid" width="120px" v-if="businessImageid">
                        </template>


                        <template slot="selfImages">
                            <el-upload
                                    class="upload-demo"
                                    :headers="headers"
                                    :action="selfUrl"
                                    :multiple="false"
                                    :file-list="selfList"
                                    :on-success="imgSuccess"
                                    :on-remove="imgRemove"
                                    :before-upload="beforeupload"
                                    :data="{fileType: selftype,}"

                            >
                                <el-button size="small" type="primary">点击上传</el-button>

                            </el-upload>
                            <img :src="Image+selfImageid" width="120px" v-if="selfImageid">
                        </template>


                    </v-el-form>

                </el-form>

            </div>
        </el-card>
        <div style="position: fixed;right: 30px;bottom: 30px;z-index: 99999">
            <el-button v-on:click="determine('form')">确定</el-button>
            <el-button v-on:click="cancel()">取消</el-button>
        </div>
    </div>
</template>

<script>
    import mixins from 'mixins/index'
    import http from 'utils/http'
    import serviceApi from 'services/shop/index'
    import Enum from 'utils/systemEnum'
    import DictionaryTable from "../../system-setting-module/dic-manage/dictionary-table/dictionary-table";

    export default {
        name: "sellerApply",
        components: {DictionaryTable},
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                form: {},
                formRules: {
                    idCard: [
                        {required: true, message: '请输入身份证号码', trigger: 'blur'},
                    ],
                    reallName: [
                        {required: true, message: '请输入名字', trigger: 'blur'},
                    ]
                },
                selfUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                selftype: Enum.fileType.seller_img,
                selfList: [],
                businessUrl: http.singleUploadUrl,
                // headers: http.getUplaodHeaders(),
                businesstype: Enum.fileType.seller_img,
                businessList: [],
                Image: http.downfileurl + '?fileid=',
                businessImageid: "",
                selfImageid: "",
                userId:""
            }
        },
        computed: {
            item() {
                return [
                    {
                        label: '身份证号',
                        prop: 'idCard',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '真名',
                        prop: 'reallName',
                        component: {
                            name: 'el-input'
                        }
                    },


                ]
            },
            items() {
                return [

                    {
                        label: '营业执照图片',
                        prop: 'businessLicenseImage',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '手持身份证自拍照',
                        prop: 'selfImages',
                        component: {
                            name: 'el-input'
                        }
                    },

                ]
            }
        },
        created(){
            this.userId = this.$route.query.userId;
        },
        methods: {
            beforeupload(file) {
                console.log(file)
            },
            businessSuccess(response, file, fileList) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.businessList = []
                this.businessList.push(file)
                this.businessImageid = response.data

            },
            businessRemove(file, fileList) {

                this.businessList = []
                this.businessImageid = ''
                //    const index = this.fileList.findIndex(d => d.fid === data.fid);
                //    children.splice(index, 1);
            },
            imgSuccess(response, file, fileList) {
                // this.imageUrl = URL.createObjectURL(file.raw);
                this.selfList = []
                this.selfList.push(file)
                this.selfImageid = response.data

            },
            imgRemove(file, fileList) {

                this.selfList = []
                this.selfImageid = ''
                //    const index = this.fileList.findIndex(d => d.fid === data.fid);
                //    children.splice(index, 1);
            },
            determine(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let option = {
                            data:{
                                userId:this.userId,
                                idCard: this.form.idCard,
                                businessLicenseImage:this.businessImageid,
                                selfImages:this.selfImageid,
                                reallName:this.form.reallName
                            }
                        };
                        serviceApi.applySeller(option).then((data) => {
                            this.$router.push('/shop/sellerlist')

                        }).catch(() => {
                            this.loading = false
                        })
                    }

                })
            },
            cancel(){

            }
        }
    }
</script>

<style scoped lang="scss">

</style>