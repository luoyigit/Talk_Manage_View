import Layout from '@/layout'

export default [
    {
        path: '/user',
        name: '会员系统',
        component: Layout,
        redirect: '/user/list',
        children: [
            {
                path: '/user/list',
                name: '会员管理',
                component: () => import('@/views/user/index.vue'),
                meta: {title: '会员管理', showRole: true},
                children: [
                    {
                        path: '/user/list/addUser',
                        name: '添加会员',
                        component: () => import('@/views/user/addUser.vue'),
                        meta: {
                            title: "添加会员",
                            showRole: false,
                            activeMenu: '@/views/user/addUser.vue'
                        }

                    },
                    {
                        path: '/user/list/editUser',
                        name: '编辑会员',
                        component: () => import('@/views/user/editUser.vue'),
                        meta: {
                            title: "编辑会员",
                            showRole: false,
                            activeMenu: '@/views/user/editUser.vue'
                        }

                    },
                    {
                        path: '/user/list/userDetail',
                        name: '会员详情',
                        component: () => import('@/views/user/userDetail.vue'),
                        meta: {
                            title: "会员详情",
                            showRole: false,
                            activeMenu: '@/views/user/userDetail.vue'
                        }

                    }

                ]
            },
            {
                path: '/user/contentType',
                name: '内容分类',
                component: () => import('@/views/user/contentType/index.vue'),
                meta: {
                    title: '内容分类', showRole: true,

                },
            }

        ],
    },
]