# vue2.0 多页面脚手架
服务器安装 Nodejs 版本 v8.16.0 

服务器安装 yarn 版本1.17.3

## 项目初始化
```
yarn
```

### 本地开发环境运行
```
yarn serve
```

### 测试环境编译
```
yarn alpha
```

### 正式环境编译
```
yarn build
```

编译完成后 dist 目录内所有前端项目可部署文件

dist目录会生成相应的多个 html 文件




### 如何新增页面
######类似微信小程序增加新页面，增加页面后需要重启
项目
- pages目录下新建目录如如: test
- test 目录内增加 main.js 文件
```
  import Vue from 'vue'
  import '@/assets/style/main.scss';
  import app from './main.vue'
  
  new Vue({
    el: '#app',
    template: '<app/>',
    components: { app }
  })
```
- test 目录内增加 main.vue 文件，即为主要的 vue 入口文件
```
  <template>
    <div>hello test</div>
  </template>
  <script>
    export default {
      name: 'test',
      data () {
        return {

        }
      },
      created () {
        
      }
    }
  </script>
```
