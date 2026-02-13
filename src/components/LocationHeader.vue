<template>
  <!-- #ifdef MP-WEIXIN -->
  <view class="location-header" :style="headerStyle">
    <view class="brand-location mp-weixin" :style="{ top: brandLocationTop }" @click="goToCitySelect">
      <text class="brand-text">邻檬智付</text>
      <text class="dot">·</text>
      <text class="city-text">{{ displayCityName }}</text>
      <t-icon name="chevron-down" size="32rpx" color="#fff" class="arrow-icon" />
    </view>
  </view>
  <!-- #endif -->
  <!-- #ifndef MP-WEIXIN -->
  <view class="location-header" :style="headerStyle">
    <view class="brand-location" @click="goToCitySelect">
      <text class="brand-text">邻檬智付</text>
      <text class="dot">·</text>
      <text class="city-text">{{ displayCityName }}</text>
      <t-icon name="chevron-down" size="32rpx" color="#fff" class="arrow-icon" />
    </view>
  </view>
  <!-- #endif -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const menuButtonInfo = ref({ top: 0, height: 0 });

onMounted(() => {
  // #ifdef MP-WEIXIN
  // 获取胶囊按钮位置，用于对齐
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  
  // 计算文字位置
  // 文字应该与胶囊按钮垂直居中对齐
  const centerY = menuButton.top + menuButton.height / 2;
  const textHeight = 20; // 文字大约高度
  const textTop = centerY - textHeight / 2;
  brandLocationTop.value = `${textTop}px`;
  // #endif
  
  uni.$on('updateCity', handleCityUpdate);
});

const currentCity = ref('赣州');
const isLocated = ref(false);
const brandLocationTop = ref('60px'); // 小程序端文字位置的默认值

const displayCityName = computed(() => {
  if (isLocated.value) {
    return currentCity.value.replace('市', '');
  } else {
    return '选择城市';
  }
});

// 计算头部样式
const headerStyle = computed(() => {
  // #ifdef MP-WEIXIN
  // 小程序端：高度包含状态栏，内容定位
  const systemInfo = uni.getSystemInfoSync();
  const statusBarHeight = systemInfo.statusBarHeight || 44;
  
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: `${statusBarHeight + 44}px`, // 状态栏 + 44px内容区
    zIndex: 100
  };
  // #endif
  
  // #ifndef MP-WEIXIN
  // H5 端：固定高度
  return {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100rpx',
    paddingLeft: '32rpx',
    paddingRight: '32rpx',
    display: 'flex',
    alignItems: 'center',
    zIndex: 100
  };
  // #endif
});

const goToCitySelect = () => {
  uni.navigateTo({
    url: '/pages/city-select/index',
    animationType: 'slide-in-bottom',
    animationDuration: 300
  });
};

// 监听城市更新事件
const handleCityUpdate = (city: string) => {
  currentCity.value = city;
  isLocated.value = true;
};

onUnmounted(() => {
  uni.$off('updateCity', handleCityUpdate);
});
</script>

<style lang="less" scoped>
.location-header {
  position: relative;
  z-index: 100;
  
  /* 小程序端样式 */
  /* #ifdef MP-WEIXIN */
  .brand-location.mp-weixin {
    position: absolute;
    left: 32rpx;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.2s;
    /* top 在 onMounted 中通过 style 动态设置 */
    
    &:active {
      opacity: 0.7;
    }
  }
  /* #endif */
  
  /* H5 端样式 */
  /* #ifndef MP-WEIXIN */
  display: flex;
  align-items: center;
  padding-left: 32rpx;
  padding-right: 32rpx;
  /* #endif */
  
  .brand-location {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:active {
      opacity: 0.7;
    }
    
    .brand-text {
      font-size: 32rpx;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: 0.5rpx;
    }

    .dot {
      color: #ffffff;
      margin: 0 4rpx;
      font-weight: bold;
      font-size: 28rpx;
    }

    .city-text {
      font-size: 28rpx;
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.5rpx;
      margin-right: 2rpx;
    }
    
    .arrow-icon {
      margin-top: 4rpx;
      width: 26rpx !important;
      height: 26rpx !important;
      transition: transform 0.3s ease;
    }
  }
  
  &:active .arrow-icon {
    transform: rotate(180deg);
  }
}
</style>
