<template>
  <pms-dialog-frame ref="frame" title="修改密码" width="750px" @open="resetForm">
    <el-form ref="form" :model="form" status-icon :rules="rules" label-width="100px">
      <v-el-form :form-data="form" :items="items"></v-el-form>
    </el-form>
    <el-button slot="footer" type="warning" @click="hide">取消</el-button>
    <el-button slot="footer" type="primary" @click="submit">确定</el-button>
  </pms-dialog-frame>
</template>

<script>
import staffApi from 'services/staff-manage/index'

export default {
  data() {
    let validateOldPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
    let validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.form.newPassword) {
        callback(new Error('新密码两次不一致!'))
      } else {
        callback()
      }
    }
    return {
      form: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      },
      rules: {
        oldPassword: [{ required: true, validator: validateOldPassword, trigger: 'blur' }],
        newPassword: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        confirmNewPpassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }],
      },
      items: [
        {
          label: '原密码',
          prop: 'oldPassword',
          component: {
            name: 'el-input',
            attrs: {
              autofocus: true,
              type: 'password',
              autoComplete: 'off',
            },
          },
        },
        {
          label: '新密码',
          prop: 'newPassword',
          component: {
            name: 'el-input',
            attrs: {
              type: 'password',
              autoComplete: 'off',
            },
          },
        },
        {
          label: '确认新密码',
          prop: 'confirmNewPassword',
          component: {
            name: 'el-input',
            attrs: {
              type: 'password',
              autoComplete: 'off',
            },
          },
        },
      ],
    }
  },
  methods: {
    show() {
      this.$refs.frame.show()
    },
    hide() {
      this.$refs.frame.hide()
    },
    submit() {
      this.$refs.form
        .validate()
        .then(() => {
          let option = {
            data: this.form,
            loading: { target: this.$refs.form.$el },
          }
          // staffApi.changePassword(option).then(() => {
          //     this.hide()
          // }).catch(() => {
          //     return
          // })
        })
        .catch(() => {
          return
        })
    },
    resetForm() {
      this.$nextTick(() => {
        this.$refs.form.resetFields()
      })
    },
  },
}
</script>
