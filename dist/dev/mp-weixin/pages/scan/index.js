"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.onShow(() => {
      common_vendor.index.scanCode({
        onlyFromCamera: false,
        // 允许从相册选择二维码
        scanType: ["qrCode", "barCode", "datamatrix", "pdf417"],
        success: (res) => {
          console.log("扫码结果:", res.result);
          console.log("扫码类型:", res.scanType);
          console.log("字符集:", res.charSet);
          common_vendor.index.showModal({
            title: "扫码成功",
            content: res.result,
            showCancel: false,
            success: () => {
              common_vendor.index.navigateBack();
            }
          });
        },
        fail: (err) => {
          console.log("扫码失败或取消:", err);
          common_vendor.index.navigateBack();
        }
      });
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-99526857"]]);
wx.createPage(MiniProgramPage);
