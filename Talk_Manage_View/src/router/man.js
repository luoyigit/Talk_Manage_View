import Layout from '@/layout'

export default [
    {
        path: '/man',
        name: '人才系统',
        component: Layout,
        redirect: '/man/list',
        children: [
            {
                path: '/man/list',
                name: '工人管理',
                component: () => import('@/views/man/index.vue'),
                meta: {
                    title: '工人管理', showRole: true
                },
                children: [
                    {
                        path: '/man/list/addWorker',
                        name: '工人申请',
                        component: () => import('@/views/man/addWorker.vue'),
                        meta: {
                            title: '工人申请', showRole: false,activeMenu:'@/views/man/addWorker.vue'
                        },
                    },
                ]

            },

            {
                path: '/man/listgz',
                name: '工长管理',
                component: () => import('@/views/man/gz/list.vue'),
            },
            {
                path: '/man/skill',
                name: '技能管理',
                component: () => import('@/views/man/skill/index.vue'),
            },
            {
                path: '/man/list/addWorker',
                name: '添加工人',
                component: () => import('@/views/man/addWorker.vue'),

            },

        ],
    },
]