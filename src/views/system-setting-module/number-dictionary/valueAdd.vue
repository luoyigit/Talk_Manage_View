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
                <template slot="sortIndex" >
                    <el-input-number v-model="form.sortIndex" @change="handleChange" :min="0"></el-input-number>
                </template>


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
        name: "valueAdd",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                form: {
                },
                title: "添加值",
                formRules: {
                    name: [
                        {required: true, message: '请输入名称', trigger: 'blur'},
                    ],
                    value: [
                        {required: true, message: '请输入值', trigger: 'blur'},
                    ],
                },
                num: 0,
                key: ''
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
                        label: '值',
                        prop: 'value',
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

        },
        methods: {
            init(row) {

            },
            hide() {
                this.$refs.frame.hide()
            },
            show(row) {

                if (row.id) {
                    this.form = Object.assign({}, this.form, row)
                    //    Object.assign(this.form,row) //这样并不会刷新页面
                    console.log( this.form)
                    this.title = "编辑服务";

                } else {
                  this.key = row
                    this.form = {}
                    this.title = "添加值"
                }

                this.$refs.frame.show()
            },


            confirm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.form.id) {
                            console.log(this.form)
                            let option = {
                                data: {
                                    value: this.form.value,
                                    name: this.form.name,
                                    sortIndex: this.form.sortIndex,
                                    id: this.form.id
                                }
                            }
                            serviceApi.editValue(option).then((data) => {
                                this.hide();
                                this.$emit("getValuesData", this.form.dicKey);
                            }).catch(() => {
                                this.loading = false
                            })
                        } else {
                            console.log(this.form)
                            let option = {
                                data: {
                                    key:this.key,
                                    name: this.form.name,
                                    sortIndex: this.form.sortIndex,
                                    value: this.form.value
                                }
                            }
                            serviceApi.addValue(option).then((data) => {
                                this.hide();
                                this.$emit("getValuesData", this.key);
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
                    data: {}
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