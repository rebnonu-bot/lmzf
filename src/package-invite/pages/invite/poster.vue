<template>
  <view class="invite-page">
    <!-- 顶部渐变背景 -->
    <view class="header-bg-container">
      <view class="header-bg"></view>
      <view class="glow-effect"></view>
    </view>
    
    <!-- 自定义导航栏 -->
    <view class="nav-bar" :style="navBarStyle">
      <view class="back-btn" @tap="goBack">
        <t-icon name="chevron-left" size="44rpx" color="#fff" />
      </view>
      <text class="nav-title">邀请好友</text>
      <view class="placeholder"></view>
    </view>

    <!-- 邀请统计卡片 -->
    <view class="stats-card">
      <view class="stats-item">
        <text class="stats-value">{{ inviteCount }}</text>
        <text class="stats-label">已邀请好友</text>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <text class="stats-value">{{ rewardPoints }}</text>
        <text class="stats-label">累计奖励积分</text>
      </view>
      <view class="stats-divider"></view>
      <view class="stats-item">
        <text class="stats-value">{{ rewardAmount }}</text>
        <text class="stats-label">可抵扣金额</text>
      </view>
    </view>

    <!-- 邀请海报卡片 -->
    <view class="poster-section">
      <view class="poster-card">
        <!-- 海报头部 -->
        <view class="poster-header">
          <view class="avatar-section">
            <image class="user-avatar" :src="userAvatar" mode="aspectFill" />
            <view class="avatar-badge">
              <t-icon name="check" size="20rpx" color="#fff" />
            </view>
          </view>
          <view class="header-text">
            <text class="invite-msg">{{ userName }} 邀请你加入</text>
            <view class="brand-row">
              <text class="brand-name">邻檬智付</text>
              <view class="verified-badge">已认证</view>
            </view>
          </view>
        </view>
        
        <!-- 中间内容 -->
        <view class="poster-body">
          <view class="main-benefit">
            <view class="benefit-icon-large">
              <t-icon name="money" size="80rpx" color="#3B82F6" />
            </view>
            <text class="benefit-title">物业费减免神器</text>
            <text class="benefit-subtitle">消费返积分 · 积分抵物业</text>
          </view>
          
          <view class="reward-highlight">
            <view class="reward-tag">
              <t-icon name="bolt" size="28rpx" color="#F59E0B" />
              <text>永久返利特权</text>
            </view>
            <view class="reward-detail">
              <text class="reward-text">好友每笔消费，你得</text>
              <text class="reward-percent">2%</text>
              <text class="reward-text">积分奖励</text>
            </view>
          </view>
        </view>
        
        <!-- 底部二维码区 -->
        <view class="poster-footer">
          <view class="qrcode-section">
            <view class="qrcode-box">
              <t-icon name="qrcode" size="120rpx" color="#3B82F6" />
              <view class="qrcode-glow"></view>
            </view>
            <text class="qrcode-tip">微信扫码，立即加入</text>
          </view>
        </view>
        
        <!-- 装饰元素 -->
        <view class="deco-circle c1"></view>
        <view class="deco-circle c2"></view>
      </view>
    </view>

    <!-- 分享方式 -->
    <view class="share-section">
      <view class="section-title">选择分享方式</view>
      <view class="share-options">
        <view class="share-option" @tap="shareToWechat">
          <view class="share-icon wechat">
            <t-icon name="chat" size="48rpx" color="#fff" />
          </view>
          <text class="share-name">微信好友</text>
        </view>
        <view class="share-option" @tap="shareToTimeline">
          <view class="share-icon timeline">
            <t-icon name="moments" size="48rpx" color="#fff" />
          </view>
          <text class="share-name">朋友圈</text>
        </view>
        <view class="share-option" @tap="savePoster">
          <view class="share-icon poster">
            <t-icon name="download" size="48rpx" color="#fff" />
          </view>
          <text class="share-name">保存海报</text>
        </view>
        <view class="share-option" @tap="copyLink">
          <view class="share-icon link">
            <t-icon name="link" size="48rpx" color="#fff" />
          </view>
          <text class="share-name">复制链接</text>
        </view>
      </view>
    </view>

    <!-- 规则说明 -->
    <view class="rule-card">
      <view class="rule-header">
        <t-icon name="info-circle" size="32rpx" color="#3B82F6" />
        <text class="rule-title">邀请规则</text>
      </view>
      <view class="rule-list">
        <view class="rule-item">
          <view class="rule-num">1</view>
          <text class="rule-text">好友通过你的邀请注册并绑定房产</text>
        </view>
        <view class="rule-item">
          <view class="rule-num">2</view>
          <text class="rule-text">好友在平台产生消费，你获得订单金额2%积分奖励</text>
        </view>
        <view class="rule-item">
          <view class="rule-num">3</view>
          <text class="rule-text">奖励积分永久有效，可抵扣自家物业费</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const userName = ref('邻檬用户');
const userAvatar = ref('/static/avatar-default.png');
const inviteCount = ref(8);
const rewardPoints = ref(1250);
const rewardAmount = ref(12.5);
const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif
});

const navBarStyle = computed(() => {
  // #ifdef MP-WEIXIN
  const top = menuButtonInfo.value.top;
  const height = menuButtonInfo.value.height;
  return {
    paddingTop: `${top}px`,
    height: `${height}px`
  };
  // #endif
  
  // #ifndef MP-WEIXIN
  return {
    paddingTop: `${statusBarHeight.value}px`,
    height: '44px'
  };
  // #endif
});

const goBack = () => {
  uni.navigateBack();
};

const savePoster = () => {
  uni.showLoading({ title: '生成中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '海报已保存', icon: 'success' });
  }, 1000);
};

const shareToWechat = () => {
  // #ifdef MP-WEIXIN
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage']
  });
  // #endif
  uni.showToast({ title: '请分享给微信好友', icon: 'none' });
};

const shareToTimeline = () => {
  // #ifdef MP-WEIXIN
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareTimeline']
  });
  // #endif
  uni.showToast({ title: '请分享到朋友圈', icon: 'none' });
};

const copyLink = () => {
  uni.showToast({ title: '链接已复制', icon: 'success' });
};
</script>

<style lang="less" scoped>
.invite-page {
  min-height: 100vh;
  background: #F4F9FF;
  position: relative;
  padding-bottom: 60rpx;
}

/* 顶部渐变背景 */
.header-bg-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500rpx;
  z-index: 0;
  overflow: hidden;

  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 50%, #F4F9FF 100%);
  }

  .glow-effect {
    position: absolute;
    top: -100rpx;
    right: -100rpx;
    width: 400rpx;
    height: 400rpx;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(40rpx);
  }
}

/* 导航栏 */
.nav-bar {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
  margin-bottom: 20rpx;
}

.back-btn {
  width: 64rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(8rpx);
  border-radius: 50%;
}

.nav-title {
  font-size: 34rpx;
  font-weight: 600;
  color: #fff;
}

.placeholder {
  width: 64rpx;
}

/* 统计卡片 */
.stats-card {
  position: relative;
  z-index: 1;
  margin: 0 32rpx 32rpx;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20rpx);
  border-radius: 24rpx;
  padding: 32rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 8rpx 32rpx rgba(59, 130, 246, 0.15);

  .stats-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8rpx;

    .stats-value {
      font-size: 40rpx;
      font-weight: 700;
      color: #3B82F6;
      font-family: 'DIN Alternate', -apple-system, sans-serif;
    }

    .stats-label {
      font-size: 24rpx;
      color: #64748B;
    }
  }

  .stats-divider {
    width: 2rpx;
    height: 60rpx;
    background: linear-gradient(180deg, transparent, #E2E8F0, transparent);
  }
}

/* 海报区域 */
.poster-section {
  position: relative;
  z-index: 1;
  padding: 0 32rpx;
  margin-bottom: 40rpx;
}

.poster-card {
  background: #fff;
  border-radius: 32rpx;
  padding: 40rpx;
  box-shadow: 0 16rpx 48rpx rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;

  .deco-circle {
    position: absolute;
    border-radius: 50%;

    &.c1 {
      width: 300rpx;
      height: 300rpx;
      background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
      top: -100rpx;
      right: -100rpx;
    }

    &.c2 {
      width: 200rpx;
      height: 200rpx;
      background: radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 70%);
      bottom: -50rpx;
      left: -50rpx;
    }
  }
}

/* 海报头部 */
.poster-header {
  display: flex;
  align-items: center;
  gap: 24rpx;
  padding-bottom: 32rpx;
  border-bottom: 2rpx dashed #E2E8F0;
  position: relative;
  z-index: 1;

  .avatar-section {
    position: relative;

    .user-avatar {
      width: 96rpx;
      height: 96rpx;
      border-radius: 50%;
      border: 4rpx solid #EFF6FF;
      box-shadow: 0 4rpx 16rpx rgba(59, 130, 246, 0.15);
    }

    .avatar-badge {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 32rpx;
      height: 32rpx;
      background: #3B82F6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2rpx solid #fff;
    }
  }

  .header-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8rpx;

    .invite-msg {
      font-size: 26rpx;
      color: #64748B;
    }

    .brand-row {
      display: flex;
      align-items: center;
      gap: 12rpx;

      .brand-name {
        font-size: 36rpx;
        font-weight: 700;
        color: #1E293B;
      }

      .verified-badge {
        font-size: 20rpx;
        color: #3B82F6;
        background: #EFF6FF;
        padding: 4rpx 12rpx;
        border-radius: 12rpx;
        font-weight: 500;
      }
    }
  }
}

/* 海报主体 */
.poster-body {
  padding: 40rpx 0;
  position: relative;
  z-index: 1;

  .main-benefit {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20rpx;
    margin-bottom: 40rpx;

    .benefit-icon-large {
      width: 140rpx;
      height: 140rpx;
      background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 12rpx 32rpx rgba(59, 130, 246, 0.2);
    }

    .benefit-title {
      font-size: 40rpx;
      font-weight: 700;
      color: #1E293B;
    }

    .benefit-subtitle {
      font-size: 28rpx;
      color: #64748B;
    }
  }

  .reward-highlight {
    background: linear-gradient(135deg, #FEF3C7, #FDE68A);
    border-radius: 20rpx;
    padding: 28rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;

    .reward-tag {
      display: flex;
      align-items: center;
      gap: 8rpx;
      background: rgba(255, 255, 255, 0.5);
      padding: 8rpx 16rpx;
      border-radius: 24rpx;

      text {
        font-size: 24rpx;
        font-weight: 600;
        color: #D97706;
      }
    }

    .reward-detail {
      display: flex;
      align-items: baseline;
      gap: 8rpx;

      .reward-text {
        font-size: 26rpx;
        color: #92400E;
      }

      .reward-percent {
        font-size: 48rpx;
        font-weight: 700;
        color: #D97706;
        font-family: 'DIN Alternate', -apple-system, sans-serif;
      }
    }
  }
}

/* 海报底部 */
.poster-footer {
  padding-top: 32rpx;
  border-top: 2rpx dashed #E2E8F0;
  position: relative;
  z-index: 1;

  .qrcode-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16rpx;

    .qrcode-box {
      position: relative;
      width: 200rpx;
      height: 200rpx;
      background: #fff;
      border-radius: 16rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.08);
      border: 4rpx solid #EFF6FF;

      .qrcode-glow {
        position: absolute;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
        border-radius: 16rpx;
      }
    }

    .qrcode-tip {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }
}

/* 分享区域 */
.share-section {
  padding: 0 32rpx;
  margin-bottom: 40rpx;

  .section-title {
    font-size: 28rpx;
    color: #64748B;
    margin-bottom: 24rpx;
    padding-left: 8rpx;
  }

  .share-options {
    display: flex;
    justify-content: space-around;
    background: #fff;
    border-radius: 24rpx;
    padding: 32rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

    .share-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12rpx;
      transition: all 0.2s;

      &:active {
        transform: scale(0.9);
        opacity: 0.8;
      }

      .share-icon {
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);

        &.wechat {
          background: linear-gradient(135deg, #07C160, #10B981);
          box-shadow: 0 8rpx 24rpx rgba(7, 193, 96, 0.3);
        }

        &.timeline {
          background: linear-gradient(135deg, #F59E0B, #FBBF24);
          box-shadow: 0 8rpx 24rpx rgba(245, 158, 11, 0.3);
        }

        &.poster {
          background: linear-gradient(135deg, #3B82F6, #60A5FA);
          box-shadow: 0 8rpx 24rpx rgba(59, 130, 246, 0.3);
        }

        &.link {
          background: linear-gradient(135deg, #8B5CF6, #A78BFA);
          box-shadow: 0 8rpx 24rpx rgba(139, 92, 246, 0.3);
        }
      }

      .share-name {
        font-size: 24rpx;
        color: #475569;
      }
    }
  }
}

/* 规则卡片 */
.rule-card {
  margin: 0 32rpx;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20rpx);
  border-radius: 24rpx;
  padding: 32rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

  .rule-header {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin-bottom: 24rpx;

    .rule-title {
      font-size: 30rpx;
      font-weight: 600;
      color: #1E293B;
    }
  }

  .rule-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;

    .rule-item {
      display: flex;
      align-items: flex-start;
      gap: 16rpx;

      .rule-num {
        width: 36rpx;
        height: 36rpx;
        background: linear-gradient(135deg, #3B82F6, #60A5FA);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22rpx;
        color: #fff;
        font-weight: 600;
        flex-shrink: 0;
        margin-top: 4rpx;
      }

      .rule-text {
        flex: 1;
        font-size: 26rpx;
        color: #475569;
        line-height: 1.5;
      }
    }
  }
}
</style>
