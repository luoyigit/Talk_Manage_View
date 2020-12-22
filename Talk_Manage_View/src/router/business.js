import Layout from '@/layout'
export default [
  {
    path: '/business',
    name: '运营系统',
    component: Layout,
    redirect: '/business/user',
    children: [
      {
        path: '/business/user',
        name: '用户分析',
        component: () => import('@/views/business/index.vue'),
      },
      {
        path: '/live/2',
        name: '增加设备',
        component: () => import('@/views/business/index.vue'),
      },
    ],
  },
]