<template>
  <el-card>
    <div slot="header">
      <span class="card-title">流程设计</span>
      <div class="right">
        <el-button circle icon="el-icon-plus" size="mini" @click="backToList"> </el-button>
      </div>
    </div>
    <layout-step-form
      ref="root"
      :steps="steps"
      :active-step="activeStep"
      v-loading="loading"
      :element-loading-text="loadingText"
      :element-loading-spinner="loadingSpinner"
    >
      <keep-alive>
        <step-one ref="stepOne" v-if="activeStep === 0" :form-data="formData"> </step-one>
        <step-two ref="stepTwo" v-if="activeStep === 1" :form-data="formData" :design-data="formData.designData"> </step-two>
        <step-three ref="stepThree" v-if="activeStep === 2" :form-data="formData"> </step-three>
        <step-four v-if="activeStep === 3"></step-four>
      </keep-alive>
      <el-button slot="footer" type="warning" @click="activeStep--" v-show="activeStep > 0 && activeStep < 3">上一步</el-button>
      <el-button slot="footer" type="primary" @click="nextStep" v-show="activeStep < 2">下一步</el-button>
      <el-button slot="footer" type="success" @click="submit(0)" v-show="activeStep === 2">暂存为草稿</el-button>
      <el-button slot="footer" type="primary" @click="submit(1)" v-show="activeStep === 2">发布流程</el-button>
    </layout-step-form>
  </el-card>
</template>

<script>
import mixins from 'mixins/index'
import StepOne from './step-one/index'
import StepTwo from './step-two/index'
import StepThree from './step-three/index'
import StepFour from './step-four/index'
import formApi from '@/services/FormService/index'
import processApi from '@/services/ProcessService/index'

export default {
  mixins: [mixins.loadingMixin],
  components: {
    StepOne,
    StepTwo,
    StepThree,
    StepFour,
  },
  props: {
    id: { type: String },
  },
  data() {
    return {
      activeStep: 0,
      formData: {},
      steps: [{ title: '填写基本信息' }, { title: '设计流程' }, { title: '确认流程' }, { title: '发布成功' }],
    }
  },
  methods: {
    backToList() {
      this.$router.push({ path: '/setting/process-template' })
    },
    init() {
      if (this.id) {
        this.formData.id = this.id
        this.loading = true
        Promise.all([processApi.getTemplateInfo(this.id), formApi.getFormList()])
          .then(([tempInfo, formList]) => {
            this.formData = tempInfo
            this.formData.formList = formList
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      } else {
        formApi.getFormList().then((data) => {
          this.formData.formList = data
        })
      }
    },
    nextStep() {
      console.log('当前步骤',this.activeStep)
      if (this.activeStep === 0) {
        this.$refs.stepOne
          .validate()
          .then(() => {
            this.$refs.stepOne
              .sendCondition()
              .then((condition) => {
                this.formData.conditionString = condition
                this.activeStep++
              })
              .catch(() => {
                return
              })
            // this.activeStep++
          })
          .catch(() => {
            return
          })
      }

      if (this.activeStep === 1) {
        this.$refs.stepTwo
          .sendData()
          .then((data) => {
            this.formData.design = data
            this.activeStep++
          })
          .catch((msg) => {
            this.$message({ type: 'error', message: msg })
          })
      }
    },
    submit(status) {
      let option = {
        data: this.formData,
        status,
        loading: { target: this.$refs.root.$el },
      }
      if (this.formData.id) {
        processApi
          .editTemplate(option)
          .then(() => {
            if (status === 1) {
              this.activeStep++
            } else {
              this.$router.push({
                path: '/setting/process/list',
              })
            }
          })
          .catch(() => {
            return
          })
      } else {
        processApi
          .createTemplate(option)
          .then(() => {
            if (status === 1) {
              this.activeStep++
            } else {
              this.$router.push({
                path: '/setting/process/list',
              })
            }
          })
          .catch(() => {
            return
          })
      }
    },
  },
  created() {
    console.log('index')
    this.init()
  },
}
</script>
