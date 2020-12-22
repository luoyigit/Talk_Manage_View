<template>
  <el-card class="temp-manage">
    <div slot="header" class="card-head">
      <span class="card-title">流程管理</span>
      <div class="right">
        <el-tooltip content="添加模板" placement="bottom" effect="light" class="add-temp">
          <el-button type="primary" circle icon="el-icon-plus" size="mini" @click="designProcess('')"> </el-button>
        </el-tooltip>
      </div>
    </div>
    <el-row>
      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" class="temp-wrap" v-for="item in tempList" :key="item.id">
        <div class="temp-card">
          <div class="temp-status">
            <span class="status" :class="{ active: item.status === 1 }">{{ item.statusName }}</span>
            <div class="right">
              <i :title="item.status == 1 ? '取消发布' : '发布'" class="el-icon-refresh icon" @click="changeStatus(item)"> </i>
              <i title="编辑模板" class="el-icon-edit icon primary" :class="{ disabled: item.status === 1 }" @click="designProcess(item)"> </i>
              <i title="删除模板" class="el-icon-close icon delete" :class="{ disabled: item.status === 1 }" @click="removeProcess(item)"> </i>
            </div>
          </div>
          <div class="temp-icon" :class="{ active: item.status === 1 }">
            <i class="el-icon-menu"></i>
          </div>
          <div class="temp-name" :class="{ active: item.status === 1 }">
            {{ item.templateName }}
          </div>
          <div class="temp-remark">
            {{ item.remark }}
          </div>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import processApi from '@/services/ProcessService/index'

export default {
  data() {
    return {
      tempList: [],
    }
  },
  methods: {
    // 跳转页面
    designProcess(temp) {
   
      if (temp) {
        if (temp.status === 0 || temp.status === 1) {
          this.$router.push({
            path: '/setting/process/design',
            query: {
              id: temp.id,
            },
          })
        } else {
          return
        }
      } else {
        this.$router.push({
          path: '/setting/process/design',
        })
      }
    },
    // 删除模板
    removeProcess(temp) {
      if (temp.status === 0) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            processApi
              .removeTemp(temp.id)
              .then(() => {
                this.getList()
              })
              .catch(() => {
                return
              })
          })
          .catch(() => {
            return
          })
      } else {
        return
      }
    },
    // 设置元素高度
    setDom() {
      let cards = document.querySelectorAll('.temp-card')
      let heights = Array.from(cards, (item) => item.offsetHeight)
      let maxHeight = Math.max(...heights) - 42
      cards.forEach((item) => {
        item.style.height = maxHeight + 'px'
      })
    },
    // 获取列表
    getList() {
      processApi
        .getTemplateList()
        .then((data) => {
          this.tempList = data
          this.$nextTick(() => {
            this.setDom()
          })
        })
        .catch(() => {
          return
        })
    },
    // 切换模板发布状态
    changeStatus(temp) {
      processApi
        .changeTempStatus(temp)
        .then(() => {
          let _this = this
          setTimeout(() => {
            _this.getList()
          }, 500)
        })
        .catch(() => {
          return
        })
    },
  },
  created() {
    this.getList()
  },
}
</script>

<style lang="scss" scoped>
.temp-manage {
  .title {
    height: 30px;
    line-height: 30px;
    border-bottom: 2px solid;
  }
  .temp-wrap {
    padding: $spacing-xs;
    .temp-card {
      padding: $spacing-md;
      border: 1px solid $color-second-border;
      border-radius: 5px;
      font-size: $font-size-small;
      .temp-status {
        .status.active {
          color: $color-success;
        }
        .right {
          float: right;
          .icon {
            margin-right: $spacing-xs;
            cursor: pointer;
            &.primary {
              color: $color-primary;
            }
            &.delete {
              color: $color-danger;
            }
            &.disabled {
              color: $color-first-text;
              opacity: 0.65;
              cursor: not-allowed;
            }
          }
        }
      }
    }
    .temp-icon,
    .temp-name,
    .temp-remark {
      text-align: center;
      margin-top: $spacing-sm;
    }
    .temp-icon {
      font-size: 40px;
      color: $color-first-text;
      opacity: 0.65;
      &.active {
        color: $color-primary;
        opacity: 1;
      }
    }
    .temp-name {
      color: $color-first-text;
      opacity: 0.65;
      &.active {
        color: $color-primary;
        opacity: 1;
      }
    }
  }
}
</style>
