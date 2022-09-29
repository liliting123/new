// import {Message} from 'element-ui'
import store from '@/store'
import { constantRouterMap } from './index'
import { clone } from './util'

// 动态添加路由表
const addRouterMap = function(router, next, to) {
  let filteredRouterMap = clone['array'](constantRouterMap)
  console.log(router, next, to)
  router.addRoutes(constantRouterMap)
  store.commit('router/saveRouterMap', { filteredRouterMap })
  store.commit('switchPermissionMapFilterStatus', { status: true }) // 标记筛选完成
  next({ path: to.path, query: to.query })
}
// 路由权限验证
const whiteList = ['Login', 'NotFound'] // 不重定向白名单

export default router => {
  return (to, from, next) => {
    if (store.state.token.token) {
      // 判断是否有token
      if (to.path.toLowerCase() === '/login') {
        next({ path: '/' })
      } else {
        if (!store.state.isPermissionFilter) {
          console.log('!!!!!noisPermissionFilter')
          next()
          addRouterMap(router, next, to)
        } else if (
          (to.path.indexOf(from.path) === 0 || from.path.indexOf(to.path) === 0) &&
          from.path !== '/'
        ) {
          console.log('searchfff')
          store.commit('switchSearchFlag', { res: false })
          next()
        } else {
          console.log('searchtttttt')
          store.commit('switchSearchFlag', { res: true })

          next()
        }
      }
    } else {
      if (whiteList.includes(to.name)) {
        // 在免登录白名单，直接进入
        next()
      } else {
        // Message({
        //   message: '请登录后再进行操作',
        //   type: 'error'
        // })
        if (to.path === '/forgotPassword') {
          next()
        } else {
          next('/login')
        }
      }
    }
  }
}
