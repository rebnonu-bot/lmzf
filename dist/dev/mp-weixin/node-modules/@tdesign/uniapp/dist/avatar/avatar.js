"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const TBadge = () => "../badge/badge.js";
const TImage = () => "../image/image.js";
const name = `${common_vendor.prefix}-avatar`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-image`,
    `${common_vendor.prefix}-class-icon`,
    `${common_vendor.prefix}-class-alt`,
    `${common_vendor.prefix}-class-content`
  ],
  mixins: [common_vendor.ChildrenMixin(common_vendor.RELATION_MAP.Avatar)],
  components: {
    TIcon,
    TBadge,
    TImage
  },
  props: {
    ...common_vendor.avatarProps
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      isShow: true,
      zIndex: 0,
      windowWidth: common_vendor.systemInfo.windowWidth,
      utils: common_vendor.utils,
      tools: common_vendor.tools,
      iconName: "",
      iconData: {},
      dataShape: this.shape,
      dataSize: this.size,
      dataBordered: this.bordered,
      innerStyle: ""
    };
  },
  computed: {
    iconCustomStyle() {
      const fontSize = {
        small: "var(--td-avatar-icon-small-font-size, 20px)",
        medium: "var(--td-avatar-icon-medium-font-size, 24px)",
        large: "var(--td-avatar-icon-large-font-size, 32px)"
      };
      if (!fontSize[this.dataSize])
        return "";
      return common_vendor.tools._style([
        {
          fontSize: fontSize[this.dataSize]
        },
        this.iconData.style || ""
      ]);
    },
    imageCustomStyle() {
      var _a;
      return common_vendor.tools._style([
        {
          width: "100%",
          height: "100%"
        },
        ((_a = this.imageProps) == null ? void 0 : _a.style) || ""
      ]);
    }
  },
  watch: {
    icon: {
      handler(t) {
        const obj = common_vendor.setIcon("icon", t, "");
        Object.keys(obj).forEach((key) => {
          this[key] = obj[key];
        });
      },
      immediate: true
    }
  },
  mounted() {
  },
  methods: {
    innerAfterLinked() {
      var _a, _b;
      this.dataShape = this.shape || ((_a = this[common_vendor.RELATION_MAP.Avatar]) == null ? void 0 : _a.shape) || "circle";
      this.dataSize = this.size || ((_b = this[common_vendor.RELATION_MAP.Avatar]) == null ? void 0 : _b.size);
      this.dataBordered = true;
    },
    hide() {
      this.isShow = false;
    },
    onLoadError(e) {
      if (this.hideOnLoadFailed) {
        this.isShow = false;
      }
      this.$emit("error", e && e.e);
    },
    setStyle(val = "") {
      this.innerStyle = val;
    }
  }
});
if (!Array) {
  const _easycom_t_image2 = common_vendor.resolveComponent("t-image");
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_badge2 = common_vendor.resolveComponent("t-badge");
  (_easycom_t_image2 + _easycom_t_icon2 + _easycom_t_badge2)();
}
const _easycom_t_image = () => "../image/image.js";
const _easycom_t_icon = () => "../icon/icon.js";
const _easycom_t_badge = () => "../badge/badge.js";
if (!Math) {
  (_easycom_t_image + _easycom_t_icon + _easycom_t_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.badgeProps
  }, _ctx.badgeProps ? common_vendor.e({
    b: _ctx.image
  }, _ctx.image ? {
    c: common_vendor.o(_ctx.onLoadError),
    d: common_vendor.p({
      ["t-class"]: _ctx.prefix + "-image " + _ctx.classPrefix + "__image",
      ["t-class-load"]: _ctx.tClassAlt,
      ["custom-style"]: _ctx.imageCustomStyle,
      src: _ctx.image,
      mode: _ctx.imageProps && _ctx.imageProps.mode || "aspectFill",
      lazy: _ctx.imageProps && _ctx.imageProps.lazy || false,
      loading: _ctx.imageProps && _ctx.imageProps.loading || "default",
      shape: _ctx.imageProps && _ctx.imageProps.shape || "round",
      webp: _ctx.imageProps && _ctx.imageProps.webp || false,
      error: _ctx.alt || "default"
    })
  } : _ctx.iconName || _ctx.tools.isNoEmptyObj(_ctx.iconData) ? {
    f: common_vendor.o(($event) => _ctx.iconData.click || ""),
    g: common_vendor.p({
      ["t-class"]: _ctx.classPrefix + "__icon " + _ctx.classPrefix + "__icon--" + (_ctx.iconData.activeIdx == _ctx.iconData.index ? "active " : " ") + _ctx.tClassIcon,
      prefix: _ctx.iconData.prefix,
      name: _ctx.iconName || _ctx.iconData.name,
      size: _ctx.iconData.size,
      color: _ctx.iconData.color,
      ["aria-hidden"]: !!_ctx.iconData.ariaHidden,
      ["aria-label"]: _ctx.iconData.ariaLabel,
      ["aria-role"]: _ctx.iconData.ariaRole,
      ["custom-style"]: _ctx.iconCustomStyle
    })
  } : {
    h: common_vendor.n(_ctx.classPrefix + "__text "),
    i: common_vendor.n(_ctx.tClassContent)
  }, {
    e: _ctx.iconName || _ctx.tools.isNoEmptyObj(_ctx.iconData),
    j: common_vendor.n(_ctx.utils.getClass(_ctx.classPrefix, _ctx.dataSize || "medium", _ctx.dataShape, _ctx.dataBordered)),
    k: common_vendor.n(_ctx.tClassImage),
    l: common_vendor.s(_ctx.utils.getSize(_ctx.dataSize, _ctx.windowWidth)),
    m: _ctx.ariaLabel || _ctx.alt || "头像",
    n: _ctx.ariaRole || "img",
    o: _ctx.ariaHidden,
    p: common_vendor.p({
      color: _ctx.badgeProps.color || "",
      content: _ctx.badgeProps.content || "",
      count: _ctx.badgeProps.count || 0,
      dot: _ctx.badgeProps.dot || false,
      ["max-count"]: _ctx.badgeProps.maxCount || 99,
      offset: _ctx.badgeProps.offset || [],
      shape: _ctx.badgeProps.shape || "circle",
      ["show-zero"]: _ctx.badgeProps.showZero || false,
      size: _ctx.badgeProps.size || "medium",
      ["t-class"]: _ctx.badgeProps.tClass,
      ["t-class-content"]: _ctx.badgeProps.tClassContent,
      ["t-class-count"]: _ctx.badgeProps.tClassCount
    })
  }) : {}, {
    q: common_vendor.n(_ctx.classPrefix + "__wrapper"),
    r: common_vendor.n(_ctx.tClass),
    s: common_vendor.s(_ctx.tools._style([_ctx.utils.getStyles(_ctx.isShow), _ctx.customStyle, _ctx.innerStyle]))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-ff1b6ad5"]]);
wx.createComponent(Component);
