import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import mutations from './mutations'
import actions from './actions'
import token from './modules/token'
import permission from './modules/permission'
import router from './modules/router'
Vue.use(Vuex)
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    token,
    router,
    permission
  }
})

export default store
