import { createApp } from 'vue'

// 暗黑主题样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 暗黑模式自定义变量
import '@/styles/dark/css-vars.css'
import '@/styles/index.scss'
import 'uno.css'

// 本地SVG图标
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'
import { setupPermission } from './utils/permission'
import i18n from '@/lang/index'

const app = createApp(App)

// import zhCn from 'element-plus/es/locale/lang/en'
import { setupStore } from './store'
setupStore(app)

//size: enum('large'| 'default'| 'small')
// app.use(ElementPlus, { size: 'default', zIndex: 3000, locale: zhCn })

// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

setupPermission()
app.use(router)

app.use(i18n)

app.mount('#app')
