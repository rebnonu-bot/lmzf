"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_t_avatar2 = common_vendor.resolveComponent("t-avatar");
  const _easycom_t_tag2 = common_vendor.resolveComponent("t-tag");
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_cell2 = common_vendor.resolveComponent("t-cell");
  const _easycom_t_cell_group2 = common_vendor.resolveComponent("t-cell-group");
  const _easycom_t_button2 = common_vendor.resolveComponent("t-button");
  (_easycom_t_avatar2 + _easycom_t_tag2 + _easycom_t_icon2 + _easycom_t_cell2 + _easycom_t_cell_group2 + _easycom_t_button2)();
}
const _easycom_t_avatar = () => "../../node-modules/@tdesign/uniapp/dist/avatar/avatar.js";
const _easycom_t_tag = () => "../../node-modules/@tdesign/uniapp/dist/tag/tag.js";
const _easycom_t_icon = () => "../../node-modules/@tdesign/uniapp/dist/icon/icon.js";
const _easycom_t_cell = () => "../../node-modules/@tdesign/uniapp/dist/cell/cell.js";
const _easycom_t_cell_group = () => "../../node-modules/@tdesign/uniapp/dist/cell-group/cell-group.js";
const _easycom_t_button = () => "../../node-modules/@tdesign/uniapp/dist/button/button.js";
if (!Math) {
  (_easycom_t_avatar + _easycom_t_tag + _easycom_t_icon + _easycom_t_cell + _easycom_t_cell_group + _easycom_t_button + CustomTabBar)();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const activeTab = common_vendor.ref("my");
    const statusBarHeight = common_vendor.ref(0);
    const menuButtonInfo = common_vendor.ref({ top: 0, height: 0 });
    common_vendor.onShow(() => {
      activeTab.value = "my";
      common_vendor.index.hideTabBar();
    });
    common_vendor.onPullDownRefresh(() => {
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success",
          duration: 800
        });
      }, 800);
    });
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      statusBarHeight.value = systemInfo.statusBarHeight || 0;
      const menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
      menuButtonInfo.value = menuButton;
    });
    const headerStyle = common_vendor.computed(() => {
      const top = menuButtonInfo.value.top;
      const height = menuButtonInfo.value.height;
      return {
        paddingTop: `${top - 6}px`,
        paddingBottom: "12px",
        height: `${height + 12}px`
      };
    });
    const userInfo = common_vendor.ref({
      name: "柠檬用户",
      avatar: "/static/avatar1.png"
    });
    const handleSetting = () => {
      common_vendor.index.showToast({ title: "设置", icon: "none" });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({ url: "/pages/login/login" });
          }
        }
      });
    };
    const handleInvite = () => {
      common_vendor.index.showToast({ title: "邀请功能开发中", icon: "none" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.s(headerStyle.value),
        b: common_vendor.p({
          image: userInfo.value.avatar,
          size: "large"
        }),
        c: common_vendor.t(userInfo.value.name),
        d: common_vendor.p({
          variant: "light",
          theme: "primary",
          size: "small"
        }),
        e: common_vendor.o(handleSetting),
        f: common_vendor.p({
          name: "setting",
          size: "48rpx",
          color: "#64748B"
        }),
        g: common_vendor.p({
          name: "chevron-right",
          size: "28rpx",
          color: "#ffffff"
        }),
        h: common_vendor.o(handleInvite),
        i: common_vendor.p({
          title: "支付设置",
          ["left-icon"]: "secured",
          hover: true,
          arrow: true
        }),
        j: common_vendor.p({
          title: "账单记录",
          ["left-icon"]: "bill",
          hover: true,
          arrow: true
        }),
        k: common_vendor.p({
          title: "帮助与客服",
          ["left-icon"]: "service",
          hover: true,
          arrow: true
        }),
        l: common_vendor.p({
          title: "关于邻檬智付",
          ["left-icon"]: "info-circle",
          hover: true,
          arrow: true
        }),
        m: common_vendor.p({
          theme: "card"
        }),
        n: common_vendor.o(handleLogout),
        o: common_vendor.p({
          theme: "light",
          variant: "text",
          block: true
        }),
        p: common_vendor.p({
          active: activeTab.value
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-276ac604"]]);
wx.createPage(MiniProgramPage);
