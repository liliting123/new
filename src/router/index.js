import Vue from 'vue'
import Router from 'vue-router'
import Interception from './interception.js'

// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(Router)

const loadOnDemand = function(file) {
  return () => import(/* webpackChunkName: "chunk" */ '@/page/' + file)
}

// 404页面
const NotFound = loadOnDemand('404')
const LayoutSide = loadOnDemand('layout_side') // 侧边二级导航栏
// 登录
const Login = loadOnDemand('login')
// 忘记密码
const ForgotPassword = loadOnDemand('forgotPassword')
// 我的
const Home = loadOnDemand('my_home/home')
// 用户管理
const UserList = loadOnDemand('user_manage/user_list/user_list')
const UserGroupList = loadOnDemand('user_manage/user_group_list/user_group_list')
// 订单列表
const OrderList = loadOnDemand('order_manage/order_list/order_list')
// 查看订单
const OrderDetail = loadOnDemand('order_manage/order_list/orderDetail')
// 退款列表
const RefundList = loadOnDemand('order_manage/refund_list/refund_list')
// 店铺设置
const StoreSettings = loadOnDemand('configuration_manage/store_settings')
// 支付设置
const PaymentSettings = loadOnDemand('configuration_manage/payment_settings')
// 普通商品列表
const NormalProductList = loadOnDemand(
  'product_manage/normal_product_list/normal_product_list'
)
// 普通商品列表-添加商品
const AddProduct = loadOnDemand('product_manage/normal_product_list/add_product')
// 称重商品列表
const WeighingGoods = loadOnDemand(
  'product_manage/weighing_goods_list/weighing_goods_list'
)
// 添加称重商品
const AddWeighingItem = loadOnDemand(
  'product_manage/weighing_goods_list/add_weighing_item'
)
// 分类列表
const ClassificationList = loadOnDemand(
  'product_manage/classification_list/classification_list'
)
// 供应商列表
const SupplierList = loadOnDemand('product_manage/supplier_list/supplier_list')
// 折扣促销
const DiscountPromotion = loadOnDemand('marketing_manage/discount_promotion/index')
// 折扣促销 - 添加折扣促销
const AddDiscount = loadOnDemand('marketing_manage/discount_promotion/addDiscount')
// N件N折
const NpieceNfold = loadOnDemand('marketing_manage/pieceN_foldN/index')
// N件N折 - 添加N件N折
const addPieceN = loadOnDemand('marketing_manage/pieceN_foldN/addPieceN')
// 组合促销
const CombinationPromotion = loadOnDemand('marketing_manage/combination_promotion/index')
// 组合促销 - 添加组合促销
const addCombination = loadOnDemand('marketing_manage/combination_promotion/addCombination')

export const constantRouterMap = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/forgotPassword',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/',
    redirect: '/my_home/home',
    component: LayoutSide,
    children: [
      {
        path: '/my_home/home',
        name: '首页',
        subname: 'web',
        component: Home
      }
    ]
  },
  // 营销管理
  {
    path: '/marketing_manage',
    component: LayoutSide,
    children: [
      {
        path: 'discount_promotion',
        name: '折扣促销',
        subname: 'discount',
        component: DiscountPromotion
      },
      {
        path: 'discount_promotion/add_discount',
        name: '添加折扣促销',
        subname: 'add_discount',
        component: AddDiscount
      },
      {
        path: 'discount_promotion/edit_discount/:id',
        name: '编辑折扣促销',
        subname: 'edit_discount',
        component: AddDiscount
      },
      {
        path: 'pieceN_foldN',
        name: 'N件N折',
        subname: 'n_piece_fold',
        component: NpieceNfold
      },
      {
        path: 'pieceN_foldN/add_pieceN',
        name: '添加N件N折',
        subname: 'add_pieceN',
        component: addPieceN
      },
      {
        path: 'pieceN_foldN/edit_pieceN/:id',
        name: '编辑N件N折',
        subname: 'edit_pieceN',
        component: addPieceN
      },
      {
        path: 'combination_promotion',
        name: '组合促销',
        subname: 'combination',
        component: CombinationPromotion
      },
      {
        path: 'combination_promotion/add_combination',
        name: '添加组合促销',
        subname: 'add_combination',
        component: addCombination
      },
      {
        path: 'combination_promotion/edit_combination/:id',
        name: '编辑组合促销',
        subname: 'edit_combination',
        component: addCombination
      }
    ]
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]
export const otherRouter = [
  // 用户管理
  {
    path: '/user_manage',
    component: LayoutSide,
    children: [
      {
        path: 'user_list',
        name: '员工列表',
        subname: 'staff',
        component: UserList
      },
      {
        path: 'user_group_list',
        name: '员工组列表',
        subname: 'staff_group',
        component: UserGroupList
      }
    ]
  },
  {
    path: '/order_manage',
    component: LayoutSide,
    children: [
      {
        path: 'order_list',
        name: '订单列表',
        subname: 'order',
        component: OrderList,
        meta: { keepAlive: false }
      },
      {
        path: 'order_list/orderDetail/:id',
        name: '订单详情',
        subname: 'order',
        component: OrderDetail
      },
      {
        path: 'refund_list',
        name: '退款列表',
        subname: 'order_refund',
        component: RefundList
      }
    ]
  },
  {
    path: '/product_manage',
    component: LayoutSide,
    children: [
      {
        path: 'normal_product_list',
        name: '普通商品列表',
        subname: 'goods',
        component: NormalProductList,
        meta: { keepAlive: false }
      },
      {
        path: 'normal_product_list/add_product',
        name: '添加商品',
        subname: 'goods',
        component: AddProduct,
        meta: { keepAlive: true }
      },
      {
        path: 'normal_product_list/edit_product/:id',
        name: '编辑商品',
        subname: 'goods',
        component: AddProduct,
        meta: { keepAlive: false }
      },
      {
        path: 'weighing_goods_list',
        name: '称重商品列表',
        subname: 'weigh_goods',
        component: WeighingGoods
      },
      {
        path: 'weighing_goods_list/add_weighing_item',
        name: '添加称重商品',
        subname: 'weigh_goods',
        component: AddWeighingItem,
        meta: { keepAlive: true }
      },
      {
        path: 'weighing_goods_list/edit_weighing_item/:id',
        name: '编辑称重商品',
        subname: 'weigh_goods',
        component: AddWeighingItem
      },
      {
        path: 'classification_list',
        name: '分类列表',
        subname: 'category',
        component: ClassificationList
      },
      {
        path: 'supplier_list',
        name: '供应商列表',
        subname: 'supplier',
        component: SupplierList
      }
    ]
  },
  {
    path: '/configuration_manage',
    component: LayoutSide,
    children: [
      {
        path: 'store_settings',
        name: '店铺设置',
        subname: 'shop',
        component: StoreSettings
      },
      {
        path: 'payment_settings',
        name: '支付设置',
        subname: 'payment',
        component: PaymentSettings
      }
    ]
  }
]

const router = new Router({
  routes: constantRouterMap
})

router.beforeEach(Interception(router))
export default router
