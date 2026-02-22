<template>
  <view class="user-card-wrapper">
    <view class="logged-in-card">
      <view class="user-main-info">
        <view class="left-section">
          <image class="user-avatar" :src="userInfo.avatar" mode="aspectFill" />
          <view class="name-level-section">
            <view class="name-row">
              <view class="nickname-wrapper">
                <text class="nickname">{{ userInfo.nickname }}</text>
                <text 
                  class="level-badge" 
                  :style="{ background: currentLevel.bg, color: currentLevel.color }"
                >
                  {{ currentLevel.name }}
                </text>
              </view>
            </view>
            <view class="achievement-tags">
              <view class="tag-item">
                <text class="label">加入第</text>
                <text class="value" :style="{ color: currentLevel.tagColor }">{{ userInfo.joinDays }}</text>
                <text class="label">天</text>
              </view>
              <text class="tag-divider">丨</text>
              <view class="tag-item">
                <text class="label">已邀</text>
                <text class="value" :style="{ color: currentLevel.tagColor }">{{ userInfo.inviteCount }}</text>
                <text class="label">人</text>
              </view>
            </view>
          </view>
        </view>
        
        <view class="right-stats">
          <view class="stat-item" @tap="handleWallet">
            <text class="stat-value">{{ userInfo.balance || 0 }}</text>
            <text class="stat-label">钱包</text>
          </view>
          <view class="stat-item" @tap="handleCoins">
            <text class="stat-value">{{ userInfo.coins }}</text>
            <text class="stat-label">{{ userInfo.coinLabel }}</text>
          </view>
          <view class="stat-item" @tap="handleCoupons">
            <text class="stat-value">{{ userInfo.coupons }}</text>
            <text class="stat-label">优惠券</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { UserInfo, UserLevel } from '@/types';

interface LevelConfig {
  name: string;
  bg: string;
  color: string;
  tagColor: string;
}

const props = defineProps<{
  userInfo: UserInfo;
  levelConfig: Record<UserLevel, LevelConfig>;
}>();

const currentLevel = computed(() => {
  const level = props.userInfo.level as UserLevel;
  return props.levelConfig[level] || props.levelConfig.copper;
});

const handleWallet = () => {
  uni.navigateTo({ url: '/pages/wallet/index' });
};

const handleCoins = () => {
  uni.navigateTo({ url: '/pages/lemon-coin/index' });
};

const handleCoupons = () => {
  uni.navigateTo({ url: '/pages/coupon/index' });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.user-card-wrapper {
  position: relative;

  .logged-in-card {
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(24rpx);
    -webkit-backdrop-filter: blur(24rpx);
    border-radius: 32rpx;
    box-shadow: 
      0 10rpx 40rpx rgba(0, 0, 0, 0.04),
      inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
    border: none;
    overflow: hidden;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: -40rpx;
      right: -40rpx;
      width: 140rpx;
      height: 140rpx;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
      border-radius: 50%;
    }

    .user-main-info {
      padding: 32rpx 28rpx;
      display: flex;
      flex-direction: column;
      gap: 32rpx;
      position: relative;
      z-index: 1;

      .left-section {
        display: flex;
        align-items: center;
        gap: 24rpx;
        width: 100%;

        .user-avatar {
          flex-shrink: 0;
          width: 96rpx;
          height: 96rpx;
          border-radius: 50%;
          border: 3rpx solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.08);
          background: linear-gradient(135deg, #F1F5F9, #E2E8F0);
          padding: 3rpx;
        }

        .name-level-section {
          display: flex;
          flex-direction: column;
          gap: 8rpx;
          flex: 1;
          min-width: 0;

          .name-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .nickname-wrapper {
              display: flex;
              align-items: center;
              gap: 12rpx;
              
              .nickname {
                font-size: 32rpx;
                font-weight: 700;
                color: #1E293B;
                max-width: 300rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .level-badge {
                font-size: 20rpx;
                font-weight: 600;
                padding: 4rpx 12rpx;
                border-radius: 12rpx;
                flex-shrink: 0;
              }
            }
          }

          .achievement-tags {
            display: flex;
            align-items: center;
            gap: 16rpx;

            .tag-item {
              display: flex;
              align-items: center;
              gap: 6rpx;

              .label {
                font-size: 24rpx;
                color: #64748B;
              }

              .value {
                font-size: 26rpx;
                font-weight: 700;
                font-family: 'DIN Alternate', -apple-system, sans-serif;
              }
            }

            .tag-divider {
              font-size: 22rpx;
              color: #CBD5E1;
              margin: 0 4rpx;
            }
          }
        }
      }

      .right-stats {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-top: 24rpx;
        border-top: 1rpx solid rgba(226, 232, 240, 0.6);

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8rpx;
          flex: 1;
          position: relative;

          &:not(:last-child)::after {
            content: '';
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            height: 32rpx;
            width: 1rpx;
            background-color: rgba(226, 232, 240, 0.8);
          }

          .stat-value {
            font-size: 40rpx;
            font-weight: 700;
            color: #3B82F6;
            font-family: 'DIN Alternate', -apple-system, sans-serif;
            line-height: 1;
          }

          .stat-label {
            font-size: 24rpx;
            color: #64748B;
          }

          &:active {
            opacity: 0.7;
            transform: scale(0.98);
          }
        }
      }
    }
  }
}
</style>
