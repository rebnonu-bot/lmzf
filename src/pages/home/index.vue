<template>
  <view class="page-container">
    <!-- 顶部定位组件 -->
    <LocationHeader />
    
    <!-- 顶部渐变背景 (向下凸出的外弧) -->
    <view class="header-container">
      <view class="header-bg"></view>
      <!-- 阳光散光效果层 -->
      <view class="sunlight-glow"></view>
      <view class="sunlight-beam"></view>
      <view class="sunlight-flare"></view>
    </view>
    
    <!-- 顶部核心内容区域 (积分+装饰) -->
    <view class="header-content-wrapper">
      <view class="points-display">
        <view class="points-info">
          <text class="points-slogan">你家物业费邻檬帮你减</text>
          <view class="points-label-row">
            <text class="points-label">当前数字积分</text>
            <view class="points-help-icon">?</view>
          </view>
          <text class="points-value">{{ displayPoints }}</text>
          <view class="points-action-row">
            <view class="points-hint-tag">
              <text class="points-hint-text">可抵 {{ displayAmount }} 元</text>
            </view>
            <view class="go-deduct-btn">
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

    <!-- 登录状态引导/信息模块 -->
    <view class="user-info-module-wrapper">
      <!-- 未登录状态 -->
      <view v-if="!isLoggedIn" class="login-prompt-card">
        <view class="user-section">
          <view class="avatar-wrapper">
            <image class="avatar" src="/static/avatar1.png" mode="aspectFill" />
          </view>
          <view class="text-content">
            <text class="user-title">尊敬的用户</text>
            <text class="user-subtitle">登录成为推广者实现税后收入</text>
          </view>
        </view>
        <view class="auth-btn" @tap="handleLogin">
          <text>授权登录</text>
        </view>
      </view>

      <!-- 已登录状态 -->
      <view v-else class="logged-in-card">
        <view class="user-main-info">
          <view class="left-section">
            <image class="user-avatar" :src="userInfo.avatar" mode="aspectFill" />
            <view class="name-level-section">
              <view class="name-row">
                  <text class="nickname">{{ userInfo.nickname }}</text>
                  <text 
                    class="level-badge" 
                    :style="{ background: currentLevel.bg, color: currentLevel.color }"
                  >
                    {{ currentLevel.name }}
                  </text>
                </view>
                <!-- 成就标签优化：数字高亮，整体更轻量 -->
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
            <view class="stat-item">
              <text class="stat-value">{{ userInfo.coins }}</text>
              <text class="stat-label">{{ userInfo.coinLabel }}</text>
            </view>
            <view class="stat-item">
              <text class="stat-value">{{ userInfo.coupons }}</text>
              <text class="stat-label">优惠券</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 自定义底部导航 -->
    <CustomTabBar :active="activeTab" />
  </view>
</template>

<script setup lang="ts">
import CustomTabBar from '@/components/CustomTabBar.vue';
import LocationHeader from '@/components/LocationHeader.vue';

import { onShow } from '@dcloudio/uni-app';
import { ref, onMounted, computed } from 'vue';

const activeTab = ref<'home' | 'my'>('home');
const displayPoints = ref(0);
const targetPoints = 2580;
const isLoggedIn = ref(true); // 切换为已登录状态进行展示

// 模拟用户信息
const userInfo = ref({
    nickname: '梅菜扣肉',
    avatar: '/static/avatar1.png',
    level: 'gold', // copper: 铜牌, silver: 银牌, gold: 金牌
    coins: 1250,
    coinLabel: '柠檬币',
    coupons: 3,
    joinDays: 12,
    inviteCount: 8
  });

  // 等级配置
  const levelConfig = {
    copper: {
      name: '铜牌推广者',
      bg: 'linear-gradient(135deg, #A16207, #78350F)',
      color: '#FEF3C7',
      tagColor: '#A16207'
    },
    silver: {
      name: '银牌推广者',
      bg: 'linear-gradient(135deg, #64748B, #334155)',
      color: '#F1F5F9',
      tagColor: '#64748B'
    },
    gold: {
      name: '金牌推广者',
      bg: 'linear-gradient(135deg, #F59E0B, #D97706)',
      color: '#FFFBEB',
      tagColor: '#D97706'
    }
  };

  const currentLevel = computed(() => levelConfig[userInfo.value.level] || levelConfig.copper);

// 计算抵扣金额动画
const displayAmount = computed(() => {
  return (displayPoints.value / 100).toFixed(2);
});

const animatePoints = () => {
  const duration = 1500; // 动画持续时间 1.5 秒
  const startTime = Date.now();
  
  const update = () => {
    const now = Date.now();
    const progress = Math.min((now - startTime) / duration, 1);
    
    // 使用 easeOutExpo 缓动函数让动画更自然
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };
    
    displayPoints.value = Math.floor(easeOutExpo(progress) * targetPoints);
    
    if (progress < 1) {
      setTimeout(update, 16); // 模拟 60fps
    }
  };
  
  update();
};

const handleLogin = () => {
  uni.navigateTo({
    url: '/pages/login/login'
  });
};

onMounted(() => {
  animatePoints();
});

onShow(() => {
  activeTab.value = 'home';
  uni.hideTabBar();
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  height: 100vh;
  background-color: #F4F9FF;
  position: relative;
  overflow-y: auto; /* 允许纵向滚动以容纳新模块 */
  padding-bottom: 120rpx; /* 为底部 TabBar 留出空间 */
}

.header-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 384rpx; /* H5 默认高度 */
  /* #ifdef MP-WEIXIN */
  height: 480rpx; /* 稍微缩短一点，保持紧凑 */
  /* #endif */
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
}

.header-content-wrapper {
  position: absolute;
  top: 170rpx; /* 小程序默认高度 */
  /* #ifndef MP-WEIXIN */
  top: 100rpx; /* H5 稍微下移一点点 */
  /* #endif */
  left: 32rpx;
  right: 32rpx;
  z-index: 10;
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
    position: relative;
    display: flex;
    align-items: center;
    background: transparent;
    padding: 0;
    border-radius: 0;
    border: none;
    box-shadow: none;
    margin-right: 0;
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
          align-self: flex-start; /* 确保容器只包裹文字宽度 */
  
          .points-label {
            font-size: 24rpx;
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 1rpx;
          }
  
          .points-help-icon {
             position: absolute;
             top: -6rpx; /* 向上移动，形成上标感 */
             right: -30rpx; /* 略微调整间距以适应外框 */
             width: 24rpx;
             height: 24rpx;
             border-radius: 50%;
             background: #FF9D5C; /* 实心橙色背景 */
             border: 2rpx solid #ffffff; /* 添加白色外框 */
             display: flex;
             align-items: center;
             justify-content: center;
             font-size: 16rpx;
             color: #ffffff; /* 白色问号 */
             font-weight: bold;
             box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15); /* 加深阴影使外框更突出 */
             transition: all 0.2s;
             box-sizing: border-box; /* 确保边框不增加实际尺寸 */
             
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
      }

      .points-action-row {
        display: flex;
        align-items: center;
        gap: 16rpx;

        .points-hint-tag {
          background: rgba(34, 197, 94, 0.9);
          padding: 6rpx 20rpx;
          border-radius: 10rpx;
          box-shadow: 0 4rpx 12rpx rgba(34, 197, 94, 0.2);

          .points-hint-text {
            font-size: 24rpx;
            color: #ffffff;
            font-weight: 700;
            white-space: nowrap;
          }
        }

        .go-deduct-btn {
          display: flex;
          align-items: center;
          gap: 4rpx;
          background: #FF9D5C; /* 改为实心橙色，与问号角标呼应 */
          padding: 6rpx 20rpx;
          border-radius: 10rpx;
          box-shadow: 0 4rpx 12rpx rgba(255, 157, 92, 0.3);
          transition: all 0.2s;

          text {
            font-size: 22rpx;
            color: #ffffff;
            font-weight: 800;
          }

          :deep(.t-icon) {
            color: #ffffff !important;
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
    margin-right: 20rpx;
    z-index: 2;
    perspective: 1500rpx;

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
        top: -1.25rem;
        left: 0.125rem;
        background: linear-gradient(135deg, #7FDBFF, #0074D9);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-1 6.5s ease-in-out infinite;
      }

      &.wechat {
        top: -0.875rem;
        right: 0.375rem;
        background: linear-gradient(135deg, #A8E6CF, #56AB2F);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-2 7.5s ease-in-out infinite;
      }

      &.security {
        bottom: -0.2rem;
        left: -1rem;
        background: linear-gradient(135deg, #FFD3B6, #FF8C00);
        opacity: 0.95;
        border: 3rpx solid rgba(255, 255, 255, 0.6);
        transform: translateZ(120rpx);
        z-index: 20;
        animation: icon-float-3 9.5s ease-in-out infinite;
      }

      &.miniprogram {
        bottom: 0.125rem;
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

.user-info-module-wrapper {
  position: absolute;
  /* #ifdef MP-WEIXIN */
  top: 500rpx; /* 小程序端：从 520rpx 减小到 500rpx，缩小间距 */
  /* #endif */
  /* #ifndef MP-WEIXIN */
  top: 460rpx; /* H5/其他端：从 440rpx 增加到 460rpx，增大间距 */
  /* #endif */
  left: 32rpx;
  right: 32rpx;
  z-index: 10;
  padding-bottom: 40rpx; /* 底部间距 */
}

  .login-prompt-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(24rpx);
  -webkit-backdrop-filter: blur(24rpx);
  border-radius: 32rpx;
  padding: 32rpx 24rpx; /* 稍微减小内边距，争取更多横向空间 */
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 
    0 10rpx 40rpx rgba(0, 0, 0, 0.04),
    inset 0 0 0 1rpx rgba(255, 255, 255, 0.4);
  border: none;

  .user-section {
    display: flex;
    align-items: center;
    gap: 20rpx; /* 减小头像与文字间距 */
    flex: 1;
    min-width: 0; /* 允许子元素在必要时收缩，配合 nowrap */

    .avatar-wrapper {
      flex-shrink: 0; /* 头像不收缩 */
      width: 90rpx; /* 稍微缩小头像 */
      height: 90rpx;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 4rpx solid #ffffff;
      box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);

      .avatar {
        width: 80%; /* 头像图片稍微缩小，露出白色背景感 */
        height: 80%;
        opacity: 0.5; /* 未登录状态头像半透明 */
        filter: grayscale(100%); /* 未登录状态灰度 */
      }
    }

    .text-content {
      display: flex;
      flex-direction: column;
      gap: 10rpx;

      .user-title {
        font-size: 34rpx; /* 增大标题 */
        color: #1E293B;
        font-weight: 800;
        letter-spacing: 1rpx;
        white-space: nowrap; /* 防止标题换行 */
      }

      .user-subtitle {
        font-size: 24rpx;
        color: #64748B;
        font-weight: 500;
        line-height: 1.4;
        white-space: nowrap; /* 防止副标题换行 */
      }
    }
  }

  .auth-btn {
    flex-shrink: 0; /* 确保按钮不收缩 */
    background: linear-gradient(135deg, #F59E0B, #FBBF24); /* 柠檬橙渐变，呼应主题 */
    padding: 16rpx 36rpx;
    border-radius: 40rpx;
    box-shadow: 0 8rpx 20rpx rgba(245, 158, 11, 0.2);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1rpx solid rgba(255, 255, 255, 0.2);

    text {
      color: #ffffff;
      font-size: 26rpx;
      font-weight: 800;
      letter-spacing: 1rpx;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    }

    &:active {
      transform: scale(0.94) translateY(2rpx);
      box-shadow: 0 4rpx 10rpx rgba(245, 158, 11, 0.15);
      filter: brightness(1.05);
    }
  }
}

  .logged-in-card {
  background: rgba(255, 255, 255, 0.7); /* 略微增加透明度 */
  backdrop-filter: blur(24rpx); /* 增强模糊 */
  -webkit-backdrop-filter: blur(24rpx);
  border-radius: 32rpx;
  box-shadow: 
    0 10rpx 40rpx rgba(0, 0, 0, 0.04),
    inset 0 0 0 1rpx rgba(255, 255, 255, 0.4); /* 内部柔和边框 */
  border: none; /* 使用内阴影代替边框更显精致 */
  overflow: hidden;

  .user-main-info {
    padding: 32rpx 28rpx; /* 稍微减小内边距，释放横向空间 */
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left-section {
      display: flex;
      align-items: center;
      gap: 20rpx; /* 减小头像与文字的间距 */
      flex: 1;
      min-width: 0; /* 允许内部元素缩放 */

      .user-avatar {
        flex-shrink: 0; /* 头像不收缩 */
        width: 100rpx; /* 稍微缩小头像 */
        height: 100rpx;
        border-radius: 50%;
        border: 4rpx solid #ffffff;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.08);
      }

      .name-level-section {
        display: flex;
        flex-direction: column;
        gap: 8rpx; /* 减小行间距 */
        flex: 1;
        min-width: 0;

        .name-row {
          display: flex;
          align-items: center;
          gap: 12rpx;
          white-space: nowrap; /* 昵称行也不换行 */

          .nickname {
            font-size: 32rpx; /* 微调昵称大小 */
            font-weight: 800;
            color: #1E293B;
            letter-spacing: 0.5rpx;
            overflow: hidden;
            text-overflow: ellipsis; /* 昵称过长时显示省略号 */
          }

          .level-badge {
            padding: 4rpx 16rpx;
            border-radius: 20rpx;
            font-size: 18rpx;
            font-weight: 700;
            line-height: 1.4;
            box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.1);
            white-space: nowrap;
          }
        }

        .achievement-tags {
          display: flex;
          align-items: center;
          margin-top: 8rpx;
          white-space: nowrap;
          width: 100%;
          overflow: hidden;

          .tag-item {
            display: flex;
            align-items: center;
            font-size: 22rpx;
            line-height: 1;
            flex-shrink: 0;

            .label {
              color: #64748B; /* 中性灰色，用于描述文字 */
              font-weight: 500;
            }

            .value {
              font-weight: 500; /* 统一字重，不额外加粗 */
              margin: 0 4rpx; /* 数字与文字间距 */
              font-family: 'DIN Alternate', -apple-system, sans-serif;
            }
          }

          .tag-divider {
            font-size: 16rpx; /* 竖线通常比点高，稍微缩小字号 */
            color: #CBD5E1;
            margin: 0 10rpx;
            flex-shrink: 0;
            opacity: 0.6; /* 降低竖线的视觉强度 */
          }
        }
      }
    }

    .right-stats {
      display: flex;
      gap: 40rpx;

      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6rpx;

        .stat-value {
              font-size: 38rpx;
              font-weight: 900;
              color: #1E293B;
              font-family: 'DIN Alternate', -apple-system, sans-serif;
            }

        .stat-label {
          font-size: 22rpx;
          color: #64748B; /* 灰石板色 */
          font-weight: 500;
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
    transform: scale(1.03);
    opacity: 0.94;
  }
}

.content {
  padding: 0 30rpx;
  position: relative;
  z-index: 10;
}
</style>
