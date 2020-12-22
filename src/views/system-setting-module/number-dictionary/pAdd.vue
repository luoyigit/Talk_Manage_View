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

                <!--<el-form-item prop="name">-->
                    <!--<el-input v-model="form.name" style="width: 217px"></el-input>-->
                <!--</el-form-item>-->
                <template slot="sortIndex">
                    <el-input-number v-model="form.sortIndex" @change="handleChange" :min="0"></el-input-number>
                </template>
                <!--<template slot="sortIndex" slot-scope="scope">-->
                    <!--<el-input-number v-model="scope.row.sortIndex" @change="handleChange" :min="0"></el-input-number>-->
                <!--</template>-->
            </v-el-form>
        </el-form>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm('form')">确定</el-button>
    </pms-dialog-frame>

</template>

<script>
    import serviceApi from 'services/dictionary/index'
    import mixins from 'mixins/index'
    export default {
        name: "pAdd",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {

                form: {
                },
                title: "添加字典",
                formRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    key: [
                        {required: true, message: '请输入键', trigger: 'blur'},
                    ],
                },
                num: 0,
            }
        },
        computed: {
            items() {
                return [

                    {
                        label: '名称',
                        prop: 'name',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '键',
                        prop: 'key',
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




                ]
            }
        },
        created() {
            // this.getTreeList();
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

                } else {
                    this.form = {}
                    this.title = "添加字典"
                }

                this.$refs.frame.show()
            },


            confirm(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                        console.log(this.form)
                        if (this.form.id) {
                            let option = {
                                data: {
                                    key: this.form.key,
                                    name: this.form.name,
                                    sortIndex: this.form.sortIndex,
                                    id:this.form.id
                                }
                            }
                            serviceApi.editType(option).then((data) => {
                                this.hide();
                                this.$emit("getData");
                            }).catch(() => {
                                this.loading = false
                            })
                        } else {
                            let option = {
                                data: {
                                    key: this.form.key,
                                    name: this.form.name,
                                    sortIndex: this.form.sortIndex,
                                }
                            }
                            serviceApi.addType(option).then((data) => {
                                this.hide();
                                this.$emit("getData");
                            }).catch(() => {
                                this.loading = false
                            })
                        }

                    }



                })


            },

            handleChange(value) {
                console.log(value);
            },

            getTreeList() {
                let option = {
                    data: {

                    }
                }
                serviceApi.treeDecoration(option).then((data) => {


                }).catch(() => {
                    this.loading = false
                })
            }
        }

    }
</script>

<style scoped>

</style>