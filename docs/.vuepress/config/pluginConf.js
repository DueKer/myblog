
module.exports = {
    'vuepress-plugin-cursor-effects':{
        num: 30,  // 默认数量
        show: true, //  是否显示
        zIndex: 999999,   // 层级
        img: {
          replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: '/sakura.png'     // 绝对路径
        }     
    },
    'vuepress-plugin-sakura':
    {
      size: 4, // size of the particle, default: 2
      shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    },
  'vuepress-plugin-helper-live2d': {
      live2d: {
          // 是否启用(关闭请设置为false)(default: true)
          enable: true,
          // 模型名称(default: hibiki)>>>取值请参考：
          // https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
          model: 'shizuku',
          display: {
              position: "right", // 显示位置：left/right(default: 'right')
              width: 135, // 模型的长度(default: 135)
              height: 300, // 模型的高度(default: 300)
              hOffset: 65, //  水平偏移(default: 65)
              vOffset: 0, //  垂直偏移(default: 0)
          },
          mobile: {
              show: false // 是否在移动设备上显示(default: false)
          },
          react: {
              opacity: 0.8 // 模型透明度(default: 0.8)
          }
      }
  }
}