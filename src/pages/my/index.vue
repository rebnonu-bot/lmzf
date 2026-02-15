<template>
  <view class="page-container">
    <!-- 公司介绍卡片 -->
    <view class="company-card">
      <view class="company-header">
        <view class="company-logo">
          <text>邻檬</text>
        </view>
        <view class="company-info">
          <text class="company-name">邻檬智付</text>
          <text class="company-slogan">让天下没有难收的物业费</text>
        </view>
      </view>
      <view class="company-desc">
        邻檬智付是邻檬智家旗下的专业支付服务平台，致力于为社区业主提供便捷、安全的物业费缴纳及积分抵扣服务。
      </view>
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
            <text class="contact-value">lingmeng2024</text>
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
            <text class="contact-value">400-888-8888</text>
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
            <text class="contact-value">周一至周日 9:00-21:00</text>
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
import { myMockData, homeMockData } from '@/config/mock.config';

const activeTab = ref<'home' | 'my'>('my');
const version = ref(myMockData.version);

onShow(() => {
  activeTab.value = 'my';
  uni.hideTabBar();
});

// 复制客服微信
const copyWechat = () => {
  uni.setClipboardData({
    data: homeMockData.contact.wechat,
    success: () => {
      uni.showToast({ title: '微信号已复制', icon: 'success' });
    }
  });
};

// 拨打客服电话
const makePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: homeMockData.contact.phone,
    fail: () => {
      console.log('用户取消拨打');
    }
  });
};
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100vh;
  background-color: #F4F9FF;
  position: relative;
  padding-bottom: 120rpx;
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
