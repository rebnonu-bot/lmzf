<template>
  <view class="empty-state" :style="customStyle">
    <!-- 图标区域 -->
    <view class="empty-icon" :class="{ 'empty-icon-small': size === 'small' }">
      <t-icon v-if="iconName" :name="iconName" :size="iconSize" :color="iconColor" />
      <image v-else-if="iconImage" :src="iconImage" class="custom-icon" mode="aspectFit" />
      <slot name="icon" />
    </view>

    <!-- 标题 -->
    <text v-if="title" class="empty-title" :class="{ 'title-small': size === 'small' }">
      {{ title }}
    </text>

    <!-- 描述 -->
    <text v-if="description" class="empty-description" :class="{ 'desc-small': size === 'small' }">
      {{ description }}
    </text>

    <!-- 操作按钮 -->
    <view v-if="showAction" class="empty-action">
      <t-button
        :theme="buttonTheme"
        :size="buttonSize"
        :shape="buttonShape"
        @click="handleAction"
      >
        {{ buttonText }}
      </t-button>
    </view>

    <!-- 自定义内容 -->
    <slot />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** 图标名称（TDesign图标） */
  iconName?: string
  /** 自定义图标图片地址 */
  iconImage?: string
  /** 图标大小 */
  iconSize?: string
  /** 图标颜色 */
  iconColor?: string
  /** 标题 */
  title?: string
  /** 描述 */
  description?: string
  /** 尺寸：large | medium | small */
  size?: 'large' | 'medium' | 'small'
  /** 是否显示操作按钮 */
  showAction?: boolean
  /** 按钮文字 */
  buttonText?: string
  /** 按钮主题 */
  buttonTheme?: 'default' | 'primary' | 'danger' | 'light'
  /** 按钮尺寸 */
  buttonSize?: 'small' | 'medium' | 'large'
  /** 按钮形状 */
  buttonShape?: 'rectangle' | 'square' | 'round' | 'circle'
  /** 自定义样式 */
  customStyle?: Record<string, string>
}

const props = withDefaults(defineProps<Props>(), {
  iconName: 'info-circle',
  iconSize: '120rpx',
  iconColor: '#CBD5E1',
  size: 'medium',
  showAction: false,
  buttonText: '去逛逛',
  buttonTheme: 'primary',
  buttonSize: 'medium',
  buttonShape: 'round',
})

const emit = defineEmits<{
  action: []
}>()

// 根据尺寸调整图标大小
const iconSize = computed(() => {
  if (props.iconSize !== '120rpx') return props.iconSize
  const sizeMap = {
    large: '160rpx',
    medium: '120rpx',
    small: '80rpx',
  }
  return sizeMap[props.size]
})

const handleAction = () => {
  emit('action')
}
</script>

<style lang="scss" scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80rpx 48rpx;
  box-sizing: border-box;
}

.empty-icon {
  margin-bottom: 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.empty-icon-small {
    margin-bottom: 16rpx;
  }
}

.custom-icon {
  width: 120rpx;
  height: 120rpx;
}

.empty-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16rpx;
  text-align: center;

  &.title-small {
    font-size: 28rpx;
    margin-bottom: 8rpx;
  }
}

.empty-description {
  font-size: 28rpx;
  color: #64748b;
  text-align: center;
  line-height: 1.6;
  margin-bottom: 48rpx;

  &.desc-small {
    font-size: 24rpx;
    margin-bottom: 24rpx;
  }
}

.empty-action {
  margin-top: 16rpx;
}
</style>
