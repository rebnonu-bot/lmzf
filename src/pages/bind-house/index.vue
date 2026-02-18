<template>
  <view class="bind-house-page">
    <view class="header">
      <text class="title">绑定房产</text>
      <text class="desc">请完善您的房屋信息，以便为您提供更好的服务</text>
    </view>

    <view class="form-card">
      <view class="form-item">
        <text class="label">所在小区</text>
        <picker :range="communities" range-key="name" @change="onCommunityChange">
          <view class="picker-value" :class="{ placeholder: !form.communityName }">
            {{ form.communityName || '请选择小区' }}
            <t-icon name="chevron-right" size="40rpx" color="#ccc" />
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">楼栋</text>
        <picker :range="buildings" @change="onBuildingChange" :disabled="!form.communityId">
          <view class="picker-value" :class="{ placeholder: !form.building }">
            {{ form.building ? form.building + '号楼' : '请选择楼栋' }}
            <t-icon name="chevron-right" size="40rpx" color="#ccc" />
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">单元</text>
        <picker :range="units" @change="onUnitChange" :disabled="!form.building">
          <view class="picker-value" :class="{ placeholder: !form.unit }">
            {{ form.unit ? form.unit + '单元' : '请选择单元' }}
            <t-icon name="chevron-right" size="40rpx" color="#ccc" />
          </view>
        </picker>
      </view>

      <view class="form-item">
        <text class="label">房号</text>
        <input
          class="input"
          type="number"
          v-model="form.room"
          placeholder="请输入房号 (如: 101)"
          placeholder-class="input-placeholder"
        />
      </view>

      <view class="divider" />

      <view class="form-item">
        <text class="label">您的身份</text>
        <radio-group @change="onRoleChange" class="role-group">
          <label class="role-item" v-for="role in roles" :key="role.value">
            <radio :value="role.value" :checked="form.role === role.value" color="#3B82F6" />
            <text>{{ role.label }}</text>
          </label>
        </radio-group>
      </view>

      <view class="form-item">
        <text class="label">姓名</text>
        <input
          class="input"
          type="text"
          v-model="form.name"
          placeholder="请输入业主姓名"
          placeholder-class="input-placeholder"
        />
      </view>

      <view class="form-item">
        <text class="label">手机号</text>
        <input
          class="input"
          type="number"
          v-model="form.phone"
          placeholder="请输入手机号"
          maxlength="11"
          placeholder-class="input-placeholder"
        />
      </view>
    </view>

    <view class="submit-btn">
      <t-button theme="primary" size="large" block :loading="loading" @tap="handleSubmit">
        立即绑定
      </t-button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const loading = ref(false);

const form = reactive({
  communityId: '',
  communityName: '',
  building: '',
  unit: '',
  room: '',
  role: 'owner',
  name: '',
  phone: '',
});

// Mock Data
const communities = [
  { id: '1', name: '幸福小区' },
  { id: '2', name: '阳光花园' },
  { id: '3', name: '绿城雅园' },
];

const buildings = ['1', '2', '3', '5', '6', '8'];
const units = ['1', '2', '3'];
const roles = [
  { label: '业主', value: 'owner' },
  { label: '家属', value: 'family' },
  { label: '租客', value: 'tenant' },
];

const onCommunityChange = (e: any) => {
  const index = Number(e.detail.value);
  if (communities[index]) {
    form.communityId = communities[index].id;
    form.communityName = communities[index].name;
    form.building = '';
    form.unit = '';
  }
};

const onBuildingChange = (e: any) => {
  const index = Number(e.detail.value);
  if (buildings[index]) {
    form.building = buildings[index];
    form.unit = '';
  }
};

const onUnitChange = (e: any) => {
  const index = Number(e.detail.value);
  if (units[index]) {
    form.unit = units[index];
  }
};

const onRoleChange = (e: any) => {
  form.role = e.detail.value;
};

const handleSubmit = async () => {
  if (!form.communityId || !form.building || !form.unit || !form.room || !form.name || !form.phone) {
    uni.showToast({
      title: '请填写完整信息',
      icon: 'none',
    });
    return;
  }

  if (!/^1\d{10}$/.test(form.phone)) {
    uni.showToast({
      title: '手机号格式不正确',
      icon: 'none',
    });
    return;
  }

  loading.value = true;
  
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    uni.showToast({
      title: '绑定成功',
      icon: 'success',
    });
    
    // Update local user info mock
    userStore.setHasHouse(true);

    setTimeout(() => {
      uni.switchTab({ url: '/pages/home/index' });
    }, 1500);
  }, 1000);
};
</script>

<style lang="less" scoped>
.bind-house-page {
  min-height: 100vh;
  background-color: #F4F9FF;
  padding: 32rpx;
  box-sizing: border-box;
}

.header {
  margin-bottom: 48rpx;
  padding: 0 16rpx;

  .title {
    display: block;
    font-size: 48rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 16rpx;
  }

  .desc {
    font-size: 28rpx;
    color: #666;
  }
}

.form-card {
  background-color: #fff;
  border-radius: 24rpx;
  padding: 32rpx;
  margin-bottom: 48rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);

  .form-item {
    display: flex;
    align-items: center;
    padding: 24rpx 0;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .label {
      width: 160rpx;
      font-size: 30rpx;
      color: #333;
    }

    picker {
      flex: 1;
    }

    .picker-value {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      display: flex;
      justify-content: space-between;
      align-items: center;

      &.placeholder {
        color: #ccc;
      }
    }

    .input {
      flex: 1;
      font-size: 30rpx;
      color: #333;
      text-align: right;
    }

    .input-placeholder {
      color: #ccc;
    }
  }

  .divider {
    height: 16rpx;
    background-color: #F4F9FF;
    margin: 0 -32rpx;
  }

  .role-group {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    gap: 32rpx;

    .role-item {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: #666;

      radio {
        transform: scale(0.8);
        margin-right: 8rpx;
      }
    }
  }
}

.submit-btn {
  padding: 0 16rpx;
}
</style>
