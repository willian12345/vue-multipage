const path = require('path');//引入path模块
const fs = require('fs');//引入path模块
const webpack = require("webpack");

function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}


const pagesPath = resolve('./src/pages/')
const pages = fs.readdirSync(pagesPath)
/**
 * 
 * multiPages 对象最终会在每一页的 htmlWebpackPlugin.options 内读取到以下webpack自带数据， 或 在此自定义的数据
  {
    "template": "/Users/xiaodongwang/Documents/vue-multipage/node_modules/html-webpack-plugin/lib/loader.js!/Users/xiaodongwang/Documents/vue-multipage/public/index.html",
    "filename": "index.html",
    "hash": false,
    "inject": true,
    "compile": true,
    "favicon": false,
    "minify": false,
    "cache": true,
    "showErrors": true,
    "chunks": [
    "chunk-vendors",
    "chunk-common",
    "index"
    ],
    "excludeChunks": [],
    "chunksSortMode": "auto",
    "meta": {},
    "title": "嘟嘟多页应用demo",
    "xhtml": false
  }
 */
let multiPages = Object.create({})
let pageNum = 0
if(Array.isArray(pages)){
    pages.forEach(( dirname ) => {
      const stats = fs.statSync(pagesPath + dirname)
      if(stats.isDirectory()){
        // 如果自身带模板则用自己文件夹内的index.html
        // 如果没有则用公用public文件夹下的index.html
        let templateFile = pagesPath + `/${dirname}/index.html`
        const isExcist = fs.existsSync(templateFile)
        if(!isExcist){
          templateFile = `public/${dirname}.html`
        }
        
        // 页面特殊属性可在 page.json 内单独配置
        const jsonFile = pagesPath + `/${dirname}/page.json`
        const jsonFileExcist = fs.existsSync(jsonFile)
        let pageJson = {}
        if(jsonFileExcist){
          pageJson = require(jsonFile)
        }
        
        // 创建多页对象
        multiPages[dirname] = {
          entry: `src/pages/${dirname}/main.js`, // js 入口
          template: templateFile,
          filename: `${dirname}.html`,
          ...pageJson
        }
        pageNum++
      }
    })
}

module.exports = {
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@/',resolve('src/*'))
    // 多页配置 公共资源提取，
    // vendors提取的是第三方公共库(满足提取规则的node_modules里面的且页面引入的)，这些文件会打到dist/js/chunk-vendors.js里面
    // 提取规则是每个页面都引入的才会打到chunk-vendors.js里面(如vue.js)
    // 控制条件是minChunks字段，所以该字段的值是当前activity/src/projects里面的html的个数
    // common提取的应该是除了vendors提取后，剩余的满足条件的公共静态模块
    // 我们的项目不需要common，所以将common置为{}，覆盖默认common配置
    config.optimization.splitChunks({
      cacheGroups: {
          vendors: {
              name: 'chunk-vendors',
              minChunks: pageNum,
              test: /node_modules/,
              priority: -10,
              chunks: 'initial'
          },
          common: {}
      }
    });
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        axios: 'axios',
        'windows.axios': 'axios',
      }),
    ]
  },
  lintOnSave: false,
  runtimeCompiler: true,
  pages: multiPages,
  css: {
    loaderOptions: {
      // @/ 是 src/ 的别名, 引入 vars.scss 变量文件，全局都可以使用不用单独再引入
      sass: {
        data: `@import "~@/assets/style/vars.scss";`
      }
    }
  }
}