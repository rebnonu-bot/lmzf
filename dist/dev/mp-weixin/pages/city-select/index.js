"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_cityData = require("../../utils/cityData.js");
if (!Array) {
  const _easycom_t_icon2 = common_vendor.resolveComponent("t-icon");
  const _easycom_t_search2 = common_vendor.resolveComponent("t-search");
  (_easycom_t_icon2 + _easycom_t_search2)();
}
const _easycom_t_icon = () => "../../node-modules/@tdesign/uniapp/dist/icon/icon.js";
const _easycom_t_search = () => "../../node-modules/@tdesign/uniapp/dist/search/search.js";
if (!Math) {
  (_easycom_t_icon + _easycom_t_search)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const scrollIntoId = common_vendor.ref("");
    const statusBarHeight = common_vendor.ref(0);
    const menuButtonInfo = common_vendor.ref({ top: 0, height: 0 });
    const historyCities = common_vendor.ref([]);
    const hotCities = ["深圳", "广州", "北京", "上海", "济南", "石家庄", "重庆", "成都", "武汉", "长沙", "郑州", "南宁", "昆明", "南京", "西安", "贵阳", "福州", "哈尔滨", "杭州", "乌鲁木齐"];
    const onSearchInput = (e) => {
      var _a;
      let val = "";
      if (typeof e === "string") {
        val = e;
      } else if (((_a = e == null ? void 0 : e.detail) == null ? void 0 : _a.value) !== void 0) {
        val = e.detail.value;
      } else if ((e == null ? void 0 : e.value) !== void 0) {
        val = e.value;
      } else if (typeof (e == null ? void 0 : e.detail) === "string") {
        val = e.detail;
      }
      searchValue.value = val;
      console.log("searchValue updated to:", searchValue.value);
    };
    const onSearchClear = () => {
      searchValue.value = "";
    };
    const navBarStyle = common_vendor.computed(() => {
      const top = menuButtonInfo.value.top;
      const height = menuButtonInfo.value.height;
      return {
        paddingTop: `${top - 6}px`,
        paddingBottom: "12px",
        height: `${height + 12}px`,
        display: "flex",
        alignItems: "center"
      };
    });
    const scrollStyle = common_vendor.computed(() => {
      let headerHeight = 0;
      headerHeight = menuButtonInfo.value.top + menuButtonInfo.value.height + 6;
      return {
        height: `calc(100vh - ${headerHeight}px - 100rpx)`
      };
    });
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      statusBarHeight.value = systemInfo.statusBarHeight || 0;
      const menuButton = common_vendor.index.getMenuButtonBoundingClientRect();
      menuButtonInfo.value = menuButton;
      const history = common_vendor.index.getStorageSync("city_history");
      if (history) {
        historyCities.value = JSON.parse(history);
      }
    });
    const filteredCityGroups = common_vendor.computed(() => {
      const keyword = (searchValue.value || "").trim().toLowerCase();
      if (!keyword)
        return utils_cityData.cityData;
      const results = [];
      for (const group of utils_cityData.cityData) {
        const list = group.list.filter(
          (city) => city.toLowerCase().includes(keyword)
        );
        if (list.length > 0) {
          results.push({
            letter: group.letter,
            list
          });
        }
      }
      return results;
    });
    const totalSearchResultCount = common_vendor.computed(() => {
      return filteredCityGroups.value.reduce((total, group) => total + group.list.length, 0);
    });
    const handleBack = () => {
      common_vendor.index.navigateBack({
        animationType: "slide-out-bottom",
        animationDuration: 300
      });
    };
    const handleReLocate = () => {
      common_vendor.index.showLoading({ title: "定位中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "已更新当前位置", icon: "none" });
      }, 1e3);
    };
    const selectCity = (city) => {
      let history = [...historyCities.value];
      const index = history.indexOf(city);
      if (index > -1) {
        history.splice(index, 1);
      }
      history.unshift(city);
      if (history.length > 8) {
        history = history.slice(0, 8);
      }
      historyCities.value = history;
      common_vendor.index.setStorageSync("city_history", JSON.stringify(history));
      common_vendor.index.$emit("updateCity", city);
      common_vendor.index.navigateBack({
        animationType: "slide-out-bottom",
        animationDuration: 300
      });
    };
    const scrollTo = (id) => {
      if (id === "top")
        scrollIntoId.value = "top";
      else if (id === "history")
        scrollIntoId.value = "history";
      else if (id === "hot")
        scrollIntoId.value = "hot";
      else
        scrollIntoId.value = "letter-" + id;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          name: "chevron-left",
          size: "48rpx"
        }),
        b: common_vendor.o(handleBack),
        c: common_vendor.s(navBarStyle.value),
        d: common_vendor.o(onSearchInput),
        e: common_vendor.o(onSearchInput),
        f: common_vendor.o(onSearchClear),
        g: common_vendor.p({
          placeholder: "输入城市名查询",
          shape: "round",
          modelValue: searchValue.value
        }),
        h: searchValue.value
      }, searchValue.value ? common_vendor.e({
        i: common_vendor.t(totalSearchResultCount.value),
        j: common_vendor.f(filteredCityGroups.value, (group, k0, i0) => {
          return {
            a: common_vendor.f(group.list, (city, k1, i1) => {
              return {
                a: common_vendor.t(city),
                b: city,
                c: common_vendor.o(($event) => selectCity(city), city)
              };
            }),
            b: common_vendor.t(group.letter),
            c: group.letter
          };
        }),
        k: filteredCityGroups.value.length === 0
      }, filteredCityGroups.value.length === 0 ? {
        l: common_vendor.p({
          name: "info-circle",
          size: "80rpx",
          color: "#CBD5E1"
        })
      } : {}) : common_vendor.e({
        m: common_vendor.p({
          name: "location",
          size: "32rpx",
          color: "#000"
        }),
        n: common_vendor.o(handleReLocate),
        o: historyCities.value.length > 0
      }, historyCities.value.length > 0 ? {
        p: common_vendor.f(historyCities.value, (city, k0, i0) => {
          return {
            a: common_vendor.t(city),
            b: city,
            c: common_vendor.o(($event) => selectCity(city), city)
          };
        })
      } : {}, {
        q: common_vendor.f(hotCities, (city, k0, i0) => {
          return {
            a: common_vendor.t(city),
            b: city,
            c: common_vendor.o(($event) => selectCity(city), city)
          };
        }),
        r: common_vendor.f(filteredCityGroups.value, (group, k0, i0) => {
          return {
            a: common_vendor.t(group.letter),
            b: common_vendor.f(group.list, (city, k1, i1) => {
              return {
                a: common_vendor.t(city),
                b: city,
                c: common_vendor.o(($event) => selectCity(city), city)
              };
            }),
            c: group.letter,
            d: "letter-" + group.letter
          };
        })
      }), {
        s: scrollIntoId.value,
        t: common_vendor.s(scrollStyle.value),
        v: !searchValue.value
      }, !searchValue.value ? common_vendor.e({
        w: common_vendor.o(($event) => scrollTo("top")),
        x: historyCities.value.length > 0
      }, historyCities.value.length > 0 ? {
        y: common_vendor.o(($event) => scrollTo("history"))
      } : {}, {
        z: common_vendor.o(($event) => scrollTo("hot")),
        A: common_vendor.f(filteredCityGroups.value, (group, k0, i0) => {
          return {
            a: common_vendor.t(group.letter),
            b: group.letter,
            c: common_vendor.o(($event) => scrollTo(group.letter), group.letter)
          };
        })
      }) : {});
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-02ed011e"]]);
wx.createPage(MiniProgramPage);
