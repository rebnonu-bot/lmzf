<template>
  <view class="contact-section">
    <view class="section-header">
      <view class="header-left">
        <view class="header-icon">
          <t-icon name="chat" size="36rpx" color="#3B82F6" />
        </view>
        <text class="section-title">联系我们</text>
      </view>
      <text class="section-subtitle">随时为您服务</text>
    </view>
    
    <view class="contact-cards">
      <!-- 客服微信 -->
      <view class="contact-card-wechat" @tap="handleCopyWechat">
        <view class="wechat-icon-wrapper">
          <t-icon name="chat" size="40rpx" color="#07C160" />
        </view>
        <view class="wechat-info">
          <text class="wechat-label">客服微信</text>
          <text class="wechat-value">{{ contactInfo.wechat }}</text>
        </view>
        <view class="wechat-action">
          <text>复制</text>
        </view>
      </view>
      
      <!-- 工作时间 -->
      <view class="contact-card-time">
        <view class="time-icon-wrapper">
          <t-icon name="time" size="40rpx" color="#F59E0B" />
        </view>
        <view class="time-info">
          <text class="time-label">工作时间</text>
          <text class="time-value">{{ contactInfo.serviceHours }}</text>
        </view>
        <view class="time-badge">全年无休</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface ContactInfo {
  wechat: string;
  serviceHours: string;
}

defineProps<{
  contactInfo: ContactInfo;
}>();

const emit = defineEmits<{
  copyWechat: [];
}>();

const handleCopyWechat = () => {
  emit('copyWechat');
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.contact-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .header-left {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .header-icon {
        width: 64rpx;
        height: 64rpx;
        background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .section-title {
        font-size: 32rpx;
        font-weight: 700;
        color: #1E293B;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .contact-cards {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .contact-card-wechat {
      display: flex;
      align-items: center;
      padding: 28rpx;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20rpx);
      border-radius: 24rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
      transition: all 0.2s;

      &:active {
        transform: scale(0.98);
        opacity: 0.8;
      }

      .wechat-icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        background: linear-gradient(135deg, #D1FAE5, #A7F3D0);
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
      }

      .wechat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .wechat-label {
          font-size: 24rpx;
          color: #64748B;
        }

        .wechat-value {
          font-size: 30rpx;
          font-weight: 600;
          color: #1E293B;
        }
      }

      .wechat-action {
        padding: 8rpx 24rpx;
        background: #EFF6FF;
        border-radius: 20rpx;

        text {
          font-size: 24rpx;
          color: #3B82F6;
          font-weight: 500;
        }
      }
    }

    .contact-card-time {
      display: flex;
      align-items: center;
      padding: 28rpx;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20rpx);
      border-radius: 24rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

      .time-icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        background: linear-gradient(135deg, #FEF3C7, #FDE68A);
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
      }

      .time-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .time-label {
          font-size: 24rpx;
          color: #64748B;
        }

        .time-value {
          font-size: 30rpx;
          font-weight: 600;
          color: #1E293B;
        }
      }

      .time-badge {
        padding: 6rpx 16rpx;
        background: #FEF3C7;
        border-radius: 12rpx;
        font-size: 22rpx;
        color: #F59E0B;
        font-weight: 500;
      }
    }
  }
}
</style>
