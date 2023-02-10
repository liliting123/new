export default [
  {
    name: '我的面板',
    subRoutes: [
      {
        name: '首页',
        path: '/my_home/home',
        subname: 'web'
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
        subname: 'staff'
      },
      {
        name: '员工组列表',
        path: '/user_manage/user_group_list/user_group_list',
        subname: 'staff_group'
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
        subname: 'order'
      },
      {
        name: '退款列表',
        path: '/order_manage/refund_list/refund_list',
        subname: 'order_refund'
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
        subname: 'goods'
      },
      {
        name: '称重商品列表',
        path: '/product_manage/weighing_goods_list/weighing_goods_list',
        subname: 'weigh_goods'
      },
      {
        name: '分类列表',
        path: '/product_manage/classification_list/classification_list',
        subname: 'category'
      },
      {
        name: '供应商列表',
        path: '/product_manage/supplier_list/supplier_list',
        subname: 'supplier'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-document',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  },
  {
    name: '营销管理',
    subRoutes: [
      {
        name: '折扣促销',
        path: '/marketing_manage/discount_promotion/index',
        subname: 'discount'
      },
      {
        name: 'N件N折',
        path: '/marketing_manage/pieceN_foldN/index',
        subname: 'n_piece_fold'
      },
      {
        name: '组合促销',
        path: '/marketing_manage/combination_promotion/index',
        subname: 'combination'
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
        path: '/configuration_manage/store_settings',
        subname: 'shop'
      },
      {
        name: '支付设置',
        path: '/configuration_manage/payment_settings',
        subname: 'payment'
      }
    ],
    expanded: false,
    iconClassName: 'el-icon-setting',
    iconClassNameTop: 'el-icon-arrow-down',
    iconClassNameBottom: 'el-icon-arrow-up'
  }
]
