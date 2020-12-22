<template>
    <div>
        <div id="0" class="condition-container">
            <el-card class="box-card" header="基本信息">
                <div style="background-color: white;margin-left: 30px">
                    <el-form
                            :model="ruleForm"
                            status-icon
                            :rules="rules"
                            ref="form"
                            :inline="true"
                            label-width="125px">
                        <v-el-form :items="item1" :form-data="ruleForm">

                        </v-el-form>
                        <v-el-form :items="item2" :form-data="ruleForm">
                            <template slot="catalogTypeId">
                                <el-select v-model="catalogType" placeholder="请选择"
                                           style="width: 202px"
                                           clearable>
                                    <el-option
                                            v-for="item in shopTypeList"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id+','+item.name">
                                    </el-option>
                                </el-select>
                            </template>

                            <template slot="shopId">
                                <el-select v-model="ruleForm.shopId" placeholder="请选择" style="width: 202px" clearable>
                                    <el-option
                                            v-for="item in storeList"
                                            :key="item.name"
                                            :label="item.id"
                                            :value="item.id+','+item.name">
                                    </el-option>
                                </el-select>
                            </template>

                        </v-el-form>
                        <v-el-form :items="item3" :form-data="ruleForm">

                            <template slot="isOnShelf">
                                <el-checkbox v-model="ruleForm.isOnShelf" style="width: 202px;"></el-checkbox>
                            </template>
                            <!--<template slot="price">-->
                            <!--<el-input type="number"></el-input>-->
                            <!--</template>-->
                        </v-el-form>

                    </el-form>

                    <div style="margin-top: 20px;display: flex;justify-content: flex-end" v-if="!ruleForm.isSingle">
                        <el-button v-on:click="EditInfo('form')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
                        <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div :id="ruleForm.isSingle?1:''" class="condition-container" v-if="ruleForm.isSingle">
        <el-card class="box-card" style="margin-top: 20px" header="商品规格">
        <div style="background-color: white;margin-left: 50px">
        <div>
        <el-radio-group v-model="isSingle" >
        <el-radio-button :label="true">单品</el-radio-button>
        </el-radio-group>
        </div>
        <div style="margin-top: 40px" >
        <oneGoods @getData="getData" :detail="detail"></oneGoods>
        </div>

            <div style="margin-top: 20px;display: flex;justify-content: flex-end">
                <el-button v-on:click="EditInfo('form')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
                <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>
            </div>
        </div>
        </el-card>
        </div>

        <div :id="!ruleForm.isSingle ? 1:''" class="condition-container" v-if="!ruleForm.isSingle">
            <el-card class="box-card" style="margin-top: 20px" header="Sku">
                <div style="background-color: white;margin-left: 50px">
                    <el-table :data="ruleForm.tableData" :header-cell-style="{background:'#ffffff'}" :border="true" @cell-dblclick="cellEdit">
                        <el-table-column
                                v-for="(item, index) of columns" :key="index"
                                prop="properyList" :label="item" sortable>
                            <template slot-scope="scope">
                                <span v-for="(res, index) in scope.row.properyList" :key="index"
                                      v-if="item == res.propertyName">{{res.propertyValue}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="stock"
                                label="预估当前库存"
                                :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span >{{scope.row.stock}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="stockNum"
                                label="库存增减"
                                :show-overflow-tooltip="true"
                                :render-header="kcRenderHeader">
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.editStock" ref="stock"
                                          v-model="scope.row.stockNum"
                                          @blur="loseFocus(scope.row)" clearable type="number" @change="changeIsOnShelfValue(scope.row)">
                                </el-input>
                                <span v-else>{{scope.row.stockNum}}</span>
                            </template>
                        </el-table-column>

                        <el-table-column
                                prop="price"
                                label="单价"
                                :show-overflow-tooltip="true"
                                :render-header="renderHeader">
                            <template slot-scope="scope">
                                <el-input v-if="scope.row.editPrice" ref="price"
                                          v-model="scope.row.price"
                                          @blur="loseFocus(scope.row)"
                                          type="number" clearable @change="changeIsOnShelfValue(scope.row)">
                                </el-input>
                                <span v-else>{{scope.row.price}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="isOnShelf"
                                label="是否上架"
                                :show-overflow-tooltip="true"
                                :render-header="selectRenderHeader">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.isOnShelf" v-if="scope.row.editIsOnShelf"
                                           ref="isOnShelf" clearable @change="changeIsOnShelfValue(scope.row)">
                                    <el-option
                                            v-for="item in isUpShelfList"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                                <span v-else>{{scope.row.isOnShelf}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 40px;display: flex">
                        <div>最低价格：{{minPrice}}</div>
                        <div style="margin-left: 100px">最高价格：{{maxPrice}}</div>
                    </div>

                    <div style="margin-top: 20px;display: flex;justify-content: flex-end">
                        <el-button v-on:click="EditMultSku('form')" style="box-shadow: 1px 1px 15px #a1a1a1">保存
                        </el-button>
                        <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>
                    </div>

                </div>
            </el-card>
        </div>


        <div id="2" class="condition-container">
            <el-card class="box-card" style="margin-top: 20px" header="图片">

                <div style="background-color: white">
                    <div style="margin-left: 30px;display: flex">
                        <div style="text-align: center;margin-right: 30px" v-for="item in imgList">
                            <div style="width: 100px;height: 100px;line-height: 100px;">
                                <div style="display: flex;justify-content: flex-end;width: 115px">
                                        <i class="el-icon-circle-close" v-on:click="delectImg(item)"></i>
                                </div>
                                <div style="height: 100px"><img :src="imgUrl+item" style="width: 100px"></div>
                            </div>
                            <div style="margin-top: 30px">
                                <el-radio-group v-model="chooseRadio" @change="Radio(item)">
                                    <el-radio :label="item">封面</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div style="margin-left: 20px;display: flex;align-items: center">
                            <el-upload
                                    class="upload-demo"
                                    :headers="headers"
                                    :action="fileUrl"
                                    :multiple="false"
                                    :file-list="fileList"
                                    :on-success="imgSuccess"
                                    :on-remove="imgRemove"
                                    :before-upload="beforeupload"
                                    :data="{fileType: filetype,}">
                                <img src="../../assets/addImg.png" style="width: 110px">
                            </el-upload>

                        </div>
                    </div>
                    <div style="margin-top: 20px;display: flex;justify-content: flex-end">
                        <el-button v-on:click="ImgEdit('form')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
                        <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="navigation">

            <ul>
                <li style="line-height: 40px" :class="activeClass == 0 ? 'active':''" @click="getActive(0)">基本信息</li>
                <li style="line-height: 40px" :class="activeClass == 1 ? 'active':''" @click="getActive(1)" v-if="ruleForm.isSingle">商品规格</li>
                <li style="line-height: 40px" :class="activeClass == 1 ? 'active':''" @click="getActive(1)" v-if="!ruleForm.isSingle">Sku</li>
                <li style="line-height: 40px" :class="activeClass == 2 ? 'active':''" @click="getActive(2)">图片</li>
            </ul>
        </div>


        <!--<div class="display_flex"-->
        <!--style="justify-content: flex-end;position: fixed;bottom: 0;right: 70px;z-index: 99999">-->
        <!--<el-button v-on:click="add('form')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>-->
        <!--<el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>-->
        <!--</div>-->
    </div>
</template>

<script>
    import http from 'utils/http'
    import Enum from 'utils/systemEnum'
    import mixins from 'mixins/index'
    import specifications from ".//sku/specifications";
    import oneGoods from ".//sku/oneGoods";
    import serviceApi from 'services/shop/index'
    import Vue from "vue";

    export default {
        name: "editGoods",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {specifications, oneGoods},
        data() {
            return {
                fileUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                filetype: Enum.fileType.shop_img,
                imgUrl: http.downfileurl + '?fileid=',
                activeClass: 0,
                imgList: [],
                ruleForm: {
                    tableData: [],
                    table: []
                },
                columns: [],
                shopTypeList: [],
                storeList: [],
                chooseRadio: 0,
                fileList: [],
                label: "",
                isSingle: "true",
                tableData: [],
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                    ],
                    title: [
                        {required: true, message: '请输入商品标题', trigger: 'blur'},
                    ],
                    catalogTypeId: [
                        {required: true, message: '请选择商品类别', trigger: 'change'},
                    ],
                    // shopId: [
                    //     {required: true, message: '请选择所属店铺', trigger: 'change'},
                    // ],
                    // isOnline: [
                    //     {required: true, message: '请选择是否上架', trigger: 'change'}
                    // ],
                },
                price: 0,
                minPrice: "",
                maxPrice: "",
                stockChange: 0,

                allPrice: "",
                isAllPrice: false,
                isPriceNum: 0,
                allPropertyValue: "",
                isPropertyValue: false,
                isPropertyValueNum: 0,
                allIsOnShelf: "",
                IsOnShelfValue: false,
                IsOnShelfNum: 0,
                isUpShelfList: [
                    true, false
                ],
                properyList: [],
                goodsId: "",
                detailData: [],
                editSku: [],
                Sku:[],
                catalogType:"",
                detail:"",
                priceList:[]
            }
        },
        computed: {
            item1() {
                return [
                    {
                        label: '商品名称',
                        prop: 'name',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '商品标题',
                        prop: 'title',
                        component: {
                            name: 'el-input'
                        }
                    },
                ]
            },
            item2() {
                return [
                    {
                        label: '商品类别',
                        prop: 'catalogTypeId',
                        component: {
                            name: 'el-input'
                        }
                    },
                    {
                        label: '所属店铺',
                        prop: 'shopId',
                        component: {
                            name: 'el-input'
                        }
                    },

                ]
            },
            item3() {
                return [
                    {
                        label: '是否上架',
                        prop: 'isOnShelf',
                        component: {
                            name: 'el-input'
                        }
                    },
                ]
            },


        },
        created() {
            this.goodsId = this.$route.query.goodsId;
            setTimeout(()=>{
                this.getSkuList();
            },100)

            this.getDetail();
            this.getShopType();

            this.getImgList();
        },
        methods: {
            getDetail() {
                let option = {
                    data: {
                        id: this.goodsId
                    }
                };
                serviceApi.editDetail(option).then(data => {
                    this.ruleForm = data;
                    this.detail = data;
                    this.chooseRadio = data.coverImg;
                    this.catalogType = data.catalogTypeId+','+data.catalogName;
                    console.log(this.catalogType);

                })
            },
            Radio(row) {
                this.iconid = row
            },
            getShopType() {
                serviceApi.typeList({}).then((data) => {
                    this.shopTypeList = data
                })
            },
            getSkuList() {
                let option = {
                    data: {
                        id: this.goodsId
                    }
                };
                serviceApi.editSkuList(option).then(data => {
                    if (data.length > 0){
                        this.columns = []
                        this.ruleForm.tableData = data
                        for (let i = 0; i <= data[0].properyList.length - 1; i++) {
                            this.columns.push(data[0].properyList[i].propertyName)
                        }
                        for (let j = 0; j <= this.ruleForm.tableData.length - 1; j++) {
                            this.$set(this.ruleForm.tableData[j], 'editStock', false);
                            this.$set(this.ruleForm.tableData[j], 'editPrice', false);
                            this.$set(this.ruleForm.tableData[j], 'editIsOnShelf', false);
                            this.$set(this.ruleForm.tableData[j], 'stockNum', 0);

                        }
                        this.priceList = [];
                        this.ruleForm.tableData.forEach((res) => {
                            this.priceList.push(res.price)
                        })
                        this.maxPrice = Math.max.apply(null,this.priceList);
                        this.minPrice = Math.min.apply(null,this.priceList);
                        console.log(this.columns)
                        console.log(this.ruleForm.tableData)
                    }


                })

            },
            getImgList() {
                let option = {
                    data: {
                        id: this.goodsId
                    }
                };
                serviceApi.editImgList(option).then(data => {
                    this.imgList = data;
                })
            },
            getActive(index) {
                this.activeClass = index
                let jump = document.querySelectorAll('.condition-container')
                jump[index].scrollIntoView({
                    block: 'start',// 上边框与视窗顶部平齐
                    behavior: 'smooth' // 平滑过渡
                })

            },
            add(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                    }
                });

            },
            goBack() {
            this.$router.go(-1);

            },
            beforeupload(file) {
                console.log(file)
            },
            imgSuccess(response, file, fileList) {
                // this.num++
                let option = {
                    data:{
                        id:this.goodsId,
                        fileId:response.data
                    }
                }
                serviceApi.addImg(option).then(res => {
                    this.getImgList()
                })

            },
            imgRemove(file, fileList) {

                this.fileList = []
                this.iconid = ''
                //    const index = this.fileList.findIndex(d => d.fid === data.fid);
                //    children.splice(index, 1);
            },
            delectImg(row){
                let option = {
                    data:{
                        id:row
                    }
                };
                this.$confirm('确定是否删除?', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    serviceApi.delectImg(option).then(res => {
                        this.getImgList()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            ImgEdit(){
            let option = {
                data:{
                    id:this.goodsId,
                    coverImg: this.iconid
                }
            };
            serviceApi.fmImage(option).then(res => {

            })
            },
            cellEdit(row, column) {
                if (column.property == 'stock') {
                    row.editStock = true;
                    setTimeout(() => {
                        this.$refs[column.property].focus()
                    }, 20);
                    return;
                }
                ;
                if (column.property == 'price') {
                    row.editPrice = true;
                    setTimeout(() => {
                        this.$refs[column.property].focus()
                    }, 20);
                    return;
                }
                ;
                if (column.property == 'isOnShelf') {
                    row.editIsOnShelf = true;
                    setTimeout(() => {
                        this.$refs[column.property].focus()
                    }, 20);
                    return;
                }
                ;

            },

            // 当输入框失去焦点时不显示输入框
            loseFocus(row) {
                row.editStock = false;
                row.editPrice = false;
                row.editIsOnShelf = false;
            },
            EditInfo(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let shopType = this.catalogType.split(',');
                        let shop;
                        if (shop !== undefined) {
                            shop = this.ruleForm.shopId.split(',');
                        }
                        let option = {
                            data:{
                                id:this.goodsId,
                                name: this.ruleForm.name,
                                title: this.ruleForm.title,
                                catalogTypeId: shopType[0],
                                catalogName: shopType[1],
                                shopId: shop !== undefined ? shop[0] : "",
                                shopName: shop !== undefined ? shop[1] : "",
                                isOnShelf: this.ruleForm.isOnShelf,
                                isSingle: this.ruleForm.isSingle,
                                price: this.price,
                                stockChange: this.stockChange,
                            }
                        };
                        serviceApi.editJCInfo(option).then(res => {
                            this.getDetail();
                        })
                    }})

            },
            getData(data) {//单品
                console.log(data);
                this.stockChange = Number(data.stockNum);
                this.price = Number(data.price)
            },
            EditMultSku(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let option = {
                            data:this.editSku
                        };
                        serviceApi.editMultSku(option).then(res => {
                            this.getSkuList();
                        })
                    }
                })
            },
            changeIsOnShelfValue(row){
                for (let i = 0;i<=this.editSku.length-1;i++){
                    if (this.editSku[i].id == row.id) {
                        this.editSku.splice(i,1)
                    }
                }
                    this.editSku.push({
                        id: row.id,
                        stockChange: Number(row.stockNum),
                        price: Number(row.price),
                        isOnShelf: row.isOnShelf
                    });
            },

            renderHeader(h) {
                if (this.isAllPrice) {
                    return (
                        < div > 单价(元) <el-button
                    icon = "el-icon-caret-top"
                    style = "border: none;"
                    onClick = {()=>this.priceEditAll()
                }>
                <
                    /el-button>
                    < div > <el-input
                    value = {this.allPrice}
                    placeholder = "请输入内容"
                    type = "number"
                    onInput = {e=>this.handleInput(e)
                }>
                </el-input></div >
                    </div>
                )
                } else {
                    return (
                        < div > 单价(元) <el-button
                    icon = "el-icon-caret-bottom"
                    style = "border: none;"
                    onClick = {()=>this.priceEditAll()
                }> </el-button></div >
                )
                }

            },
            kcRenderHeader(h) {
                if (this.isPropertyValue) {
                    return (
                        < div > 库存增减 <el-button
                    icon = "el-icon-caret-top"
                    style = "border: none;"
                    onClick = {()=>this.propertyValueEditAll()
                }> <
                    /el-button>
                    <el-input
                    value = {this.allPropertyValue}
                    placeholder = "请输入内容"
                    type = "number"
                    onInput = {e=>this.propertyValue(e)
                }>
                </el-input>
                    </div>
                )
                } else {
                    return (
                        < div > 库存增减 <el-button
                    icon = "el-icon-caret-bottom"
                    style = "border: none;"
                    onClick = {()=>this.propertyValueEditAll()
                }> </el-button></div >
                )
                }
            },
            selectRenderHeader(h) {
                if (this.IsOnShelfValue) {
                    return (
                        < div > 是否上架 <el-button
                    icon = "el-icon-caret-top"
                    style = "border: none;"
                    onClick = {()=>this.isOnShelfEditAll()
                }> </el-button>
                    < div > <el-select
                    clearable
                    value = {this.allIsOnShelf}
                    onInput = {e=>this.OnShelfValue(e)}>
                    {
                        this.isUpShelfList.map(item => {
                            return (
                                <el-option
                            key = {item}
                            label = {item}
                            value = {item} >
                                </el-option>

                        )
                        })
                    }
                </el-select></div > < /div>
                )
                } else {
                    return (
                        < div > 是否上架 <el-button
                    icon = "el-icon-caret-bottom"
                    style = "border: none;"
                    onClick = {()=>this.isOnShelfEditAll()
                }> </el-button> </div >
                )
                }
            },
            focus() {
                this.isAllPrice = false
            },
            handleInput(val) {

                this.allPrice = val;
                this.ruleForm.tableData.map((i, index) => {
                    i.price = val
                    Vue.set(this.ruleForm.tableData, index, i)
                })
                this.editSku = []
                this.ruleForm.tableData.forEach((res) => {
                    this.editSku.push({
                        id: res.id,
                        stockChange: Number(res.stockNum),
                        price: Number(res.price),
                        isOnShelf: res.isOnShelf
                    });
                })

                console.log(this.editSku)
            },
            propertyValue(val) {
                this.allPropertyValue = val;
                this.ruleForm.tableData.map((i, index) => {
                    i.stockNum = val
                    Vue.set(this.ruleForm.tableData, index, i)
                })
                this.editSku = []
                this.ruleForm.tableData.forEach((res) => {
                    this.editSku.push({
                        id: res.id,
                        stockChange: Number(res.stockNum),
                        price:  Number(res.price),
                        isOnShelf: res.isOnShelf
                    });
                })

            },
            OnShelfValue(val) {
                this.allIsOnShelf = val;
                this.ruleForm.tableData.map((i, index) => {
                    i.isOnShelf = val
                    Vue.set(this.ruleForm.tableData, index, i)
                })
                this.editSku = []
                this.ruleForm.tableData.forEach((res) => {
                    this.editSku.push({
                        id: res.id,
                        stockChange: Number(res.stockNum),
                        price:  Number(res.price),
                        isOnShelf: res.isOnShelf
                    });
                })

            },
            priceEditAll() {
                if (this.isPriceNum % 2 == 0) {
                    this.isAllPrice = true
                } else {
                    this.isAllPrice = false
                }
                this.isPriceNum++
            },
            propertyValueEditAll() {
                if (this.isPropertyValueNum % 2 == 0) {
                    this.isPropertyValue = true
                } else {
                    this.isPropertyValue = false
                }
                this.isPropertyValueNum++
            },
            isOnShelfEditAll() {
                if (this.IsOnShelfNum % 2 == 0) {
                    this.IsOnShelfValue = true
                } else {
                    this.IsOnShelfValue = false
                }
                this.IsOnShelfNum++
            }


        }
    }
</script>

<style scoped lang="scss">

    .navigation {
        background-color: white;
        width: 100px;
        text-align: center;
        border-radius: 10px;
        position: fixed;
        top: 400px;
        right: 80px;
        box-shadow: 2px 2px 15px #e8e8e8;
        cursor: pointer;

    }

    .active {
        color: #5B7FF1;
    }

    .texts {
        margin-right: 15px;
        width: 90px;
        font-weight: bold;
        margin-bottom: 10px;
        margin-top: 20px;
    }

    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }

    /deep/ .el-form--label-top .el-form-item__label {

        font-weight: 600;
    }

    /deep/ .el-radio-button__inner {

        width: 120px;
    }

    /deep/ .el-upload-list {

        display: none;
    }
</style>