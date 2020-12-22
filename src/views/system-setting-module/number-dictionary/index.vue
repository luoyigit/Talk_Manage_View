<template>
    <div>
        <el-card>
            <div style="background-color: white;">
                <div style="display: flex;margin-bottom: 30px;align-items: center">
                    <el-button @click="add">添加</el-button>
                    <el-button @click="edit">编辑</el-button>
                </div>
                <el-tabs :tab-position="tabPosition" @tab-click="chooseTab" closable
                         @tab-remove="removeTab" v-model="tabsName">

                    <el-tab-pane v-for="item in list"
                                 :value="item"
                                 :label="item.name"
                                 :name="item.key+','+item.id">
                        <v-el-table :data="valueList" :columns="columns" :border="true"
                                    :header-cell-style="{background:'#ffffff'}">

                            <template slot="action" slot-scope="scope">
                                <div style="display: flex;justify-content: center">
                                    <el-button v-on:click="editValue(scope.row)">编辑</el-button>
                                    <el-button v-on:click="deletedValue(scope.row)">删除</el-button>
                                </div>
                            </template>
                        </v-el-table>
                        <div style="display: flex;align-items: center;margin-top: 20px">
                            <el-button @click="addValue(item.key)">添加</el-button>
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </div>
        </el-card>
        <pAddDetail ref="pAddDetails" @getData="getData"></pAddDetail>
        <valueAdd ref="valueAdd" @getValuesData="getValuesData"></valueAdd>
    </div>
</template>

<script>
    import mixins from 'mixins/index'
    import serviceApi from 'services/dictionary/index'
    import pAddDetail from './pAdd'
    import valueAdd from './valueAdd'

    export default {
        name: "index",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {
            pAddDetail,
            valueAdd,
        },
        data() {
            return {
                tabPosition: "left",

                list: [],
                valueList: [],
                columns: [

                    {
                        label: '名称(label)',
                        prop: 'name',
                    },
                    {
                        label: '值(value)',
                        prop: 'value',

                    },
                    {
                        label: '排序',
                        prop: 'sortIndex',

                    },

                    {
                        label: '操作',
                        prop: 'action',

                    },

                ],
                type: "",
                tabsName: ""

            }
        },
        created() {
            this.getDicList()
        },
        methods: {
            getDicList() {
                serviceApi.dicList({}).then((data) => {
                        this.list = data;
                        this.tabsName = data[0].key+','+data[0].id;
                    this.type = data[0];
                        this.getValueList(data[0].key)


                    }
                ).catch(() => {
                    this.loading = false
                })
            },


            chooseTab(data) {
                console.log(data)
                this.type = data.$attrs.value;
                this.getValueList(data.$attrs.value.key)
            },
            removeTab(row) {
                let rows = row.split(",")
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let option = {
                        data: {
                            id: rows[1]
                        }
                    }
                    serviceApi.deleteType(option).then((data) => {
                        this.getDicList();
                    }).catch(() => {
                        this.loading = false
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getValueList(key) {
                let option = {
                    data: {
                        dicKey: key
                    }
                }
                serviceApi.getValue(option).then((data) => {
                    this.valueList = data
                }).catch(() => {
                    this.loading = false
                })
            },

            add() {
                this.$refs.pAddDetails.show()
            },
            edit() {
                this.$refs.pAddDetails.show(this.type);
            },
            addValue(key) {
                this.$refs.valueAdd.show(key)
            },
            editValue(row) {
                this.$refs.valueAdd.show(row)
            },
            deletedValue(row) {
                let option = {
                    data: {
                        id: row.id
                    }
                };
                this.$confirm('确定删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    serviceApi.deleteValue(option).then((data) => {
                        this.getValueList(row.dicKey)
                    }).catch(() => {
                        this.loading = false
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            getData(data) {
                console.log(data);
                this.getDicList()
            },
            getValuesData(data) {
                this.getValueList(data)
            },
        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }
</style>