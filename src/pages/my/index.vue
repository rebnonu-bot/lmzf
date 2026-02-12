<template>
  <view class="page-container">
    <!-- 顶部渐变背景 (向下凸出的外弧) -->
    <view class="header-container" :style="headerStyle">
      <view class="header-bg"></view>
    </view>
    
    <!-- 移除导航栏占位，实现全屏贴顶 -->
    <view class="content">
      <!-- 用户信息卡片 -->
      <view class="user-card">
        <view class="user-info">
          <t-avatar :image="userInfo.avatar" size="large" />
          <view class="user-detail">
            <view class="user-name">{{ userInfo.name }}</view>
            <view class="user-status">
              <t-tag variant="light" theme="primary" size="small">实名已认证</t-tag>
            </view>
          </view>
          <t-icon name="setting" size="48rpx" color="#64748B" @click="handleSetting" />
        </view>
      </view>

      <!-- 资产概览 -->
      <view class="asset-grid">
        <view class="asset-item">
          <text class="value">2</text>
          <text class="label">银行卡</text>
        </view>
        <view class="asset-item">
          <text class="value">12</text>
          <text class="label">优惠券</text>
        </view>
        <view class="asset-item">
          <text class="value">850</text>
          <text class="label">积分</text>
        </view>
      </view>

      <!-- 菜单列表 -->
      <view class="menu-list">
        <t-cell-group theme="card">
          <t-cell title="支付设置" left-icon="secured" hover arrow />
          <t-cell title="账单记录" left-icon="bill" hover arrow />
          <t-cell title="帮助与客服" left-icon="service" hover arrow />
          <t-cell title="关于邻檬智付" left-icon="info-circle" hover arrow />
        </t-cell-group>
      </view>

      <!-- 退出登录 -->
      <view class="logout-btn">
        <t-button theme="light" variant="text" block @click="handleLogout">退出登录</t-button>
      </view>
    </view>

    <!-- 自定义底部导航 -->
    <CustomTabBar :active="activeTab" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import CustomTabBar from '@/components/CustomTabBar.vue';
import { onShow } from '@dcloudio/uni-app';

const activeTab = ref<'home' | 'my'>('my');

const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

onShow(() => {
  activeTab.value = 'my';
  uni.hideTabBar();
});

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif
});

const headerStyle = computed(() => {
  // #ifdef MP-WEIXIN
  const top = menuButtonInfo.value.top;
  const height = menuButtonInfo.value.height;
  return {
    paddingTop: `${top - 6}px`,
    paddingBottom: '12px',
    height: `${height + 12}px`
  };
  // #endif

  // #ifndef MP-WEIXIN
  return {
    paddingTop: `${statusBarHeight.value}px`,
    height: '56px'
  };
  // #endif
});

const userInfo = ref({
  name: '柠檬用户',
  avatar: '/static/avatar1.png',
});

const handleSetting = () => {
  uni.showToast({ title: '设置', icon: 'none' });
};

const handleLogout = () => {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.reLaunch({ url: '/pages/login/login' });
      }
    }
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  min-height: 100vh;
  background-color: #F4F9FF;
  position: relative;
  padding-bottom: 120rpx;
}

.header-container {
  width: 100%;
  position: relative;
  z-index: 1;
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400rpx; /* 增加背景高度，防止内容重叠 */
    background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 100%);
    border-radius: 0 0 50% 50% / 0 0 40rpx 40rpx;
    z-index: -1;
  }
}

.content {
  position: relative;
  z-index: 1;
  padding: 60rpx 32rpx 0;
}

.user-card {
  background: #ffffff;
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 30rpx rgba(59, 130, 246, 0.08);

  .user-info {
    display: flex;
    align-items: center;

    .user-detail {
      flex: 1;
      margin-left: 24rpx;

      .user-name {
        font-size: 36rpx;
        font-weight: bold;
        color: #334155;
        margin-bottom: 8rpx;
      }

      .user-status {
        display: flex;
      }
    }
  }
}

.asset-grid {
  display: flex;
  background: #ffffff;
  border-radius: 32rpx;
  padding: 40rpx 0;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

  .asset-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    &:not(:last-child)::after {
      content: '';
      position: absolute;
      right: 0;
      top: 20%;
      height: 60%;
      width: 1px;
      background: #F1F5F9;
    }

    .value {
      font-size: 36rpx;
      font-weight: bold;
      color: #334155;
      margin-bottom: 8rpx;
    }

    .label {
      font-size: 24rpx;
      color: #64748B;
    }
  }
}

.menu-list {
  margin-bottom: 40rpx;
  :deep(.t-cell-group--card) {
    margin: 0;
    border-radius: 32rpx;
  }
}

.logout-btn {
  padding: 0 40rpx;
}
</style>
