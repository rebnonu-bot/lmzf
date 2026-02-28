"use strict";
const common_vendor = require("../common/vendor.js");
const mockStore = {};
function initMock() {
  mockStore["/home/cards"] = {
    code: 200,
    message: "请求成功",
    data: [
      {
        url: "/static/home/card0.png",
        desc: "少年,星空与梦想",
        tags: [
          { text: "AI绘画", theme: "primary" },
          { text: "版权素材", theme: "success" }
        ]
      },
      {
        url: "/static/home/card1.png",
        desc: "仰望星空的少女",
        tags: [
          { text: "AI绘画", theme: "primary" },
          { text: "版权素材", theme: "success" }
        ]
      },
      {
        url: "/static/home/card3.png",
        desc: "仰望星空的少年",
        tags: [
          { text: "AI绘画", theme: "primary" },
          { text: "版权素材", theme: "success" }
        ]
      },
      {
        url: "/static/home/card2.png",
        desc: "少年,星空与梦想",
        tags: [
          { text: "AI绘画", theme: "primary" },
          { text: "版权素材", theme: "success" }
        ]
      },
      {
        url: "/static/home/card4.png",
        desc: "多彩的天空",
        tags: [
          { text: "AI绘画", theme: "primary" },
          { text: "版权素材", theme: "success" }
        ]
      }
    ]
  };
  mockStore["/home/swipers"] = {
    code: 200,
    message: "请求成功",
    data: [
      { image: "/static/home/swiper0.png" },
      { image: "/static/home/card0.png" },
      { image: "/static/home/card1.png" }
    ]
  };
  mockStore["/api/searchHistory"] = {
    code: 200,
    data: {
      historyWords: ["邻檬智付", "支付安全", "生活缴费", "物业费", "智家服务"]
    }
  };
  mockStore["/api/searchPopular"] = {
    code: 200,
    data: {
      popularWords: ["扫码支付", "物业缴费", "账单查询", "优惠活动", "实名认证"]
    }
  };
  mockStore["/login/getSendMessage"] = {
    success: true,
    data: { message: "验证码已发送" }
  };
  mockStore["/login/postPasswordLogin"] = {
    success: true,
    data: { token: "mock_token_12345" }
  };
  mockStore["/login/postCodeVerify"] = {
    success: true,
    data: { token: "mock_token_12345" }
  };
  mockStore["/api/getServiceList"] = {
    code: 200,
    data: {
      service: [
        { name: "帮助中心", image: "/static/icon_doc.png", url: "" },
        { name: "官方地图", image: "/static/icon_map.png", url: "" },
        { name: "QQ群", image: "/static/icon_qq.png", url: "" },
        { name: "TDesign", image: "/static/icon_td.png", url: "" }
      ]
    }
  };
  mockStore["/api/genPersonalInfo"] = {
    code: 200,
    data: {
      name: "邻檬智付",
      image: "/static/avatar1.png",
      star: "Lv.5",
      city: "深圳",
      gender: 0,
      birth: "2020-01-01",
      address: ["440000", "440300"],
      introduction: "邻檬智付是邻檬智家旗下的专业支付服务平台，致力于为用户提供便捷、安全的支付体验。",
      photos: [
        { url: "/static/image1.png", name: "image1.png", type: "image" },
        { url: "/static/image2.png", name: "image2.png", type: "image" }
      ]
    }
  };
  mockStore["/dataCenter/member"] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [
              { name: "内容曝光", number: 8420 },
              { name: "阅读人数", number: 2560 },
              { name: "互动量", number: 980 }
            ]
          }
        }
      }
    }
  };
  mockStore["/dataCenter/interaction"] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [
              { name: "评论", number: 320 },
              { name: "点赞", number: 580 },
              { name: "收藏", number: 240 },
              { name: "转发", number: 120 }
            ]
          }
        }
      }
    }
  };
  mockStore["/dataCenter/complete-rate"] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: [
              { time: "0-25%", percentage: 30 },
              { time: "25-50%", percentage: 55 },
              { time: "50-75%", percentage: 42 },
              { time: "75-100%", percentage: 28 }
            ]
          }
        }
      }
    }
  };
  mockStore["/dataCenter/area"] = {
    code: 200,
    data: {
      template: {
        succ: {
          data: {
            list: []
          }
        }
      }
    }
  };
  const originalRequest = common_vendor.index.request;
  common_vendor.index.request = function(options) {
    const url = options.url || "";
    for (const key in mockStore) {
      if (url.endsWith(key)) {
        const mockData = mockStore[key];
        setTimeout(() => {
          if (options.success) {
            options.success({
              data: mockData,
              statusCode: 200,
              header: {},
              cookies: [],
              errMsg: "request:ok"
            });
          }
          if (options.complete) {
            options.complete({});
          }
        }, 300);
        return { abort: () => {
        } };
      }
    }
    return originalRequest(options);
  };
}
exports.initMock = initMock;
