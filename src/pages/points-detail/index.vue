<template>
  <scroll-view class="page-container" scroll-y @scrolltolower="loadMore">
    <!-- 头部总览 -->
    <view class="header-card">
      <view class="total-points">
        <text class="label">当前数字积分</text>
        <text class="value">{{ userStore.points }}</text>
      </view>
      <view class="points-stats">
        <view class="stat-item">
          <text class="stat-label">累计获得</text>
          <text class="stat-value">+{{ totalEarned }}</text>
        </view>
        <view class="divider"></view>
        <view class="stat-item">
          <text class="stat-label">累计抵扣</text>
          <text class="stat-value">-{{ totalConsumed }}</text>
        </view>
      </view>
    </view>

    <!-- 筛选标签 -->
    <view class="filter-tabs">
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'all' }"
        @tap="changeFilter('all')"
      >全部</view>
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'income' }"
        @tap="changeFilter('income')"
      >获得</view>
      <view 
        class="tab-item" 
        :class="{ active: currentFilter === 'expense' }"
        @tap="changeFilter('expense')"
      >消耗</view>
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
            {{ item.type === 'income' ? '+' : '' }}{{ item.amount }}
          </text>
          <text class="item-category">{{ getCategoryText(item.category) }}</text>
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
        <text>暂无积分记录</text>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { getPointsHistory, getUserPoints } from '@/api/modules/user';

const userStore = useUserStore();
const list = ref<any[]>([]);
const loading = ref(false);
const finished = ref(false);
const page = ref(1);
const currentFilter = ref<'all' | 'income' | 'expense'>('all');
const totalEarned = ref(0);
const totalConsumed = ref(0);

const categoryMap: Record<string, string> = {
  'deduct': '物业抵扣',
  'offline': '线下消费',
  'invite': '邀请奖励',
  'online': '电商返利',
  'system': '系统发放'
};

const getCategoryText = (category: string) => categoryMap[category] || '其他';

const loadData = async (isRefresh = false) => {
  if (loading.value) return;
  loading.value = true;
  
  if (isRefresh) {
    page.value = 1;
    finished.value = false;
  }

  try {
    const res = await getPointsHistory({
      page: page.value,
      pageSize: 20,
      type: currentFilter.value
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

const changeFilter = (type: 'all' | 'income' | 'expense') => {
  if (currentFilter.value === type) return;
  currentFilter.value = type;
  loadData(true);
};

const loadMore = () => {
  if (!finished.value) {
    loadData();
  }
};

const fetchStats = async () => {
  try {
    const res = await getUserPoints();
    totalEarned.value = res.totalEarned;
    // Mock data for totalConsumed or calculate from history if API doesn't provide
    totalConsumed.value = 500; // Mock value
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  loadData(true);
  fetchStats();
});
</script>

<style lang="less" scoped>
.page-container {
  height: 100vh;
  background-color: #F4F9FF;
}

.header-card {
  margin: 32rpx;
  padding: 40rpx;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 32rpx;
  color: #fff;
  box-shadow: 0 10rpx 30rpx rgba(37, 99, 235, 0.2);

  .total-points {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40rpx;

    .label {
      font-size: 28rpx;
      opacity: 0.9;
      margin-bottom: 16rpx;
    }

    .value {
      font-size: 72rpx;
      font-weight: bold;
      font-family: 'DIN Alternate', sans-serif;
    }
  }

  .points-stats {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .stat-label {
        font-size: 24rpx;
        opacity: 0.8;
        margin-bottom: 8rpx;
      }
      
      .stat-value {
        font-size: 32rpx;
        font-weight: 600;
      }
    }

    .divider {
      width: 2rpx;
      height: 40rpx;
      background: rgba(255, 255, 255, 0.2);
    }
  }
}

.filter-tabs {
  display: flex;
  padding: 0 32rpx;
  margin-bottom: 24rpx;

  .tab-item {
    margin-right: 32rpx;
    font-size: 28rpx;
    color: #64748B;
    padding: 12rpx 0;
    position: relative;
    transition: all 0.3s;

    &.active {
      color: #3B82F6;
      font-weight: 600;
      font-size: 30rpx;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background: #3B82F6;
        border-radius: 2rpx;
      }
    }
  }
}

.list-container {
  padding: 0 32rpx;
  padding-bottom: env(safe-area-inset-bottom);

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
        font-family: 'DIN Alternate', sans-serif;
        margin-bottom: 8rpx;

        &.income {
          color: #EF4444;
        }

        &.expense {
          color: #10B981;
        }
      }

      .item-category {
        font-size: 22rpx;
        color: #94A3B8;
        background: #F1F5F9;
        padding: 4rpx 12rpx;
        border-radius: 8rpx;
      }
    }
  }
}

.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48rpx 0;
  
  .no-more {
    font-size: 24rpx;
    color: #94A3B8;
  }
  
  text {
    font-size: 28rpx;
    color: #64748B;
    margin-top: 16rpx;
  }
}
</style>
