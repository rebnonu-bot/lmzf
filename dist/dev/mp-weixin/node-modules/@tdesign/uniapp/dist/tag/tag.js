"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const name = `${common_vendor.prefix}-tag`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`
  ],
  components: {
    TIcon
  },
  props: {
    ...common_vendor.props$1
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      className: "",
      tagStyle: "",
      tools: common_vendor.tools,
      _icon: null,
      _closable: null
    };
  },
  watch: {
    size: "setClass",
    shape: "setClass",
    theme: "setClass",
    variant: "setClass",
    disabled: "setClass",
    maxWidth: "setTagStyle",
    icon: {
      handler(s) {
        this._icon = common_vendor.calcIcon(s);
      },
      immediate: true
    },
    closable: {
      handler(s) {
        this.setClass();
        this._closable = common_vendor.calcIcon(s, "close");
      },
      immediate: true
    }
  },
  mounted() {
    this.setClass();
    this.setTagStyle();
  },
  methods: {
    setClass() {
      const { prefix, classPrefix } = this;
      const { size, shape, theme, variant, closable, disabled } = this;
      const tagClass = [
        classPrefix,
        `${classPrefix}--${theme || "default"}`,
        `${classPrefix}--${variant}`,
        closable ? `${classPrefix}--closable ${prefix}-is-closable` : "",
        disabled ? `${classPrefix}--disabled ${prefix}-is-disabled` : "",
        `${classPrefix}--${size}`,
        `${classPrefix}--${shape}`
      ];
      const className = common_vendor.classNames(tagClass);
      this.className = className;
    },
    setTagStyle() {
      const { maxWidth } = this;
      if (!maxWidth) {
        return "";
      }
      const width = common_vendor.isNumeric(maxWidth) ? `${maxWidth}px` : maxWidth;
      this.tagStyle = `max-width:${width};`;
    },
    handleClick(e) {
      if (this.disabled)
        return;
      this.$emit("click", { e });
    },
    handleClose(e) {
      if (this.disabled)
        return;
      this.$emit("close", { e });
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
    a: _ctx._icon
  }, _ctx._icon ? {
    b: common_vendor.p({
      ["custom-style"]: _ctx._icon.style || "",
      ["t-class"]: _ctx.prefix + "-icon",
      prefix: _ctx._icon.prefix,
      name: _ctx._icon.name,
      size: _ctx._icon.size,
      color: _ctx._icon.color,
      ["aria-hidden"]: !!_ctx._icon.ariaHidden,
      ["aria-label"]: _ctx._icon.ariaLabel,
      ["aria-role"]: _ctx._icon.ariaRole
    })
  } : {}, {
    c: common_vendor.n(_ctx.classPrefix + "__icon"),
    d: common_vendor.n(_ctx.classPrefix + "__text"),
    e: _ctx._closable
  }, _ctx._closable ? {
    f: common_vendor.o(_ctx.handleClose),
    g: common_vendor.p({
      ["custom-style"]: _ctx._closable.style || "",
      ["t-class"]: _ctx.classPrefix + "__icon-close " + _ctx.prefix + "-icon",
      prefix: _ctx._closable.prefix,
      name: _ctx._closable.name,
      size: _ctx._closable.size,
      color: _ctx._closable.color,
      ["aria-hidden"]: !!_ctx._closable.ariaHidden,
      ["aria-label"]: _ctx._closable.ariaLabel || "关闭",
      ["aria-role"]: _ctx._closable.ariaRole
    })
  } : {}, {
    h: common_vendor.n(_ctx.className + " "),
    i: common_vendor.n(_ctx.tClass),
    j: common_vendor.s(_ctx.tools._style([_ctx.tagStyle, _ctx.customStyle])),
    k: common_vendor.o((...args) => _ctx.handleClick && _ctx.handleClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-8fd3fbf8"]]);
wx.createComponent(Component);
