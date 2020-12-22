<template>
  <pms-dialog-frame ref="frame" title="审批步骤设置" append-to-body width="600px" @open="init">
    <!-- <el-tabs v-model="tabName">
            <el-tab-pane label="基础设置" name="base"> -->
    <el-form ref="form" :model="currentNode" :rules="rules" label-width="150px">
      <v-el-form :form-data="currentNode" :items="items">
        <!-- <el-checkbox slot="allowGoBack" v-model="currentNode.allowGoBack" :checked="currentNode.allowGoBack"></el-checkbox>
                        <el-checkbox slot="autoAudit" v-model="currentNode.autoAudit" :checked="currentNode.autoAudit"></el-checkbox>
                        
                        <el-checkbox slot="allowRevoke" v-model="currentNode.allowRevoke" :checked="currentNode.allowRevoke"></el-checkbox>
                        <el-checkbox slot="allowBackTo" v-model="currentNode.allowBackTo" :checked="currentNode.allowBackTo"></el-checkbox> -->
        <el-switch slot="allowAttach" v-model="currentNode.allowAttach"></el-switch>
        <template slot="employeeList" >
            <el-select v-model="currentNode.employeeList" multiple placeholder="请选择">
            <el-option
              v-for="item in userlist"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </template>
      </v-el-form>
    </el-form>
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="字段权限" name="field">
                <el-row class="field-row">
                    <el-col :span="16">字段名</el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="showAll" @change="showChange">查看</el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="fillAll" @change="fillChange">填写</el-checkbox>
                    </el-col>
                </el-row>
                <el-row class="field-row" v-for="item in currentNode.fiedlSettings" :key="item.fieldCode">
                    <el-col :span="16">{{item.fieldName}}</el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="item.show" @change="setHeadCheckBox"></el-checkbox>
                    </el-col>
                    <el-col :span="4">
                        <el-checkbox v-model="item.change" @change="setHeadCheckBox"></el-checkbox>
                    </el-col>
                </el-row>
            </el-tab-pane> -->
    <!-- </el-tabs> -->
    <el-button slot="footer" type="warning" @click="hide">取消</el-button>
    <el-button slot="footer" type="primary" @click="confirm">确定</el-button>
  </pms-dialog-frame>
</template>

<script>
//import roleApi from 'api/role-manage/index'
import staffApi from 'services/staff-manage/index'
export default {
  props: {
    currentNode: { type: Object },
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
        signTitle: [
          {
            required: true,
            message: '请输入签名标题',
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
        goBackMode: [
          {
            required: true,
            message: '请选择重新提交模式',
            trigger: 'change',
          },
        ],
      },
      tabName: 'base',
      showAll: true,
      fillAll: true,
      userlist:[]
    }
  },
  watch: {
    currentHandlerType(val) {
      //console.log('currentHandlerType', val)
      //console.log('currentHandlerType node', this.currentNode)
      //this.currentNode.department = []
      //this.currentNode.roleIds = []
      // this.currentNode.employeeList = []
    },
  },
  computed: {
    currentHandlerType() {
      return parseInt(this.currentNode.handlerType)
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
        // {
        //     label: '步骤备注',
        //     prop: 'nodeRemark',
        //     component: {
        //         name: 'el-input'
        //     }
        // },
        // {
        //     label: '签名标题',
        //     prop: 'signTitle',
        //     component: {
        //         name: 'el-input'
        //     }
        // },

        // {
        //   label: '驳回后重新提交模式',
        //   prop: 'goBackMode',
        //   component: {
        //     name: 'v-el-select',
        //     attrs: {
        //       options: [
        //         { label: '逐级重新审批', value: 1 },
        //         { label: '提交回本步骤', value: 2 },
        //       ],
        //     },
        //   },
        // },
        {
          label: '主办人类型',
          prop: 'handlerType',
          component: {
            name: 'v-el-select',
            attrs: {
              options: [
                // { label: '采购申请人', value: 1 },
                // { label: '采购申请人部门领导', value: 2 },
                // { label: '申请人部门办公主任', value: 3 },
                // { label: '项目负责人', value: 4 },
                // { label: '指定部门领导', value: 5 },
                // { label: '指定部门办公主任', value: 6 },
                // { label: '指定角色', value: 7 },
                { label: '指定人员', value: 8 },
                // { label: '流程提交人', value: 9 },
                // { label: '校领导', value: 10 },
                // { label: '指定部门所有人员', value: 11 },
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
              // component: {
              //   name: 'pms-select-staff',
              //   attrs: {
              //     multiple: true,
              //   },
              // },
            }
          : null,
        {
          label: '是否允许加签',
          prop: 'allowAttach',
        },
        {
          label: '扩展标识',
          prop: 'ext',
          component: {
            name: 'el-input',
          },
        },
        // {
        //     label: '是否允许退回',
        //     prop: 'allowGoBack',
        // },
        // // {
        // //     label: '是否自动审批',
        // //     prop: 'autoAudit',
        // // },
        // // {
        // //     label: '是否允许撤回',
        // //     prop: 'allowRevoke',
        // // },
        // {
        //     label: '是否允许退回此步骤',
        //     prop: 'allowBackTo'
        // }
      ]
    },
  },
  methods: {
    setHeadCheckBox() {
      const isAllNotShow = this.currentNode.fiedlSettings.every((item) => !item.show)
      const isAllFieldNotChange = this.currentNode.fiedlSettings.every((item) => !item.change)
      this.showAll = isAllNotShow ? false : true
      this.fillAll = isAllFieldNotChange ? false : true
    },
    show() {
      this.setHeadCheckBox()
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
    showChange(checked) {
      this.currentNode.fiedlSettings.forEach((item) => {
        item.show = checked
      })
    },
    fillChange(checked) {
      this.currentNode.fiedlSettings.forEach((item) => {
        item.change = checked
      })
    },
  },
  created() {
    // roleApi.getAllRoleList({ pageIndex: 1, pageSize: -1 }).then((data) => {
    //   this.roleList = data.list
    // })

    staffApi.getStaffList({pageIndex:1, pageSize:-1}).then(data => {
       this.userlist  = data.dataList.map(res => {
         return {
            id: res.id,
            name:res.realName
         }
       })
    })
  },
}
</script>

<style lang="scss" scoped>
.field-row {
  padding: 10px;
  border-bottom: 1px solid $color-first-border;
}
</style>
