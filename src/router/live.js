import Layout from '@/layout'
export default [
  {
    path: '/live',
    name: '直播系统',
    component: Layout,
    redirect: '/live/list',
    children: [
      {
        path: '/live/list',
        name: '设备管理',
        component: () => import('@/views/live/index.vue'),
      },
      {
        path: '/live/2',
        name: '增加设备',
        component: () => import('@/views/live/index.vue'),
      },
    ],
  },
]