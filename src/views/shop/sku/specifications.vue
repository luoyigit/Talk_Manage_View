<template>
    <div>
        <div v-for="i in listSpecifications">
            <div style="display: flex;align-items: center">
                <span> 输入规格 </span>
                <i class="el-icon-circle-close" style="margin-bottom: 20px;" v-on:click="delect(i.key)"></i>
                <el-input style="width: 202px;margin-left: 20px" v-model="i.value"clearable></el-input>
            </div>
            <div style="display: flex;margin-top: 10px;margin-bottom: 10px">
                <div style="width: 65px"></div>
                <div style="margin-left: 25px;display: flex;" v-for="item in i.values">
                    <el-input style="min-width: 70px;max-width: 90px;border: none;margin-top: 10px" v-model="item.val" clearable></el-input>
                    <i class="el-icon-circle-close"  v-on:click="delectValue(item.index,i.key)"></i>
                </div>

                <div>
                    <el-button style="color: #33b4f1;border: none;margin-left: 10px;margin-top: 10px" v-on:click="addText(i)">
                        +添加
                    </el-button>
                </div>
            </div>

        </div>
        <div style="font-size: 36px" v-if="isShow">
            <i class="el-icon-plus" style="margin-left: 90px" v-on:click="addSpecifications()">

            </i></div>
        <div style="margin-top: 30px">
            <el-button v-on:click="Sku()">生成Sku</el-button>
        </div>

    </div>
</template>

<script>
    import serviceApi from 'services/dictionary/index'

    export default {
        name: "specifications",
        props: ['isShow'],
        data() {
            return {
                value: "",
                options: [],
                text: "",
                num: 1,
                listSpecifications: [
                    {
                        key: 0,
                        values: [],

                    }
                ],
                index:0,


            }
        },
        methods: {
            addText(item) {


                console.log(item)
                if (item.values.length == 0) {
                    this.index = 0;
                    item.values.push({
                        index:this.index++,
                        val: ''
                    })
                }else {
                    item.values.push({
                        index:item.values.length,
                        val: ''
                    })
                }

            },
            addSpecifications() {
                this.listSpecifications.push({key: this.num++, values: []})
            },
            Sku() {
                this.$emit("getSkuData", this.listSpecifications)
                // for (let i = 0; i <= this.listSpecifications.length - 1; i++) {
                //     if (i + 1 == this.listSpecifications.length) {
                //         return;
                //     }
                //     console.log(this.listSpecifications[i].values.length * this.listSpecifications[i + 1].values.length);

                // }
            },
            delect(row) {
                this.listSpecifications.splice(row,1)
            },
            delectValue(row,key){
                console.log(key)
                this.listSpecifications[key].values.splice(row,1)
               console.log(this.listSpecifications)
            }
        }
    }
</script>

<style scoped>

</style>