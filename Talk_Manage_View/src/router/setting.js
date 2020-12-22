import Layout from '@/layout'
export default [
  {
    path: '/setting',
    name: '基础设施',
    component: Layout,
    redirect: '/setting/employee',
    children: [
      {
        path: '/setting/employee',
        name: '用户管理',
        component: () => import('views/system-setting-module/employee-manage'),
      },
      // {
      //   path: '/setting/dept',
      //   name: '部门管理',
      //   component: () => import('views/system-setting-module/department-manage'),
      // },
      {
        path: '/system/role-manage',
        name: '角色管理',
        component: () => import('views/system-setting-module/role-manage'),
      },
      {
        path: '/system/role-manage/set-role',
        name: '配置权限',
        query: {
            activePath: '/system/role-manage'
        },
        component: () => import('views/system-setting-module/role-manage/configure-role')
       },
      {
        path: '/system/dic-manage',
        name: '系统字典',
        component: () => import('views/system-setting-module/dic-manage'),
      },
      {
        path: '/system/address-manage',
        name: '地址管理',
        component: () => import('views/system-setting-module/address-manage'),
      },
      {
        path: '/setting/systemlog-manage',
        name: '异常日志',
        component: () => import('views/system-setting-module/systemlog-manage'),
      },
      {
        path: '/setting/operatorlist',
        name: '操作日志',
        component: () => import('views/system-setting-module/systemlog-manage/operatorlist'),
      },
      {
        path: '/setting/process/list',
        name: '流程管理',
        component: () => import('views/system-setting-module/process-setting/template-list'),
      },
      {
        path: '/setting/process/design',
        name: '流程设计',
        props: route => ({id: route.query.id}),
        component: () => import('views/system-setting-module/process-setting/template-list/design-demplate'),
      },
        {
            path: '/setting/process/dictionary',
            name: '数字字典',
            component: () => import('views/system-setting-module/number-dictionary/index.vue'),
        },
    ],
  },
]
