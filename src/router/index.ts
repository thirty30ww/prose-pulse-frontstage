import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/views/Home.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue'),
            meta: { requiresAuth: false }
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/Register.vue'),
            meta: { requiresAuth: false }
        }
    ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // 检查路由是否需要认证
    if (to.meta.requiresAuth && !authStore.userLoggedIn) {
        // 需要认证但未登录，跳转到登录页
        next('/login')
    } else if (!to.meta.requiresAuth && authStore.userLoggedIn) {
        // 已登录用户访问登录/注册页，跳转到首页
        if (to.path === '/login' || to.path === '/register') {
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router