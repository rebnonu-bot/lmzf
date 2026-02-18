<script setup lang="ts">
import { onLaunch, onShow, onHide, onError, onPageNotFound, onUnhandledRejection } from "@dcloudio/uni-app";
import { reactive } from "vue";
import config from "./config";
import { initMock } from "./mock/index";
import createBus from "./utils/eventBus";
import type { GlobalData } from "./types/global.d";

// 初始化 Mock 数据
if (config.api.enableMock) {
  initMock();
}

// 全局状态
const globalData = reactive<GlobalData>({
  userInfo: null,
});

// 全局事件总线
const eventBus = createBus();

// 将全局状态挂载到 uni 上
uni.$globalData = globalData;
uni.$eventBus = eventBus;

onLaunch(() => {
  console.log("App Launch");
  
  // 解决小程序图标字体加载问题
  uni.loadFontFace({
    family: 't',
    source: 'url("/static/fonts/t.ttf")',
    global: true, // 设置为全局生效
    success: () => console.log('font-face load success'),
    fail: (err) => console.log('font-face load fail', err)
  });
  
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

// 全局错误处理
onError((err) => {
  console.error('[Global Error]', err);
  // 可以在这里上报错误到监控服务
  if (config.features.enableLogReport) {
    // 上报错误日志
    uni.request({
      url: `${config.api.baseUrl}/log/error`,
      method: 'POST',
      data: {
        error: String(err),
        timestamp: Date.now(),
        platform: uni.getSystemInfoSync().platform,
      },
    });
  }
});

// 未处理的 Promise 拒绝
onUnhandledRejection((res) => {
  console.error('[Unhandled Rejection]', res);
});

// 页面不存在处理
onPageNotFound((res) => {
  console.error('[Page Not Found]', res.path);
  uni.redirectTo({
    url: '/pages/error/index?message=页面不存在'
  });
});

// 导出全局方法供页面使用
// export { globalData, eventBus, setUnreadNum, getUnreadNum };
</script>

<style lang="less">
@import '@tdesign/uniapp/common/style/theme/index.less';

/* 修复小程序下 TDesign 图标字体加载失败问题 */
@font-face {
  font-family: 't';
  src: url('~@/static/fonts/t.ttf') format('truetype');
}

/* 全局样式 */
page {
  background-color: #f3f3f3;
  overflow: hidden; /* 禁用全局滚动，防止侧边滑动 */
  width: 100vw;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica,
    Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei',
    sans-serif;
  -webkit-font-smoothing: antialiased;
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

/* 图片懒加载样式 */
.lazy-loading {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.lazy-loaded {
  opacity: 1;
  transition: opacity 0.3s ease;
}

.lazy-error {
  opacity: 1;
  filter: grayscale(100%);
}
</style>
