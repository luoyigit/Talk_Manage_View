<template>
         <div id="0" class="condition-container">
            <el-card header="基本信息">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div style="display: flex">
                        <div style="width: 50%">
                            <el-form-item label="标题" prop="title">
                                <el-input v-model="ruleForm.title" style="width: 217px" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="标签" prop="tags">
                                <el-input v-model="ruleForm.tags" style="width: 217px" clearable
                                          placeholder="多个标签用#隔开"></el-input>
                            </el-form-item>
                             <el-form-item label="售价" prop="title">
                                <el-input-number v-model="ruleForm.price" style="width: 217px"> </el-input-number>
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
                                </div>
                        </div>
                        <div style="width: 50%">
                            <el-form-item label="内容类别" prop="typeName">
                                <el-select v-model="ruleForm.typeName" placeholder="请选择内容类别" clearable filterable>
                                    <el-option
                                            v-for="item in typeList"
                                            :key="item.name"
                                            :label="item.name"
                                            :value="item.name">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                               <el-form-item label="作者" prop="authorName">
                                <el-input v-model="ruleForm.authorName" style="width: 217px" clearable
                                          ></el-input>
                            </el-form-item>
                              <el-form-item label="购买数量" prop="title">
                                <el-input-number v-model="ruleForm.buyCount" style="width: 217px"> </el-input-number>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
            </el-card>
               <div style=" position: fixed;top: 400px;right: 80px;">
            <div class="navigation">
                <ul>
                    <li style="line-height: 40px" :class="activeClass == 0 ? 'active':''" @click="getActive(0)">基本信息
                    </li>
                    <!-- <li style="line-height: 40px" :class="activeClass == 1 ? 'active':''" @click="getActive(1)">上传视频
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 2 ? 'active':''" @click="getActive(2)">视频制作
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 3 ? 'active':''" @click="getActive(3)">视频水印
                    </li>
                    <li style="line-height: 40px" :class="activeClass == 4 ? 'active':''" @click="getActive(4)">缩略图</li>
                    <li style="line-height: 40px" :class="activeClass == 5 ? 'active':''" @click="getActive(5)">视频切片
                    </li> -->
                </ul>
            </div>
            <div style="margin-top: 20px">
                <el-button v-on:click="add('ruleForm')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
                <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">退出</el-button>
            </div>
        </div>
        </div>
        
</template>

<script>
  import http from 'utils/http'
import mixins from 'mixins/index'
import serviceApi from 'services/course/index'
export default {
    
    mixins: [mixins.paginationMixin, mixins.loadingMixin],
    components: { },
    data() {
        return {
            id: '',
            converImg:"",
            filetype:1,
            fileList: [],
            fileUrl: http.singleUploadUrl,
            headers: http.getUplaodHeaders(),
            activeClass: 0,
            ruleForm:{buyCount:0,price:1},
            typeList:[],
            rules: {
                type: [
                    {required: true, message: '请选择内容类别', trigger: 'change'}
                ],
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'}
                ],
                typeName: [
                    {required: true, message: '请输入标签', trigger: 'blur'}
                ],
            }
        }
    },
    methods: {
        beforeupload(){

        },
        getTypeList(){
             let option = {
                   pageIndex: 1,
                   pageSize: 100,
             };
             serviceApi.getcoursetypelist(option).then((data) => {
                    this.typeList = data.dataList
                })
        },
        add(formName) {
            this.ruleForm.id = this.id
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let option = {
                        data: this.ruleForm
                    }
                
                    if(this.id) {
                            serviceApi.editCourse(option).then((data) => {
                            this.$router.go(-1);
                        });
                    }
                    else{
                         serviceApi.addCourse(option).then((data) => {
                            this.$router.go(-1);
                        });
                    }
                   
                }
            })
        },
        goBack(){

        },
        getActive(index) {
                this.activeClass = index
                let jump = document.querySelectorAll('.condition-container')
                jump[index].scrollIntoView({
                    block: 'start',// 上边框与视窗顶部平齐
                    behavior: 'smooth' // 平滑过渡
                })

            },
       imgSuccess(response, file, fileList) {
                this.converImg = URL.createObjectURL(file.raw);
                this.fileList = []
                this.fileList.push(file)
                this.ruleForm.coverImage = response.data

            },
        imgRemove(file, fileList) {
                this.fileList = []
                this.ruleForm.coverImage = ''
                this.converImg =null
            },
    },
    created() {
        var query=this.$route.query;
        console.log('qqq',query)
        this.id = query.id
        if(this.id){
            var detail = serviceApi.getCourse(this.id).then(res => {
                this.ruleForm = Object.assign({}, this.ruleForm,res)
            })
        }
       this.getTypeList()
    },
}
</script>

<style scoped lang="scss">
 .navigation {
        background-color: white;
        width: 100px;
        text-align: center;
        border-radius: 10px;
        /*position: fixed;*/
        /*top: 400px;*/
        /*right: 80px;*/
        box-shadow: 2px 2px 15px #e8e8e8;
        cursor: pointer;
    }

    .active {
        color: #5B7FF1;
    }
</style>
