<template>
  <view class="page-container">
    <!-- 未登录状态 -->
    <view class="login-card" v-if="!userStore.state.isLoggedIn" @tap="handleLogin">
      <view class="avatar-placeholder">
        <t-icon name="user" size="64rpx" color="#fff" />
      </view>
      <view class="login-text">
        <text class="login-title">点击登录/注册</text>
        <text class="login-desc">登录后享受更多权益</text>
      </view>
      <t-icon name="chevron-right" size="48rpx" color="#999" />
    </view>

    <!-- 用户资产卡片 -->
    <view class="assets-card" v-else>
      <view class="assets-header">
        <text class="assets-title">我的资产</text>
      </view>
      <view class="assets-grid">
        <view class="asset-item" @tap="handlePoints">
          <text class="asset-num">{{ userStore.points }}</text>
          <text class="asset-label">积分</text>
        </view>
        <view class="asset-item" @tap="handleCoins">
          <text class="asset-num">{{ userStore.coins }}</text>
          <text class="asset-label">{{ userStore.coinLabel }}</text>
        </view>
        <view class="asset-item" @tap="handleCoupons">
          <text class="asset-num">{{ userStore.state.userInfo?.coupons || 0 }}</text>
          <text class="asset-label">优惠券</text>
        </view>
      </view>
    </view>

    <!-- 功能列表 -->
    <view class="menu-list">
      <view class="menu-item" @tap="handleWallet">
        <view class="menu-left">
          <t-icon name="wallet" size="40rpx" color="#3B82F6" />
          <text class="menu-text">我的钱包</text>
        </view>
        <t-icon name="chevron-right" size="40rpx" color="#999" />
      </view>
      
      <view class="menu-item" @tap="handleInvite">
        <view class="menu-left">
          <t-icon name="share" size="40rpx" color="#F59E0B" />
          <text class="menu-text">邀请好友</text>
        </view>
        <t-icon name="chevron-right" size="40rpx" color="#999" />
      </view>

      <view class="menu-item" @tap="handleHouse">
        <view class="menu-left">
          <t-icon name="home" size="40rpx" color="#10B981" />
          <text class="menu-text">房屋管理</text>
        </view>
        <t-icon name="chevron-right" size="40rpx" color="#999" />
      </view>
    </view>

    <!-- 公司介绍卡片 -->
    <view class="company-card">
      <view class="company-header">
        <view class="company-logo">
          <text>邻檬</text>
        </view>
        <view class="company-info">
          <text class="company-name">{{ COMPANY.name }}</text>
          <text class="company-slogan">{{ APP_INFO.slogan }}</text>
        </view>
      </view>
      <view class="company-desc">{{ COMPANY.description }}</view>
    </view>

    <!-- 联系方式 -->
    <view class="contact-section">
      <view class="section-title">联系我们</view>
      <view class="contact-list">
        <view class="contact-item" @tap="copyWechat">
          <view class="contact-icon">
            <t-icon name="chat" size="40rpx" color="#07C160" />
          </view>
          <view class="contact-content">
            <text class="contact-label">客服微信</text>
            <text class="contact-value">{{ CONTACT.wechat }}</text>
          </view>
          <view class="contact-action">
            <text>复制</text>
          </view>
        </view>
        
        <view class="contact-item" @tap="makePhoneCall">
          <view class="contact-icon">
            <t-icon name="call" size="40rpx" color="#3B82F6" />
          </view>
          <view class="contact-content">
            <text class="contact-label">客服电话</text>
            <text class="contact-value">{{ CONTACT.phone }}</text>
          </view>
          <view class="contact-action">
            <text>拨打</text>
          </view>
        </view>
        
        <view class="contact-item">
          <view class="contact-icon">
            <t-icon name="time" size="40rpx" color="#F59E0B" />
          </view>
          <view class="contact-content">
            <text class="contact-label">服务时间</text>
            <text class="contact-value">{{ CONTACT.serviceHours }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 版本信息 -->
    <view class="version-info">
      <text>版本: v{{ version }}</text>
    </view>

    <!-- 自定义底部导航 -->
    <CustomTabBar :active="activeTab" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomTabBar from '@/components/CustomTabBar.vue';
import { onShow } from '@dcloudio/uni-app';
import { useClipboard, usePhone, useErrorHandler } from '@/composables';
import { APP_INFO, CONTACT, COMPANY } from '@/constants/app';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const activeTab = ref<'home' | 'stores' | 'wallet' | 'my'>('my');
const version = ref(APP_INFO.version);

// 错误处理
const { wrap } = useErrorHandler({ componentName: 'MyPage' });

// 使用组合式函数（包装带错误处理）
const { copy } = useClipboard({ 
  successMsg: '微信号已复制' 
});
const { call } = usePhone();

// 包装后的安全函数
const copyWechat = wrap(async () => {
  return await copy(CONTACT.wechat);
}, { toastMessage: '复制失败，请重试' });

const makePhoneCall = wrap(async () => {
  return await call(CONTACT.phone);
}, { showToast: false }); // 拨打取消不需要提示

const handleLogin = () => {
  uni.navigateTo({ url: '/pages/login/index' });
};

const handlePoints = () => {
  uni.navigateTo({ url: '/pages/points-detail/index' });
};

const handleCoins = () => {
  uni.navigateTo({ url: '/pages/lemon-coin/index' });
};

const handleCoupons = () => {
  uni.navigateTo({ url: '/pages/coupon/index' });
};

const handleWallet = () => {
  uni.switchTab({ url: '/pages/wallet/index' });
};

const handleInvite = () => {
  uni.navigateTo({ url: '/package-invite/pages/invite/poster' });
};

const handleHouse = () => {
  uni.navigateTo({ url: '/pages/bind-house/index' });
};

onShow(() => {
  activeTab.value = 'my';
  uni.hideTabBar();
});
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100vh;
  background-color: #F4F9FF;
  position: relative;
  padding-bottom: 120rpx;
}

/* 登录卡片 */
.login-card {
  margin: 32rpx;
  background-color: #fff;
  border-radius: 32rpx;
  padding: 40rpx;
  display: flex;
  align-items: center;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  
  .avatar-placeholder {
    width: 100rpx;
    height: 100rpx;
    background: linear-gradient(135deg, #3B82F6, #60A5FA);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 24rpx;
  }
  
  .login-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .login-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 8rpx;
    }
    
    .login-desc {
      font-size: 24rpx;
      color: #999;
    }
  }
}

/* 资产卡片 */
.assets-card {
  margin: 32rpx;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 32rpx;
  padding: 32rpx;
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.25);

  .assets-header {
    margin-bottom: 32rpx;
    
    .assets-title {
      font-size: 32rpx;
      font-weight: 600;
      opacity: 0.9;
    }
  }

  .assets-grid {
    display: flex;
    justify-content: space-around;
    
    .asset-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8rpx;

      .asset-num {
        font-size: 40rpx;
        font-weight: bold;
        font-family: 'DIN Alternate', sans-serif;
      }

      .asset-label {
        font-size: 24rpx;
        opacity: 0.8;
      }

      &:active {
        opacity: 0.8;
      }
    }
  }
}

/* 公司介绍卡片 */
.company-card {
  margin: 32rpx;
  background: #ffffff;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
}

.company-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.company-logo {
  width: 100rpx;
  height: 100rpx;
  background: linear-gradient(135deg, #3B82F6, #60A5FA);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  
  text {
    font-size: 32rpx;
    font-weight: bold;
    color: #fff;
  }
}

.company-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.company-name {
  font-size: 36rpx;
  font-weight: bold;
  color: #1E293B;
}

.company-slogan {
  font-size: 24rpx;
  color: #64748B;
}

.company-desc {
  font-size: 28rpx;
  color: #475569;
  line-height: 1.6;
}

/* 功能列表 */
.menu-list {
  margin: 32rpx;
  background-color: #fff;
  border-radius: 24rpx;
  padding: 0 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
  
  .menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 32rpx 0;
    border-bottom: 1rpx solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
    
    .menu-left {
      display: flex;
      align-items: center;
      gap: 24rpx;
      
      .menu-text {
        font-size: 28rpx;
        color: #333;
      }
    }
  }
}

/* 联系方式 */
.contact-section {
  margin: 0 32rpx 32rpx;
}

.section-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 20rpx;
}

.contact-list {
  background: #ffffff;
  border-radius: 32rpx;
  padding: 12rpx 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 24rpx 0;
  border-bottom: 1rpx solid #F1F5F9;
  
  &:last-child {
    border-bottom: none;
  }
  
  &:active {
    opacity: 0.7;
  }
}

.contact-icon {
  width: 72rpx;
  height: 72rpx;
  background: #F8FAFC;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24rpx;
}

.contact-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.contact-label {
  font-size: 26rpx;
  color: #94A3B8;
}

.contact-value {
  font-size: 30rpx;
  color: #1E293B;
  font-weight: 500;
}

.contact-action {
  padding: 8rpx 20rpx;
  background: #EFF6FF;
  border-radius: 20rpx;
  
  text {
    font-size: 24rpx;
    color: #3B82F6;
    font-weight: 500;
  }
}

/* 版本信息 */
.version-info {
  text-align: center;
  padding: 40rpx 0;
  
  text {
    font-size: 24rpx;
    color: #94A3B8;
  }
}
</style>
