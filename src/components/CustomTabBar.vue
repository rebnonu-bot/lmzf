<template>
  <view class="custom-tab-bar-container">
    <view class="custom-tab-bar">
      <!-- 首页 -->
      <view class="tab-item" :class="{ active: localActive === 'home' }" @tap="goTo('/pages/home/index')">
        <t-icon 
          :name="localActive === 'home' ? 'home-filled' : 'home'" 
          size="48rpx" 
          :color="localActive === 'home' ? '#3b82f6' : '#64748b'"
          class="tab-icon" 
        />
        <text class="tab-text">首页</text>
      </view>

      <!-- 商家 -->
      <view class="tab-item" :class="{ active: localActive === 'stores' }" @tap="goTo('/pages/stores/index')">
        <t-icon 
          :name="localActive === 'stores' ? 'shop-filled' : 'shop'" 
          size="48rpx" 
          :color="localActive === 'stores' ? '#3b82f6' : '#64748b'"
          class="tab-icon" 
        />
        <text class="tab-text">商家</text>
      </view>

      <!-- 扫一扫 -->
      <view class="scan-wrapper" @tap="handleScan">
        <view class="scan-button">
          <t-icon name="qrcode" size="56rpx" color="#fff" class="scan-icon" />
        </view>
        <text class="scan-text">扫一扫</text>
      </view>

      <!-- 钱包 -->
      <view class="tab-item" :class="{ active: localActive === 'wallet' }" @tap="goTo('/pages/wallet/index')">
        <t-icon 
          :name="localActive === 'wallet' ? 'wallet-filled' : 'wallet'" 
          size="48rpx" 
          :color="localActive === 'wallet' ? '#3b82f6' : '#64748b'"
          class="tab-icon" 
        />
        <text class="tab-text">钱包</text>
      </view>

      <!-- 我的 -->
      <view class="tab-item" :class="{ active: localActive === 'my' }" @tap="goTo('/pages/my/index')">
        <t-icon 
          :name="localActive === 'my' ? 'user-filled' : 'user'" 
          size="48rpx" 
          :color="localActive === 'my' ? '#3b82f6' : '#64748b'"
          class="tab-icon" 
        />
        <text class="tab-text">我的</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  active: 'home' | 'stores' | 'wallet' | 'my'
}>();

const localActive = ref(props.active);

watch(() => props.active, (newVal) => {
  localActive.value = newVal;
}, { immediate: true });

onMounted(() => {
  localActive.value = props.active;
});

const goTo = (url: string) => {
  uni.switchTab({ url });
};

const handleScan = () => {
  uni.navigateTo({
    url: '/pages/scan/index'
  });
};
</script>

<style lang="less" scoped>
.custom-tab-bar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
  padding-bottom: env(safe-area-inset-bottom);
  /* 使用 filter drop-shadow 代替 box-shadow，让阴影跟随圆弧 */
  filter: drop-shadow(0 -4rpx 10rpx rgba(0, 0, 0, 0.05));
}

.custom-tab-bar {
  display: flex;
  height: 100rpx;
  align-items: center;
  position: relative;
  /* 使用伪元素实现圆弧凸起背景 */
  &::before {
    content: '';
    position: absolute;
    top: -40rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 120rpx;
    height: 120rpx;
    background-color: #ffffff;
    border-radius: 50%;
    z-index: -1;
  }
}

.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding-bottom: 16rpx;

  .tab-icon {
    margin-bottom: 6rpx;
  }

  .tab-text {
    font-size: 20rpx; /* Slightly smaller font for 5 items to fit comfortably */
    color: #64748b;
    font-weight: 500;
    line-height: 1;
  }

  &.active {
    .tab-text { color: #3b82f6; font-weight: 600; }
  }
}

.scan-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  height: 100%;
  padding-bottom: 16rpx;

  .scan-button {
    position: absolute;
    top: -50rpx;
    left: 50%;
    transform: translateX(-50%);
    width: 100rpx;
    height: 100rpx;
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.4);
    border: 8rpx solid #ffffff;
    /* 调慢呼吸动效，使其更平稳 */
    animation: scan-breathing 5s ease-in-out infinite;
    /* 强制开启 GPU 加速，解决卡顿感 */
    will-change: transform, box-shadow;
  }

  .scan-text {
    font-size: 20rpx; /* Slightly smaller font */
    color: #64748b;
    font-weight: 500;
    line-height: 1;
  }
}

@keyframes scan-breathing {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.4);
  }
  50% {
    transform: translateX(-50%) scale(1.05); /* 减小放大倍数，从 1.1 降到 1.05 */
    box-shadow: 0 10rpx 32rpx rgba(59, 130, 246, 0.5); /* 阴影也随之微调 */
  }
}
</style>