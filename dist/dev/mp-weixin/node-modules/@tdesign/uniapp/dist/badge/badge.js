"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const name = `${common_vendor.prefix}-badge`;
const getUniqueID = common_vendor.uniqueFactory("badge");
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-count`,
    `${common_vendor.prefix}-class-content`
  ],
  props: {
    ...common_vendor.props$11
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      value: "",
      labelID: "",
      descriptionID: "",
      tools: common_vendor.tools,
      useOuterClass: false
    };
  },
  computed: {
    hasChild() {
      var _a;
      return !!((_a = this.$slots) == null ? void 0 : _a.default);
    }
  },
  mounted() {
    const e = getUniqueID();
    this.labelID = `${e}_label`;
    this.descriptionID = `${e}_description`;
    this.checkForActualContent();
  },
  methods: {
    getBadgeValue: common_vendor.getBadgeValue,
    getBadgeStyles: common_vendor.getBadgeStyles,
    getBadgeInnerClass: common_vendor.getBadgeInnerClass,
    isShowBadge: common_vendor.isShowBadge,
    checkForActualContent() {
      const target = ["ribbon", "ribbon-right", "ribbon-left", "triangle-right", "triangle-left"];
      if (this.content || !target.includes(this.shape)) {
        this.useOuterClass = false;
        return;
      }
      return common_vendor.getRect(this, `.${name}__content`).then((rect) => {
        const hasSlotContent = rect.width > 0 || rect.height > 0;
        this.useOuterClass = !hasSlotContent;
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.content
  }, !_ctx.content ? {} : {
    b: common_vendor.t(_ctx.content),
    c: common_vendor.n(_ctx.classPrefix + "__content-text")
  }, {
    d: _ctx.labelID,
    e: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__content", [["empty", !_ctx.content && !_ctx.hasChild]]) + " " + _ctx.tClassContent),
    f: _ctx.isShowBadge({
      dot: _ctx.dot,
      count: _ctx.count,
      showZero: _ctx.showZero
    }) || _ctx.count === null
  }, _ctx.isShowBadge({
    dot: _ctx.dot,
    count: _ctx.count,
    showZero: _ctx.showZero
  }) || _ctx.count === null ? common_vendor.e({
    g: _ctx.isShowBadge({
      dot: _ctx.dot,
      count: _ctx.count,
      showZero: _ctx.showZero
    })
  }, _ctx.isShowBadge({
    dot: _ctx.dot,
    count: _ctx.count,
    showZero: _ctx.showZero
  }) ? {
    h: common_vendor.t(_ctx.getBadgeValue({
      dot: _ctx.dot,
      count: _ctx.count,
      maxCount: _ctx.maxCount
    }))
  } : {}, {
    i: common_vendor.n(_ctx.classPrefix + "__count"),
    j: _ctx.descriptionID,
    k: _ctx.ariaLabel || _ctx.tools.getBadgeAriaLabel({
      dot: _ctx.dot,
      count: _ctx.count,
      maxCount: _ctx.maxCount
    }),
    l: common_vendor.n(_ctx.getBadgeInnerClass({
      classPrefix: _ctx.classPrefix,
      dot: _ctx.dot,
      size: _ctx.size,
      shape: _ctx.shape,
      count: _ctx.count
    }) + " " + _ctx.prefix + "-has-count "),
    m: common_vendor.n(_ctx.tClassCount),
    n: common_vendor.s(_ctx.tools._style([_ctx.getBadgeStyles({
      color: _ctx.color,
      offset: _ctx.offset
    })]))
  }) : {}, {
    o: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    p: common_vendor.n(_ctx.classPrefix + " " + (_ctx.useOuterClass ? _ctx.classPrefix + "__" + _ctx.shape + "-outer" : "") + _ctx.tClass),
    q: _ctx.labelID,
    r: _ctx.descriptionID,
    s: _ctx.ariaRole || "option"
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-37430301"]]);
wx.createComponent(Component);
