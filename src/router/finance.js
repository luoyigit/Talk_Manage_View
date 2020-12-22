import Layout from '@/layout'
export default [
  {
    path: '/finance',
    name: '财务经办',
    component: Layout,
    redirect: '/finance/index',
    children: [
      {
        path: '/finance/index',
        name: '总览',
        component: () => import('views/finance-module/home'),
      },
      {
        path: '/finance/message/list',
        name: '站内消息',
        component: () => import('@/views/common-module/message-list'),
      },
    ],
  },
]
