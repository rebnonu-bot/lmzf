<template>
  <view class="safe-area" :style="safeAreaStyle">
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

interface Props {
  /** 安全区域位置：top | bottom | both */
  position?: 'top' | 'bottom' | 'both'
  /** 是否包含导航栏（top时有效） */
  includeNavBar?: boolean
  /** 是否包含 TabBar（bottom时有效） */
  includeTabBar?: boolean
  /** 额外的顶部间距 */
  extraTop?: number
  /** 额外的底部间距 */
  extraBottom?: number
  /** 背景色 */
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  position: 'both',
  includeNavBar: false,
  includeTabBar: false,
  extraTop: 0,
  extraBottom: 0,
  backgroundColor: 'transparent',
})

// 系统信息
const systemInfo = ref<UniApp.GetSystemInfoResult>({
  statusBarHeight: 0,
  screenHeight: 0,
  windowHeight: 0,
  safeArea: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
  },
  safeAreaInsets: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
} as UniApp.GetSystemInfoResult)

// 导航栏高度
const navBarHeight = computed(() => {
  // #ifdef MP-WEIXIN
  const menuButton = uni.getMenuButtonBoundingClientRect()
  return menuButton.height + (menuButton.top - (systemInfo.value.statusBarHeight || 0)) * 2
  // #endif
  
  // #ifndef MP-WEIXIN
  return 44 // 默认导航栏高度
  // #endif
})

// TabBar 高度
const tabBarHeight = 50 // 默认 TabBar 高度

// 计算安全区域样式
const safeAreaStyle = computed(() => {
  const style: Record<string, string> = {
    backgroundColor: props.backgroundColor,
  }

  const safeAreaInsets = systemInfo.value.safeAreaInsets
  // safeAreaInsets 用于计算顶部和底部安全区域

  // 顶部安全区域
  if (props.position === 'top' || props.position === 'both') {
    let topPadding = (safeAreaInsets?.top || 0) + props.extraTop
    
    // 如果包含导航栏，加上导航栏高度
    if (props.includeNavBar) {
      topPadding += navBarHeight.value
    }
    
    style.paddingTop = `${topPadding}px`
  }

  // 底部安全区域
  if (props.position === 'bottom' || props.position === 'both') {
    let bottomPadding = (safeAreaInsets?.bottom || 0) + props.extraBottom
    
    // 如果包含 TabBar，加上 TabBar 高度
    if (props.includeTabBar) {
      bottomPadding += tabBarHeight
    }
    
    style.paddingBottom = `${bottomPadding}px`
  }

  return style
})

onMounted(() => {
  systemInfo.value = uni.getSystemInfoSync()
})
</script>

<style lang="scss" scoped>
.safe-area {
  width: 100%;
  box-sizing: border-box;
}
</style>
