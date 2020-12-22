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
                <template slot="hotValue">
                    <el-input type="number" v-model="form.hotValue"></el-input>
                </template>
                <template slot="isRecommend">
                    <!--<el-select v-model="chooseData" placeholder="请选择是否推荐"  style="width:100%;" ref="selectReport">-->
                    <!--<el-option-->
                    <!--v-for="item in isRecommend"-->
                    <!--:key="item.id"-->
                    <!--:label="item.label"-->
                    <!--:value="item.id">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <el-radio-group v-model="form.isRecommend">
                        <el-radio :label="true"></el-radio>
                        <el-radio :label="false"></el-radio>

                    </el-radio-group>
                </template>
            </v-el-form>
        </el-form>
        <el-button slot="footer" type="warning" @click="hide">取消</el-button>
        <el-button slot="footer" type="primary" @click="confirm('form')">确定</el-button>
    </pms-dialog-frame>
</template>

<script>
    import serviceApi from 'services/vip/index'
    import mixins from 'mixins/index'

    export default {
        name: "addChannel",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        data() {
            return {
                form: {
                    isRecommend:true,
                    hotValue:0
                },

                title: '添加内容',
                chooseData: true,
                hotSize: "",
                formRules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                    hotValue: [
                        {required: true, message: '请输入热度值', trigger: 'blur'}
                    ],
                    isRecommend: [
                        { required: true, message: '请选择是否推荐', trigger: 'change' }
                    ],

                }
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
                        label: '热度值',
                        prop: 'hotValue',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '是否推荐',
                        prop: 'isRecommend',
                        component: {
                            name: 'el-input'
                        }
                    },


                ]
            }
        },
        methods: {
            hide() {
                this.$refs.frame.hide()
            },
            show(row) {
                if (row) {
                    this.form = Object.assign({}, this.form, row)
                    //    Object.assign(this.form,row) //这样并不会刷新页面
                    this.title = "编辑服务";
                    console.log(row)
                    this.form.hotValue = row.hotLevel;
                    // this.chooseData = row.isRecommend;

                } else {
                    this.hotSize = "";
                    this.form = {}
                    this.title = "添加内容"
                }

                this.$refs.frame.show()
            },
            init(row) {

            },
            confirm(formName) {
                this.$refs[formName].validate((valid) => {

                    // this.form.isRecommend = this.chooseData;
                    this.form.hotValue = Number(this.form.hotValue);

                    let option = {
                        data: this.form,
                        loading: {target: this.$refs.form.$el}
                    }
                    if (valid) {
                        if (this.form.id) {
                            serviceApi.editChannel(option).then(() => {
                                this.hide()
                                this.$emit("getlist")
                            })
                        } else {
                            serviceApi.addChannel(option).then(() => {
                                this.hide()
                                this.$emit("getlist")
                            })
                        }
                    }
                })

            }

        }
    }
</script>

<style scoped>

</style>