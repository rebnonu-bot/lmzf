<template>
  <view class="page-container">
    <view class="header" :style="headerStyle">
      <view class="back-icon" @click="handleBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="title">扫一扫</text>
      <view class="placeholder"></view>
    </view>

    <view class="scan-body">
      <!-- 模拟扫描框 -->
      <view class="scan-window-container">
        <view class="scan-window">
          <view class="corner top-left"></view>
          <view class="corner top-right"></view>
          <view class="corner bottom-left"></view>
          <view class="corner bottom-right"></view>
          <!-- 扫描线动画 -->
          <view class="scan-line"></view>
        </view>
        <view class="scan-tips">将二维码放入框内，即可自动扫描</view>
      </view>

      <view class="scan-actions">
        <view class="action-item" @click="toggleFlash">
          <view class="icon-wrapper">
            <t-icon :name="isFlashOn ? 'flash-on' : 'flash-off'" size="48rpx" color="#fff" />
          </view>
          <text>手电筒</text>
        </view>
        <view class="action-item" @click="chooseImage">
          <view class="icon-wrapper">
            <t-icon name="image" size="48rpx" color="#fff" />
          </view>
          <text>相册</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });
const isFlashOn = ref(false);

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif

  // 模拟自动调起扫码（如果是小程序环境，实际可以调用 uni.scanCode）
  // startScan();
});

const headerStyle = computed(() => {
  // #ifdef MP-WEIXIN
  const top = menuButtonInfo.value.top;
  const height = menuButtonInfo.value.height;
  return {
    paddingTop: `${top - 6}px`,
    paddingBottom: '12px',
    height: `${height + 12}px`,
    display: 'flex',
    alignItems: 'center'
  };
  // #endif

  // #ifndef MP-WEIXIN
  return {
    paddingTop: `${statusBarHeight.value}px`,
    height: '56px',
    display: 'flex',
    alignItems: 'center'
  };
  // #endif
});

const handleBack = () => {
  uni.navigateBack();
};

const toggleFlash = () => {
  isFlashOn.value = !isFlashOn.value;
  uni.showToast({ title: isFlashOn.value ? '已开启' : '已关闭', icon: 'none' });
};

const chooseImage = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      uni.showLoading({ title: '识别中...' });
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({ title: '识别成功', icon: 'success' });
      }, 1500);
    }
  });
};
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100vh;
  background-color: #000;
  display: flex;
  flex-direction: column;
}

.header {
  padding-left: 32rpx;
  padding-right: 32rpx;
  background-color: transparent;
  position: relative;
  z-index: 100;
  
  .back-icon {
    width: 80rpx;
    height: 80rpx;
    display: flex;
    alignItems: center;
    justifyContent: center;
  }
  
  .title {
    flex: 1;
    text-align: center;
    font-size: 34rpx;
    font-weight: 500;
    color: #fff;
    margin-right: 80rpx; /* 平衡返回按钮的宽度 */
  }
}

.scan-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100rpx;
}

.scan-window-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .scan-window {
    width: 500rpx;
    height: 500rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.2);
    position: relative;
    box-shadow: 0 0 0 1000rpx rgba(0, 0, 0, 0.5);
    
    .corner {
      position: absolute;
      width: 40rpx;
      height: 40rpx;
      border: 6rpx solid #3B82F6;
    }
    
    .top-left {
      top: -2rpx;
      left: -2rpx;
      border-right: none;
      border-bottom: none;
    }
    
    .top-right {
      top: -2rpx;
      right: -2rpx;
      border-left: none;
      border-bottom: none;
    }
    
    .bottom-left {
      bottom: -2rpx;
      left: -2rpx;
      border-right: none;
      border-top: none;
    }
    
    .bottom-right {
      bottom: -2rpx;
      right: -2rpx;
      border-left: none;
      border-top: none;
    }

    .scan-line {
      width: 100%;
      height: 4rpx;
      background: linear-gradient(to right, transparent, #3B82F6, transparent);
      position: absolute;
      top: 0;
      left: 0;
      animation: scan-move 3s linear infinite;
      box-shadow: 0 0 15rpx #3B82F6;
    }
  }
  
  .scan-tips {
    margin-top: 60rpx;
    font-size: 28rpx;
    color: rgba(255, 255, 255, 0.8);
  }
}

@keyframes scan-move {
  0% { top: 0; }
  100% { top: 100%; }
}

.scan-actions {
  position: absolute;
  bottom: 100rpx;
  display: flex;
  gap: 120rpx;
  
  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;
    
    .icon-wrapper {
      width: 100rpx;
      height: 100rpx;
      background-color: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }
    
    text {
      font-size: 24rpx;
      color: #fff;
    }
  }
}
</style>