<template>
  <view class="platforms-page">
    <!-- 顶部固定区域 -->
    <view class="header-fixed">
      <!-- 顶部渐变背景 -->
      <view class="header-bg"></view>
      
      <!-- 自定义导航栏 -->
      <view class="nav-bar" :style="navBarStyle">
        <view class="back-btn" @tap="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="nav-title">线上购物</text>
        <view class="placeholder"></view>
      </view>

      <!-- 顶部收益卡片 -->
      <view class="income-card">
        <view class="card-glow"></view>
        <view class="income-header">
          <view class="income-icon">
            <t-icon name="gift" size="48rpx" color="#F59E0B" />
          </view>
          <view class="income-info">
            <text class="income-label">通过以下平台购物</text>
            <text class="income-value">消费即可获得积分返利</text>
          </view>
        </view>
        <view class="income-divider"></view>
        <view class="income-footer">
          <view class="point-rule">
            <text class="highlight">100积分 = 1元</text>
            <text>可抵扣物业费</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 可滚动内容区 -->
    <view class="content-container">
      <scroll-view scroll-y class="scroll-content">
        <!-- 平台分类 -->
        <view class="category-list">
          <view class="category-section" v-for="(category, idx) in platformCategories" :key="idx">
            <view class="category-header">
              <view class="header-line"></view>
              <text class="category-name">{{ category.name }}</text>
              <view class="header-line"></view>
            </view>
            
            <view class="platform-grid">
              <view 
                v-for="(platform, index) in category.platforms" 
                :key="index"
                class="platform-item"
                @tap="goToPlatform(platform)"
              >
                <view class="item-glow"></view>
                <view class="platform-logo" :style="{ background: platform.bgColor }">
                  <text class="logo-text">{{ platform.icon }}</text>
                </view>
                <text class="platform-name">{{ platform.name }}</text>
                <view class="rebate-badge">
                  <text>{{ platform.rebate }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 底部说明 -->
        <view class="tips-card">
          <view class="tips-header">
            <t-icon name="info-circle" size="32rpx" color="#3B82F6" />
            <text>购物须知</text>
          </view>
          <view class="tips-list">
            <view class="tip-item">
              <view class="tip-dot"></view>
              <text>点击平台图标即可跳转购物</text>
            </view>
            <view class="tip-item">
              <view class="tip-dot"></view>
              <text>通过本页面跳转的订单自动记录返利</text>
            </view>
            <view class="tip-item">
              <view class="tip-dot"></view>
              <text>积分将在订单完成后24小时内到账</text>
            </view>
            <view class="tip-item">
              <view class="tip-dot"></view>
              <text>退货订单将扣除相应积分</text>
            </view>
          </view>
        </view>
        
        <!-- 底部留白 -->
        <view class="bottom-space"></view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { getPlatformList, type Platform, type PlatformCategory } from '@/api/modules/platform';

const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

const platformCategories = ref<PlatformCategory[]>([]);

const fetchPlatforms = async () => {
  try {
    const data = await getPlatformList();
    platformCategories.value = data;
  } catch (error) {
    console.error('Failed to fetch platforms:', error);
    uni.showToast({ title: '加载失败', icon: 'none' });
  }
};

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif

  fetchPlatforms();
});

const navBarStyle = computed(() => {
  // #ifdef MP-WEIXIN
  const top = menuButtonInfo.value.top;
  const height = menuButtonInfo.value.height;
  return { paddingTop: `${top}px`, height: `${height}px` };
  // #endif
  
  // #ifndef MP-WEIXIN
  return { paddingTop: `${statusBarHeight.value}px`, height: '44px' };
  // #endif
});

const goBack = () => {
  uni.navigateBack();
};

const goToPlatform = (platform: Platform) => {
  // #ifdef MP-WEIXIN
  if (platform.miniProgram) {
    uni.navigateToMiniProgram({
      appId: platform.miniProgram,
      path: 'pages/index/index',
      fail: () => openWebview(platform.url)
    });
  } else {
    openWebview(platform.url);
  }
  // #endif
  
  // #ifndef MP-WEIXIN
  openWebview(platform.url);
  // #endif
};

const openWebview = (url: string) => {
  uni.navigateTo({
    url: `/package-webview/pages/webview/index?url=${encodeURIComponent(url)}`
  });
};
</script>

<style lang="less" scoped>
page {
  height: 100vh;
  overflow: hidden;
}

.platforms-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F4F9FF;
}

/* 顶部固定区域 */
.header-fixed {
  position: relative;
  flex-shrink: 0;
  z-index: 10;
}

/* 顶部渐变背景 */
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 100%);
  z-index: -1;
}

/* 导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
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
  font-weight: 600;
  color: #fff;
}

.placeholder {
  width: 60rpx;
}

/* 收益卡片 */
.income-card {
  position: relative;
  margin: 24rpx 32rpx 32rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24rpx);
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 
    0 20rpx 60rpx rgba(59, 130, 246, 0.15),
    inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -50%;
  right: -30%;
  width: 80%;
  height: 100%;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
  pointer-events: none;
}

.income-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
}

.income-icon {
  width: 96rpx;
  height: 96rpx;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  border-radius: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 12rpx 32rpx rgba(245, 158, 11, 0.2);
}

.income-info {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.income-label {
  font-size: 28rpx;
  color: #64748B;
}

.income-value {
  font-size: 36rpx;
  font-weight: bold;
  color: #1E293B;
}

.income-divider {
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #E2E8F0, transparent);
  margin: 32rpx 0;
}

.income-footer {
  display: flex;
  justify-content: center;
}

.point-rule {
  display: flex;
  align-items: center;
  gap: 16rpx;
  padding: 16rpx 32rpx;
  background: linear-gradient(135deg, #FEF3C7, rgba(254, 243, 199, 0.5));
  border-radius: 32rpx;
  
  text {
    font-size: 28rpx;
    color: #92400E;
  }
  
  .highlight {
    font-weight: bold;
    color: #D97706;
  }
}

/* 内容容器 */
.content-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #F4F9FF;
}

.scroll-content {
  height: 100%;
}

/* 分类列表 */
.category-list {
  padding: 0 32rpx;
}

.category-section {
  margin-bottom: 40rpx;
}

.category-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.header-line {
  flex: 1;
  height: 2rpx;
  background: linear-gradient(90deg, transparent, #CBD5E1, transparent);
}

.category-name {
  font-size: 28rpx;
  font-weight: 600;
  color: #64748B;
}

/* 平台网格 */
.platform-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
}

.platform-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
  padding: 24rpx 0;
  background: #fff;
  border-radius: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
  
  &:active {
    transform: scale(0.95);
  }
}

.item-glow {
  position: absolute;
  top: -30%;
  left: -30%;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.platform-logo {
  width: 80rpx;
  height: 80rpx;
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

.logo-text {
  font-size: 28rpx;
  font-weight: bold;
  color: #fff;
}

.platform-name {
  font-size: 26rpx;
  color: #1E293B;
  font-weight: 500;
}

.rebate-badge {
  padding: 6rpx 16rpx;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  border-radius: 16rpx;
  
  text {
    font-size: 22rpx;
    color: #D97706;
    font-weight: 600;
  }
}

/* 底部提示卡片 */
.tips-card {
  margin: 24rpx 32rpx 0;
  background: #fff;
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 16rpx;
  margin-bottom: 24rpx;
  
  text {
    font-size: 30rpx;
    font-weight: 600;
    color: #1E293B;
  }
}

.tips-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.tip-dot {
  width: 12rpx;
  height: 12rpx;
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
  border-radius: 50%;
  margin-top: 10rpx;
  flex-shrink: 0;
}

.tip-item text {
  flex: 1;
  font-size: 26rpx;
  color: #64748B;
  line-height: 1.5;
}

.bottom-space {
  height: 40rpx;
}
</style>
