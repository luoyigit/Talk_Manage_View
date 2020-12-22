<!--  -->
<template>
  <div>
    <el-dialog 
        title="远程地址" 
        :visible.sync="showDialog"
        width="450px"
        ref="dicForm">
        <el-form ref="form"  :model="allData" :inline="true" label-width="100px">
            <v-el-form :items="items" :form-data="allData">
                <el-button slot="btuName" type="primary" @click="sureURL">{{btuName}}</el-button>
            </v-el-form>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import pagesSetting from 'services/pages-setting/index'
import mixins from 'mixins/index'
export default {
    mixins: [mixins.dialogMixin, mixins.loadingMixin],
    data() {
        return {
            formLabelWidth: '80px',
            btuName: '确定',
            sureBtn: false
        };
    },
    props: {
        allData: {
            type: Object,
            default: null
        }
    },
    computed: {
        items() {
            return [
                {
                    label: '远程地址：',
                    prop: 'remoteUrl',
                    component: {
                        name: 'el-input',
                        attrs: {
                            labelWidth: this.formLabelWidth,
                        },
                    },
                },
                {
                    prop: 'btuName',
                }
            ]
        }
    },
    methods: {
        show() {
            this.showDialog = true
        },
        sureURL() {
            if(this.allData.remoteUrl != '') {
                let opt = {
                    form: this.allData,
                }
                pagesSetting.editParameters(opt).then(date => {
                    this.showDialog = false
                    this.sureBtn = true
                })
            }else{
                this.$message({type: 'warning', message: '请选择输入远程地址'})
            }
        }
    }
};
</script>
<style lang='scss' scoped>
</style>