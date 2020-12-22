<!--  -->
<template>
    <div class="role">
        <div class="wrap"
            v-loading="loading"
            :element-loading-text="loadingText"
            :element-loading-spinner="loadingSpinner">
            <set-role
                ref="setRole"
                :userName="$route.query.roleName"
                :roleId="$route.query.id"
                :roleForm="roleForm"></set-role>
            <div class="btn">
                <el-button  
                slot="right"
                type="primary"
                class="btn-primary"
                @click="save">保存</el-button>
            </div>
            
        </div>
  </div>
</template>

<script>
import mixins from 'mixins/index'
import RoleManage from 'services/role-manage/index'
import SetRole from './set-role-new'
export default {
    mixins: [mixins.loadingMixin],
    data() {
        return {
            roleForm: {
                roleId: '',
                addFunctionIds: [], //添加的功能Id列表
                removeFunctionIds: [], //删除的功能Id列表
                addMenuIds: [], //添加的菜单Id列表
                removeMenuIds: [], //删除的菜单Id列表
            }
        };
    },
    components: {
        SetRole
    },
    mounted() {
        this.setRoleEl = this.$refs.setRole.$el
    },
    methods: {
        back() {
            this.$router.back()
        },
        save() {
            this.roleForm.roleId = this.$route.query.id
            this.$refs.setRole.setSaveData().then(() => {
                let opt = {
                    data: this.roleForm,
                    loading: {target: this.setRoleEl}
                }
                RoleManage.setRole(opt).then(date => {
                    this.$router.back()
                })
            })
            
        }
    }
}

</script>
<style lang="scss" scoped>
.btn{
    text-align: center;
}
.backRur{
    font-size: $font-size-small-s;
}
</style>
