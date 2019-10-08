module.exports = {
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录(js,css,img,fonts)
  lintOnSave: false, // 是否开启eslint保存检测, 有效值: true || false || 'error'
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false
    // proxy: {
    //   // 配置跨域
    //   // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    //   '/api': {
    //     // target: 'http//localhost:3000/',
    //     target: 'http//localhost:3000/',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  }
}
