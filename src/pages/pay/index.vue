<template>
  <view class="page-container">
    <view class="content">
      <t-icon name="qrcode" size="64rpx" color="#3B82F6" />
      <text class="title">扫码支付</text>
      <text class="desc">功能开发中...</text>
    </view>
  </view>
</template>

<script setup lang="ts">
// 扫码支付页面
</script>

<style lang="less" scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F4F9FF;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  
  .title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-top: 24rpx;
  }
  
  .desc {
    font-size: 28rpx;
    color: #999;
    margin-top: 16rpx;
  }
}
</style>
