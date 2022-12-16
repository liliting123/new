// import {Message} from 'element-ui'
import store from '@/store'
import { otherRouter } from './index'
import { clone } from './util'
import i18n from '../lib/vue-i18n/i18n'

// // 动态添加路由表
// const addRouterMap = function(router, next, to) {
//   let filteredRouterMap = clone['array'](constantRouterMap)
//   router.addRoutes(constantRouterMap)
//   store.commit('router/saveRouterMap', { filteredRouterMap })
//   store.commit('switchPermissionMapFilterStatus', { status: true }) // 标记筛选完成
//   next({ path: to.path, query: to.query })
// }

// 动态添加路由表
const addRouterMap = function(router, next, to) {
  let permission = store.state.permission.permission

  for (var i = 0; i < otherRouter.length; i++) {
    if (otherRouter[i].children && otherRouter[i].children.length > 0) {
      for (var j = 0; j < otherRouter[i].children.length; j++) {
        if (
          otherRouter[i].children[j].subname &&
          permission.indexOf(otherRouter[i].children[j].subname) === -1
        ) {
          otherRouter[i].children.splice(j, 1)
          j--
        }
      }
    }
  }

  let filteredRouterMap = clone['array'](otherRouter)
  router.addRoutes(otherRouter)
  store.commit('router/saveRouterMap', { filteredRouterMap })
  store.commit('switchPermissionMapFilterStatus', { status: true }) // 标记筛选完成
  next({ path: to.path, query: to.query })
}

// 路由权限验证
const whiteList = ['Login', 'NotFound'] // 不重定向白名单

export default router => {
  return (to, from, next) => {
    const langs = localStorage.getItem('myLanguage') || 'cn'
    const title = i18n.messages[langs][to.name] || to.name
    document.title = title || ''

    if (store.state.token.token) {
      // 判断是否有token
      if (to.path.toLowerCase() === '/login') {
        console.log(store.state.isPermissionFilter, '11')
        next({ path: '/' })
      } else {
        if (!store.state.isPermissionFilter) {
          addRouterMap(router, next, to)
          console.log(store.state.isPermissionFilter)
          // next()
        } else if (
          (to.path.indexOf(from.path) === 0 || from.path.indexOf(to.path) === 0) &&
          from.path !== '/'
        ) {
          store.commit('switchSearchFlag', { res: false })
          next()
        } else {
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
