import Layout from '@/layout'
export default [
  {
    path: '/renovation',
    name: '装修系统',
    component: Layout,
    redirect: '/project/list',
    children: [
      {
        path: '/project/list',
        name: '工程管理',
        component: () => import('@/views/project/index.vue'),
        meta: {title: '工程管理', showRole: true,},
        children: [
            {
                path: '/project/list/addProject',
                name: "添加工程",
                component: () => import('@/views/project/addProject.vue'),
                meta: {
                    title: '添加工程',
                    showRole: false,
                    activeMenu: '@/views/project/addProject.vue'
                },

            },
            {
                path: '/project/list/projectDetail',
                name: "工程详情",
                component: () => import('@/views/project/projectDetail.vue'),
                meta: {
                    title: '工程详情',
                    showRole: false,
                    activeMenu: '@/views/project/projectDetail.vue'
                }
            },
            {
                path: '/project/list/editProject',
                name: "工程编辑",
                component: () => import('@/views/project/editProject.vue'),
                meta: {
                    title: '工程编辑',
                    showRole: false,
                    activeMenu: '@/views/project/editProject.vue'
                }
            }

        ]
    },
      {
        path: '/renovation/list',
        name: '在修项目',
        component: () => import('@/views/renovation/index.vue'),
          meta: {title: '在修项目', showRole: true,},
          children:[
              {
                  path: '/renovation/list/addRenovation',
                  name: "添加装修",
                  component: () => import('@/views/renovation/addRenovation.vue'),
                  meta: {
                      title: '添加装修',
                      showRole: false,
                      activeMenu: '@/views/renovation/addRenovation.vue'
                  }
              },
              {
                  path: '/renovation/list/editRenovation',
                  name: "添加装修",
                  component: () => import('@/views/renovation/editRenovation.vue'),
                  meta: {
                      title: '编辑装修',
                      showRole: false,
                      activeMenu: '@/views/renovation/editRenovation.vue'
                  }
              }
          ]
      },
      {
        path: '/renovation/progress',
        name: '进度管理',
        component: () => import('@/views/renovation/index.vue'),
      },
        {
            path: '/project/decorationDetails',
            name: '装修细项',
            component: () => import('@/views/renovation/decorationDetails/index.vue'),
        },
        {
            path: '/renovation/history',
            name: '装修历史',
            component: () => import('@/views/renovation/historyList.vue'),
        },
    ]
  }]
