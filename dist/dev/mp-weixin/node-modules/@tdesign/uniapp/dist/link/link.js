"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const name = `${common_vendor.prefix}-link`;
const _sfc_main = common_vendor.uniComponent({
  name,
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-hover`,
    `${common_vendor.prefix}-class-prefix-icon`,
    `${common_vendor.prefix}-class-content`,
    `${common_vendor.prefix}-class-suffix-icon`
  ],
  options: {
    styleIsolation: "shared"
  },
  components: {
    TIcon
  },
  props: {
    ...common_vendor.props$10
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      tools: common_vendor.tools,
      _prefixIcon: null,
      _suffixIcon: null,
      className: ""
    };
  },
  watch: {
    prefixIcon: {
      handler(value) {
        this._prefixIcon = common_vendor.calcIcon(value);
      },
      immediate: true
    },
    suffixIcon: {
      handler(value) {
        this._suffixIcon = common_vendor.calcIcon(value);
      },
      immediate: true
    },
    theme: "setClass",
    disabled: "setClass",
    size: "setClass",
    underline: "setClass",
    navigatorProps: "setClass"
  },
  mounted() {
    this.setClass();
  },
  methods: {
    setClass() {
      const { theme, size, underline, navigatorProps, disabled } = this;
      const classList = [name, `${name}--${theme}`, `${name}--${size}`];
      const { url, appId, shortLink, target, openType } = common_vendor.coalesce(navigatorProps, {});
      const condition = !(url || target === "miniProgram" && (appId || shortLink));
      if (underline) {
        classList.push(`${name}--underline`);
      }
      if (Object.keys(navigatorProps).length && condition && !["navigateBack", "exit"].includes(openType) || disabled) {
        classList.push(`${name}--disabled`);
      }
      this.className = classList.join(" ");
    },
    onSuccess(e) {
      this.$emit("success", e);
    },
    onFail(e) {
      this.$emit("fail", e);
    },
    onComplete(e) {
      this.$emit("complete", e);
    }
  }
});
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  _easycom_t_icon2();
}
const _easycom_t_icon = () => "../icon/icon.js";
if (!Math) {
  _easycom_t_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx._prefixIcon
  }, _ctx._prefixIcon ? {
    b: common_vendor.o(($event) => _ctx._suffixIcon.click || ""),
    c: common_vendor.p({
      ["custom-style"]: _ctx._prefixIcon.style || "",
      ["t-class"]: _ctx._prefixIcon.tClass,
      prefix: _ctx._prefixIcon.prefix,
      name: _ctx._prefixIcon.name,
      size: _ctx._prefixIcon.size,
      color: _ctx._prefixIcon.color,
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._prefixIcon.ariaLabel,
      ["aria-role"]: _ctx._prefixIcon.arialRole
    })
  } : {}, {
    d: common_vendor.n(_ctx.classPrefix + "__prefix-icon " + _ctx.tClassPrefixIcon),
    e: _ctx.content
  }, _ctx.content ? {
    f: common_vendor.t(_ctx.content)
  } : {}, {
    g: common_vendor.n(_ctx.classPrefix + "__content " + _ctx.tClassContent),
    h: _ctx._suffixIcon
  }, _ctx._suffixIcon ? {
    i: common_vendor.o(($event) => _ctx._suffixIcon.click || ""),
    j: common_vendor.p({
      ["custom-style"]: _ctx._suffixIcon.style || "",
      ["t-class"]: _ctx._suffixIcon.tClass,
      prefix: _ctx._suffixIcon.prefix || "",
      name: _ctx._suffixIcon.name,
      size: _ctx._suffixIcon.size,
      color: _ctx._suffixIcon.color,
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._suffixIcon.ariaLabel,
      ["aria-role"]: _ctx._suffixIcon.arialRole
    })
  } : {}, {
    k: common_vendor.n(_ctx.classPrefix + "__suffix-icon " + _ctx.tClassSuffixIcon),
    l: common_vendor.n(_ctx.className + " " + _ctx.tClass),
    m: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    n: _ctx.navigatorProps.target,
    o: !_ctx.disabled ? _ctx.navigatorProps.url || "" : "",
    p: _ctx.navigatorProps.openType || "navigate",
    q: _ctx.navigatorProps.delta,
    r: _ctx.navigatorProps.appId,
    s: _ctx.navigatorProps.path,
    t: _ctx.navigatorProps.extraData,
    v: _ctx.navigatorProps.version,
    w: _ctx.navigatorProps.shortLink,
    x: (_ctx.hover && !_ctx.disabled && _ctx.classPrefix + "--hover") + " " + _ctx.tClassHover + " " + _ctx.navigatorProps.hoverClass,
    y: !!_ctx.navigatorProps.hoverStopPropagation,
    z: _ctx.navigatorProps.hoverStartTime,
    A: _ctx.navigatorProps.hoverStayTime,
    B: _ctx.disabled,
    C: common_vendor.o((...args) => _ctx.onSuccess && _ctx.onSuccess(...args)),
    D: common_vendor.o((...args) => _ctx.onFail && _ctx.onFail(...args)),
    E: common_vendor.o((...args) => _ctx.onComplete && _ctx.onComplete(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a447050a"]]);
wx.createComponent(Component);
