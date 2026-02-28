"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
if (!Array) {
  const _easycom_t_navbar2 = common_vendor.resolveComponent("t-navbar");
  const _easycom_t_input2 = common_vendor.resolveComponent("t-input");
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_radio2 = common_vendor.resolveComponent("t-radio");
  const _easycom_t_radio_group2 = common_vendor.resolveComponent("t-radio-group");
  const _easycom_t_button2 = common_vendor.resolveComponent("t-button");
  const _easycom_t_link2 = common_vendor.resolveComponent("t-link");
  (_easycom_t_navbar2 + _easycom_t_input2 + _easycom_t_icon2 + _easycom_t_radio2 + _easycom_t_radio_group2 + _easycom_t_button2 + _easycom_t_link2)();
}
const _easycom_t_navbar = () => "../../node-modules/@tdesign/uniapp/dist/navbar/navbar.js";
const _easycom_t_input = () => "../../node-modules/@tdesign/uniapp/dist/input/input.js";
const _easycom_t_icon = () => "../../node-modules/@tdesign/uniapp/dist/icon/icon.js";
const _easycom_t_radio = () => "../../node-modules/@tdesign/uniapp/dist/radio/radio.js";
const _easycom_t_radio_group = () => "../../node-modules/@tdesign/uniapp/dist/radio-group/radio-group.js";
const _easycom_t_button = () => "../../node-modules/@tdesign/uniapp/dist/button/button.js";
const _easycom_t_link = () => "../../node-modules/@tdesign/uniapp/dist/link/link.js";
if (!Math) {
  (_easycom_t_navbar + _easycom_t_input + _easycom_t_icon + _easycom_t_radio + _easycom_t_radio_group + _easycom_t_button + _easycom_t_link)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const phoneNumber = common_vendor.ref("");
    const isPhoneNumber = common_vendor.ref(false);
    const isCheck = common_vendor.ref(false);
    const isPasswordLogin = common_vendor.ref(false);
    const passwordInfo = common_vendor.ref({
      account: "",
      password: ""
    });
    const radioValue = common_vendor.ref("");
    const isSubmit = common_vendor.computed(() => {
      if (isPasswordLogin.value) {
        return passwordInfo.value.account !== "" && passwordInfo.value.password !== "" && isCheck.value;
      }
      return isPhoneNumber.value && isCheck.value;
    });
    const onPhoneInput = (e) => {
      const value = (e == null ? void 0 : e.value) || e.value;
      isPhoneNumber.value = /^[1][3,4,5,7,8,9][0-9]{9}$/.test(value);
      phoneNumber.value = value;
    };
    const onCheckChange = (e) => {
      const value = (e == null ? void 0 : e.value) || e.value;
      radioValue.value = value;
      isCheck.value = value === "agree";
    };
    const onAccountChange = (e) => {
      const value = (e == null ? void 0 : e.value) || e.value;
      passwordInfo.value.account = value;
    };
    const onPasswordChange = (e) => {
      const value = (e == null ? void 0 : e.value) || e.value;
      passwordInfo.value.password = value;
    };
    const changeLogin = () => {
      isPasswordLogin.value = !isPasswordLogin.value;
    };
    const login = async () => {
      if (isPasswordLogin.value) {
        const res = await api_request.request("/login/postPasswordLogin", "POST", passwordInfo.value);
        if (res.success) {
          common_vendor.index.setStorageSync("access_token", res.data.token);
          common_vendor.index.navigateTo({
            url: "/pages/my/index"
          });
        }
      } else {
        const res = await api_request.request("/login/getSendMessage");
        if (res.success) {
          common_vendor.index.navigateTo({
            url: `/pages/loginCode/loginCode?phoneNumber=${phoneNumber.value}`
          });
        }
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          ["left-arrow"]: true,
          placeholder: true
        }),
        b: isPasswordLogin.value
      }, isPasswordLogin.value ? {
        c: common_vendor.o(onAccountChange),
        d: common_vendor.o(($event) => passwordInfo.value.account = $event),
        e: common_vendor.p({
          label: "账号",
          placeholder: "请输入手机号/邮箱",
          value: passwordInfo.value.account
        }),
        f: common_vendor.o(onPasswordChange),
        g: common_vendor.p({
          label: "密码",
          placeholder: "请输入密码",
          type: "password",
          clearable: true,
          value: passwordInfo.value.password
        })
      } : {
        h: common_vendor.p({
          name: "caret-down-small",
          size: "40rpx"
        }),
        i: common_vendor.o(onPhoneInput),
        j: common_vendor.o(($event) => phoneNumber.value = $event),
        k: common_vendor.p({
          placeholder: "请输入手机号",
          type: "number",
          value: phoneNumber.value
        })
      }, {
        l: common_vendor.p({
          label: "同意《协议条款》",
          value: "agree"
        }),
        m: common_vendor.o(onCheckChange),
        n: common_vendor.p({
          ["allow-uncheck"]: true,
          borderless: true,
          value: radioValue.value
        }),
        o: common_vendor.t(isPasswordLogin.value ? "登录" : "验证并登录"),
        p: common_vendor.o(login),
        q: common_vendor.p({
          theme: "primary",
          size: "large",
          block: true,
          disabled: !isSubmit.value
        }),
        r: isPasswordLogin.value
      }, isPasswordLogin.value ? {
        s: common_vendor.p({
          theme: "primary",
          size: "small"
        })
      } : {}, {
        t: common_vendor.t(isPasswordLogin.value ? "验证码登录" : "密码登录"),
        v: common_vendor.o(changeLogin),
        w: common_vendor.p({
          variant: "outline",
          theme: "default",
          size: "medium",
          shape: "round"
        }),
        x: common_vendor.p({
          variant: "outline",
          theme: "default",
          size: "medium",
          icon: "logo-wechat-stroke",
          shape: "circle"
        }),
        y: common_vendor.p({
          variant: "outline",
          theme: "default",
          size: "medium",
          icon: "logo-qq",
          shape: "circle"
        }),
        z: common_vendor.p({
          variant: "outline",
          theme: "default",
          size: "medium",
          icon: "logo-wecom",
          shape: "circle"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cdfe2409"]]);
wx.createPage(MiniProgramPage);
