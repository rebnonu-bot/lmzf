"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TIcon = () => "../icon/icon.js";
const name = `${common_vendor.prefix}-input`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  inject: {
    [common_vendor.RELATION_MAP.FormKey]: {
      default: null
    }
  },
  externalClasses: [
    `${common_vendor.prefix}-class`,
    `${common_vendor.prefix}-class-prefix-icon`,
    `${common_vendor.prefix}-class-label`,
    `${common_vendor.prefix}-class-input`,
    `${common_vendor.prefix}-class-clearable`,
    `${common_vendor.prefix}-class-suffix`,
    `${common_vendor.prefix}-class-suffix-icon`,
    `${common_vendor.prefix}-class-tips`
  ],
  components: {
    TIcon
  },
  props: {
    ...common_vendor.props$7
  },
  emits: [
    "blur",
    "change",
    "clear",
    "click",
    "enter",
    "focus",
    "keyboardheightchange",
    "nicknamereview",
    "validate",
    "update:value"
  ],
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      classBasePrefix: common_vendor.prefix,
      showClearIcon: true,
      tools: common_vendor.tools,
      dataValue: common_vendor.coalesce(this.value, this.defaultValue)
      // rawValue: '',
      // innerMaxLen: -1,
    };
  },
  computed: {},
  watch: {
    prefixIcon: {
      handler(v) {
        this._prefixIcon = common_vendor.calcIcon(v);
      },
      immediate: true
    },
    suffixIcon: {
      handler(v) {
        this._suffixIcon = common_vendor.calcIcon(v);
      },
      immediate: true
    },
    clearable: {
      handler(v) {
        this._clearIcon = common_vendor.calcIcon(v, "close-circle-filled");
      },
      immediate: true
    },
    clearTrigger: "updateClearIconVisible",
    disabled: "updateClearIconVisible",
    readonly: "updateClearIconVisible",
    value: {
      handler(v) {
        this.dataValue = v;
        common_vendor.nextTick().then(() => {
          this.dataValue = v;
          if (this[common_vendor.RELATION_MAP.FormKey] && this[common_vendor.RELATION_MAP.FormKey].onValueChange) {
            this[common_vendor.RELATION_MAP.FormKey].onValueChange(v);
          }
        });
      }
    }
  },
  mounted() {
    const { value, defaultValue } = this;
    this.updateValue(common_vendor.coalesce(value, defaultValue, ""));
    this.updateClearIconVisible();
  },
  methods: {
    getInputClass: common_vendor.getInputClass,
    updateValue(value) {
      this.dataValue = value;
      const { allowInputOverMax, maxcharacter, maxlength } = this;
      if (!allowInputOverMax && maxcharacter && maxcharacter > 0 && !Number.isNaN(maxcharacter)) {
        const { length, characters } = common_vendor.getCharacterLength("maxcharacter", value, maxcharacter);
        common_vendor.nextTick().then(() => {
          this.dataValue = characters;
        });
        this.count = length;
      } else if (!allowInputOverMax && maxlength && maxlength > 0 && !Number.isNaN(maxlength)) {
        const { length, characters } = common_vendor.getCharacterLength("maxlength", value, maxlength);
        common_vendor.nextTick().then(() => {
          this.dataValue = characters;
        });
        this.count = length;
      } else {
        common_vendor.nextTick().then(() => {
          this.dataValue = value;
        });
        this.dataValue = value;
        this.count = common_vendor.isDef(value) ? String(value).length : 0;
      }
    },
    // updateInnerMaxLen() {
    // this.innerMaxLen = this.getInnerMaxLen();
    // },
    // getInnerMaxLen() {
    //   const {
    //     allowInputOverMax,
    //     maxcharacter,
    //     maxlength,
    //     dataValue,
    //     rawValue,
    //     count,
    //   } = this;
    //   return getInnerMaxLen({
    //     allowInputOverMax,
    //     maxcharacter,
    //     maxlength,
    //     dataValue,
    //     rawValue,
    //     count,
    //   });
    // },
    updateClearIconVisible(value = false) {
      const { clearTrigger, disabled, readonly } = this;
      if (disabled || readonly) {
        this.showClearIcon = false;
        return;
      }
      this.showClearIcon = value || clearTrigger === "always";
    },
    onInput(e) {
      const { value, cursor, keyCode } = e.detail;
      this.updateValue(value);
      this.emitChange({ value: this.dataValue, cursor, keyCode });
    },
    onChange(e) {
      if (this.type !== "nickname")
        return;
      const { value } = e.detail;
      this.updateValue(value);
      this.emitChange({ value: this.dataValue });
    },
    emitChange(data) {
      this.$emit("change", data);
      this.$emit("update:value", data.value);
    },
    onFocus(e) {
      this.updateClearIconVisible(true);
      this.$emit("focus", e.detail);
    },
    onBlur(e) {
      this.updateClearIconVisible();
      if (this[common_vendor.RELATION_MAP.FormKey] && this[common_vendor.RELATION_MAP.FormKey].onBlur) {
        this[common_vendor.RELATION_MAP.FormKey].onBlur(this.dataValue);
      }
      if (typeof this.format === "function") {
        const v = this.format(e.detail.value);
        this.updateValue(v);
        this.$emit("blur", { value: this.dataValue, cursor: this.count });
        return;
      }
      this.$emit("blur", e.detail);
    },
    onConfirm(e) {
      this.$emit("enter", e.detail);
    },
    onSuffixClick() {
      this.$emit("click", { trigger: "suffix" });
    },
    onSuffixIconClick() {
      this.$emit("click", { trigger: "suffix-icon" });
    },
    clearInput(e) {
      this.$emit("clear", e.detail);
      this.dataValue = "";
    },
    onKeyboardHeightChange(e) {
      this.$emit("keyboardheightchange", e.detail);
    },
    onNickNameReview(e) {
      this.$emit("nicknamereview", e.detail);
    },
    onClick() {
      this.$emit("click", { trigger: "input" });
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
    a: _ctx._prefixIcon
  }, _ctx._prefixIcon ? {
    b: common_vendor.o(($event) => _ctx._prefixIcon.click || ""),
    c: common_vendor.p({
      ["custom-style"]: _ctx._prefixIcon.style || "",
      ["t-class"]: _ctx.tClassPrefixIcon,
      prefix: _ctx._prefixIcon.prefix,
      name: _ctx._prefixIcon.name,
      size: _ctx._prefixIcon.size,
      color: _ctx._prefixIcon.color,
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._prefixIcon.ariaLabel,
      ["aria-role"]: _ctx._prefixIcon.ariaRole
    })
  } : {}, {
    d: common_vendor.n(_ctx.classPrefix + "__icon--prefix"),
    e: _ctx.label
  }, _ctx.label ? {
    f: common_vendor.t(_ctx.label)
  } : {}, {
    g: common_vendor.n(_ctx.classPrefix + "__label " + _ctx.tClassLabel),
    h: common_vendor.n(_ctx.classPrefix + "__wrap--prefix"),
    i: common_vendor.n(_ctx.getInputClass(_ctx.classPrefix, _ctx.suffix, _ctx.align, _ctx.disabled) + " " + _ctx.tClassInput),
    j: _ctx.allowInputOverMax ? -1 : _ctx.maxlength,
    k: _ctx.disabled || _ctx.readonly,
    l: _ctx.placeholder,
    m: _ctx.placeholderStyle,
    n: _ctx.tools.cls(_ctx.classPrefix + "__placeholder", [["disabled", _ctx.disabled]]) + " " + _ctx.placeholderClass,
    o: _ctx.dataValue,
    p: _ctx.type === "password",
    q: _ctx.type === "password" ? "text" : _ctx.type,
    r: _ctx.focus,
    s: _ctx.confirmType,
    t: _ctx.confirmHold,
    v: _ctx.cursor,
    w: _ctx.cursorColor,
    x: _ctx.cursorSpacing,
    y: _ctx.adjustPosition,
    z: _ctx.autoFocus,
    A: _ctx.alwaysEmbed,
    B: _ctx.selectionStart,
    C: _ctx.selectionEnd,
    D: _ctx.holdKeyboard,
    E: _ctx.safePasswordCertPath,
    F: _ctx.safePasswordLength,
    G: _ctx.safePasswordTimeStamp,
    H: _ctx.safePasswordNonce,
    I: _ctx.safePasswordSalt,
    J: _ctx.safePasswordCustomHash,
    K: _ctx.label,
    L: _ctx.label,
    M: common_vendor.o((...args) => _ctx.onInput && _ctx.onInput(...args)),
    N: common_vendor.o((...args) => _ctx.onChange && _ctx.onChange(...args)),
    O: common_vendor.o((...args) => _ctx.onFocus && _ctx.onFocus(...args)),
    P: common_vendor.o((...args) => _ctx.onBlur && _ctx.onBlur(...args)),
    Q: common_vendor.o((...args) => _ctx.onConfirm && _ctx.onConfirm(...args)),
    R: common_vendor.o((...args) => _ctx.onKeyboardHeightChange && _ctx.onKeyboardHeightChange(...args)),
    S: common_vendor.o((...args) => _ctx.onNickNameReview && _ctx.onNickNameReview(...args)),
    T: _ctx._clearIcon && _ctx.dataValue && _ctx.dataValue.length && _ctx.showClearIcon
  }, _ctx._clearIcon && _ctx.dataValue && _ctx.dataValue.length && _ctx.showClearIcon ? {
    U: common_vendor.o(($event) => _ctx._clearIcon.click || ""),
    V: common_vendor.p({
      ["custom-style"]: _ctx._clearIcon.style || "",
      ["t-class"]: _ctx.tClassClearable,
      prefix: _ctx._clearIcon.prefix,
      name: _ctx._clearIcon.name,
      size: _ctx._clearIcon.size,
      color: _ctx._clearIcon.color,
      ["aria-hidden"]: false,
      ["aria-label"]: _ctx._clearIcon.ariaLabel || "清除",
      ["aria-role"]: _ctx._clearIcon.ariaRole || "button"
    }),
    W: common_vendor.n(_ctx.classPrefix + "__wrap--clearable-icon"),
    X: common_vendor.o((...args) => _ctx.clearInput && _ctx.clearInput(...args))
  } : {}, {
    Y: _ctx.suffix
  }, _ctx.suffix ? {
    Z: common_vendor.t(_ctx.suffix)
  } : {}, {
    aa: common_vendor.n(_ctx.classPrefix + "__wrap--suffix " + _ctx.tClassSuffix),
    ab: common_vendor.o((...args) => _ctx.onSuffixClick && _ctx.onSuffixClick(...args)),
    ac: _ctx._suffixIcon
  }, _ctx._suffixIcon ? {
    ad: common_vendor.o(($event) => _ctx._suffixIcon.click || ""),
    ae: common_vendor.p({
      ["custom-style"]: _ctx._suffixIcon.style || "",
      ["t-class"]: _ctx.tClassSuffixIcon,
      prefix: _ctx._suffixIcon.prefix,
      name: _ctx._suffixIcon.name,
      size: _ctx._suffixIcon.size,
      color: _ctx._suffixIcon.color,
      ["aria-hidden"]: true,
      ["aria-label"]: _ctx._suffixIcon.ariaLabel,
      ["aria-role"]: _ctx._suffixIcon.ariaRole || "button"
    })
  } : {}, {
    af: common_vendor.n(_ctx.classPrefix + "__wrap--suffix-icon"),
    ag: common_vendor.o((...args) => _ctx.onSuffixIconClick && _ctx.onSuffixIconClick(...args)),
    ah: common_vendor.n(_ctx.classPrefix + "__content " + _ctx.classPrefix + "--" + _ctx.status),
    ai: common_vendor.o((...args) => _ctx.onClick && _ctx.onClick(...args)),
    aj: _ctx.tips && _ctx.tips.length > 0
  }, _ctx.tips && _ctx.tips.length > 0 ? {
    ak: common_vendor.t(_ctx.tips),
    al: common_vendor.n(_ctx.classPrefix + "__tips " + _ctx.classPrefix + "--" + _ctx.align + " " + _ctx.tClassTips)
  } : {}, {
    am: common_vendor.n(_ctx.classPrefix + "__wrap"),
    an: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    ao: common_vendor.n(_ctx.tools.cls(_ctx.classPrefix, [["border", !_ctx.borderless], ["readonly", _ctx.readonly], ["disabled", _ctx.disabled]]) + " " + _ctx.classPrefix + "--layout-" + _ctx.layout + " " + _ctx.tClass)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-990e691b"]]);
wx.createComponent(Component);
