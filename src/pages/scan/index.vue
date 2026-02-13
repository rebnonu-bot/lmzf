<template>
  <view class="scan-page">
    <!-- 页面内容为空，直接进入就触发扫码 -->
  </view>
</template>

<script setup lang="ts">
import { onShow } from '@dcloudio/uni-app';

onShow(() => {
  // 直接调用系统扫一扫
  uni.scanCode({
    onlyFromCamera: false, // 允许从相册选择二维码
    scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
    success: (res) => {
      console.log('扫码结果:', res.result);
      console.log('扫码类型:', res.scanType);
      console.log('字符集:', res.charSet);
      
      // 扫码成功后提示结果
      uni.showModal({
        title: '扫码成功',
        content: res.result,
        showCancel: false,
        success: () => {
          // 扫码完成后返回上一页
          uni.navigateBack();
        }
      });
    },
    fail: (err) => {
      console.log('扫码失败或取消:', err);
      // 用户取消或失败，返回上一页
      uni.navigateBack();
    }
  });
});
</script>

<style scoped>
.scan-page {
  width: 100%;
  height: 100vh;
  background: #000;
}
</style>
