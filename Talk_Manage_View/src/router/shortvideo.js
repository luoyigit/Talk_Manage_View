import Layout from '@/layout'
export default [
  {
    path: '/shortvideo',
    name: '内容系统',
    component: Layout,
    redirect: '/shortvideo/list',
    children: [
      {
        path: '/shortvideo/list',
        name: '短视频管理',
        component: () => import('@/views/shortvideo/index.vue'),
      },
      {
        path: '/shortvideo/add',
        name: '添加视频',
        component: () => import('@/views/shortvideo/addvideo.vue'),
      },
      {
        path: '/shortvideo/approval',
        name: '视频审批',
        component: () => import('@/views/shortvideo/videoApproval.vue'),
      },
    ]
  }]
