<template>
  <view class="page-container">
    <!-- 顶部渐变背景 -->
    <view class="header-bg"></view>
    
    <!-- 导航栏 -->
    <t-navbar
      title="邻檬智付"
      :fixed="true"
      :background="'transparent'"
      :title-color="'#ffffff'"
      :left-arrow="false"
    />

    <view class="content">
      <!-- 余额/钱包概览卡片 -->
      <view class="wallet-card">
        <view class="wallet-header">
          <text class="label">账户余额 (元)</text>
          <t-icon name="view-list" size="40rpx" color="#3B82F6" />
        </view>
        <view class="balance">8,888.88</view>
        <view class="wallet-actions">
          <t-button theme="primary" size="medium" shape="round" block>立即充值</t-button>
          <t-button theme="light" size="medium" shape="round" block>提现</t-button>
        </view>
      </view>

      <!-- 快捷功能金刚区 -->
      <view class="grid-container">
        <view v-for="(item, index) in gridItems" :key="index" class="grid-item" @click="handleGridClick(item)">
          <view class="icon-box">
            <t-icon :name="item.icon" size="56rpx" color="#3B82F6" />
          </view>
          <text class="grid-label">{{ item.text }}</text>
        </view>
      </view>

      <!-- 业务办理列表 -->
      <view class="section-title">业务办理</view>
      <view class="business-list">
        <view v-for="(item, index) in businessItems" :key="index" class="business-card">
          <view class="business-info">
            <text class="business-name">{{ item.title }}</text>
            <text class="business-desc">{{ item.desc }}</text>
          </view>
          <t-icon name="chevron-right" size="40rpx" color="#64748B" />
        </view>
      </view>
    </view>

    <!-- 自定义底部导航 -->
    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomTabBar from '@/components/CustomTabBar.vue';

const gridItems = [
  { icon: 'qrcode', text: '收付款' },
  { icon: 'wallet', text: '零钱' },
  { icon: 'creditcard', text: '银行卡' },
  { icon: 'bill', text: '账单' },
];

const businessItems = [
  { title: '生活缴费', desc: '水费、电费、燃气费快速缴纳' },
  { title: '物业费缴纳', desc: '一键缴纳邻檬智家物业费' },
  { title: '智慧停车', desc: '车位租赁与临时停车费缴纳' },
  { title: '电子发票', desc: '交易明细一键开具发票' },
];

const handleGridClick = (item: any) => {
  uni.showToast({ title: `点击了${item.text}`, icon: 'none' });
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

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 440rpx;
  background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 70%, #F4F9FF 100%);
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  padding: 160rpx 32rpx 32rpx;
}

.wallet-card {
  background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(240, 249, 255, 0.9) 100%);
  border-radius: 32rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 16rpx 40rpx rgba(59, 130, 246, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);

  .wallet-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;

    .label {
      font-size: 26rpx;
      color: #64748B;
    }
  }

  .balance {
    font-size: 64rpx;
    font-weight: bold;
    color: #334155;
    margin-bottom: 40rpx;
    &::before {
      content: '￥';
      font-size: 32rpx;
      margin-right: 4rpx;
    }
  }

  .wallet-actions {
    display: flex;
    gap: 24rpx;
  }
}

.grid-container {
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 32rpx;
  padding: 40rpx 20rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);

  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;

    .icon-box {
      width: 100rpx;
      height: 100rpx;
      background: #F0F7FF;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12rpx;
    }

    .grid-label {
      font-size: 24rpx;
      color: #334155;
    }
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #334155;
  margin: 40rpx 0 24rpx;
}

.business-list {
  .business-card {
    background: linear-gradient(90deg, #E0F2FE 0%, #F0F9FF 100%);
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .business-info {
      display: flex;
      flex-direction: column;

      .business-name {
        font-size: 28rpx;
        font-weight: bold;
        color: #334155;
        margin-bottom: 8rpx;
      }

      .business-desc {
        font-size: 24rpx;
        color: #64748B;
      }
    }
  }
}
</style>
