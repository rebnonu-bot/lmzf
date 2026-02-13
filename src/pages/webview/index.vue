<template>
  <view class="webview-page">
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="navBarStyle">
      <view class="back-btn" @tap="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#333" />
      </view>
      <text class="nav-title">网页浏览</text>
      <view class="placeholder"></view>
    </view>
    
    <!-- WebView -->
    <web-view v-if="url" :src="url" class="webview" />
    
    <!-- 空状态 -->
    <view v-else class="empty-state">
      <t-icon name="internet" size="80rpx" color="#CBD5E1" />
      <text class="empty-text">无效的链接</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

const url = ref('');
const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

onLoad((options) => {
  if (options?.url) {
    url.value = decodeURIComponent(options.url);
  }
});

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif
});

const navBarStyle = computed(() => {
  // #ifdef MP-WEIXIN
  const top = menuButtonInfo.value.top;
  const height = menuButtonInfo.value.height;
  return {
    paddingTop: `${top}px`,
    height: `${height}px`
  };
  // #endif
  
  // #ifndef MP-WEIXIN
  return {
    paddingTop: `${statusBarHeight.value}px`,
    height: '44px'
  };
  // #endif
});

const goBack = () => {
  uni.navigateBack();
};
</script>

<style scoped>
.webview-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  background: #fff;
  border-bottom: 1rpx solid #f0f0f0;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 500;
  color: #333;
}

.placeholder {
  width: 60rpx;
}

.webview {
  flex: 1;
  width: 100%;
}

.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20rpx;
}

.empty-text {
  font-size: 28rpx;
  color: #999;
}
</style>
