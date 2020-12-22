<template>
    <div class="composite-query-director">
        <!-- <el-row class="condition-row">
            <el-col :span="7" class="title cell">字段</el-col>
            <el-col :span="5" class="title cell">运算符</el-col>
            <el-col :span="7" class="title cell">值</el-col>
        </el-row> -->
        <el-form
            v-for="(condition, index) in conditions"
            :key="`${condition.fieldCode}-${index}`"
            ref="conForm"
            status-icon
            :model="condition"
            :rules="formRules"
        >
            <el-row class="condition-row">
                <el-col :span="7" class="cell">
                    <!-- 字段选择 -->
                    <el-form-item prop="fieldCode">
                        <el-select
                            class="input-box"
                            v-model="condition.field"
                            placeholder="字段"
                            value-key="code"
                            @change="fieldChange($event, condition)"
                        >
                            <el-option v-for="item in fieldList" :key="item.code" :label="item.name" :value="item"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" class="cell">
                    <!-- 运算符 -->
                    <el-form-item prop="operator">
                        <el-select v-model="condition.operator" placeholder="运算符" class="input-box">
                            <el-option v-for="item in condition.operators" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="7" class="cell">
                    <!-- 设置值 -->
                    <el-form-item prop="val">
                        <el-input
                            v-if="condition.field.type === 1 || condition.field.type === '1'"
                            v-model="condition.val"
                            type="number"
                            class="input-box"
                        >
                        </el-input>
                        <el-input
                            v-if="condition.field.type === 2 || condition.field.type === '2' || !condition.field.type"
                            v-model="condition.val"
                            class="input-box"
                        >
                        </el-input>
                        <el-date-picker
                            v-if="condition.field.type === 3 || condition.field.type === '3'"
                            v-model="condition.val"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                            class="input-box"
                        >
                        </el-date-picker>
                        <el-select
                            v-if="condition.field.type === 4 || condition.field.type === '4'"
                            class="input-box"
                            v-model="condition.val"
                            placeholder="请选择"
                        >
                            <el-option v-for="item in condition.field.options" :key="item.val" :label="item.label" :value="item.val"> </el-option>
                        </el-select>
                        <el-select
                            v-if="condition.field.type === 5 || condition.field.type === '5'"
                            v-model="condition.val"
                            filterable
                            remote
                            placeholder="请输入关键词"
                            :remote-method="searchResult"
                            :loading="loading"
                            class="input-box"
                        >
                            <el-option v-for="item in filterOptions" :key="item.val" :label="item.label" :value="item.val"> </el-option>
                        </el-select>
                        <el-select v-if="parseInt(condition.field.type) === 6" class="input-box" v-model="condition.val" placeholder="请选择">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="5" class="cell">
                    <!-- 设置连接类型 -->
                    <el-form-item prop="linkType">
                        <el-select v-model="condition.linkType" @change="linkTypeChange($event, index)">
                            <el-option label="无" value="0"> </el-option>
                            <el-option label="并且" value="1" :disabled="currentLinkType === '2'"> </el-option>
                            <el-option label="或者" value="2" :disabled="currentLinkType === '1'"> </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-button class="remove-btn mini-size" icon="el-icon-minus" circle type="danger" @click="removeCondition(index)" v-if="index > 0">
                </el-button>
            </el-row>
        </el-form>
    </div>
</template>

// <script>
import { initCondition, initField, getConditionString, stringToConditions } from 'viewModel/condition'
import pageFieldApi from 'services/pages-setting/index'
import formApi from 'services/FormService/index'
import commonApi from 'services/common/index'

export default {
    name: 'pms-composite-query',
    props: {
        formId: {
            // 表单字段查询id
            type: String,
            default: '',
        },
        searchCode: {
            // 页面字段查询code
            type: String,
            default: '',
        },
        conditionString: {
            // 条件字符串
            type: String,
            default: '',
        },
        valid: {
            // 是否开启验证
            type: Boolean,
            default: true,
        },
    },
    watch: {
        formId(val) {
            this.clearConditions()
            this.init()
        },
        searchCode(val) {
            this.clearConditions()
            this.init()
        },
    },
    data() {
        let checkValue = (rule, value, callback) => {
            if (value === '') {
                return callback(new Error('不能为空'))
            }
            if (typeof value === 'string') {
                if (value.includes('&')) {
                    return callback(new Error('不能包含&字符'))
                }
                if (value.includes('|')) {
                    return callback(new Error('不能包含|字符'))
                }
            }
            callback()
        }
        return {
            conditions: [], // 条件数据
            fieldList: [], // 字段列表
            formRules: {
                fieldCode: [{ required: true, message: '请选择条件字段', trigger: 'change' }],
                operator: [{ required: true, message: '请选择运算符', trigger: 'change' }],
                val: [{ validator: checkValue, trigger: 'change' }],
            },
            loading: false, // 远程搜索时的loading
            searchOptions: [], // 远程搜索的所有选项
            filterOptions: [], // 远程搜索过滤的结果
            // operators:[
            //     {}
            // ]
        }
    },
    computed: {
        currentLinkType() {
            return this.conditions[0] ? this.conditions[0].linkType : '0'
        },
    },
    methods: {
        // 远程搜索
        searchResult(query) {
            if (query !== '') {
                this.filterOptions = this.searchOptions.filter((item) => item.label.includes(query))
            } else {
                this.filterOptions = [].concat(this.searchOptions)
            }
        },
        // 删除条件
        removeCondition(index) {
            let len = this.conditions.length
            if (index === len - 1) {
                this.conditions[index - 1].linkType = '0'
            }
            this.conditions.splice(index, 1)
        },
        // 清空条件
        clearConditions() {
            this.conditions = []
            this.conditions.push(initCondition())
            this.$nextTick(() => {
                this.$refs['conForm'][0].clearValidate()
            })
        },
        // 校验
        validate() {
            if (this.valid) {
                let result = true
                this.$refs['conForm'].forEach((item) => {
                    item.validate((valid) => {
                        if (!valid) {
                            result = false
                            return
                        }
                    })
                })
                return result
            } else {
                return true
            }
        },
        // 发送数据
        sendData() {
            if (this.validate()) {
                let result = getConditionString(this.conditions)
                return Promise.resolve(result)
            } else {
                return Promise.reject()
            }
        },
        // 清空数据
        clearData() {
            this.fieldList = []
            this.conditions = []
        },
        // 连接类型转换
        linkTypeChange(val, index) {
            if (val !== '0') {
                this.conditions.push(initCondition())
            }
            if (val === '0' && this.conditions.length > 1) {
                let start = this.conditions.length - 1
                this.conditions.splice(index + 1)
            }
        },
        // 切换字段
        fieldChange(field, condition) {
            console.log('qieh')
            condition.operator = ''
            condition.val = ''
            if (field.type === 5 || field.type === '5') {
                commonApi.getRemoteResult(field.remoteUrl).then((data) => {
                    this.searchOptions = [].concat(data)
                    this.filterOptions = [].concat(data)
                })
            }
            this.$nextTick(() => {
                this.$refs['conForm'].forEach((item) => {
                    item.clearValidate()
                })
            })
        },
        changeString() {
            // console.log('ttttasdasdadsasd',this.conditionString)
            if (this.conditionString) {
                this.conditions = stringToConditions(this.fieldList, this.conditionString)
                console.log('this.confitions',this.conditions)
            } else {
                this.clearConditions()
            }
            //  this.clearConditions()
        },
        // 获取表单字段
        getFormFields() {
            formApi.getFormField(this.formId).then((data) => {
                this.fieldList = data
                this.$emit('found-form-fields', data)
                this.changeString()
            })
        },
        // 获取页面查询字段
        getPageFields() {
            let opt = {
                code: this.searchCode,
                // loading: {target: this.dicFormEl}
            }
            pageFieldApi.getPageFields(opt).then((data) => {
                this.fieldList = data

                this.changeString()
              
            })
        },
        init() {
            if (this.searchCode) {
                this.getPageFields()
            }
            if (this.formId) {
                this.getFormFields()
            }
        },
    },
    created() {
        this.init()
    },
}
</script>

<style lang="scss" scoped>
.composite-query-director {
    & /deep/ .el-form-item {
        margin-bottom: 0;
    }
    .condition-row {
        position: relative;
        padding-right: 40px;
        font-size: $font-size-small;
        margin-bottom: $spacing-md;
        .cell {
            padding: 0 $spacing-xs;
        }
        .title {
            text-align: center;
        }
        .input-box {
            width: 100%;
        }
        .remove-btn {
            position: absolute;
            // top: 3px;
            right: 9px;
        }
    }
}
</style>
