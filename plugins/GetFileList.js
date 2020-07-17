// 插件代码
class MyWebpackPlugin {
  constructor(options) {}
  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, callback) => {
        const manifest = {};
        // for (const name of Object.keys(compilation.assets)) {
        //     manifest[name] = compilation.assets[name].size();
        //     // 将生成文件的文件名和大小写入manifest对象
        // }
        // compilation.assets['manifest.json'] = {
        //     source() {
        //         return JSON.stringify(manifest);
        //     },
        //     size() {
        //         return this.source().length;
        //     }
        // };
        callback();
    });
  }
}

module.exports = MyWebpackPlugin;