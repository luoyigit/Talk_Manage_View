import Layout from '@/layout'

export default [
    {
        path: '/project',
        name: '工程系统',
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
                        }
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
                    // {
                    //     path: '/project/list',
                    //     name: '工程管理',
                    //     component: () => import('@/views/project/index.vue'),
                    //     meta: {title: '工程管理', showRole: true,},
                    //     children: [
                    //         {
                    //             path: '/project/list/addProject',
                    //             name: "添加工程",
                    //             component: () => import('@/views/project/addProject.vue'),
                    //             meta: {
                    //                 title: '添加工程',
                    //                 showRole: false,
                    //                 activeMenu: '@/views/project/addProject.vue'
                    //             }
                    //         },

                    //     ]
                    // },
                ],
            },
        ]
    }
    ]
