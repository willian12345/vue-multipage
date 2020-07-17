import Vue from 'vue'
import '@/assets/js/main'
import 'vant/lib/index.less';
import '@assets/style/var-vant.less'
import '@assets/style/main.scss'

import app from './main.vue'

new Vue({
  el: '#app',
  template: '<app/>',
  components: { app }
})