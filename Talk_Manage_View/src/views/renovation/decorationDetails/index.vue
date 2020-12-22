<template>
    <div>
        <el-card>
            <div style="background-color: white;">
                <div style="display: flex;margin-bottom: 30px;align-items: center">
                    <el-button @click="add">添加</el-button>
                    <el-button @click="pEdit">编辑</el-button>
                    <div class="draggableImg">
                        <draggable
                                v-bind="dragOptions"
                                @add="addIcon"
                                :move="getdataIcon"
                                @update="datadragEndIcon"
                                @change="changeIcon"
                                @start="startIcon"
                                @end="endIcon"
                                v-model="collections">
                        </draggable>
                    </div>
                </div>
                <el-tabs :tab-position="tabPosition" v-if="list.length !== 0" @tab-click="chooseTab" closable
                         @tab-remove="removeTab" v-model="tabName">

                    <el-tab-pane v-for="item in pList"
                                 :value="item.id"
                                 :label="item.name"
                                 :name="item.id">

                        <draggable v-model="twoList"
                                   v-bind="dragOptions"
                                   :move="getdata"
                                   @update="datadragEnd"
                                   @change="change"
                                   @start="start"
                                   @end="end"
                                   :sort='false'
                        >
                            <div v-for="i in twoList" style="margin-bottom: 30px;" v-if="item.id == i.pid">
                                <span style="font-size: 15px" @dblclick="edit(i.id)">{{i.name}}</span>
                                <div style="width: 100%;height: 1px;background-color: #e2e2e2;margin-top: 10px"></div>
                                <div style="display: flex;margin-top: 10px;">

                                    <draggable v-model="threeList"
                                               v-bind="dragOptions"
                                               :move="getdata"
                                               @update="datadragEnd"
                                               @change="change"
                                               @start="start"
                                               @end="end"
                                               :sort='false'
                                    >
                                        <div style="text-align: center;margin-right: 20px" v-for="j in threeList"
                                             :key="j.id"
                                             v-if="i.id == j.pid" @dblclick="edit(j.id)">
                                            <img :src="img+j.icon" style="width: 20px;margin-bottom: 10px">
                                            <div style="font-size: 13px">{{j.name}}</div>
                                        </div>

                                    </draggable>
                                </div>
                            </div>
                        </draggable>
                    </el-tab-pane>

                </el-tabs>
            </div>

        </el-card>
        <addDetail ref="addDetails" @getData="getData()"></addDetail>
    </div>
</template>

<script>
    import mixins from 'mixins/index'
    import addDetail from './addDetail'
    import serviceApi from 'services/renovation/index'
    import http from 'utils/http'
    import draggable from 'vuedraggable'

    export default {
        name: "index",
        mixins: [mixins.paginationMixin, mixins.loadingMixin],
        components: {addDetail, draggable},
        data() {
            return {
                tabPosition: "left",
                list: [],
                pList: [],
                twoList: [],
                img: http.downfileurl + '?fileid=',
                dept: "",
                threeList: [],
                collections: [],
                pDetail: "",
                tabName:""

            }
        },
        watch: {
            '$route'() {
                this.getList();//我的初始化方法
            }
        },
        computed: {
            dragOptions() {
                return {
                    animation: 0,
                    group: "description",
                    disabled: false,
                    ghostClass: "ghost"
                }
            }
        },
        mounted() {
            //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
        },
        created() {
            this.getList();
        },
        methods: {

            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            changeIcon: function (evt) {
                console.log(evt)
                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let option = {
                        data: {
                            id: evt.added.element.id
                        }
                    }
                    serviceApi.deleteDecoration(option).then((data) => {
                        this.getList();
                    }).catch(() => {
                        this.loading = false
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                    this.getList();
                });

            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            startIcon: function (evt) {
                console.log(evt)
            },
            endIcon: function (evt) {
                console.log(evt)
                evt.item //可以知道拖动的本身
                evt.to    // 可以知道拖动的目标列表大的1
                evt.from  // 可以知道之前的列表
                evt.oldIndex  // 可以知道拖动前的位置
                evt.newIndex  // 可以知道拖动后的位置
            },
            addIcon(evt) {
                console.log(this.collections)
                console.log(evt + "11")
                console.log(this.collections)
            },

            getdata(evt) {
                console.log(evt)

            },
            datadragEnd(evt) {
                evt.preventDefault();
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                console.log(this.colors);
            },
            //evt里面有两个值，一个evt.added 和evt.removed  可以分别知道移动元素的ID和删除元素的ID
            change: function (evt) {
                console.log(evt)
                if (evt.removed == undefined){
                    this.getList();
                }
            },
            //start ,end ,add,update, sort, remove 得到的都差不多
            start: function (evt) {
                console.log(evt)
            },
            end: function (evt) {
                console.log(evt)
                evt.item //可以知道拖动的本身
                evt.to    // 可以知道拖动的目标列表
                evt.from  // 可以知道之前的列表
                evt.oldIndex  // 可以知道拖动前的位置
                evt.newIndex  // 可以知道拖动后的位置
            },
            getdataIcon(evt) {
                console.log(evt.draggedContext.element.text)
            },
            datadragEndIcon(evt) {
                evt.preventDefault();
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                console.log(this.colors);
            },

            add() {
                this.$refs.addDetails.show()
            },
            pEdit() {
                if (this.pDetail !== "") {
                    this.$refs.addDetails.show(this.pDetail);
                } else {
                    alert("请选择编辑的对象")
                }

            },
            chooseTab(data) {
                console.log(data.$attrs.value)
                this.pDetail = data.$attrs.value;
            },
            getList() {

                this.pList = [];
                this.twoList = [];
                this.threeList = []
                serviceApi.decorationList({}).then((data) => {
                    this.list = data;
                    this.tabName = data[0].id;
                    this.pDetail = this.tabName;
                    for (let i = 0; i <= data.length; i++) {
                        if (data[i].dept == 0) {
                            this.pList.push(data[i])
                        }
                        if (data[i].dept == 1) {
                            this.twoList.push(data[i])
                        }
                        if (data[i].dept == 2) {

                            this.threeList.push(data[i])
                        }
                    }


                }).catch(() => {
                    this.loading = false
                })
            },
            getData(data) {
                this.getList()

            },
            removeTab(id) {


                this.$confirm('确定要删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let option = {
                        data: {
                            id: id
                        }
                    }
                    serviceApi.deleteDecoration(option).then((data) => {
                        this.getList();
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
            edit(id) {
                this.$refs.addDetails.show(id)


            },

        }
    }
</script>

<style scoped lang="scss">
    /deep/ .el-tabs--left .el-tabs__header.is-left {

        margin-right: 30px;
    }

    /deep/ .el-tabs__item {
        font-size: 16px !important;
    }

    /deep/ .el-tabs__item {

        height: 60px;
    }

    .draggableImg {
        font-size: 50px;
        /*position: fixed;*/
        /*right: 40px;*/
        margin-left: 20px;
        width: 30px;
        height: 30px;
        background-size: 30px;
        background-image: url("../../../assets/move_icon.png");
    }

</style>