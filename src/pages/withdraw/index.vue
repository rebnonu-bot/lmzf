<template>
  <scroll-view class="page-container" scroll-y>
    <view class="withdraw-card">
      <view class="card-title">提现金额</view>
      <view class="input-wrapper">
        <text class="currency">¥</text>
        <input 
          class="amount-input" 
          type="digit" 
          v-model="amount" 
          placeholder="0.00" 
          placeholder-class="placeholder"
        />
      </view>
      <view class="balance-hint">
        <text>可提现余额 ¥{{ userStore.balance.toFixed(2) }}</text>
        <text class="withdraw-all" @tap="handleWithdrawAll">全部提现</text>
      </view>
    </view>

    <view class="method-section">
      <view class="section-title">提现方式</view>
      <view class="method-list">
        <view 
          class="method-item" 
          :class="{ active: method === 'wechat' }"
          @tap="method = 'wechat'"
        >
          <t-icon name="logo-wechat" size="48rpx" color="#07C160" />
          <text class="method-name">微信零钱</text>
          <t-icon v-if="method === 'wechat'" name="check-circle-filled" size="40rpx" color="#3B82F6" />
          <view v-else class="check-circle"></view>
        </view>
        <view 
          class="method-item" 
          :class="{ active: method === 'bank' }"
          @tap="method = 'bank'"
        >
          <t-icon name="creditcard" size="48rpx" color="#F59E0B" />
          <text class="method-name">银行卡</text>
          <t-icon v-if="method === 'bank'" name="check-circle-filled" size="40rpx" color="#3B82F6" />
          <view v-else class="check-circle"></view>
        </view>
      </view>
    </view>

    <view class="submit-btn-wrapper">
      <t-button 
        theme="primary" 
        size="large" 
        block 
        :disabled="!isValid" 
        :loading="loading"
        @tap="handleSubmit"
      >
        确认提现
      </t-button>
    </view>

    <view class="tips-section">
      <view class="tips-title">温馨提示</view>
      <view class="tips-content">
        <view>1. 提现金额最低 10 元；</view>
        <view>2. 提现申请将在 1-3 个工作日内审核到账；</view>
        <view>3. 银行卡提现可能会产生手续费，具体以银行规定为准。</view>
      </view>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { withdraw } from '@/api/modules/user';

const userStore = useUserStore();
const amount = ref('');
const method = ref<'wechat' | 'bank'>('wechat');
const loading = ref(false);

const isValid = computed(() => {
  const val = parseFloat(amount.value);
  return val >= 10 && val <= userStore.balance;
});

const handleWithdrawAll = () => {
  amount.value = userStore.balance.toString();
};

const handleSubmit = async () => {
  if (!isValid.value || loading.value) return;
  
  loading.value = true;
  try {
    const res = await withdraw(parseFloat(amount.value), method.value as any);
    if (res.success) {
      uni.showToast({
        title: '提现申请已提交',
        icon: 'success'
      });
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  } catch (error) {
    uni.showToast({
      title: '提现失败',
      icon: 'error'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="less" scoped>
.page-container {
  height: 100vh;
  background-color: #F4F9FF;
  padding: 32rpx;
}

.withdraw-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 40rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .card-title {
    font-size: 28rpx;
    color: #64748B;
    margin-bottom: 24rpx;
  }

  .input-wrapper {
    display: flex;
    align-items: baseline;
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid #E2E8F0;
    margin-bottom: 24rpx;

    .currency {
      font-size: 48rpx;
      font-weight: 600;
      color: #334155;
      margin-right: 16rpx;
    }

    .amount-input {
      flex: 1;
      font-size: 64rpx;
      font-weight: bold;
      height: 80rpx;
      font-family: 'DIN Alternate', sans-serif;
    }
  }

  .balance-hint {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    color: #94A3B8;

    .withdraw-all {
      color: #3B82F6;
    }
  }
}

.method-section {
  margin-bottom: 48rpx;

  .section-title {
    font-size: 28rpx;
    color: #64748B;
    margin-bottom: 24rpx;
    padding-left: 16rpx;
  }

  .method-list {
    background: #fff;
    border-radius: 24rpx;
    overflow: hidden;
  }

  .method-item {
    display: flex;
    align-items: center;
    padding: 32rpx;
    border-bottom: 2rpx solid #F1F5F9;

    &:last-child {
      border-bottom: none;
    }

    &.active {
      background: #F8FAFC;
    }

    .method-name {
      flex: 1;
      margin-left: 24rpx;
      font-size: 30rpx;
      color: #334155;
    }

    .check-circle {
      width: 40rpx;
      height: 40rpx;
      border-radius: 50%;
      border: 2rpx solid #CBD5E1;
    }
  }
}

.submit-btn-wrapper {
  margin-bottom: 48rpx;
}

.tips-section {
  .tips-title {
    font-size: 26rpx;
    color: #64748B;
    margin-bottom: 16rpx;
  }

  .tips-content {
    font-size: 24rpx;
    color: #94A3B8;
    line-height: 1.6;
  }
}
</style>
