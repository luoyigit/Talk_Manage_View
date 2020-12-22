<!--  -->
<template id="role-check">
    <div class="big-box"
        v-if="formData">
        <el-row
            v-for='item in formData'
            class="rowBox"
            :key='item.id'>
            <el-checkbox-group
                v-if='item.type === 0'
                v-model="item.checkList"
                class='father'
                :style="`padding-left: ${30*item.depth}px;`"
                @change="handleMenuChange(item.checkList, item.id)">
                <el-checkbox 
                    :indeterminate="item.isIndeterminate" 
                    :label="item.id" >
                    {{item.label}}
                </el-checkbox>
            </el-checkbox-group>
            <div class="sonBox" v-if='item.type === 0&&item.children.some(it => it.type === 1)'>
                <div v-for="its in item.children"
                    :key="its.id"
                    class='son'>
                    <el-checkbox-group 
                        v-model="its.checkList"
                        @change="handleAllChange(its.checkList, its.id)">
                        <el-checkbox 
                            v-if="its.type === 1"
                            :label="its.id">{{its.label}}</el-checkbox>
                    </el-checkbox-group>
                </div>
            </div>
            <role-check         
                :formData="item.children"
                @set-prant="setPrant"
                @set-prant-fun="setPrantFun"></role-check>
        </el-row>
    </div>
</template>

<script>
import RoleManage from 'services/role-manage/index'
import mixins from 'mixins/index'
export default {
     name: 'role-check',
     props: {
        formData: {
            type: Array,
            default: () => []
        },
    },
    data() {
        return{
        }
    },
    methods: {
        //菜单
        handleMenuChange(checkList, id) {
            this.$emit('set-prant-fun', checkList, id)
        },
        //选择菜单，自动勾选功能函数
        setPrantFun(item, id) {
            if(item.some(it => it === id)) { //选择时
                if(item.parentId) {
                    this.$emit('set-prant-fun', item)
                }
                if(item.length > 0) {
                    let index = item.findIndex(it => it === id) //当前勾选id
                    this.findParentId(this.formData, item[index]) //获取当前勾选id的parentId,并勾选下级
                }
            }else { //取消时
                this.setMenuCancel(this.formData, id)
            }
        },
        //选择菜单，自动取消勾选
        setMenuCancel(data, id) { //需要递归的数组， id当前
            data.forEach((item, index) => {
                if(item.id === id) {
                    if(item.parentId.length > 0) {
                        if(item.children) {
                            this.cancelAll(item.children)
                        }
                        this.cancelPrant(this.formData, item.parentId)
                    }else if(item.parentId == 0) { //第一级
                        if(this.formData[index].children) {
                            item.isIndeterminate = false
                            this.cancelAll(this.formData[index].children)
                        }
                    }
                }else {
                    if(item.children) {
                        this.setMenuCancel(item.children, id)
                    }
                }
            })
        },
        //取消或半选择状态
        cancelPrant(data, ids) {
            ids.forEach(id => {
                data.forEach(item => {
                    if(item.id === id) {
                        //判断当前子集是否被选中，是则半选择，否则取消
                        if(item.children) {
                            if(this.searchList(item.children)) {
                                item.isIndeterminate = true
                            }else {
                                let index = item.checkList.findIndex(it => it === item.id)
                                item.checkList.splice(index, 1)
                                item.isIndeterminate = false
                            }
                        }
                    }else{
                        if(item.children) {
                            this.cancelPrant(item.children, ids)
                        }
                    }
                })
            })
        },
        //循环判断子集是否被选中
        searchList(data) {
            for(let i = 0; i < data.length; i++) {
                if(data[i].checkList.some(it => it == data[i].id)) {
                    return true
                }else {
                    if(data[i].children) {
                        this.searchList(data[i].children)
                    }else {
                        return false
                    }
                }
            }
        },
        //循环取消
        cancelAll(data) {
            data.forEach(item => {
                let index = item.checkList.findIndex(it => it === item.id)
                item.checkList.splice(index, 1)
                item.isIndeterminate = false
                if(item.children) {
                    this.cancelAll(item.children)
                }
            })
        },
        
        //找到当前勾选id的parentId,并勾选下级
        findParentId(data, id) {
            data.forEach(ie => {
                if(ie.id === id) {
                    if(ie.parentId.length > 0) {
                        ie.parentId.forEach(it => {
                            ie.checkList.push(it) //选择id列表
                        })
                        this.addCheckList(this.formData, ie.checkList, id)
                        if(ie.children) {
                            this.addAllCheck(ie.children)
                        }
                    }else if(ie.parentId == 0) { //第一级
                        this.formData.forEach(item => {
                            if(item.id == id) {
                                if(item.children) {
                                    this.addAllCheck(item.children) //找到id所在位置，遍历id下的层级
                                }
                            }
                        })
                    }    
                }else {
                    if(ie.children) {
                        this.findParentId(ie.children, id)
                    }
                }
            })
        },
        //parentId组自身id添加checkList
        addCheckList(data, parentIds, NoId) {
            data.forEach(ie => {
                parentIds.forEach(itemId => {
                    if(itemId == ie.id && itemId != NoId) {
                        if(!ie.checkList.some(it => it === itemId)) {
                            ie.checkList.push(itemId)
                        }
                    }else{
                        if(ie.children) {
                            this.addCheckList(ie.children, parentIds, NoId)
                        }
                    }
                })
            })
        },
        //勾选层级为第一级，循环勾选底下层级
        addAllCheck(data) {
            data.forEach(item => {
                if(!item.checkList.some(it => it === item.id)) {
                    item.checkList.push(item.id)
                }
                if(item.children) {
                    this.addAllCheck(item.children)
                }
            })
        },
        //功能组
        handleAllChange(item, id) {
            this.$emit('set-prant', item, id) //勾选父级
        },
        //选择功能，自动勾选父级菜单函数
        setPrant(item, id) {
            if(item.some(ids => ids === id)) { //选择时
                if(item.length > 0) {
                    let index = item.findIndex(it => it === id) //当前勾选id
                    this.findParentId(this.formData, item[index]) //获取当前勾选id的parentI,并勾选下级
                }
            }else{ //取消时
                this.findFunParentId(this.formData, id)
            }
        },
        //找到改功能的parentId，并取消选择
        findFunParentId(data, id) {
            data.forEach(item => {
                if(item.id === id) {
                    let prans = []
                    this.setParentId(this.formData, item.parentId, prans)
                    prans.reverse()
                    this.cancelPrant(this.formData, prans)
                }else{
                    if(item.children) {
                        this.findFunParentId(item.children, id)
                    }
                }
            })
        },
        //排序parentId, 确保parentId的层级关系正确
        setParentId(data, ids, prans) {
            data.forEach(item => {
                ids.some(id => {
                    if(item.id === id) {
                        prans.push(id)
                        return true
                    }
                })
                if(item.children) {
                    this.setParentId(item.children, ids, prans)
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.rowBox,
.father,
.son{
    line-height: 40px;
    &>>>.el-checkbox__label{
        font-size: $font-size-small;
    }
    .el-checkbox{
        z-index: 999;
    }
}
.father{
    border-bottom: 1px $color-first-border solid;
}
.big-box    
.rowBox{
    overflow: hidden;
    position: relative;
    font-size: $font-size-small;
    .sonBox{
        padding-left: 30%;
        border-bottom:  1px $color-first-border solid;
        position: absolute;
        top: -0.01px;
        .son{
            display: inline-block;
            margin-right: 20px;
            &>>>.el-checkbox{
                margin-right: 40px;
                font-size: $font-size-small;
            }
            &>>>.el-checkbox-group{
                display: inline;
                overflow: hidden;
            }
        }
    }
    .el-checkbox.father{
        width: 100%;
    }
}
.clear{
    clear: both;
}
</style>
