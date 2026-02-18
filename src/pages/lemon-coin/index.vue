<template>
  <scroll-view class="page-container" scroll-y>
    <!-- 头部卡片 -->
    <view class="coin-header">
      <view class="coin-card">
        <view class="card-top">
          <view class="coin-logo">
            <text class="logo-text">¥</text>
          </view>
          <text class="card-title">{{ userStore.coinLabel }}余额</text>
        </view>
        
        <view class="coin-balance">
          <text class="balance-num">{{ userStore.coins }}</text>
        </view>
        
        <view class="card-footer" @tap="showIntro">
          <view class="coin-desc">
            <t-icon name="info-circle" size="28rpx" color="rgba(255,255,255,0.9)" />
            <text>什么是{{ userStore.coinLabel }}？</text>
          </view>
          <t-icon name="chevron-right" size="28rpx" color="rgba(255,255,255,0.9)" />
        </view>
        
        <!-- 装饰背景 -->
        <view class="decor-circle circle-1"></view>
        <view class="decor-circle circle-2"></view>
      </view>
    </view>

    <!-- 操作按钮 -->
    <view class="action-grid">
      <view class="action-item" @tap="handleExchange">
        <view class="action-icon exchange">
          <t-icon name="gift" size="48rpx" color="#F59E0B" />
        </view>
        <text class="action-text">兑换好礼</text>
        <text class="action-sub">超值好物兑不停</text>
      </view>
      <view class="action-item" @tap="handleTask">
        <view class="action-icon task">
          <t-icon name="task" size="48rpx" color="#3B82F6" />
        </view>
        <text class="action-text">做任务赚币</text>
        <text class="action-sub">完成任务领奖励</text>
      </view>
    </view>

    <!-- 交易记录 -->
    <view class="transaction-section">
      <view class="section-header">
        <text class="section-title">收支明细</text>
        <view class="filter-btn">
          <text>全部</text>
          <t-icon name="caret-down-small" size="24rpx" color="#64748B" />
        </view>
      </view>
      
      <view class="transaction-list">
        <view class="transaction-item" v-for="(item, index) in transactions" :key="index">
          <view class="item-left">
            <text class="item-title">{{ item.title }}</text>
            <text class="item-time">{{ item.time }}</text>
          </view>
          <view class="item-right">
            <text class="item-amount" :class="{ 'income': item.amount > 0 }">
              {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
            </text>
          </view>
        </view>
        
        <!-- 空状态 -->
        <view v-if="!loading && transactions.length === 0" class="empty-state">
          <t-icon name="info-circle" size="48rpx" color="#94A3B8" />
          <text>暂无交易记录</text>
        </view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { getCoinTransactions } from '@/api/modules/user';

const userStore = useUserStore();

interface CoinTransaction {
  id: string;
  title: string;
  time: string;
  amount: number;
  type: 'income' | 'expense';
}

const transactions = ref<CoinTransaction[]>([]);
const loading = ref(false);

const fetchTransactions = async () => {
  loading.value = true;
  try {
    const res = await getCoinTransactions();
    transactions.value = res.list;
  } catch (error) {
    console.error('获取柠檬币明细失败', error);
    uni.showToast({ title: '获取明细失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  // 刷新用户信息（确保余额最新）
  userStore.fetchUserInfo();
  fetchTransactions();
});

const handleExchange = () => {
  uni.showToast({ title: '兑换商城开发中', icon: 'none' });
};

const handleTask = () => {
  uni.showToast({ title: '任务中心开发中', icon: 'none' });
};

const showIntro = () => {
  uni.showModal({
    title: `关于${userStore.coinLabel.value}`,
    content: `${userStore.coinLabel.value}是邻檬智付平台的专属数字资产，可以通过签到、邀请好友、参与活动等方式获取，用于兑换优惠券、实物礼品等。`,
    showCancel: false,
    confirmText: '我知道了'
  });
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100vh;
  background-color: #F4F9FF;
}

.coin-header {
  padding: 32rpx;
  /* #ifdef MP-WEIXIN */
  padding-top: 160rpx; // 适配小程序导航栏
  /* #endif */
  /* #ifndef MP-WEIXIN */
  padding-top: 32rpx;
  /* #endif */
}

.coin-card {
  position: relative;
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  border-radius: 32rpx;
  padding: 40rpx;
  color: #fff;
  overflow: hidden;
  box-shadow: 0 16rpx 40rpx rgba(245, 158, 11, 0.2);

  .card-top {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 24rpx;
    position: relative;
    z-index: 2;

    .coin-logo {
      width: 48rpx;
      height: 48rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2rpx solid rgba(255, 255, 255, 0.4);

      .logo-text {
        font-size: 28rpx;
        font-weight: bold;
      }
    }

    .card-title {
      font-size: 28rpx;
      opacity: 0.9;
    }
  }

  .coin-balance {
    margin-bottom: 32rpx;
    position: relative;
    z-index: 2;

    .balance-num {
      font-size: 80rpx;
      font-weight: bold;
      font-family: 'DIN Alternate', sans-serif;
      line-height: 1;
    }
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 24rpx;
    border-top: 1rpx solid rgba(255, 255, 255, 0.2);
    position: relative;
    z-index: 2;

    .coin-desc {
      display: flex;
      align-items: center;
      gap: 8rpx;
      
      text {
        font-size: 24rpx;
        opacity: 0.9;
      }
    }
  }

  .decor-circle {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    z-index: 1;
  }

  .circle-1 {
    width: 300rpx;
    height: 300rpx;
    top: -100rpx;
    right: -60rpx;
  }

  .circle-2 {
    width: 200rpx;
    height: 200rpx;
    bottom: -60rpx;
    left: -40rpx;
  }
}

.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24rpx;
  padding: 0 32rpx;
  margin-bottom: 32rpx;

  .action-item {
    background: #fff;
    padding: 32rpx;
    border-radius: 24rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.02);

    .action-icon {
      width: 88rpx;
      height: 88rpx;
      border-radius: 24rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 16rpx;

      &.exchange {
        background: #FFFBEB;
      }

      &.task {
        background: #EFF6FF;
      }
    }

    .action-text {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
      margin-bottom: 8rpx;
    }

    .action-sub {
      font-size: 22rpx;
      color: #94A3B8;
    }
  }
}

.transaction-section {
  background: #fff;
  border-radius: 32rpx 32rpx 0 0;
  padding: 32rpx;
  min-height: 400rpx;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .section-title {
      font-size: 32rpx;
      font-weight: 600;
      color: #1E293B;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 8rpx;
      font-size: 26rpx;
      color: #64748B;
    }
  }

  .transaction-list {
    .transaction-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24rpx 0;
      border-bottom: 1rpx solid #F1F5F9;

      &:last-child {
        border-bottom: none;
      }

      .item-left {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .item-title {
          font-size: 28rpx;
          color: #1E293B;
          font-weight: 500;
        }

        .item-time {
          font-size: 24rpx;
          color: #94A3B8;
        }
      }

      .item-right {
        .item-amount {
          font-size: 32rpx;
          font-weight: 600;
          color: #1E293B;
          font-family: 'DIN Alternate', sans-serif;

          &.income {
            color: #F59E0B;
          }
        }
      }
    }

    .empty-state {
      padding: 60rpx 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16rpx;
      
      text {
        font-size: 26rpx;
        color: #94A3B8;
      }
    }
  }
}
</style>
