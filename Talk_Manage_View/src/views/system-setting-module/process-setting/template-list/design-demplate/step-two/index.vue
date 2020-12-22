<template>
  <div class="process-form-step-two">
    <div class="left">
      <div class="palette" id="palette"></div>
    </div>
    <div class="right">
      <div class="design" id="designer"></div>
    </div>
    <set-node ref="node" :current-node="currentNode" @confirm="getNodeData"></set-node>
    <set-line ref="line" :form-data="formData" :current-line="currentLine" @confirm="getLineData"> </set-line>
    <sub-process
      ref="process"
      :form-data="formData"
      :design-data="currentProcess.designData"
      :current-process="currentProcess"
      @confirm="getProcessData"
    >
    </sub-process>
    <set-merging ref="mergingStep" :merging-step="mergingStep" @confirm="getMergingStepData"> </set-merging>
    <set-free ref="freeProcess" :form-data="formData" :free-process="freeProcess" @confirm="getFreeProcessData"> </set-free>
    <set-decide ref="setDecide" :current-node="currentNode" @confirm="setDecideNodeName"></set-decide>
  </div>
</template>

<script>
import FlowDesigner from 'utils/flow-designer'
import mixins from 'mixins/index'
import { initSubProcess, initMergingStep } from 'model/process-temp'
import SetNode from './set-node/index'
import SetLine from './set-line/index'
import SubProcess from './set-process/index'
import SetMerging from './set-merging/index'
import SetFree from './set-free/index'
import SetDecide from './set-decide/index'

export default {
  mixins: [mixins.process.design],
  components: {
    SetNode,
    SetLine,
    SubProcess,
    SetMerging,
    SetFree,
    SetDecide,
  },
  data() {
    return {
      currentProcess: {},
      processData: null, // 对子流程对象进行缓存
      mergingStep: {},
      mergingStepData: null, // 对当前转交步骤进行缓存
      mergingNodes: [], // 缓存转交步骤需要合并的节点
    }
  },
  methods: {
    // 获取子流程数据
    getProcessData(data) {
      this.currentProcess.designData = data ? data : ''
      this.processData = Object.assign(this.processData, this.currentProcess)
      this.$refs.process.hide()
      this.refresh()
    },
    // 获取转交步骤数据
    getMergingStepData(data) {
      this.mergingStep.employeeIds = this.mergingStep.employeeList.map((item) => item.id)
      this.mergingStep.departmentIds = this.mergingStep.department.map((item) => item.id)
      this.mergingStepData = Object.assign(this.mergingStepData, this.mergingStep)
      this.$refs.mergingStep.hide()
      this.refresh()
    },
    init() {
      this.designer = new FlowDesigner('designer', this.editProcessInfo)
      this.designer.initToolbar('palette', true) // 初始化控件面板
      if (this.designData && this.designData.length > 0) {
        this.designer.displayFlow(this.designData)
      }
    },
  },
  mounted() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.process-form-step-two {
  display: table;
  width: 100%;
  margin: 0 auto;
  .left {
    display: table-cell;
    width: 160px;
    padding: 5px;
    .palette {
      border: solid 1px #e6e6e6;
      min-height: 600px;
    }
  }
  .right {
    display: table-cell;
    padding: 5px;
    .design {
      border: solid 1px #e6e6e6;
      min-height: 600px;
    }
  }
}
</style>
