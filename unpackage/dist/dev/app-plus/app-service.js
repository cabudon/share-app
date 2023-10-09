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
(function(vue, shared) {
  "use strict";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$9 = {
    name: "diy-noticebar",
    props: {
      // 是否显示左侧的图片
      leftImg: {
        type: String,
        default: ""
      },
      // 是否显示左侧的图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 是否自动播放
      autoplay: {
        type: Boolean,
        default: true
      },
      // 文字颜色，各图标也会使用文字颜色
      color: {
        type: String,
        default: ""
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: ""
      },
      // 是否显示
      show: {
        type: Boolean,
        default: true
      },
      vertical: {
        type: Boolean,
        default: false
      },
      // 滚动一个周期的时间长，单位ms
      duration: {
        type: [Number, String],
        default: 2e3
      },
      interval: {
        type: [Number, String],
        default: 2e3
      },
      // 字体大小，单位rpx
      fontSize: {
        type: [Number, String],
        default: 28
      },
      // 水平滚动时的滚动速度，即每秒滚动多少rpx，这有利于控制文字无论多少时，都能有一个恒定的速度
      speed: {
        type: [Number, String],
        default: 160
      },
      // 播放状态，play-播放，paused-暂停
      playState: {
        type: String,
        default: "play"
      },
      // 通知的边距
      padding: {
        type: [Number, String],
        default: "18rpx 24rpx"
      },
      remote: {
        type: Boolean,
        default: false
      },
      list: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        elClass: this.$tools.guid(),
        textWidth: 0,
        // 滚动的文字宽度
        boxWidth: 0,
        // 供文字滚动的父盒子的宽度，和前者一起为了计算滚动速度
        animationDuration: "10s",
        // 动画执行时间
        animationPlayState: "paused",
        // 动画的开始和结束执行
        showText: ""
        // 显示的文本
      };
    },
    watch: {
      playState(val) {
        if (val == "play")
          this.animationPlayState = "running";
        else
          this.animationPlayState = "paused";
      },
      speed(val) {
        if (!this.remote) {
          this.initSize();
        }
      },
      list(val) {
        setTimeout(() => this.initSize(), 10);
      }
    },
    computed: {
      // 计算字体颜色，如果没有自定义的，就用uview主题颜色
      computeColor() {
        if (this.color)
          return this.color;
        else if (this.type == "none")
          return "#606266";
        else
          return this.type;
      },
      // 文字内容的样式
      textStyle() {
        let style = {};
        if (this.color)
          style.color = this.color;
        else if (this.type == "none")
          style.color = "#606266";
        style.fontSize = this.fontSize + "rpx";
        return style;
      },
      // 计算背景颜色
      computeBgColor() {
        if (this.bgColor)
          return this.bgColor;
        else if (this.type == "none")
          return "transparent";
      }
    },
    mounted() {
      if (!this.remote) {
        this.$nextTick(() => {
          this.initSize();
        });
      }
    },
    methods: {
      initSize() {
        if (!this.vertical) {
          let query = [];
          let textQuery = new Promise((resolve, reject) => {
            uni.createSelectorQuery().in(this).select("." + this.elClass).boundingClientRect().exec((ret) => {
              this.textWidth = ret[0].width;
              resolve();
            });
          });
          query.push(textQuery);
          Promise.all(query).then(() => {
            this.animationDuration = `${this.textWidth / uni.upx2px(this.speed)}s`;
            this.animationPlayState = "paused";
            setTimeout(() => {
              if (this.playState == "play" && this.autoplay)
                this.animationPlayState = "running";
            }, 10);
          });
        }
      }
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "diy-notice-bar flex1",
        style: vue.normalizeStyle({
          background: $options.computeBgColor,
          padding: $props.padding
        })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "flex align-center",
            style: vue.normalizeStyle([$options.textStyle])
          },
          [
            $props.leftImg ? (vue.openBlock(), vue.createElementBlock("image", {
              key: 0,
              class: "diy-notice-img",
              src: $props.leftImg
            }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true),
            $props.leftIcon ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 1,
              class: vue.normalizeClass($props.leftIcon),
              color: $options.computeColor
            }, null, 10, ["color"])) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", {
              class: "diy-notice-box flex-sub",
              id: "diy-notice-box"
            }, [
              $props.vertical ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "diy-notice-swiper flex-sub"
              }, [
                vue.renderSlot(_ctx.$slots, "content")
              ])) : (vue.openBlock(), vue.createElementBlock(
                "view",
                {
                  key: 1,
                  class: vue.normalizeClass(["diy-notice-content flex-sub", [$data.elClass]]),
                  style: vue.normalizeStyle({
                    animationDuration: $data.animationDuration,
                    animationPlayState: $data.animationPlayState
                  })
                },
                [
                  vue.createElementVNode("div", {
                    class: "diy-notice-text",
                    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.click && _ctx.click(...args))
                  }, [
                    vue.renderSlot(_ctx.$slots, "content")
                  ])
                ],
                6
                /* CLASS, STYLE */
              ))
            ])
          ],
          4
          /* STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/java-study/fe-learning/uniapp-share-app/components/diy-noticebar/diy-noticebar.vue"]]);
  function formatAppLog(type2, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type2, filename, ...args);
    } else {
      console[type2].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const _sfc_main$8 = {
    data() {
      return {
        //用户全局信息
        userInfo: {},
        //页面传参
        globalOption: {},
        //自定义全局变量
        globalData: {},
        tabsDatas: [
          { text: `发现`, icon: `` },
          { text: `使用说明`, icon: `` }
        ],
        tabsLeft: 0,
        tabsWidth: 0,
        tabsItemWidth: 0,
        tabsIndex: 0,
        search: ""
      };
    },
    onShow() {
      this.setCurrentPage(this);
    },
    onLoad(option) {
      this.setCurrentPage(this);
      if (option) {
        this.setData({
          globalOption: this.getOption(option)
        });
      }
      this.init();
    },
    methods: {
      async init() {
      },
      changeTabs(evt) {
        let { index } = evt.currentTarget.dataset;
        if (index == this.tabsIndex)
          return;
        this.setData({
          tabsIndex: index
        });
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_diy_noticebar = resolveEasycom(vue.resolveDynamicComponent("diy-noticebar"), __easycom_0$2);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container container25518" }, [
      vue.createElementVNode("view", { class: "flex diygw-col-24 flex-direction-column" }, [
        vue.createElementVNode("view", { class: "diygw-tabs text-center solid-bottom justify-center tabs-title" }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($data.tabsDatas, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                class: vue.normalizeClass(["diygw-tab-item tabs-item-title flex-sub", index == $data.tabsIndex ? " cur text-green " : ""]),
                key: index,
                onClick: _cache[0] || (_cache[0] = (...args) => $options.changeTabs && $options.changeTabs(...args)),
                "data-index": index
              }, [
                item.icon ? (vue.openBlock(), vue.createElementBlock(
                  "text",
                  {
                    key: 0,
                    class: vue.normalizeClass(item.icon)
                  },
                  null,
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true),
                vue.createTextVNode(
                  " " + vue.toDisplayString(item.text),
                  1
                  /* TEXT */
                )
              ], 10, ["data-index"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "" }, [
          $data.tabsIndex == 0 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "flex-sub"
          }, [
            vue.createElementVNode("view", { class: "flex diygw-col-24" }, [
              vue.createVNode(_component_diy_noticebar, {
                class: "flex1 diy-notice-bar",
                color: "#db5f54",
                bgColor: "#fff",
                leftIcon: "diy-icon-notification"
              }, {
                content: vue.withCtx(() => [
                  vue.createElementVNode("text", { class: "diy-notice-item" }, " 程序员启蒙课 ")
                ]),
                _: 1
                /* STABLE */
              })
            ]),
            vue.createElementVNode("view", { class: "diygw-col-24 search-clz" }, [
              vue.createElementVNode("view", { class: "diygw-search" }, [
                vue.createElementVNode("view", { class: "flex1 align-center flex padding-xs solid radius" }, [
                  vue.createElementVNode("text", {
                    style: { "color": "#555 !important" },
                    class: "diy-icon-search"
                  }),
                  vue.withDirectives(vue.createElementVNode(
                    "input",
                    {
                      class: "flex1",
                      name: "search",
                      type: "",
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.search = $event),
                      placeholder: "请输入搜索内容"
                    },
                    null,
                    512
                    /* NEED_PATCH */
                  ), [
                    [vue.vModelText, $data.search]
                  ])
                ]),
                vue.createElementVNode("view", {
                  style: { "color": "#333 !important" },
                  class: "diygw-tag margin-left-xs radius-xs"
                })
              ])
            ]),
            vue.createElementVNode("view", { class: "flex diygw-col-24 items-center flex-nowrap flex-clz" }, [
              vue.createElementVNode("image", {
                src: "/static/icon1_ht.png",
                class: "response diygw-col-3 image-clz",
                mode: "widthFix"
              }),
              vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-17 flex-direction-column flex1-clz" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-24 text-clz diygw-ellipsis" }, " ChatGPT 辅助开发 React 项目 "),
                vue.createElementVNode("view", { class: "diygw-text-line2 diygw-col-24 text1-clz" }, " 带你使用ChatGPT +Copilot 等AI 工具。带你使用ChatGPT +Copilot 等AI 工具带你使用ChatGPT +Copilot 等AI 工具 ")
              ]),
              vue.createElementVNode("view", { class: "flex diygw-col-3 flex-direction-column justify-center items-center flex-wrap" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-24 text2-clz diygw-ellipsis" }, " 10 积分 "),
                vue.createElementVNode("view", { class: "diygw-text-line2 diygw-col-24 text3-clz" }, " 下载 ")
              ])
            ]),
            vue.createElementVNode("view", { class: "flex diygw-col-24 items-center flex-nowrap flex3-clz" }, [
              vue.createElementVNode("image", {
                src: "/static/icon1_ht.png",
                class: "response diygw-col-3 image1-clz",
                mode: "widthFix"
              }),
              vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-17 flex-direction-column flex4-clz" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-24 text4-clz diygw-ellipsis" }, " Docker 实战指南 "),
                vue.createElementVNode("view", { class: "diygw-text-line2 diygw-col-24 text5-clz" }, " Docker 实战指南，从入门到精通。Docker 实战指南，从入门到精通。Docker 实战指南，从入门到精通。 ")
              ]),
              vue.createElementVNode("view", { class: "flex diygw-col-3 flex-direction-column justify-center items-center flex-wrap" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-24 text6-clz diygw-ellipsis" }, " 10 积分 "),
                vue.createElementVNode("view", { class: "diygw-text-line2 diygw-col-24 text7-clz" }, " 下载 ")
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true),
          $data.tabsIndex == 1 ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "flex-sub"
          }, [
            vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-24 flex-direction-column" }, [
              vue.createElementVNode("view", { class: "flex diygw-col-24 flex-nowrap" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-3 text8-clz diygw-ellipsis" }, " 01 "),
                vue.createElementVNode("view", { class: "diygw-col-24 text9-clz" }, " 积分获得方式 ")
              ]),
              vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-24 flex-direction-column flex8-clz" }, [
                vue.createElementVNode("view", { class: "diygw-col-24 text11-clz" }, " 每日签到 "),
                vue.createElementVNode("view", { class: "diygw-col-24 text10-clz" }, " 投稿 ")
              ])
            ]),
            vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-24 flex-direction-column" }, [
              vue.createElementVNode("view", { class: "flex diygw-col-24 flex-nowrap" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-3 text12-clz diygw-ellipsis" }, " 02 "),
                vue.createElementVNode("view", { class: "diygw-col-24 text13-clz" }, " 深入交流 ")
              ]),
              vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-24 flex-direction-column flex11-clz" }, [
                vue.createElementVNode("view", { class: "diygw-col-24 text14-clz" }, " 技术交流群:888 "),
                vue.createElementVNode("view", { class: "diygw-col-24 text15-clz" }, " 投稿：id888 ")
              ])
            ]),
            vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-24 flex-direction-column" }, [
              vue.createElementVNode("view", { class: "flex diygw-col-24 flex-nowrap" }, [
                vue.createElementVNode("view", { class: "diygw-text-line1 diygw-col-3 text16-clz diygw-ellipsis" }, " 03 "),
                vue.createElementVNode("view", { class: "diygw-col-24 text17-clz" }, " 公众号（技术干活分享） ")
              ]),
              vue.createElementVNode("view", { class: "flex flex-wrap diygw-col-24 flex-direction-column flex14-clz" }, [
                vue.createElementVNode("view", { class: "diygw-col-24 text18-clz" }, " 右上角 -> 松山院 -> 公众号 "),
                vue.createElementVNode("view", { class: "diygw-col-24 text19-clz" }, " 公众号：ss ")
              ])
            ])
          ])) : vue.createCommentVNode("v-if", true)
        ])
      ]),
      vue.createElementVNode("view", { class: "clearfix" })
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/pages/index/index.vue"]]);
  const _sfc_main$7 = {
    data() {
      return {
        //用户全局信息
        userInfo: {},
        //页面传参
        globalOption: {},
        //自定义全局变量
        globalData: {}
      };
    },
    onShow() {
      this.setCurrentPage(this);
    },
    onLoad(option) {
      this.setCurrentPage(this);
      if (option) {
        this.setData({
          globalOption: this.getOption(option)
        });
      }
      this.init();
    },
    methods: {
      async init() {
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container container25518" }, [
      vue.createElementVNode("view", { class: "clearfix" })
    ]);
  }
  const PagesContributeContribute = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-43f66588"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/pages/contribute/contribute.vue"]]);
  const _sfc_main$6 = {
    data() {
      return {
        //用户全局信息
        userInfo: {},
        //页面传参
        globalOption: {},
        //自定义全局变量
        globalData: {}
      };
    },
    onShow() {
      this.setCurrentPage(this);
    },
    onLoad(option) {
      this.setCurrentPage(this);
      if (option) {
        this.setData({
          globalOption: this.getOption(option)
        });
      }
      this.init();
    },
    methods: {
      async init() {
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container container25518" }, [
      vue.createElementVNode("view", { class: "flex diygw-col-24 justify-center avatar-clz" }, [
        vue.createElementVNode("view", { class: "diygw-avatar radius bg-none" }, [
          vue.createElementVNode("image", {
            mode: "aspectFit",
            class: "diygw-avatar-img radius",
            src: "/static/grid1.png"
          })
        ])
      ]),
      vue.createElementVNode("view", { class: "flex diygw-col-24 flex-direction-column justify-center items-center flex-wrap flex-clz" }, [
        vue.createElementVNode("view", { class: "diygw-col-4 text-clz" }, " cabudon "),
        vue.createElementVNode("view", { class: "diygw-col-4 text1-clz" }, " 积分：630 ")
      ]),
      vue.createElementVNode("view", { class: "flex diygw-col-24 justify-center flex-nowrap" }, [
        vue.createElementVNode("view", { class: "flex diygw-col-4" }, [
          vue.createElementVNode("button", { class: "diygw-btn blue radius-xs flex-sub margin-xs button1-button-clz" }, "签到")
        ]),
        vue.createElementVNode("view", { class: "flex diygw-col-4" }, [
          vue.createElementVNode("button", { class: "diygw-btn blue radius-xs flex-sub margin-xs button-button-clz" }, "退出")
        ])
      ]),
      vue.createElementVNode("view", { class: "flex diygw-col-24 flex-direction-column justify-center flex-wrap" }, [
        vue.createElementVNode("view", { class: "flex diygw-col-24 items-center flex-nowrap flex3-clz" }, [
          vue.createElementVNode("view", { class: "diygw-col-24" }, " 我的兑换 "),
          vue.createElementVNode("view", { class: "diygw-col-4 text3-clz" }, " > ")
        ]),
        vue.createElementVNode("view", { class: "flex diygw-col-24 items-center flex-nowrap flex6-clz" }, [
          vue.createElementVNode("view", { class: "diygw-col-24" }, " 积分明细 "),
          vue.createElementVNode("view", { class: "diygw-col-4 text9-clz" }, " > ")
        ]),
        vue.createElementVNode("view", { class: "flex diygw-col-24 items-center flex-nowrap flex5-clz" }, [
          vue.createElementVNode("view", { class: "diygw-col-24" }, " 我的投稿 "),
          vue.createElementVNode("view", { class: "diygw-col-4 text7-clz" }, " > ")
        ]),
        vue.createElementVNode("view", { class: "flex diygw-col-24 items-center flex-nowrap flex4-clz" }, [
          vue.createElementVNode("view", { class: "diygw-col-24" }, " 审核投稿 "),
          vue.createElementVNode("view", { class: "diygw-col-4 text5-clz" }, " > ")
        ])
      ]),
      vue.createElementVNode("view", { class: "clearfix" })
    ]);
  }
  const PagesProfileProfile = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-dd383ca2"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/pages/profile/profile.vue"]]);
  const _sfc_main$5 = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: String,
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-305117c1"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/uni_modules/diy-uview-ui/components/u-icon/u-icon.vue"]]);
  function broadcast(componentName, eventName, params2) {
  }
  const Emitter = {
    methods: {
      /**
       * 派发 (向上查找) (一个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      dispatch(componentName, eventName, params2) {
        let parent = this.$parent || this.$root;
        let name = parent.$options.name;
        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent;
          if (parent) {
            name = parent.$options.name;
          }
        }
        if (parent) {
          parent[eventName](params2);
        }
      },
      /**
       * 广播 (向下查找) (广播多个)
       * @param componentName // 需要找的组件的名称
       * @param eventName // 事件名称
       * @param params // 需要传递的参数
       */
      broadcast(componentName, eventName, params2) {
        broadcast.call(this, componentName, eventName, params2);
      }
    }
  };
  const _sfc_main$4 = {
    name: "u-input",
    emits: ["update:modelValue", "input", "change", "blur", "focus", "click", "touchstart", "confirm"],
    mixins: [Emitter],
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      // 输入框的类型，textarea，text，number
      type: {
        type: String,
        default: "text"
      },
      inputAlign: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "请输入内容"
      },
      disabled: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: [Number, String],
        default: 140
      },
      placeholderStyle: {
        type: String,
        default: "color: #c0c4cc;"
      },
      confirmType: {
        type: String,
        default: "done"
      },
      // 输入框的自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true
      fixed: {
        type: Boolean,
        default: false
      },
      // 是否自动获得焦点
      focus: {
        type: Boolean,
        default: false
      },
      // 密码类型时，是否显示右侧的密码图标
      passwordIcon: {
        type: Boolean,
        default: true
      },
      // input|textarea是否显示边框
      border: {
        type: Boolean,
        default: false
      },
      // 输入框的边框颜色
      borderColor: {
        type: String,
        default: "#dcdfe6"
      },
      autoHeight: {
        type: Boolean,
        default: false
      },
      // type=select时，旋转右侧的图标，标识当前处于打开还是关闭select的状态
      // open-打开，close-关闭
      selectOpen: {
        type: Boolean,
        default: false
      },
      // 高度，单位rpx
      height: {
        type: [Number, String],
        default: "auto"
      },
      // 是否可清空
      clearable: {
        type: [Boolean, String],
        default: true
      },
      // 指定光标与键盘的距离，单位 px
      cursorSpacing: {
        type: [Number, String],
        default: 0
      },
      // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
      selectionStart: {
        type: [Number, String],
        default: -1
      },
      // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
      selectionEnd: {
        type: [Number, String],
        default: -1
      },
      // 是否自动去除两端的空格
      trim: {
        type: Boolean,
        default: true
      },
      // 是否显示键盘上方带有”完成“按钮那一栏
      showConfirmbar: {
        type: Boolean,
        default: true
      },
      // input的背景色
      backgroundColor: {
        type: String
      },
      // input的padding
      padding: {
        type: String
      }
    },
    data() {
      return {
        defaultValue: "",
        inputHeight: 70,
        // input的高度
        textareaHeight: 200,
        // textarea的高度
        validateState: false,
        // 当前input的验证状态，用于错误时，边框是否改为红色
        focused: false,
        // 当前是否处于获得焦点的状态
        showPassword: false,
        // 是否预览密码
        lastValue: "",
        // 用于头条小程序，判断@input中，前后的值是否发生了变化，因为头条中文下，按下键没有输入内容，也会触发@input时间
        uForm: {
          inputAlign: "",
          clearable: ""
        }
      };
    },
    watch: {
      valueCom(nVal, oVal) {
        this.defaultValue = nVal;
        if (nVal != oVal && this.type == "select")
          this.handleInput({
            detail: {
              value: nVal
            }
          });
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      inputAlignCom() {
        return this.inputAlign || this.uForm.inputAlign || "left";
      },
      clearableCom() {
        if (typeof this.clearable == "boolean")
          return this.clearable;
        if (typeof this.uForm.clearable == "boolean")
          return this.uForm.clearable;
        return true;
      },
      // 因为uniapp的input组件的maxlength组件必须要数值，这里转为数值，给用户可以传入字符串数值
      inputMaxlength() {
        return Number(this.maxlength);
      },
      getStyle() {
        let style = {};
        if (this.type == "textarea") {
          if (this.height == "auto") {
            style.height = this.textareaHeight + "rpx";
          } else {
            style.height = isNaN(this.height) ? this.height : this.height + "rpx";
          }
        } else {
          style.minHeight = (this.height ? isNaN(this.height) ? this.height : this.height + "rpx" : this.type == "textarea" ? this.textareaHeight + "rpx" : this.inputHeight + "rpx") + " !important";
          style = Object.assign(style, this.customStyle);
        }
        return style;
      },
      //
      getCursorSpacing() {
        return Number(this.cursorSpacing);
      },
      // 光标起始位置
      uSelectionStart() {
        return String(this.selectionStart);
      },
      // 光标结束位置
      uSelectionEnd() {
        return String(this.selectionEnd);
      }
    },
    created() {
      this.defaultValue = this.valueCom;
    },
    mounted() {
      let parent = this.$u.$parent.call(this, "u-form");
      if (parent) {
        Object.keys(this.uForm).map((key) => {
          this.uForm[key] = parent[key];
        });
      }
    },
    methods: {
      /**
       * change 事件
       * @param event
       */
      handleInput(event) {
        let value = event.detail.value;
        if (this.trim)
          value = this.$u.trim(value);
        this.$emit("input", value);
        this.$emit("update:modelValue", value);
        this.defaultValue = value;
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldChange", value);
        }, 40);
      },
      /**
       * blur 事件
       * @param event
       */
      handleBlur(event) {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.$emit("blur", event.detail.value);
        this.$emit("update:modelValue", event.detail.value);
        setTimeout(() => {
          this.dispatch("u-form-item", "onFieldBlur", event.detail.value);
        }, 40);
      },
      onFormItemError(status) {
        this.validateState = status;
      },
      onFocus(event) {
        this.focused = true;
        this.$emit("focus");
      },
      onConfirm(e) {
        this.$emit("confirm", e.detail.value);
      },
      onClear(event) {
        this.defaultValue = "";
        this.$nextTick(() => {
          this.$emit("input", "");
          this.$emit("update:modelValue", "");
          this.$emit("change", "");
          this.focused = true;
        });
      },
      inputClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-input", {
          "u-input--border": $props.border,
          "u-input--error": $data.validateState
        }]),
        style: vue.normalizeStyle({
          padding: $props.padding ? $props.padding : `0 ${$props.border ? 20 : 0}rpx`,
          borderColor: $props.borderColor,
          textAlign: $options.inputAlignCom,
          backgroundColor: $props.backgroundColor
        }),
        onClick: _cache[10] || (_cache[10] = vue.withModifiers((...args) => $options.inputClick && $options.inputClick(...args), ["stop"]))
      },
      [
        $props.type == "textarea" ? (vue.openBlock(), vue.createElementBlock("textarea", {
          key: 0,
          class: "u-input__input u-input__textarea",
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled,
          maxlength: $options.inputMaxlength,
          fixed: $props.fixed,
          focus: $props.focus,
          autoHeight: $props.autoHeight,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          "cursor-spacing": $options.getCursorSpacing,
          onInput: _cache[0] || (_cache[0] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onBlur: _cache[1] || (_cache[1] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onFocus: _cache[2] || (_cache[2] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onConfirm: _cache[3] || (_cache[3] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["value", "placeholder", "placeholderStyle", "disabled", "maxlength", "fixed", "focus", "autoHeight", "selection-end", "selection-start", "cursor-spacing"])) : (vue.openBlock(), vue.createElementBlock("input", {
          key: 1,
          class: "u-input__input",
          type: $props.type == "password" ? "text" : $props.type,
          style: vue.normalizeStyle([$options.getStyle]),
          value: $data.defaultValue,
          password: $props.type == "password" && !$data.showPassword,
          placeholder: $props.placeholder,
          placeholderStyle: $props.placeholderStyle,
          disabled: $props.disabled || $props.type === "select",
          maxlength: $options.inputMaxlength,
          focus: $props.focus,
          confirmType: $props.confirmType,
          "cursor-spacing": $options.getCursorSpacing,
          "selection-end": $options.uSelectionEnd,
          "selection-start": $options.uSelectionStart,
          onFocus: _cache[4] || (_cache[4] = (...args) => $options.onFocus && $options.onFocus(...args)),
          onBlur: _cache[5] || (_cache[5] = (...args) => $options.handleBlur && $options.handleBlur(...args)),
          onInput: _cache[6] || (_cache[6] = (...args) => $options.handleInput && $options.handleInput(...args)),
          onConfirm: _cache[7] || (_cache[7] = (...args) => $options.onConfirm && $options.onConfirm(...args))
        }, null, 44, ["type", "value", "password", "placeholder", "placeholderStyle", "disabled", "maxlength", "focus", "confirmType", "cursor-spacing", "selection-end", "selection-start"])),
        vue.createElementVNode("view", { class: "u-input__right-icon u-flex" }, [
          $options.clearableCom && $options.valueCom != "" && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "u-input__right-icon__clear u-input__right-icon__item",
            onClick: _cache[8] || (_cache[8] = (...args) => $options.onClear && $options.onClear(...args))
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: "close-circle-fill",
              color: "#c0c4cc"
            })
          ])) : vue.createCommentVNode("v-if", true),
          $props.passwordIcon && $props.type == "password" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "u-input__right-icon__clear u-input__right-icon__item"
          }, [
            vue.createVNode(_component_u_icon, {
              size: "32",
              name: !$data.showPassword ? "eye" : "eye-fill",
              color: "#c0c4cc",
              onClick: _cache[9] || (_cache[9] = ($event) => $data.showPassword = !$data.showPassword)
            }, null, 8, ["name"])
          ])) : vue.createCommentVNode("v-if", true),
          $props.type == "select" ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 2,
              class: vue.normalizeClass(["u-input__right-icon--select u-input__right-icon__item", {
                "u-input__right-icon--select--reverse": $props.selectOpen
              }])
            },
            [
              vue.createVNode(_component_u_icon, {
                name: "arrow-right",
                size: "26",
                color: "#c0c4cc"
              })
            ],
            2
            /* CLASS */
          )) : vue.createCommentVNode("v-if", true)
        ])
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__scopeId", "data-v-42f09606"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/uni_modules/diy-uview-ui/components/u-input/u-input.vue"]]);
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  var formatRegExp = /%[sdj%]/g;
  var warning = function warning2() {
  };
  if (typeof process !== "undefined" && process.env && true && typeof window !== "undefined" && typeof document !== "undefined") {
    warning = function warning2(type2, errors) {
      if (typeof console !== "undefined" && console.warn) {
        if (errors.every(function(e) {
          return typeof e === "string";
        })) {
          formatAppLog("warn", "at uni_modules/diy-uview-ui/libs/util/async-validator.js:30", type2, errors);
        }
      }
    };
  }
  function convertFieldsError(errors) {
    if (!errors || !errors.length)
      return null;
    var fields = {};
    errors.forEach(function(error) {
      var field = error.field;
      fields[field] = fields[field] || [];
      fields[field].push(error);
    });
    return fields;
  }
  function format() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === "function") {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === "string") {
      var str = String(f).replace(formatRegExp, function(x) {
        if (x === "%%") {
          return "%";
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case "%s":
            return String(args[i++]);
          case "%d":
            return Number(args[i++]);
          case "%j":
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return "[Circular]";
            }
            break;
          default:
            return x;
        }
      });
      for (var arg = args[i]; i < len; arg = args[++i]) {
        str += " " + arg;
      }
      return str;
    }
    return f;
  }
  function isNativeStringType(type2) {
    return type2 === "string" || type2 === "url" || type2 === "hex" || type2 === "email" || type2 === "pattern";
  }
  function isEmptyValue(value, type2) {
    if (value === void 0 || value === null) {
      return true;
    }
    if (type2 === "array" && Array.isArray(value) && !value.length) {
      return true;
    }
    if (isNativeStringType(type2) && typeof value === "string" && !value) {
      return true;
    }
    return false;
  }
  function asyncParallelArray(arr, func2, callback) {
    var results = [];
    var total = 0;
    var arrLength = arr.length;
    function count(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === arrLength) {
        callback(results);
      }
    }
    arr.forEach(function(a) {
      func2(a, count);
    });
  }
  function asyncSerialArray(arr, func2, callback) {
    var index = 0;
    var arrLength = arr.length;
    function next(errors) {
      if (errors && errors.length) {
        callback(errors);
        return;
      }
      var original = index;
      index = index + 1;
      if (original < arrLength) {
        func2(arr[original], next);
      } else {
        callback([]);
      }
    }
    next([]);
  }
  function flattenObjArr(objArr) {
    var ret = [];
    Object.keys(objArr).forEach(function(k) {
      ret.push.apply(ret, objArr[k]);
    });
    return ret;
  }
  function asyncMap(objArr, option, func2, callback) {
    if (option.first) {
      var _pending = new Promise(function(resolve, reject) {
        var next = function next2(errors) {
          callback(errors);
          return errors.length ? reject({
            errors,
            fields: convertFieldsError(errors)
          }) : resolve();
        };
        var flattenArr = flattenObjArr(objArr);
        asyncSerialArray(flattenArr, func2, next);
      });
      _pending["catch"](function(e) {
        return e;
      });
      return _pending;
    }
    var firstFields = option.firstFields || [];
    if (firstFields === true) {
      firstFields = Object.keys(objArr);
    }
    var objArrKeys = Object.keys(objArr);
    var objArrLength = objArrKeys.length;
    var total = 0;
    var results = [];
    var pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        results.push.apply(results, errors);
        total++;
        if (total === objArrLength) {
          callback(results);
          return results.length ? reject({
            errors: results,
            fields: convertFieldsError(results)
          }) : resolve();
        }
      };
      if (!objArrKeys.length) {
        callback(results);
        resolve();
      }
      objArrKeys.forEach(function(key) {
        var arr = objArr[key];
        if (firstFields.indexOf(key) !== -1) {
          asyncSerialArray(arr, func2, next);
        } else {
          asyncParallelArray(arr, func2, next);
        }
      });
    });
    pending["catch"](function(e) {
      return e;
    });
    return pending;
  }
  function complementError(rule) {
    return function(oe) {
      if (oe && oe.message) {
        oe.field = oe.field || rule.fullField;
        return oe;
      }
      return {
        message: typeof oe === "function" ? oe() : oe,
        field: oe.field || rule.fullField
      };
    };
  }
  function deepMerge$1(target, source) {
    if (source) {
      for (var s in source) {
        if (source.hasOwnProperty(s)) {
          var value = source[s];
          if (typeof value === "object" && typeof target[s] === "object") {
            target[s] = _extends({}, target[s], {}, value);
          } else {
            target[s] = value;
          }
        }
      }
    }
    return target;
  }
  function required(rule, value, source, errors, options, type2) {
    if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type2 || rule.type))) {
      errors.push(format(options.messages.required, rule.fullField));
    }
  }
  function whitespace(rule, value, source, errors, options) {
    if (/^\s+$/.test(value) || value === "") {
      errors.push(format(options.messages.whitespace, rule.fullField));
    }
  }
  var pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
      "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
      "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
  };
  var types = {
    integer: function integer2(value) {
      return types.number(value) && parseInt(value, 10) === value;
    },
    "float": function float(value) {
      return types.number(value) && !types.integer(value);
    },
    array: function array2(value) {
      return Array.isArray(value);
    },
    regexp: function regexp2(value) {
      if (value instanceof RegExp) {
        return true;
      }
      try {
        return !!new RegExp(value);
      } catch (e) {
        return false;
      }
    },
    date: function date2(value) {
      return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function";
    },
    number: function number2(value) {
      if (isNaN(value)) {
        return false;
      }
      return typeof +value === "number";
    },
    object: function object2(value) {
      return typeof value === "object" && !types.array(value);
    },
    method: function method2(value) {
      return typeof value === "function";
    },
    email: function email2(value) {
      return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
    },
    url: function url2(value) {
      return typeof value === "string" && !!value.match(pattern.url);
    },
    hex: function hex(value) {
      return typeof value === "string" && !!value.match(pattern.hex);
    }
  };
  function type(rule, value, source, errors, options) {
    if (rule.required && value === void 0) {
      required(rule, value, source, errors, options);
      return;
    }
    var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
    var ruleType = rule.type;
    if (custom.indexOf(ruleType) > -1) {
      if (!types[ruleType](value)) {
        errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
      }
    } else if (ruleType && typeof value !== rule.type) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  }
  function range$1(rule, value, source, errors, options) {
    var len = typeof rule.len === "number";
    var min = typeof rule.min === "number";
    var max = typeof rule.max === "number";
    var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    var val = value;
    var key = null;
    var num = typeof value === "number";
    var str = typeof value === "string";
    var arr = Array.isArray(value);
    if (num) {
      key = "number";
    } else if (str) {
      key = "string";
    } else if (arr) {
      key = "array";
    }
    if (!key) {
      return false;
    }
    if (arr) {
      val = value.length;
    }
    if (str) {
      val = value.replace(spRegexp, "_").length;
    }
    if (len) {
      if (val !== rule.len) {
        errors.push(format(options.messages[key].len, rule.fullField, rule.len));
      }
    } else if (min && !max && val < rule.min) {
      errors.push(format(options.messages[key].min, rule.fullField, rule.min));
    } else if (max && !min && val > rule.max) {
      errors.push(format(options.messages[key].max, rule.fullField, rule.max));
    } else if (min && max && (val < rule.min || val > rule.max)) {
      errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
    }
  }
  var ENUM = "enum";
  function enumerable(rule, value, source, errors, options) {
    rule[ENUM] = Array.isArray(rule[ENUM]) ? rule[ENUM] : [];
    if (rule[ENUM].indexOf(value) === -1) {
      errors.push(format(options.messages[ENUM], rule.fullField, rule[ENUM].join(", ")));
    }
  }
  function pattern$1(rule, value, source, errors, options) {
    if (rule.pattern) {
      if (rule.pattern instanceof RegExp) {
        rule.pattern.lastIndex = 0;
        if (!rule.pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      } else if (typeof rule.pattern === "string") {
        var _pattern = new RegExp(rule.pattern);
        if (!_pattern.test(value)) {
          errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
        }
      }
    }
  }
  var rules = {
    required,
    whitespace,
    type,
    range: range$1,
    "enum": enumerable,
    pattern: pattern$1
  };
  function string(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "string");
      if (!isEmptyValue(value, "string")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
        rules.pattern(rule, value, source, errors, options);
        if (rule.whitespace === true) {
          rules.whitespace(rule, value, source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function method(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function number$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (value === "") {
        value = void 0;
      }
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function _boolean(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function regexp(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function integer(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function floatFn(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function array$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "array") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, "array");
      if (!isEmptyValue(value, "array")) {
        rules.type(rule, value, source, errors, options);
        rules.range(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function object$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  var ENUM$1 = "enum";
  function enumerable$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (value !== void 0) {
        rules[ENUM$1](rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function pattern$2(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, "string") && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value, "string")) {
        rules.pattern(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function date$1(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
      if (!isEmptyValue(value)) {
        var dateObject;
        if (typeof value === "number") {
          dateObject = new Date(value);
        } else {
          dateObject = value;
        }
        rules.type(rule, dateObject, source, errors, options);
        if (dateObject) {
          rules.range(rule, dateObject.getTime(), source, errors, options);
        }
      }
    }
    callback(errors);
  }
  function required$1(rule, value, callback, source, options) {
    var errors = [];
    var type2 = Array.isArray(value) ? "array" : typeof value;
    rules.required(rule, value, source, errors, options, type2);
    callback(errors);
  }
  function type$1(rule, value, callback, source, options) {
    var ruleType = rule.type;
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value, ruleType) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options, ruleType);
      if (!isEmptyValue(value, ruleType)) {
        rules.type(rule, value, source, errors, options);
      }
    }
    callback(errors);
  }
  function any(rule, value, callback, source, options) {
    var errors = [];
    var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
    if (validate) {
      if (isEmptyValue(value) && !rule.required) {
        return callback();
      }
      rules.required(rule, value, source, errors, options);
    }
    callback(errors);
  }
  var validators = {
    string,
    method,
    number: number$1,
    "boolean": _boolean,
    regexp,
    integer,
    "float": floatFn,
    array: array$1,
    object: object$1,
    "enum": enumerable$1,
    pattern: pattern$2,
    date: date$1,
    url: type$1,
    hex: type$1,
    email: type$1,
    required: required$1,
    any
  };
  function newMessages() {
    return {
      "default": "Validation error on field %s",
      required: "%s is required",
      "enum": "%s must be one of %s",
      whitespace: "%s cannot be empty",
      date: {
        format: "%s date %s is invalid for format %s",
        parse: "%s date could not be parsed, %s is invalid ",
        invalid: "%s date %s is invalid"
      },
      types: {
        string: "%s is not a %s",
        method: "%s is not a %s (function)",
        array: "%s is not an %s",
        object: "%s is not an %s",
        number: "%s is not a %s",
        date: "%s is not a %s",
        "boolean": "%s is not a %s",
        integer: "%s is not an %s",
        "float": "%s is not a %s",
        regexp: "%s is not a valid %s",
        email: "%s is not a valid %s",
        url: "%s is not a valid %s",
        hex: "%s is not a valid %s"
      },
      string: {
        len: "%s must be exactly %s characters",
        min: "%s must be at least %s characters",
        max: "%s cannot be longer than %s characters",
        range: "%s must be between %s and %s characters"
      },
      number: {
        len: "%s must equal %s",
        min: "%s cannot be less than %s",
        max: "%s cannot be greater than %s",
        range: "%s must be between %s and %s"
      },
      array: {
        len: "%s must be exactly %s in length",
        min: "%s cannot be less than %s in length",
        max: "%s cannot be greater than %s in length",
        range: "%s must be between %s and %s in length"
      },
      pattern: {
        mismatch: "%s value %s does not match pattern %s"
      },
      clone: function clone() {
        var cloned = JSON.parse(JSON.stringify(this));
        cloned.clone = this.clone;
        return cloned;
      }
    };
  }
  var messages = newMessages();
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  Schema.prototype = {
    messages: function messages2(_messages) {
      if (_messages) {
        this._messages = deepMerge$1(newMessages(), _messages);
      }
      return this._messages;
    },
    define: function define(rules2) {
      if (!rules2) {
        throw new Error("Cannot configure a schema with no rules");
      }
      if (typeof rules2 !== "object" || Array.isArray(rules2)) {
        throw new Error("Rules must be an object");
      }
      this.rules = {};
      var z;
      var item;
      for (z in rules2) {
        if (rules2.hasOwnProperty(z)) {
          item = rules2[z];
          this.rules[z] = Array.isArray(item) ? item : [item];
        }
      }
    },
    validate: function validate(source_, o, oc) {
      var _this = this;
      if (o === void 0) {
        o = {};
      }
      if (oc === void 0) {
        oc = function oc2() {
        };
      }
      var source = source_;
      var options = o;
      var callback = oc;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this.rules || Object.keys(this.rules).length === 0) {
        if (callback) {
          callback();
        }
        return Promise.resolve();
      }
      function complete(results) {
        var i;
        var errors = [];
        var fields = {};
        function add(e) {
          if (Array.isArray(e)) {
            var _errors;
            errors = (_errors = errors).concat.apply(_errors, e);
          } else {
            errors.push(e);
          }
        }
        for (i = 0; i < results.length; i++) {
          add(results[i]);
        }
        if (!errors.length) {
          errors = null;
          fields = null;
        } else {
          fields = convertFieldsError(errors);
        }
        callback(errors, fields);
      }
      if (options.messages) {
        var messages$1 = this.messages();
        if (messages$1 === messages) {
          messages$1 = newMessages();
        }
        deepMerge$1(messages$1, options.messages);
        options.messages = messages$1;
      } else {
        options.messages = this.messages();
      }
      var arr;
      var value;
      var series = {};
      var keys = options.keys || Object.keys(this.rules);
      keys.forEach(function(z) {
        arr = _this.rules[z];
        value = source[z];
        arr.forEach(function(r) {
          var rule = r;
          if (typeof rule.transform === "function") {
            if (source === source_) {
              source = _extends({}, source);
            }
            value = source[z] = rule.transform(value);
          }
          if (typeof rule === "function") {
            rule = {
              validator: rule
            };
          } else {
            rule = _extends({}, rule);
          }
          rule.validator = _this.getValidationMethod(rule);
          rule.field = z;
          rule.fullField = rule.fullField || z;
          rule.type = _this.getType(rule);
          if (!rule.validator) {
            return;
          }
          series[z] = series[z] || [];
          series[z].push({
            rule,
            value,
            source,
            field: z
          });
        });
      });
      var errorFields = {};
      return asyncMap(series, options, function(data, doIt) {
        var rule = data.rule;
        var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
        deep = deep && (rule.required || !rule.required && data.value);
        rule.field = data.field;
        function addFullfield(key, schema) {
          return _extends({}, schema, {
            fullField: rule.fullField + "." + key
          });
        }
        function cb(e) {
          if (e === void 0) {
            e = [];
          }
          var errors = e;
          if (!Array.isArray(errors)) {
            errors = [errors];
          }
          if (!options.suppressWarning && errors.length) {
            Schema.warning("async-validator:", errors);
          }
          if (errors.length && rule.message) {
            errors = [].concat(rule.message);
          }
          errors = errors.map(complementError(rule));
          if (options.first && errors.length) {
            errorFields[rule.field] = 1;
            return doIt(errors);
          }
          if (!deep) {
            doIt(errors);
          } else {
            if (rule.required && !data.value) {
              if (rule.message) {
                errors = [].concat(rule.message).map(complementError(rule));
              } else if (options.error) {
                errors = [options.error(rule, format(options.messages.required, rule.field))];
              } else {
                errors = [];
              }
              return doIt(errors);
            }
            var fieldsSchema = {};
            if (rule.defaultField) {
              for (var k in data.value) {
                if (data.value.hasOwnProperty(k)) {
                  fieldsSchema[k] = rule.defaultField;
                }
              }
            }
            fieldsSchema = _extends({}, fieldsSchema, {}, data.rule.fields);
            for (var f in fieldsSchema) {
              if (fieldsSchema.hasOwnProperty(f)) {
                var fieldSchema = Array.isArray(fieldsSchema[f]) ? fieldsSchema[f] : [fieldsSchema[f]];
                fieldsSchema[f] = fieldSchema.map(addFullfield.bind(null, f));
              }
            }
            var schema = new Schema(fieldsSchema);
            schema.messages(options.messages);
            if (data.rule.options) {
              data.rule.options.messages = options.messages;
              data.rule.options.error = options.error;
            }
            schema.validate(data.value, data.rule.options || options, function(errs) {
              var finalErrors = [];
              if (errors && errors.length) {
                finalErrors.push.apply(finalErrors, errors);
              }
              if (errs && errs.length) {
                finalErrors.push.apply(finalErrors, errs);
              }
              doIt(finalErrors.length ? finalErrors : null);
            });
          }
        }
        var res2;
        if (rule.asyncValidator) {
          res2 = rule.asyncValidator(rule, data.value, cb, data.source, options);
        } else if (rule.validator) {
          res2 = rule.validator(rule, data.value, cb, data.source, options);
          if (res2 === true) {
            cb();
          } else if (res2 === false) {
            cb(rule.message || rule.field + " fails");
          } else if (res2 instanceof Array) {
            cb(res2);
          } else if (res2 instanceof Error) {
            cb(res2.message);
          }
        }
        if (res2 && res2.then) {
          res2.then(function() {
            return cb();
          }, function(e) {
            return cb(e);
          });
        }
      }, function(results) {
        complete(results);
      });
    },
    getType: function getType(rule) {
      if (rule.type === void 0 && rule.pattern instanceof RegExp) {
        rule.type = "pattern";
      }
      if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
        throw new Error(format("Unknown rule type %s", rule.type));
      }
      return rule.type || "string";
    },
    getValidationMethod: function getValidationMethod(rule) {
      if (typeof rule.validator === "function") {
        return rule.validator;
      }
      var keys = Object.keys(rule);
      var messageIndex = keys.indexOf("message");
      if (messageIndex !== -1) {
        keys.splice(messageIndex, 1);
      }
      if (keys.length === 1 && keys[0] === "required") {
        return validators.required;
      }
      return validators[this.getType(rule)] || false;
    }
  };
  Schema.register = function register(type2, validator) {
    if (typeof validator !== "function") {
      throw new Error("Cannot register a validator by type, validator is not a function");
    }
    validators[type2] = validator;
  };
  Schema.warning = warning;
  Schema.messages = messages;
  Schema.warning = function() {
  };
  const _sfc_main$3 = {
    name: "u-form-item",
    mixins: [Emitter],
    inject: {
      uForm: {
        default() {
          return null;
        }
      }
    },
    props: {
      // input的label提示语
      label: {
        type: String,
        default: ""
      },
      // 绑定的值
      prop: {
        type: String,
        default: ""
      },
      // 是否显示表单域的下划线边框
      borderBottom: {
        type: [String, Boolean],
        default: ""
      },
      labelClass: {
        type: String,
        default: ""
      },
      // label的位置，left-左边，top-上边
      labelPosition: {
        type: String,
        default: ""
      },
      // label的宽度，单位rpx
      labelWidth: {
        type: [String, Number],
        default: "5em"
      },
      // lable的样式，对象形式
      labelStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // lable字体的对齐方式
      labelAlign: {
        type: String,
        default: ""
      },
      // 右侧图标
      rightIcon: {
        type: String,
        default: ""
      },
      // 左侧图标
      leftIcon: {
        type: String,
        default: ""
      },
      // 左侧图标的样式
      leftIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 左侧图标的样式
      rightIconStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      justifyContent: {
        type: String,
        default: ""
      },
      // 是否显示左边的必填星号，只作显示用，具体校验必填的逻辑，请在rules中配置
      required: {
        type: Boolean,
        default: false
      },
      inputAlign: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        initialValue: "",
        // 存储的默认值
        // isRequired: false, // 是否必填，由于人性化考虑，必填"*"号通过props的required配置，不再通过rules的规则自动生成
        validateState: "",
        // 是否校验成功
        validateMessage: "",
        // 校验失败的提示语
        // 有错误时的提示方式，message-提示信息，border-如果input设置了边框，变成呈红色，
        errorType: ["message"],
        fieldValue: "",
        // 获取当前子组件input的输入的值
        // 父组件的参数，在computed计算中，无法得知this.parent发生变化，故将父组件的参数值，放到data中
        parentData: {
          borderBottom: true,
          labelWidth: 90,
          labelPosition: "left",
          labelStyle: {},
          labelAlign: "left",
          inputAlign: "left"
        }
      };
    },
    watch: {
      validateState(val) {
        this.broadcastInputError();
      },
      // 监听u-form组件的errorType的变化
      "uForm.errorType"(val) {
        this.errorType = val;
        this.broadcastInputError();
      }
    },
    computed: {
      // 计算后的label宽度，由于需要多个判断，故放到computed中
      uLabelWidth() {
        return this.elLabelPosition == "left" ? this.label === "true" || this.label === "" ? "auto" : this.$u.addUnit(this.elLabelWidth) : "100%";
      },
      showError() {
        return (type2) => {
          if (this.errorType.indexOf("none") >= 0)
            return false;
          else if (this.errorType.indexOf(type2) >= 0)
            return true;
          else
            return false;
        };
      },
      // label的宽度
      elLabelWidth() {
        return this.labelWidth != 0 || this.labelWidth != "" ? this.labelWidth : this.parentData.labelWidth ? this.parentData.labelWidth : 90;
      },
      // label的样式
      elLabelStyle() {
        return Object.keys(this.labelStyle).length ? this.labelStyle : this.parentData.labelStyle ? this.parentData.labelStyle : {};
      },
      // label的位置，左侧或者上方
      elLabelPosition() {
        return this.labelPosition ? this.labelPosition : this.parentData.labelPosition ? this.parentData.labelPosition : "left";
      },
      // label的对齐方式
      elLabelAlign() {
        return this.labelAlign ? this.labelAlign : this.parentData.labelAlign ? this.parentData.labelAlign : "left";
      },
      // label的下划线
      elBorderBottom() {
        return this.borderBottom !== "" ? this.borderBottom : this.parentData.borderBottom ? this.parentData.borderBottom : true;
      },
      elInputAlign() {
        return this.inputAlign ? this.inputAlign : this.parentData.inputAlign ? this.parentData.inputAlign : "left";
      }
    },
    methods: {
      broadcastInputError() {
        this.broadcast("u-input", "onFormItemError", this.validateState === "error" && this.showError("border"));
      },
      // 判断是否需要required校验
      setRules() {
      },
      // 从u-form的rules属性中，取出当前u-form-item的校验规则
      getRules() {
        let rules2 = this.parent.rules;
        rules2 = rules2 ? rules2[this.prop] : [];
        return [].concat(rules2 || []);
      },
      // blur事件时进行表单校验
      onFieldBlur() {
        this.validation("blur");
      },
      // change事件进行表单校验
      onFieldChange() {
        this.validation("change");
      },
      // 过滤出符合要求的rule规则
      getFilteredRule(triggerType = "") {
        let rules2 = this.getRules();
        if (!triggerType)
          return rules2;
        return rules2.filter((res2) => res2.trigger && res2.trigger.indexOf(triggerType) !== -1);
      },
      getData(dataObj, name, defaultValue) {
        let newDataObj;
        if (dataObj) {
          newDataObj = JSON.parse(JSON.stringify(dataObj));
          let k = "", d = ".", l = "[", r = "]";
          name = name.replace(/\s+/g, k) + d;
          let tstr = k;
          for (let i = 0; i < name.length; i++) {
            let theChar = name.charAt(i);
            if (theChar != d && theChar != l && theChar != r) {
              tstr += theChar;
            } else if (newDataObj) {
              if (tstr != k)
                newDataObj = newDataObj[tstr];
              tstr = k;
            }
          }
        }
        if (typeof newDataObj === "undefined" && typeof defaultValue !== "undefined")
          newDataObj = defaultValue;
        return newDataObj;
      },
      setData(dataObj, name, value) {
        let dataValue;
        if (typeof value === "object") {
          dataValue = JSON.parse(JSON.stringify(value));
        } else {
          dataValue = value;
        }
        let regExp = new RegExp("([\\w$]+)|\\[(:\\d)\\]", "g");
        const patten = name.match(regExp);
        for (let i = 0; i < patten.length - 1; i++) {
          let keyName = patten[i];
          if (typeof dataObj[keyName] !== "object")
            dataObj[keyName] = {};
          dataObj = dataObj[keyName];
        }
        dataObj[patten[patten.length - 1]] = dataValue;
      },
      // 校验数据
      validation(trigger, callback = () => {
      }) {
        this.fieldValue = this.getData(this.parent.model, this.prop);
        let rules2 = this.getFilteredRule(trigger);
        if (!rules2 || rules2.length === 0) {
          return callback("");
        }
        this.validateState = "validating";
        let validator = new Schema({
          [this.prop]: rules2
        });
        validator.validate({
          [this.prop]: this.fieldValue
        }, {
          firstFields: true
        }, (errors, fields) => {
          this.validateState = !errors ? "success" : "error";
          this.validateMessage = errors ? errors[0].message : "";
          let field = errors ? errors[0].field : "";
          callback(this.validateMessage, {
            state: this.validateState,
            key: field,
            msg: this.validateMessage
          });
        });
      },
      // 清空当前的u-form-item
      resetField() {
        this.setData(this.parent.model, this.prop, this.initialValue);
        this.validateState = "success";
      }
    },
    // 组件创建完成时，将当前实例保存到u-form中
    mounted() {
      this.parent = this.$u.$parent.call(this, "u-form");
      if (this.parent) {
        Object.keys(this.parentData).map((key) => {
          this.parentData[key] = this.parent[key];
        });
        if (this.prop) {
          this.parent.fields.push(this);
          this.errorType = this.parent.errorType;
          this.initialValue = this.fieldValue;
          this.$nextTick(() => {
            this.setRules();
          });
        }
      }
    },
    beforeUnmount() {
      if (this.parent && this.prop) {
        this.parent.fields.map((item, index) => {
          if (item === this)
            this.parent.fields.splice(index, 1);
        });
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$1);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-form-item", { "u-border-bottom": $options.elBorderBottom, "u-form-item__border-bottom--error": $data.validateState === "error" && $options.showError("border-bottom") }])
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-form-item__body",
            style: vue.normalizeStyle({
              flexDirection: $options.elLabelPosition == "left" ? "row" : "column"
            })
          },
          [
            vue.createCommentVNode(' 微信小程序中，将一个参数设置空字符串，结果会变成字符串"true" '),
            $props.label ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: "u-form-item--left",
                style: vue.normalizeStyle({
                  width: $options.uLabelWidth,
                  marginBottom: $options.elLabelPosition == "left" ? 0 : "10rpx"
                })
              },
              [
                vue.createCommentVNode(" 为了块对齐 "),
                $props.required || $props.leftIcon || $props.label ? (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 0,
                    class: vue.normalizeClass(["u-form-item--left__content", $props.labelClass])
                  },
                  [
                    vue.createCommentVNode(" nvue不支持伪元素before "),
                    $props.required ? (vue.openBlock(), vue.createElementBlock("text", {
                      key: 0,
                      class: "u-form-item--left__content--required"
                    }, "*")) : vue.createCommentVNode("v-if", true),
                    $props.leftIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                      key: 1,
                      class: "u-form-item--left__content__icon"
                    }, [
                      vue.createVNode(_component_u_icon, {
                        name: $props.leftIcon,
                        "custom-style": $props.leftIconStyle
                      }, null, 8, ["name", "custom-style"])
                    ])) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode(
                      "view",
                      {
                        class: "u-form-item--left__content__label",
                        style: vue.normalizeStyle([$options.elLabelStyle, {
                          "justify-content": $options.elLabelAlign == "left" ? "flex-start" : $options.elLabelAlign == "center" ? "center" : "flex-end"
                        }])
                      },
                      vue.toDisplayString($props.label),
                      5
                      /* TEXT, STYLE */
                    )
                  ],
                  2
                  /* CLASS */
                )) : vue.createCommentVNode("v-if", true)
              ],
              4
              /* STYLE */
            )) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("view", { class: "u-form-item--right u-flex" }, [
              vue.createElementVNode("view", { class: "u-form-item--right__content" }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["u-form-item--right__content__slot", $props.justifyContent]),
                    style: vue.normalizeStyle($options.elLabelPosition == "left" && $options.elInputAlign == "right" ? "text-align:right;display: inline-block;line-height:initial;" : "")
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                ),
                _ctx.$slots.right || $props.rightIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "u-form-item--right__content__icon u-flex"
                }, [
                  $props.rightIcon ? (vue.openBlock(), vue.createBlock(_component_u_icon, {
                    key: 0,
                    "custom-style": $props.rightIconStyle,
                    name: $props.rightIcon
                  }, null, 8, ["custom-style", "name"])) : vue.createCommentVNode("v-if", true),
                  vue.renderSlot(_ctx.$slots, "right", {}, void 0, true)
                ])) : vue.createCommentVNode("v-if", true)
              ])
            ])
          ],
          4
          /* STYLE */
        ),
        $data.validateState === "error" && $options.showError("message") ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: "u-form-item__message",
            style: vue.normalizeStyle({
              paddingLeft: $options.elLabelPosition == "left" ? "calc(" + _ctx.$u.addUnit($options.elLabelWidth) + " + 24rpx)" : "0",
              textAlign: $options.elInputAlign == "right" ? "right" : "left"
            })
          },
          vue.toDisplayString($data.validateMessage),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      2
      /* CLASS */
    );
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-e2d0cb75"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/uni_modules/diy-uview-ui/components/u-form-item/u-form-item.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        //用户全局信息
        userInfo: {},
        //页面传参
        globalOption: {},
        //自定义全局变量
        globalData: {},
        inputFocus: false,
        input: "",
        input1Focus: false,
        input1: ""
      };
    },
    onShow() {
      this.setCurrentPage(this);
    },
    onLoad(option) {
      this.setCurrentPage(this);
      if (option) {
        this.setData({
          globalOption: this.getOption(option)
        });
      }
      this.init();
    },
    methods: {
      async init() {
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_input = resolveEasycom(vue.resolveDynamicComponent("u-input"), __easycom_0);
    const _component_u_form_item = resolveEasycom(vue.resolveDynamicComponent("u-form-item"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "container container25518" }, [
      vue.createElementVNode("view", { class: "flex diygw-col-24 justify-center avatar-clz" }, [
        vue.createElementVNode("view", { class: "diygw-avatar xl radius bg-none" }, [
          vue.createElementVNode("image", {
            mode: "aspectFit",
            class: "diygw-avatar-img radius",
            src: "/static/grid1.png"
          })
        ])
      ]),
      vue.createVNode(_component_u_form_item, {
        class: "diygw-col-24 input-clz",
        label: "手机号",
        prop: "input"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_u_input, {
            focus: $data.inputFocus,
            class: "",
            placeholder: "请输入手机号",
            modelValue: $data.input,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.input = $event),
            type: "text"
          }, null, 8, ["focus", "modelValue"])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createVNode(_component_u_form_item, {
        class: "diygw-col-24 input1-clz",
        label: "密码",
        prop: "input1"
      }, {
        default: vue.withCtx(() => [
          vue.createVNode(_component_u_input, {
            focus: $data.input1Focus,
            class: "",
            placeholder: "请输入密码",
            modelValue: $data.input1,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.input1 = $event),
            type: "text"
          }, null, 8, ["focus", "modelValue"])
        ]),
        _: 1
        /* STABLE */
      }),
      vue.createElementVNode("view", { class: "flex diygw-col-24" }, [
        vue.createElementVNode("button", { class: "diygw-btn red radius-xs flex-sub margin-xs button-button-clz" }, "按钮")
      ]),
      vue.createElementVNode("view", { class: "clearfix" })
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-e4e4508d"], ["__file", "D:/java-study/fe-learning/uniapp-share-app/pages/login/login.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        url: ""
      };
    },
    onLoad(options) {
      if (options && options.url) {
        this.url = decodeURIComponent(options.url);
      }
    },
    onShow() {
    },
    onShareAppMessage: function() {
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "start" }, [
      vue.createElementVNode("web-view", { src: $data.url }, null, 8, ["src"])
    ]);
  }
  const PagesWebview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/java-study/fe-learning/uniapp-share-app/pages/webview.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/contribute/contribute", PagesContributeContribute);
  __definePage("pages/profile/profile", PagesProfileProfile);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/webview", PagesWebview);
  const _sfc_main = {
    globalData: {
      userInfo: null,
      tabBar: ["/pages/index/index", "/pages/contribute/contribute", "/pages/profile/profile"],
      homePage: "/pages/index/index",
      pages: ["/pages/index/index", "/pages/contribute/contribute", "/pages/profile/profile", "/pages/login/login"]
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/java-study/fe-learning/uniapp-share-app/App.vue"]]);
  let Validate$1 = class Validate {
    constructor(rules2 = {}) {
      Object.assign(this, {
        rules: rules2
      });
      this.__init();
    }
    /**
     * __init
     */
    __init() {
      this.__initMethods();
      this.__initDefaults();
      this.__initData();
    }
    /**
     * 初始化默认提示信息
     */
    __initDefaults() {
      this.defaults = {
        messages: {
          required: "这是必填字段。",
          email: "请输入有效的电子邮件地址。",
          tel: "请输入11位的手机号码。",
          url: "请输入有效的网址。",
          date: "请输入有效的日期。",
          dateISO: "请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。",
          number: "请输入有效的数字。",
          regexp: "请输入有效的正则匹配值。",
          digits: "只能输入数字。",
          idcard: "请输入18位的有效身份证。",
          equalTo: "输入值必须和%s相同。",
          contains: "输入值必须包含%s。",
          minlength: "最少要输入%s个字符。",
          maxlength: "最多可以输入%s个字符。",
          rangelength: "请输入长度在%s到%s之间的字符。",
          min: "请输入不小于%s的数值。",
          max: "请输入不大于%s的数值。",
          range: "请输入范围在%s到 {1} 之间的数值。"
        }
      };
    }
    /**
     * 初始化数据
     */
    __initData() {
      this.form = {};
      this.errorList = [];
    }
    /**
     * 初始化默认验证方法
     */
    __initMethods() {
      const that = this;
      that.methods = {
        /**
         * 验证必填元素
         */
        required: {
          valid(value, param) {
            if (!that.depend(param)) {
              return "dependency-mismatch";
            } else if (typeof value === "number") {
              value = value.toString();
            } else if (typeof value === "boolean") {
              return true;
            }
            return value.length > 0;
          },
          message(param) {
            return param.message || "这是必填字段。";
          }
        },
        /**
         * 验证电子邮箱格式
         */
        email: {
          valid(value, param) {
            return that.optional(value) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value);
          },
          message(param) {
            return param.message || "请输入有效的电子邮件地址。";
          }
        },
        /**
         * 验证手机格式
         */
        tel: {
          valid(value, param) {
            return that.optional(value) || /^1[34578]\d{9}$/.test(value);
          },
          message(param) {
            return param.message || "请输入11位的手机号码。";
          }
        },
        /**
         * 验证URL格式
         */
        url: {
          valid(value, param) {
            return that.optional(value) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
          },
          message(param) {
            return param.message || "请输入有效的网址。";
          }
        },
        /**
         * 验证日期格式
         */
        date: {
          valid(value, param) {
            return that.optional(value) || !/Invalid|NaN/.test(new Date(value).toString());
          },
          message(param) {
            return param.message || "请输入有效的日期。";
          }
        },
        /**
         * 验证ISO类型的日期格式
         */
        dateISO: {
          valid(value, param) {
            return that.optional(value) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
          },
          message(param) {
            return param.message || "请输入有效的日期（ISO），例如：2009-06-23，1998/01/22。";
          }
        },
        /**
         * 验证十进制数字
         */
        number: {
          valid(value, param) {
            return that.optional(value) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
          },
          message(param) {
            return param.message || "请输入有效的数字。";
          }
        },
        /**
         * 验证整数
         */
        digits: {
          valid(value, param) {
            return that.optional(value) || /^\d+$/.test(value);
          },
          message(param) {
            return param.message || "只能输入整数。";
          }
        },
        /**
         * 验证身份证号码
         */
        idcard: {
          valid(value, param) {
            return that.optional(value) || /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
          },
          message(param) {
            return param.message || "请输入18位的有效身份证。";
          }
        },
        /**
         * 正则验证值
         */
        regexp: {
          valid(value, param) {
            var regexp2 = "string" === typeof param.regexp ? new RegExp(param.regexp) : param.regexp;
            return that.optional(value) || regexp2.test(value);
          },
          message(param) {
            return param.message || "请输入有效的正则匹配值";
          }
        },
        /**
         * 验证两个输入框的内容是否相同
         */
        equalTo: {
          valid(value, param) {
            return that.optional(value) || value === that.scope.detail.value[param.field];
          },
          message(param) {
            return that.formatMessage(param.message || "输入值必须和%s相同。", [that.scope.detail.value[param.field]]);
          }
        },
        /**
         * 验证是否包含某个值
         */
        contains: {
          valid(value, param) {
            return that.optional(value) || value.indexOf(param.value) >= 0;
          },
          message(param) {
            return that.formatMessage(param.message || "输入值必须包含%s。", [param.value]);
          }
        },
        /**
         * 验证最小长度
         */
        minlength: {
          valid(value, param) {
            return that.optional(value) || value.length >= param.value;
          },
          message(param) {
            return that.formatMessage(param.message || "最少要输入%s个字符。", [param.value]);
          }
        },
        /**
         * 验证最大长度
         */
        maxlength: {
          valid(value, param) {
            return that.optional(value) || value.length <= param.value;
          },
          message(param) {
            return that.formatMessage(param.message || "最多可以输入%s个字符。", [param.value]);
          }
        },
        /**
         * 验证一个长度范围[min, max]
         */
        rangelength: {
          valid(value, param) {
            return that.optional(value) || value.length >= param.min && value.length <= param.max;
          },
          message(param) {
            return that.formatMessage(param.message || "请输入长度在%s到%s之间的字符。", [param.min, param.max]);
          }
        },
        /**
         * 验证最小值
         */
        min: {
          valid(value, param) {
            return that.optional(value) || value >= param.value;
          },
          message(param) {
            return that.formatMessage(param.message || "请输入不小于%s的数值。", [param.value]);
          }
        },
        /**
         * 验证最大值
         */
        max: {
          valid(value, param) {
            return that.optional(value) || value <= param.value;
          },
          message(param) {
            return that.formatMessage(param.message || "请输入不大于%s的数值。", [param.value]);
          }
        },
        /**
         * 验证一个值范围[min, max]
         */
        range: {
          valid(value, param) {
            return that.optional(value) || value >= param.min && value <= param.max;
          },
          message(param) {
            return that.formatMessage(param.message || "请输入范围在%s到%s之间的数值。", [param.min, param.max]);
          }
        }
      };
    }
    /**
     * 添加自定义验证方法
     * @param {String} name 方法名
     * @param {Function} method 函数体，接收两个参数(value, param)，value表示元素的值，param表示参数
     * @param {String} message 提示信息
     */
    addMethod(name, method2, message) {
      this.methods[name] = method2;
      this.defaults.messages[name] = message !== void 0 ? message : this.defaults.messages[name];
    }
    /**
     * 判断验证方法是否存在
     */
    isValidMethod(value) {
      return this.methods.hasOwnProperty(value);
    }
    /**
     * 格式化提示信息模板
     */
    formatMessage(message, parameters) {
      if (!Array.isArray(parameters)) {
        parameters = [parameters];
      }
      for (var i in parameters) {
        message = message.replace("%s", parameters[i]);
      }
      return message;
    }
    /**
     * 格式化提示信息模板
     */
    formatTpl(source, params2) {
      const that = this;
      if (arguments.length === 1) {
        return function() {
          let args = Array.from(arguments);
          args.unshift(source);
          return that.formatTpl.apply(this, args);
        };
      }
      if (params2 === void 0) {
        return source;
      }
      if (arguments.length > 2 && params2.constructor !== Array) {
        params2 = Array.from(arguments).slice(1);
      }
      if (params2.constructor !== Array) {
        params2 = [params2];
      }
      params2.forEach(function(n, i) {
        source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
          return n;
        });
      });
      return source;
    }
    /**
     * 判断规则依赖是否存在
     */
    depend(param) {
      switch (typeof param) {
        case "boolean":
          param = param;
          break;
        case "string":
          param = !!param.length;
          break;
        case "function":
          param = param();
        default:
          param = true;
      }
      return param;
    }
    /**
     * 判断输入值是否为空
     */
    optional(value) {
      return !this.methods.required.valid(value) && "dependency-mismatch";
    }
    /**
     * 获取自定义字段的提示信息
     * @param {String} param 字段名
     * @param {Object} rule 规则
     */
    customMessage(param, rule) {
      if (!rule.parameters.message) {
        rule.parameters.message = this.defaults.messages[rule.method];
      }
      if (rule.parameters.message.indexOf("%s") >= 0) {
        return this.methods[rule.method].message;
      } else {
        return rule.parameters.message;
      }
    }
    /**
     * 获取某个指定字段的提示信息
     * @param {String} param 字段名
     * @param {Object} rule 规则
     */
    defaultMessage(param, rule) {
      let message = this.customMessage(param, rule) || this.defaults.messages[rule.method];
      let type2 = typeof message;
      if (type2 === "undefined") {
        message = `Warning: No message defined for ${rule.method}.`;
      } else if (type2 === "function") {
        message = message.call(this, rule.parameters);
      }
      return message;
    }
    /**
     * 缓存错误信息
     * @param {String} param 字段名
     * @param {Object} rule 规则
     * @param {String} value 元素的值
     */
    formatTplAndAdd(param, rule, value) {
      let msg = this.defaultMessage(param, rule);
      this.errorList.push({
        param,
        msg,
        value
      });
    }
    /**
     * 验证某个指定字段的规则
     * @param {String} param 字段名
     * @param {Object} rules 规则
     * @param {Object} event 表单数据对象
     */
    checkParam(param, rules2, event) {
      this.scope = event;
      const data = event.detail.value;
      const value = data[param] || "";
      for (let method2 in rules2) {
        if (this.isValidMethod(method2)) {
          const rule = {
            method: method2,
            parameters: rules2[method2]
          };
          const result = this.methods[method2].valid(value, rule.parameters);
          if (result === "dependency-mismatch") {
            continue;
          }
          this.setValue(param, method2, result, value);
          if (!result) {
            this.formatTplAndAdd(param, rule, value);
            break;
          }
        }
      }
    }
    /**
     * 设置字段的默认验证值
     * @param {String} param 字段名
     */
    setView(param) {
      this.form[param] = {
        $name: param,
        $valid: true,
        $invalid: false,
        $error: {},
        $success: {},
        $viewValue: ``
      };
    }
    /**
     * 设置字段的验证值
     * @param {String} param 字段名
     * @param {String} method 字段的方法
     * @param {Boolean} result 是否通过验证
     * @param {String} value 字段的值
     */
    setValue(param, method2, result, value) {
      const params2 = this.form[param];
      params2.$valid = result;
      params2.$invalid = !result;
      params2.$error[method2] = !result;
      params2.$success[method2] = result;
      params2.$viewValue = value;
    }
    /**
     * 验证所有字段的规则，返回验证是否通过
     * @param {Object} event 表单数据对象
     */
    checkForm(event) {
      this.__initData();
      for (let param in this.rules) {
        this.setView(param);
        this.checkParam(param, this.rules[param], event);
      }
      return this.valid();
    }
    /**
     * 返回验证是否通过
     */
    valid() {
      return this.size() === 0;
    }
    /**
     * 返回错误信息的个数
     */
    size() {
      return this.errorList.length;
    }
    /**
     * 返回所有错误信息
     */
    validationErrors() {
      return this.errorList;
    }
  };
  var Login = {
    //微信登录
    weixin(thiz, dataset) {
      if (uni.getUserProfile) {
        uni.getUserProfile({
          lang: "zh_CN",
          desc: "用于登陆",
          success: function(wxInfo) {
            uni.login({
              provider: "weixin",
              success: function(res2) {
                let data = {
                  code: res2.code,
                  type: dataset.logintype,
                  userInfo: JSON.stringify(wxInfo.userInfo)
                };
                thiz.$http.post(dataset.loginurl, data).then((res3) => {
                  if (res3.code == 200) {
                    thiz.setData({
                      userInfo: res3.data
                    });
                    thiz.$session.setUser(res3.data);
                  }
                  if (thiz[dataset.callback]) {
                    thiz[dataset.callback](res3);
                  } else if (thiz[dataset.callback + "Function"]) {
                    thiz[dataset.callback + "Function"](res3);
                  } else if (thiz[dataset.callback + "Api"]) {
                    thiz[dataset.callback + "Api"](res3);
                  }
                });
              },
              fail: function() {
                wx.showModal({
                  title: "获取用户信息",
                  content: "请允许授权以便为您提供给服务",
                  success: function(res2) {
                    if (res2.confirm) {
                      thiz.navigateTo(dataset);
                    }
                  }
                });
              }
            });
          },
          fail: function(res2) {
            wx.showModal({
              title: "友情提示",
              content: "已拒绝小程序获取信息",
              showCancel: false
            });
          }
        });
      } else {
        uni.showToast({
          title: "登录失败，请在小程序上登录",
          icon: "none"
        });
      }
    }
  };
  var Pay = {
    async pay(param) {
      let page = getApp().globalData.currentPage;
      let session = page.$session;
      if (!session.getUser()) {
        page.showToast("请先登录");
        if (params.fail && typeof params.fail == "function") {
          params.fail(res);
        }
        return;
      }
      if (!param.total) {
        page.showToast("请配置价格参数total");
        if (params.fail && typeof params.fail == "function") {
          params.fail(res);
        }
        return;
      }
      let http_data = {
        total: param.total,
        body: param.body
      };
      if (param.openid || session.getUser() && session.getUser().openid) {
        http_data.openid = param.openid || session.getUser().openid;
      }
      if (param.param) {
        http_data = Object.assign(http_data, param.param);
      }
      let http_header = {};
      if (param.header) {
        http_header = param.header;
      }
      let data = await page.$http.post(param.url || "/api/wepay/order", http_data, http_header, "json");
      if (data.code != 200) {
        page.showToast(data.msg);
        return;
      }
      if (this[param.paytype]) {
        this[param.paytype](Object.assign(data, param));
      } else {
        if (params.fail && typeof params.fail == "function") {
          params.fail(res);
        }
        page.showToast("请使用微信打开");
        return;
      }
    },
    //微信支付  
    weixin(params2 = {}) {
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: params2.data.timeStamp,
        // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: params2.data.nonceStr,
        // 支付签名随机串，不长于 32 位  
        package: params2.data.package,
        // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*） 
        signType: params2.data.signType,
        // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'  
        paySign: params2.data.paySign,
        // 支付签名  
        success: (res2) => {
          if (params2.success && typeof params2.success == "function") {
            params2.success(res2);
          } else {
            formatAppLog("log", "at common/Pay.js:65", "配置支付回调成功方法");
          }
        },
        fail: (res2) => {
          if (params2.fail && typeof params2.fail == "function") {
            params2.fail(res2);
          } else {
            formatAppLog("log", "at common/Pay.js:72", "配置支付回调失败方法");
          }
        }
      });
    }
  };
  const Validate = (rules2, messages2) => new Validate$1(rules2, messages2);
  function setData(dataset) {
    for (let field in dataset) {
      const regex = /([\w$]+)|\[(:\d)\]/g;
      const patten = field.match(regex);
      let result = this;
      for (let i = 0; i < patten.length - 1; i++) {
        const key = patten[i];
        result = result[key];
      }
      result[patten[patten.length - 1]] = dataset[field];
    }
  }
  var flagArr$1 = [];
  function navigateTo(e) {
    let dataset = e.currentTarget ? e.currentTarget.dataset : e;
    let { id, type: type2 } = dataset;
    let thiz = this;
    if (e.currentTarget) {
      if (!flagArr$1[type2]) {
        flagArr$1[type2] = true;
        setTimeout(() => {
          flagArr$1[type2] = false;
        }, 500);
      } else {
        return;
      }
    }
    if (type2 == "openmodal") {
      thiz[id] = "show";
    } else if (type2 == "closemodal") {
      thiz[id] = "";
    } else if (type2 == "page" || type2 == "inner" || type2 == "href") {
      thiz.$tools.navigateTo(dataset.url, dataset);
    } else if (type2 == "submit") {
      showToast("将执行表单提交动作");
    } else if (type2 == "reset") {
      showToast("将执行表单重置动作");
    } else if (type2 == "tip") {
      showToast(dataset.tip);
    } else if (type2 == "confirm") {
      uni.showModal({
        title: "提示",
        content: dataset.tip,
        showCancel: false
      });
    } else if (type2 == "daohang") {
      uni.openLocation({
        latitude: Number(dataset.lat),
        longitude: Number(dataset.lng),
        address: dataset.address,
        success: function() {
          formatAppLog("log", "at common/Page.js:68", "success");
        }
      });
    } else if (type2 == "phone") {
      thiz.$tools.makePhoneCall(e);
    } else if (type2 == "previewImage" || type2 == "preview") {
      uni.previewImage({
        current: thiz.$tools.renderImage(dataset.img),
        // 当前显示图片的http链接
        urls: [thiz.$tools.renderImage(dataset.img)]
        // 需要预览的图片http链接列表
      });
    } else if (type2 == "copy") {
      uni.setClipboardData({
        data: dataset.copy,
        showToast: false,
        success: function() {
          showToast(dataset.tip || "复制成功", "none");
        }
      });
    } else if (type2 == "xcx") {
      uni.navigateToMiniProgram({
        appId: dataset.appid,
        path: dataset.path,
        success(res2) {
        }
      });
    } else if (typeof thiz[type2] == "function") {
      thiz[type2](dataset);
    } else if (type2 == "login") {
      let logintType = dataset.logintype;
      if (Login[logintType]) {
        Login[logintType](thiz, dataset);
      } else {
        showToast(type2 + "登录有待实现");
      }
    } else if (type2 == "pay") {
      Pay.pay(dataset);
    } else {
      showToast(type2 + "类型有待实现");
    }
  }
  function showModal(message, title = "提示", iscancel = true) {
    return new Promise((resolve) => {
      uni.showModal({
        title,
        content: message,
        showCancel: iscancel,
        success: function(res2) {
          if (res2.confirm) {
            resolve(true);
          } else if (res2.cancel) {
            resolve(false);
          }
        }
      });
    });
  }
  function showToast(title, icon) {
    uni.showToast({
      title,
      icon: icon ? icon : "none"
    });
  }
  function getPickerChildren(data, chindInex1, childIndex2) {
    if (chindInex1 != null && data[chindInex1] && data[chindInex1].children && data[chindInex1].children) {
      let children = data[chindInex1].children;
      if (childIndex2 == null) {
        if (children != null && children.length > 0) {
          return children.map((item) => item.label);
        } else {
          return [];
        }
      } else {
        if (children[childIndex2] == null) {
          return [];
        }
        let children2 = children[childIndex2].children;
        if (children2 != null && children2.length > 0) {
          return children2.map((item) => item.label);
        } else {
          return [];
        }
      }
    } else {
      return [];
    }
  }
  function getData(thiz, field) {
    const regex = /([\w$]+)|\[(:\d)\]/g;
    const patten = field.match(regex);
    let result = thiz;
    for (let i = 0; i < patten.length - 1; i++) {
      let key = patten[i];
      result = result[key];
    }
    return result[patten[patten.length - 1]];
  }
  function uploadImage(thiz, field, fieldData, uploadUrl, count = 9, type2 = "img") {
    return new Promise((resolve) => {
      if (!uploadUrl) {
        showToast("请配置上传地址");
        resolve();
        return;
      }
      uni.chooseImage({
        count,
        sizeType: ["original", "compressed"],
        // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"],
        // 可以指定来源是相册还是相机，默认二者都有javascript:;
        success: function(res2) {
          let tempFilePaths = res2.tempFilePaths;
          for (let i = 0; i < tempFilePaths.length; i++) {
            uni.uploadFile({
              url: thiz.$http.setUrl(uploadUrl),
              //仅为示例，非真实的接口地址
              filePath: tempFilePaths[i],
              name: "file",
              header: {
                Authorization: thiz.$session.getToken() || ""
              },
              success(res3) {
                let data = thiz.$tools.fromJson(res3.data);
                let url2 = "";
                if (data.url) {
                  url2 = thiz.$tools.renderImage(data.url);
                }
                if (data.data && thiz.$tools.isObject(data.data) && data.data.url) {
                  url2 = thiz.$tools.renderImage(data.data.url);
                }
                if (type2 == "avatar") {
                  thiz.setData({
                    [field]: url2
                  });
                } else {
                  let files = getData(thiz, fieldData).concat(url2);
                  thiz.setData({
                    [fieldData]: files,
                    [field]: (files || []).join(",").replace(/^[]/, "")
                  });
                }
              },
              complete() {
                if (i == tempFilePaths.length - 1) {
                  resolve();
                }
              }
            });
          }
        }
      });
    });
  }
  function setAuthorize(authorizeScope, modal, errortip = "获取当前设置异常") {
    return new Promise((resolve, reject) => {
      resolve();
      if (!modal) {
        modal = {
          title: "授权",
          content: "需要您设置授权已使用相应功能",
          confirmText: "设置"
        };
      }
      uni.getSetting({
        success(res2) {
          const hasAuthor = res2.authSetting[authorizeScope];
          switch (hasAuthor) {
            case void 0:
              uni.authorize({
                scope: authorizeScope,
                success: (res3) => {
                  resolve(res3);
                },
                fail: (err) => {
                  uni.showToast({
                    title: "授权失败",
                    icon: "none",
                    duration: 3e3
                  });
                  reject(err);
                }
              });
              break;
            case true:
              resolve();
              break;
            case false:
              uni.showModal({
                ...modal,
                success: (res3) => {
                  if (res3.confirm) {
                    uni.openSetting({
                      success: (res4) => {
                        if (res4.authSetting[authorizeScope]) {
                          resolve(res4);
                        } else {
                          reject(res4);
                          uni.showToast({
                            title: "授权失败",
                            icon: "none",
                            duration: 3e3
                          });
                        }
                      },
                      fail: (err) => {
                        reject(err);
                        uni.showToast({
                          title: "打开设置异常",
                          icon: "none",
                          duration: 3e3
                        });
                      }
                    });
                  } else {
                    reject(res3);
                    uni.showToast({
                      title: "授权失败",
                      icon: "none",
                      duration: 3e3
                    });
                  }
                },
                fail: (err) => {
                  reject(err);
                  uni.showToast({
                    title: "弹窗异常",
                    icon: "none",
                    duration: 3e3
                  });
                }
              });
              break;
          }
        },
        fail: (err) => {
          reject(err);
          uni.showToast({
            title: errortip,
            icon: "none",
            duration: 3e3
          });
        }
      });
    });
  }
  function getOption(option) {
    if (option !== null && typeof option === "object") {
      for (let key in option) {
        option[key] = decodeURIComponent(option[key]);
      }
    }
    return option;
  }
  function setCurrentPage(page) {
    if (this.$session.getUser()) {
      page.userInfo = this.$session.getUser();
    }
    if (this.$session.getValue("redirect_page")) {
      let value = this.$session.getValue("redirect_page");
      this.$session.setValue("redirect_page", null);
      this.$tools.navigateTo(value.url, value);
    }
    getApp().globalData.currentPage = page;
  }
  const __config = {
    basePath: "请配置你的API全局域名",
    fileBasePath: "请配置你的API全局域名",
    title: "share-app",
    debug: true,
    appid: "25518"
  };
  class Tools {
    constructor() {
      Object.assign(this, {
        $$basePath: __config.basePath,
        $$fileBasePath: __config.fileBasePath
      });
    }
    /**
     * 返回文件后缀
     * @param  {Object} file
     * @return {String}
     */
    getFilenameExt(file) {
      const types2 = file.name.split(".");
      return types2[types2.length - 1];
    }
    getWeek(dateTime) {
      let temptTime = new Date(dateTime.getTime());
      let weekday = temptTime.getDay() || 7;
      temptTime.setDate(temptTime.getDate() - weekday + 1 + 5);
      let firstDay = new Date(temptTime.getFullYear(), 0, 1);
      let dayOfWeek = firstDay.getDay();
      let spendDay = 1;
      if (dayOfWeek != 0)
        spendDay = 7 - dayOfWeek + 1;
      firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay);
      let d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 864e5);
      let result = Math.ceil(d / 7);
      return result;
    }
    formatDateTime(val, format2 = "YYYY-mm-dd HH:MM:SS") {
      if (this.isDate(val)) {
        return this.formatDate(val, format2);
      } else if (!isNaN(val)) {
        if (String(val).length == 10) {
          val = val * 1e3;
        }
        let date2 = new Date(val);
        return this.formatDate(date2, format2);
      } else if (val) {
        let date2 = new Date(val);
        return this.formatDate(date2, format2);
      }
    }
    formatDate(date2, format2) {
      let we = date2.getDay();
      let qut = Math.floor((date2.getMonth() + 3) / 3).toString();
      const opt = {
        "Y+": date2.getFullYear().toString(),
        // 年
        "m+": (date2.getMonth() + 1).toString(),
        // 月(月份从0开始，要+1)
        "d+": date2.getDate().toString(),
        // 日
        "H+": date2.getHours().toString(),
        // 时
        "M+": date2.getMinutes().toString(),
        // 分
        "S+": date2.getSeconds().toString(),
        // 秒
        "q+": qut
        // 季度
      };
      const week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
      };
      const quarter = {
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四"
      };
      if (/(W+)/.test(format2))
        format2 = format2.replace(RegExp.$1, RegExp.$1.length > 1 ? RegExp.$1.length > 2 ? "星期" + week[we] : "周" + week[we] : week[we]);
      if (/(Q+)/.test(format2))
        format2 = format2.replace(RegExp.$1, RegExp.$1.length == 4 ? "第" + quarter[qut] + "季度" : quarter[qut]);
      if (/(Z+)/.test(format2)) {
        let z = this.getWeek(date2);
        format2 = format2.replace(RegExp.$1, RegExp.$1.length == 3 ? "第" + z + "周" : z + "");
      }
      for (let k in opt) {
        let r = new RegExp("(" + k + ")").exec(format2);
        if (r)
          format2 = format2.replace(r[1], RegExp.$1.length == 1 ? opt[k] : opt[k].padStart(RegExp.$1.length, "0"));
      }
      return format2;
    }
    getCurrentDate() {
      return this.formatDate(new Date(), "YYYY-mm-dd");
    }
    getCurrentTime() {
      return this.formatDate(new Date(), "HH:MM");
    }
    addDays(days) {
      let d = new Date();
      d.setMilliseconds(d.getMilliseconds() + days * 24 * 60 * 60 * 1e3);
      return this.formatDate(d, "YYYY-mm-dd");
    }
    getCurrentDateTime() {
      return this.formatDate(new Date(), "YYYY-mm-dd HH:MM:SS");
    }
    /**
     * 返回指定范围内的一个整数
     * @param  {Number} min
     * @param  {Number} max
     * @return {String}
     */
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    /**
     * 生成字符串组合
     * @param  {Number} size
     * @return {String}
     */
    randString(size) {
      let result = "";
      let allChar = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      size = size || 1;
      while (size--) {
        result += allChar.charAt(this.rand(0, allChar.length - 1));
      }
      return result;
    }
    /**
     * 生成文件名
     * @param  {Object} file
     * @return {String}
     */
    randFilename(file) {
      return this.randString(this.rand(10, 100)) + Date.parse(new Date()) + "." + this.getFilenameExt(file);
    }
    /**
     * 判断某个元素是否为字符串
     * @param  {String}  value
     * @return {Boolean}
     */
    isString(value) {
      return typeof value === "string";
    }
    /**
     * 判断某个元素是否为函数
     * @param  {Function}  value
     * @return {Boolean}
     */
    isFunction(value) {
      return this.type(value) === "function";
    }
    /**
     * 把行数据转为表单数据
     * @param {Object} row
     * @param {Object} formdata
     */
    changeRowToForm(row, formdata) {
      for (let attr in formdata) {
        if (row[attr]) {
          if (formdata[attr] && this.isArray(formdata[attr])) {
            if (row[attr] && typeof row[attr] === "string") {
              row[attr] = JSON.parse(row[attr]);
            } else if (this.isObject(row[attr])) {
              continue;
            } else {
              row[attr] = [];
            }
          }
        } else {
          row[attr] = formdata[attr];
        }
      }
      return row;
    }
    /**
     * 判断某个元素是否为数组
     * @param  {Array}  value
     * @return {Boolean}
     */
    isArray(value) {
      return Array.isArray(value);
    }
    /**
     * 判断某个元素是否为对象
     * @param  {Obejct}  value
     * @return {Boolean}
     */
    isObject(value) {
      return value !== null && typeof value === "object";
    }
    /**
     * 判断某个元素是否为数值
     * @param  {Number}  value
     * @return {Boolean}
     */
    isNumber(value) {
      return typeof value === "number";
    }
    /**
     * 判断某个元素是否为日期
     * @param  {Date}  value
     * @return {Boolean}
     */
    isDate(value) {
      return this.type(value) === "[object Date]";
    }
    /**
     * 判断某个元素是否为正则表达式
     * @param  {RegExp}  value
     * @return {Boolean}
     */
    isRegExp(value) {
      return this.type(value) === "[object RegExp]";
    }
    /**
     * 判断某个元素是否为File对象
     * @param  {Object}  obj
     * @return {Boolean}
     */
    isFile(obj) {
      return this.type(obj) === "[object File]";
    }
    /**
     * 判断某个元素是否为FormData对象
     * @param  {Object}  obj
     * @return {Boolean}
     */
    isFormData(obj) {
      return this.type(obj) === "[object FormData]";
    }
    /**
     * 判断某个元素是否为Blob对象
     * @param  {Object}  obj
     * @return {Boolean}
     */
    isBlob(obj) {
      return this.type(obj) === "[object Blob]";
    }
    /**
     * 判断某个元素是否为布尔值
     * @param  {boolean}  value
     * @return {Boolean}
     */
    isBoolean(value) {
      return typeof value === "boolean";
    }
    /**
     * 判断某个元素是否为Promise对象
     * @param  {Function}  obj
     * @return {Boolean}
     */
    isPromiseLike(obj) {
      return obj && this.isFunction(obj.then);
    }
    /**
     * 判断数组类型
     * @param  {Array}  value
     * @return {Boolean}
     */
    isTypedArray(value) {
      const TYPED_ARRAY_REGEXP = /^\[object (?:Uint8|Uint8Clamped|Uint16|Uint32|Int8|Int16|Int32|Float32|Float64)Array\]$/;
      return value && this.isNumber(value.length) && TYPED_ARRAY_REGEXP.test(this.type(value));
    }
    /**
     * 判断某个元素是否为ArrayBuffer对象
     * @param  {Object}  obj
     * @return {Boolean}
     */
    isArrayBuffer(obj) {
      return this.type(obj) === "[object ArrayBuffer]";
    }
    /**
     * 判断某个元素是否为defined
     * @param  {undefined}  value
     * @return {Boolean}
     */
    isDefined(value) {
      return typeof value !== "undefined";
    }
    /**
     * 判断某个元素是否为undefined
     * @param  {undefined}  value
     * @return {Boolean}
     */
    isUndefined(value) {
      return typeof value === "undefined";
    }
    /**
     * 判断某个元素是否为null
     * @param  {Null}  value
     * @return {Boolean}
     */
    isNull(value) {
      return value === null;
    }
    /**
     * 判断某个元素是否为有限数
     * @param  {Number}  value
     * @return {Boolean}
     */
    isFinite(value) {
      return typeof value == "number" && isFinite(value);
    }
    /**
     * 判断某个元素是否为自然数
     * @param  {Number}  value
     * @return {Boolean}
     */
    isNaN(value) {
      return this.isNumber(value) && value != +value;
    }
    /**
     * 判断某个元素是否为错误类型
     * @param  {Object}  value
     * @return {Boolean}
     */
    isError(value) {
      return this.type(value) === "[object Error]";
    }
    /**
     * 删除字符串左右两端的空格
     * @param  {String} str
     * @return {String}
     */
    trim(str) {
      return this.isString(str) ? str.trim() : str;
    }
    /**
     * 字符串转义
     * @param  {String} str
     * @return {String}
     */
    escapeForRegexp(str) {
      return str.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
    }
    /**
     * 字符串转对象
     * @param  {String} str 'key1,key2,...'
     * @return {Object} in the form of {key1:true, key2:true, ...}
     */
    makeMap(str) {
      let obj = {}, items = str.split(",");
      for (let i = 0; i < items.length; i++) {
        obj[items[i]] = true;
      }
      return obj;
    }
    /**
     * 判断数组中是否含有指定元素
     * @param  {Array} arr
     * @param  {Objext} obj
     * @return {Array}
     */
    includes(arr, obj) {
      return Array.prototype.indexOf.call(arr, obj) != -1;
    }
    /**
     * 数组删除指定的元素，并返回元素的索引值
     * @param  {Array} array
     * @param  {String} value
     * @return {Number}
     */
    arrayRemove(array2, value) {
      let index = array2.indexOf(value);
      if (index >= 0) {
        array2.splice(index, 1);
      }
      return index;
    }
    /**
     * 日期增加分钟
     * @param  {Date} date
     * @param  {Number} minutes
     * @return {Date}
     */
    addDateMinutes(date2, minutes) {
      date2 = new Date(date2.getTime());
      date2.setMinutes(date2.getMinutes() + minutes || 0);
      return date2;
    }
    /**
     * 对象解析出JSON字符串
     * @param  {Object} obj
     * @param  {Number} pretty
     * @return {Object}
     */
    toJson(obj, pretty) {
      if (this.isUndefined(obj))
        return void 0;
      if (!this.isNumber(pretty)) {
        pretty = pretty ? 2 : null;
      }
      return JSON.stringify(obj, null, pretty);
    }
    /**
     * JSON字符串解析成对象
     * @param  {String} json
     * @return {Object}
     */
    fromJson(json) {
      return this.isString(json) ? JSON.parse(decodeURIComponent(json).replace(
        new RegExp("&quot;", "gm"),
        '"'
      )) : json;
    }
    /**
     * 扩展对象
     * @return {Object}
     */
    extend() {
      let src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
      }
      if (typeof target !== "object" && !this.isFunction(target)) {
        target = {};
      }
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) != null) {
          for (name in options) {
            src = target[name];
            copy = options[name];
            if (target === copy) {
              continue;
            }
            if (deep && copy && (this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && this.isArray(src) ? src : [];
              } else {
                clone = src && this.isPlainObject(src) ? src : {};
              }
              target[name] = this.extend(deep, clone, copy);
            } else if (copy !== void 0) {
              target[name] = copy;
            }
          }
        }
      }
      return target;
    }
    /**
     * 判断传入的参数是否为纯粹的对象，即直接量{}或new Object()创建的对象
     * @param  {[type]}  obj [description]
     * @return {Boolean}     [description]
     */
    isPlainObject(obj) {
      let getProto = Object.getPrototypeOf;
      let class2type = {};
      let hasOwn = class2type.hasOwnProperty;
      let fnToString = hasOwn.toString;
      let ObjectFunctionString = fnToString.call(Object);
      let proto, Ctor;
      if (!obj || this.type(obj) !== "[object Object]") {
        return false;
      }
      proto = getProto(obj);
      if (!proto) {
        return true;
      }
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    }
    /**
     * 判断对象是否为空
     * @param  {Object}  obj
     * @return {Boolean}
     */
    isEmptyObject(obj) {
      for (let i in obj)
        return false;
      return true;
    }
    /**
     * 判断对象的类型
     * @param  {Object} obj
     * @return {String}
     */
    type(obj) {
      const toString = Object.prototype.toString;
      if (obj == null) {
        return obj + "";
      }
      return typeof obj === "object" || typeof obj === "function" ? toString.call(obj) || "object" : typeof obj;
    }
    /**
     * 合并对象并返回一个新的对象，目标对象自身也会改变
     * @param  {Array} args
     * @return {Object}
     */
    merge(...args) {
      return Object.assign(...args);
    }
    /**
     * 拷贝对象并返回一个新的对象
     * @param  {Object} obj
     * @return {Object}
     */
    clone(obj) {
      if (typeof obj !== "object" || !obj) {
        return obj;
      }
      let copy = {};
      for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = obj[attr];
        }
      }
      return copy;
    }
    getUrlParams(url2) {
      var _params = {}, qStart = url2.indexOf("?"), hStart = url2.indexOf("#"), q = url2.substr(qStart + 1), tmp, parts, i;
      if (hStart === -1)
        hStart = url2.length;
      if (q) {
        tmp = q.split("&");
        i = tmp.length;
        while (i--) {
          parts = tmp[i].split("=");
          _params[parts[0]] = decodeURIComponent(parts[1]).replace(/\+/g, " ");
        }
      }
      return _params;
    }
    getUrlParam(url2, name) {
      return this.getUrlParams(url2)[name];
    }
    /**
     * 删除对象上的指定属性并返回一个新的对象
     * @param  {Object} obj
     * @param  {Array} keys
     * @return {[type]}
     */
    omit(obj, keys) {
      let o = this.clone(obj);
      keys.forEach((key) => {
        delete o[key];
      });
      return o;
    }
    /**
     * 返回一个新数组，数组中的元素为指定属性的值
     * @param  {Array} arr
     * @param  {String} key
     * @return {Array}
     */
    pluck(arr, key) {
      if (typeof arr !== "object" || arr.length === 0) {
        return [];
      }
      if (!key) {
        return arr;
      }
      return arr.map((a) => a[key]);
    }
    /**
     * 返回序列化的值
     * @param  {String} value
     * @return {String}
     */
    serializeValue(value) {
      if (this.isObject(value))
        return this.isDate(value) ? value.toISOString() : this.toJson(value);
      return value;
    }
    /**
     * 编码URI
     * @param  {String} value
     * @param  {String} pctEncodeSpaces
     * @return {String}
     */
    encodeUriQuery(value, pctEncodeSpaces) {
      return encodeURIComponent(value).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%3B/gi, ";").replace(/%20/g, pctEncodeSpaces ? "%20" : "+");
    }
    /**
     * 对象序列化
     * @param  {Object} obj
     * @return {String}
     */
    paramSerializer(obj) {
      if (!obj)
        return "";
      let that = this;
      let parts = [];
      for (let key in obj) {
        const value = obj[key];
        if (value === null || that.isUndefined(value)) {
          continue;
        }
        if (that.isArray(value)) {
          value.forEach(function(v) {
            parts.push(that.encodeUriQuery(key) + "=" + that.encodeUriQuery(that.serializeValue(v)));
          });
        } else {
          parts.push(that.encodeUriQuery(key) + "=" + that.encodeUriQuery(that.serializeValue(value)));
        }
      }
      return parts.join("&");
    }
    /**
     * 拼接URL
     * @param  {String} obj
     * @param  {Object} obj
     * @return {String}
     */
    buildUrl(url2, obj) {
      const serializedParams = this.paramSerializer(obj);
      if (serializedParams && serializedParams.length > 0) {
        url2 += (url2.indexOf("?") == -1 ? "?" : "&") + serializedParams;
      }
      return url2;
    }
    /**
     * 全局唯一标识符（uuid，Globally Unique Identifier）,也称作 uuid(Universally Unique IDentifier) 
     * 一般用于多个组件之间,给它一个唯一的标识符,或者v-for循环的时候,如果使用数组的index可能会导致更新列表出现问题
     * 最可能的情况是左滑删除item或者对某条信息流"不喜欢"并去掉它的时候,会导致组件内的数据可能出现错乱
     * v-for的时候,推荐使用后端返回的id而不是循环的index
     * @param {Number} len uuid的长度
     * @param {Boolean} firstU 将返回的首字母置为"u"
     * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
     */
    guid(len = 32, firstU = true, radix = null) {
      let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
      let uuid = [];
      radix = radix || chars.length;
      if (len) {
        for (let i = 0; i < len; i++)
          uuid[i] = chars[0 | Math.random() * radix];
      } else {
        let r;
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
        uuid[14] = "4";
        for (let i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
          }
        }
      }
      if (firstU) {
        uuid.shift();
        return "u" + uuid.join("");
      } else {
        return uuid.join("");
      }
    }
    /**
     * 查询节点信息
     * 当前方法在支付宝小程序中无法获取组件跟接点的尺寸
     * 解决办法：为组件根部再套一个没有任何作用的view元素
     */
    getRect(selector, all) {
      return new Promise((resolve) => {
        uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }
    renderUrl(url2, defaultUrl) {
      if (!url2 || url2 == "") {
        url2 = defaultUrl;
      }
      if (url2.indexOf("__weui-popup") > 0 || url2.startsWith("tel:") || url2.startsWith("http://") || url2.startsWith(
        "https://"
      )) {
        return url2;
      }
      if (url2.indexOf("/pages/" + url2) != 0) {
        url2 = "/pages/" + url2;
      }
      return url2;
    }
    renderImage(path) {
      if (!path)
        return "";
      if (path.indexOf("http") !== -1)
        return path;
      path = `${this.$$fileBasePath}${path}`;
      return path;
    }
    makePhoneCall(e) {
      let phone = "";
      if (e.currentTarget) {
        var dataset = e.currentTarget.dataset;
        phone = dataset.phone;
      } else if (this.isObject(e) && e.phone) {
        phone = e.phone;
      } else {
        phone = e;
      }
      if (phone.indexOf("tel:") !== -1) {
        phone = phone.substr(4);
      }
      uni.makePhoneCall({
        phoneNumber: phone
      });
    }
    //回退页面
    backpage(delta = 1) {
      uni.navigateBack({
        delta
      });
    }
    navigateTo(url2, params2) {
      if (url2.startsWith("tel:")) {
        this.makePhoneCall(url2);
      } else {
        if (url2.startsWith("http://") || url2.startsWith("https://")) {
          const $$url = this.buildUrl("/pages/webview", params2);
          return new Promise((resolve, reject) => {
            uni.navigateTo({
              url: $$url,
              success: (res2) => resolve(res2),
              fail: (res2) => reject(res2)
            });
          });
        } else {
          if (url2.startsWith("pages/")) {
            url2 = "/" + url2;
          }
          if (!url2.startsWith("/pages/")) {
            url2 = "/pages/" + url2;
          }
          if (!getApp()) {
            uni.reLaunch({
              url: url2
            });
            uni.hideHomeButton();
            return;
          } else if (getApp().globalData && getApp().globalData.tabBar && getApp().globalData.tabBar.indexOf(url2) != -1 || params2["tabbar"]) {
            uni.switchTab({
              url: url2
            });
          } else if (params2 && params2["redirect"]) {
            const $$url = this.buildUrl(url2, params2);
            uni.redirectTo({
              url: $$url,
              success: (res2) => {
                if (uni.hideHomeButton) {
                  uni.hideHomeButton();
                }
              },
              fail: (res2) => {
                formatAppLog("log", "at common/Tools.js:860", "error" + res2);
              }
            });
          } else {
            const $$url = this.buildUrl(url2, params2);
            uni.navigateTo({
              url: $$url,
              success: (res2) => {
              },
              fail: (res2) => {
                formatAppLog("log", "at common/Tools.js:871", "error" + res2);
                if (res2 && res2.errMsg && res2.errMsg.indexOf("limit") > 0) {
                  uni.redirectTo({
                    url: $$url,
                    success: (res3) => {
                    },
                    fail: (res3) => {
                      formatAppLog("log", "at common/Tools.js:878", "error" + res3);
                    }
                  });
                }
              }
            });
          }
        }
      }
    }
    // 补0，如1 -> 01
    padZero(num, targetLength = 2) {
      let str = `${num}`;
      while (str.length < targetLength) {
        str = `0${str}`;
      }
      return str;
    }
    parseTimeData(time) {
      const SECOND = 1e3;
      const MINUTE = 60 * SECOND;
      const HOUR = 60 * MINUTE;
      const DAY = 24 * HOUR;
      const days = Math.floor(time / DAY);
      const hours = Math.floor(time % DAY / HOUR);
      const minutes = Math.floor(time % HOUR / MINUTE);
      const seconds = Math.floor(time % MINUTE / SECOND);
      const milliseconds = Math.floor(time % SECOND);
      return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      };
    }
    parseFormat(format2, timeData) {
      let {
        days,
        hours,
        minutes,
        seconds,
        milliseconds
      } = timeData;
      if (format2.indexOf("DD") === -1) {
        hours += days * 24;
      } else {
        format2 = format2.replace("DD", this.padZero(days));
      }
      if (format2.indexOf("HH") === -1) {
        minutes += hours * 60;
      } else {
        format2 = format2.replace("HH", this.padZero(hours));
      }
      if (format2.indexOf("mm") === -1) {
        seconds += minutes * 60;
      } else {
        format2 = format2.replace("mm", this.padZero(minutes));
      }
      if (format2.indexOf("ss") === -1) {
        milliseconds += seconds * 1e3;
      } else {
        format2 = format2.replace("ss", this.padZero(seconds));
      }
      return format2.replace("SSS", this.padZero(milliseconds, 3));
    }
    isSameSecond(time1, time2) {
      return Math.floor(time1 / 1e3) === Math.floor(time2 / 1e3);
    }
    addUnit(value = "auto", unit = "rpx") {
      return this.isNumber(value) ? `${value}${unit}` : value;
    }
    // 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
    // this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
    // 这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
    // 值(默认为undefined)，就是查找最顶层的$parent
    getParent(parent, name = void 0) {
      while (parent) {
        if (parent.$options && parent.$options.name !== name) {
          parent = parent.$parent;
          let tmp = this.getParent(parent, name);
          if (tmp) {
            return tmp;
          }
        } else {
          return parent;
        }
      }
      return false;
    }
    os() {
      return uni.getSystemInfoSync().platform;
    }
    sys() {
      return uni.getSystemInfoSync();
    }
  }
  var SESSION_SUFFIX = "session_com_";
  var SESSION_KEY = "user_session";
  var REDIRECT_SESSION_KEY = "redirect_session";
  var Session = {
    getRedirecturl() {
      return uni.getStorageSync(SESSION_SUFFIX + __config.appid + "_" + REDIRECT_SESSION_KEY) || null;
    },
    setRedirecturl(url2) {
      if (url2 == null) {
        uni.removeStorageSync(SESSION_SUFFIX + __config.appid + "_" + REDIRECT_SESSION_KEY);
      } else {
        uni.setStorageSync(SESSION_SUFFIX + __config.appid + "_" + REDIRECT_SESSION_KEY, url2);
      }
    },
    getUser() {
      return uni.getStorageSync(SESSION_SUFFIX + __config.appid + SESSION_KEY) || null;
    },
    setUser(session) {
      uni.setStorageSync(SESSION_SUFFIX + __config.appid + SESSION_KEY, session);
    },
    clearUser() {
      uni.removeStorageSync(SESSION_KEY + __config.appid);
      const res2 = uni.getStorageInfoSync();
      res2.keys.forEach((key) => {
        if (key.startsWith(SESSION_SUFFIX + __config.appid)) {
          uni.removeStorageSync(key);
        }
      });
    },
    getToken() {
      var userInfo = this.getUser();
      return userInfo ? userInfo.token : null;
    },
    getOpenId() {
      var userInfo = this.getUser();
      return userInfo ? userInfo.openid : null;
    },
    setValue(key, value) {
      if (value == null) {
        uni.removeStorageSync(SESSION_SUFFIX + __config.appid + key);
      } else {
        uni.setStorageSync(SESSION_SUFFIX + __config.appid + key, value);
      }
    },
    getValue(key) {
      return uni.getStorageSync(SESSION_SUFFIX + __config.appid + key) || null;
    }
  };
  class ServiceBase {
    constructor() {
      Object.assign(this, {
        $$basePath: __config.basePath
      });
      this.__init();
    }
    /**
     * __init
     */
    __init() {
      this.__initDefaults();
      this.__initMethods();
    }
    __initInterceptor() {
    }
    /**
     * __initDefaults
     */
    __initDefaults() {
      this.suffix = "";
      this.instanceSource = {
        method: [
          "OPTIONS",
          "GET",
          "HEAD",
          "POST",
          "PUT",
          "PATCH",
          "DELETE",
          "TRACE",
          "CONNECT"
        ]
      };
    }
    /**
     * 遍历对象构造方法，方法名以小写字母+后缀名
     */
    __initMethods() {
      for (let key in this.instanceSource) {
        this.instanceSource[key].forEach((method2, index) => {
          this[method2.toLowerCase() + this.suffix] = (...args) => this.__defaultRequest(method2, ...args);
        });
      }
    }
    /**
     * 以uni.request作为底层方法
     * @param {String} method 请求方法
     * @param {String} url    接口地址
     * @param {Object} params 请求参数
     * @param {Object} header 设置请求的 header
     * @param {String} dataType 请求的数据类型
     */
    __defaultRequest(method2 = "", url2 = "", params2 = {}, header = {}, dataType = "json") {
      const $$header = Object.assign({}, this.setHeaders(), header);
      const $$url = this.setUrl(url2, params2);
      if (params2.url) {
        params2.url = this.setUrl(params2.url, params2);
      }
      const chainInterceptors = (promise3, interceptors) => {
        for (let i = 0, ii = interceptors.length; i < ii; ) {
          let thenFn = interceptors[i++];
          let rejectFn = interceptors[i++];
          promise3 = promise3.then(thenFn, rejectFn);
        }
        return promise3;
      };
      const $$config = {
        url: $$url,
        data: params2,
        header: $$header,
        method: method2,
        dataType
      };
      let requestInterceptors = [];
      let responseInterceptors = [];
      let reversedInterceptors = this.setInterceptors();
      let promise2 = this.__resolve($$config);
      reversedInterceptors.forEach((n, i) => {
        if (n.request || n.requestError) {
          requestInterceptors.push(n.request, n.requestError);
        }
        if (n.response || n.responseError) {
          responseInterceptors.unshift(n.response, n.responseError);
        }
      });
      promise2 = chainInterceptors(promise2, requestInterceptors);
      promise2 = promise2.then(this.__http);
      promise2 = chainInterceptors(promise2, responseInterceptors);
      promise2 = promise2.then((res2) => res2.data, (err) => err);
      return promise2;
    }
    /**
     * __http - uni.request
     */
    __http(obj) {
      return new Promise((resolve, reject) => {
        obj.success = (res2) => resolve(res2);
        obj.fail = (res2) => reject(res2);
        uni.request(obj);
      });
    }
    /**
     * __resolve
     */
    __resolve(res2) {
      return new Promise((resolve, reject) => {
        resolve(res2);
      });
    }
    /**
     * __reject
     */
    __reject(res2) {
      return new Promise((resolve, reject) => {
        reject(res2);
      });
    }
    getPathValue(obj, desc) {
      var arr = desc.split(".");
      while (arr.length) {
        obj = obj[arr.shift()];
      }
      return obj;
    }
    getRestUrl(url2, data) {
      if (!data) {
        return url2;
      } else if (data !== null && typeof data === "object") {
        url2 = url2.replace(/\{\{(.+?)\}\}/g, (_, key) => {
          let name = key.trim();
          return this.getPathValue(data, name);
        });
        url2 = url2.replace(/\{(.+?)\}/g, (_, key) => {
          let name = key.trim();
          return this.getPathValue(data, name);
        });
        return url2;
      }
      return url2;
    }
    /**
     * 设置请求路径
     */
    setUrl(url2, param) {
      let ishttp = /^http(s)?:\/\/.*/i.test(url2);
      url2 = this.getRestUrl(url2, param);
      if (ishttp) {
        return url2;
      }
      if (url2.startsWith("/") || this.$$basePath.endsWith("/")) {
        return `${this.$$basePath}${this.$$prefix}${url2}`;
      } else {
        return `${this.$$basePath}/${this.$$prefix}${url2}`;
      }
    }
    /**
     * 设置请求的 header , header 中不能设置 Referer
     */
    setHeaders() {
      return {
        // 'Accept': 'application/json', 
        // 'Content-type': 'application/json', 
        "Content-Type": "application/x-www-form-urlencoded"
      };
    }
    /**
     * 设置request拦截器
     */
    setInterceptors() {
      this.interceptors = [{
        request: (request) => {
          request.header = request.header || {};
          request.requestTimestamp = new Date().getTime();
          if (Session.getToken()) {
            request.header.Authorization = Session.getToken();
          }
          uni.showNavigationBarLoading();
          if (request.data["redirecturl"]) {
            Session.setRedirecturl(request.data["redirecturl"]);
            delete request.data["redirecturl"];
          }
          delete request.data["loadmsg"];
          return request;
        },
        requestError: (requestError) => {
          uni.hideToast();
          return requestError;
        },
        response: (response) => {
          if (!response) {
            return;
          }
          response.responseTimestamp = new Date().getTime();
          uni.hideNavigationBarLoading();
          if (response.data.code == 401 || response.data.status == 401) {
            Session.clearUser();
            uni.reLaunch({
              url: getApp().globalData.homePage
            });
          }
          return response;
        },
        responseError: (responseError) => {
          uni.hideNavigationBarLoading();
          return responseError;
        }
      }];
      this.__initInterceptor();
      return this.interceptors;
    }
  }
  class Service extends ServiceBase {
    constructor() {
      super();
      this.$$prefix = "";
    }
    /**
     * 初始化默认拦截器
     */
    __initInterceptor() {
    }
    //获取POST数据
    postData(params2, url2) {
      return this.post(url2 || this.$$path.data, params2);
    }
    //获取GET数据
    getData(params2, url2) {
      return this.get(url2 || this.$$path.data, params2);
    }
    //保存数据
    saveData(params2, url2) {
      return this.post(url2 || this.$$path.save, params2);
    }
    //删除数据
    delData(params2, url2) {
      return this.post(url2 || this.$$path.del, params2);
    }
  }
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    created() {
      this.$u.getRect = this.$uGetRect;
    },
    computed: {
      // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
      // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
      // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
      $u() {
        return uni.$u.deepMerge(uni.$u, {
          props: void 0,
          http: void 0,
          mixin: void 0
        });
      },
      /**
       * 生成bem规则类名
       * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
       * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
       * @param {String} name 组件名称
       * @param {Array} fixed 一直会存在的类名
       * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
       * @returns {Array|string}
       */
      bem() {
        return function(name, fixed, change) {
          const prefix = `u-${name}--`;
          const classes = {};
          if (fixed) {
            fixed.map((item) => {
              classes[prefix + this[item]] = true;
            });
          }
          if (change) {
            change.map((item) => {
              this[item] ? classes[prefix + item] = this[item] : delete classes[prefix + item];
            });
          }
          return Object.keys(classes);
        };
      }
    },
    methods: {
      // 跳转某一个页面
      openPage(urlKey = "url") {
        const url2 = this[urlKey];
        if (url2) {
          uni[this.linkType]({
            url: url2
          });
        }
      },
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = {};
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent.children) {
          this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
        }
        if (this.parent && this.parentData) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && typeof e.stopPropagation === "function" && e.stopPropagation();
      },
      // 空操作
      noop(e) {
        this.preventEvent(e);
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
    return IMAGE_REGEXP.test(newValue);
  }
  function video(value) {
    const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
    return VIDEO_REGEXP.test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    image,
    video,
    func,
    promise
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params2) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params2, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params2);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params2 = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params2);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params2.intercept) {
        this.config.intercept = params2.intercept;
      }
      mergeConfig.params = params2;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type: type2,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      // 年
      "m+": (date2.getMonth() + 1).toString(),
      // 月
      "d+": date2.getDate().toString(),
      // 日
      "h+": date2.getHours().toString(),
      // 时
      "M+": date2.getMinutes().toString(),
      // 分
      "s+": date2.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format2 = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format2 === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format2);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? 0 + "" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#19be6b",
    primaryDark: "#18b566",
    primaryDisabled: "#71d5a1",
    primaryLight: "#dbf1e1",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type2 = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type2) == -1)
      type2 = "success";
    let iconName = "";
    switch (type2) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  function addUnit(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  }
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(function() {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 1000090,
    noNetwork: 1000080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 1000075,
    mask: 1000070,
    navbar: 1000020,
    topTips: 1000015,
    sticky: 1000010,
    indexListSticky: 1000005
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/diy-uview-ui/index.js:13", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim,
    addStyle,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  function authPermission(permission) {
    const role = Session.getUser() && Session.getUser().role;
    if (role && role == "admin") {
      return true;
    }
    const all_permission = "*:*:*";
    const permissions = Session.getUser() && Session.getUser().permissions;
    if (permissions && permissions.length > 0) {
      return permissions.some((v) => {
        return all_permission === v || v === permission;
      });
    } else {
      return false;
    }
  }
  function authRole(role) {
    const super_admin = "admin";
    const roles = Session.getUser() && Session.getUser().roles;
    if (roles && roles.length > 0) {
      return roles.some((v) => {
        return super_admin === v || v === role;
      });
    } else {
      return false;
    }
  }
  const Auth = {
    // 验证用户是否具备某权限
    auth(permission) {
      return authPermission(permission);
    },
    // 验证用户是否含有指定权限，只需包含其中一个
    authOr(permissions) {
      return permissions.some((item) => {
        return authPermission(item);
      });
    },
    // 验证用户是否含有指定权限，必须全部拥有
    authAnd(permissions) {
      return permissions.every((item) => {
        return authPermission(item);
      });
    },
    // 验证用户是否具备某角色
    role(role) {
      return authRole(role);
    },
    // 验证用户是否含有指定角色，只需包含其中一个
    roleOr(roles) {
      return roles.some((item) => {
        return authRole(item);
      });
    },
    // 验证用户是否含有指定角色，必须全部拥有
    roleAnd(roles) {
      return roles.every((item) => {
        return authRole(item);
      });
    }
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.config.globalProperties.$tools = new Tools();
    app.config.globalProperties.$http = new Service();
    app.config.globalProperties.$session = Session;
    app.config.globalProperties.$auth = Auth;
    uni.getSystemInfo({
      success: function(e) {
        app.config.globalProperties.StatusBar = e.statusBarHeight;
        if (e.platform == "android") {
          app.config.globalProperties.CustomBar = e.statusBarHeight + 50;
        } else {
          app.config.globalProperties.CustomBar = e.statusBarHeight + 45;
        }
      }
    });
    app.mixin({
      methods: {
        setCurrentPage,
        Validate,
        setData,
        navigateTo,
        showModal,
        showToast,
        getPickerChildren,
        uploadImage,
        getOption,
        setAuthorize
      }
    });
    app.use(uView);
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
})(Vue, uni.VueShared);
