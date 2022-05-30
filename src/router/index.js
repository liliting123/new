import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const loadOnDemand = function(file) {
  return () => import(/* webpackChunkName: "chunk" */ '@/page/' + file)
}
const LayoutSide = loadOnDemand('layout_side') // 侧边二级导航栏
// 登录
const Login = loadOnDemand('login') // 首页
// 我的
const Home = loadOnDemand('my_home/home') // 首页
// 用户管理
const UserList = loadOnDemand('user_manage/user_list/user_list')
const UserGroupList = loadOnDemand('user_manage/user_group_list/user_group_list')
// 订单管理
const OrderList = loadOnDemand('order_manage/order_list/order_list')
// 查看订单
const OrderDetail = loadOnDemand('order_manage/order_list/orderDetail')

const RefundList = loadOnDemand('order_manage/refund_list/refund_list')
var router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home',
      component: LayoutSide,
      children: [
        {
          path: '/home',
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
          path: '/user_list',
          name: 'user_list',
          component: UserList,
          meta: { keepAlive: true }
        },
        {
          path: '/user_group_list',
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
    }
  ]
})

export default router
