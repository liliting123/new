// 国际化插件
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from '../vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn',
  messages
})
export default i18n
