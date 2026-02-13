<template>
  <view class="scan-page">
    <view class="scan-btn-wrapper">
      <view class="scan-btn" @tap="handleScan">
        <t-icon name="qrcode" size="60rpx" color="#fff" />
        <text class="scan-text">点击扫码</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const handleScan = () => {
  uni.scanCode({
    onlyFromCamera: false,
    scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
    success: (res) => {
      const result = res.result.trim();
      
      // 判断二维码类型并处理
      if (result.startsWith('http://') || result.startsWith('https://')) {
        // 网页链接 - 使用 web-view 打开
        uni.navigateTo({
          url: `/pages/webview/index?url=${encodeURIComponent(result)}`
        });
      } else if (result.startsWith('store:')) {
        // 门店码 - 跳转门店详情
        const storeId = result.split(':')[1];
        uni.showToast({ title: `门店ID: ${storeId}`, icon: 'none' });
        // uni.navigateTo({ url: `/pages/store/detail?id=${storeId}` });
      } else if (result.startsWith('pay:')) {
        // 支付码 - 跳转支付页面
        const payCode = result.split(':')[1];
        uni.showToast({ title: `支付码: ${payCode}`, icon: 'none' });
        // uni.navigateTo({ url: `/pages/pay/confirm?code=${payCode}` });
      } else if (/^1[3-9]\d{9}$/.test(result)) {
        // 手机号 - 询问是否拨打
        uni.showModal({
          title: '发现手机号',
          content: result,
          confirmText: '拨打',
          success: (modalRes) => {
            if (modalRes.confirm) {
              uni.makePhoneCall({ phoneNumber: result });
            }
          }
        });
      } else {
        // 其他文本内容 - 弹窗展示
        uni.showModal({
          title: '扫码结果',
          content: result,
          showCancel: false,
          confirmText: '复制',
          success: () => {
            uni.setClipboardData({
              data: result,
              success: () => uni.showToast({ title: '已复制', icon: 'success' })
            });
          }
        });
      }
    },
    fail: (err) => {
      // 用户取消不提示，其他错误提示
      if (err.errMsg && !err.errMsg.includes('cancel')) {
        uni.showToast({ title: '扫码失败', icon: 'none' });
      }
      uni.navigateBack();
    }
  });
};
</script>

<style scoped>
.scan-page {
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scan-btn-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scan-btn {
  width: 200rpx;
  height: 200rpx;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  box-shadow: 0 8rpx 32rpx rgba(59, 130, 246, 0.5);
}

.scan-text {
  font-size: 28rpx;
  color: #fff;
  font-weight: 500;
}

.scan-btn:active {
  transform: scale(0.95);
  opacity: 0.9;
}
</style>
