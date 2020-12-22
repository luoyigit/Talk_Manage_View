<template>
    <div class="condition-search" ref="dicForm">


        <el-input
            placeholder="请输入内容"
            v-model="keyword"
            ref="dicForm"
            @keyup.enter.native="search"
            class="input-with-select">
            <el-select
                v-model="field"
                slot="prepend"
                value-key="code"
                placeholder="请选择"
                class="select">
                <el-option
                    v-for="item in options"
                    :key="item.code"
                    :label="item.name"
                    :value="item">
                </el-option>
            </el-select>
            <el-button
                slot="append"
                icon="el-icon-search"
                class="search"
                @click="search" >
            </el-button>
        </el-input>
    </div>
</template>

<script>
import pageFieldApi from 'services/pages-setting/index'
import {createConditionSearch} from 'viewModel/condition'

export default {
    name: 'pms-condition-search',
    props: {
        searchCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            field: null,
            keyword: '',
            options: [] ,// 选项数据

        }
    },
    watch: {
        searchCode() {
            this.init()
        }
    },
    mounted() {
        this.dicFormEl = this.$refs.dicForm.$el
    },
    methods: {
        clearData() {
            this.keyword = ''
        },
        validate() {
            let result = false
            if (!this.field) {
                this.$message({type: 'warning', message: '请选择搜索字段'})
                return result
            }
            if (this.keyword.includes('&')) {
                this.$message({type: 'warning', message: '包含非法字符&'})
                return result
            }
            if (this.keyword.includes('|')) {
                this.$message({type: 'warning', message: '包含非法字符|'})
                return result
            }
            result = true
            return result
        },
        search() {
            if (this.validate()) {
                let ret = ''
                if (this.keyword) {
                    ret = this.field.code + this.field.operator + this.keyword
                }
                console.log('ret', ret)
                this.$emit('setRight', ret)
                this.$emit('search')
            }
        },
        init() {
            if (this.searchCode) {
                let opt = {
                    code: this.searchCode,
                    // loading: {target: this.dicFormEl}
                }
                pageFieldApi.getPageFields(opt).then(data => {
                    let ret = data.map(item => createConditionSearch({
                        code: item.code,
                        name: item.label,
                        type: item.type
                    }))
                    this.options = ret.filter(item => item.type === 1 || item.type === '1' || item.type === 2 || item.type === '2')
                    this.field = this.options.length > 0 ? this.options[0] : null
                    this.keyword = ''
                })
            }
        },
    },
    created() {
        this.init()
    }
}
</script>

<style lang='scss' scoped>
.condition-search{
    display: inline-block;
    vertical-align: top;
    margin: 0 10px;
    .input-with-select{
        .select{
            width: 130px;
        }
    }
}
</style>