<template>
  <div class="page">
    <h1>page2 第一页</h1>
  </div>
</template>
<script>
import { storeGet, storeSet, mul } from '@assets/js/utils'
import globalConfig from '@assets/js/config.js'
import { wxRedirect } from '@assets/js/weixin/weixin'

import { get as LodashGet } from 'lodash-es'

let intervalTimer




export default {
  data() {
    return {
      loading: false,
      list: [],
      show: false,
    }
  },
  methods: {
    
  },
  mounted () {
    let winWidth = window.screen.width
  },
}
</script>
<style lang="scss">
  @import '~@style/vars.scss';
  
</style>