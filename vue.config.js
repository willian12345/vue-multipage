const path = require('path');//引入path模块
const fs = require('fs');//引入path模块
const webpack = require("webpack");
const sass = require('node-sass');

const GetFileList = require('./plugins/GetFileList')

function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}


const pagesPath = resolve('./src/pages/')
const pages = fs.readdirSync(pagesPath)
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
          // 要去掉非app内运行的网页 common.xxx.js 公共文件可以在此修改
          // chunks: ['chunk-vendors', dirname], 
          ...pageJson
        }
        pageNum++
      }
    })
}

module.exports = {
  chainWebpack:(config)=>{
    config.resolve.alias
    .set('@',resolve('./src'))
    .set('@components',resolve('./src/components'))
    .set('@assets', resolve('./src/assets'))
    .set('@style',resolve('./src/assets/style'))
    .set('@img',resolve('./src/assets/img'))
    .set('@js', resolve('./src/assets/js'))
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
      new GetFileList()
    ]
  },
  lintOnSave: false,
  runtimeCompiler: true,
  pages: multiPages,
  css: {
    loaderOptions: {
      // 给 less-loader 传递 Less.js 相关选项
      less:{
        modifyVars: {
          // var-vant文件可重置vant默认样式
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          // 必须在文件中引入全部样式 import 'vant/lib/index.less'; 才能起作用
          'hack': `true; @import "${resolve('./src/assets/style/var-vant.less')}";`
        }
      },
      // @/ 是 src/ 的别名, 引入 vars.scss 变量文件，全局都可以使用不用单独再引入
      sass: {
        data: `@import "~@assets/style/vars.scss";`
      }
    }
  }
}