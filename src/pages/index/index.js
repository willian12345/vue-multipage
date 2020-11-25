import globalConfig from '@/assets/js/config.js'
import { formatDuring } from '@/assets/js/utils'
import { wxRedirect } from '@/assets/js/weixin/weixin'

import { divide, get as LodashGet } from 'lodash-es'
import Big from 'big.js'



export default {
  data() {
    return {
      loading: false,
      list: [],
      show: false,
      test: ''
    }
  },
  methods: {
    
  },
  mounted () {
    var x = new Big(0.3)
    let a = x.minus(0.1)
    console.log(a)
  },
}