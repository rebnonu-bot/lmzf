<template>
  <view class="page-container">
    <!-- 顶部 Tabs -->
    <view class="tabs-container">
      <view 
        v-for="tab in tabs" 
        :key="tab.value"
        class="tab-item"
        :class="{ active: currentTab === tab.value }"
        @tap="switchTab(tab.value)"
      >
        <text>{{ tab.label }}</text>
        <view class="tab-line" v-if="currentTab === tab.value"></view>
      </view>
    </view>

    <!-- 优惠券列表 -->
    <scroll-view scroll-y class="coupon-list-container">
      <view class="coupon-list" v-if="!loading && coupons.length > 0">
        <view 
          class="coupon-card" 
          v-for="coupon in coupons" 
          :key="coupon.id"
          :class="{ 'coupon-disabled': currentTab !== 'unused' }"
        >
          <view class="coupon-left">
            <view class="amount-wrapper">
              <template v-if="coupon.type === 'cash'">
                <text class="symbol">¥</text>
                <text class="amount">{{ coupon.amount }}</text>
              </template>
              <template v-else-if="coupon.type === 'discount'">
                <text class="amount">{{ coupon.amount * 10 }}</text>
                <text class="symbol">折</text>
              </template>
              <template v-else>
                <text class="free-text">免费</text>
              </template>
            </view>
            <text class="condition">{{ getConditionText(coupon) }}</text>
          </view>
          
          <view class="coupon-right">
            <view class="coupon-info">
              <text class="coupon-name">{{ coupon.name }}</text>
              <text class="coupon-date">{{ coupon.validStartTime }} 至 {{ coupon.validEndTime }}</text>
              <text class="coupon-desc">{{ coupon.description }}</text>
            </view>
            <view class="coupon-action">
              <button 
                class="use-btn" 
                v-if="currentTab === 'unused'"
                @tap="handleUse(coupon)"
              >
                去使用
              </button>
              <image 
                v-else 
                :src="currentTab === 'used' ? '/static/icon-used.png' : '/static/icon-expired.png'" 
                class="status-icon" 
              />
            </view>
          </view>
          
          <!-- 装饰圆孔 -->
          <view class="circle top"></view>
          <view class="circle bottom"></view>
        </view>
      </view>
      
      <!-- 空状态 -->
      <view v-if="!loading && coupons.length === 0" class="empty-state">
        <t-icon name="ticket" size="96rpx" color="#CBD5E1" />
        <text class="empty-text">暂无相关优惠券</text>
      </view>
      
      <!-- 加载状态 -->
      <view v-if="loading" class="loading-state">
        <t-loading theme="circular" size="40rpx" text="加载中..." />
      </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { getUserCoupons } from '@/api/modules/user';

type CouponStatus = 'unused' | 'used' | 'expired';

interface Coupon {
  id: string;
  name: string;
  amount: number;
  type: 'cash' | 'discount' | 'free';
  minSpend: number;
  status: CouponStatus;
  validStartTime: string;
  validEndTime: string;
  description: string;
  storeName: string;
}

const tabs = [
  { label: '未使用', value: 'unused' },
  { label: '已使用', value: 'used' },
  { label: '已过期', value: 'expired' },
] as const;

const currentTab = ref<CouponStatus>('unused');
const coupons = ref<Coupon[]>([]);
const loading = ref(false);

const fetchCoupons = async () => {
  loading.value = true;
  coupons.value = []; // 清空列表以显示加载效果
  try {
    const res = await getUserCoupons(currentTab.value);
    coupons.value = res;
  } catch (error) {
    console.error('获取优惠券失败', error);
    uni.showToast({ title: '加载失败', icon: 'none' });
  } finally {
    loading.value = false;
  }
};

const switchTab = (tab: CouponStatus) => {
  if (currentTab.value === tab) return;
  currentTab.value = tab;
  fetchCoupons();
};

const getConditionText = (coupon: Coupon) => {
  if (coupon.type === 'free') return '无门槛';
  if (coupon.minSpend === 0) return '无门槛';
  return `满${coupon.minSpend}元可用`;
};

const handleUse = (coupon: Coupon) => {
  uni.showModal({
    title: '使用优惠券',
    content: `请向商家出示此券\n券码：${coupon.id}-${Date.now().toString().slice(-4)}`,
    showCancel: false,
    confirmText: '关闭'
  });
};

onMounted(() => {
  fetchCoupons();
});
</script>

<style lang="less" scoped>
.page-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #F4F9FF;
}

.tabs-container {
  display: flex;
  background-color: #fff;
  padding: 0 32rpx;
  position: relative;
  z-index: 10;
  box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.02);
  
  .tab-item {
    flex: 1;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #64748B;
    position: relative;
    transition: all 0.3s;
    
    &.active {
      color: #3B82F6;
      font-weight: 600;
      font-size: 30rpx;
    }
    
    .tab-line {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 40rpx;
      height: 4rpx;
      background-color: #3B82F6;
      border-radius: 4rpx;
    }
  }
}

.coupon-list-container {
  flex: 1;
  padding: 24rpx 32rpx;
  box-sizing: border-box;
}

.coupon-card {
  display: flex;
  background-color: #fff;
  border-radius: 16rpx;
  margin-bottom: 24rpx;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
  
  &.coupon-disabled {
    .coupon-left {
      background: #F1F5F9;
      color: #94A3B8;
      
      .amount-wrapper {
        color: #94A3B8;
      }
    }
    
    .coupon-right {
      .coupon-name {
        color: #94A3B8;
      }
    }
  }
  
  .coupon-left {
    width: 200rpx;
    background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #3B82F6;
    padding: 24rpx 0;
    border-right: 2rpx dashed rgba(59, 130, 246, 0.2);
    position: relative;
    
    .amount-wrapper {
      margin-bottom: 8rpx;
      
      .symbol {
        font-size: 24rpx;
        font-weight: bold;
      }
      
      .amount {
        font-size: 56rpx;
        font-weight: bold;
        font-family: 'DIN Alternate', sans-serif;
      }
      
      .free-text {
        font-size: 40rpx;
        font-weight: bold;
      }
    }
    
    .condition {
      font-size: 20rpx;
      opacity: 0.8;
    }
  }
  
  .coupon-right {
    flex: 1;
    padding: 24rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .coupon-info {
      flex: 1;
      margin-right: 20rpx;
      display: flex;
      flex-direction: column;
      
      .coupon-name {
        font-size: 28rpx;
        font-weight: 600;
        color: #334155;
        margin-bottom: 8rpx;
      }
      
      .coupon-date {
        font-size: 20rpx;
        color: #94A3B8;
        margin-bottom: 4rpx;
      }
      
      .coupon-desc {
        font-size: 20rpx;
        color: #CBD5E1;
      }
    }
    
    .coupon-action {
      .use-btn {
        font-size: 24rpx;
        color: #fff;
        background-color: #3B82F6;
        border-radius: 24rpx;
        padding: 0 24rpx;
        line-height: 48rpx;
        margin: 0;
        
        &::after {
          border: none;
        }
      }
      
      .status-icon {
        width: 100rpx;
        height: 100rpx;
        opacity: 0.5;
      }
    }
  }
  
  .circle {
    position: absolute;
    left: 190rpx;
    width: 20rpx;
    height: 20rpx;
    background-color: #F4F9FF;
    border-radius: 50%;
    z-index: 2;
    
    &.top {
      top: -10rpx;
    }
    
    &.bottom {
      bottom: -10rpx;
    }
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 200rpx;
  gap: 24rpx;
  
  .empty-text {
    font-size: 28rpx;
    color: #94A3B8;
  }
}

.loading-state {
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
}
</style>