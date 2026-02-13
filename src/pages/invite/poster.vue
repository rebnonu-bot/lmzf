<template>
  <view class="poster-page">
    <!-- 顶部渐变背景 -->
    <view class="header-bg"></view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="navBarStyle">
      <view class="back-btn" @tap="goBack">
        <t-icon name="chevron-left" size="48rpx" color="#fff" />
      </view>
      <text class="nav-title">邀请好友</text>
      <view class="placeholder"></view>
    </view>

    <!-- 海报预览区 -->
    <view class="poster-wrapper">
      <view class="poster-card">
        <!-- 海报头部 -->
        <view class="poster-header">
          <view class="brand-logo">LM</view>
          <view class="brand-info">
            <text class="brand-name">邻檬智付</text>
            <text class="brand-slogan">让天下没有难收的物业费</text>
          </view>
        </view>
        
        <!-- 中间内容 -->
        <view class="poster-body">
          <view class="invite-text">
            <text class="highlight">{{ userName }}</text>
            <text>邀请你一起</text>
          </view>
          <view class="benefit-card">
            <view class="benefit-icon">
              <t-icon name="gift" size="60rpx" color="#3B82F6" />
            </view>
            <text class="benefit-title">缴纳物业费 享积分抵扣</text>
            <view class="benefit-divider"></view>
            <text class="benefit-desc">100积分 = 1元现金抵扣</text>
          </view>
        </view>
        
        <!-- 底部二维码区 -->
        <view class="poster-footer">
          <view class="qrcode-box">
            <view class="qrcode-wrap">
              <t-icon name="qrcode" size="100rpx" color="#3B82F6" />
            </view>
            <text class="qrcode-tip">长按识别二维码</text>
          </view>
          <view class="reward-info">
            <view class="reward-badge">
              <t-icon name="bolt" size="28rpx" color="#F59E0B" />
              <text>永久返利</text>
            </view>
            <text class="reward-rate">新用户首单后得</text>
            <text class="reward-value">2%积分奖励</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 操作按钮区 -->
    <view class="action-area">
      <view class="action-card">
        <view class="action-btn save" @tap="savePoster">
          <view class="btn-icon">
            <t-icon name="download" size="40rpx" color="#fff" />
          </view>
          <view class="btn-text">
            <text class="btn-title">保存海报</text>
            <text class="btn-subtitle">分享到朋友圈</text>
          </view>
        </view>
        
        <view class="divider"></view>
        
        <view class="action-btn share" @tap="shareToFriend">
          <view class="btn-icon wechat">
            <t-icon name="chat" size="40rpx" color="#fff" />
          </view>
          <view class="btn-text">
            <text class="btn-title">微信好友</text>
            <text class="btn-subtitle">直接分享</text>
          </view>
        </view>
      </view>
      
      <!-- 规则说明 -->
      <view class="rule-tips">
        <view class="tips-dot"></view>
        <text>好友通过你的邀请注册，你将永久获得其每笔订单2%的积分奖励</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const userName = ref('邻檬用户');
const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

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

const savePoster = () => {
  uni.showLoading({ title: '生成中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '海报已保存', icon: 'success' });
  }, 1000);
};

const shareToFriend = () => {
  // #ifdef MP-WEIXIN
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  });
  uni.showToast({ title: '请点击右上角分享', icon: 'none' });
  // #endif
  
  // #ifndef MP-WEIXIN
  uni.showToast({ title: '请截图分享', icon: 'none' });
  // #endif
};
</script>

<style lang="less" scoped>
.poster-page {
  min-height: 100vh;
  background: #F4F9FF;
  position: relative;
  padding-bottom: 40rpx;
}

/* 顶部渐变背景 */
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400rpx;
  background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 60%, #F4F9FF 100%);
  z-index: 0;
}

/* 导航栏 */
.nav-bar {
  position: relative;
  z-index: 10;
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

/* 海报展示区 */
.poster-wrapper {
  position: relative;
  z-index: 1;
  padding: 40rpx 48rpx;
}

.poster-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(24rpx);
  border-radius: 32rpx;
  padding: 48rpx;
  box-shadow: 
    0 20rpx 60rpx rgba(59, 130, 246, 0.15),
    inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
}

/* 海报头部 */
.poster-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding-bottom: 40rpx;
  border-bottom: 2rpx dashed #E2E8F0;
}

.brand-logo {
  width: 88rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.3);
}

.brand-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.brand-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #1E293B;
}

.brand-slogan {
  font-size: 24rpx;
  color: #64748B;
}

/* 海报主体 */
.poster-body {
  padding: 48rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32rpx;
}

.invite-text {
  display: flex;
  align-items: center;
  gap: 12rpx;
  font-size: 30rpx;
  color: #475569;
  
  .highlight {
    font-weight: bold;
    color: #3B82F6;
    background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
    padding: 8rpx 20rpx;
    border-radius: 24rpx;
  }
}

.benefit-card {
  width: 100%;
  background: linear-gradient(135deg, #EFF6FF, #F4F9FF);
  border-radius: 24rpx;
  padding: 40rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;
  border: 2rpx solid rgba(59, 130, 246, 0.1);
}

.benefit-icon {
  width: 100rpx;
  height: 100rpx;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.15);
}

.benefit-title {
  font-size: 34rpx;
  font-weight: bold;
  color: #1E293B;
}

.benefit-divider {
  width: 60rpx;
  height: 4rpx;
  background: linear-gradient(90deg, transparent, #3B82F6, transparent);
  border-radius: 2rpx;
}

.benefit-desc {
  font-size: 28rpx;
  color: #64748B;
}

/* 海报底部 */
.poster-footer {
  display: flex;
  align-items: center;
  gap: 40rpx;
  padding-top: 40rpx;
  border-top: 2rpx dashed #E2E8F0;
}

.qrcode-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16rpx;
}

.qrcode-wrap {
  width: 180rpx;
  height: 180rpx;
  background: #fff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  border: 4rpx solid #F1F5F9;
}

.qrcode-tip {
  font-size: 24rpx;
  color: #94A3B8;
}

.reward-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16rpx;
}

.reward-badge {
  display: inline-flex;
  align-items: center;
  gap: 8rpx;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  align-self: flex-start;
  
  text {
    font-size: 26rpx;
    font-weight: 600;
    color: #D97706;
  }
}

.reward-rate {
  font-size: 26rpx;
  color: #64748B;
}

.reward-value {
  font-size: 48rpx;
  font-weight: bold;
  color: #F59E0B;
  background: linear-gradient(135deg, #FEF3C7, transparent);
  -webkit-background-clip: text;
  padding: 8rpx 0;
}

/* 操作区 */
.action-area {
  padding: 0 48rpx;
}

.action-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 32rpx;
  display: flex;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.06);
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 20rpx;
  padding: 24rpx;
  border-radius: 24rpx;
  
  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }
  
  &.save {
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
  }
  
  &.share {
    background: linear-gradient(135deg, #10B981, #34D399);
  }
}

.btn-icon {
  width: 72rpx;
  height: 72rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-text {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.btn-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}

.btn-subtitle {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.divider {
  width: 2rpx;
  background: #F1F5F9;
  margin: 0 24rpx;
}

/* 规则提示 */
.rule-tips {
  margin-top: 32rpx;
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
  padding: 24rpx 32rpx;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 20rpx;
  border: 1rpx solid rgba(59, 130, 246, 0.1);
  
  .tips-dot {
    width: 16rpx;
    height: 16rpx;
    background: #3B82F6;
    border-radius: 50%;
    margin-top: 8rpx;
    flex-shrink: 0;
  }
  
  text {
    flex: 1;
    font-size: 26rpx;
    color: #64748B;
    line-height: 1.6;
  }
}
</style>
