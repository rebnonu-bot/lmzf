<template>
  <t-tab-bar fixed placeholder :value="value" theme="tag" :split="false" @change="handleChange">
    <t-tab-bar-item icon="home" value="home">首页</t-tab-bar-item>
    <t-tab-bar-item icon="user" value="my">我的</t-tab-bar-item>
  </t-tab-bar>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const value = ref('');

// 获取当前页面对应的 tab 值
const getCurrentTabValue = () => {
  const pages = getCurrentPages();
  const curPage = pages[pages.length - 1];
  if (curPage) {
    const route = (curPage as any).route || '';
    const nameRe = /pages\/(\w+)\/index/.exec(route);
    if (nameRe && nameRe[1]) {
      return nameRe[1];
    }
  }
  return '';
};

// 同步状态
const syncState = () => {
  value.value = getCurrentTabValue();
};

onMounted(() => {
  syncState();
});

const handleChange = (e: any) => {
  const val = e?.value
  if (val === value.value) {
    return;
  }
  
  uni.redirectTo({ 
    url: `/pages/${val}/index`
  });
};
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';

:deep(.t-tab-bar) {
  --td-tab-bar-active-color: #3B82F6;
  --td-tab-bar-bg-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
}
</style>
