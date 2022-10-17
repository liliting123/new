// 国际化插件
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import cn from './cn' // 中文
import en from './en' // 英语
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'cn',
  messages: {
    cn,
    en
  }
})
export default i18n
