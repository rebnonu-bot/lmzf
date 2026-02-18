<template>
  <view class="error-page">
    <view class="error-content">
      <view class="error-icon">
        <t-icon name="error-circle" size="120rpx" color="#EF4444" />
      </view>
      <text class="error-title">页面出错了</text>
      <text class="error-message">{{ message || '抱歉，发生了意外错误' }}</text>
      <view class="error-actions">
        <view class="action-btn primary" @tap="goHome">
          <t-icon name="home" size="32rpx" color="#ffffff" />
          <text>返回首页</text>
        </view>
        <view class="action-btn secondary" @tap="retry">
          <t-icon name="refresh" size="32rpx" color="#3B82F6" />
          <text>重新加载</text>
        </view>
      </view>
    </view>
    
    <!-- 错误详情（开发环境显示） -->
    <view v-if="isDev && detail" class="error-detail">
      <text class="detail-title">错误详情</text>
      <text class="detail-content">{{ detail }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import config from '@/config';

const isDev = config.isDev;
const message = ref('');
const detail = ref('');

onLoad((options) => {
  message.value = options?.message || '';
  detail.value = options?.detail || '';
});

const goHome = () => {
  uni.switchTab({ url: '/pages/home/index' });
};

const retry = () => {
  const pages = getCurrentPages();
  const prevPage = pages[pages.length - 2];
  
  if (prevPage) {
    uni.navigateBack();
  } else {
    goHome();
  }
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.error-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #F4F9FF 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx;

  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    .error-icon {
      width: 200rpx;
      height: 200rpx;
      background: linear-gradient(135deg, #FEE2E2, #FECACA);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 48rpx;
      animation: pulse 2s ease-in-out infinite;
    }

    .error-title {
      font-size: 40rpx;
      font-weight: 700;
      color: #1E293B;
      margin-bottom: 16rpx;
    }

    .error-message {
      font-size: 28rpx;
      color: #64748B;
      margin-bottom: 48rpx;
      line-height: 1.6;
    }

    .error-actions {
      display: flex;
      gap: 24rpx;

      .action-btn {
        display: flex;
        align-items: center;
        gap: 12rpx;
        padding: 24rpx 40rpx;
        border-radius: 28rpx;
        font-size: 28rpx;
        font-weight: 600;
        transition: all 0.2s;

        &.primary {
          background: linear-gradient(135deg, #3B82F6, #60A5FA);
          color: #ffffff;
          box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.3);

          &:active {
            transform: scale(0.95);
          }
        }

        &.secondary {
          background: #ffffff;
          color: #3B82F6;
          border: 2rpx solid #DBEAFE;

          &:active {
            background: #EFF6FF;
          }
        }
      }
    }
  }

  .error-detail {
    margin-top: 48rpx;
    width: 100%;
    background: #F8FAFC;
    border-radius: 16rpx;
    padding: 24rpx;

    .detail-title {
      display: block;
      font-size: 24rpx;
      font-weight: 600;
      color: #64748B;
      margin-bottom: 12rpx;
    }

    .detail-content {
      font-size: 22rpx;
      color: #94A3B8;
      font-family: monospace;
      word-break: break-all;
    }
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
</style>
