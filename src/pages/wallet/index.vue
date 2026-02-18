<template>
  <scroll-view class="page-container" scroll-y @scrolltolower="loadMore">
    <!-- 头部资产卡片 -->
    <view class="wallet-header">
      <view class="balance-card">
        <view class="balance-info">
          <text class="label">可提现余额 (元)</text>
          <text class="value">{{ balance.toFixed(2) }}</text>
        </view>
        <view class="action-btn" @tap="handleWithdraw">
          <text>去提现</text>
          <t-icon name="chevron-right" size="24rpx" />
        </view>
      </view>
      
      <view class="wallet-stats">
        <view class="stat-item">
          <text class="stat-value">¥{{ totalIncome.toFixed(2) }}</text>
          <text class="stat-label">累计收益</text>
        </view>
        <view class="divider"></view>
        <view class="stat-item">
          <text class="stat-value">¥{{ totalWithdrawn.toFixed(2) }}</text>
          <text class="stat-label">累计提现</text>
        </view>
      </view>
    </view>

    <!-- 交易记录标题 -->
    <view class="section-title">
      <text>收支明细</text>
    </view>

    <!-- 列表内容 -->
    <view class="list-container">
      <view class="list-item" v-for="item in list" :key="item.id">
        <view class="item-left">
          <text class="item-title">{{ item.title }}</text>
          <text class="item-time">{{ item.time }}</text>
        </view>
        <view class="item-right">
          <text class="item-amount" :class="{ 'income': item.type === 'income', 'expense': item.type === 'expense' }">
            {{ item.type === 'income' ? '+' : '' }}{{ item.amount.toFixed(2) }}
          </text>
          <text class="item-status" v-if="item.status">{{ getStatusText(item.status) }}</text>
        </view>
      </view>

      <!-- 加载状态 -->
      <view class="loading-state">
        <t-loading v-if="loading" theme="spinner" size="40rpx" text="加载中..." />
        <text v-else-if="finished" class="no-more">没有更多了</text>
      </view>

      <!-- 空状态 -->
      <view v-if="!loading && list.length === 0" class="empty-state">
        <t-icon name="info-circle" size="64rpx" color="#94A3B8" />
        <text>暂无交易记录</text>
      </view>
    </view>
    
    <!-- 自定义底部导航 -->
    <CustomTabBar active="wallet" />
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import CustomTabBar from '@/components/CustomTabBar.vue';
import { useUserStore } from '@/stores/user';
import { getWalletHistory } from '@/api/modules/user';

const userStore = useUserStore();
const balance = computed(() => userStore.balance.value);
const list = ref<any[]>([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(1);
const totalIncome = ref(1250.50); // Mock
const totalWithdrawn = ref(361.62); // Mock

const handleWithdraw = () => {
  uni.navigateTo({ url: '/pages/withdraw/index' });
};

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    'success': '成功',
    'pending': '处理中',
    'failed': '失败'
  };
  return statusMap[status] || '';
};

const loadData = async (isRefresh = false) => {
  if (loading.value) return;
  loading.value = true;
  
  if (isRefresh) {
    page.value = 1;
    finished.value = false;
  }

  try {
    const res = await getWalletHistory({
      page: page.value,
      pageSize: 20
    });
    
    if (isRefresh) {
      list.value = res.list;
    } else {
      list.value = [...list.value, ...res.list];
    }
    
    if (res.list.length < 20) {
      finished.value = true;
    } else {
      page.value++;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const loadMore = () => {
  if (!finished.value) {
    loadData();
  }
};

onMounted(() => {
  loadData(true);
});

onShow(() => {
  uni.hideTabBar();
});
</script>

<style lang="less" scoped>
.page-container {
  height: 100vh;
  background-color: #F4F9FF;
}

.wallet-header {
  margin: 32rpx;
  padding: 40rpx;
  background: linear-gradient(135deg, #10B981 0%, #059669 100%);
  border-radius: 32rpx;
  color: #fff;
  box-shadow: 0 10rpx 30rpx rgba(5, 150, 105, 0.2);

  .balance-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40rpx;

    .balance-info {
      display: flex;
      flex-direction: column;

      .label {
        font-size: 28rpx;
        opacity: 0.9;
        margin-bottom: 12rpx;
      }

      .value {
        font-size: 64rpx;
        font-weight: bold;
        font-family: 'DIN Alternate', sans-serif;
      }
    }

    .action-btn {
      background: rgba(255, 255, 255, 0.2);
      padding: 12rpx 24rpx;
      border-radius: 32rpx;
      display: flex;
      align-items: center;
      gap: 4rpx;
      font-size: 26rpx;
      backdrop-filter: blur(8rpx);
    }
  }

  .wallet-stats {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 32rpx;
    border-top: 1rpx solid rgba(255, 255, 255, 0.2);

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .stat-value {
        font-size: 32rpx;
        font-weight: 600;
        margin-bottom: 8rpx;
        font-family: 'DIN Alternate', sans-serif;
      }
      
      .stat-label {
        font-size: 24rpx;
        opacity: 0.8;
      }
    }

    .divider {
      width: 2rpx;
      height: 40rpx;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.section-title {
  padding: 0 32rpx;
  margin-bottom: 24rpx;
  font-size: 32rpx;
  font-weight: 600;
  color: #334155;
}

.list-container {
  padding: 0 32rpx;
  padding-bottom: calc(env(safe-area-inset-bottom) + 140rpx);

  .list-item {
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    margin-bottom: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);

    .item-left {
      display: flex;
      flex-direction: column;

      .item-title {
        font-size: 30rpx;
        color: #334155;
        margin-bottom: 12rpx;
        font-weight: 500;
      }

      .item-time {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .item-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .item-amount {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
        font-family: 'DIN Alternate', sans-serif;
        color: #334155;

        &.income {
          color: #10B981;
        }

        &.expense {
          color: #EF4444;
        }
      }

      .item-status {
        font-size: 22rpx;
        color: #94A3B8;
        background: #F1F5F9;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
      }
    }
  }
}

.loading-state {
  padding: 32rpx;
  display: flex;
  justify-content: center;

  .no-more {
    font-size: 24rpx;
    color: #94A3B8;
  }
}

.empty-state {
  padding: 120rpx 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24rpx;
  
  text {
    font-size: 28rpx;
    color: #94A3B8;
  }
}
</style>