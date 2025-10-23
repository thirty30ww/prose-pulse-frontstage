<template>
  <div class="home-container">
    <header class="header">
      <h1>欢迎来到前台系统</h1>
      <div class="user-info">
        <span>欢迎，用户！</span>
        <button @click="handleLogout">退出登录</button>
      </div>
    </header>
    <main class="main-content">
      <p>这是前台系统的首页</p>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  await router.push('/login')
}
</script>

<style scoped>
</style>