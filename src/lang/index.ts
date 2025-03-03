import { createI18n } from 'vue-i18n'
import enLocale from './en'
import zhLocale from './zh-cn'
//创建i18n对象
const i18n = createI18n({
  locale: localStorage.getItem('language') || 'zh-cn', //默认显示的语言
  fallbackLocale: localStorage.getItem('language') || 'zh-cn', //预设语言环境
  globalInjection: true, //全局生效$t
  legacy: false,
  messages: {
    'zh-cn': zhLocale,
    en: enLocale,
  },
})
export default i18n
