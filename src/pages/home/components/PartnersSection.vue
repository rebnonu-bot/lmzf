<template>
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
      <view 
        v-for="partner in partners" 
        :key="partner.key"
        class="partner-item" 
        @tap="showPartnerDetail(partner.key)"
      >
        <view class="partner-logo-large">
          <image :src="partner.logo" mode="aspectFit" />
        </view>
        <text class="partner-item-name">{{ partner.name }}</text>
        <text class="partner-item-tag" :class="partner.tagClass">{{ partner.tag }}</text>
      </view>
    </view>
    
    <!-- 合作保障说明 -->
    <view class="partners-guarantee">
      <view class="guarantee-item green">
        <view class="guarantee-icon">
          <t-icon name="secured" size="28rpx" color="#10B981" />
        </view>
        <text class="guarantee-text">资金银行托管</text>
      </view>
      <view class="guarantee-divider"></view>
      <view class="guarantee-item blue">
        <view class="guarantee-icon">
          <t-icon name="check-circle" size="28rpx" color="#3B82F6" />
        </view>
        <text class="guarantee-text">央行支付牌照</text>
      </view>
      <view class="guarantee-divider"></view>
      <view class="guarantee-item orange">
        <view class="guarantee-icon">
          <t-icon name="lock-on" size="28rpx" color="#F59E0B" />
        </view>
        <text class="guarantee-text">数据安全加密</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
interface Partner {
  key: string;
  name: string;
  logo: string;
  tag: string;
  tagClass: string;
  desc: string;
}

const partners: Partner[] = [
  {
    key: 'lmzj',
    name: '邻檬智家',
    logo: '/static/logo-lmzj.png',
    tag: '品牌方',
    tagClass: 'brand',
    desc: '邻檬智家是领先的社区生活服务平台，致力于通过数字化手段提升社区生活品质。'
  },
  {
    key: 'allinpay',
    name: '通联支付',
    logo: '/static/logo-allinpay.png',
    tag: '支付通道',
    tagClass: 'pay',
    desc: '通联支付网络服务股份有限公司是中国支付清算协会副会长单位，拥有全国性支付牌照。'
  },
  {
    key: 'psbc',
    name: '邮储银行',
    logo: '/static/logo-psbc.png',
    tag: '资金托管',
    tagClass: 'bank',
    desc: '中国邮政储蓄银行是中国领先的大型零售商业银行，为邻檬智付提供资金托管服务。'
  }
];

const emit = defineEmits<{
  detail: [key: string];
}>();

const showPartnerDetail = (key: string) => {
  emit('detail', key);
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

.partners-section {
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .header-left {
      display: flex;
      align-items: center;
      gap: 16rpx;

      .header-icon {
        width: 64rpx;
        height: 64rpx;
        background: linear-gradient(135deg, #D1FAE5, #A7F3D0);
        border-radius: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .section-title {
        font-size: 32rpx;
        font-weight: 700;
        color: #1E293B;
      }
    }

    .section-subtitle {
      font-size: 24rpx;
      color: #94A3B8;
    }
  }

  .partners-row {
    display: flex;
    justify-content: space-between;
    gap: 16rpx;
    margin-bottom: 24rpx;

    .partner-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24rpx 12rpx;
      background: rgba(255, 255, 255, 0.85);
      backdrop-filter: blur(20rpx);
      border-radius: 20rpx;
      box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);
      transition: all 0.2s;

      &:active {
        transform: scale(0.95);
      }

      .partner-logo-large {
        width: 140rpx;
        height: 60rpx;
        margin-bottom: 12rpx;
        display: flex;
        align-items: center;
        justify-content: center;

        image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }

      .partner-item-name {
        font-size: 26rpx;
        font-weight: 600;
        color: #1E293B;
        margin-bottom: 10rpx;
      }

      .partner-item-tag {
        font-size: 20rpx;
        padding: 4rpx 16rpx;
        border-radius: 12rpx;
        font-weight: 500;

        &.brand {
          background: #EFF6FF;
          color: #3B82F6;
        }

        &.pay {
          background: #FEF3C7;
          color: #F59E0B;
        }

        &.bank {
          background: #ECFDF5;
          color: #10B981;
        }
      }
    }
  }

  .partners-guarantee {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    padding: 32rpx 24rpx;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20rpx);
    border-radius: 20rpx;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.04);

    .guarantee-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12rpx;
      flex: 1;

      &.green .guarantee-icon {
        background: #ECFDF5;
      }

      &.blue .guarantee-icon {
        background: #EFF6FF;
      }

      &.orange .guarantee-icon {
        background: #FEF3C7;
      }

      .guarantee-icon {
        width: 56rpx;
        height: 56rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .guarantee-text {
        font-size: 24rpx;
        color: #64748B;
        font-weight: 400;
      }
    }
  }
}
</style>
