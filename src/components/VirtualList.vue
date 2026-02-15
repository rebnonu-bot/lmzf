<template>
  <scroll-view
    class="virtual-list"
    :scroll-y="true"
    :style="{ height: containerHeight }"
    @scroll="onScroll"
    :scroll-top="scrollTop"
    scroll-with-animation
  >
    <!-- 占位容器，用于撑开滚动区域 -->
    <view class="virtual-list__phantom" :style="{ height: `${totalHeight}px` }">
      <!-- 可视区域 -->
      <view class="virtual-list__content" :style="{ transform: `translateY(${offset}px)` }">
        <view
          v-for="item in visibleData"
          :key="item.key"
          class="virtual-list__item"
          :style="{ height: `${itemHeight}px` }"
        >
          <slot :item="item.data" :index="item.index" />
        </view>
      </view>
    </view>
    <!-- 加载更多 -->
    <view v-if="loadingMore" class="virtual-list__loading">
      <text>加载中...</text>
    </view>
    <view v-if="noMore && data.length > 0" class="virtual-list__no-more">
      <text>没有更多了</text>
    </view>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  /** 数据列表 */
  data: any[]
  /** 每项高度（rpx） */
  itemHeight: number
  /** 容器高度（rpx 或 css 值） */
  containerHeight: string
  /** 缓冲区大小（上下各多渲染的数量） */
  bufferSize?: number
  /** 是否正在加载更多 */
  loadingMore?: boolean
  /** 是否没有更多了 */
  noMore?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  bufferSize: 3,
  loadingMore: false,
  noMore: false,
})

const emit = defineEmits<{
  /** 滚动事件 */
  (e: 'scroll', event: { scrollTop: number }): void
  /** 滚动到底部 */
  (e: 'scrolltolower'): void
}>()

// 滚动位置
const scrollTop = ref(0)
// 偏移量
const offset = ref(0)

// 将 rpx 转换为 px（假设屏幕宽度 750rpx = 设备宽度）
function rpxToPx(rpx: number): number {
  const systemInfo = uni.getSystemInfoSync()
  return (rpx * systemInfo.windowWidth) / 750
}

// 计算属性
const itemHeightPx = computed(() => rpxToPx(props.itemHeight))

const containerHeightPx = computed(() => {
  // 如果已经是 px 或数字，直接返回
  if (typeof props.containerHeight === 'number') {
    return props.containerHeight
  }
  // 如果是 rpx，转换
  if (props.containerHeight.endsWith('rpx')) {
    return rpxToPx(parseInt(props.containerHeight))
  }
  // 如果是 px，直接解析
  if (props.containerHeight.endsWith('px')) {
    return parseInt(props.containerHeight)
  }
  return rpxToPx(750) // 默认全屏高度
})

// 总高度
const totalHeight = computed(() => props.data.length * props.itemHeight)

// 可视区域能显示的数量
const visibleCount = computed(() => {
  return Math.ceil(containerHeightPx.value / itemHeightPx.value) + props.bufferSize * 2
})

// 起始索引
const startIndex = computed(() => {
  const index = Math.floor(scrollTop.value / itemHeightPx.value)
  return Math.max(0, index - props.bufferSize)
})

// 结束索引
const endIndex = computed(() => {
  return Math.min(props.data.length, startIndex.value + visibleCount.value)
})

// 可视数据
const visibleData = computed(() => {
  return props.data.slice(startIndex.value, endIndex.value).map((item, index) => ({
    data: item,
    index: startIndex.value + index,
    key: `item-${startIndex.value + index}`,
  }))
})

// 更新偏移量
watch(startIndex, (newVal) => {
  offset.value = newVal * itemHeightPx.value
})

// 滚动处理
let scrollTimer: ReturnType<typeof setTimeout> | null = null

function onScroll(e: any) {
  const newScrollTop = e.detail.scrollTop
  scrollTop.value = newScrollTop
  
  emit('scroll', { scrollTop: newScrollTop })
  
  // 防抖处理滚动到底部
  if (scrollTimer) clearTimeout(scrollTimer)
  scrollTimer = setTimeout(() => {
    const threshold = 100 // 距离底部 100px 触发
    const isReachBottom = totalHeight.value - newScrollTop - containerHeightPx.value < threshold
    
    if (isReachBottom && !props.loadingMore && !props.noMore) {
      emit('scrolltolower')
    }
  }, 100)
}

// 暴露方法给父组件
defineExpose({
  /** 滚动到指定索引 */
  scrollToIndex(index: number) {
    scrollTop.value = index * itemHeightPx.value
  },
  /** 滚动到顶部 */
  scrollToTop() {
    scrollTop.value = 0
  },
})
</script>

<style lang="less" scoped>
.virtual-list {
  position: relative;
  overflow: hidden;

  &__phantom {
    position: relative;
    width: 100%;
  }

  &__content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    will-change: transform;
  }

  &__item {
    box-sizing: border-box;
  }

  &__loading,
  &__no-more {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80rpx;
    color: #999;
    font-size: 24rpx;
  }
}
</style>
