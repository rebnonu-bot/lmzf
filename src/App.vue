<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { reactive } from "vue";
import config from "./config";
import { initMock } from "./mock/index";
import createBus from "./utils/eventBus";

// 初始化 Mock 数据
if (config.isMock) {
  initMock();
}

// 全局状态
const globalData = reactive({
  userInfo: null,
});

// 全局事件总线
const eventBus = createBus();

// 将全局状态挂载到 uni 上
(uni as any).$globalData = globalData;
(uni as any).$eventBus = eventBus;

onLaunch(() => {
  console.log("App Launch");
  
  // #ifdef MP-WEIXIN
  const updateManager = uni.getUpdateManager();
  updateManager.onUpdateReady(() => {
    uni.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success(res) {
        if (res.confirm) {
          updateManager.applyUpdate();
        }
      },
    });
  });
  // #endif
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

// 导出全局方法供页面使用
// export { globalData, eventBus, setUnreadNum, getUnreadNum };
</script>

<style lang="less">
@import '@tdesign/uniapp/common/style/theme/index.less';

/* 全局样式 */
page {
  background-color: #f3f3f3;
  overflow: hidden; /* 禁用全局滚动，防止侧边滑动 */
  width: 100vw;
  height: 100vh;
}

::-webkit-scrollbar {
  display: none; /* 隐藏所有滚动条 */
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
}

.page {
  height: 100vh;
  background-color: #fff;
  overflow: hidden;
}
</style>
