<template>
  <view class="page-container">
    <!-- 顶部渐变背景 (向下凸出的外弧) -->
    <view class="header-container">
      <view class="header-bg"></view>
      <!-- 阳光散光效果层 -->
      <view class="sunlight-glow"></view>
      <view class="sunlight-beam"></view>
      <view class="sunlight-flare"></view>
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
    
    <!-- 首页核心业务区 -->
    <view class="content">
      <!-- 仅保留背景容器 -->
    </view>

    <!-- 自定义底部导航 -->
    <CustomTabBar />
  </view>
</template>

<script setup lang="ts">
import CustomTabBar from '@/components/CustomTabBar.vue';
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  height: 100vh;
  background-color: #F4F9FF;
  position: relative;
  overflow: hidden; /* 禁用首页滚动 */
}

.header-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 344rpx; /* 对应 10.75rem (1rem=16px, 172px * 2) */
  z-index: 0;
  overflow: hidden;

  .header-bg {
    position: absolute;
    top: 0;
    left: -30%;
    width: 160%;
    height: 100%;
    background: linear-gradient(180deg, #3B82F6, #60A5FA 70%, #F4F9FF);
    border-radius: 0 0 50% 50%;
    animation: breathing 8s ease-in-out infinite; /* 仅通过缩放和透明度实现呼吸感 */
  }

  .sunlight-glow {
    position: absolute;
    top: -150rpx;
    right: -150rpx;
    width: 600rpx;
    height: 600rpx;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 75%);
    border-radius: 50%;
    filter: blur(50rpx);
    z-index: 1;
    animation: flare-glow 8s ease-in-out infinite;
  }

  .sunlight-beam {
    position: absolute;
    top: -100rpx;
    right: -50rpx;
    width: 800rpx;
    height: 800rpx;
    background: conic-gradient(from 135deg at 85% 15%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0) 30%);
    filter: blur(30rpx);
    z-index: 1;
    transform-origin: top right;
    animation: beam-rotate 15s linear infinite;
  }

  .sunlight-flare {
    position: absolute;
    top: 80rpx;
    right: 200rpx;
    width: 4rpx;
    height: 4rpx;
    background: #ffffff;
    box-shadow: 
      0 0 60rpx 30rpx rgba(255, 255, 255, 0.4),
      -150rpx 120rpx 100rpx 15rpx rgba(255, 255, 255, 0.2),
      -300rpx 200rpx 120rpx 8rpx rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    z-index: 2;
    animation: flare-float 12s ease-in-out infinite;
  }

  .header-decor {
    position: absolute;
    bottom: 60rpx;
    right: 80rpx;
    z-index: 2;
    perspective: 1500rpx;

    .card-stack {
        position: relative;
        width: 200rpx;
        height: 140rpx;
        transform-style: preserve-3d;
        animation: stack-float 8s ease-in-out infinite;

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
            box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.05); /* 极轻的阴影，更柔和 */
            backdrop-filter: blur(4rpx); /* 加入极微弱的模糊，增加通透感 */

            &:active {
              transform: scale(0.9) translateZ(150rpx) !important;
              filter: brightness(1.05);
            }

            :deep(.t-icon) {
              color: #ffffff !important;
              filter: drop-shadow(0 2rpx 4rpx rgba(0, 0, 0, 0.05));
            }
          
            &.alipay {
              top: -1.25rem;
              left: 0.125rem;
              background: linear-gradient(135deg, #7FDBFF, #0074D9); /* 柔和马卡龙蓝 */
              opacity: 0.85;
              border: 3rpx solid rgba(255, 255, 255, 0.6);
              transform: translateZ(120rpx);
              z-index: 20;
              animation: icon-float-1 6.5s ease-in-out infinite;
            }
            
            &.wechat {
              top: -0.875rem;
              right: 0.375rem;
              background: linear-gradient(135deg, #A8E6CF, #56AB2F); /* 柔和莫兰迪绿 */
              opacity: 0.85;
              border: 3rpx solid rgba(255, 255, 255, 0.6);
              transform: translateZ(120rpx);
              z-index: 20;
              animation: icon-float-2 7.5s ease-in-out infinite;
            }

            &.security {
              bottom: -0.2rem;
              left: -1rem;
              background: linear-gradient(135deg, #FFD3B6, #FF8C00); /* 暖心淡橙 */
              opacity: 0.85;
              border: 3rpx solid rgba(255, 255, 255, 0.6);
              transform: translateZ(120rpx);
              z-index: 20;
              animation: icon-float-3 9.5s ease-in-out infinite;
            }

            &.miniprogram {
              bottom: 0.125rem;
              right: 1.25rem;
              background: linear-gradient(135deg, #DCEDC1, #20BF55); /* 嫩草绿 */
              opacity: 0.85;
              border: 3rpx solid rgba(255, 255, 255, 0.6);
              transform: translateZ(120rpx);
              z-index: 20;
              animation: icon-float-4 7s ease-in-out infinite;
            }
          }

        .decor-card {
        position: absolute;
        width: 160rpx;
        height: 100rpx;
        backdrop-filter: blur(12rpx);
        border-radius: 16rpx;
        border: 1rpx solid rgba(255, 255, 255, 0.3);
        box-shadow: 
          0 10rpx 30rpx rgba(0, 0, 0, 0.1),
          inset 0 0 20rpx rgba(255, 255, 255, 0.1);
        transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        overflow: hidden;

        &.card-1 {
          z-index: 3;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05));
          transform: translateZ(60rpx) rotate(0deg);
          
          .card-chip {
            position: absolute;
            top: 25rpx;
            left: 20rpx;
            width: 32rpx;
            height: 24rpx;
            background: linear-gradient(135deg, #FFD700, #FDB931);
            border-radius: 4rpx;
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
              rgba(255, 255, 255, 0.3) 45%, 
              rgba(255, 255, 255, 0.4) 50%, 
              rgba(255, 255, 255, 0.3) 55%, 
              transparent 70%
            );
            transform: skewX(-20deg);
            animation: card-shine 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }

          .card-number {
            position: absolute;
            bottom: 0.5rem;
            left: 20rpx;
            font-size: 14rpx;
            line-height: 1;
            color: rgba(255, 255, 255, 0.9);
            font-family: 'Courier New', Courier, monospace;
            letter-spacing: 2rpx;
            text-shadow: 0 1rpx 2rpx rgba(0,0,0,0.2);
          }

          .card-logo {
            position: absolute;
            top: 25rpx;
            right: 20rpx;
            font-size: 18rpx;
            font-weight: 900;
            color: rgba(255, 255, 255, 1);
            font-style: italic;
            text-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.2);
            letter-spacing: 1rpx;
          }
        }

        &.card-2 {
          z-index: 2;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.03));
          transform: translateZ(20rpx) translate(30rpx, -18rpx) rotate(-6deg);
          opacity: 0.9;

          .card-logo-mini {
            position: absolute;
            top: 15rpx;
            right: 15rpx;
            font-size: 12rpx;
            font-weight: bold;
            color: #FFD700;
            border: 1rpx solid rgba(255, 215, 0, 0.5);
            padding: 2rpx 6rpx;
            border-radius: 4rpx;
            background: rgba(255, 215, 0, 0.1);
          }
        }

        &.card-3 {
          z-index: 1;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
          transform: translateZ(-20rpx) translate(60rpx, -36rpx) rotate(-12deg);
          opacity: 0.8;
        }
      }
    }
  }
}

@keyframes stack-float {
  0%, 100% { transform: rotateY(20deg) rotateX(10deg) translateY(0); }
  50% { transform: rotateY(28deg) rotateX(15deg) translateY(-20rpx); }
}

@keyframes icon-float-1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1) translateZ(120rpx); }
    33% { transform: translate(-8rpx, -12rpx) rotate(-5deg) scale(1.05) translateZ(120rpx); }
    66% { transform: translate(4rpx, -6rpx) rotate(3deg) scale(0.95) translateZ(120rpx); }
  }
  
  @keyframes icon-float-2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1) translateZ(120rpx); }
    33% { transform: translate(12rpx, 8rpx) rotate(8deg) scale(0.98) translateZ(120rpx); }
    66% { transform: translate(-6rpx, 12rpx) rotate(-4deg) scale(1.03) translateZ(120rpx); }
  }
  
  @keyframes icon-float-3 {
      0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1) translateZ(120rpx); }
      33% { transform: translate(-10rpx, 10rpx) rotate(-6deg) scale(1.02) translateZ(120rpx); }
       66% { transform: translate(8rpx, -8rpx) rotate(4deg) scale(0.97) translateZ(120rpx); }
     }

     @keyframes icon-float-4 {
       0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1) translateZ(120rpx); }
       33% { transform: translate(8rpx, -10rpx) rotate(15deg) scale(1.1) translateZ(120rpx); }
       66% { transform: translate(-6rpx, 8rpx) rotate(-10deg) scale(0.9) translateZ(120rpx); }
     }
   
     @keyframes card-shine {
  0% { left: -150%; }
  30%, 100% { left: 150%; }
}

@keyframes beam-rotate {
  0%, 100% { transform: rotate(0deg); opacity: 0.6; }
  50% { transform: rotate(5deg); opacity: 0.9; }
}

@keyframes flare-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.15); }
}

@keyframes flare-float {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
  50% { transform: translate(-40rpx, 40rpx) scale(1.1); opacity: 0.8; }
}

@keyframes breathing {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.03); /* 轻微放大 */
    opacity: 0.94; /* 轻微透明度变化 */
  }
}

.content {
  padding: 0 30rpx;
  position: relative;
  z-index: 10;
}
</style>
