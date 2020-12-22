<template>
    <div style="display: flex">
        <!--左边--->
        <div>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span style="font-size: 18px">角色列表</span>
                    <!--<el-button style="float: right; padding: 3px 0" type="text" v-on:click="addRole()">添加</el-button>-->
                </div>
                <el-menu
                        :default-active="roleId"
                        class="el-menu-vertical-demo" @select="chooseMenu">
                    <el-menu-item v-for="(item,indedx) in roleList" :key="indedx" :index="item.id">
                        <span slot="title">{{item.roleName}}</span>
                    </el-menu-item>
                </el-menu>
            </el-card>
        </div>
        <!--右边--->
        <div style="margin-left: 20px;width: 100%;" class="card" v-if="roleId !== ''">
            <div style="line-height: 40px;display: flex">
                <div style="font-size: 17px;margin-left: 10px;width: 10%">权限</div>
                <div style="display: flex;width: 40%">
                    <div style="font-size: 15px;margin-right: 5px">客户端</div>
                    <div>
                        <el-select v-model="select" placeholder="请选择" size="mini" @change="changeSelect">
                            <el-option
                                    v-for="item in clientList"
                                    :key="item.id"
                                    :label="item.clientName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div style="margin-right: 5px;display: flex;justify-content: flex-end;width: 50%">
                    <el-button style="margin: 5px" v-on:click="preservation()">保存</el-button>
                </div>
            </div>
            <div>

                <el-table
                        :data="treeList"
                        style="width: 100%" :border="true"
                        :header-cell-style="{background:'#ffffff'}" :row-style="{background:'#ffffff'}"
                        :show-header="false">
                    <el-table-column
                            prop="label"
                            label=""
                            width="200">
                        <template slot-scope="scope">
                            <span>{{scope.row.label}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                            label=""
                            prop="children">
                        <template slot-scope="scope">
                            <el-table :header-cell-style="{background:'#ffffff'}" :row-style="{background:'#ffffff'}"
                                      :show-header="false" :data='scope.row.children' :border="false">
                                <el-table-column
                                        label=""
                                        prop="label">
                                    <template slot-scope="scoped">
                                        <el-checkbox-group v-model="checkList" @change="changed(scoped.row)">
                                            <el-checkbox :label="scoped.row.id">{{scoped.row.label}}</el-checkbox>
                                        </el-checkbox-group>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="children"
                            label="">
                        <template slot-scope="scope">
                            <div v-for="(item, index) in scope.row.children" :key="index">
                                <el-table :header-cell-style="{background:'#ffffff'}"
                                          :row-style="{background:'#ffffff'}"
                                          :show-header="false" :data='item.children' :border="false">
                                    <el-table-column
                                            label=""
                                            prop="label">
                                        <template slot-scope="scoped">
                                            <el-checkbox-group v-model="checkList">
                                                <el-checkbox :label="scoped.row.id">{{scoped.row.label}}</el-checkbox>
                                            </el-checkbox-group>
                                        </template>
                                    </el-table-column>
                                </el-table>

                            </div>

                            <!--<div style="display: flex">-->
                            <!--<el-checkbox-group v-model="threeCheckList">-->
                            <!--<div v-for="(item, index) in scope.row.children" :key="index">-->
                            <!--<el-checkbox :label="i.label" v-for="(i, index) in item.children"-->
                            <!--:key="index"></el-checkbox>-->
                            <!--</div>-->
                            <!--</el-checkbox-group>-->
                            <!--</div>-->
                        </template>
                    </el-table-column>
                </el-table>

            </div>

        </div>
    </div>
</template>

<script>
    import RoleApi from 'services/role-manage/index'

    export default {
        name: "index",
        data() {
            return {
                treeList: [],
                columns: [
                    {
                        label: '',
                        prop: 'label',
                        attrs: {width: '200'},
                    },
                    {
                        label: '',
                        prop: 'children',
                        // attrs: {width: '200'},
                    },


                ],
                select: "",
                roleList: [],
                childrenId: "",
                roleId: "1",
                clientList: [],
                checkList: [],
            }
        },
        created() {
            this.getData();
            this.getClient();
        },
        methods: {

            changed(row) {//获取权限
                console.log(this.checkList)
                row.children.forEach((item) => {
                    this.checkList = this.checkList.filter(res => item.id !== res)
                })
            },


            //获取角色列表数据
            getData() {
                let opt = {
                    data: {
                        pageSize: -1
                    }
                }

                RoleApi.getAllRoleList(opt).then(data => {
                    this.roleList = data.dataList
                })
            },
            getTree() {
                let opt = {
                    clientId: this.childrenId
                }

                RoleApi.typeTree(opt).then(data => {
                    this.treeList = data;
                })
            },
            getClient() {
                RoleApi.client({}).then(data => {
                    this.clientList = data;
                    for (let i = 0; i <= this.clientList.length - 1; i++) {
                        this.childrenId = this.clientList[0].id;
                        this.select = this.clientList[0].id;
                    }
                    this.getTree()
                    this.getRoleQx()
                })

            },
            changeSelect(row) {
                this.childrenId = row;
                this.getRoleQx();
                this.getTree();

            },
            getRoleQx() {
                let opt = {
                    roleId: this.roleId,
                    clientid: this.childrenId
                }
                RoleApi.getRoleMenus(opt).then((data) => {
                    this.checkList = data
                }).catch(function (error) {
                    console.log(error);
                })
            },
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },
            chooseMenu(row) {
                this.roleId = row;
                // this.select =  "";
                // this.childrenId =  "";
                // this.getTree();
                this.getRoleQx();
            },
            preservation() {

                let option = {
                    clientId: this.childrenId,
                    roleId: this.roleId,
                    menuIdList: this.checkList
                };
                RoleApi.addRoleQx(option).then(data => {

                })
            },
            addRole() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 250px;

    }

    .card {
        border: 1px solid #EBEEF5;
        background-color: #FFF;
        color: #303133;
        transition: .3s;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
        border-radius: 4px;
        overflow: hidden;
    }

    /deep/ .el-menu {
        border-right: 0px;

    }

    /deep/ .el-input--mini .el-input__icon {
        line-height: 40px;
    }

    /deep/ .el-table th,
    /deep/ .el-table td {
        text-align: center !important;
    }
</style>