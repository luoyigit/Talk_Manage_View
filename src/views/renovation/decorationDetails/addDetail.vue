<template>
    <pms-dialog-frame
            ref="frame"
            :title="title"
            width="500px"
            :show-close="false"
            @open="init">
        <el-form
                :model="form"
                status-icon
                :rules="formRules"
                ref="form"
                label-width="120px">
            <v-el-form :items="items" :form-data="form">
                <template slot="Parent">
                    <el-select placeholder="请选择" v-model="parentName" clearable>
                        <el-option

                                :value="parents.id"
                                :label="parents.name"
                                :key="parents.id"
                                style="height: auto"
                        >
                            <el-tree :data="parentList" :props="defaultProps"
                                     @node-click="handleNodeClick"></el-tree>
                        </el-option>
                    </el-select>
                </template>
                <el-form-item prop="name">
                    <el-input v-model="form.name" clearable></el-input>
                </el-form-item>
                <template slot="sortIndex">
                    <el-input-number v-model="form.sortIndex" @change="handleChange" :min="0"></el-input-number>
                </template>
                <template slot="icon">
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
                </template>
                <template slot="image">
                    <img :src="imageUrl" >
                </template>

            </v-el-form>
        </el-form>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm('form')">确定</el-button>
    </pms-dialog-frame>

</template>

<script>
    import http from 'utils/http'
    import serviceApi from 'services/renovation/index'
    import Enum from 'utils/systemEnum'
    import mixins from 'mixins/index'

    export default {
        name: "addDetail",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                fileUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                filetype: Enum.fileType.project_img,
                form: {
                    sortIndex:0
                },
                title: "添加类别",
                formRules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                },
                parentName: "",
                parents: {},
                parentList: [],
                num: 1,
                imageUrl: "",
                fileList: [],
                iconid: "",
                nameText: "",
                pid: "",
                twoList: [],
                // imgUrl: "",
                defaultProps: {
                    children: 'children',
                    label: 'name',

                },
                dept: "",
                imgUrl: http.downfileurl + '?fileid='
            }
        },
        computed: {
            items() {
                return [
                    {
                        label: '父级',
                        prop: 'Parent',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '名称',
                        prop: 'name',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '排序',
                        prop: 'sortIndex',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '图标',
                        prop: 'icon',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '',
                        prop: 'image',
                        component: {
                            name: 'el-input'
                        }
                    },

                ]
            }
        },
        created() {
            this.getTreeList();
        },
        methods: {
            init(row) {

            },
            hide() {
                this.$refs.frame.hide()
            },
            show(row) {
                if (row) {

                    this.form = Object.assign({}, this.form, row)
                    //    Object.assign(this.form,row) //这样并不会刷新页面
                    this.title = "编辑服务";
                    this.getDetail(row);

                } else {

                    this.form = {}
                    this.title = "添加内容";
                    this.imageUrl ="";
                    this.form.sortIndex = 0
                }

                this.$refs.frame.show()
            },

            getDetail(id) {
                let option = {
                    data: {
                        id: id
                    }
                };
                serviceApi.detailDecoration(option).then((data) => {
                    this.form = data
                    this.imageUrl = this.imgUrl + data.icon;
                    if(data.pid !== null){
                        this.getPDetail(data.pid)
                    }else {
                        this.parentName = ""
                    }

                }).catch(() => {
                    this.loading = false;
                })
            },
            getPDetail(id) {
                let option = {
                    data: {
                        id: id
                    }
                };
                serviceApi.detailDecoration(option).then((data) => {
                    this.parentName = data.name

                }).catch(() => {
                    this.loading = false;
                })
            },


            confirm(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        console.log(this.form)
                        if (this.form.id) {
                            let option = {
                                data: {
                                    name: this.form.name,
                                    icon: this.form.icon,
                                    id: this.form.id,
                                    pid: this.form.pid,
                                    sortIndex: this.form.sortIndex,
                                }
                            }
                            serviceApi.editDecoration(option).then((data) => {
                                this.hide();
                                this.$emit("getData");
                            }).catch(() => {
                                this.loading = false
                            })
                        } else {
                            let option = {
                                data: {
                                    name: this.form.name,
                                    icon: this.iconid,
                                    pid: this.pid,
                                    sortIndex: this.num,
                                }
                            }
                            serviceApi.addDecoration(option).then((data) => {
                                this.hide();
                                this.getTreeList();
                                this.$emit("getData");
                            }).catch(() => {
                                this.loading = false
                            })
                        }

                    }



                })


            },
            handleNodeClick(data) {
                console.log(data)
                this.parentName = data.name;
                this.pid = data.id
            },
            handleChange(value) {
                console.log(value);
            },
            beforeupload(file) {
                console.log(file)
            },
            imgSuccess(response, file, fileList) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.fileList = []
                this.fileList.push(file)
                this.iconid = response.data
                this.form.icon = response.data
            },
            imgRemove(file, fileList) {

                this.fileList = []
                this.iconid = ''
                //    const index = this.fileList.findIndex(d => d.fid === data.fid);
                //    children.splice(index, 1);
            },
            getTreeList() {
                let option = {
                    data: {
                        dept: this.dept
                    }
                }
                serviceApi.treeDecoration(option).then((data) => {

                    this.parentList = data;
                }).catch(() => {
                    this.loading = false
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    /*/deep/.el-input--small {*/

    /*width: 217px;*/
    /*}*/
    /*/deep/.el-input--small .el-input__inner {*/

    /*width: 217px;*/
    /*}*/
    /deep/.el-input {
        width: auto;
    }
</style>