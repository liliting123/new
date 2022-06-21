export default [
  {
    name: '我的面板',
    subRoutes: [
      {
        name: '首页',
        path: '/my_home/home',
        subname: '首页'
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
        subname: '员工列表'
      },
      {
        name: '员工组列表',
        path: '/user_manage/user_group_list/user_group_list',
        subname: '员工组列表'
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
        subname: '订单列表'
      },
      {
        name: '退款列表',
        path: '/order_manage/refund_list/refund_list',
        subname: '退款列表'
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
        subname: '普通商品列表'
      },
      {
        name: '称重商品列表',
        path: '/product_manage/weighing_goods_list/weighing_goods_list',
        subname: '称重商品列表'
      },
      {
        name: '分类列表',
        path: '/product_manage/classification_list/classification_list',
        subname: '分类列表'
      },
      {
        name: '供应商列表',
        path: '/product_manage/supplier_list/supplier_list',
        subname: '供应商列表'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-document',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  },
  {
    name: '配置管理',
    subRoutes: [
      {
        name: '店铺设置',
        path: 'configuration_manage/store_settings',
        subname: '店铺设置'
      },
      {
        name: '支付设置',
        path: '/configuration_manage/payment_settings',
        subname: '支付设置'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-setting',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  }
]
