<template>
  <view class="skeleton-container">
    <!-- 顶部定位占位 -->
    <view class="skeleton-header"></view>
    
    <!-- 积分卡片骨架 -->
    <view class="skeleton-points"></view>
    
    <!-- 用户信息骨架 -->
    <view class="skeleton-user"></view>
    
    <!-- 功能模块骨架 -->
    <view class="skeleton-modules">
      <view v-for="i in 4" :key="i" class="skeleton-module">
        <view class="shimmer"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
// 骨架屏组件，无需额外逻辑
</script>

<style scoped>
.skeleton-container {
  min-height: 100vh;
  padding: 0 32rpx 40rpx;
  box-sizing: border-box;
}

/* 顶部定位占位 */
.skeleton-header {
  height: 88rpx;
  margin-bottom: 24rpx;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.08) 25%, rgba(59, 130, 246, 0.15) 50%, rgba(59, 130, 246, 0.08) 75%);
  background-size: 200% 100%;
  border-radius: 16rpx;
  animation: shimmer 1.5s infinite;
}

/* 积分卡片骨架 - 蓝色渐变占位 */
.skeleton-points {
  height: 280rpx;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(96, 165, 250, 0.1) 100%);
  border-radius: 32rpx;
  margin-bottom: 32rpx;
  position: relative;
  overflow: hidden;
}

.skeleton-points::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}

/* 用户信息骨架 */
.skeleton-user {
  height: 160rpx;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 32rpx;
  margin-bottom: 32rpx;
  position: relative;
  overflow: hidden;
}

.skeleton-user::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%);
  animation: shimmer 1.5s infinite;
}

/* 模块列表骨架 */
.skeleton-modules {
  display: flex;
  flex-direction: column;
  gap: 32rpx;
}

.skeleton-module {
  height: 180rpx;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 32rpx;
  overflow: hidden;
  position: relative;
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.08), transparent);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(250%);
  }
}
</style>
