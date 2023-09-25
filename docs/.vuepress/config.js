const nav = require("./config/nav.js");
const sidebar = require("./config/sidebar.js");

const pluginConf = require("./config/pluginConf.js");
module.exports = {
  title: "Brooks的博客",
  base: "/myblog/",
  description: "个人博客网站，知识沉淀的一些记录",
  // theme: "reco",
  head: [["link", { rel: "icon", href: "/bg.png" }]],
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。

    "/zh/": {
      lang: "zh-CN",
      title: "Brooks",
    },
  },

  themeConfig: {
    logo: "/logo.png",
    // subSidebar: 'auto',
    repo: "vuepressjs/vuepress-plugin-blog",
    docsDir: "docs",
    editLinks: true,
    nav: nav,
    // //博客配置
    // blogConfig: {
    //   category: {
    //     location: 2, // 在导航栏菜单中所占的位置，默认2
    //     text: "博客", // 默认文案 “分类”
    //   },
    //   tag: {
    //     location: 4, // 在导航栏菜单中所占的位置，默认4
    //     text: "Tag", // 默认文案 “标签”
    //   },
    // },
    sidebar: sidebar,
  },
  smoothScroll: true,
  plugins: pluginConf, //插件配置
};
