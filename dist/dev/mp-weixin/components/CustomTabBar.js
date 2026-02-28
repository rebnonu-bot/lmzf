"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  _easycom_t_icon2();
}
const _easycom_t_icon = () => "../node-modules/@tdesign/uniapp/dist/icon/icon.js";
if (!Math) {
  _easycom_t_icon();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "CustomTabBar",
  props: {
    active: {}
  },
  setup(__props) {
    const props = __props;
    const localActive = common_vendor.ref(props.active);
    common_vendor.watch(() => props.active, (newVal) => {
      localActive.value = newVal;
    }, { immediate: true });
    common_vendor.onMounted(() => {
      localActive.value = props.active;
    });
    const goTo = (url) => {
      common_vendor.index.switchTab({ url });
    };
    const handleScan = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scan/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: localActive.value === "home" ? "home-filled" : "home",
          size: "48rpx",
          color: localActive.value === "home" ? "#3b82f6" : "#64748b"
        }),
        b: localActive.value === "home" ? 1 : "",
        c: common_vendor.o(($event) => goTo("/pages/home/index")),
        d: common_vendor.p({
          name: "qrcode",
          size: "56rpx",
          color: "#fff"
        }),
        e: common_vendor.o(handleScan),
        f: common_vendor.p({
          name: localActive.value === "my" ? "user-filled" : "user",
          size: "48rpx",
          color: localActive.value === "my" ? "#3b82f6" : "#64748b"
        }),
        g: localActive.value === "my" ? 1 : "",
        h: common_vendor.o(($event) => goTo("/pages/my/index"))
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-55a48eff"]]);
wx.createComponent(Component);
