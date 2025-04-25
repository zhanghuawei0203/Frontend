if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    data() {
      return {
        selectedImage: "",
        resultImage: "",
        productData: "",
        productList: []
      };
    },
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 1,
          // 只允许选择一张图片
          sourceType: ["album"],
          success: (res) => {
            this.selectedImage = res.tempFilePaths[0];
          },
          fail: (err) => {
            formatAppLog("error", "at pages/index/index.vue:45", "选择图片失败", err);
          }
        });
      },
      takePhoto() {
        uni.chooseImage({
          count: 1,
          // 只允许选择一张图片
          sourceType: ["camera"],
          success: (res) => {
            this.selectedImage = res.tempFilePaths[0];
          },
          fail: (err) => {
            formatAppLog("error", "at pages/index/index.vue:58", "拍摄图片失败", err);
          }
        });
      },
      detectImage() {
        if (this.selectedImage) {
          const backendUrl = "http://10.153.72.152:8080/detect";
          uni.uploadFile({
            url: backendUrl,
            filePath: this.selectedImage,
            name: "image",
            responseType: "arraybuffer",
            // 指定响应类型为二进制数据
            success: (res) => {
              if (res.statusCode === 200) {
                this.productData = JSON.parse(res.data);
                this.productList = this.productData.data;
                if (this.productData.image_url) {
                  this.resultImage = `http://10.153.72.152:8080${this.productData.image_url}`;
                } else {
                  formatAppLog("error", "at pages/index/index.vue:80", "后端返回的结果中没有图片 URL");
                }
              } else {
                formatAppLog("error", "at pages/index/index.vue:83", "上传失败，状态码：", res.statusCode);
              }
            },
            fail: (err) => {
              formatAppLog("error", "at pages/index/index.vue:87", "上传失败", err);
            }
          });
        } else {
          formatAppLog("error", "at pages/index/index.vue:91", "请先选择或拍摄图片");
        }
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "title" }, "YOLOv8目标检测"),
      vue.createElementVNode("view", { class: "upload-section" }, [
        vue.createElementVNode("button", {
          onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseImage && $options.chooseImage(...args))
        }, "选择图片"),
        vue.createElementVNode("button", {
          onClick: _cache[1] || (_cache[1] = (...args) => $options.takePhoto && $options.takePhoto(...args))
        }, "拍照上传"),
        vue.createElementVNode("button", {
          onClick: _cache[2] || (_cache[2] = (...args) => $options.detectImage && $options.detectImage(...args))
        }, "检测")
      ]),
      vue.createElementVNode("view", { class: "image-section" }, [
        $data.selectedImage ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: $data.selectedImage,
          mode: "aspectFit",
          class: "original-image"
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
        $data.resultImage ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 1,
          src: $data.resultImage,
          mode: "aspectFit",
          class: "result-image"
        }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createCommentVNode(" 循环渲染商品列表 "),
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($data.productList, (product) => {
          return vue.openBlock(), vue.createElementBlock("view", {
            class: "product-item",
            key: product.id
          }, [
            vue.createElementVNode(
              "view",
              { class: "product-name" },
              vue.toDisplayString(product.Name),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "product-id" },
              "ID: " + vue.toDisplayString(product.id),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "product-price" },
              vue.toDisplayString(product.price),
              1
              /* TEXT */
            ),
            vue.createElementVNode(
              "view",
              { class: "product-size" },
              vue.toDisplayString(product.size),
              1
              /* TEXT */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/2.develop tool/web/HBuilderX/data/Marketapp/Marketapp/Marketapp/pages/index/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 列表 ");
  }
  const PagesListList = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/2.develop tool/web/HBuilderX/data/Marketapp/Marketapp/Marketapp/pages/list/list.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {};
    },
    methods: {}
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " 我的 ");
  }
  const PagesMeMe = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/2.develop tool/web/HBuilderX/data/Marketapp/Marketapp/Marketapp/pages/me/me.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/list/list", PagesListList);
  __definePage("pages/me/me", PagesMeMe);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/2.develop tool/web/HBuilderX/data/Marketapp/Marketapp/Marketapp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
