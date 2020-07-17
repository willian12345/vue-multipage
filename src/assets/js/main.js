import Vue from 'vue'
Vue.config.productionTip = false

// 引入单个组件样式
// import 'vant/lib/button/style/less';

// import '@assets/style/main.scss'

// 需要在全局引入 https://unpkg.com/axios/dist/axios.min.js
import axios from '@/http/index.js'
Vue.use(axios)

import { getQueryString } from '@assets/js/utils'
Vue.prototype.$getQueryString = getQueryString

// 全局注入 部分 vant 组件
import { Loading, Button, Overlay, Toast, Image as VanImage } from 'vant'
Vue.use(Loading)
Vue.use(Button)
Vue.use(Overlay)
Vue.use(VanImage);

Vue.prototype.$toast = Toast

// 全局注入dudu-link，用于拦截跳转
import DuduLink  from '@/components/DuduLink';
Vue.component('dudu-link', DuduLink)


import { dateFormat } from '@assets/js/utils'
// filter 注入
Vue.filter ("dateFormat", ( d, f ) => {
  if(!d){
    return ''
  }
  if( !f ){
    return dateFormat( d, 'YYYY-MM-dd hh:mm' )
  }else{
    return dateFormat( d, f )
  }
})


// 暗黑模式
// if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
//   // dark mode do something
// }

