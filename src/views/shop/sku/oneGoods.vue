<template>
    <el-form
            :model="form"
            status-icon
            :rules="formRules"
            ref="form"
            label-width="125px">
        <v-el-form :items="item" :form-data="form">
            <template slot="price">
                <el-input type="number" v-model="form.price" clearable></el-input>
            </template>
            <template slot="stockNum">
                <el-input type="number" v-model="form.stockNum" clearable></el-input>
            </template>
            <!--<template slot="stockNum" >-->
                <!--<el-input type="number" v-model="form.stockNum" clearable ></el-input>-->
            <!--</template>-->
        </v-el-form>
        <div v-if="detail !== undefined">
        <el-form-item label="预估当前库存" prop="stock">
            <!--<el-input type="number" v-model="form.stock" clearable ></el-input>-->
            <span>{{form.stock}}</span>
        </el-form-item>
        </div>
    </el-form>
</template>

<script>
    export default {
        name: "oneGoods",
        props: ['detail'],
        data() {
            return {
                form: {
                    stockNum:0,
                    price:0,
                },
                stockNum:0,
                price:0,
                formRules: {
                    price: [
                        {required: true, message: '请输入单价', trigger: 'blur'}
                    ],
                    stockNum: [
                        {required: true, message: '请输入库存增减', trigger: 'blur'}
                    ],
                    // stockNum: [
                    //     { required: true, message: '请输入当前库存', trigger: 'blur' }
                    // ],
                }
            }
        },

        computed: {
            item() {
                return [
                    {
                        label: '价格',
                        prop: 'price',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '库存增减',
                        prop: 'stockNum',
                        component: {
                            name: 'el-input'
                        }
                    },
                    // {
                    //     label: '预估当前库存',
                    //     prop: 'stockNum',
                    //     component: {
                    //         name: 'el-input'
                    //     }
                    // },


                ]
            }
        },
        watch: {
            //对象监听
            form: {
                deep: true,// 深度监听
                    immediate: true, // 监听到后，立即执行 handler方法
                    handler (val) { // 监听到后执行handler方法
                  console.log(val)
                        this.$emit('getData', val)
                }
                //
            },
                detail: {
                    deep: true,// 深度监听
                    immediate: true, // 监听到后，立即执行 handler方法
                        handler (val) { // 监听到后执行handler方法
                        if (val !== undefined){
                            this.form.stock = val.stock;
                            this.form.price = val.price;
                        }
                    }
                }
        },

    }
</script>

<style scoped lang="scss">
    /deep/ .el-input--small .el-input__inner {

        width: 202px;
    }
    /deep/ .el-input {

        width: auto;
    }
</style>