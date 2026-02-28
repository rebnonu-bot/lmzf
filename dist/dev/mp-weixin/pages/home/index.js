"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  _easycom_t_icon2();
}
const _easycom_t_icon = () => "../../node-modules/@tdesign/uniapp/dist/icon/icon.js";
if (!Math) {
  (LocationHeader + _easycom_t_icon + CustomTabBar)();
}
const CustomTabBar = () => "../../components/CustomTabBar.js";
const LocationHeader = () => "../../components/LocationHeader.js";
const targetPoints = 12993;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const activeTab = common_vendor.ref("home");
    const displayPoints = common_vendor.ref(0);
    const isLoggedIn = common_vendor.ref(true);
    const userInfo = common_vendor.ref({
      nickname: "梅菜扣肉",
      avatar: "/static/avatar1.png",
      level: "gold",
      // copper: 铜牌, silver: 银牌, gold: 金牌
      coins: 1250,
      coinLabel: "柠檬币",
      coupons: 3,
      joinDays: 12,
      inviteCount: 8
    });
    const levelConfig = {
      copper: {
        name: "铜牌推广者",
        bg: "linear-gradient(135deg, #A16207, #78350F)",
        color: "#FEF3C7",
        tagColor: "#A16207"
      },
      silver: {
        name: "银牌推广者",
        bg: "linear-gradient(135deg, #64748B, #334155)",
        color: "#F1F5F9",
        tagColor: "#64748B"
      },
      gold: {
        name: "金牌推广者",
        bg: "linear-gradient(135deg, #F59E0B, #D97706)",
        color: "#FFFBEB",
        tagColor: "#D97706"
      }
    };
    const currentLevel = common_vendor.computed(() => levelConfig[userInfo.value.level] || levelConfig.copper);
    const displayAmount = common_vendor.computed(() => {
      return (displayPoints.value / 100).toFixed(2);
    });
    const animatePoints = () => {
      const duration = 1500;
      const startTime = Date.now();
      const update = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutExpo = (x) => {
          return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        };
        displayPoints.value = Math.floor(easeOutExpo(progress) * targetPoints);
        if (progress < 1) {
          setTimeout(update, 16);
        }
      };
      update();
    };
    const handleLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const handleInvite = () => {
      common_vendor.index.showToast({ title: "邀请功能开发中", icon: "none" });
    };
    const handleOffline = () => {
      common_vendor.index.showToast({ title: "线下消费即将上线", icon: "none" });
    };
    const handleOnline = () => {
      common_vendor.index.showToast({ title: "线上购物即将上线", icon: "none" });
    };
    const copyWechat = () => {
      common_vendor.index.setClipboardData({
        data: "lingmeng2024",
        success: () => {
          common_vendor.index.showToast({
            title: "微信号已复制",
            icon: "success"
          });
        }
      });
    };
    const showPartnerDetail = (partner) => {
      const partnerInfo = {
        lmzj: { name: "邻檬智家", desc: "智慧社区服务提供商，致力于打造便民生活服务平台" },
        allinpay: { name: "通联支付", desc: "拥有央行支付牌照，提供安全稳定的支付通道服务" },
        psbc: { name: "邮储银行", desc: "国有大型商业银行，为资金提供托管保障" }
      };
      const info = partnerInfo[partner];
      if (info) {
        common_vendor.index.showModal({
          title: info.name,
          content: info.desc,
          showCancel: false,
          confirmText: "知道了"
        });
      }
    };
    common_vendor.onMounted(() => {
      animatePoints();
    });
    common_vendor.onShow(() => {
      activeTab.value = "home";
      common_vendor.index.hideTabBar();
    });
    common_vendor.onPullDownRefresh(() => {
      displayPoints.value = 0;
      animatePoints();
      setTimeout(() => {
        common_vendor.index.stopPullDownRefresh();
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success",
          duration: 800
        });
      }, 800);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(displayPoints.value),
        b: displayPoints.value >= 1e6 ? 1 : "",
        c: displayPoints.value >= 1e7 ? 1 : "",
        d: common_vendor.t(displayAmount.value),
        e: common_vendor.p({
          name: "chevron-right",
          size: "24rpx"
        }),
        f: common_vendor.p({
          name: "logo-alipay",
          size: "22rpx"
        }),
        g: common_vendor.p({
          name: "logo-wechatpay",
          size: "22rpx"
        }),
        h: common_vendor.p({
          name: "secured",
          size: "20rpx"
        }),
        i: common_vendor.p({
          name: "logo-miniprogram",
          size: "20rpx"
        }),
        j: !isLoggedIn.value
      }, !isLoggedIn.value ? {
        k: common_assets._imports_0,
        l: common_vendor.o(handleLogin)
      } : {
        m: userInfo.value.avatar,
        n: common_vendor.t(userInfo.value.nickname),
        o: common_vendor.t(currentLevel.value.name),
        p: currentLevel.value.bg,
        q: currentLevel.value.color,
        r: common_vendor.t(userInfo.value.joinDays),
        s: currentLevel.value.tagColor,
        t: common_vendor.t(userInfo.value.inviteCount),
        v: currentLevel.value.tagColor,
        w: common_vendor.t(userInfo.value.coins),
        x: common_vendor.t(userInfo.value.coinLabel),
        y: common_vendor.t(userInfo.value.coupons)
      }, {
        z: common_vendor.p({
          name: "chevron-right",
          size: "28rpx",
          color: "#ffffff"
        }),
        A: common_vendor.o(handleInvite),
        B: common_vendor.p({
          name: "gift",
          size: "36rpx",
          color: "#3B82F6"
        }),
        C: common_vendor.p({
          name: "shop",
          size: "80rpx",
          color: "rgba(59, 130, 246, 0.15)"
        }),
        D: common_vendor.p({
          name: "shop",
          size: "40rpx",
          color: "#3B82F6"
        }),
        E: common_vendor.p({
          name: "chevron-right",
          size: "32rpx",
          color: "#CBD5E1"
        }),
        F: common_vendor.o(handleOffline),
        G: common_vendor.p({
          name: "internet",
          size: "80rpx",
          color: "rgba(245, 158, 11, 0.15)"
        }),
        H: common_vendor.p({
          name: "internet",
          size: "40rpx",
          color: "#F59E0B"
        }),
        I: common_vendor.p({
          name: "chevron-right",
          size: "32rpx",
          color: "#CBD5E1"
        }),
        J: common_vendor.o(handleOnline),
        K: common_vendor.p({
          name: "heart",
          size: "36rpx",
          color: "#10B981"
        }),
        L: common_assets._imports_1,
        M: common_vendor.o(($event) => showPartnerDetail("lmzj")),
        N: common_assets._imports_2,
        O: common_vendor.o(($event) => showPartnerDetail("allinpay")),
        P: common_assets._imports_3,
        Q: common_vendor.o(($event) => showPartnerDetail("psbc")),
        R: common_vendor.p({
          name: "secured",
          size: "28rpx",
          color: "#10B981"
        }),
        S: common_vendor.p({
          name: "check-circle",
          size: "28rpx",
          color: "#3B82F6"
        }),
        T: common_vendor.p({
          name: "lock-on",
          size: "28rpx",
          color: "#F59E0B"
        }),
        U: common_vendor.p({
          name: "chat",
          size: "36rpx",
          color: "#3B82F6"
        }),
        V: common_vendor.p({
          name: "chat",
          size: "40rpx",
          color: "#07C160"
        }),
        W: common_vendor.o(copyWechat),
        X: common_vendor.p({
          name: "time",
          size: "40rpx",
          color: "#F59E0B"
        }),
        Y: common_vendor.p({
          active: activeTab.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2c5296db"]]);
wx.createPage(MiniProgramPage);
