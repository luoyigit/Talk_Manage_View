import Vue from 'vue'
import Form from './packages/form/index'
import Table from './packages/table/index'
import Select from './packages/select/index'
import Radio from './packages/radio/index'
import FloatBetween from './layout/float-between/index'
import GridBetween from './layout/grid-between/index'
import TableBetween from './layout/table-between/index'
import Panigation from './packages/pagination/index'

const components = [
    Form,
    Table,
    Select,
    Radio,
    FloatBetween,
    GridBetween,
    TableBetween,
    Panigation,
]

components.forEach(item => {
    Vue.component(item.name, item)
})