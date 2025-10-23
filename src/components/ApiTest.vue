<template>
  <div>
    <h2>API 测试</h2>
    
    <button @click="testApi">测试接口</button>
    
    <div v-if="loading">加载中...</div>
    
    <div v-if="result">
      <h3>结果:</h3>
      <pre>{{ result }}</pre>
    </div>
    
    <div v-if="error">
      <h3>错误:</h3>
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const result = ref('')
const error = ref('')

const testApi = async () => {
  loading.value = true
  result.value = ''
  error.value = ''
  
  try {
    // 导入 shared-api 的默认导出（整个 api 对象）
    const api = await import('shared-api').then(m => m.default)
    console.log('shared-api 导入成功:', api)
    
    // 使用 api.auth 调用方式
    const response = await api.auth.sendRegisterCaptcha('2834379272@qq.com')
    result.value = JSON.stringify(response, null, 2)
    
  } catch (err: any) {
    console.error('测试失败:', err)
    error.value = err.message || '测试失败'
  } finally {
    loading.value = false
  }
}
</script>