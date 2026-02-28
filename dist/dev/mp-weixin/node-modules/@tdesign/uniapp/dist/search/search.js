"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const TCell = () => "../cell/cell.js";
const name = `${common_vendor.prefix}-search`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-input-container`,
    `${common_vendor.prefix}-class-input`,
    `${common_vendor.prefix}-class-action`,
    `${common_vendor.prefix}-class-left`,
    `${common_vendor.prefix}-class-clear`
  ],
  components: {
    TIcon,
    TCell
  },
  props: {
    ...common_vendor.props$5
  },
  emits: [],
  data() {
    return {
      classPrefix: name,
      prefix: common_vendor.prefix,
      isShowResultList: false,
      isSelected: false,
      showClearIcon: false,
      tools: common_vendor.tools,
      dataValue: this.value
      // innerMaxLen: -1,
      // rawValue: '',
    };
  },
  watch: {
    resultList: {
      handler(val) {
        const { isSelected } = this;
        if (val.length) {
          if (isSelected) {
            this.isShowResultList = false;
            this.isSelected = false;
          } else {
            this.isShowResultList = true;
          }
        } else {
          this.isShowResultList = false;
        }
      },
      immediate: true
    },
    dataValue: {
      handler() {
        this.updateClearIconVisible();
      }
    },
    clearTrigger: "updateClearIconVisible",
    clearable: "updateClearIconVisible",
    disabled: "updateClearIconVisible",
    readonly: "updateClearIconVisible"
    // maxcharacter: 'updateInnerMaxLen',
    // maxlength: 'updateInnerMaxLen',
  },
  mounted() {
    this.updateClearIconVisible();
  },
  methods: {
    updateClearIconVisible(value = false) {
      const { clearTrigger, disabled, readonly, dataValue } = this;
      if (disabled || readonly || !dataValue) {
        this.showClearIcon = false;
        return;
      }
      this.showClearIcon = value || String(clearTrigger) === "always";
    },
    onInput(e) {
      let { value } = e.detail;
      this.dataValue = value;
      const { maxcharacter } = this;
      if (maxcharacter && typeof maxcharacter === "number" && maxcharacter > 0) {
        const { characters } = common_vendor.getCharacterLength("maxcharacter", value, maxcharacter);
        value = characters;
      }
      common_vendor.nextTick().then(() => {
        this.dataValue = value;
        this.$emit("change", {
          value,
          trigger: "input-change"
        });
      });
    },
    onFocus(e) {
      const { value } = e.detail;
      this.updateClearIconVisible(true);
      this.$emit("focus", { value });
    },
    onBlur(e) {
      const { value } = e.detail;
      this.updateClearIconVisible();
      this.$emit("blur", { value });
    },
    handleClear() {
      this.dataValue = "";
      this.$emit("clear", { value: "" });
      this.$emit("change", {
        value: "",
        trigger: "clear"
      });
    },
    onConfirm(e) {
      const { value } = e.detail;
      this.$emit("submit", { value });
    },
    onActionClick() {
      this.$emit("action-click");
    },
    onSelectOption(tools, { index }) {
      const item = this.resultList[index];
      this.dataValue = item;
      this.isSelected = true;
      this.$emit("change", {
        value: item,
        trigger: "option-click"
      });
    },
    highLight: common_vendor.highLight
    // updateInnerMaxLen() {
    //   // this.innerMaxLen = this.getInnerMaxLen();
    // },
    // getInnerMaxLen() {
    //   const {
    //     maxcharacter,
    //     maxlength,
    //     dataValue,
    //     rawValue,
    //     count,
    //   } = this;
    //   return getInnerMaxLen({
    //     allowInputOverMax: false,
    //     maxcharacter,
    //     maxlength,
    //     dataValue,
    //     rawValue,
    //     count,
    //   });
    // },
  }
});
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_cell2 = common_vendor.resolveComponent("t-cell");
  (_easycom_t_icon2 + _easycom_t_cell2)();
}
const _easycom_t_icon = () => "../icon/icon.js";
const _easycom_t_cell = () => "../cell/cell.js";
if (!Math) {
  (_easycom_t_icon + _easycom_t_cell)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.leftIcon
  }, _ctx.leftIcon ? {
    b: common_vendor.p({
      name: _ctx.leftIcon,
      ["t-class"]: _ctx.prefix + "-icon " + _ctx.tClassLeft,
      ["aria-hidden"]: true
    })
  } : {}, {
    c: _ctx.type,
    d: _ctx.maxlength,
    e: _ctx.disabled || _ctx.readonly,
    f: common_vendor.n(_ctx.prefix + "-input__keyword " + _ctx.tClassInput + " " + (_ctx.disabled ? _ctx.prefix + "-input--disabled" : "")),
    g: _ctx.focus,
    h: _ctx.dataValue,
    i: _ctx.confirmType,
    j: _ctx.confirmHold,
    k: _ctx.cursor,
    l: _ctx.adjustPosition,
    m: _ctx.alwaysEmbed,
    n: _ctx.selectionStart,
    o: _ctx.selectionEnd,
    p: _ctx.holdKeyboard,
    q: _ctx.cursorSpacing,
    r: _ctx.cursorColor,
    s: _ctx.placeholder,
    t: _ctx.placeholderStyle,
    v: _ctx.placeholderClass + " " + _ctx.classPrefix + "__placeholder " + _ctx.classPrefix + "__placeholder--" + (_ctx.center ? "center" : "normal"),
    w: common_vendor.o((...args) => _ctx.onInput && _ctx.onInput(...args)),
    x: common_vendor.o((...args) => _ctx.onFocus && _ctx.onFocus(...args)),
    y: common_vendor.o((...args) => _ctx.onBlur && _ctx.onBlur(...args)),
    z: common_vendor.o((...args) => _ctx.onConfirm && _ctx.onConfirm(...args)),
    A: _ctx.dataValue !== "" && _ctx.clearable && _ctx.showClearIcon
  }, _ctx.dataValue !== "" && _ctx.clearable && _ctx.showClearIcon ? {
    B: common_vendor.p({
      name: "close-circle-filled",
      size: "inherit",
      color: "inherit"
    }),
    C: common_vendor.n(_ctx.classPrefix + "__clear hotspot-expanded " + _ctx.tClassClear),
    D: common_vendor.o((...args) => _ctx.handleClear && _ctx.handleClear(...args))
  } : {}, {
    E: common_vendor.n(_ctx.classPrefix + "__input-box " + _ctx.prefix + "-" + (_ctx.focus ? "is-focused" : "not-focused") + " " + _ctx.classPrefix + "__input-box--" + (_ctx.center ? "center" : "") + " " + _ctx.classPrefix + "__input-box--" + _ctx.shape + " " + _ctx.tClassInputContainer),
    F: _ctx.action
  }, _ctx.action ? {
    G: common_vendor.t(_ctx.action),
    H: common_vendor.n(_ctx.classPrefix + "__search-action " + _ctx.tClassAction),
    I: common_vendor.o((...args) => _ctx.onActionClick && _ctx.onActionClick(...args))
  } : {}, {
    J: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    K: common_vendor.n(_ctx.classPrefix + " " + _ctx.tClass),
    L: _ctx.isShowResultList && !_ctx.isSelected
  }, _ctx.isShowResultList && !_ctx.isSelected ? {
    M: common_vendor.f(_ctx.resultList, (item, index, i0) => {
      return {
        a: _ctx.highLight(item, _ctx.dataValue),
        b: index,
        c: index,
        d: common_vendor.o(($event) => _ctx.onSelectOption($event, {
          index
        }), index),
        e: "d931c66a-2-" + i0
      };
    }),
    N: common_vendor.p({
      ["t-class"]: _ctx.classPrefix + "__result-item",
      hover: true,
      ["aria-role"]: "option"
    }),
    O: common_vendor.n(_ctx.classPrefix + "__result-list")
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-d931c66a"]]);
wx.createComponent(Component);
