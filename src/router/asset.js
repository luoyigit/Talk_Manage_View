import Layout from '@/layout'
export default [
  {
    path: '/asset',
    name: '资产科经办',
    component: Layout,
    redirect: '/asset/index',
    children: [
      {
        path: '/asset/index',
        name: '总览',
        component: () => import('views/asset-module/Home'),
      },
      {
        path: '/asset/message/list',
        name: '站内消息',
        component: () => import('@/views/common-module/message-list'),
      },
    ],
  },
]
