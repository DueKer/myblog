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
    text: "框架原理篇",
    link: "/principle/ways/vue.md",
    
  },
  {
    text: "全栈相关的东西",
    link: "/middle/expressways/1.md",
   
  },
  {
    text: "手写相关篇",
    link: "/written/basic/代码手写.md",
  },
  {
    text: "性能优化相关",
    link: "/performance/basic/webpack.md",
    
  },
  {
    text: "每日一题",
    link: "/daytopic/topic/everyday.md",
   
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
    text: "相关文档超链接",
    link:"/xglink/link.md"
  },
];
