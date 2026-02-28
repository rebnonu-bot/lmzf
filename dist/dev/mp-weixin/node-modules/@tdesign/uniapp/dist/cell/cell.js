"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const TImage = () => "../image/image.js";
const name = `${common_vendor.prefix}-cell`;
const COMMON_RIGHT_ICON_STYLE = {
  color: "var(--td-cell-right-icon-color, var(--td-text-color-placeholder, var(--td-font-gray-3, rgba(0, 0, 0, .4))))",
  fontSize: "var(--td-cell-right-icon-font-size, 24px)"
};
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-title`,
    `${common_vendor.prefix}-class-description`,
    `${common_vendor.prefix}-class-note`,
    `${common_vendor.prefix}-class-hover`,
    `${common_vendor.prefix}-class-image`,
    `${common_vendor.prefix}-class-left`,
    `${common_vendor.prefix}-class-left-icon`,
    `${common_vendor.prefix}-class-center`,
    `${common_vendor.prefix}-class-right`,
    `${common_vendor.prefix}-class-right-icon`
  ],
  mixins: [common_vendor.ChildrenMixin(common_vendor.RELATION_MAP.Cell)],
  components: {
    TIcon,
    TImage
  },
  props: {
    ...common_vendor.props$2
  },
  emits: [
    "click"
  ],
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      _arrow: null,
      _rightIcon: null,
      _leftIcon: null,
      isLastChild: false,
      tools: common_vendor.tools
    };
  },
  computed: {
    rightArrowCustomStyle() {
      return common_vendor.tools._style([
        COMMON_RIGHT_ICON_STYLE,
        this.rightIconStyle || "",
        this._arrow.style || ""
      ]);
    },
    rightIconCustomStyle() {
      return common_vendor.tools._style([
        COMMON_RIGHT_ICON_STYLE,
        this.rightIconStyle || "",
        this._rightIcon.style || ""
      ]);
    },
    leftIconCustomStyle() {
      return common_vendor.tools._style([
        {
          color: "var(--td-cell-left-icon-color, var(--td-brand-color, var(--td-primary-color-7, #0052d9)))",
          fontSize: "var(--td-cell-left-icon-font-size, 24px)"
        },
        this._leftIcon.style || ""
      ]);
    },
    leftImageCustomStyle() {
      return common_vendor.tools._style({
        height: "var(--td-cell-image-height, 48px)",
        width: "var(--td-cell-image-width, 48px)"
      });
    }
  },
  watch: {
    leftIcon: {
      handler(e) {
        this.setIcon("_leftIcon", e, "");
      },
      immediate: true
    },
    rightIcon: {
      handler(e) {
        this.setIcon("_rightIcon", e, "");
      },
      immediate: true
    },
    arrow: {
      handler(e) {
        this.setIcon("_arrow", e, "chevron-right");
      },
      immediate: true
    }
  },
  methods: {
    setIcon(e, t, s) {
      this[e] = common_vendor.calcIcon(t, s);
    },
    onClick(e) {
      this.$emit("click", e);
      this.jumpLink();
    },
    jumpLink(e = "url", t = "jumpType") {
      const s = this[e];
      const i = this[t];
      if (s) {
        common_vendor.index[i]({
          url: s
        });
      }
    }
  }
});
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_image2 = common_vendor.resolveComponent("t-image");
  (_easycom_t_icon2 + _easycom_t_image2)();
}
const _easycom_t_icon = () => "../icon/icon.js";
const _easycom_t_image = () => "../image/image.js";
if (!Math) {
  (_easycom_t_icon + _easycom_t_image)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx._leftIcon
  }, _ctx._leftIcon ? {
    b: common_vendor.o(($event) => "handleClose"),
    c: common_vendor.p({
      ["custom-style"]: _ctx.leftIconCustomStyle,
      ["t-class"]: _ctx.classPrefix + "__left-icon " + _ctx.tClassLeftIcon,
      name: _ctx._leftIcon.name,
      size: _ctx._leftIcon.size,
      color: _ctx._leftIcon.color,
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._leftIcon.ariaLabel,
      ["aria-role"]: _ctx._leftIcon.ariaRole
    })
  } : {}, {
    d: _ctx.image
  }, _ctx.image ? {
    e: common_vendor.p({
      shape: "round",
      ["t-class"]: _ctx.classPrefix + "__left-image " + _ctx.tClassImage,
      src: _ctx.image,
      ["custom-style"]: _ctx.leftImageCustomStyle
    })
  } : {}, {
    f: common_vendor.n(_ctx.classPrefix + "__left " + _ctx.tClassLeft),
    g: _ctx.title
  }, _ctx.title ? {
    h: common_vendor.t(_ctx.title)
  } : {}, {
    i: _ctx.required
  }, _ctx.required ? {
    j: common_vendor.n(_ctx.classPrefix + "--required")
  } : {}, {
    k: common_vendor.n(_ctx.classPrefix + "__title-text "),
    l: common_vendor.n(_ctx.tClassTitle),
    m: common_vendor.s(_ctx.tools._style(_ctx.titleStyle)),
    n: _ctx.description
  }, _ctx.description ? {
    o: common_vendor.t(_ctx.description),
    p: common_vendor.n(_ctx.classPrefix + "__description-text")
  } : {}, {
    q: common_vendor.n(_ctx.classPrefix + "__description "),
    r: common_vendor.n(_ctx.tClassDescription),
    s: common_vendor.n(_ctx.classPrefix + "__title " + _ctx.tClassCenter),
    t: _ctx.note
  }, _ctx.note ? {
    v: common_vendor.t(_ctx.note)
  } : {}, {
    w: common_vendor.n(_ctx.classPrefix + "__note "),
    x: common_vendor.n(_ctx.tClassNote),
    y: common_vendor.s(_ctx.tools._style(_ctx.noteStyle)),
    z: _ctx._arrow
  }, _ctx._arrow ? {
    A: common_vendor.o(($event) => "handleClose"),
    B: common_vendor.p({
      ["custom-style"]: _ctx.rightArrowCustomStyle,
      ["t-class"]: _ctx.classPrefix + "__right-icon " + _ctx.tClassRightIcon,
      name: _ctx._arrow.name || "",
      size: _ctx._arrow.size,
      color: _ctx._arrow.color,
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._arrow.ariaLabel,
      ["aria-role"]: _ctx._arrow.ariaRole
    })
  } : common_vendor.e({
    C: _ctx._rightIcon
  }, _ctx._rightIcon ? {
    D: common_vendor.o(($event) => "handleClose"),
    E: common_vendor.p({
      ["custom-style"]: _ctx.rightIconCustomStyle,
      ["t-class"]: _ctx.classPrefix + "__right-icon " + _ctx.tClassRightIcon,
      name: _ctx._rightIcon.name,
      size: _ctx._rightIcon.size,
      color: _ctx._rightIcon.color || "",
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._rightIcon.ariaLabel,
      ["aria-role"]: _ctx._rightIcon.ariaRole
    })
  } : {}), {
    F: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__right", [_ctx.align])),
    G: common_vendor.n(_ctx.tClassRight),
    H: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    I: common_vendor.n(_ctx.tClass),
    J: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix, [["bordered", _ctx.bordered || _ctx.isLastChild]])),
    K: _ctx.hover ? _ctx.classPrefix + "--hover" : "",
    L: _ctx.ariaRole || (_ctx.arrow ? "button" : ""),
    M: _ctx.ariaLabel,
    N: common_vendor.o((...args) => _ctx.onClick && _ctx.onClick(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-77a157c1"]]);
wx.createComponent(Component);
