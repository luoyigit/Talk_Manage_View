<template>
  <pms-dialog-frame ref="frame" title="审批步骤设置" append-to-body width="600px" @open="init">
    <el-form ref="form" :model="mergingStep" :rules="rules" label-width="150px">
      <v-el-form :form-data="mergingStep" :items="items">
        <!-- <el-checkbox slot="allowBackTo" v-model="mergingStep.allowBackTo" :checked="mergingStep.allowBackTo"></el-checkbox> -->
        <el-switch slot="allowAttach" v-model="mergingStep.allowAttach"></el-switch>
      </v-el-form>
    </el-form>
    <el-button slot="footer" type="warning" @click="hide">取消</el-button>
    <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
  </pms-dialog-frame>
</template>

<script>
//import roleApi from 'api/role-manage/index'
export default {
  props: {
    mergingStep: { type: Object },
  },
  data() {
    let checkDept = (rule, value, callback) => {
      if (value.length > 0) {
        callback()
      } else {
        return callback(new Error('请选择部门'))
      }
    }
    let checkRole = (rule, value, callback) => {
      if (value.length > 0) {
        callback()
      } else {
        return callback(new Error('请选择角色'))
      }
    }
    let checkStaff = (rule, value, callback) => {
      if (value.length > 0) {
        callback()
      } else {
        return callback(new Error('请选择人员'))
      }
    }
    return {
      roleList: [],
      rules: {
        text: [
          {
            required: true,
            message: '请输入步骤名称',
            trigger: 'blur',
          },
        ],
        department: [{ required: true, validator: checkDept, trigger: 'change' }],
        roleIds: [{ required: true, validator: checkRole, trigger: 'change' }],
        employeeList: [
          {
            required: true,
            validator: checkStaff,
            trigger: 'change',
          },
        ],
      },
    }
  },
  watch: {
    currentHandlerType(val) {
      this.mergingStep.department = []
      this.mergingStep.roleIds = []
      this.mergingStep.employeeList = []
    },
  },
  computed: {
    currentHandlerType() {
      return parseInt(this.mergingStep.handlerType)
    },
    items() {
      return [
        {
          label: '步骤名',
          prop: 'text',
          component: {
            name: 'el-input',
          },
        },
        {
          label: '驳回后重新提交模式',
          prop: 'goBackMode',
          component: {
            name: 'v-el-select',
            attrs: {
              options: [
                { label: '逐级重新审批', value: 1 },
                { label: '提交回本步骤', value: 2 },
              ],
            },
          },
        },
        {
          label: '主办人类型',
          prop: 'handlerType',
          component: {
            name: 'v-el-select',
            attrs: {
              options: [
                { label: '采购申请人', value: 1 },
                { label: '采购申请人部门领导', value: 2 },
                { label: '申请人部门办公主任', value: 3 },
                { label: '项目负责人', value: 4 },
                { label: '指定部门领导', value: 5 },
                { label: '指定部门办公主任', value: 6 },
                { label: '指定角色', value: 7 },
                { label: '指定人员', value: 8 },
                { label: '流程提交人', value: 9 },
                { label: '校领导', value: 10 },
                { label: '指定部门所有人', value: 11 },
              ],
            },
          },
        },

        this.currentHandlerType === 5 || this.currentHandlerType === 6 || this.currentHandlerType === 11
          ? {
              label: '选择指定部门',
              prop: 'department',
              component: {
                name: 'pms-select-dept',
                attrs: {
                  multiple: true,
                },
              },
            }
          : null,
        this.currentHandlerType === 7
          ? {
              label: '选择指定角色',
              prop: 'roleIds',
              component: {
                name: 'v-el-select',
                attrs: {
                  attrs: {
                    multiple: true,
                  },
                  options: this.roleList.map((item) => {
                    return {
                      label: item.roleName,
                      value: item.id,
                    }
                  }),
                },
              },
            }
          : null,
        this.currentHandlerType === 8
          ? {
              label: '选择指定人员',
              prop: 'employeeList',
              component: {
                name: 'pms-select-staff',
                attrs: {
                  multiple: true,
                },
              },
            }
          : null,
        {
          label: '是否允许加签',
          prop: 'allowAttach',
        },

        // {
        //     label: '是否允许退回此步骤',
        //     prop: 'allowBackTo'
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
    init() {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    confirm() {
      this.$refs.form.validate().then(() => {
        this.$emit('confirm')
      })
    },
  },
  created() {
    // roleApi.getAllRoleList({ pageIndex: 1, pageSize: -1 }).then((data) => {
    //     this.roleList = data.list
    // })
  },
}
</script>
