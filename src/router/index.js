import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const loadOnDemand = function(file) {
  return () => import(/* webpackChunkName: "chunk" */ '@/page/' + file)
}
const LayoutSide = loadOnDemand('layout_side') // 侧边二级导航栏

// 我的
const Home = loadOnDemand('my_home/home') // 首页
// 用户管理
const UserList = loadOnDemand('user_manage/user_list/user_list')
const UserGroupList = loadOnDemand('user_manage/user_group_list/user_group_list')
// 订单管理
const OrderList = loadOnDemand('order_manage/order_list/order_list')
const RefundList = loadOnDemand('order_manage/refund_list/refund_list')
var router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/my_home/home',
      component: LayoutSide,
      children: [
        {
          path: '/my_home/home',
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
          path: '/user_manage/user_list/user_list',
          name: 'user_list',
          component: UserList,
          meta: { keepAlive: true }
        },
        {
          path: '/user_manage/user_group_list/user_group_list',
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
          path: '/order_manage/order_list/order_list',
          name: 'order_list',
          component: OrderList,
          meta: { keepAlive: true }
        },
        {
          path: '/order_manage/refund_list/refund_list',
          name: 'refund_list',
          component: RefundList
        }
      ]
    }
  ]
})

export default router
