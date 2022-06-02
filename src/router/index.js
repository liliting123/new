import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const loadOnDemand = function(file) {
  return () => import(/* webpackChunkName: "chunk" */ '@/page/' + file)
}
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
const NormalProductList = loadOnDemand('product_manage/normal_product_list/normal_product_list')
// 普通商品列表-添加商品
const AddProduct = loadOnDemand('product_manage/normal_product_list/add_product')
var router = new Router({
  routes: [
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
      redirect: 'home',
      component: LayoutSide,
      children: [
        {
          path: 'home',
          name: 'home',
          component: Home
        }
      ]
    },
    // 商品管理
    {
      path: '/user_manage',
      component: LayoutSide,
      children: [
        {
          path: 'user_list',
          name: 'user_list',
          component: UserList,
          meta: { keepAlive: true }
        },
        {
          path: 'user_group_list',
          name: 'user_group_list',
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
          name: 'order_list',
          component: OrderList,
          meta: { keepAlive: true }
        },
        {
          path: 'order_list/orderDetail',
          name: 'orderDetail',
          component: OrderDetail,
          meta: { keepAlive: true }
        },
        {
          path: 'refund_list',
          name: 'refund_list',
          component: RefundList
        }
      ]
    },
    {
      path: '/product_manage',
      component: LayoutSide,
      children: [
        {
          path: 'normal_product_list/normal_product_list',
          name: 'normal_product_list',
          component: NormalProductList,
          meta: { keepAlive: true }
        },
        {
          path: 'normal_product_list/add_product',
          name: 'add_product',
          component: AddProduct,
          meta: { keepAlive: true }
        }
      ]
    },
    {
      path: '/configuration_manage',
      component: LayoutSide,
      children: [
        {
          path: 'store_settings',
          name: 'store_settings',
          component: StoreSettings
        },
        {
          path: 'payment_settings',
          name: 'payment_settings',
          component: PaymentSettings
        }
      ]
    }
  ]
})

export default router
