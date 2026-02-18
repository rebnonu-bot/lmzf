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
    <view class="rule-card" v-if="rules.length > 0">
      <view class="rule-header">
        <t-icon name="info-circle" size="32rpx" color="#3B82F6" />
        <text class="rule-title">邀请规则</text>
      </view>
      <view class="rule-list">
        <view class="rule-item" v-for="(rule, index) in rules" :key="index">
          <view class="rule-num">{{ index + 1 }}</view>
          <text class="rule-text">{{ rule }}</text>
        </view>
      </view>
    </view>

    <!-- 画布组件 (隐藏) -->
    <canvas 
      canvas-id="posterCanvas" 
      id="posterCanvas"
      class="poster-canvas"
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
    />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { getInviteInfo } from '@/api/modules/invite';

const userStore = useUserStore();

const userName = computed(() => userStore.nickname.value || '邻檬用户');
const userAvatar = computed(() => userStore.avatar.value || '/static/avatar-default.png');

const inviteCount = ref(0);
const rewardPoints = ref(0);
const rewardAmount = ref(0);
const rules = ref<string[]>([]);

const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

// 画布相关
const canvasWidth = ref(375);
const canvasHeight = ref(600);
const isGenerating = ref(false);

onMounted(() => {
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif

  fetchData();
});

const fetchData = async () => {
  try {
    const data = await getInviteInfo();
    inviteCount.value = data.inviteCount;
    rewardPoints.value = data.pointsReward;
    rewardAmount.value = data.cashReward;
    rules.value = data.rules;
  } catch (error) {
    console.error('Failed to fetch invite info:', error);
    uni.showToast({ title: '加载失败', icon: 'none' });
  }
};

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

/**
 * 绘制圆角矩形
 */
const drawRoundRect = (ctx: UniApp.CanvasContext, x: number, y: number, w: number, h: number, r: number) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arc(x + w - r, y + r, r, 1.5 * Math.PI, 2 * Math.PI);
  ctx.lineTo(x + w, y + h - r);
  ctx.arc(x + w - r, y + h - r, r, 0, 0.5 * Math.PI);
  ctx.lineTo(x + r, y + h);
  ctx.arc(x + r, y + h - r, r, 0.5 * Math.PI, Math.PI);
  ctx.lineTo(x, y + r);
  ctx.arc(x + r, y + r, r, Math.PI, 1.5 * Math.PI);
  ctx.closePath();
  ctx.fill();
};

/**
 * 绘制海报
 */
const drawPoster = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const ctx = uni.createCanvasContext('posterCanvas');
      const w = canvasWidth.value;
      const h = canvasHeight.value;

      // 1. 绘制背景
      const grd = ctx.createLinearGradient(0, 0, 0, h);
      grd.addColorStop(0, '#3B82F6');
      grd.addColorStop(0.5, '#60A5FA');
      grd.addColorStop(1, '#F4F9FF');
      // @ts-ignore: UniApp types mismatch for gradient
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      // 2. 绘制白色卡片背景
      ctx.fillStyle = '#FFFFFF';
      drawRoundRect(ctx, 20, 80, w - 40, h - 120, 16);

      // 3. 绘制用户信息
      // 头像背景
      ctx.save();
      ctx.beginPath();
      ctx.arc(60, 120, 30, 0, 2 * Math.PI);
      ctx.clip();
      
      // 下载头像（如果是网络图片需要先下载）
      // 这里简化处理，如果是本地路径直接用，网络路径需下载
      // 实际开发中建议封装一个下载图片的通用方法
      let avatarPath = '/static/avatar-default.png';
      if (userAvatar.value.startsWith('http')) {
        try {
           const res = await uni.downloadFile({ url: userAvatar.value });
           if (res.statusCode === 200) {
             avatarPath = res.tempFilePath;
           }
        } catch (e) {
          console.error('Avatar download failed', e);
        }
      } else {
        avatarPath = userAvatar.value;
      }
      
      // 绘制头像
      // 注意：drawImage 在不同平台对路径支持不同，这里假设是本地绝对路径或临时路径
      ctx.drawImage(avatarPath, 30, 90, 60, 60);
      ctx.restore();

      // 用户名
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 18px sans-serif';
      ctx.fillText(userName.value, 100, 115);
      
      // 邀请语
      ctx.fillStyle = '#64748B';
      ctx.font = '14px sans-serif';
      ctx.fillText('邀请你加入邻檬智付', 100, 140);

      // 4. 绘制主要文案
      ctx.fillStyle = '#3B82F6';
      ctx.font = 'bold 24px sans-serif';
      ctx.setTextAlign('center');
      ctx.fillText('物业费减免神器', w / 2, 220);

      ctx.fillStyle = '#64748B';
      ctx.font = '16px sans-serif';
      ctx.fillText('消费返积分 · 积分抵物业', w / 2, 260);

      // 5. 绘制权益框
      ctx.fillStyle = '#FEF3C7'; // F59E0B的浅色背景
      drawRoundRect(ctx, 40, 300, w - 80, 80, 12);
      
      ctx.fillStyle = '#D97706';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText('永久返利特权', w / 2, 330);
      
      ctx.fillStyle = '#D97706';
      ctx.font = '14px sans-serif';
      ctx.fillText('好友每笔消费，你得 2% 积分', w / 2, 360);

      // 6. 绘制二维码区域
      // 模拟二维码框
      ctx.fillStyle = '#F4F9FF';
      const qrSize = 120;
      const qrX = (w - qrSize) / 2;
      const qrY = 420;
      ctx.fillRect(qrX, qrY, qrSize, qrSize);
      
      // 绘制二维码中心的 ICON（模拟）
      ctx.fillStyle = '#3B82F6';
      ctx.fillRect(qrX + 40, qrY + 40, 40, 40);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '12px sans-serif';
      ctx.fillText('微信扫码，立即加入', w / 2, 570);

      // 开始绘制
      ctx.draw(false, () => {
        setTimeout(() => {
          uni.canvasToTempFilePath({
            canvasId: 'posterCanvas',
            success: (res) => {
              resolve(res.tempFilePath);
            },
            fail: (err) => {
              reject(err);
            }
          });
        }, 200);
      });

    } catch (error) {
      reject(error);
    }
  });
};

const savePoster = async () => {
  if (isGenerating.value) return;
  isGenerating.value = true;
  uni.showLoading({ title: '正在生成海报...' });

  try {
    // 1. 生成图片路径
    const tempFilePath = await drawPoster();
    
    // 2. 保存到相册
    // #ifdef MP-WEIXIN
    uni.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: () => {
        uni.hideLoading();
        uni.showToast({ title: '已保存到相册', icon: 'success' });
      },
      fail: (err) => {
        uni.hideLoading();
        console.error('Save failed:', err);
        // 处理权限拒绝的情况
        if (err.errMsg.includes('auth deny')) {
          uni.showModal({
            title: '提示',
            content: '需要您授权保存图片到相册',
            success: (res) => {
              if (res.confirm) {
                uni.openSetting();
              }
            }
          });
        } else {
          uni.showToast({ title: '保存失败', icon: 'none' });
        }
      }
    });
    // #endif

    // #ifndef MP-WEIXIN
    // H5 等平台提示长按保存或预览
    uni.hideLoading();
    uni.previewImage({
      urls: [tempFilePath],
      current: 0
    });
    // #endif

  } catch (error) {
    console.error('Generate poster failed:', error);
    uni.hideLoading();
    uni.showToast({ title: '生成海报失败', icon: 'none' });
  } finally {
    isGenerating.value = false;
  }
};

const shareToWechat = () => {
  // #ifdef MP-WEIXIN
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage']
  });
  // #endif
  uni.showToast({ title: '请点击右上角分享给微信好友', icon: 'none' });
};

const shareToTimeline = () => {
  // #ifdef MP-WEIXIN
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareTimeline']
  });
  // #endif
  uni.showToast({ title: '请点击右上角分享到朋友圈', icon: 'none' });
};

const copyLink = () => {
  uni.setClipboardData({
    data: 'https://lmzf.com/invite?code=123456',
    success: () => {
      uni.showToast({ title: '链接已复制', icon: 'success' });
    }
  });
};
</script>

<style lang="less" scoped>
.invite-page {
  min-height: 100vh;
  background: #F4F9FF;
  position: relative;
  padding-bottom: 60rpx;
}

/* 隐藏画布 */
.poster-canvas {
  position: fixed;
  top: 0;
  left: 9999px;
  z-index: -1;
  visibility: hidden;
  /* #ifdef H5 */
  visibility: visible; /* H5 需要可见才能绘制 */
  opacity: 0;
  pointer-events: none;
  /* #endif */
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
