<!--  -->
<template>
    <div>
        <el-dialog
            :title="title"
            :visible.sync="showDialog"
            width="550px"
            ref="role"
        >
            <el-form :rules="rules" :model="formdata" label-width="80px">
                <v-el-form :items="items" :form-data="formdata"> 
                   <template slot="file">
                          <el-upload
                            class="upload-demo"
                            :headers="headers"
                            :action="fileUrl"
                            :multiple="false"
                            :file-list="fileList"
                            :on-success="fileSuccess"
                            :on-remove ="fileRemove"
                            :before-upload="beforeupload"
                             :data="{
                                    fileType: filetype,
                            }"
                            list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                        </el-upload>
                   </template>
                </v-el-form>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import serviceApi from 'services/skill/index'
import mixins from 'mixins/index'
import upload from 'components/mz-autoupload/'
import http from 'utils/http'
import Enum from 'utils/systemEnum'
export default {
    mixins: [mixins.dialogMixin],
    components:{
       upload
    },
    data() {
        return {
            fileUrl: http.singleUploadUrl,
            formLabelWidth: '80px',
            headers: http.getUplaodHeaders(),
            title: '添加类别',
            edit: false,
            rules: {
                name: [
                    {
                        required: true,
                        message: '名称',
                        trigger: 'blur',
                    },
                ],
            },
            fileList:[],
            filetype: Enum.fileType.skill_ico,
            iconid:""
        }
    },
    props: {
        formdata: {
            type: Object,
            default: null,
        },
        currentNode: {
            type: Object,
            default: null
        }
    },
    computed: {
        items() {
            return [
                {
                    label: '名称',
                    prop: 'name',
                    component: {
                        name: 'el-input',
                        attrs: {
                            // labelWidth: this.formLabelWidth,
                            width: "80%"
                        },
                    }
                },
                  {
                    label: '说明',
                    prop: 'remark',
                    component: {
                        name: 'el-input',
                        attrs: {
                            // labelWidth: this.formLabelWidth,
                        },
                    }
                },
                   {
                    label: '图标',
                    prop: 'file',
                },
                    {
                    label: '排序号',
                    prop: 'sortIndex',
                    component: {
                        name: 'el-input-number',
                        attrs: {
                            // labelWidth: this.formLabelWidth,
                        },
                    }
                }
            ]
        },
    },
    mounted() {
    
    },
    methods: {
        beforeupload(file){
          console.log(file)
        },
        fileSuccess(response, file, fileList){
           this.fileList = []
           this.fileList.push(file)
           this.iconid = response.data
        },
        fileRemove(file, fileList){
            console.log('fff',file)
             this.fileList = []
             this.iconid = ''
            //    const index = this.fileList.findIndex(d => d.fid === data.fid);
            //    children.splice(index, 1);
        },
        show(formdata) {
            this.title = formdata.id ? '编辑' :'添加'
             this.fileList = []
            if(formdata.id) {
                if(formdata.icon) {
                       this.iconid = formdata.icon
                       this.fileList.push({name:'',url:http.getFileUrl(formdata.icon)})
                }
              
            }
            this.showDialog = true
        },
        sure(){
            var options = Object.assign({},this.formdata,{fatherId:this.currentNode.id,icon:this.iconid})
            console.log('ssdfsf', options)
            if(this.formdata.id) {
                 serviceApi.eidtNode(options).then(res => {
                      this.showDialog = false
                        this.$emit("reloadEdit",res);
                        // this.formdata = {}
                 })
            } else {
               serviceApi.addNode(options).then(res => {
                this.showDialog = false
                this.$emit("reload",res);
                // this.formdata = {}
              })
            }
            
        }
    },
}
</script>
<style lang="scss" scoped>
//  /deep/.el-dialog__header {
//   background: $color-primary

// }
//控制弹窗的文本框占比
/deep/.el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 80%;
}
</style>
