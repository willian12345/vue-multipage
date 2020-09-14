import Vue from 'vue'
import '@/assets/style/main.scss';
import app from './main.vue'
// 忽略自定义元素标签抛出的报错
Vue.config.ignoredElements = [ 
  'wx-open-launch-app', 
];
new Vue({
  el: '#app',
  template: '<app/>',
  components: { app }
})