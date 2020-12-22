import Layout from '@/layout'
export default [
  {
    path: '/service',
    name: '服务治理',
    component: Layout,
    redirect: '/service/list',
    children: [
      {
        path: '/service/list',
        name: '服务管理',
        component: () => import('@/views/service/index.vue'),
      },
      {
        path: '/service/online',
        name: '在线服务',
        component: () => import('@/views/service/onlineService.vue'),
      },
      {
        path: '/service/offline',
        name: '离线服务',
        component: () => import('@/views/service/offlineList.vue'),
      },
      {
        path: '/service/config',
        name: '配置中心',
        component: () => import('@/views/service/config/index.vue'),
      },
    ],
  },
]
