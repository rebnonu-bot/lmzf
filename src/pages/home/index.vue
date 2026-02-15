<template>
  <scroll-view class="page-container" scroll-y scroll-with-animation @scroll="onScroll">
    <!-- 骨架屏加载 -->
    <PageSkeleton v-if="loading" />
    
    <template v-else>
      <!-- 顶部定位组件 -->
      <LocationHeader />
      
      <!-- 顶部渐变背景 (向下凸出的外弧) -->
      <view class="header-bg-container">
        <view class="header-bg"></view>
        <!-- 阳光散光效果层 -->
        <view class="sunlight-glow"></view>
        <view class="sunlight-beam"></view>
        <view class="sunlight-flare"></view>
      </view>
      
      <!-- 主内容区域：包含积分卡片、用户信息卡片及后续模块 -->
      <view class="main-content">
      <!-- 积分卡片 -->
      <view class="points-card">
        <view class="points-display">
          <view class="points-info">
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

      <!-- 用户信息卡片 -->
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
      
      <!-- 邀请返利模块 -->
      <view class="invite-card">
        <view class="invite-content">
          <view class="invite-badge">
            <text class="badge-icon">⚡</text>
            <text class="badge-text">LIMITED OFFER</text>
          </view>
          <view class="invite-title">邀请邻居，永久返利</view>
          <view class="invite-desc">新用户首单后，您将永久获得其订单2%的积分奖励。</view>
        </view>
        <view class="invite-btn" @tap="handleInvite">
          <text>立即邀请</text>
          <t-icon name="chevron-right" size="28rpx" color="#ffffff" />
        </view>
      </view>

      <!-- 赚积分模块 -->
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
            <view class="card-bg-icon">
              <t-icon name="shop" size="80rpx" color="rgba(59, 130, 246, 0.15)" />
            </view>
            <view class="earn-icon-wrapper">
              <view class="earn-icon">
                <t-icon name="shop" size="40rpx" color="#3B82F6" />
              </view>
            </view>
            <view class="earn-info">
              <text class="earn-title">线下消费</text>
              <text class="earn-desc">到店付款 即得积分</text>
            </view>
            <view class="earn-arrow">
              <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
            </view>
          </view>
          
          <!-- 线上CPS -->
          <view class="earn-card online" @tap="handleOnline">
            <view class="card-bg-icon">
              <t-icon name="internet" size="80rpx" color="rgba(245, 158, 11, 0.15)" />
            </view>
            <view class="earn-icon-wrapper">
              <view class="earn-icon orange">
                <t-icon name="internet" size="40rpx" color="#F59E0B" />
              </view>
            </view>
            <view class="earn-info">
              <text class="earn-title">线上购物</text>
              <text class="earn-desc">主流平台 返利积分</text>
            </view>
            <view class="earn-arrow">
              <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
            </view>
          </view>
        </view>
        
        </view>

      <!-- 合作伙伴模块 -->
      <view class="partners-section">
        <view class="section-header">
          <view class="header-left">
            <view class="header-icon">
              <t-icon name="heart" size="36rpx" color="#10B981" />
            </view>
            <text class="section-title">合作伙伴</text>
          </view>
          <text class="section-subtitle">安全可信赖</text>
        </view>
        
        <!-- 合作伙伴列表 -->
        <view class="partners-row">
          <!-- 邻檬智家 -->
          <view class="partner-item" @tap="showPartnerDetail('lmzj')">
            <view class="partner-logo-large">
              <image src="/static/logo-lmzj.png" mode="aspectFit" />
            </view>
            <text class="partner-item-name">邻檬智家</text>
            <text class="partner-item-tag brand">品牌方</text>
          </view>
          
          <!-- 通联支付 -->
          <view class="partner-item" @tap="showPartnerDetail('allinpay')">
            <view class="partner-logo-large">
              <image src="/static/logo-allinpay.png" mode="aspectFit" />
            </view>
            <text class="partner-item-name">通联支付</text>
            <text class="partner-item-tag pay">支付通道</text>
          </view>
          
          <!-- 邮储银行 -->
          <view class="partner-item" @tap="showPartnerDetail('psbc')">
            <view class="partner-logo-large">
              <image src="/static/logo-psbc.png" mode="aspectFit" />
            </view>
            <text class="partner-item-name">邮储银行</text>
            <text class="partner-item-tag bank">资金托管</text>
          </view>
        </view>
        
        <!-- 合作保障说明 -->
        <view class="partners-guarantee">
          <view class="guarantee-item">
            <view class="guarantee-icon">
              <t-icon name="secured" size="28rpx" color="#10B981" />
            </view>
            <text class="guarantee-text">资金银行托管</text>
          </view>
          <view class="guarantee-divider"></view>
          <view class="guarantee-item">
            <view class="guarantee-icon">
              <t-icon name="check-circle" size="28rpx" color="#3B82F6" />
            </view>
            <text class="guarantee-text">央行支付牌照</text>
          </view>
          <view class="guarantee-divider"></view>
          <view class="guarantee-item">
            <view class="guarantee-icon">
              <t-icon name="lock-on" size="28rpx" color="#F59E0B" />
            </view>
            <text class="guarantee-text">数据安全加密</text>
          </view>
        </view>
      </view>
      
      <!-- 联系我们模块 -->
      <view class="contact-section">
        <view class="section-header">
          <view class="header-left">
            <view class="header-icon">
              <t-icon name="chat" size="36rpx" color="#3B82F6" />
            </view>
            <text class="section-title">联系我们</text>
          </view>
          <text class="section-subtitle">随时为您服务</text>
        </view>
        
        <view class="contact-cards">
          <!-- 客服微信 -->
          <view class="contact-card-wechat" @tap="copyWechat">
            <view class="wechat-icon-wrapper">
              <t-icon name="chat" size="40rpx" color="#07C160" />
            </view>
            <view class="wechat-info">
              <text class="wechat-label">客服微信</text>
              <text class="wechat-value">lingmeng2024</text>
            </view>
            <view class="wechat-action">
              <text>复制</text>
            </view>
          </view>
          
          <!-- 工作时间 -->
          <view class="contact-card-time">
            <view class="time-icon-wrapper">
              <t-icon name="time" size="40rpx" color="#F59E0B" />
            </view>
            <view class="time-info">
              <text class="time-label">工作时间</text>
              <text class="time-value">周一至周日 9:00-21:00</text>
            </view>
            <view class="time-badge">全年无休</view>
          </view>
        </view>
      </view>
      
      <!-- 页脚 -->
      <view class="page-footer">
        <view class="footer-divider">
          <view class="divider-line"></view>
          <view class="divider-dot"></view>
          <view class="divider-line"></view>
        </view>
        <view class="footer-content">
          <text class="footer-brand">邻檬智付</text>
          <text class="footer-slogan">让天下没有难收的物业费</text>
        </view>
        <view class="footer-links">
          <text class="footer-link">用户协议</text>
          <text class="footer-divider-text">|</text>
          <text class="footer-link">隐私政策</text>
          <text class="footer-divider-text">|</text>
          <text class="footer-link">联系我们</text>
        </view>
        <view class="footer-copyright">
          <text>© 2026 邻檬智家 版权所有</text>
        </view>
      </view>
      </view>
    </template>
    
    <!-- 自定义底部导航 -->
    <CustomTabBar :active="activeTab" v-if="!loading" />
  </scroll-view>
</template>

<script setup lang="ts">
import CustomTabBar from '@/components/CustomTabBar.vue';
import LocationHeader from '@/components/LocationHeader.vue';
import PageSkeleton from '@/components/PageSkeleton.vue';

import { onShow, onPullDownRefresh } from '@dcloudio/uni-app';
import { ref, onMounted, computed } from 'vue';
import { homeMockData } from '@/config/mock.config';
import type { UserLevel } from '@/types/api.d';

// 加载状态
const loading = ref(true);
const pageLoaded = ref(false);

// 页面滚动
const onScroll = (e: any) => {
  // 可以在这里处理滚动事件，如加载更多等
};

const activeTab = ref<'home' | 'my'>('home');
const displayPoints = ref(0);
const targetPoints = homeMockData.targetPoints;

// 模拟用户信息
const userInfo = ref({
    nickname: homeMockData.userInfo.nickname!,
    avatar: homeMockData.userInfo.avatar!,
    level: homeMockData.userInfo.level as UserLevel,
    coins: homeMockData.userInfo.coins!,
    coinLabel: homeMockData.userInfo.coinLabel!,
    coupons: homeMockData.userInfo.coupons!,
    joinDays: homeMockData.userInfo.joinDays!,
    inviteCount: homeMockData.userInfo.inviteCount!
  });

  // 等级配置
  const levelConfig = homeMockData.levelConfig;

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

const handleInvite = () => {
  uni.navigateTo({ url: '/package-invite/pages/invite/poster' });
};

const handleOffline = () => {
  uni.navigateTo({ url: '/package-store/pages/stores/index' });
};

const handleOnline = () => {
  uni.navigateTo({ url: '/package-platform/pages/platforms/index' });
};

// 复制客服微信
const copyWechat = () => {
  uni.setClipboardData({
    data: homeMockData.contact.wechat,
    success: () => {
      uni.showToast({
        title: '微信号已复制',
        icon: 'success'
      });
    }
  });
};

// 拨打客服电话
const makePhoneCall = () => {
  uni.makePhoneCall({
    phoneNumber: '400-888-8888',
    success: () => {
      console.log('拨打电话成功');
    },
    fail: () => {
      console.log('拨打电话失败或取消');
    }
  });
};

// 显示合作伙伴详情
const showPartnerDetail = (partner: keyof typeof homeMockData.partners) => {
  const info = homeMockData.partners[partner];
  if (info) {
    uni.showModal({
      title: info.name,
      content: info.desc,
      showCancel: false,
      confirmText: '知道了'
    });
  }
};

onMounted(() => {
  // 模拟页面加载
  setTimeout(() => {
    loading.value = false;
    pageLoaded.value = true;
    animatePoints();
  }, 800);
});

onShow(() => {
  activeTab.value = 'home';
  uni.hideTabBar();
});

// 下拉刷新
onPullDownRefresh(() => {
  // 重置并重新播放积分动画
  displayPoints.value = 0;
  animatePoints();
  
  // 模拟数据刷新
  setTimeout(() => {
    uni.stopPullDownRefresh();
    uni.showToast({
      title: '刷新成功',
      icon: 'success',
      duration: 800
    });
  }, 800);
});
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.page-container {
  height: 100vh; /* scroll-view 需要固定高度 */
  background-color: #F4F9FF;
}

/* 顶部渐变背景 */
.header-bg-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14.25rem;
  z-index: 0;
  overflow: hidden;
  pointer-events: none; /* 允许点击穿透到下层 */

  .header-bg {
    position: absolute;
    top: 0;
    left: -30%;
    width: 160%;
    height: 100%;
    background: linear-gradient(180deg, #3B82F6, #60A5FA 70%, #F4F9FF);
    border-radius: 0;
    animation: breathing 8s ease-in-out infinite;
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

/* 主内容区域：统一绝对定位，内部使用 margin 控制间距 */
.main-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 48rpx; /* 增大模块间距 */
  padding: 0 32rpx;
  padding-bottom: 60rpx; /* 底部补充间距 */
  
  /* #ifdef MP-WEIXIN */
  padding-top: 160rpx; /* 小程序端导航栏较高，包含状态栏 */
  /* #endif */
  /* #ifndef MP-WEIXIN */
  padding-top: 120rpx; /* H5 端导航栏高度 */
  /* #endif */
}

/* 积分卡片 */
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
        top: -2rem;
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

/* 用户信息卡片 */
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

    /* 装饰性渐变 */
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
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1;

      .left-section {
        display: flex;
        align-items: center;
        gap: 24rpx;
        flex: 1;
        min-width: 0;

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
          gap: 10rpx;
          flex: 1;
          min-width: 0;

          .name-row {
            display: flex;
            align-items: center;
            min-width: 0;
            margin-bottom: 4rpx;

            .nickname-wrapper {
              position: relative;
              display: inline-flex;
              align-items: center;
              max-width: 100%;

              .nickname {
                font-size: 30rpx;
                font-weight: 800;
                color: #1E293B;
                letter-spacing: 0.5rpx;
                max-width: 220rpx;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-right: 8rpx;
              }

              .level-badge {
                position: absolute;
                top: -8rpx;
                left: calc(100% - 4rpx);
                padding: 3rpx 10rpx;
                border-radius: 10rpx;
                font-size: 16rpx;
                font-weight: 700;
                line-height: 1.2;
                box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.12);
                white-space: nowrap;
                border: 1rpx solid rgba(255, 255, 255, 0.4);
                transform: scale(0.85);
                transform-origin: left center;
              }
            }
          }

          .achievement-tags {
            display: flex;
            align-items: center;
            white-space: nowrap;
            overflow: hidden;
            background: rgba(241, 245, 249, 0.6);
            border-radius: 16rpx;
            padding: 6rpx 12rpx;
            width: fit-content;
            max-width: 100%;

            .tag-item {
              display: flex;
              align-items: center;
              font-size: 20rpx;
              line-height: 1;
              flex-shrink: 0;

              .label {
                color: #94A3B8;
                font-weight: 500;
              }

              .value {
                font-weight: 700;
                margin: 0 4rpx;
                font-family: 'DIN Alternate', -apple-system, sans-serif;
              }
            }

            .tag-divider {
              font-size: 12rpx;
              color: #CBD5E1;
              margin: 0 10rpx;
              flex-shrink: 0;
            }
          }
        }
      }

      .right-stats {
        display: flex;
        gap: 24rpx;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 20rpx;
        padding: 14rpx 20rpx;
        border: 1rpx solid rgba(255, 255, 255, 0.5);
        flex-shrink: 0;

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rpx;
          min-width: 70rpx;

          .stat-value {
            font-size: 40rpx;
            font-weight: 800;
            color: #1E293B;
            font-family: 'DIN Alternate', -apple-system, sans-serif;
          }

          .stat-label {
            font-size: 22rpx;
            color: #64748B;
            font-weight: 500;
          }
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

/* 邀请返利模块 */
.invite-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(24rpx);
  -webkit-backdrop-filter: blur(24rpx);
  border-radius: 32rpx;
  padding: 32rpx;
  box-shadow: 
    0 10rpx 40rpx rgba(0, 0, 0, 0.04),
    inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
  position: relative;
  overflow: hidden;
  border: none;

  /* 装饰性渐变背景 */
  &::before {
    content: '';
    position: absolute;
    right: -40rpx;
    top: -40rpx;
    width: 180rpx;
    height: 180rpx;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    left: -20rpx;
    bottom: -20rpx;
    width: 100rpx;
    height: 100rpx;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%);
    border-radius: 50%;
  }

  .invite-content {
    flex: 1;
    position: relative;
    z-index: 1;

    .invite-badge {
      display: inline-flex;
      align-items: center;
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(37, 99, 235, 0.08));
      border-radius: 24rpx;
      padding: 8rpx 18rpx;
      margin-bottom: 16rpx;
      border: 1rpx solid rgba(59, 130, 246, 0.15);

      .badge-icon {
        font-size: 20rpx;
        margin-right: 8rpx;
      }

      .badge-text {
        font-size: 20rpx;
        font-weight: 700;
        color: #2563EB;
        letter-spacing: 1rpx;
      }
    }

    .invite-title {
      font-size: 32rpx;
      font-weight: 800;
      color: #1E293B;
      margin-bottom: 10rpx;
      line-height: 1.3;
      letter-spacing: 0.5rpx;
    }

    .invite-desc {
      font-size: 24rpx;
      color: #64748B;
      line-height: 1.5;
      font-weight: 500;
    }
  }

  .invite-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%);
    border-radius: 40rpx;
    padding: 18rpx 28rpx;
    margin-left: 24rpx;
    box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.35);
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    border: 1rpx solid rgba(255, 255, 255, 0.3);
    /* 呼吸动画 */
    animation: invite-breathing 2.5s ease-in-out infinite;

    &:active {
      transform: scale(0.96);
      box-shadow: 0 4rpx 16rpx rgba(59, 130, 246, 0.25);
      animation: none;
    }

    text {
      font-size: 26rpx;
      font-weight: 600;
      color: #ffffff;
      margin-right: 4rpx;
      text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
    }
  }
}

/* 立即邀请按钮呼吸动画 */
@keyframes invite-breathing {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.35);
  }
  50% {
    transform: scale(1.03);
    box-shadow: 0 12rpx 32rpx rgba(59, 130, 246, 0.5);
  }
}

/* 合作伙伴模块 */
.partners-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    padding: 0 8rpx;

    .header-left {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .header-icon {
        width: 56rpx;
        height: 56rpx;
        background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(16, 185, 129, 0.15);
      }

      .section-title {
        font-size: 32rpx;
        font-weight: 800;
        color: #1E293B;
        letter-spacing: 0.5rpx;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #94A3B8;
      font-weight: 500;
    }
  }

  /* 合作伙伴三列布局 */
  .partners-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
    margin-bottom: 24rpx;

    .partner-item {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(24rpx);
      -webkit-backdrop-filter: blur(24rpx);
      border-radius: 28rpx;
      padding: 20rpx 12rpx;
      box-shadow: 
        0 8rpx 32rpx rgba(0, 0, 0, 0.04),
        inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.95);
      }

      .partner-logo-large {
        width: 160rpx;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 12rpx;
        
        image {
          width: 100%;
          height: 100%;
        }
      }

      .partner-item-name {
        font-size: 24rpx;
        font-weight: 700;
        color: #1E293B;
        text-align: center;
        margin-bottom: 8rpx;
      }

      .partner-item-tag {
        font-size: 18rpx;
        font-weight: 500;
        padding: 4rpx 12rpx;
        border-radius: 16rpx;

        &.brand {
          color: #3B82F6;
          background: rgba(59, 130, 246, 0.12);
        }

        &.pay {
          color: #F59E0B;
          background: rgba(245, 158, 11, 0.12);
        }

        &.bank {
          color: #10B981;
          background: rgba(16, 185, 129, 0.12);
        }
      }
    }
  }

  /* 合作保障 */
  .partners-guarantee {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(24rpx);
    border-radius: 24rpx;
    padding: 24rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);

    .guarantee-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12rpx;

      .guarantee-icon {
        width: 56rpx;
        height: 56rpx;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(0, 0, 0, 0.06);
      }

      .guarantee-text {
        font-size: 20rpx;
        color: #64748B;
        font-weight: 500;
      }
    }

    .guarantee-divider {
      width: 1rpx;
      height: 60rpx;
      background: rgba(0, 0, 0, 0.08);
    }
  }
}

/* 页脚 */
/* 联系我们模块 */
/* 联系我们模块 */
.contact-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    padding: 0 8rpx;

    .header-left {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .header-icon {
        width: 56rpx;
        height: 56rpx;
        background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.15);
      }

      .section-title {
        font-size: 32rpx;
        font-weight: 800;
        color: #1E293B;
        letter-spacing: 0.5rpx;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #94A3B8;
      font-weight: 500;
    }
  }

  .contact-cards {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    /* 微信卡片 */
    .contact-card-wechat {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(24rpx);
      border-radius: 28rpx;
      padding: 32rpx;
      box-shadow: 
        0 8rpx 32rpx rgba(0, 0, 0, 0.04),
        inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      gap: 24rpx;
      transition: all 0.2s ease;

      &:active {
        transform: scale(0.98);
        background: rgba(255, 255, 255, 0.9);
      }

      .wechat-icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        background: rgba(7, 193, 96, 0.1);
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .wechat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .wechat-label {
          font-size: 24rpx;
          color: #94A3B8;
          font-weight: 500;
        }

        .wechat-value {
          font-size: 32rpx;
          font-weight: 700;
          color: #1E293B;
          letter-spacing: 1rpx;
        }
      }

      .wechat-action {
        padding: 12rpx 24rpx;
        background: rgba(7, 193, 96, 0.1);
        border-radius: 24rpx;

        text {
          font-size: 24rpx;
          color: #07C160;
          font-weight: 600;
        }
      }
    }

    /* 工作时间卡片 */
    .contact-card-time {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(24rpx);
      border-radius: 28rpx;
      padding: 32rpx;
      box-shadow: 
        0 8rpx 32rpx rgba(0, 0, 0, 0.04),
        inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      gap: 24rpx;

      .time-icon-wrapper {
        width: 80rpx;
        height: 80rpx;
        background: rgba(245, 158, 11, 0.1);
        border-radius: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .time-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        .time-label {
          font-size: 24rpx;
          color: #94A3B8;
          font-weight: 500;
        }

        .time-value {
          font-size: 28rpx;
          font-weight: 600;
          color: #1E293B;
        }
      }

      .time-badge {
        padding: 8rpx 16rpx;
        background: rgba(245, 158, 11, 0.1);
        border-radius: 20rpx;
        font-size: 20rpx;
        color: #F59E0B;
        font-weight: 600;
        flex-shrink: 0;
      }
    }
  }
}

.page-footer {
  padding: 40rpx 0 200rpx; /* 底部 200rpx 防止被 TabBar 挡住（TabBar 100rpx + 安全区）*/
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20rpx;

  .footer-divider {
    display: flex;
    align-items: center;
    gap: 16rpx;
    margin-bottom: 10rpx;

    .divider-line {
      width: 80rpx;
      height: 2rpx;
      background: linear-gradient(90deg, transparent, #CBD5E1, transparent);
    }

    .divider-dot {
      width: 8rpx;
      height: 8rpx;
      background: #CBD5E1;
      border-radius: 50%;
    }
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;

    .footer-brand {
      font-size: 32rpx;
      font-weight: 800;
      color: #1E293B;
      letter-spacing: 2rpx;
    }

    .footer-slogan {
      font-size: 24rpx;
      color: #64748B;
      font-weight: 500;
    }
  }

  .footer-links {
    display: flex;
    align-items: center;
    gap: 24rpx;
    margin-top: 10rpx;

    .footer-link {
      font-size: 22rpx;
      color: #64748B;
      font-weight: 500;
      transition: color 0.2s;

      &:active {
        color: #3B82F6;
      }
    }

    .footer-divider-text {
      font-size: 20rpx;
      color: #CBD5E1;
    }
  }

  .footer-copyright {
    margin-top: 10rpx;
    
    text {
      font-size: 20rpx;
      color: #94A3B8;
      font-weight: 500;
    }
  }
}

/* 赚积分模块 */
.earn-points-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;
    padding: 0 8rpx;

    .header-left {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .header-icon {
        width: 56rpx;
        height: 56rpx;
        background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4rpx 12rpx rgba(59, 130, 246, 0.15);
      }

      .section-title {
        font-size: 32rpx;
        font-weight: 800;
        color: #1E293B;
        letter-spacing: 0.5rpx;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #94A3B8;
      font-weight: 500;
    }
  }

  .earn-methods {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24rpx;

    .earn-card {
      background: rgba(255, 255, 255, 0.75);
      backdrop-filter: blur(24rpx);
      -webkit-backdrop-filter: blur(24rpx);
      border-radius: 28rpx;
      padding: 28rpx;
      box-shadow: 
        0 8rpx 32rpx rgba(0, 0, 0, 0.04),
        inset 0 0 0 1rpx rgba(255, 255, 255, 0.5);
      position: relative;
      overflow: hidden;
      border: none;
      display: flex;
      flex-direction: column;
      gap: 16rpx;
      transition: all 0.3s ease;

      &:active {
        transform: scale(0.98);
      }

      /* 背景装饰图标 */
      .card-bg-icon {
        position: absolute;
        right: -10rpx;
        top: -10rpx;
        z-index: 0;
        opacity: 0.6;
      }

      .earn-icon-wrapper {
        position: relative;
        z-index: 1;

        .earn-icon {
          width: 72rpx;
          height: 72rpx;
          background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
          border-radius: 18rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4rpx 16rpx rgba(59, 130, 246, 0.2);

          &.orange {
            background: linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%);
            box-shadow: 0 4rpx 16rpx rgba(245, 158, 11, 0.2);
          }
        }
      }

      .earn-info {
        position: relative;
        z-index: 1;

        .earn-title {
          font-size: 30rpx;
          font-weight: 800;
          color: #1E293B;
          margin-bottom: 8rpx;
          display: block;
        }

        .earn-desc {
          font-size: 22rpx;
          color: #64748B;
          line-height: 1.4;
          display: block;
          font-weight: 500;
        }
      }

      .earn-arrow {
        position: absolute;
        right: 20rpx;
        top: 50%;
        transform: translateY(-50%);
        z-index: 1;
      }

      /* 线下卡片特殊样式 */
      &.offline {
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4rpx;
          background: linear-gradient(90deg, #3B82F6, transparent);
          border-radius: 0 0 28rpx 28rpx;
        }
      }

      /* 线上卡片特殊样式 */
      &.online {
        &::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 4rpx;
          background: linear-gradient(90deg, #F59E0B, transparent);
          border-radius: 0 0 28rpx 28rpx;
        }
      }
    }
  }

}
</style>
