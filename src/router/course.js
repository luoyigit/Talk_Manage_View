import Layout from '@/layout'
export default [
  {
    path: '/course',
    name: '教学系统',
    component: Layout,
    redirect: '/course/index',
    children: [
      {
        path: '/course/index',
        name: '作品管理',
        component: () => import('@/views/course/index.vue'),
        meta: {title: '作品管理', showRole: true,},
        children: [
            {
                path: '/course/index/add',
                name: "添加作品",
                component: () => import('@/views/course/add.vue'),
                meta: {
                    title: '添加作品',
                    showRole: false,
                    activeMenu: '@/views/course/add.vue'
                }
            },
            {
                path: '/course/index/edit',
                name: "编辑作品",
                component: () => import('@/views/course/edit.vue'),
                meta: {
                    title: '编辑作品',
                    showRole: false,
                    activeMenu: '@/views/course/edit.vue'
                }
            },
        ]
      },
      {
        path: '/course/type/list',
        name: '作品类别',
        component: () => import('@/views/course/coursetype/index.vue'),
      },

    ],
  },
]
