export default [
    {
      path: '/shop/list',
      icon: 'el-icon-user-solid',
      name: '商品管理',
        children: [
            {
                path: '/shop/listALL',
                icon: 'el-icon-user-solid',
                name: '商品列表',
            },
            {
                path: '/shop/listType',
                icon: 'el-icon-user-solid',
                name: '商品类别',
            },

        ]
    },
    // {
    //     path: '/shop/listType',
    //     icon: 'el-icon-user-solid',
    //     name: '商品类别',
    // },
    {
        path: '/shop/3',
        icon: 'el-icon-user-solid',
        name: '订单管理',
    },
    {
        path: '/shop/sellerlist',
        icon: 'el-icon-user-solid',
        name: '商家管理',
    },
    {
        path: '/shop/4',
        icon: 'el-icon-user-solid',
        name: '店铺管理',
    },
    {
        path: '/shop/list3',
        icon: 'el-icon-user-solid',
        name: '广告管理',
      },
      {
        path: '/shop/list2',
        icon: 'el-icon-user-solid',
        name: '广告申请列表',
      }
  ]