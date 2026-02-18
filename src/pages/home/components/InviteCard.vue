<template>
  <view class="invite-card">
    <view class="invite-content">
      <view class="invite-badge">
        <text class="badge-icon">⚡</text>
        <text class="badge-text">LIMITED OFFER</text>
      </view>
      <view class="invite-title">邀请邻居，永久返利</view>
      <view class="invite-desc">新用户首单后，您将永久获得其订单2%的积分奖励。</view>
    </view>
    <view class="invite-btn" @tap="handleInvite">
      <text>立即邀请</text>
      <t-icon name="chevron-right" size="28rpx" color="#ffffff" />
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  invite: [];
}>();

const handleInvite = () => {
  emit('invite');
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.invite-card {
  background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
  border-radius: 32rpx;
  padding: 32rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 12rpx 40rpx rgba(59, 130, 246, 0.25);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 200rpx;
    height: 200rpx;
    background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%);
    border-radius: 50%;
  }

  .invite-content {
    flex: 1;
    position: relative;
    z-index: 1;

    .invite-badge {
      display: inline-flex;
      align-items: center;
      gap: 8rpx;
      margin-bottom: 16rpx;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(12rpx);
      -webkit-backdrop-filter: blur(12rpx);
      padding: 10rpx 20rpx;
      border-radius: 32rpx;
      border: 1rpx solid rgba(255, 255, 255, 0.3);

      .badge-icon {
        font-size: 24rpx;
      }

      .badge-text {
        font-size: 20rpx;
        color: rgba(255, 255, 255, 0.95);
        font-weight: 600;
        letter-spacing: 2rpx;
      }
    }

    .invite-title {
      font-size: 32rpx;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 8rpx;
    }

    .invite-desc {
      font-size: 24rpx;
      color: rgba(255, 255, 255, 0.85);
      line-height: 1.5;
    }
  }

  .invite-btn {
    display: flex;
    align-items: center;
    gap: 8rpx;
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(12rpx);
    -webkit-backdrop-filter: blur(12rpx);
    padding: 20rpx 36rpx;
    border-radius: 40rpx;
    border: 1rpx solid rgba(255, 255, 255, 0.35);
    transition: all 0.2s;
    position: relative;
    z-index: 1;
    animation: breathing-btn 2s ease-in-out infinite;

    text {
      font-size: 26rpx;
      color: #ffffff;
      font-weight: 600;
    }

    &:active {
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0.95);
    }
  }
}

@keyframes breathing-btn {
  0%, 100% {
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.1);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.2);
    transform: scale(1.03);
  }
}
</style>
