import Vue from 'vue'
import Copyright from './copyright/index'
import pmsSetCondition from './pms-set-condition/index'
import pmsFastSearch from './pms-fast-search/index'
import pmsDialogFrame from './pms-dialog-frame/index'
import pmsCompositeQuery from './pms-composite-query/index'
import layoutSearchBar from './layout-search-bar/index'
import pmsConditionSearch from './pms-condition-search/index'
import pmsDeptTree from './pms-dept-tree/index'
import pmsTreeSelect from './pms-tree-select/index'
import pmsSelectStaff from './pms-select-staff/index'
import conditionSearch from './condition-search/index'
import pmsUpload from './pms-upload/index'
import map from './map/index'
import layoutStepForm from './layout-step-form'
import processStatusItem  from  './emunTxt/processStatus-Item.vue'
import renovationStatusItem from  './emunTxt/renovationStatus-item.vue'
import progress from './progress/progress'

//
const components = [
    Copyright,
    pmsSetCondition,
    pmsFastSearch,
    pmsDialogFrame,
    pmsCompositeQuery,
    layoutSearchBar,
    pmsConditionSearch,
    pmsDeptTree,
    pmsTreeSelect,
    pmsSelectStaff,
    conditionSearch,
    pmsUpload,
    layoutStepForm,
    map,
    processStatusItem,
    renovationStatusItem,
    progress
]
components.forEach((item) => {
    Vue.component(item.name, item)
})
