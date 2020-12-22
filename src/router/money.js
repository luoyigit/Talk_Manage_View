import Layout from '@/layout'
export default [
  {
    path: '/money',
    name: '财务系统',
    component: Layout,
    redirect: '/money/list',
    children: [
      {
        path: '/money/list',
        name: '收入统计',
        component: () => import('@/views/money/index.vue'),
      },
      {
        path: '/money/skill',
        name: '会员管理',
        component: () => import('@/views/money/index.vue'),
      },
      {
        path: '/money/skill3',
        name: '积分管理',
        component: () => import('@/views/money/index.vue'),
      },
    ],
  },
]