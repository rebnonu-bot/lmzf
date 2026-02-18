<template>
  <view class="points-card">
    <view class="points-display">
      <view class="points-info" @tap="handlePointsDetail">
        <text class="points-slogan">你家物业费邻檬帮你减</text>
        <view class="points-label-row">
          <text class="points-label">当前数字积分</text>
          <view class="points-help-icon">?</view>
        </view>
        <text class="points-value" :class="{ 'large-number': displayPoints >= 1000000, 'xlarge-number': displayPoints >= 10000000 }">{{ displayPoints }}</text>
        <view class="points-action-row">
          <view class="points-hint-tag">
            <text class="points-hint-text">可抵 {{ displayAmount }} 元</text>
          </view>
          <view class="go-deduct-btn" @tap.stop="handleDeduct">
            <text>去抵扣</text>
            <t-icon name="chevron-right" size="24rpx" />
          </view>
        </view>
      </view>
    </view>

    <!-- 右侧支付/金融装饰图标 -->
    <view class="header-decor">
      <view class="card-stack">
        <!-- 支付宝图标装饰 -->
        <view class="payment-icon alipay">
          <t-icon name="logo-alipay" size="22rpx" />
        </view>
        <!-- 微信支付图标装饰 -->
        <view class="payment-icon wechat">
          <t-icon name="logo-wechatpay" size="22rpx" />
        </view>
        <!-- 快捷图标装饰 -->
        <view class="payment-icon security">
          <t-icon name="secured" size="20rpx" />
        </view>
        <!-- 微信小程序图标装饰 -->
        <view class="payment-icon miniprogram">
          <t-icon name="logo-miniprogram" size="20rpx" />
        </view>
        
        <view class="decor-card card-1">
          <view class="card-chip"></view>
          <view class="card-shiny"></view>
          <view class="card-number">**** **** **** 8888</view>
          <view class="card-logo">LMZF</view>
        </view>
        <view class="decor-card card-2">
          <view class="card-logo-mini">VIP</view>
        </view>
        <view class="decor-card card-3"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  displayPoints: number;
}>();

const displayAmount = computed(() => {
  return (props.displayPoints / 100).toFixed(2);
});

const handleDeduct = () => {
  uni.navigateTo({ url: '/pages/property-pay/index' });
};

const handlePointsDetail = () => {
  uni.navigateTo({ url: '/pages/points-detail/index' });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.points-card {
  display: flex;
  align-items: center;
  padding: 32rpx;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24rpx);
  border-radius: 32rpx;
  border: 1rpx solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 12rpx 40rpx rgba(0, 0, 0, 0.08);

  .points-display {
    flex: 1;
    min-width: 0;
    position: relative;
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0;
    border-radius: 0;
    border: none;
    box-shadow: none;
    margin-right: 20rpx;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

    .points-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8rpx;
      position: relative;

      .points-slogan {
        font-size: 32rpx;
        color: #ffffff;
        font-weight: 800;
        letter-spacing: 2rpx;
        margin-bottom: 4rpx;
        display: inline-block;
        position: relative;
        
        &::after {
          content: "";
          display: block;
          width: 120rpx;
          height: 4rpx;
          margin-top: 8rpx;
          border-radius: 2rpx;
          background: linear-gradient(90deg, #ffffff, transparent);
        }
      }

      .points-label-row {
        display: inline-block;
        position: relative;
        align-self: flex-start;

        .points-label {
          font-size: 24rpx;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 1rpx;
        }

        .points-help-icon {
          position: absolute;
          top: -6rpx;
          right: -30rpx;
          width: 24rpx;
          height: 24rpx;
          border-radius: 50%;
          background: #FF9D5C;
          border: 2rpx solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16rpx;
          color: #ffffff;
          font-weight: bold;
          box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
          transition: all 0.2s;
          box-sizing: border-box;
          
          &:active {
            transform: scale(0.9);
            filter: brightness(1.1);
          }
        }
      }

      .points-value {
        font-size: 80rpx;
        font-weight: 700;
        color: #ffffff;
        line-height: 1;
        letter-spacing: -2rpx;
        font-family: 'DIN Alternate', -apple-system, sans-serif;
        margin-bottom: 12rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      /* 大数字自适应缩小字号 */
      .points-value.large-number {
        font-size: 56rpx;
        letter-spacing: -1rpx;
      }
      
      .points-value.xlarge-number {
        font-size: 44rpx;
        letter-spacing: -1rpx;
      }

      .points-action-row {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .points-hint-tag {
          background: rgba(34, 197, 94, 0.9);
          padding: 8rpx 24rpx;
          border-radius: 12rpx;
          box-shadow: 0 4rpx 12rpx rgba(34, 197, 94, 0.2);

          .points-hint-text {
            font-size: 26rpx;
            color: #ffffff;
            font-weight: 700;
            white-space: nowrap;
          }
        }

        .go-deduct-btn {
          display: flex;
          align-items: center;
          gap: 6rpx;
          background: #FF9D5C;
          padding: 8rpx 24rpx;
          border-radius: 12rpx;
          box-shadow: 0 4rpx 12rpx rgba(255, 157, 92, 0.3);
          transition: all 0.2s;
          white-space: nowrap;
          flex-shrink: 0;

          text {
            font-size: 26rpx;
            color: #ffffff;
            font-weight: 800;
            white-space: nowrap;
          }

          :deep(.t-icon) {
            color: #ffffff !important;
            flex-shrink: 0;
          }

          &:active {
            background: #e88c4d;
            transform: scale(0.95);
          }
        }
      }
    }
  }

  .header-decor {
    position: relative;
    margin-top: 60rpx;
    margin-right: 0;
    z-index: 2;
    perspective: 1500rpx;
    flex-shrink: 0;

    .card-stack {
      position: relative;
      width: 220rpx;
      height: 140rpx;
      transform-style: preserve-3d;
      animation: stack-float 8s ease-in-out infinite;
    }

    .payment-icon {
      position: absolute;
      width: 36rpx;
      height: 36rpx;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 4;
      color: #ffffff;
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(4rpx);

      &:active {
        transform: scale(0.9) translateZ(150rpx) !important;
        filter: brightness(1.05);
      }

      :deep(.t-icon) {
        color: #ffffff !important;
        filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.1));
      }

      &.alipay {
        top: -1.5rem;
        left: 0.125rem;
        background: linear-gradient(135deg, #7FDBFF, #0074D9);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-1 6.5s ease-in-out infinite;
      }

      &.wechat {
        top: -1.5rem;
        right: 0.375rem;
        background: linear-gradient(135deg, #A8E6CF, #56AB2F);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-2 7.5s ease-in-out infinite;
      }

      &.security {
        bottom: 0.5rem;
        left: -1rem;
        background: linear-gradient(135deg, #FFD3B6, #FF8C00);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-3 9.5s ease-in-out infinite;
      }

      &.miniprogram {
        bottom: 0.8rem;
        right: 1.25rem;
        background: linear-gradient(135deg, #DCEDC1, #20BF55);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-4 7s ease-in-out infinite;
      }
    }

    .decor-card {
      position: absolute;
      width: 200rpx;
      height: 125rpx;
      backdrop-filter: blur(12rpx);
      border-radius: 20rpx;
      border: 1rpx solid rgba(255, 255, 255, 0.2);
      box-shadow: 
        0 10rpx 30rpx rgba(0, 0, 0, 0.15),
        inset 0 0 20rpx rgba(255, 255, 255, 0.1);
      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
      overflow: hidden;

      &.card-1 {
        z-index: 3;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
        transform: translateZ(60rpx) rotate(0deg);
        
        .card-chip {
          position: absolute;
          top: 30rpx;
          left: 24rpx;
          width: 40rpx;
          height: 30rpx;
          background: linear-gradient(135deg, #FFD700, #FDB931);
          border-radius: 6rpx;
          box-shadow: 0 2rpx 4rpx rgba(0,0,0,0.1);
          &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80%;
            height: 1rpx;
            background: rgba(0,0,0,0.1);
            box-shadow: 0 4rpx 0 rgba(0,0,0,0.1), 0 -4rpx 0 rgba(0,0,0,0.1);
          }
        }

        .card-shiny {
          position: absolute;
          top: 0;
          left: -150%;
          width: 200%;
          height: 100%;
          background: linear-gradient(
            105deg, 
            transparent 30%, 
            rgba(255, 255, 255, 0.2) 45%, 
            rgba(255, 255, 255, 0.3) 50%, 
            rgba(255, 255, 255, 0.2) 55%, 
            transparent 70%
          );
          transform: skewX(-20deg);
          animation: card-shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        .card-number {
          position: absolute;
          bottom: 0.6rem;
          left: 24rpx;
          font-size: 16rpx;
          line-height: 1;
          color: #ffffff;
          font-family: 'Courier New', Courier, monospace;
          letter-spacing: 2rpx;
          text-shadow: 0 2rpx 4rpx rgba(0,0,0,0.4);
        }

        .card-logo {
          position: absolute;
          top: 30rpx;
          right: 24rpx;
          font-size: 20rpx;
          font-weight: 900;
          color: #ffffff;
          font-style: italic;
          text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.3);
          letter-spacing: 1rpx;
        }
      }

      &.card-2 {
        z-index: 2;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
        transform: translateZ(20rpx) translate(40rpx, -24rpx) rotate(-6deg);
        opacity: 0.95;

        .card-logo-mini {
          position: absolute;
          top: 18rpx;
          right: 18rpx;
          font-size: 14rpx;
          font-weight: bold;
          color: #FFD700;
          border: 1rpx solid rgba(255, 215, 0, 0.6);
          padding: 2rpx 6rpx;
          border-radius: 4rpx;
          background: rgba(0, 0, 0, 0.1);
        }
      }

      &.card-3 {
        z-index: 1;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        transform: translateZ(-20rpx) translate(80rpx, -48rpx) rotate(-12deg);
        opacity: 0.9;
      }
    }
  }
}

@keyframes stack-float {
  0%, 100% { transform: translateY(0) rotateX(5deg); }
  50% { transform: translateY(-10rpx) rotateX(8deg); }
}

@keyframes icon-float-1 {
  0%, 100% { transform: translateZ(120rpx) translateY(0); }
  50% { transform: translateZ(120rpx) translateY(-8rpx); }
}

@keyframes icon-float-2 {
  0%, 100% { transform: translateZ(120rpx) translateY(0); }
  50% { transform: translateZ(120rpx) translateY(-6rpx); }
}

@keyframes icon-float-3 {
  0%, 100% { transform: translateZ(120rpx) translateY(0); }
  50% { transform: translateZ(120rpx) translateY(-10rpx); }
}

@keyframes icon-float-4 {
  0%, 100% { transform: translateZ(120rpx) translateY(0); }
  50% { transform: translateZ(120rpx) translateY(-5rpx); }
}

@keyframes card-shine {
  0% { left: -150%; }
  100% { left: 150%; }
}
</style>
