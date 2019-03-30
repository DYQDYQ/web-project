module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',

    outputDir: 'dist',
    assetsDir: 'static',
    pages: {
        enter: './src/main',
        template: './src/template/index.ejs'
    },
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
          less: {
            javascriptEnabled: true
          }
        }
    },
    devServer:{
        open: true,
        host: '0.0.0.0',
        // proxy: {
            
        // }
    }
}