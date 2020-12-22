<template>
      <treeselect v-model="dept" placeholder="可输入部门名称搜索" :multiple="multiple" :options="departments" />
</template>

<script>
import deptApi from 'services/dept-manage/index'
import {createDept} from 'viewModel/department'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    name: 'select-departments',
    components:{
       Treeselect
    },
    props: {
        value: {
            // 绑定值
            type: [Object, Array],
            default: null
        },
        placeholder: {
            type: String,
            default: '请选择'
        },
        showClose: {
            type: Boolean,
            default: false
        },
        multiple: {
            // 是否多选
            type: Boolean,
            default: false
        },
    },
    watch: {
        
    },
    computed: {
        dept: {
            get: function() {
                return this.value
            },
            set: function(val) {
                // if(!this.multiple){
                //    return  this.$emit('input', [val])
                // } else{
                //      return this.$emit('input', val)
                // }
                if(Array.isArray(val)){
                  return this.$emit('input', val)
                } else {
                    var v = []
                    v.push(val)
                    return this.$emit('input', v)
                }
                
            }
        },
        showResult() {
            if (this.multiple) {
                return this.value.length > 0 ? ' ' : ''
            } else {
                return this.value && this.value.name ? this.value.name : ''
            }
        },
    },
    data() {
        return {
            departments: [],
            propValue: this.dept
        }
    },
    methods: {
        // 获取部门列表
        getDeptList() {
            deptApi.getDeptTreeList().then(data => {
                this.departments = data
            })
        },
    },
    mounted() {
       
    },
    created() {
        this.getDeptList()
    },
}
</script>

<style lang="scss" scoped>
.tree-wrap{
    height: 270px;
    overflow-x: hidden;
    box-sizing: border-box;
    .scroll{
        height: 100%;
        & /deep/ .el-scrollbar__wrap{
            overflow: auto
        }
    }
}
.refer-wrap{
    position: relative;
    .close-icon{
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        font-size: $font-size-small;
        cursor: pointer;
        color: $color-danger;
    }
    .multiple-result{
        position: absolute;
        left: 0;
        right: 0;
        top: 0px;
        bottom: 0;
        padding: 0 5px;
        border: 1px solid transparent;
        border-radius: 4px;
        min-height: 30px;
        line-height: 30px;
        cursor: pointer;
        z-index: 1;
        &.active{
            border: 1px solid $color-primary;
        }
        .tag-wrap{
            min-height: 30px;
            .tag{
                margin-right: 5px
            }
        }
    }
    & /deep/ .el-input__inner{
        cursor: pointer
    }
}
</style>