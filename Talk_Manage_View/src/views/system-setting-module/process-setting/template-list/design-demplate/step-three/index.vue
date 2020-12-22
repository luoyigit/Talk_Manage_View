<template>
  <div class="process-form-step-three">
    <div class="left">
      <el-card class="card">
        <div slot="header">
          <span class="card-title">基本信息</span>
        </div>
        <pms-form-info :items="items" :form-data="formData" :label-width="80">
          <span slot="formId">{{ formData.formName }}</span>
        </pms-form-info>
      </el-card>
      <el-card class="card">
        <div slot="header">
          <span class="card-title">流程条件</span>
        </div>
        <p class="condition-text" v-for="(item, index) in conditionText" :key="`${item}-${index}`">
          {{ item }}
        </p>
      </el-card>
    </div>
    <div class="right">
      <div class="design" id="show-design"></div>
    </div>
  </div>
</template>

<script>
import {stringToConditions} from 'viewModel/condition'
import FlowDisplay from 'utils/flow-display'
import formApi from '@/services/FormService/index'

export default {
  props: {
    formData: {
      type: Object,
    },
  },
  computed: {
    conditionText() {
      return this.conditions.map((item) => {
        return item.field.label + item.operatorName + item.val + item.linkName
      })
    },
  },
  data() {
    return {
      fieldList: [],
      conditions: [],
      designer: null,
      items: [
        {
          label: '表单',
          prop: 'formId',
        },
        {
          label: '流程名称',
          prop: 'name',
        },
        {
          label: '备注',
          prop: 'remark',
        },
      ],
    }
  },
  methods: {
    getFieldList() {
      formApi.getFormField(this.formData.formId).then((data) => {
        this.fieldList = data
        //this.conditions = stringToConditions(this.fieldList, this.formData.conditionString)
      })
    },
    init() {
      this.designer = new FlowDisplay('show-design')
      this.designer.loadFlow(this.formData.design)
    },
  },
  created() {
    this.getFieldList()
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.process-form-step-three {
  margin: 0 auto;
  .left {
    width: 300px;
    float: left;
    height: 600px;
    .card {
      box-shadow: 0 0 0 0;
      margin-bottom: $spacing-md;
      .condition-text {
        font-size: $font-size-small;
        margin-bottom: $spacing-xs;
      }
    }
  }
  .right {
    height: 600px;
    margin-left: 320px;
    overflow: hidden;
    .design {
      box-sizing: border-box;
      border: solid 1px #e6e6e6;
      min-height: 600px;
    }
  }
}
</style>
