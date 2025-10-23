<template>
  <div class="register-container">
    <div class="register-form">
      <h2>用户注册</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input
            id="username"
            v-model="registerForm.username"
            type="text"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input
            id="email"
            v-model="registerForm.email"
            type="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input
            id="password"
            v-model="registerForm.password"
            type="password"
            required
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">确认密码:</label>
          <input
            id="confirmPassword"
            v-model="registerForm.confirmPassword"
            type="password"
            required
          />
        </div>
        <div class="form-group captcha-group">
          <label for="captcha">验证码:</label>
          <div class="captcha-input">
            <input
              id="captcha"
              v-model="registerForm.captcha"
              type="text"
              required
            />
            <button 
              type="button" 
              @click="sendCaptcha"
              :disabled="captchaLoading || captchaCountdown > 0"
            >
              {{ captchaButtonText }}
            </button>
          </div>
        </div>
        <button type="submit" :disabled="loading">
          {{ loading ? '注册中...' : '注册' }}
        </button>
      </form>
      <div class="register-links">
        <router-link to="/login">已有账号？立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from 'shared-api'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const captchaLoading = ref(false)
const captchaCountdown = ref(0)

const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  captcha: ''
})

const captchaButtonText = computed(() => {
  if (captchaCountdown.value > 0) {
    return `${captchaCountdown.value}s后重发`
  }
  return captchaLoading.value ? '发送中...' : '发送验证码'
})

const sendCaptcha = async () => {
  if (!registerForm.value.email) {
    alert('请先输入邮箱地址')
    return
  }

  captchaLoading.value = true
  await api.auth.sendRegisterCaptcha(registerForm.value.email)
  // 开始倒计时
  captchaCountdown.value = 60
  const timer = setInterval(() => {
    captchaCountdown.value--
    if (captchaCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  captchaLoading.value = false
}

const handleRegister = async () => {
  if (registerForm.value.password !== registerForm.value.confirmPassword) {
    alert('两次输入的密码不一致')
    return
  }

  loading.value = true
  const registerDto = {
    username: registerForm.value.username,
    email: registerForm.value.email,
    password: registerForm.value.password,
    confirmPassword: registerForm.value.confirmPassword,
    captcha: registerForm.value.captcha
  }
  
  const result = await api.auth.register(registerDto)
  
  // 注册成功后自动登录
  authStore.setAuth({
    accessToken: result.accessToken,
    refreshToken: result.refreshToken
  })
  
  router.push('/')
  loading.value = false
}
</script>