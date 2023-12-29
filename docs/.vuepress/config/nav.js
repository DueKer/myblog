const navConfig = require("./navConfig.js"); //工具
const file = require("./file.js"); // 文档
const more = require("./more.js"); // 更多

module.exports = [
  // { text: "首页", link: "/" },
  {
    text: "基础篇",
    link: "/handbook/basic/1.md",
    // items: [
    //   { text: "html", link: "/handbook/basic/1.md" },
    //   { text: "css", link: "/handbook/basic/2.md" },
    // ],
  },
  {
    text: "进阶篇",
    link: "/middle/expressways/1.md",
    // items: [
    //   { text: "js基础", link: "/handbook/advanced/1.md" },
    //   { text: "js进阶", link: "/handbook/advanced/2.md" },
    // ],
  },
  {
    text: "框架原理篇",
    link: "/principle/ways/vue.md",
    // items: [
    //   { text: "手写篇", link: "/principle/ways/手写篇.md" },
    //   { text: "vue相关", link: "/principle/ways/vue.md" },
    //   { text: "react相关", link: "/principle/ways/react.md" },
    // ],
  },
  {
    text: "手写相关篇",
    link: "/written/basic/1.md",
  },
  {
    text: "性能优化相关",
    link: "/performance/basic/1.md",
    // items: [
    //   { text: "手写篇", link: "/principle/ways/手写篇.md" },
    //   { text: "vue相关", link: "/principle/ways/2.md" },
    // ],
  },
  {
    text: "每日一题",
    link: "/daytopic/topic/1.md",
    // items: [
    //   { text: "算法题", link: "/daytopic/topic/1.md" },
    //   { text: "手写题", link: "/daytopic/1.md" },
    // ],
  },
  {
    text: "更多",
    items: more,
  },
  {
    text: "文档",
    items: file,
  },
  {
    text: "工具",
    items: navConfig,
  },
  {
    text: "随笔笔记",
    items: [
      { text: "Github", link: "https://github.com/DueKer" },
      { text: "掘金", link: "https://juejin.cn/user/2119514148582727" },
    ],
  },
  {
    text: "相关链接",
    items: [
      { text: "Github", link: "https://github.com/DueKer" },
      { text: "掘金", link: "https://juejin.cn/user/2119514148582727" },
    ],
  },
];
