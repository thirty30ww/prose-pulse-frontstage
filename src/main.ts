import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
// 导入Element Plus图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 注册全局组件
const app = createApp(App)

// pinia 持久化配置
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册Element Plus
app.use(ElementPlus, {
    locale: zhCn,
    button: { round: true }
})

// 注册路由
app.use(router)

app.mount('#app')
