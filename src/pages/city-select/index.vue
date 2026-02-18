<template>
  <view class="city-select-container">
    <!-- 顶部导航栏 -->
    <view class="nav-bar" :style="navBarStyle">
      <view class="back-icon" @click="handleBack">
        <t-icon name="chevron-left" size="48rpx" />
      </view>
      <text class="nav-title">选择所在城市</text>
      <view class="placeholder"></view>
    </view>

    <!-- 搜索框 -->
    <view class="search-section">
      <t-search 
        placeholder="输入城市名查询" 
        shape="round" 
        :modelValue="searchValue"
        @update:modelValue="onSearchInput"
        @change="onSearchInput"
        @clear="onSearchClear"
      />
    </view>

    <scroll-view scroll-y class="city-scroll" :scroll-into-view="scrollIntoId" :style="scrollStyle">
      <!-- 搜索状态下的结果展示 -->
      <template v-if="searchValue">
        <view class="search-results">
          <view class="search-header">
            <text class="search-count">共找到 {{ totalSearchResultCount }} 个城市</text>
          </view>
          
          <view class="city-list">
            <view v-for="group in filteredCityGroups" :key="group.letter">
              <view 
                v-for="city in group.list" 
                :key="city" 
                class="city-item result-item"
                @click="selectCity(city)"
              >
                <text class="city-name">{{ city }}</text>
                <text class="city-province">{{ group.letter }}</text>
              </view>
            </view>
          </view>

          <!-- 无搜索结果提示 -->
          <view v-if="filteredCityGroups.length === 0" class="no-results">
            <view class="empty-icon-wrapper">
              <t-icon name="info-circle" size="80rpx" color="#CBD5E1" />
            </view>
            <text class="empty-text">未找到相关城市</text>
            <text class="empty-sub-text">换个关键词试试吧</text>
          </view>
        </view>
      </template>

      <!-- 默认状态下的城市列表 -->
      <template v-else>
        <!-- 当前位置 -->
        <view class="section-title" id="top">当前位置</view>
        <view class="current-location">
          <view class="location-info">
            <t-icon name="location" size="32rpx" color="#000" />
            <text class="city-name">{{ cityStore.currentCity }}</text>
          </view>
          <text class="re-locate" @click="handleReLocate">重新定位</text>
        </view>

        <!-- 历史选择 -->
        <template v-if="historyCities.length > 0">
          <view class="section-title" id="history">历史选择</view>
          <view class="history-cities">
            <view 
              v-for="city in historyCities" 
              :key="city" 
              class="city-tag"
              @click="selectCity(city)"
            >
              {{ city }}
            </view>
          </view>
        </template>

        <!-- 热门城市 -->
        <view class="section-title" id="hot">热门城市</view>
        <view class="hot-cities">
          <view 
            v-for="city in hotCities" 
            :key="city" 
            class="hot-city-item"
            @click="selectCity(city)"
          >
            {{ city }}
          </view>
        </view>

        <!-- 城市列表标题 -->
        <view class="section-title">按城市选择</view>

        <view class="city-list">
          <view v-for="group in filteredCityGroups" :key="group.letter" :id="'letter-' + group.letter">
            <view class="letter-header">{{ group.letter }}</view>
            <view 
              v-for="city in group.list" 
              :key="city" 
              class="city-item"
              @click="selectCity(city)"
            >
              {{ city }}
            </view>
          </view>
        </view>
      </template>
    </scroll-view>

    <!-- 右侧索引栏 (搜索时隐藏) -->
    <view class="index-bar" v-if="!searchValue">
      <text class="index-item" @click="scrollTo('top')">定位</text>
      <text v-if="historyCities.length > 0" class="index-item" @click="scrollTo('history')">历史</text>
      <text class="index-item" @click="scrollTo('hot')">热门</text>
      <text 
        v-for="group in filteredCityGroups" 
        :key="group.letter" 
        class="index-item"
        @click="scrollTo(group.letter)"
      >
        {{ group.letter }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { cityData } from '@/utils/cityData';
import { useCityStore } from '@/stores/city';

const cityStore = useCityStore();
const searchValue = ref('');
const scrollIntoId = ref('');

const statusBarHeight = ref(0);
const menuButtonInfo = ref({ top: 0, height: 0 });

const historyCities = ref<string[]>([]); 
const hotCities = ['深圳', '广州', '北京', '上海', '济南', '石家庄', '重庆', '成都', '武汉', '长沙', '郑州', '南宁', '昆明', '南京', '西安', '贵阳', '福州', '哈尔滨', '杭州', '乌鲁木齐'];

const onSearchInput = (e: any) => {
  let val = '';
  if (typeof e === 'string') {
    val = e;
  } else if (e?.detail?.value !== undefined) {
    val = e.detail.value;
  } else if (e?.value !== undefined) {
    val = e.value;
  } else if (typeof e?.detail === 'string') {
    val = e.detail;
  }
  searchValue.value = val;
  console.log('searchValue updated to:', searchValue.value);
};

const onSearchClear = () => {
  searchValue.value = '';
};

// 计算导航栏样式
const navBarStyle = computed(() => {
  // #ifdef MP-WEIXIN
  const top = menuButtonInfo.value.top;
  const height = menuButtonInfo.value.height;
  // 增加上下 padding 让导航栏更丰满，更好地与胶囊融合
  return {
    paddingTop: `${top - 6}px`,
    paddingBottom: '12px',
    height: `${height + 12}px`,
    display: 'flex',
    alignItems: 'center'
  };
  // #endif

  // #ifndef MP-WEIXIN
  return {
    paddingTop: `${statusBarHeight.value}px`,
    height: '56px', // 非小程序也同步加大高度
    display: 'flex',
    alignItems: 'center'
  };
  // #endif
});

// 计算滚动区域高度
const scrollStyle = computed(() => {
  let headerHeight = 0;
  // #ifdef MP-WEIXIN
  // 这里的计算需要和 navBarStyle 保持一致：top - 6 + height + 12
  headerHeight = menuButtonInfo.value.top + menuButtonInfo.value.height + 6;
  // #endif
  // #ifndef MP-WEIXIN
  headerHeight = statusBarHeight.value + 56;
  // #endif
  
  // 还要加上搜索框的高度（约 100rpx）
  return {
    height: `calc(100vh - ${headerHeight}px - 100rpx)`
  };
});

// 加载历史记录
onMounted(() => {
  // 获取系统信息
  const systemInfo = uni.getSystemInfoSync();
  statusBarHeight.value = systemInfo.statusBarHeight || 0;
  
  // #ifdef MP-WEIXIN
  // 获取胶囊按钮位置
  const menuButton = uni.getMenuButtonBoundingClientRect();
  menuButtonInfo.value = menuButton;
  // #endif

  const history = uni.getStorageSync('city_history');
  if (history) {
    historyCities.value = JSON.parse(history);
  }
});

// 根据搜索关键词过滤城市
const filteredCityGroups = computed(() => {
  const keyword = (searchValue.value || '').trim().toLowerCase();
  if (!keyword) return cityData;
  
  const results = [];
  for (const group of cityData) {
    const list = group.list.filter(city => 
      city.toLowerCase().includes(keyword)
    );
    if (list.length > 0) {
      results.push({
        letter: group.letter,
        list: list
      });
    }
  }
  return results;
});

// 计算搜索结果总数
const totalSearchResultCount = computed(() => {
  return filteredCityGroups.value.reduce((total, group) => total + group.list.length, 0);
});

const handleBack = () => {
  uni.navigateBack({
    animationType: 'slide-out-bottom',
    animationDuration: 300
  });
};

const handleReLocate = () => {
  uni.showLoading({ title: '定位中...' });
  setTimeout(() => {
    uni.hideLoading();
    uni.showToast({ title: '已更新当前位置', icon: 'none' });
  }, 1000);
};

const selectCity = (city: string) => {
  // 保存到历史记录
  let history = [...historyCities.value];
  // 去重
  const index = history.indexOf(city);
  if (index > -1) {
    history.splice(index, 1);
  }
  // 置顶并限制数量（比如最多8个）
  history.unshift(city);
  if (history.length > 8) {
    history = history.slice(0, 8);
  }
  historyCities.value = history;
  uni.setStorageSync('city_history', JSON.stringify(history));

  // 更新全局状态
  cityStore.setCity(city);
  
  uni.navigateBack({
    animationType: 'slide-out-bottom',
    animationDuration: 300
  });
};

const scrollTo = (id: string) => {
  if (id === 'top') scrollIntoId.value = 'top';
  else if (id === 'history') scrollIntoId.value = 'history';
  else if (id === 'hot') scrollIntoId.value = 'hot';
  else scrollIntoId.value = 'letter-' + id;
};
</script>

<style lang="less" scoped>
.city-select-container {
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 32rpx;
  padding-right: 32rpx;
  background-color: #ffffff;
  box-sizing: content-box;

  .back-icon {
    width: 48rpx;
    height: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-title {
    font-size: 32rpx;
    font-weight: 500;
  }

  .placeholder {
    width: 48rpx;
  }
}

.search-section {
  padding: 10rpx 32rpx; /* 压缩搜索栏 */
  background-color: #ffffff;
}

.city-scroll {
  background-color: #ffffff;
}

.section-title {
  padding: 24rpx 32rpx 12rpx; /* 压缩分类标题间距 */
  font-size: 26rpx;
  color: #999;
  background-color: #ffffff;
}

.current-location {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8rpx 60rpx 12rpx 32rpx; /* 压缩定位区域 */
  background-color: #ffffff;
  .location-info {
    display: flex;
    align-items: center;
    gap: 12rpx;
    .city-name {
      font-size: 30rpx;
      font-weight: bold;
      color: #000;
    }
  }
  .re-locate {
    font-size: 26rpx;
    color: #3B82F6;
    font-weight: bold;
  }
}

.history-cities {
  padding: 8rpx 32rpx 12rpx; /* 压缩历史记录间距 */
  display: flex;
  flex-wrap: wrap;
  gap: 16rpx;
  .city-tag {
    min-width: 150rpx;
    height: 60rpx;
    background: #fff;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #333;
    padding: 0 16rpx;
  }
}

.hot-cities {
  padding: 8rpx 60rpx 12rpx 32rpx; /* 压缩热门城市间距 */
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  background-color: #ffffff;
  .hot-city-item {
    height: 64rpx;
    background: #fff;
    border: 1rpx solid #ddd;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26rpx;
    color: #333;
    &:active {
      background-color: #f0f0f0;
    }
  }
  .no-results {
    padding: 100rpx 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20rpx;
    color: #999;
    font-size: 28rpx;
  }
}

.city-list {
  background-color: #ffffff;
  .letter-header {
    padding: 8rpx 32rpx;
    font-size: 24rpx;
    color: #999;
    background-color: #f5f5f5;
  }
  .city-item {
    padding: 24rpx 60rpx 24rpx 32rpx; /* 压缩列表项高度 */
    font-size: 28rpx;
    color: #333;
    border-bottom: 1rpx solid #f5f5f5;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &:active {
      background-color: #f0f0f0;
    }

    .city-province {
      font-size: 24rpx;
      color: #ccc;
    }
  }
}

.search-results {
  .search-header {
    padding: 20rpx 32rpx;
    background-color: #f8fafc;
    .search-count {
      font-size: 24rpx;
      color: #64748b;
    }
  }

  .no-results {
    padding-top: 200rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .empty-icon-wrapper {
      width: 160rpx;
      height: 160rpx;
      background-color: #f1f5f9;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 32rpx;
    }

    .empty-text {
      font-size: 30rpx;
      font-weight: 600;
      color: #334155;
      margin-bottom: 12rpx;
    }

    .empty-sub-text {
      font-size: 26rpx;
      color: #94a3b8;
    }
  }
}

.index-bar {
  position: fixed;
  right: 6rpx;
  top: 50%;
  transform: translateY(-50%); /* 居中对齐 */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rpx; /* 调大字母间距，防止误触 */
  z-index: 10;
  .index-item {
    font-size: 20rpx;
    color: #666;
    padding: 6rpx 10rpx; /* 增加点击热区 */
    line-height: 1.1;
  }
}
</style>
