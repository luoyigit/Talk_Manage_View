export default [
  {
    name: '总览',
    path: '/dept/index',
    icon: 'el-icon-s-home',
  },
  {
    name: '站内消息',
    path: '/dept/message/list',
    icon: 'el-icon-s-home',
  },
  {
    name: '项目管理',
    path: '/personal/project',
    icon: 'el-icon-s-management',
    children: [
      {
        path: '/dept/applicaiton/create',
        name: '采购立项申请',
      },
      {
        path: '/dept/applicaiton/list',
        name: '立项申请列表',
      },
    ],
  },

  {
    name: '合同管理',
    path: '/dept/contract',
    icon: 'el-icon-s-order',
    children: [
      {
        name: '发起合同审批',
        path: '/dept/contract/create',
      },
      {
        name: '部门合同列表',
        path: '/dept/contract/list',
      },
    ],
  },
  {
    name: '验收管理',
    path: '/dept/check',
    icon: 'el-icon-success',
    children: [
      {
        path: '/dept/check/download',
        name: '初步验收资料下载',
      },
      {
        path: '/dept/check/apply',
        name: '发起正式验收申请',
      },
      {
        path: '/dept/check/list',
        name: '正式验收申请列表',
      },
    ],
  },
  {
    name: '付款管理',
    path: '/dept/payment',
    icon: 'el-icon-success',
    children: [
      {
        path: '/dept/payment/apply',
        name: '提交付款申请',
      },
      {
        path: '/dept/payment/list',
        name: '付款申请列表',
      },
    ],
  },
  {
    name: '评价管理',
    path: '/dept/eval',
    icon: 'el-icon-s-order',
    children: [
      {
        path: '/pur/eval/supplier',
        name: '供应商评价管理',
      },
    ],
  },
  {
    name: '统计分析',
    path: '/dept/sta',
    icon: 'el-icon-s-order',
    children: [
      {
        path: '/pur/eval/supplier',
        name: '部门立项申请统计',
      },
      {
        path: '/pur/eval/supplier',
        name: '自行采购统计',
      },
      {
        path: '/pur/eval/supplier',
        name: '政采云采购统计',
      },
      {
        path: '/pur/eval/supplier',
        name: '立项申请类型统计',
      },
      {
        path: '/pur/eval/supplier',
        name: '按采购方式统计',
      },
    ],
  },
]
