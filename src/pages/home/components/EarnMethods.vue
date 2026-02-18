<template>
  <view class="earn-points-section">
    <view class="section-header">
      <view class="header-left">
        <view class="header-icon">
          <t-icon name="gift" size="36rpx" color="#3B82F6" />
        </view>
        <text class="section-title">赚积分</text>
      </view>
      <text class="section-subtitle">多种方式 轻松获取</text>
    </view>
    
    <view class="earn-methods">
      <!-- 线下消费 -->
      <view class="earn-card offline" @tap="handleOffline">
        <view class="card-bottom-line blue"></view>
        <view class="card-bg-icon">
          <t-icon name="shop" size="120rpx" color="rgba(59, 130, 246, 0.08)" />
        </view>
        <view class="card-content">
          <view class="earn-icon">
            <t-icon name="shop" size="40rpx" color="#3B82F6" />
          </view>
          <text class="earn-title">线下消费</text>
          <text class="earn-desc">到店付款 即得积分</text>
        </view>
        <view class="earn-arrow">
          <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
        </view>
      </view>
      
      <!-- 线上CPS -->
      <view class="earn-card online" @tap="handleOnline">
        <view class="card-bottom-line orange"></view>
        <view class="card-bg-icon">
          <t-icon name="internet" size="120rpx" color="rgba(245, 158, 11, 0.08)" />
        </view>
        <view class="card-content">
          <view class="earn-icon orange">
            <t-icon name="internet" size="40rpx" color="#F59E0B" />
          </view>
          <text class="earn-title">线上购物</text>
          <text class="earn-desc">主流平台 返利积分</text>
        </view>
        <view class="earn-arrow">
          <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  offline: [];
  online: [];
}>();

const handleOffline = () => emit('offline');
const handleOnline = () => emit('online');
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.earn-points-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .header-left {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .header-icon {
        width: 64rpx;
        height: 64rpx;
        background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .section-title {
        font-size: 32rpx;
        font-weight: 700;
        color: #1E293B;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .earn-methods {
    display: flex;
    flex-direction: row;
    gap: 20rpx;

    .earn-card {
      flex: 1;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 28rpx;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20rpx);
      border-radius: 24rpx;
      box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.03);
      position: relative;
      overflow: hidden;
      transition: all 0.2s;

      .card-bg-icon {
        position: absolute;
        right: -30rpx;
        top: -30rpx;
        opacity: 0.8;
        pointer-events: none;
        z-index: 0;
      }

      .card-bottom-line {
        position: absolute;
        bottom: 0;
        left: 20rpx;
        right: 20rpx;
        height: 4rpx;
        border-radius: 2rpx;

        &.blue {
          background: linear-gradient(90deg, transparent, #3B82F6, transparent);
        }

        &.orange {
          background: linear-gradient(90deg, transparent, #F59E0B, transparent);
        }
      }

      &:active {
        transform: scale(0.98);
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.02);
      }

      .card-content {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
        position: relative;
        z-index: 1;

        .earn-icon {
          width: 72rpx;
          height: 72rpx;
          background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
          border-radius: 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8rpx;

          &.orange {
            background: linear-gradient(135deg, #FEF3C7, #FDE68A);
          }
        }

        .earn-title {
          font-size: 30rpx;
          font-weight: 600;
          color: #1E293B;
        }

        .earn-desc {
          font-size: 24rpx;
          color: #64748B;
        }
      }

      .earn-arrow {
        align-self: center;
        position: relative;
        z-index: 1;
      }
    }
  }
}
</style>
