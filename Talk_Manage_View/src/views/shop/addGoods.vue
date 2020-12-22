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
                                <el-select v-model="ruleForm.catalogTypeId" placeholder="请选择" style="width: 202px"
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


                </div>
            </el-card>
        </div>
        <div id="1" class="condition-container">
            <el-card class="box-card" style="margin-top: 20px" header="商品规格">
                <div style="background-color: white;margin-left: 50px">
                    <div>
                        <!--<el-button style="width: 120px;margin-right: 20px">单品</el-button>-->
                        <!--<el-button style="width: 120px" v-on:click="chooseSpecifications()">多种规格</el-button>-->
                        <el-radio-group v-model="isSingle" @change="chooseType">
                            <el-radio-button :label="true">单品</el-radio-button>
                            <el-radio-button :label="false">多种规格</el-radio-button>

                        </el-radio-group>
                    </div>
                    <div style="margin-top: 40px" v-if="isShow">
                        <specifications :isShow="isShow" @getSkuData="getSkuData"></specifications>
                    </div>
                    <div style="margin-top: 40px" v-if="hidden">
                        <oneGoods @getData="getData"></oneGoods>
                    </div>

                    <!--<el-button icon="el-icon-plus" @click="addTable()" style="margin-top: 10px"></el-button>-->

                </div>
            </el-card>
        </div>

        <div id="2" class="condition-container" v-if="isShow">
            <el-card class="box-card" style="margin-top: 20px" header="Sku">
                <div style="background-color: white;margin-left: 50px">
                    <el-form
                            :model="ruleForm"
                            status-icon>
                        <el-table :data="ruleForm.tableData"
                                  :header-cell-style="{background:'#ffffff'}" :border="true"
                                  @cell-dblclick="cellEdit">
                            <el-table-column
                                    v-for="(item, index) of columns" :key="index"
                                    :prop="item.prop" :label="item.label" :align="item.align" sortable>
                                <template slot-scope="scope">
                                    <span>{{scope.row[item.prop]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="propertyValue"
                                    label="库存增减"
                                    :show-overflow-tooltip="true"
                                    :render-header="kcRenderHeader">
                                <el-form-item slot-scope="scope"
                                              :prop="`tableData[${scope.$index}].propertyValue`">
                                    <el-input v-if="scope.row.propertyValue.edit" ref="propertyValue"
                                              v-model="scope.row.propertyValue.value"
                                              @blur="loseFocus(scope.row.propertyValue)" clearable type="number">
                                    </el-input>
                                    <span v-else>{{scope.row.propertyValue.value}}</span>

                                </el-form-item>
                            </el-table-column>

                            <el-table-column
                                    prop="price"
                                    label="单价(元)"
                                    :show-overflow-tooltip="true"
                                    :render-header="renderHeader">
                                <el-form-item slot-scope="scope"
                                              :prop="`tableData[${scope.$index}].price`">
                                    <el-input v-if="scope.row.price.edit" ref="price"
                                              v-model="scope.row.price.value"
                                              @blur="loseFocus(scope.row.price)"
                                              type="number" clearable>
                                    </el-input>
                                    <span v-else>{{scope.row.price.value}}</span>
                                </el-form-item>
                            </el-table-column>
                            <el-table-column
                                    prop="isUpShelf"
                                    label="是否上架"
                                    :show-overflow-tooltip="true"
                                    :render-header="selectRenderHeader">
                                <el-form-item slot-scope="scope" :prop="`tableData[${scope.$index}].isUpShelf`">
                                    <el-select v-model="scope.row.isUpShelf.value" v-if="scope.row.isUpShelf.edit"
                                               ref="isUpShelf" clearable>
                                        <el-option
                                                v-for="item in isUpShelfList"
                                                :key="item"
                                                :label="item"
                                                :value="item">
                                        </el-option>
                                    </el-select>
                                    <span v-else>{{scope.row.isUpShelf.value}}</span>
                                </el-form-item>
                            </el-table-column>
                        </el-table>
                    </el-form>

                </div>
            </el-card>
        </div>


        <div id="3" class="condition-container">
            <el-card class="box-card" style="margin-top: 20px" header="图片">

                <div style="background-color: white">
                    <div style="margin-left: 30px;display: flex">
                        <div style="text-align: center;margin-right: 30px" v-for="(item,index) in imgList" :key="index">
                            <div style="width: 100px;height: 100px;">
                               <div style="display: flex;justify-content: flex-end;width: 115px"> <i class="el-icon-circle-close" v-on:click="delectImg(index)"></i></div>
                               <div style="line-height: 100px"><img :src="item.url" style="width: 100px;" ></div>
                            </div>
                            <div style="margin-top: 30px">
                                <el-radio-group v-model="iconid" @change="Radio(item)">
                                    <el-radio :label="item.coverImg">封面</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div style="margin-left: 20px">
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
                                <img src="../../assets/addImg.png" style="width: 100px">
                            </el-upload>

                        </div>
                    </div>

                </div>
            </el-card>
        </div>
        <div class="navigation">
            <ul>
                <li style="line-height: 40px" :class="activeClass == 0 ? 'active':''" @click="getActive(0)">基本信息</li>
                <li style="line-height: 40px" :class="activeClass == 1 ? 'active':''" @click="getActive(1)">商品规格</li>
                <li style="line-height: 40px" :class="activeClass == 2 ? 'active':''" @click="getActive(2)" v-if="isShow">Sku
                </li>
                <li style="line-height: 40px" v-if="!isShow" :class="activeClass ==  2 ?'active':''" @click="getActive(2)">图片</li>
                <li style="line-height: 40px" v-if="isShow" :class="activeClass ==  3 ?'active':''" @click="getActive(3)">图片</li>
            </ul>
        </div>


        <div class="display_flex" style="justify-content: flex-end;position: fixed;bottom: 20px;right: 70px;z-index: 99999">
            <el-button v-on:click="add('form')" style="box-shadow: 1px 1px 15px #a1a1a1">保存</el-button>
            <el-button v-on:click="goBack()" style="box-shadow: 1px 1px 15px #a1a1a1">返回</el-button>
        </div>
    </div>

</template>

<script>

    import serviceProjectApi from 'services/project/index'
    import serviceRenovationApi from 'services/renovation/index'
    import moment from 'moment'
    import Vue from "vue";
    import mixins from 'mixins/index'
    import http from 'utils/http'
    import Enum from 'utils/systemEnum'
    import specifications from ".//sku/specifications";
    import oneGoods from ".//sku/oneGoods";
    import serviceApi from 'services/shop/index'

    export default {
        name: "addGoods",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {specifications, oneGoods},
        data() {
            return {
                fileUrl: http.singleUploadUrl,
                headers: http.getUplaodHeaders(),
                filetype: Enum.fileType.project_img,
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
                radioNum: 0,
                chooseRadio: 0,
                fileList: [],
                label: "",
                isSingle: "",
                isShow: false,
                hidden: false,
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
                bannerList: [],
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
                    "true", "false"
                ],
                properyList: [],
                ProperyList: [],
                ProperyListTwo: [],
                val:[],
                iconid:"",

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
                    // {
                    //     label: '显示价格',
                    //     prop: 'price',
                    //     component: {
                    //         name: 'el-input',
                    //
                    //     }
                    // },


                ]
            },


        },
        watch: {
            propertyName(val) {
                console.log(val)
            },

        },
        created() {

            this.getShopType();
        },

        methods: {

            Radio(row) {
                this.iconid = row.coverImg
            },


            getShopType() {
                serviceApi.typeList({}).then((data) => {
                    this.shopTypeList = data
                })
            },

            getSearch(text) {
                let option = {
                    data: {
                        key: text
                    }
                };
                serviceRenovationApi.search(option).then((data) => {

                }).catch(() => {
                    this.loading = false
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

                        for (let i = 0; i <= this.ruleForm.tableData.length - 1; i++) {
                            this.properyList = []
                            for (let t = 0; t <= this.val.length - 1; t++) {
                                this.properyList.push( this.ruleForm.tableData[i][this.columns[t].label])
                            }
                            this.ruleForm.table.push({
                                stockChange: Number(this.ruleForm.tableData[i].propertyValue.value),
                                price: Number(this.ruleForm.tableData[i].price.value),
                                isOnShelf: JSON.parse(this.ruleForm.tableData[i].isUpShelf.value),
                                properyList: this.properyList
                            })
                        }
                        let shopType = this.ruleForm.catalogTypeId.split(',');

                        let shop;
                        if (shop !== undefined) {
                            shop = this.ruleForm.shopId.split(',');
                        }

                        let option = {
                            data: {
                                name: this.ruleForm.name,
                                title: this.ruleForm.title,
                                catalogTypeId: shopType[0],
                                catalogName: shopType[1],
                                coverImg: this.iconid,
                                shopId: shop !== undefined ? shop[0] : "",
                                shopName: shop !== undefined ? shop[1] : "",
                                isOnShelf: this.ruleForm.isOnShelf,
                                isSingle: this.isSingle,
                                price: Number(this.price),
                                stockChange: this.stockChange,
                                // minPrice: "",
                                // maxPrice: "",
                                skuList: this.ruleForm.table,
                                images: this.bannerList
                            }
                        }
                        serviceApi.addShop(option).then((data) => {

                            this.$router.go(-1);

                        }).catch(() => {
                            this.loading = false
                        })
                    }
                });

            },
            goBack() {


            },
            remoteMethod(query) {
                alert(query)
            },
            edit(row) {


            },
            deleted(row) {


            },
            addTable() {
                // console.log(this.skuList)
                this.ruleForm.tableData.push({
                    propertyName: "",
                    propertyValue: "",
                    price: "",
                    // stock: {edit: true, value: ''}
                });
                // console.log(this.skuList)
                this.initialTableEdit()

            },
            // 将所有单元格设置为不可编辑
            initialTableEdit() {
                this.ruleForm.tableData.forEach((item, index) => {
                    console.log(item)
                    for (let i in item) {
                        item[i] = {
                            value: item[i],
                            edit: false
                        }
                    }
                })
            },
            // 单元格双击事件
            cellEdit(row, column) {
                // 将单元格变为输入框
                row[column.property].edit = true
                // // 聚焦到单元格
                setTimeout(() => {
                    this.$refs[column.property].focus()
                }, 20)
            },
            // 当输入框失去焦点时不显示输入框
            loseFocus(editCell) {
                editCell.edit = false
            },
            selectChange(callback, editCell) {
                if (!callback) {
                    editCell.edit = false
                }
            },
            beforeupload(file) {
                console.log(file)
            },
            imgSuccess(response, file, fileList) {
                // this.num++

                this.imgList.push({
                    url: URL.createObjectURL(file.raw),
                    radio: this.radioNum++,
                    coverImg: response.data
                });
                this.fileList = []
                this.fileList.push(file)

                this.bannerList.push(response.data)
                this.iconid = this.bannerList[0]
            },
            imgRemove(file, fileList) {

                this.fileList = []
                this.iconid = ''
                //    const index = this.fileList.findIndex(d => d.fid === data.fid);
                //    children.splice(index, 1);
            },
            delectImg(row){
                console.log(row)
                this.imgList.splice(row,1)
                this.bannerList.splice(row,1);
                this.iconid = this.bannerList[0]
            },
            chooseType(val) {

                if (val == false) {
                    this.isShow = true;
                    this.hidden = false
                } else {
                    this.isShow = false;
                    this.hidden = true
                }
            },

            getSkuData(data) {
                this.ruleForm.tableData = [];
                this.properyList = [];
                this.columns = [];
                this.val = [];
                let key = [];
                let length = []
                for (let i = 0; i <= data.length - 1; i++) {
                    this.columns.push({
                        label: data[i].value,
                        prop: "val" + data[i].key,

                    });

                    key.push(data[i].key);
                    this.val.push(data[i].values);
                    length.push(data[i].values.length)


                }
                let sum = 1;

                for (let i = 0; i <= length.length - 1; i++) {
                    sum = sum * length[i];

                }
                for (let i = 0; i <= sum - 1; i++) {
                    this.ruleForm.tableData.push({
                        propertyName: {
                            value: '',
                            edit: false
                        }, propertyValue: {
                            value: '',
                            edit: false
                        },
                        price: {
                            value: '',
                            edit: false
                        },
                        isUpShelf: {
                            value: '',
                            edit: false
                        },

                    })


                }


                let d = 0;
                let p = 0;

                for (let v = 0; v <= this.val.length - 1; v++) {
                    d = 0;
                    let valNum = 0;
                    if (v == 0) {
                        for (let q = 0; q <= this.val[v].length - 1; q++) {
                            valNum = (this.ruleForm.tableData.length / this.val[v].length) + valNum
                            for (d; d < valNum; d++) {
                                this.$set(this.ruleForm.tableData[d], 'val' + key[v], this.val[v][q].val);
                                this.$set(this.ruleForm.tableData[d], this.columns[v].label , {
                                    propertyName: this.columns[v].label,
                                    propertyValue:this.val[v][q].val
                                });


                            }
                            // this.$set(this.properyList[p], 'propertyValue', val[v][q].val);
                            // p++
                        }
                    } else if (v % 2 !== 0) {
                        valNum = (this.ruleForm.tableData.length / this.val[v].length) + valNum
                        for (let w = 0; w < valNum; w++) {
                            if (w % 2 == 0) {
                                for (let t = 0; t <= this.val[v].length - 1; t++) {
                                    this.$set(this.ruleForm.tableData[d], 'val' + key[v], this.val[v][t].val);
                                    this.$set(this.ruleForm.tableData[d],this.columns[v].label, {
                                        propertyName: this.columns[v].label,
                                        propertyValue:this.val[v][t].val
                                    });
                                    d++;

                                    // this.$set(this.properyList[p], 'propertyValue' , val[v][t].val);
                                    // p++
                                }

                            } else {
                                const qNum = this.val[v].length - 1;
                                for (let e = qNum; e >= 0; e--) {
                                    this.$set(this.ruleForm.tableData[d], 'val' + key[v], this.val[v][e].val);
                                    this.$set(this.ruleForm.tableData[d], this.columns[v].label , {
                                        propertyName: this.columns[v].label,
                                        propertyValue:this.val[v][e].val
                                    });
                                    d++;

                                    // this.$set(this.properyList[p], 'propertyValue' , val[v][e].val);
                                    // p++

                                }
                            }

                        }

                    } else {
                        valNum = (this.ruleForm.tableData.length / this.val[v].length) + valNum
                        for (let w = 0; w < valNum; w++) {
                            for (let q = 0; q <= this.val[v].length - 1; q++) {
                                this.$set(this.ruleForm.tableData[d], 'val' + key[v], this.val[v][q].val);
                                this.$set(this.ruleForm.tableData[d],this.columns[v].label , {
                                    propertyName: this.columns[v].label,
                                    propertyValue:this.val[v][q].val
                                });

                                d++;

                                // this.$set(this.properyList[p], 'propertyValue' , val[v][q].val);
                                // p++
                            }
                        }
                    }

                }

            },
            handleSizeChange(page) {
                this.pageSize = page
            },
            getData(data) {//单品
                console.log(data);
                this.stockChange = Number(data.stockNum);
                this.price = data.price
            },
            renderHeader(h) {
                if (this.isAllPrice) {
                    return (
                        < div > 单价(元) <el-button
                    icon = "el-icon-caret-top"
                    style = "border: none;"
                    onClick = {()=>this.priceEditAll()
                }>
                </el-button>
                    < div> <el-input
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
                }> </el-button>
                    < el-input
                    value = {this.allPropertyValue}
                    placeholder = "请输入内容"
                    type = "number"
                    onInput = {e=>this.propertyValue(e)
                }>
                </el-input>
                    < /div>
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
                        < div > 是否上架 < el-button
                    icon = "el-icon-caret-top"
                    style = "border: none;"
                    onClick = {()=>this.isOnShelfEditAll()
                }> </el-button>
                    < div > <el-select
                    clearable
                    value = {this.allIsOnShelf}
                    onInput = {e=>this.OnShelfValue(e)
                }>
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
                        < div > 是否上架 < el-button
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
                    i.price.value = val
                    Vue.set(this.ruleForm.tableData, index, i)
                })

            },
            propertyValue(val) {
                this.allPropertyValue = val;
                this.ruleForm.tableData.map((i, index) => {
                    i.propertyValue.value = val
                    Vue.set(this.ruleForm.tableData, index, i)
                })
            },
            OnShelfValue(val) {
                this.allIsOnShelf = val;
                this.ruleForm.tableData.map((i, index) => {
                    i.isUpShelf.value = val
                    Vue.set(this.ruleForm.tableData, index, i)
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
    @import "../../assets/css/userCss/vipUser.css";
    @import "../../assets/css/detail/allDetail.css";

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