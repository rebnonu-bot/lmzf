"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const name = `${common_vendor.prefix}-cell-group`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [`${common_vendor.prefix}-class`, `${common_vendor.prefix}-class-title`],
  mixins: [common_vendor.ParentMixin(common_vendor.RELATION_MAP.Cell)],
  props: {
    ...common_vendor.props$3
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      tools: common_vendor.tools
    };
  },
  methods: {
    innerAfterLinked() {
      this.updateLastChid();
    },
    innerAfterUnLinked() {
      this.updateLastChid();
    },
    updateLastChid() {
      const { children } = this;
      children.forEach((child, index) => {
        child.isLastChild = index === children.length - 1;
      });
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.title
  }, _ctx.title ? {
    b: common_vendor.t(_ctx.title),
    c: common_vendor.n(_ctx.classPrefix + "__title "),
    d: common_vendor.n(_ctx.tClassTitle)
  } : {}, {
    e: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    f: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix, [["bordered", _ctx.bordered], _ctx.theme])),
    g: common_vendor.n(_ctx.tClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-587b7df8"]]);
wx.createComponent(Component);
