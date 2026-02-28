"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const TLoading = () => "../loading/loading.js";
const name = `${common_vendor.prefix}-button`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-icon`,
    `${common_vendor.prefix}-class-loading`
  ],
  components: {
    TIcon,
    TLoading
  },
  props: {
    ...common_vendor.props$4
  },
  emits: [
    "click"
  ],
  data() {
    return {
      tools: common_vendor.tools,
      prefix: common_vendor.prefix,
      className: "",
      classPrefix: name,
      _icon: void 0
    };
  },
  computed: {
    iconCustomStyle() {
      const fontSize = {
        "extra-small": "var(--td-button-extra-small-icon-font-size, 18px)",
        small: "var(--td-button-small-icon-font-size, 18px)",
        medium: "var(--td-button-medium-icon-font-size, 20px)",
        large: "var(--td-button-large-icon-font-size, 24px)"
      };
      return common_vendor.tools._style([
        {
          fontSize: fontSize[this.size || "medium"],
          borderRadius: "var(--td-button-icon-border-radius, 4px)"
        },
        this._icon.style || ""
      ]);
    },
    loadingCustomStyle() {
      return common_vendor.tools._style({
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      });
    }
  },
  watch: {
    icon: {
      handler(value) {
        this._icon = common_vendor.calcIcon(value, "");
      },
      immediate: true
    },
    theme: "setClass",
    size: "setClass",
    plain: "setClass",
    block: "setClass",
    shape: "setClass",
    disabled: "setClass",
    loading: "setClass",
    variant: "setClass"
  },
  mounted() {
    this.setClass();
  },
  methods: {
    setClass() {
      const t = [
        name,
        this.tClass,
        `${name}--${this.variant || "base"}`,
        `${name}--${this.theme || "default"}`,
        `${name}--${this.shape || "rectangle"}`,
        `${name}--size-${this.size || "medium"}`
      ];
      if (this.block) {
        t.push(`${name}--block`);
      }
      if (this.disabled) {
        t.push(`${name}--disabled`);
      }
      if (this.ghost) {
        t.push(`${name}--ghost`);
      }
      this.className = t.join(" ");
    },
    getuserinfo(t) {
      this.$emit("getuserinfo", t);
    },
    contact(t) {
      this.$emit("contact", t);
    },
    getphonenumber(t) {
      this.$emit("getphonenumber", t);
    },
    error(t) {
      this.$emit("error", t);
    },
    opensetting(t) {
      this.$emit("opensetting", t);
    },
    launchapp(t) {
      this.$emit("launchapp", t);
    },
    chooseavatar(t) {
      this.$emit("chooseavatar", t);
    },
    agreeprivacyauthorization(t) {
      this.$emit("agreeprivacyauthorization", t);
    },
    handleTap(t) {
      if (this.disabled || this.loading)
        return;
      this.$emit("click", t);
    }
  }
});
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_loading2 = common_vendor.resolveComponent("t-loading");
  (_easycom_t_icon2 + _easycom_t_loading2)();
}
const _easycom_t_icon = () => "../icon/icon.js";
const _easycom_t_loading = () => "../loading/loading.js";
if (!Math) {
  (_easycom_t_icon + _easycom_t_loading)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx._icon
  }, _ctx._icon ? {
    b: common_vendor.o(($event) => "handleClose"),
    c: common_vendor.p({
      ["custom-style"]: _ctx.iconCustomStyle,
      ["t-class"]: _ctx.classPrefix + "__icon " + _ctx.classPrefix + "__icon--" + (_ctx._icon.activeIdx == _ctx._icon.index ? "active " : " ") + _ctx.tClassIcon,
      prefix: _ctx._icon.prefix,
      name: _ctx._icon.name || "",
      size: _ctx._icon.size,
      color: _ctx._icon.color
    })
  } : {}, {
    d: _ctx.loading
  }, _ctx.loading ? {
    e: common_vendor.p({
      delay: _ctx.loadingProps.delay || 0,
      duration: _ctx.loadingProps.duration || 800,
      indicator: _ctx.loadingProps.indicator || true,
      ["inherit-color"]: _ctx.loadingProps.inheritColor || true,
      layout: _ctx.loadingProps.layout || "horizontal",
      pause: _ctx.loadingProps.pause || false,
      progress: _ctx.loadingProps.progress || 0,
      reverse: _ctx.loadingProps.reverse || false,
      size: _ctx.loadingProps.size || "40rpx",
      text: _ctx.loadingProps.text || "",
      theme: _ctx.loadingProps.theme || "circular",
      loading: true,
      ["t-class"]: _ctx.classPrefix + "__loading " + _ctx.classPrefix + "__loading--wrapper",
      ["t-class-indicator"]: _ctx.classPrefix + "__loading--indicator " + _ctx.tClassLoading,
      ["custom-style"]: _ctx.loadingCustomStyle
    })
  } : {}, {
    f: _ctx.content
  }, _ctx.content ? {
    g: common_vendor.t(_ctx.content)
  } : {}, {
    h: common_vendor.n(_ctx.classPrefix + "__content " + ((_ctx._icon && _ctx._icon.name || _ctx.loading) && _ctx.content ? _ctx.classPrefix + "__content--has-icon" : "")),
    i: _ctx.tId,
    j: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    k: _ctx.customDataset,
    l: common_vendor.n(_ctx.className),
    m: _ctx.activityType ? _ctx.activityType : "",
    n: _ctx.entrancePath,
    o: _ctx.disabled || _ctx.loading ? "" : _ctx.type,
    p: _ctx.disabled || _ctx.loading ? "" : _ctx.openType,
    q: _ctx.hoverStopPropagation,
    r: _ctx.hoverStartTime,
    s: _ctx.hoverStayTime,
    t: _ctx.lang,
    v: _ctx.needShowEntrance,
    w: _ctx.sessionFrom,
    x: _ctx.disabled || _ctx.loading ? "" : _ctx.hoverClass || _ctx.classPrefix + "--hover",
    y: _ctx.sendMessageTitle,
    z: _ctx.sendMessagePath,
    A: _ctx.sendMessageImg,
    B: _ctx.appParameter,
    C: _ctx.showMessageCard,
    D: _ctx.ariaLabel,
    E: common_vendor.o((...args) => _ctx.handleTap && _ctx.handleTap(...args)),
    F: common_vendor.o((...args) => _ctx.getuserinfo && _ctx.getuserinfo(...args)),
    G: common_vendor.o((...args) => _ctx.contact && _ctx.contact(...args)),
    H: common_vendor.o((...args) => _ctx.getphonenumber && _ctx.getphonenumber(...args)),
    I: common_vendor.o((...args) => _ctx.error && _ctx.error(...args)),
    J: common_vendor.o((...args) => _ctx.opensetting && _ctx.opensetting(...args)),
    K: common_vendor.o((...args) => _ctx.launchapp && _ctx.launchapp(...args)),
    L: common_vendor.o((...args) => _ctx.chooseavatar && _ctx.chooseavatar(...args)),
    M: common_vendor.o((...args) => _ctx.agreeprivacyauthorization && _ctx.agreeprivacyauthorization(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-38be560e"]]);
wx.createComponent(Component);
