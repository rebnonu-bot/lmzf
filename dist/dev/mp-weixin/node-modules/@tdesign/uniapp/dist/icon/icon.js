"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const name = `${common_vendor.prefix}-icon`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [`${common_vendor.prefix}-class`],
  props: {
    ...common_vendor.props
  },
  data() {
    return {
      componentPrefix: common_vendor.prefix,
      classPrefix: name,
      isImage: false,
      iconStyle: void 0,
      tools: common_vendor.tools
    };
  },
  watch: {
    name: {
      handler() {
        this.setIconStyle();
      },
      immediate: true
    },
    color: {
      handler() {
        this.setIconStyle();
      },
      immediate: true
    },
    size: {
      handler() {
        this.setIconStyle();
      },
      immediate: true
    },
    style: {
      handler() {
        this.setIconStyle();
      },
      immediate: true
    }
  },
  methods: {
    onTap(t) {
      this.$emit("click", t);
    },
    setIconStyle() {
      const {
        name: name2,
        color,
        size,
        classPrefix
      } = this;
      const isImage = name2.indexOf("/") !== -1;
      const sizeValue = size !== null && size !== "" ? common_vendor.addUnit(size) : void 0;
      const colorStyle = color ? {
        color
      } : {};
      const fontStyle = size ? {
        "font-size": sizeValue
      } : {};
      const iconStyle = { ...colorStyle, ...fontStyle };
      this.isImage = isImage;
      if (isImage) {
        let iconSize = sizeValue;
        if (!iconSize) {
          common_vendor.getRect(this, `.${classPrefix}`).then((res) => {
            iconSize = common_vendor.addUnit(res == null ? void 0 : res.height);
          }).catch(() => {
          });
        }
        iconStyle.width = iconSize;
        iconStyle.height = iconSize;
      }
      this.iconStyle = `${common_vendor.styles(iconStyle)}`;
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.isImage
  }, _ctx.isImage ? {
    b: _ctx.name,
    c: common_vendor.n(_ctx.classPrefix + "__image"),
    d: common_vendor.n(_ctx.classPrefix + "--image")
  } : {}, {
    e: _ctx.tools.isValidIconName(_ctx.name) && !_ctx.isImage
  }, _ctx.tools.isValidIconName(_ctx.name) && !_ctx.isImage ? {
    f: common_vendor.n((_ctx.prefix ? _ctx.prefix : _ctx.classPrefix) + "-" + _ctx.name + " " + _ctx.classPrefix + "-base")
  } : {}, {
    g: common_vendor.n(_ctx.tClass),
    h: common_vendor.n(_ctx.prefix || "t-icon"),
    i: common_vendor.s(_ctx.tools._style([_ctx.iconStyle, _ctx.customStyle])),
    j: _ctx.ariaHidden,
    k: _ctx.ariaLabel,
    l: _ctx.ariaRole,
    m: common_vendor.o((...args) => _ctx.onTap && _ctx.onTap(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-04ed8512"]]);
wx.createComponent(Component);
