import Layout from '@/layout'
export default [
  {
    path: '/dept',
    name: '二级经办',
    component: Layout,
    redirect: '/dept/index',
    children: [
      {
        path: '/dept/index',
        name: '总览',
        component: () => import('views/department-operator-module/home'),
      },
      {
        path: '/dept/message/list',
        name: '站内消息',
        component: () => import('@/views/common-module/message-list'),
      },
      {
        path: '/dept/applicaiton/create',
        name: '采购立项申请',
        component: () => import('views/department-operator-module/application-manage/create-application/'),
      },
    ],
  },
]
