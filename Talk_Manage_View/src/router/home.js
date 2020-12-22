import Layout from '@/layout'
export default [
  {
    path: '/home',
    name: 'HOME',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: '总览',
        component: () => import('views/home/home.vue'),
      },
      {
        path: '/home/backlog',
        name: '待办事项',
        component: () => import('@/views/home/backlog/index.vue'),
      },
    ],
  },
]
