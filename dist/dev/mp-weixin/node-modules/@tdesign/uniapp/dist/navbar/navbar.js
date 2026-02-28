"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const name = `${common_vendor.prefix}-navbar`;
const BASE_MENU_RECT = {
  width: 87,
  height: 32,
  top: 24,
  right: common_vendor.systemInfo.windowWidth - 10
};
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-placeholder`,
    `${common_vendor.prefix}-class-content`,
    `${common_vendor.prefix}-class-title`,
    `${common_vendor.prefix}-class-left`,
    `${common_vendor.prefix}-class-center`,
    `${common_vendor.prefix}-class-left-icon`,
    `${common_vendor.prefix}-class-home-icon`,
    `${common_vendor.prefix}-class-capsule`,
    `${common_vendor.prefix}-class-nav-btn`
  ],
  components: {
    TIcon
  },
  props: {
    ...common_vendor.props$6
  },
  emits: [
    "fail",
    "complete",
    "success",
    "go-back",
    "right-click"
  ],
  data() {
    return {
      timer: null,
      prefix: common_vendor.prefix,
      classPrefix: name,
      boxStyle: "",
      showTitle: "",
      hideLeft: false,
      hideCenter: false,
      _menuRect: null,
      _leftRect: null,
      _boxStyle: {},
      tools: common_vendor.tools,
      visibleClass: ""
    };
  },
  computed: {
    leftArrowCustomStyle() {
      return "font-size: var(--td-navbar-left-arrow-size, 24px);";
    }
  },
  watch: {
    visible(visible) {
      const { animation } = this;
      const visibleClass = `${name}${visible ? "--visible" : "--hide"}`;
      this.visibleClass = `${visibleClass}${animation ? "-animation" : ""}`;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (animation) {
        this.timer = setTimeout(() => {
          this.visibleClass = visibleClass;
        }, 300);
      }
    },
    title: "onWatchTitle",
    titleMaxLength: "onWatchTitle"
  },
  mounted() {
    this.onWatchTitle();
    this.initStyle();
    this.getLeftRect();
    this.onMenuButtonBoundingClientRectWeightChange();
  },
  beforeUnMount() {
    this.offMenuButtonBoundingClientRectWeightChange();
  },
  methods: {
    initStyle() {
      this.getMenuRect();
      const { _menuRect, _leftRect } = this;
      if (!_menuRect || !_leftRect || !common_vendor.systemInfo)
        return;
      const _boxStyle = {
        "--td-navbar-padding-top": `${common_vendor.systemInfo.statusBarHeight}px`,
        "--td-navbar-right": `${common_vendor.systemInfo.windowWidth - _menuRect.left}px`,
        // 导航栏右侧小程序胶囊按钮宽度
        "--td-navbar-left-max-width": `${_menuRect.left}px`,
        // 左侧内容最大宽度
        "--td-navbar-capsule-height": `${_menuRect.height}px`,
        // 胶囊高度
        "--td-navbar-capsule-width": `${_menuRect.width}px`,
        // 胶囊宽度
        "--td-navbar-height": `${(_menuRect.top - common_vendor.systemInfo.statusBarHeight) * 2 + _menuRect.height}px`
      };
      this.calcCenterStyle(_leftRect, _menuRect, _boxStyle);
    },
    onWatchTitle() {
      const { title } = this;
      const titleMaxLength = this.titleMaxLength || Number.MAX_SAFE_INTEGER;
      let temp = title.slice(0, titleMaxLength);
      if (titleMaxLength < title.length)
        temp += "...";
      this.showTitle = temp;
    },
    calcCenterStyle(leftRect, menuRect, defaultStyle) {
      const maxSpacing = Math.max(leftRect.right, common_vendor.systemInfo.windowWidth - menuRect.left);
      const _boxStyle = {
        ...defaultStyle,
        "z-index": this.zIndex,
        "--td-navbar-center-left": `${maxSpacing}px`,
        // 标题左侧距离
        "--td-navbar-center-width": `${Math.max(menuRect.left - maxSpacing, 0)}px`
        // 标题宽度
      };
      const boxStyle = Object.entries(_boxStyle).map(([k, v]) => `${k}: ${v}`).join("; ");
      this.boxStyle = boxStyle;
      this._boxStyle = _boxStyle;
    },
    getLeftRect() {
      common_vendor.getRect(this, `.${name}__left`).then((res) => {
        if (res.right > this._leftRect.right) {
          this.calcCenterStyle(res, this._menuRect, this._boxStyle);
        }
      });
    },
    getMenuRect() {
      let rect = {
        ...BASE_MENU_RECT,
        bottom: BASE_MENU_RECT.top + BASE_MENU_RECT.height,
        left: BASE_MENU_RECT.right - BASE_MENU_RECT.width
      };
      if (common_vendor.index.getMenuButtonBoundingClientRect && typeof common_vendor.index.getMenuButtonBoundingClientRect === "function" && typeof common_vendor.index.getMenuButtonBoundingClientRect() === "object") {
        rect = common_vendor.index.getMenuButtonBoundingClientRect() || {};
      }
      this._menuRect = rect;
      this._leftRect = {
        right: common_vendor.systemInfo.windowWidth - rect.left
      };
    },
    onMenuButtonBoundingClientRectWeightChange() {
      if (common_vendor.index.onMenuButtonBoundingClientRectWeightChange) {
        this.onMenuButtonBoundingClientRectWeightChangeCallback = (res) => this.queryElements(res);
        common_vendor.index.onMenuButtonBoundingClientRectWeightChange(this.onMenuButtonBoundingClientRectWeightChangeCallback);
      }
    },
    offMenuButtonBoundingClientRectWeightChange() {
      if (this.onMenuButtonBoundingClientRectWeightChangeCallback) {
        common_vendor.index.offMenuButtonBoundingClientRectWeightChange(this.onMenuButtonBoundingClientRectWeightChangeCallback);
      }
    },
    /**
     * 比较胶囊条和navbar内容，决定是否隐藏
     * @param capsuleRect API返回值，胶囊条的位置信息
     */
    queryElements(capsuleRect) {
      Promise.all([
        common_vendor.getRect(this, `.${this.classPrefix}__left`),
        common_vendor.getRect(this, `.${this.classPrefix}__center`)
      ]).then(([leftRect, centerRect]) => {
        const leftRight = Math.round(leftRect.right);
        const centerRight = Math.round(centerRect.right);
        const capsuleLeft = capsuleRect.left;
        this.hideLeft = leftRight > capsuleLeft;
        this.hideCenter = leftRight > capsuleLeft ? true : centerRight > capsuleLeft;
      });
    },
    goBack() {
      const { delta } = this;
      const that = this;
      this.$emit("go-back");
      if (delta > 0) {
        common_vendor.index.navigateBack({
          delta,
          fail(e) {
            that.$emit("fail", e);
          },
          complete(e) {
            that.$emit("complete", e);
          },
          success(e) {
            that.$emit("success", e);
          }
        });
      }
    },
    onClickRight() {
      this.$emit("right-click");
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
    a: _ctx.fixed && _ctx.placeholder
  }, _ctx.fixed && _ctx.placeholder ? {
    b: common_vendor.n(_ctx.classPrefix + "__placeholder " + _ctx.tClassPlaceholder)
  } : {}, {
    c: _ctx.leftArrow
  }, _ctx.leftArrow ? {
    d: common_vendor.p({
      name: "chevron-left",
      ["custom-style"]: _ctx.leftArrowCustomStyle,
      ["t-class"]: _ctx.classPrefix + "__left-arrow"
    }),
    e: common_vendor.n(_ctx.classPrefix + "__btn"),
    f: common_vendor.o((...args) => _ctx.goBack && _ctx.goBack(...args))
  } : {}, {
    g: common_vendor.n(_ctx.classPrefix + "__capsule " + _ctx.tClassCapsule),
    h: common_vendor.n(_ctx.classPrefix + "__left " + (_ctx.hideLeft ? _ctx.classPrefix + "__left--hide" : "") + " " + _ctx.tClassLeft),
    i: _ctx.title
  }, _ctx.title ? {
    j: common_vendor.t(_ctx.showTitle),
    k: common_vendor.n(_ctx.classPrefix + "__center-title " + _ctx.tClassTitle)
  } : {}, {
    l: common_vendor.n(_ctx.classPrefix + "__center " + (_ctx.hideCenter ? _ctx.classPrefix + "__center--hide" : "") + " " + _ctx.tClassCenter),
    m: common_vendor.n(_ctx.classPrefix + "__right"),
    n: common_vendor.o((...args) => _ctx.onClickRight && _ctx.onClickRight(...args)),
    o: common_vendor.n(_ctx.classPrefix + "__content " + _ctx.tClassContent),
    p: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix, [["fixed", _ctx.fixed]]) + " " + _ctx.visibleClass + " " + _ctx.tClass),
    q: common_vendor.s(_ctx.tools._style([_ctx.boxStyle, _ctx.customStyle]))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2cc45b69"]]);
wx.createComponent(Component);
