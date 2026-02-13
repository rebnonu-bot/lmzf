<template>
  <view class="page-loader" v-if="show">
    <view class="loader-content">
      <view class="spinner">
        <view class="bounce1"></view>
        <view class="bounce2"></view>
        <view class="bounce3"></view>
      </view>
      <text class="loader-text">{{ text }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean;
  text?: string;
}>(), {
  text: '加载中...'
});
</script>

<style lang="less" scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(244, 249, 255, 0.9);
  backdrop-filter: blur(10rpx);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32rpx;
}

.spinner {
  display: flex;
  gap: 16rpx;
}

.spinner > view {
  width: 24rpx;
  height: 24rpx;
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
  border-radius: 50%;
  animation: bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  animation-delay: -0.16s;
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.loader-text {
  font-size: 28rpx;
  color: #64748B;
}
</style>
