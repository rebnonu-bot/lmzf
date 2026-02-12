<template>
  <view class="location-header" :style="headerStyle">
    <view class="brand-location" @click="goToCitySelect">
      <text class="brand-text">邻檬智付</text>
      <text class="dot">·</text>
      <text class="city-text">{{ currentCityName }}</text>
      <t-icon name="chevron-down" size="32rpx" color="#fff" class="arrow-icon" />
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

onMounted(() => {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  // 获取胶囊按钮位置
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif

  uni.$on('updateCity', handleCityUpdate);
});

const currentCity = ref('赣州');

const currentCityName = computed(() => {
  return currentCity.value.replace('市', '');
});

// 计算头部样式
const headerStyle = computed(() => {
  // #ifdef MP-WEIXIN
  // 小程序端，根据胶囊按钮位置动态计算，并增加上下间距让视觉更舒展
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
  // 非小程序端，增加固定高度
  return {
    paddingTop: `${statusBarHeight.value}px`,
    height: '56px',
    display: 'flex',
    alignItems: 'center'
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
};

onUnmounted(() => {
  uni.$off('updateCity', handleCityUpdate);
});
</script>

<style lang="less" scoped>
.location-header {
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  padding-left: 32rpx;
  padding-right: 32rpx;
  box-sizing: content-box; /* 确保 padding-top 不影响 height */
  
  .brand-location {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: opacity 0.2s;
    
    &:active {
      opacity: 0.7; /* 点击文字时有微弱反馈 */
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
      font-size: 28rpx; /* 调小城市文字大小 */
      font-weight: 600;
      color: #ffffff;
      letter-spacing: 0.5rpx;
      margin-right: 2rpx;
    }
    
    .arrow-icon {
      margin-top: 4rpx; /* 稍微向下偏移以对齐更小的文字 */
      width: 26rpx !important; /* 稍微缩小箭头 */
      height: 26rpx !important;
      transition: transform 0.3s ease;
    }
  }
  
  &:active .arrow-icon {
    transform: rotate(180deg);
  }
}
</style>
