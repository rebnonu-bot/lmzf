<template>
  <view class="page-container">
    <scroll-view scroll-y class="scroll-content">
      <!-- 房屋信息卡片 -->
      <view class="house-card">
        <view class="house-info">
          <t-icon name="home" size="48rpx" color="#fff" />
          <view class="house-detail">
            <text class="community-name">幸福小区</text>
            <text class="room-number">1栋 1单元 101室</text>
          </view>
        </view>
        <view class="house-owner">
          <text>户主：张三</text>
        </view>
      </view>

      <!-- 待缴账单 -->
      <view class="section-title">待缴账单</view>
      <view class="bill-list" v-if="bills.length > 0">
        <checkbox-group @change="handleBillChange">
          <view class="bill-item" v-for="bill in bills" :key="bill.id">
            <view class="bill-header">
              <checkbox :value="bill.id" :checked="selectedBillIds.includes(bill.id)" color="#3B82F6" style="transform:scale(0.8)" />
              <view class="bill-main">
                <text class="bill-title">{{ bill.title }}</text>
                <text class="bill-desc">{{ bill.desc }}</text>
              </view>
              <text class="bill-amount">¥{{ bill.amount.toFixed(2) }}</text>
            </view>
            <view class="bill-footer">
              <text class="bill-date">截止日期：{{ bill.deadline }}</text>
              <text class="bill-status">未缴</text>
            </view>
          </view>
        </checkbox-group>
      </view>
      <view class="empty-bills" v-else-if="!loading">
        <t-icon name="check-circle" size="64rpx" color="#10B981" />
        <text>暂无待缴账单</text>
      </view>

      <!-- 抵扣选项 -->
      <view class="section-title" v-if="totalBillAmount > 0">抵扣选项</view>
      <view class="deduction-card" v-if="totalBillAmount > 0">
        <!-- 积分抵扣 -->
        <view class="deduction-item">
          <view class="item-left">
            <t-icon name="chart-pie" size="40rpx" color="#F59E0B" />
            <view class="item-info">
              <text class="item-title">积分抵扣</text>
              <text class="item-desc">可用 {{ userStore.userInfo?.points || 0 }} 积分，抵 ¥{{ maxPointsDeductionAmount.toFixed(2) }}</text>
            </view>
          </view>
          <switch :checked="usePoints" @change="togglePoints" color="#3B82F6" style="transform:scale(0.8)" />
        </view>

        <!-- 柠檬币抵扣 -->
        <view class="deduction-item">
          <view class="item-left">
            <t-icon name="money-circle" size="40rpx" color="#EF4444" />
            <view class="item-info">
              <text class="item-title">柠檬币抵扣</text>
              <text class="item-desc">可用 {{ userStore.userInfo?.coins || 0 }} 币，抵 ¥{{ maxCoinsDeductionAmount.toFixed(2) }}</text>
            </view>
          </view>
          <switch :checked="useCoins" @change="toggleCoins" color="#3B82F6" style="transform:scale(0.8)" />
        </view>
      </view>

    </scroll-view>

    <!-- 底部支付栏 -->
    <view class="bottom-bar">
      <view class="price-info">
        <text class="label">实付金额：</text>
        <text class="price">¥{{ finalPayAmount.toFixed(2) }}</text>
        <text class="original-price" v-if="discountAmount > 0">¥{{ totalBillAmount.toFixed(2) }}</text>
      </view>
      <button class="pay-btn" :disabled="totalBillAmount === 0 || paying" @tap="handlePay">
        {{ paying ? '支付中...' : '立即支付' }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { getUnpaidBills, payBills, type Bill } from '@/api/modules/bill';

const userStore = useUserStore();
const bills = ref<Bill[]>([]);
const loading = ref(true);
const paying = ref(false);
const selectedBillIds = ref<string[]>([]);

const usePoints = ref(false);
const useCoins = ref(false);

// 汇率配置
const POINTS_RATE = 100; // 100 积分 = 1 元
const COINS_RATE = 10;   // 10 柠檬币 = 1 元 (假设汇率)

onMounted(async () => {
  await loadBills();
  // 如果没有用户信息，尝试获取
  if (!userStore.state.userInfo) {
    await userStore.fetchUserInfo();
  }
});

const loadBills = async () => {
  loading.value = true;
  try {
    bills.value = await getUnpaidBills();
    // 默认全选
    selectedBillIds.value = bills.value.map(b => b.id);
  } catch (e) {
    uni.showToast({ title: '加载账单失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
};

const handleBillChange = (e: any) => {
  selectedBillIds.value = e.detail.value;
};

const togglePoints = (e: any) => {
  usePoints.value = e.detail.value;
};

const toggleCoins = (e: any) => {
  useCoins.value = e.detail.value;
};

// 计算属性
const totalBillAmount = computed(() => {
  return bills.value
    .filter(b => selectedBillIds.value.includes(b.id))
    .reduce((sum, b) => sum + b.amount, 0);
});

// 最大可抵扣金额（积分）
const maxPointsDeductionAmount = computed(() => {
  const points = userStore.state.userInfo?.points || 0;
  return points / POINTS_RATE;
});

// 最大可抵扣金额（柠檬币）
const maxCoinsDeductionAmount = computed(() => {
  const coins = userStore.state.userInfo?.coins || 0;
  return coins / COINS_RATE;
});

// 实际抵扣金额
const discountAmount = computed(() => {
  let remainingBill = totalBillAmount.value;
  let discount = 0;

  if (usePoints.value) {
    const pointsDeduct = Math.min(remainingBill, maxPointsDeductionAmount.value);
    discount += pointsDeduct;
    remainingBill -= pointsDeduct;
  }

  if (useCoins.value && remainingBill > 0) {
    const coinsDeduct = Math.min(remainingBill, maxCoinsDeductionAmount.value);
    discount += coinsDeduct;
  }

  return discount;
});

const finalPayAmount = computed(() => {
  return Math.max(0, totalBillAmount.value - discountAmount.value);
});

const handlePay = async () => {
  if (selectedBillIds.value.length === 0) return;
  
  paying.value = true;
  try {
    const total = totalBillAmount.value;
    const userPoints = userStore.state.userInfo?.points || 0;
    const userCoins = userStore.state.userInfo?.coins || 0;

    let pointsToDeduct = 0;
    let coinsToDeduct = 0;

    if (usePoints.value) {
      // 计算需要多少积分：min(账单金额 * 汇率, 用户积分)
      pointsToDeduct = Math.min(total * POINTS_RATE, userPoints);
    }

    if (useCoins.value) {
      // 剩余需要支付的金额
      const remainingAmount = total - (pointsToDeduct / POINTS_RATE);
      if (remainingAmount > 0) {
        coinsToDeduct = Math.min(remainingAmount * COINS_RATE, userCoins);
      }
    }

    const deduction = {
      points: pointsToDeduct,
      coins: coinsToDeduct
    };

    const res = await payBills(selectedBillIds.value, deduction);
    
    if (res.success) {
      uni.showToast({ title: '支付成功', icon: 'success' });
      // 刷新账单和用户信息
      await loadBills();
      await userStore.fetchUserInfo();
      // 重置选项
      usePoints.value = false;
      useCoins.value = false;
      selectedBillIds.value = []; // 清空选中
    }
  } catch (e) {
    uni.showToast({ title: '支付失败', icon: 'none' });
  } finally {
    paying.value = false;
  }
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  height: 100vh;
  background-color: #F4F9FF;
  display: flex;
  flex-direction: column;
}

.scroll-content {
  flex: 1;
  padding: 32rpx;
  box-sizing: border-box;
  padding-bottom: 140rpx; // 为底部栏留出空间
}

.house-card {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 8rpx 24rpx rgba(37, 99, 235, 0.2);

  .house-info {
    display: flex;
    align-items: center;
    margin-bottom: 24rpx;

    .house-detail {
      margin-left: 24rpx;
      color: #fff;
      display: flex;
      flex-direction: column;

      .community-name {
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 8rpx;
      }

      .room-number {
        font-size: 26rpx;
        opacity: 0.9;
      }
    }
  }

  .house-owner {
    border-top: 1rpx solid rgba(255, 255, 255, 0.2);
    padding-top: 24rpx;
    color: #fff;
    font-size: 26rpx;
    opacity: 0.9;
  }
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  color: #334155;
  margin-bottom: 24rpx;
  padding-left: 16rpx;
  border-left: 8rpx solid #3B82F6;
}

.bill-list {
  margin-bottom: 32rpx;
}

.bill-item {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .bill-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 20rpx;

    .bill-main {
      flex: 1;
      margin-left: 16rpx;
      display: flex;
      flex-direction: column;

      .bill-title {
        font-size: 28rpx;
        color: #1E293B;
        font-weight: 500;
        margin-bottom: 8rpx;
      }

      .bill-desc {
        font-size: 24rpx;
        color: #94A3B8;
      }
    }

    .bill-amount {
      font-size: 32rpx;
      color: #EF4444;
      font-weight: bold;
      font-family: 'DIN Alternate';
    }
  }

  .bill-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20rpx;
    border-top: 1rpx solid #F1F5F9;
    font-size: 24rpx;

    .bill-date {
      color: #64748B;
    }

    .bill-status {
      color: #EF4444;
      background: #FEF2F2;
      padding: 4rpx 12rpx;
      border-radius: 8rpx;
    }
  }
}

.empty-bills {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64rpx 0;
  color: #94A3B8;
  font-size: 28rpx;
  
  text {
    margin-top: 16rpx;
  }
}

.deduction-card {
  background: #fff;
  border-radius: 20rpx;
  padding: 0 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .deduction-item {
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
      align-items: center;

      .item-info {
        margin-left: 16rpx;
        display: flex;
        flex-direction: column;

        .item-title {
          font-size: 28rpx;
          color: #1E293B;
          margin-bottom: 4rpx;
        }

        .item-desc {
          font-size: 24rpx;
          color: #64748B;
        }
      }
    }
  }
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 24rpx 32rpx;
  padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -4rpx 16rpx rgba(0, 0, 0, 0.06);
  z-index: 100;

  .price-info {
    display: flex;
    align-items: baseline;

    .label {
      font-size: 28rpx;
      color: #334155;
    }

    .price {
      font-size: 40rpx;
      color: #EF4444;
      font-weight: bold;
      font-family: 'DIN Alternate';
    }

    .original-price {
      font-size: 24rpx;
      color: #94A3B8;
      text-decoration: line-through;
      margin-left: 12rpx;
    }
  }

  .pay-btn {
    background: #3B82F6;
    color: #fff;
    font-size: 30rpx;
    font-weight: bold;
    padding: 0 48rpx;
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 40rpx;
    margin: 0;
    
    &[disabled] {
      background: #CBD5E1;
      color: #fff;
    }
  }
}
</style>
