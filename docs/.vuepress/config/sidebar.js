const { getChildren } = require("vuepress-sidebar-atuo");

module.exports = {
  "/handbook/": [
    {
      title: "基础篇",
      collapsable: true,
      sidebarDepth: 3,
      children: getChildren("./docs/handbook/basic/"),
    },
  ],
  "/middle/": [
    {
      title: "进阶篇",
      collapsable: true,
      sidebarDepth: 3,
      children: getChildren("./docs/middle/expressways/"),
    },
  ],
  "/principle/": [
    {
      title: "框架原理篇",
      collapsable: true,
      sidebarDepth: 3,
      children: getChildren("./docs/principle/ways/"),
    },
  ],
  "/written/": [
    {
      title: "笔试题和手写题篇",
      collapsable: true,
      sidebarDepth: 3,
      children: getChildren("./docs/written/basic/"),
    },
  ],
  "/performance/": [
    {
      title: "性能优化相关",
      collapsable: true,
      sidebarDepth: 3,
      children: getChildren("./docs/performance/basic/"),
    },
  ],
  "/daytopic/": [
    {
      title: "每日一题",
      collapsable: true,
      sidebarDepth: 3,
      children: getChildren("./docs/daytopic/topic/"),
    },
  ],
};
