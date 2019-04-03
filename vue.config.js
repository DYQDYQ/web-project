const path = require('path');
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/static/js/'
    : '/',

    outputDir: path.join(__dirname, '../src/static/js/newproject/'),
    // pages: {
    //     enter: './src/main',
    //     template: './src/template/index.ejs'
    // },
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
        proxy: {
            '/static':{
                target:'http://192.168.0.191:9000/'
            },
            '/api':{
                target: 'http://test.cocc.bimsheng.com',
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}