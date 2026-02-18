<template>
  <view class="page-footer">
    <view class="footer-divider">
      <view class="divider-line"></view>
      <view class="divider-dot"></view>
      <view class="divider-line"></view>
    </view>
    <view class="footer-content">
      <text class="footer-brand">邻檬智付</text>
      <text class="footer-slogan">让天下没有难收的物业费</text>
    </view>
    <view class="footer-links">
      <text class="footer-link" @tap="showAgreement">用户协议</text>
      <text class="footer-divider-text">|</text>
      <text class="footer-link" @tap="showPrivacy">隐私政策</text>
      <text class="footer-divider-text">|</text>
      <text class="footer-link" @tap="contactUs">联系我们</text>
    </view>
    <view class="footer-copyright">
      <text>{{ APP_INFO.copyright }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { APP_INFO } from '@/constants/app';

const showAgreement = () => {
  uni.showModal({
    title: '用户协议',
    content: '用户协议内容即将上线，敬请期待。',
    showCancel: false
  });
};

const showPrivacy = () => {
  uni.showModal({
    title: '隐私政策',
    content: '隐私政策内容即将上线，敬请期待。',
    showCancel: false
  });
};

const contactUs = () => {
  uni.switchTab({ url: '/pages/my/index' });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-footer {
  padding: 48rpx 0 32rpx;

  .footer-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    margin-bottom: 32rpx;

    .divider-line {
      width: 80rpx;
      height: 1rpx;
      background: linear-gradient(90deg, transparent, #CBD5E1, transparent);
    }

    .divider-dot {
      width: 8rpx;
      height: 8rpx;
      background: #CBD5E1;
      border-radius: 50%;
    }
  }

  .footer-content {
    text-align: center;
    margin-bottom: 24rpx;

    .footer-brand {
      display: block;
      font-size: 32rpx;
      font-weight: 700;
      color: #3B82F6;
      margin-bottom: 8rpx;
    }

    .footer-slogan {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .footer-links {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24rpx;
    margin-bottom: 24rpx;

    .footer-link {
      font-size: 24rpx;
      color: #64748B;
      transition: color 0.2s;

      &:active {
        color: #3B82F6;
      }
    }

    .footer-divider-text {
      font-size: 24rpx;
      color: #CBD5E1;
    }
  }

  .footer-copyright {
    text-align: center;

    text {
      font-size: 22rpx;
      color: #94A3B8;
    }
  }
}
</style>
