"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const name = `${common_vendor.prefix}-loading`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    multipleSlots: true,
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-text`,
    `${common_vendor.prefix}-class-indicator`
  ],
  props: {
    ...common_vendor.props$12
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      show: true,
      tools: common_vendor.tools
    };
  },
  watch: {
    loading: {
      handler(value) {
        const {
          delay
        } = this;
        if (this.timer) {
          clearTimeout(this.timer);
        }
        if (value && delay) {
          this.timer = setTimeout(() => {
            this.show = value;
            this.timer = null;
          }, delay);
        } else {
          this.show = value;
        }
      },
      immediate: true
    }
  },
  beforeUnMount() {
    clearTimeout(this.timer);
  },
  methods: {
    refreshPage() {
      this.$emit("reload");
    }
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.indicator
  }, _ctx.indicator ? common_vendor.e({
    b: _ctx.theme === "spinner"
  }, _ctx.theme === "spinner" ? {
    c: common_vendor.f(12, (item, index, i0) => {
      return {
        a: index,
        b: common_vendor.n(_ctx.classPrefix + "__dot " + _ctx.classPrefix + "__dot-" + index)
      };
    })
  } : {}, {
    d: _ctx.theme === "circular"
  }, _ctx.theme === "circular" ? {
    e: common_vendor.n(_ctx.classPrefix + "__circular")
  } : {}, {
    f: _ctx.theme === "dots"
  }, _ctx.theme === "dots" ? {
    g: common_vendor.n(_ctx.classPrefix + "__dot"),
    h: common_vendor.s((_ctx.duration ? "animation-duration: " + _ctx.duration / 1e3 + "s; animation-delay:0s;" : "") + " animation-play-state: " + (_ctx.pause ? "paused" : "running") + ";"),
    i: common_vendor.n(_ctx.classPrefix + "__dot"),
    j: common_vendor.s((_ctx.duration ? "animation-duration: " + _ctx.duration / 1e3 + "s; animation-delay:" + _ctx.duration * 1 / 3e3 + "s;" : "") + " animation-play-state: " + (_ctx.pause ? "paused" : "running") + ";"),
    k: common_vendor.n(_ctx.classPrefix + "__dot"),
    l: common_vendor.s((_ctx.duration ? "animation-duration: " + _ctx.duration / 1e3 + "s; animation-delay:" + _ctx.duration * 2 / 3e3 + "s;" : "") + " animation-play-state: " + (_ctx.pause ? "paused" : "running") + ";")
  } : {}, {
    m: common_vendor.n(_ctx.tClassIndicator),
    n: common_vendor.n(_ctx.classPrefix + "__spinner " + _ctx.classPrefix + "__spinner--" + _ctx.theme + " " + (_ctx.reverse ? "reverse" : "")),
    o: common_vendor.s("width: " + _ctx.tools.addUnit(_ctx.size) + "; height: " + _ctx.tools.addUnit(_ctx.size) + "; " + (_ctx.inheritColor ? "color: inherit;" : "") + " " + (_ctx.indicator ? "" : "display: none;") + " " + (_ctx.duration ? "animation-duration: " + _ctx.duration / 1e3 + "s;" : "") + " animation-play-state: " + (_ctx.pause ? "paused" : "running") + ";"),
    p: _ctx.ariaRole || "img",
    q: _ctx.ariaLabel || _ctx.text || "加载中"
  }) : {}, {
    r: _ctx.text
  }, _ctx.text ? {
    s: common_vendor.t(_ctx.text)
  } : {}, {
    t: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__text", [_ctx.layout])),
    v: common_vendor.n(_ctx.tClassText),
    w: _ctx.indicator,
    x: _ctx.ariaLabel || _ctx.text,
    y: common_vendor.s(_ctx.tools._style([_ctx.customStyle, _ctx.show ? "" : "display: none", _ctx.inheritColor ? "color: inherit" : ""])),
    z: common_vendor.n(_ctx.tClass),
    A: common_vendor.n(_ctx.classPrefix + " " + (_ctx.classPrefix + "--" + _ctx.layout) + " " + (_ctx.fullscreen ? _ctx.classPrefix + "--fullscreen" : ""))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1b9177fb"]]);
wx.createComponent(Component);
