import Vue from 'vue'
import '@/assets/js/main'
import '@/assets/style/main.scss'

import app from './main.vue'

new Vue({
  el: '#app',
  template: '<app/>',
  components: { app }
})