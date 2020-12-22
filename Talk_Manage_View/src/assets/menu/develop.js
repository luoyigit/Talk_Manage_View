const showDevPage = window.GlobalConfig.showDevPage

const develop = showDevPage ? [
    // {
    //     name: '组件展示',
    //     path: '/develop/comp-show',
    //     icon: 'el-icon-s-home'
    // },
    // {
    //     name: '菜单权限设置',
    //     path: '/develop/menu-manage',
    //     icon: 'el-icon-s-operation'
    // },
    {
        name: '查询页面',
        path: '/develop/query-page',
        icon: 'el-icon-zoom-in'
    },
    {
        name: '权限客户端',
        path: '/develop/permission/clients',
        icon: 'el-icon-zoom-in'
    },
    {
        name: '权限设置',
        path: '/develop/permission/setting',
        icon: 'el-icon-zoom-in'
    },
    {
        name: '流程表单',
        path: '/develop/process/form',
        icon: 'el-icon-zoom-in'
    },
    {
        name: '测试页面',
        path: '/develop/test',
        icon: 'el-icon-zoom-in'
    },
] : []

export default develop