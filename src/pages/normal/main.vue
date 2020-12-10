<template>
  <div class="page">
    <h1>普通页</h1>
    <h4>请求数据可使用 this.$axios.post</h4>
  </div>
</template>
<script>
import globalConfig from '@/assets/js/config'
import { getQueryString } from '@/assets/js/utils.js'
import { wxGetSign, wxSetShare } from '@/assets/js/weixin/weixin'
import Big from 'big.js'

export default {
  data() {
    return {
        
    }
  },
  methods: {
    
  },
  created(){
    
  },
  mounted () {
    var x = new Big(0.3)
    let a = x.minus(0.1)
    console.log(a)
    console.log(this.$axios.post)
  }
}
</script>
<style lang="scss">
  h4{
    padding-top: 20px;
  }
</style>
