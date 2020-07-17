/**
 * 全局变量配置
 */

// request 请求地址
let baseURL = ''
// 文件地址
let baseFileURL = ''
// 网页域名
let basePageURL = ''
// request 加密参数
let secretKey = ''
// 编译环境变量
const appEvn = process.env.VUE_APP_TITLE

// localStorage 存储前缀
const APP_PREFIX = `Duduapp_${appEvn}_`

// 微信公众号 appid
const WEIXIN_MP_APP_ID = 'xxxx'

// 微信开放标签唤起嘟嘟 app ,此 appid 为微信公众号内填写的嘟嘟 appid
const WEIXIN_APP_ID = 'xxxx'

const YING_YONG_BAO = 'https://a.app.qq.com/o/simple.jsp?pkgname=ai.waychat.yogo'

switch (appEvn) {
  case 'serve':
    baseURL = 'http://192.168.6.161:7003/yogoapi/'  //这里是本地的请求url
    // baseURL = 'http://192.168.61.172:7003/yogoapi/'  //这里是本地的请求url
    baseFileURL = 'https://yogo-file-test.oss-cn-hangzhou.aliyuncs.com/img/'
    basePageURL = 'http://192.168.63.120:8080'
    secretKey = 'abc'
    break
  case 'alpha': case 'debug': 
    baseURL = 'https://tool.rutty.top/api/yogoapi/'  //这里是测试环境中的url
    baseFileURL = 'https://yogo-file-test.oss-cn-hangzhou.aliyuncs.com/img/'
    basePageURL = 'https://tool.rutty.top'
    secretKey = 'abc'
    break
  case 'production':
    baseURL = 'https://yogo-api.omwchat.com/yogoapi/'   //生产环境url
    baseFileURL = 'https://yogo-file.oss-cn-hangzhou.aliyuncs.com/prod/img/'
    basePageURL = 'https://h5.omwchat.com'
    secretKey = 'abc'
    break
}


let userAgent = window.navigator.userAgent
// let userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_2 like Mac OS X) AppleWebKit/603.2.4 (KHTML, like Gecko) Mobile/14F89 DuduApp/1.6.2 Token/25F3DCA058EF484F82AF31A750EDD019'

function getPlatform(ua){
  const os = {}
  // 如果userAgent中拿到oauth即初始化完成
  let token = ua.match(/Token\/([^\s]*)/i)
  if(token && token[1]){
    os.token = token[1]
  }

  ua = ua.toLowerCase();
  if(ua.indexOf('android') > -1){
      os.isAndroid = true;
  }else if(ua.search(/iphone|ipad|ipod/) > -1){//(mac os x)|(applewebkit)
      os.isIOS = true;
  }else{
    os.isPC = true;
  }
  if(ua.match(/MicroMessenger/i)=="micromessenger"){
    os.isWeixin = true;
  }
  return os
}

const platform = getPlatform(userAgent)

export default {
  baseURL,
  basePageURL,
  baseFileURL,
  secretKey,
  APP_PREFIX,
  userAgent,
  platform,
  WEIXIN_APP_ID,
  WEIXIN_MP_APP_ID,
  YING_YONG_BAO
}
