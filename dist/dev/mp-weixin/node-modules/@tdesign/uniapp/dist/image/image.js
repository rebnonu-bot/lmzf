"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TLoading = () => "../loading/loading.js";
const TIcon = () => "../icon/icon.js";
const name = `${common_vendor.prefix}-image`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-load`,
    `${common_vendor.prefix}-class-image`,
    `${common_vendor.prefix}-class-error`
  ],
  components: {
    TLoading,
    TIcon
  },
  props: {
    ...common_vendor.ImageProps
  },
  emits: [
    "click"
  ],
  data() {
    return {
      prefix: common_vendor.prefix,
      isLoading: true,
      isFailed: false,
      innerStyle: "",
      classPrefix: name,
      tools: common_vendor.tools,
      preSrc: ""
    };
  },
  watch: {
    src() {
      if (this.preSrc !== this.src) {
        this.update();
      }
    },
    width: "calcSize",
    height: "calcSize"
  },
  mounted() {
    this.calcSize(this.width, this.height);
  },
  methods: {
    onLoaded(e) {
      const version = common_vendor.appBaseInfo.SDKVersion;
      const {
        mode,
        tId
      } = this;
      const lower = common_vendor.compareVersion(version, "2.10.3") < 0;
      if ("heightFix" === mode && lower) {
        common_vendor.getRect(this, `#${tId || "image"}`).then((e2) => {
          const {
            height,
            width
          } = e2;
          this.innerStyle = `height: ${common_vendor.addUnit(height)}; width: ${width}px;`;
        }).catch(() => {
        });
      }
      this.isLoading = false;
      this.isFailed = false;
      this.$emit("load", { e });
    },
    onLoadError(e) {
      this.isLoading = false;
      this.isFailed = true;
      this.$emit("error", { e });
    },
    calcSize(width = this.width, height = this.height) {
      let innerStyle = "";
      if (width) {
        innerStyle += `width: ${common_vendor.addUnit(width)};`;
      }
      if (height) {
        innerStyle += `height: ${common_vendor.addUnit(height)};`;
      }
      this.innerStyle = innerStyle;
    },
    update() {
      const {
        src
      } = this;
      this.preSrc = src;
      if (src) {
        this.isLoading = true;
        this.isFailed = false;
      } else {
        this.onLoadError({
          errMsg: "图片链接为空"
        });
      }
    },
    onClick(e) {
      this.$emit("click", e);
    }
  }
});
if (!Array) {
  const _easycom_t_loading2 = common_vendor.resolveComponent("t-loading");
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  (_easycom_t_loading2 + _easycom_t_icon2)();
}
const _easycom_t_loading = () => "../loading/loading.js";
const _easycom_t_icon = () => "../icon/icon.js";
if (!Math) {
  (_easycom_t_loading + _easycom_t_icon)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.isLoading
  }, _ctx.isLoading ? common_vendor.e({
    b: _ctx.loading === "default"
  }, _ctx.loading === "default" ? {
    c: common_vendor.p({
      theme: "dots",
      size: "44rpx",
      loading: true,
      ["inherit-color"]: true,
      ["t-class"]: _ctx.tClassLoad,
      ["t-class-text"]: _ctx.classPrefix + "--loading-text"
    })
  } : _ctx.loading !== "" && _ctx.loading !== "slot" ? {
    e: common_vendor.t(_ctx.loading),
    f: common_vendor.n(_ctx.classPrefix + "__common " + _ctx.tClassLoad)
  } : {}, {
    d: _ctx.loading !== "" && _ctx.loading !== "slot",
    g: common_vendor.s(_ctx.tools._style([_ctx.innerStyle])),
    h: common_vendor.n(_ctx.classPrefix + "__mask " + _ctx.classPrefix + "--loading " + _ctx.classPrefix + "--shape-" + _ctx.shape),
    i: _ctx.ariaHidden
  }) : _ctx.isFailed ? common_vendor.e({
    k: _ctx.error === "default"
  }, _ctx.error === "default" ? {
    l: common_vendor.p({
      name: "close",
      ["aria-role"]: "img",
      ["aria-label"]: "加载失败"
    }),
    m: common_vendor.n(_ctx.tClassLoad)
  } : _ctx.error && _ctx.error !== "slot" ? {
    o: common_vendor.t(_ctx.error),
    p: common_vendor.n(_ctx.classPrefix + "__common "),
    q: common_vendor.n(_ctx.tClassLoad)
  } : {}, {
    n: _ctx.error && _ctx.error !== "slot",
    r: common_vendor.s(_ctx.tools._style([_ctx.innerStyle])),
    s: common_vendor.n(_ctx.classPrefix + "__mask " + _ctx.classPrefix + "--failed " + _ctx.classPrefix + "--shape-" + _ctx.shape),
    t: common_vendor.n(_ctx.tClassError),
    v: _ctx.ariaHidden
  }) : {}, {
    j: _ctx.isFailed,
    w: !_ctx.isFailed
  }, !_ctx.isFailed ? {
    x: _ctx.tId || "image",
    y: common_vendor.s(_ctx.tools._style([_ctx.innerStyle])),
    z: common_vendor.n(_ctx.classPrefix + "__img " + _ctx.classPrefix + "--shape-" + _ctx.shape + " "),
    A: common_vendor.n((_ctx.isLoading ? _ctx.classPrefix + "--lazy" : "") + " "),
    B: common_vendor.n(_ctx.tClassImage),
    C: _ctx.src,
    D: _ctx.mode,
    E: _ctx.webp,
    F: _ctx.lazy,
    G: _ctx.showMenuByLongpress,
    H: _ctx.ariaHidden || _ctx.isLoading || _ctx.isFailed,
    I: _ctx.ariaLabel,
    J: common_vendor.o((...args) => _ctx.onClick && _ctx.onClick(...args)),
    K: common_vendor.o((...args) => _ctx.onLoaded && _ctx.onLoaded(...args)),
    L: common_vendor.o((...args) => _ctx.onLoadError && _ctx.onLoadError(...args))
  } : {}, {
    M: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    N: common_vendor.n(_ctx.tClass),
    O: common_vendor.n(_ctx.classPrefix)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a456f1c6"]]);
wx.createComponent(Component);
