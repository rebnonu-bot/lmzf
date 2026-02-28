"use strict";
const common_vendor = require("../../../../../common/vendor.js");
const TRadio = () => "../radio/radio.js";
const name = `${common_vendor.prefix}-radio-group`;
const _sfc_main = common_vendor.uniComponent({
  name,
  options: {
    styleIsolation: "shared"
  },
  controlledProps: [
    {
      key: "value",
      event: "change"
    }
  ],
  externalClasses: [
    `${common_vendor.prefix}-class`
  ],
  inject: {
    [common_vendor.RELATION_MAP.FormKey]: {
      default: null
    }
  },
  mixins: [common_vendor.ParentMixin(common_vendor.RELATION_MAP.Radio)],
  components: {
    TRadio
  },
  props: {
    ...common_vendor.props$9
  },
  data() {
    return {
      prefix: common_vendor.prefix,
      classPrefix: name,
      radioOptions: [],
      tools: common_vendor.tools,
      dataValue: common_vendor.coalesce(this.value, this.defaultValue)
    };
  },
  watch: {
    value: {
      handler(v) {
        this.dataValue = v;
      },
      immediate: true,
      deep: true
    },
    dataValue: {
      handler(v) {
        var _a;
        (_a = this.getChildren()) == null ? void 0 : _a.forEach((item) => {
          item.dataChecked = v === item.value;
        });
      },
      immediate: true,
      deep: true
    },
    options: {
      handler() {
        this.initWithOptions();
      },
      immediate: true,
      deep: true
    },
    disabled: {
      handler(v) {
        var _a, _b;
        if ((_a = this.options) == null ? void 0 : _a.length) {
          this.initWithOptions();
          return;
        }
        (_b = this.getChildren()) == null ? void 0 : _b.forEach((item) => {
          item.setDisabled(v);
        });
      },
      immediate: true
    }
  },
  mounted() {
    setTimeout(() => {
      var _a;
      (_a = this.getChildren()) == null ? void 0 : _a.forEach((item) => {
        item.dataChecked = this.dataValue === item.value;
        item.setDisabled(this.disabled);
      });
    }, 33);
  },
  methods: {
    innerAfterLinked(target) {
      const { value, disabled, readonly } = this;
      target.dataChecked = value === target.value;
      target.setDisabled(disabled);
      target.setReadonly(readonly);
    },
    getChildren() {
      let items = this.children;
      if (!(items == null ? void 0 : items.length)) {
        items = this.$refs[`.${common_vendor.prefix}-radio-option`];
      }
      return items;
    },
    updateValue(value) {
      this._trigger("change", { value });
      this.onChange(value);
    },
    handleRadioChange(tools, { value, index, allowUncheck, checked }) {
      this._trigger("change", checked === false && allowUncheck ? { value: null, index } : { value, index });
    },
    onChange(value) {
      if (this[common_vendor.RELATION_MAP.FormKey] && this[common_vendor.RELATION_MAP.FormKey].onValueChange) {
        this[common_vendor.RELATION_MAP.FormKey].onValueChange(value);
      }
    },
    // 支持自定义options
    initWithOptions() {
      const { options, value, keys, disabled, readonly } = this;
      if (!(options == null ? void 0 : options.length) || !Array.isArray(options)) {
        this.radioOptions = [];
        return;
      }
      const optionsValue = [];
      try {
        options.forEach((element) => {
          const typeName = typeof element;
          if (typeName === "number" || typeName === "string") {
            optionsValue.push({
              label: `${element}`,
              value: element,
              checked: value === element,
              disabled,
              readonly
            });
          } else if (typeName === "object") {
            optionsValue.push({
              ...element,
              label: element[common_vendor.coalesce(keys == null ? void 0 : keys.label, "label")],
              value: element[common_vendor.coalesce(keys == null ? void 0 : keys.value, "value")],
              checked: value === element[common_vendor.coalesce(keys == null ? void 0 : keys.value, "value")],
              disabled: element.disabled || disabled,
              readonly: element.readonly || readonly
            });
          }
        });
        this.radioOptions = optionsValue;
      } catch (error) {
      }
    }
  }
});
if (!Array) {
  const _easycom_t_radio2 = common_vendor.resolveComponent("t-radio");
  _easycom_t_radio2();
}
const _easycom_t_radio = () => "../radio/radio.js";
if (!Math) {
  _easycom_t_radio();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(_ctx.radioOptions, (item, index, i0) => {
      return {
        a: common_vendor.sr(_ctx.prefix + "-radio-option", "1fec7f36-0-" + i0, {
          "f": 1
        }),
        b: index,
        c: index,
        d: item.value,
        e: item.allowUncheck || _ctx.allowUncheck,
        f: common_vendor.o(($event) => _ctx.handleRadioChange($event, {
          index,
          value: item.value,
          allowUncheck: item.allowUncheck || _ctx.allowUncheck
        }), index),
        g: "1fec7f36-0-" + i0,
        h: common_vendor.p({
          block: item.block || true,
          label: item.label || "",
          value: item.value,
          checked: item.checked || false,
          content: item.content || "",
          ["allow-uncheck"]: item.allowUncheck || _ctx.allowUncheck,
          ["content-disabled"]: item.contentDisabled || false,
          readonly: item.readonly || false,
          disabled: item.disabled || false,
          icon: item.icon || _ctx.icon,
          placement: item.placement || _ctx.placement,
          ["max-content-row"]: item.maxContentRow || 5,
          ["max-label-row"]: item.maxLabelRow || 3,
          name: item.name || "",
          borderless: _ctx.borderless,
          ["relation-key"]: _ctx.relationKey
        })
      };
    }),
    b: _ctx.prefix + "-radio-option",
    c: common_vendor.n(_ctx.prefix + "-radio-option"),
    d: common_vendor.s(_ctx.tools._style([_ctx.customStyle])),
    e: common_vendor.n(_ctx.classPrefix + " " + _ctx.tClass)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
