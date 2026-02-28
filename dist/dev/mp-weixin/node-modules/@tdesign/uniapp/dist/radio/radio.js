"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const name = `${common_vendor.prefix}-radio`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  controlledProps: [
    {
      key: "checked",
      event: "change"
    }
  ],
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-label`,
    `${common_vendor.prefix}-class-icon`,
    `${common_vendor.prefix}-class-content`,
    `${common_vendor.prefix}-class-border`
  ],
  mixins: [common_vendor.ChildrenMixin(common_vendor.RELATION_MAP.Radio)],
  components: {
    TIcon
  },
  props: {
    ...common_vendor.props$8,
    borderless: {
      type: Boolean,
      default: false
    },
    tId: {
      type: String
    }
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      customIcon: false,
      slotIcon: false,
      optionLinked: false,
      iconVal: [],
      innerPlacement: "",
      _disabled: false,
      _readonly: false,
      tools: common_vendor.tools,
      dataChecked: common_vendor.coalesce(this.checked, this.defaultChecked)
    };
  },
  computed: {
    isIsolated() {
      return this.relationKey === common_vendor.ISOLATED_RELATION_KEY;
    }
  },
  watch: {
    checked: {
      handler(v) {
        this.dataChecked = v;
      },
      immediate: true
    },
    disabled: {
      handler(v) {
        this._disabled = v;
      },
      immediate: true
    },
    readonly: {
      handler(v) {
        this._readonly = v;
      },
      immediate: true
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    handleTap(e) {
      const { _disabled, _readonly, contentDisabled } = this;
      const { target } = e.currentTarget.dataset;
      if (_disabled || _readonly || target === "text" && contentDisabled)
        return;
      this.doChange();
    },
    doChange() {
      const { value, dataChecked, allowUncheck } = this;
      const parent = this.isIsolated ? null : this[common_vendor.RELATION_MAP.Radio];
      const isAllowUncheck = Boolean(allowUncheck || (parent == null ? void 0 : parent.allowUncheck));
      if (parent) {
        this[common_vendor.RELATION_MAP.Radio].updateValue(dataChecked && isAllowUncheck ? null : value);
      } else {
        this._trigger("change", { checked: isAllowUncheck ? !dataChecked : true });
      }
    },
    init() {
      const { icon } = this;
      const parent = this.isIsolated ? null : this[common_vendor.RELATION_MAP.Radio];
      const isIdArr = Array.isArray((parent == null ? void 0 : parent.icon) || icon);
      this.customIcon = isIdArr;
      this.slotIcon = icon === "slot";
      this.iconVal = isIdArr ? (parent == null ? void 0 : parent.icon) || icon : [];
      this.innerPlacement = this.placement || (parent == null ? void 0 : parent.placement) || "left";
    },
    setDisabled(disabled) {
      if (this.isIsolated)
        return;
      this._disabled = this.disabled || disabled;
    },
    setReadonly(readonly) {
      this._readonly = this.readonly || readonly;
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
    a: _ctx.slotIcon
  }, _ctx.slotIcon ? {} : _ctx.customIcon ? {
    c: _ctx.dataChecked ? _ctx.iconVal[0] : _ctx.iconVal[1],
    d: common_vendor.n(_ctx.classPrefix + "-icon__image"),
    e: common_vendor.n(_ctx.classPrefix + "__image")
  } : common_vendor.e({
    f: _ctx.dataChecked && (_ctx.icon == "circle" || _ctx.icon == "line")
  }, _ctx.dataChecked && (_ctx.icon == "circle" || _ctx.icon == "line") ? {
    g: common_vendor.n(_ctx.classPrefix + "__icon-wrap"),
    h: common_vendor.p({
      name: _ctx.icon == "circle" ? "check-circle-filled" : "check"
    })
  } : {}, {
    i: _ctx.dataChecked && _ctx.icon == "dot"
  }, _ctx.dataChecked && _ctx.icon == "dot" ? {
    j: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__icon-" + _ctx.icon, [["disabled", _ctx._disabled]]))
  } : {}, {
    k: !_ctx.dataChecked && (_ctx.icon == "circle" || _ctx.icon == "dot")
  }, !_ctx.dataChecked && (_ctx.icon == "circle" || _ctx.icon == "dot") ? {
    l: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__icon-circle", [["disabled", _ctx._disabled]]))
  } : {}, {
    m: !_ctx.dataChecked && _ctx.icon == "line"
  }, !_ctx.dataChecked && _ctx.icon == "line" ? {} : {}), {
    b: _ctx.customIcon,
    n: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__icon", [_ctx.innerPlacement, ["checked", _ctx.dataChecked], ["disabled", _ctx._disabled]]) + " " + _ctx.tClassIcon),
    o: _ctx.label
  }, _ctx.label ? {
    p: common_vendor.t(_ctx.label)
  } : {}, {
    q: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__title", [["disabled", _ctx._disabled], ["checked", _ctx.dataChecked]]) + " " + _ctx.tClassLabel),
    r: common_vendor.s("-webkit-line-clamp:" + _ctx.maxLabelRow),
    s: _ctx.content
  }, _ctx.content ? {
    t: common_vendor.t(_ctx.content)
  } : {}, {
    v: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__description", [["disabled", _ctx._disabled], ["checked", _ctx.dataChecked]]) + " " + _ctx.tClassContent),
    w: common_vendor.s("-webkit-line-clamp:" + _ctx.maxContentRow),
    x: common_vendor.n(_ctx.classPrefix + "__content"),
    y: common_vendor.o((...args) => _ctx.handleTap && _ctx.handleTap(...args)),
    z: !_ctx.borderless
  }, !_ctx.borderless ? {
    A: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix + "__border", [_ctx.innerPlacement]) + " " + _ctx.tClassBorder)
  } : {}, {
    B: _ctx.tId,
    C: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    D: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix, [_ctx.innerPlacement, ["block", _ctx.block], ["disabled", _ctx._disabled]]) + " " + _ctx.tClass),
    E: _ctx._disabled,
    F: _ctx.dataChecked,
    G: _ctx.label + _ctx.content,
    H: _ctx._disabled,
    I: common_vendor.o((...args) => _ctx.handleTap && _ctx.handleTap(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a7e95ebd"]]);
wx.createComponent(Component);
