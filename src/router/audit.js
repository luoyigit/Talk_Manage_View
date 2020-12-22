import Layout from '@/layout'
export default [
  {
    path: '/audit',
    name: '审计经办',
    component: Layout,
    redirect: '/audit/index',
    children: [
      {
        path: '/audit/index',
        name: '总览',
        component: () => import('views/audit-module/home'),
      },
      {
        path: '/audit/message/list',
        name: '站内消息',
        component: () => import('@/views/common-module/message-list'),
      },
    ],
  },
]
