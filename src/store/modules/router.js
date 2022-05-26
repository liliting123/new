import router from '../../router'
export default {
  namespaced: true,
  state: {
    filteredRouterMap: [] // 已经筛选过的路由
  },
  getters: {
    routerMap (state) {
      return router.options.routes[1].children.concat(state.filteredRouterMap.length ? state.filteredRouterMap[0].children : [])
    }
  },
  mutations: {
    saveRouterMap (state, {filteredRouterMap}) {
      state.filteredRouterMap = filteredRouterMap || []
    }
  }
}
