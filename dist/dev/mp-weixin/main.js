"use strict";
const common_vendor = require("./common/vendor.js");
const mock_index = require("./mock/index.js");
const utils_eventBus = require("./utils/eventBus.js");
if (!Math) {
  "./pages/home/index.js";
  "./pages/my/index.js";
  "./pages/scan/index.js";
  "./pages/city-select/index.js";
  "./pages/login/login.js";
}
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  _easycom_t_icon2();
}
const _easycom_t_icon = () => "./node-modules/@tdesign/uniapp/dist/icon/icon.js";
if (!Math) {
  _easycom_t_icon();
}
const _sfc_main$1 = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "LocationHeader",
  setup(__props) {
    const menuButtonInfo = common_vendor.ref({ top: 0, height: 0 });
    common_vendor.onMounted(() => {
      const menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
      menuButtonInfo.value = menuButton;
      const centerY = menuButton.top + menuButton.height / 2;
      const textHeight = 20;
      const textTop = centerY - textHeight / 2;
      brandLocationTop.value = `${textTop}px`;
      common_vendor.index.$on("updateCity", handleCityUpdate);
    });
    const currentCity = common_vendor.ref("赣州");
    const isLocated = common_vendor.ref(false);
    const brandLocationTop = common_vendor.ref("60px");
    const displayCityName = common_vendor.computed(() => {
      if (isLocated.value) {
        return currentCity.value.replace("市", "");
      } else {
        return "选择城市";
      }
    });
    const headerStyle = common_vendor.computed(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const statusBarHeight = systemInfo.statusBarHeight || 44;
      return {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: `${statusBarHeight + 44}px`,
        // 状态栏 + 44px内容区
        zIndex: 100
      };
    });
    const goToCitySelect = () => {
      common_vendor.index.navigateTo({
        url: "/pages/city-select/index",
        animationType: "slide-in-bottom",
        animationDuration: 300
      });
    };
    const handleCityUpdate = (city) => {
      currentCity.value = city;
      isLocated.value = true;
    };
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("updateCity", handleCityUpdate);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(displayCityName.value),
        b: common_vendor.p({
          name: "chevron-down",
          size: "32rpx",
          color: "#fff"
        }),
        c: brandLocationTop.value,
        d: common_vendor.o(goToCitySelect),
        e: common_vendor.s(headerStyle.value)
      };
    };
  }
});
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "App",
  setup(__props) {
    {
      mock_index.initMock();
    }
    const globalData = common_vendor.reactive({
      userInfo: null
    });
    const eventBus = utils_eventBus.createBus();
    common_vendor.index.$globalData = globalData;
    common_vendor.index.$eventBus = eventBus;
    common_vendor.onLaunch(() => {
      console.log("App Launch");
      common_vendor.index.loadFontFace({
        family: "t",
        source: 'url("/static/fonts/t.ttf")',
        global: true,
        // 设置为全局生效
        success: () => console.log("font-face load success"),
        fail: (err) => console.log("font-face load fail", err)
      });
      const updateManager = common_vendor.index.getUpdateManager();
      updateManager.onUpdateReady(() => {
        common_vendor.index.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      });
    });
    common_vendor.onShow(() => {
      console.log("App Show");
    });
    common_vendor.onHide(() => {
      console.log("App Hide");
    });
    return () => {
    };
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports._sfc_main = _sfc_main$1;
exports.createApp = createApp;
