<!--  -->
<template>
    <div class='box-card' >
        <el-row class="info-wrap">
            <el-card class='base-info' ref="bigbox">
                <div slot="header">
                    <span class="card-title">配置角色权限：{{userName}}</span>
                </div>
                <div class='bigbox'>
                    <div class='tableTitle'>
                        <div class='title'>模块</div>
                        <div class='title big'>权限</div>
                    </div>
                    <div class='clear'></div>
                    <role-check   
                        :formData='formData'
                        @set-prant="setPrant"
                        @set-prant-fun="setPrantFun"></role-check>
                </div>
            </el-card>
        </el-row>
    </div>
</template>

<script>
import RoleCheck from './role-check'
import RoleManage from 'services/role-manage/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.loadingMixin],
     components: {
        RoleCheck
    },
     props: {
        userName: {
            type: String,
            default: ''
        },
        roleId: {
            type: String,
            default: ''
        },
        roleForm: {
            type: Object,
            default: null
        }
    },
    data() {
        return{
               formData: [],
                 usersForm: {
                roleList: [], //获取到的角色功能权限
                roleMenuList: [], //获取到的角色菜单权限
            }, //角色已拥有的
        }
    },
    methods: {
               // 获取权限树
        getAllList() {
            let opt = {
                Id: this.roleId,
                loading: {target: this.bigboxEl}
            }
            this.loading = true;
            Promise.all([RoleManage.getMenuList(), RoleManage.getRole(opt), RoleManage.getMenu(opt)]).then(([menuList, roleList, roleMenuList]) => {
                this.loading = false;
                this.formData = menuList
                this.usersForm.roleList = roleList
                this.usersForm.roleMenuList = roleMenuList
                this.setMenuFun(roleMenuList, roleList)
            })
        },
        //初始化已有数据
        setMenuFun(menuList, funList) {
            this.addCheckList(this.formData, menuList)
            this.addCheckList(this.formData, funList)
        },
        //处理数据，分离出添加的菜单，删除的菜单，添加的功能，删除的功能
        setSaveData() { 
            return new Promise((resolve, reject) => {
                this.setData(this.formData)
                resolve()
            }).catch(() => {
                // reject()
            })
        },
        setData(data) {
            data.forEach(element => {
                if(element.checkList.some(ids => ids === element.id)) { //判断是否勾选,true则是勾选
                    //勾选的，有可能是添加的、已存在的
                    if(!this.usersForm.roleMenuList.some(roMenu => roMenu == element.id)) { //添加的
                        if(element.type === 0) { //菜单
                            this.roleForm.addMenuIds.push(element.id)
                        }
                    }
                    if(!this.usersForm.roleList.some(roList => roList === element.id)) { //添加的
                        if(element.type === 1) { //功能
                            this.roleForm.addFunctionIds.push(element.id)
                        }
                    }
                }else{
                    //未勾选的，有可能是删除的
                    if(this.usersForm.roleMenuList.some(roMenu => roMenu === element.id)) { //原本存在
                        if(element.type === 0) { //菜单
                            this.roleForm.removeMenuIds.push(element.id)
                        }
                    }
                    if(this.usersForm.roleList.some(roList => roList === element.id)) { //原本存在
                        if(element.type === 1) { //功能
                            this.roleForm.removeFunctionIds.push(element.id)
                        }
                    }
                }
                if(element.children) {
                    this.setData(element.children)
                }
            })
        },
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
    },
     mounted() {
        this.bigboxEl = this.$refs.bigbox.$el
        this.getAllList()
    },
}
</script>
<style lang='scss' scoped>
.box-card{
    .base-info,
        .detail-info{
            margin-bottom: $spacing-sm;
        }
        .form-info.btn-wrap{
            text-align: center;
        }
        .base-info,
            .form-info{
                min-height: 0px;
            }
}
.title_buttom{
    border-bottom:2px solid $color-first-border;
}
.bigbox{
    color: #606266;
    line-height: 35px;
    .tableTitle{
        font-size: $font-size-small;
        border-bottom: 1px $color-first-border solid;
        color: #909399;
        height: 35px;
        .title{
            float: left;
            width: 30%;
            .big{
                width: 70%;
            }
        }
    }
}
.clear{
    clear: both;
}
</style>