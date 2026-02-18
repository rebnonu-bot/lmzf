<template>
  <view class="login-page">
    <view class="logo-area">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="app-name">邻檬智付</text>
      <text class="slogan">物业费减免神器</text>
    </view>

    <view class="action-area">
      <t-button
        theme="primary"
        size="large"
        block
        :loading="loading"
        @tap="handleLogin"
      >
        微信一键登录
      </t-button>

      <view class="agreement">
        <t-checkbox v-model="agreed" icon="circle" borderless />
        <text class="text">
          我已阅读并同意
          <text class="link" @tap.stop="openAgreement">《用户服务协议》</text>
          和
          <text class="link" @tap.stop="openPrivacy">《隐私政策》</text>
        </text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const loading = ref(false);
const agreed = ref(false);

const handleLogin = async () => {
  if (!agreed.value) {
    uni.showToast({
      title: '请先阅读并同意协议',
      icon: 'none',
    });
    return;
  }

  loading.value = true;
  try {
    await userStore.wxLogin();
    
    uni.showToast({
      title: '登录成功',
      icon: 'success',
    });

    // 根据是否绑定房产跳转
    if (userStore.hasHouse.value) {
      uni.switchTab({ url: '/pages/home/index' });
    } else {
      uni.redirectTo({ url: '/pages/bind-house/index' });
    }
  } catch (error) {
    uni.showToast({
      title: '登录失败，请重试',
      icon: 'none',
    });
    console.error('Login failed:', error);
  } finally {
    loading.value = false;
  }
};

const openAgreement = () => {
  uni.navigateTo({
    url: '/package-webview/pages/webview/index?url=' + encodeURIComponent('https://lmzf.com/agreement'),
  });
};

const openPrivacy = () => {
  uni.navigateTo({
    url: '/package-webview/pages/webview/index?url=' + encodeURIComponent('https://lmzf.com/privacy'),
  });
};
</script>

<style lang="less" scoped>
.login-page {
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 48rpx;
}

.logo-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 100rpx;

  .logo {
    width: 160rpx;
    height: 160rpx;
    margin-bottom: 32rpx;
    background-color: #f0f0f0; // Placeholder
    border-radius: 32rpx;
  }

  .app-name {
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 16rpx;
  }

  .slogan {
    font-size: 28rpx;
    color: #666;
  }
}

.action-area {
  padding-bottom: 100rpx;

  .agreement {
    margin-top: 32rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24rpx;
    color: #999;

    .text {
      margin-left: 8rpx;
    }

    .link {
      color: #3b82f6;
    }
  }
}
</style>
