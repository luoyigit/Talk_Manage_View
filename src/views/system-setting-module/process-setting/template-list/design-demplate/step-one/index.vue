<template>
  <!-- <v-el-grid-between>
        <p class="title" slot="left">基本信息</p>
        <el-form
            slot="left"
            ref="form"
            status-icon
            :model="formData"
            :rules="formRules"
            label-width="100px">
            <v-el-form :form-data="formData" :items="items"></v-el-form>
        </el-form>
        <p class="title" slot="right">设置条件</p>
        <pms-composite-query
            slot="right"
            ref="query" 
            :valid="false"
            :form-id="formData.formId"
            :condition-string="formData.conditionString"
            @found-form-fields="getFieldsList">
        </pms-composite-query>
    </v-el-grid-between> -->
  <el-row>
    <el-col :offset="6" :span="12">
      <p class="title">基本信息</p>
      <el-form ref="form" status-icon :model="formData" :rules="formRules" label-width="100px">
        <v-el-form :form-data="formData" :items="items">
          <!-- <template slot="formType">
              <el-select v-model="formData.id" placeholder="请选择">
                <el-option
                  v-for="item in formList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </template> -->
        </v-el-form>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import formApi from '@/services/FormService/index'

export default {
  props: {
    formData: { type: Object },
  },
  data() {
    return {
      formRules: {
        formId: [{ required: true, message: '请选择表单', trigger: 'change' }],
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
      },
      formList:[]
    }
  },
  computed: {
    items() {
      return [
        {
          label: '表单',
          prop: 'formId',
          component: {
            name: 'v-el-select',
            attrs: {
              options: this.formList ? this.formList.map((item) => {
                return {
                  label: item.name,
                  value: item.id,
                }
              }):[],
              placeholder: '请选择表单',
            },
          },
        },
        {
          label: '模板名称',
          prop: 'name',
          component: {
            name: 'el-input',
          },
        },
        {
          label: '备注',
          prop: 'remark',
          component: {
            name: 'el-input',
            attrs: {
              type: 'textarea',
              rows: 6,
            },
          },
        },
      ]
    },
  },
  watch: {
    'formData.formId': function(val) {
      this.getFieldsList(val)
      // this.getSubProcessFunctions()
    },
  },
  methods: {
    validate() {
      return new Promise((resolve, reject) => {
        this.$refs.form
          .validate()
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    // 发送条件字符串
    sendCondition() {
      return new Promise((resolve, reject) => {
        // this.$refs.query.sendData().then(condition => {
        //     resolve(condition)
        // }).catch(() => {
        //     reject()
        // })
        resolve('')
      })
    },
    // 获取权限字段
    getFieldsList(formId) {
      // this.formData.fieldList = list
      console.log('fff', formId)
      formApi.getFormField(formId).then((data) => {
        this.formData.fieldList = data
      })
    },
    // 获取子流程方法列表
    getSubProcessFunctions() {
      this.formData.subProcessFunctions = [
        { label: '方法1', value: 1 },
        { label: '方法2', value: 2 },
      ]
    },
  },
  created(){
         formApi.getFormList().then((data) => {
          this.formList = data
        })
  }
}
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: $font-size-small;
  margin-bottom: $spacing-md;
}
</style>
