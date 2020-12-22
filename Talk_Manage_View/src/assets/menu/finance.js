export default [
  {
    name: '总览',
    path: '/finance/index',
    icon: 'el-icon-s-home',
  },
  {
    name: '站内消息',
    path: '/finance/message/list',
    icon: 'el-icon-s-home',
  },
  {
    name: '合同查询',
    path: '/finance/contract-list',
    icon: 'el-icon-s-home',
  },
  {
    name: '付款管理',
    path: '/finance/payment',
    icon: 'el-icon-s-open',
    children: [
      {
        name: '待审付款申请',
        path: '/pur/assign',
      },
      {
        name: '待处理付款申请',
        path: '/pur/assign',
      },
    ],
  },
  {
    name: '质保、履约金管理',
    path: '/finance/bail',
    icon: 'el-icon-s-open',
    children: [
      {
        name: '待退履约金',
        path: '/pur/bail',
      },
      {
        name: '待退质保金',
        path: '/pur/bail',
      },
      {
        name: '已退履约金',
        path: '/pur/bail',
      },
      {
        name: '已退质保金',
        path: '/pur/bail',
      },
    ],
  },
  {
    name: '统计分析',
    path: '/finance/payment',
    icon: 'el-icon-s-open',
    children: [
      {
        name: '付款统计',
        path: '/pur/assign',
      },
      {
        name: '质保金统计',
        path: '/pur/assign',
      },
    ],
  },
]
