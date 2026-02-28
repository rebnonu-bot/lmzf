"use strict";
const common_vendor = require("../common/vendor.js");
const config = require("../config.js");
const { baseUrl } = config.config;
const delay = 500;
function request(url, method = "GET", data = {}) {
  const header = {
    "content-type": "application/json"
  };
  const tokenString = common_vendor.index.getStorageSync("access_token");
  if (tokenString) {
    header.Authorization = `Bearer ${tokenString}`;
  }
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: baseUrl + url,
      method,
      data,
      header,
      success(res) {
        setTimeout(() => {
          if (res.statusCode === 200) {
            resolve(res.data);
          } else {
            reject(res);
          }
        }, delay);
      },
      fail(err) {
        setTimeout(() => {
          reject(err);
        }, delay);
      }
    });
  });
}
exports.request = request;
