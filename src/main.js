// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import i18n from './lib/vue-i18n/i18n'
import './assets/font/iconfont.css'
// element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// normalize
import './lib/normalize/normalize.css'
// axios
import axios from './lib/axios'

Vue.use(elementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(axios)
// 初始化 token
store.commit('token/initToken')
store.commit('initLang')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
