import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import en from './en.js'
import cn from './cn.js'

export default {
  en: {
    ...en,
    ...enLocale
  },
  cn: {
    ...cn,
    ...zhLocale
  }
}
