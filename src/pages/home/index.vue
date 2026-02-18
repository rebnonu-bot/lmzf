<template>
  <scroll-view class="page-container" scroll-y scroll-with-animation @scroll="onScroll">
    <!-- 骨架屏加载 -->
    <PageSkeleton v-if="loading" />
    
    <template v-else>
      <!-- 顶部定位组件 -->
      <LocationHeader />
      
      <!-- 顶部渐变背景 -->
      <view class="header-bg-container">
        <view class="header-bg"></view>
        <view class="sunlight-glow"></view>
        <view class="sunlight-beam"></view>
        <view class="sunlight-flare"></view>
      </view>
      
      <!-- 主内容区域 -->
      <view class="main-content">
        <!-- 积分卡片 -->
        <PointsCard :display-points="displayPoints" />

        <!-- 用户信息卡片 -->
        <UserCard :user-info="userInfo" :level-config="levelConfig" />
        
        <!-- 邀请返利模块 -->
        <InviteCard @invite="handleInvite" />

        <!-- 赚积分模块 -->
        <EarnMethods @offline="handleOffline" @online="handleOnline" />

        <!-- 合作伙伴模块 -->
        <PartnersSection @detail="showPartnerDetail" />
        
        <!-- 联系我们模块 -->
        <ContactSection 
          :contact-info="contactInfo" 
          @copy-wechat="copyWechat" 
        />
        
        <!-- 页脚 -->
        <PageFooter />
      </view>
    </template>
    
    <!-- 自定义底部导航 -->
    <CustomTabBar :active="activeTab" v-if="!loading" />
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { onShow, onPullDownRefresh } from '@dcloudio/uni-app';
import type { UserInfo, UserLevel } from '@/types';
import type { ScrollEvent } from '@/types/global.d';

import CustomTabBar from '@/components/CustomTabBar.vue';
import LocationHeader from '@/components/LocationHeader.vue';
import PageSkeleton from '@/components/PageSkeleton.vue';
import PointsCard from './components/PointsCard.vue';
import UserCard from './components/UserCard.vue';
import InviteCard from './components/InviteCard.vue';
import EarnMethods from './components/EarnMethods.vue';
import PartnersSection from './components/PartnersSection.vue';
import ContactSection from './components/ContactSection.vue';
import PageFooter from './components/PageFooter.vue';

import { useClipboard } from '@/composables';
import { usePointsAnimation } from './composables/usePointsAnimation';
import { homeMockData } from '@/config/mock.config';
import { CONTACT } from '@/constants/app';

// 加载状态
const loading = ref(true);
const activeTab = ref<'home' | 'my'>('home');

// 使用组合式函数
const { copy: copyToClipboard } = useClipboard({ successMsg: '已复制到剪贴板' });

// 积分动画
const { displayPoints, animate: animatePoints, reset: resetPoints } = usePointsAnimation(
  homeMockData.targetPoints,
  { duration: 1500 }
);

// 联系信息
const contactInfo = CONTACT;

// 用户信息（直接使用 mock 数据）
const userInfo = ref<UserInfo>({
  id: homeMockData.userInfo.id,
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

// 页面滚动
const onScroll = (_e: ScrollEvent) => {
  // 预留：滚动加载更多等逻辑
};

// 导航处理
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
  copyToClipboard(contactInfo.wechat, '微信号已复制');
};

// 合作伙伴详情
const partnersInfo: Record<string, { name: string; desc: string }> = {
  lmzj: {
    name: '邻檬智家',
    desc: '邻檬智家是领先的社区生活服务平台，致力于通过数字化手段提升社区生活品质。'
  },
  allinpay: {
    name: '通联支付',
    desc: '通联支付网络服务股份有限公司是中国支付清算协会副会长单位，拥有全国性支付牌照。'
  },
  psbc: {
    name: '邮储银行',
    desc: '中国邮政储蓄银行是中国领先的大型零售商业银行，为邻檬智付提供资金托管服务。'
  }
};

const showPartnerDetail = (partner: string) => {
  const info = partnersInfo[partner];
  if (info) {
    uni.showModal({
      title: info.name,
      content: info.desc,
      showCancel: false,
      confirmText: '知道了'
    });
  }
};

// 生命周期
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    animatePoints();
  }, 800);
});

onShow(() => {
  activeTab.value = 'home';
  uni.hideTabBar();
});

// 下拉刷新
onPullDownRefresh(() => {
  resetPoints();
  animatePoints();
  
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
  height: 100vh;
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
  pointer-events: none;

  .header-bg {
    position: absolute;
    top: 0;
    left: -30%;
    width: 160%;
    height: 100%;
    background: linear-gradient(180deg, #3B82F6, #60A5FA 70%, #F4F9FF);
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

/* 主内容区域 */
.main-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 48rpx;
  padding: 0 32rpx;
  padding-bottom: 60rpx;
  
  /* #ifdef MP-WEIXIN */
  padding-top: 160rpx;
  /* #endif */
  /* #ifndef MP-WEIXIN */
  padding-top: 120rpx;
  /* #endif */
}

@keyframes breathing {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}

@keyframes flare-glow {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes beam-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes flare-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20rpx); }
}
</style>
