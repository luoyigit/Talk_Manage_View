<template>
  <pms-dialog-frame ref="frame" title="设置子流程" append-to-body width="500px" @open="init">
    <div class="dialog-content">
      <el-form ref="form" :model="currentProcess" :rules="rules" label-width="100px">
        <v-el-form :form-data="currentProcess" :items="formItems"></v-el-form>
        <!-- <el-form-item label="流程名称" prop="text">
                    <el-input 
                        type="text" 
                        v-model="currentProcess.text" 
                        :autofocus="true">
                    </el-input>
                </el-form-item> -->
      </el-form>
      <!-- <div class="sub-process" id="subProcess">
                <div class="left">
                    <div class="palette" id="subPalatte"></div>
                </div>
                <div class="right">
                    <div class="design" id="subDesigner"></div>
                </div>
            </div> -->
      <!-- 节点设置 -->
      <!-- <set-node ref="node" :current-node="currentNode" @confirm="getNodeData"></set-node> -->
      <!-- 条件设置 -->
      <!-- <set-line ref="line" :form-data="formData" :current-line="currentLine" @confirm="getLineData"></set-line> -->
    </div>
    <el-button slot="footer" type="warning" @click="hide">取消</el-button>
    <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
  </pms-dialog-frame>
</template>

<script>
import FlowDesigner from 'utils/flow-designer'
import SetNode from '../set-node/index'
import SetLine from '../set-line/index'
// import mixins from 'mixins/index'

export default {
  //mixins: [mixins.process.design],
  components: {
    // SetNode,
    // SetLine
  },
  props: {
    currentProcess: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      rules: {
        text: [{ required: true, message: '请输入流程名称', trigger: 'blur' }],
        processFunction: [{ required: true, message: '请选择流程方法', trigger: 'change' }],
      },
    }
  },
  computed: {
    formItems() {
      return [
        {
          label: '流程名称',
          prop: 'text',
          component: {
            name: 'el-input',
          },
        },
        // {
        //     label: '流程方法',
        //     prop: 'processFunction',
        //     component: {
        //         name: 'v-el-select',
        //         attrs: {
        //             options: this.formData.subProcessFunctions
        //         }
        //     }
        // }
      ]
    },
  },
  methods: {
    show() {
      this.$refs.frame.show()
    },
    hide() {
      this.$refs.frame.hide()
    },
    removeDom() {
      let subProcess = document.querySelector('#subProcess')
      let left = document.querySelector('#subProcess>.left')
      let right = document.querySelector('#subProcess>.right')
      subProcess.removeChild(left)
      subProcess.removeChild(right)
      return Promise.resolve()
    },
    createDom() {
      let subProcess = document.querySelector('#subProcess')
      let left = document.createElement('div')
      let leftChild = document.createElement('div')
      let right = document.createElement('div')
      let rightChild = document.createElement('div')
      left.className = 'left'
      leftChild.className = 'palette'
      leftChild.id = 'subPalette'
      left.appendChild(leftChild)
      right.className = 'right'
      rightChild.className = 'design'
      rightChild.id = 'subDesigner'
      right.appendChild(rightChild)
      subProcess.appendChild(left)
      subProcess.appendChild(right)
      return Promise.resolve()
    },
    init() {
      // this.$nextTick(() => {
      //     this.removeDom().then(() => {
      //         this.createDom().then(() => {
      //             this.designer = new FlowDesigner('subDesigner', this.editProcessInfo);
      //             this.designer.initToolbar('subPalette', false); // 初始化控件面板
      //             if (this.designData && this.designData.length > 0) {
      //                 this.designer.displayFlow(this.designData)
      //             }
      //         })
      //     })
      // })
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    confirm() {
      // this.sendData().then(data => {
      //     this.$emit('confirm', data)
      //     this.hide()
      // }).catch(msg => {
      //     this.$message({type: 'error', message: msg})
      // })
      this.$refs.form.validate().then(() => {
        this.$emit('confirm')
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.dialog-content {
  .sub-process {
    display: table;
    min-width: 1010px;
    margin: 0 auto;
    & /deep/ .left {
      display: table-cell;
      width: 160px;
      padding: 5px;
      .palette {
        border: solid 1px #e6e6e6;
        min-height: 600px;
      }
    }
    & /deep/ .right {
      display: table-cell;
      width: 825px;
      padding: 5px;
      .design {
        border: solid 1px #e6e6e6;
        min-height: 600px;
      }
    }
  }
}
</style>
