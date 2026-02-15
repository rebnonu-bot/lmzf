<template>
  <view class="stores-page">
    <!-- 顶部固定区域 -->
    <view class="header-fixed">
      <!-- 顶部渐变背景 -->
      <view class="header-bg"></view>
      
      <!-- 自定义导航栏 -->
      <view class="nav-bar" :style="navBarStyle">
        <view class="back-btn" @tap="goBack">
          <t-icon name="chevron-left" size="48rpx" color="#fff" />
        </view>
        <text class="nav-title">线下门店</text>
        <view class="placeholder"></view>
      </view>

      <!-- 搜索栏 -->
      <view class="search-section">
        <view class="search-box">
          <t-icon name="search" size="36rpx" color="#94A3B8" />
          <input 
            v-model="searchKeyword" 
            placeholder="搜索门店名称" 
            placeholder-class="placeholder"
            @input="onSearch"
          />
        </view>
      </view>

      <!-- 分类筛选 -->
      <view class="filter-section">
        <scroll-view 
          scroll-x 
          class="filter-scroll" 
          scroll-with-animation
        >
            <view 
              v-for="(item, index) in categories" 
              :key="index"
              class="filter-tag"
              :class="{ active: currentCategory === item.value }"
              @tap="selectCategory(item.value)"
            >
              {{ item.label }}
            </view>
        </scroll-view>
      </view>
    </view>

    <!-- 门店列表 -->
    <view class="list-container">
      <scroll-view 
        scroll-y 
        class="store-list"
        @scrolltolower="loadMore"
      >
        <view class="list-content">
          <view 
            v-for="(store, index) in filteredStores" 
            :key="index"
            class="store-card"
            @tap="goToStoreDetail(store)"
          >
            <view class="card-glow"></view>
            <view class="store-main">
              <view class="store-icon">
                <t-icon name="shop" size="44rpx" color="#3B82F6" />
              </view>
              <view class="store-info">
                <view class="info-header">
                  <text class="store-name">{{ store.name }}</text>
                  <view class="distance-tag">
                    <t-icon name="location" size="20rpx" color="#3B82F6" />
                    <text>{{ store.distance }}</text>
                  </view>
                </view>
                <view class="store-tags">
                  <text v-for="(tag, idx) in store.tags" :key="idx" class="tag">{{ tag }}</text>
                </view>
                <view class="store-address">
                  <t-icon name="map" size="24rpx" color="#CBD5E1" />
                  <text class="address-text">{{ store.address }}</text>
                </view>
              </view>
            </view>
            
            <view class="store-footer">
              <view class="points-badge">
                <t-icon name="gift" size="24rpx" color="#F59E0B" />
                <text>{{ store.pointsRate }}</text>
              </view>
              <view class="action-arrow">
                <t-icon name="chevron-right" size="32rpx" color="#CBD5E1" />
              </view>
            </view>
          </view>
          
          <!-- 加载更多 -->
          <view class="load-more">
            <text v-if="loading">加载中...</text>
            <text v-else-if="noMore">没有更多了</text>
            <text v-else>— 已经到底了 —</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  pointsRate: string;
  tags: string[];
  category: string;
}

const searchKeyword = ref('');
const currentCategory = ref('all');
const loading = ref(false);
const noMore = ref(false);
const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

const categories = [
  { label: '全部', value: 'all' },
  { label: '餐饮', value: 'food' },
  { label: '超市', value: 'supermarket' },
  { label: '美容', value: 'beauty' },
  { label: '健身', value: 'fitness' },
  { label: '洗车', value: 'car' },
  { label: '药店', value: 'pharmacy' },
];

const stores = ref<Store[]>([
  {
    id: '1',
    name: '邻檬便利店（阳光店）',
    address: '赣州市章贡区阳光路123号',
    distance: '0.5km',
    pointsRate: '消费1元得2积分',
    tags: ['支持抵扣', '24小时'],
    category: 'supermarket'
  },
  {
    id: '2',
    name: '美味轩餐厅',
    address: '赣州市章贡区红旗大道88号',
    distance: '1.2km',
    pointsRate: '消费1元得3积分',
    tags: ['新开业', '满减'],
    category: 'food'
  },
  {
    id: '3',
    name: '活力健身房',
    address: '赣州市章贡区体育中心2楼',
    distance: '2.0km',
    pointsRate: '消费1元得1积分',
    tags: ['支持抵扣'],
    category: 'fitness'
  },
  {
    id: '4',
    name: '靓车坊洗车',
    address: '赣州市章贡区建设路56号',
    distance: '3.5km',
    pointsRate: '消费1元得2积分',
    tags: ['会员价'],
    category: 'car'
  },
  {
    id: '5',
    name: '康乐大药房',
    address: '赣州市章贡区健康路99号',
    distance: '0.8km',
    pointsRate: '消费1元得1积分',
    tags: ['医保定点'],
    category: 'pharmacy'
  },
  {
    id: '6',
    name: '美丽人生美容院',
    address: '赣州市章贡区美容街12号',
    distance: '1.5km',
    pointsRate: '消费1元得5积分',
    tags: ['新开业', '体验价'],
    category: 'beauty'
  }
]);

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

const filteredStores = computed(() => {
  let result = stores.value;
  
  if (currentCategory.value !== 'all') {
    result = result.filter(s => s.category === currentCategory.value);
  }
  
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(s => 
      s.name.toLowerCase().includes(keyword) ||
      s.address.toLowerCase().includes(keyword)
    );
  }
  
  return result;
});

const goBack = () => {
  uni.navigateBack();
};

const selectCategory = (value: string) => {
  currentCategory.value = value;
};

const onSearch = () => {};

const goToStoreDetail = (store: Store) => {
  uni.showToast({ title: store.name, icon: 'none' });
};

const loadMore = () => {
  if (loading.value || noMore.value) return;
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    noMore.value = true;
  }, 1000);
};
</script>

<style lang="less" scoped>
page {
  height: 100vh;
  overflow: hidden;
}

.stores-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #F4F9FF;
}

/* 顶部固定区域 */
.header-fixed {
  position: relative;
  flex-shrink: 0;
  z-index: 10;
}

/* 顶部渐变背景 */
.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(180deg, #3B82F6 0%, #60A5FA 100%);
  z-index: -1;
}

/* 导航栏 */
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32rpx;
}

.back-btn {
  width: 60rpx;
  height: 60rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #fff;
}

.placeholder {
  width: 60rpx;
}

/* 搜索栏 */
.search-section {
  padding: 20rpx 32rpx;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 16rpx;
  background: rgba(255, 255, 255, 0.95);
  padding: 20rpx 32rpx;
  border-radius: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  
  input {
    flex: 1;
    font-size: 30rpx;
    color: #1E293B;
  }
  
  .placeholder {
    color: #94A3B8;
  }
}

/* 筛选栏 */
.filter-section {
  padding: 0 0 20rpx 32rpx;
  width: 100%;
}

.filter-scroll {
  width: 100%;
  white-space: nowrap;
}

.filter-tag {
  display: inline-block;
  padding: 16rpx 36rpx;
  margin-right: 16rpx;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 32rpx;
  font-size: 28rpx;
  color: #fff;
  vertical-align: middle;
  
  &:last-child {
    margin-right: 32rpx;
  }
  
  &.active {
    background: #fff;
    color: #3B82F6;
    box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
  }
}

/* 列表容器 */
.list-container {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: #F4F9FF;
}

.store-list {
  height: 100%;
}

.list-content {
  padding: 24rpx 32rpx 40rpx;
}

.store-card {
  position: relative;
  background: #fff;
  border-radius: 32rpx;
  padding: 32rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.04);
  overflow: hidden;
  
  &:active {
    transform: scale(0.99);
  }
}

.card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
  pointer-events: none;
}

.store-main {
  display: flex;
  gap: 24rpx;
  margin-bottom: 24rpx;
}

.store-icon {
  width: 88rpx;
  height: 88rpx;
  background: linear-gradient(135deg, #EFF6FF, #DBEAFE);
  border-radius: 24rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.store-info {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.info-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
  margin-bottom: 16rpx;
}

.store-name {
  flex: 1;
  font-size: 32rpx;
  font-weight: 600;
  color: #1E293B;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.distance-tag {
  display: flex;
  align-items: center;
  gap: 8rpx;
  background: #EFF6FF;
  padding: 8rpx 16rpx;
  border-radius: 20rpx;
  flex-shrink: 0;
  
  text {
    font-size: 24rpx;
    color: #3B82F6;
    font-weight: 500;
  }
}

.store-tags {
  display: flex;
  gap: 12rpx;
  margin-bottom: 16rpx;
  flex-wrap: wrap;
}

.tag {
  padding: 6rpx 16rpx;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  color: #D97706;
  font-size: 22rpx;
  border-radius: 12rpx;
  font-weight: 500;
  flex-shrink: 0;
}

.store-address {
  display: flex;
  align-items: center;
  gap: 12rpx;
  overflow: hidden;
}

.address-text {
  flex: 1;
  font-size: 26rpx;
  color: #64748B;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  min-width: 0;
}

.store-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 24rpx;
  border-top: 2rpx dashed #E2E8F0;
}

.points-badge {
  display: flex;
  align-items: center;
  gap: 12rpx;
  background: linear-gradient(135deg, #FEF3C7, rgba(254, 243, 199, 0.5));
  padding: 12rpx 24rpx;
  border-radius: 24rpx;
  
  text {
    font-size: 26rpx;
    font-weight: 600;
    color: #D97706;
  }
}

.action-arrow {
  width: 56rpx;
  height: 56rpx;
  background: #F8FAFC;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 加载更多 */
.load-more {
  text-align: center;
  padding: 40rpx 0;
  
  text {
    font-size: 26rpx;
    color: #94A3B8;
  }
}
</style>
