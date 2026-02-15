<template>
  <view class="error-boundary">
    <slot v-if="!hasError" />
    
    <!-- 错误状态 -->
    <view v-else class="error-container">
      <view class="error-icon">
        <t-icon name="error-circle" size="120rpx" color="#EF4444" />
      </view>
      
      <text class="error-title">页面出错了</text>
      
      <text v-if="isDev" class="error-message">{{ error?.message }}</text>
      <text v-else class="error-hint">请稍后重试或联系客服</text>
      
      <view class="error-actions">
        <t-button theme="primary" shape="round" @click="handleRetry">
          重新加载
        </t-button>
        
        <t-button 
          v-if="showHomeButton" 
          theme="light" 
          shape="round" 
          @click="goHome"
        >
          返回首页
        </t-button>
      </view>
      
      <!-- 折叠的错误详情（开发环境） -->
      <view v-if="isDev && errorInfo" class="error-detail">
        <view class="detail-header" @click="showDetail = !showDetail">
          <text class="detail-title">错误详情</text>
          <t-icon 
            :name="showDetail ? 'chevron-up' : 'chevron-down'" 
            size="32rpx" 
            color="#64748B" 
          />
        </view>
        <scroll-view v-if="showDetail" scroll-y class="detail-content">
          <text class="detail-text">{{ errorInfo }}</text>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, computed } from 'vue'
import config from '@/config'

interface Props {
  /** 是否显示返回首页按钮 */
  showHomeButton?: boolean
  /** 自定义错误处理 */
  onError?: (error: Error, errorInfo: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  showHomeButton: true,
})

const emit = defineEmits<{
  retry: []
  'error-captured': [error: Error, errorInfo: string]
}>()

// 错误状态
const hasError = ref(false)
const error = ref<Error | null>(null)
const errorInfo = ref('')
const showDetail = ref(false)

// 是否开发环境
const isDev = computed(() => config.isDev)

/**
 * 捕获子组件错误
 */
onErrorCaptured((err: Error, _instance, info: string) => {
  hasError.value = true
  error.value = err
  errorInfo.value = `${info}\n\n${err.stack || ''}`
  
  // 上报错误
  if (config.features.enableLogReport) {
    reportError(err, info)
  }
  
  // 调用自定义错误处理
  if (props.onError) {
    props.onError(err, info)
  }
  
  emit('error-captured', err, info)
  
  // 阻止错误继续传播
  return false
})

/**
 * 重新加载
 */
const handleRetry = () => {
  hasError.value = false
  error.value = null
  errorInfo.value = ''
  emit('retry')
}

/**
 * 返回首页
 */
const goHome = () => {
  uni.switchTab({
    url: '/pages/home/index',
  })
}

/**
 * 上报错误（生产环境）
 */
const reportError = (err: Error, info: string) => {
  // 这里可以接入错误上报服务，如 Sentry、Fundebug 等
  console.error('[Error Report]', {
    message: err.message,
    stack: err.stack,
    info,
    time: new Date().toISOString(),
    userAgent: uni.getSystemInfoSync(),
  })
}

/**
 * 手动触发错误（用于测试）
 */
const triggerError = (message: string) => {
  throw new Error(message)
}

// 暴露方法
defineExpose({
  triggerError,
})
</script>

<style lang="scss" scoped>
.error-boundary {
  width: 100%;
  min-height: 100%;
}

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 48rpx;
  min-height: 60vh;
}

.error-icon {
  margin-bottom: 32rpx;
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10rpx); }
  75% { transform: translateX(10rpx); }
}

.error-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16rpx;
}

.error-message {
  font-size: 26rpx;
  color: #ef4444;
  text-align: center;
  margin-bottom: 16rpx;
  padding: 0 32rpx;
  word-break: break-all;
}

.error-hint {
  font-size: 28rpx;
  color: #64748b;
  margin-bottom: 48rpx;
}

.error-actions {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
  width: 100%;
  max-width: 400rpx;
}

.error-detail {
  margin-top: 48rpx;
  width: 100%;
  background: #f8fafc;
  border-radius: 16rpx;
  overflow: hidden;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24rpx 32rpx;
  background: #f1f5f9;
}

.detail-title {
  font-size: 28rpx;
  font-weight: 500;
  color: #475569;
}

.detail-content {
  max-height: 400rpx;
  padding: 24rpx 32rpx;
}

.detail-text {
  font-size: 24rpx;
  color: #64748b;
  font-family: monospace;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
