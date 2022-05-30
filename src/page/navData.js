export default [
  {
    name: '我的面板',
    subRoutes: [
      {
        name: '首页',
        path: '/my_home/home',
        subname: 'home'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-tickets',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  },
  {
    name: '用户管理',
    subRoutes: [
      {
        name: '员工列表',
        path: '/user_manage/user_list/user_list',
        subname: 'user_list'
      },
      {
        name: '员工组列表',
        path: '/user_manage/user_group_list/user_group_list',
        subname: 'user_group_list'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-s-custom',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  },
  {
    name: '订单管理',
    subRoutes: [
      {
        name: '订单列表',
        path: '/order_manage/order_list/order_list',
        subname: 'order_list'
      },
      {
        name: '退款列表',
        path: '/order_manage/refund_list/refund_list',
        subname: 'refund_list'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-document',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  },
  {
    name: '商品管理',
    subRoutes: [
      {
        name: '普通商品列表',
        path: '/product_manage/normal_product_list/normal_product_list',
        subname: 'normal_product_list'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-document',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  }
]
