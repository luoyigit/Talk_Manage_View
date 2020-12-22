// const Content = (resolve) => {
//     import ('components/common/content').then(module => {
//         resolve(module)
//     })
// }
import Layout from '@/layout'
const showDevPage = window.GlobalConfig.showDevPage

const develop = showDevPage ? [{
    path: '/develop',
    name: '开发专用',
    component: Layout,
    redirect: '/develop/query-page',
    children: [
        // {
        //     path: '/develop/menu-manage',
        //     name: '菜单权限设置',
        //     component: () => import('views/develop-module/menu-manage')
        // },
        // {
        //     path: '/develop/comp-show',
        //     name: '动态组件演示',
        //     component: () => import('views/develop-module/comp-show')
        // },
        {
            path: '/develop/query-page',
            name: '查询页面',
            component: () => import('views/develop-module/query-page')
        },
        {
            path: '/develop/permission/clients',
            name: '权限客户端',
            component: () => import('views/develop-module/permission-manage/client')
        },
        {
            path: '/develop/permission/setting',
            name: '权限设置',
            component: () => import('views/develop-module/permission-manage/menu')
        },
        {
            path: '/develop/process/form',
            name: ' 流程表单',
            component: () => import('views/system-setting-module/processform')
        },
        {
            path: '/develop/test',
            name: ' 流程表单',
            component: () => import('views/develop-module/test.vue')
        },
    ]
}] : []

export default develop