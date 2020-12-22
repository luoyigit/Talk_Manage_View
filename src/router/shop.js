import Layout from '@/layout'
export default [
  {
    path: '/shop',
    name: '电商系统',
    component: Layout,
    redirect: '/shop/listALL',
    children: [
      {
        path: '/shop/listALL',
        name: '商品列表',
        component: () => import('@/views/shop/index.vue'),
          meta:{
              title: '商品列表', showRole: true
          },
          children: [
              {
                  path: '/shop/list/addGoods',
                  name: '添加商品',
                  component: () => import('@/views/shop/addGoods.vue'),
                  meta:{
                      title: '添加商品', showRole: false,activeMenu:'@/views/shop/addGoods.vue'
                  },
              },
              {
                  path: '/shop/list/editGoods',
                  name: '编辑商品',
                  component: () => import('@/views/shop/editGoods.vue'),
                  meta:{
                      title: '编辑商品', showRole: false,activeMenu:'@/views/shop/editGoods.vue'
                  },
              }
          ]
      },
      {
        path: '/shop/order',
        name: '订单管理',
        component: () => import('@/views/shop/index.vue'),
      },
      {
        path: '/shop/list',
        name: '商品类别管理',
        component: () => import('@/views/shop/index.vue'),
      },
      {
        path: '/shop/sellerlist',
        name: '商家管理',
        component: () => import('@/views/shop/seller/list.vue'),
          meta:{
              title: '商家管理', showRole: true
          },
          children: [
              {
                  path: '/shop/sellerapply',
                  name: '商家申请',
                  component: () => import('@/views/shop/seller/sellerApply.vue'),
                  meta:{
                      title: '商家申请', showRole: false,activeMenu:'@/views/shop/seller/sellerApply.vue'
                  },
              }
          ]
      },
      {
        path: '/shop/list',
        name: '供应商管理',
        component: () => import('@/views/shop/index.vue'),
      },
        {
            path: '/shop/list',
            name: '店铺管理',
            component: () => import('@/views/shop/index.vue'),
        }
        ,
        {
            path: '/shop/listType',
            name: '商品类别',
            component: () => import('@/views/shop/shopType/index.vue'),
        }
    ],
  },
]
