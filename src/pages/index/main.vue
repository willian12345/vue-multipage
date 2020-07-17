<template>
  <div class="page">
    <h2>首页</h2>
    <div class="page-list">
      <a href="page1.html" class="link">第一页</a>
      <a href="page2.html" class="link">第二页</a>  
    </div>
  </div>
</template>
<script>
import { storeGet, storeSet, mul } from '@assets/js/utils'
import globalConfig from '@assets/js/config.js'
import { wxRedirect } from '@assets/js/weixin/weixin'
import Vue from 'vue';
import { Dialog } from 'vant'

import { get as LodashGet } from 'lodash-es'



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
  .page-list{
    padding: $gutter-basic;
  }
  .link{
    display: block;
    padding: $gutter-basic;
    color: #333; 
    &:hover{
      color: $color-primary;
    }
  }
  
</style>