/**
 * JS 与 Native(IOS/Android) 桥接
 */
import { uniqueId, isFunction } from 'lodash-es'
import globalConfig from '@assets/js/config'

const platform = globalConfig.platform
let token = platform.token


const EVENT = {
  ON_SHOW: 'onShow',
  ON_HIDE: 'onHide',
}

/**
 *  ios js bridge
 *  https://github.com/marcuswestin/WebViewJavascriptBridge
 *  WebViewJavascriptBridge 会被 Native 自动注入
 */
function setupWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
	if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
	window.WVJBCallbacks = [callback];
	var WVJBIframe = document.createElement('iframe');
	WVJBIframe.style.display = 'none';
	WVJBIframe.src = 'https://__bridge_loaded__';
	document.documentElement.appendChild(WVJBIframe);
	setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}



class JSBridge{
  /**
   * cbs 有 callbackId 对象结构
   * cbs = {
      name: {id1: function, id2: function}
    }
   */
  cbs = {}
  /**
   * spcbs pub/sub callback 对象结构
   * spcbs = {
      name: [function1, function2]
    }
   */
  spcbs = {}
  // 是否已拥有 token
  isReady =  false
  EVENT = EVENT
  bridge = null
  constructor(){
    const self = this
    
    /**
     * 通过判断平台不同，添加 Native 互调方法
     * 统一接口
     * call 调用 Native
     * addListener 被 Native 调
     */

    // Android 初始化回调
    function initAndroid(bridge){
      /**
       * Android 获取 bridge 对象
       * 侦听方法: bridge.registerHandler
       * 调用方法: bridge.callHandler
       */
      self.bridge = bridge
      bridge.init(function(message, responseCallback) {
          console.log('JS got a message', message);
          if (responseCallback) {
            console.log('JS responding with', data);
            responseCallback(data);
          }
      });

      self.addListener = function (name, cb){
        console.log('registerHandler', name)
        bridge.registerHandler(name, function(data, responseCallback) {
            console.log("data from Java: = " + data);
            var responseData = "Javascript Says Right back aka!";
            cb(data)
            responseCallback(responseData);
        });
      }

      self.call = function(name, params, cb){
        bridge.callHandler(
          name
          , params
          , function(responseData) {
            console.log("send get responseData from java, data = " + responseData)
            cb(responseData)
          }
        );
      }
      
      self._pub('bridgeReady')
    }

    // IOS 初始化回调
    function initIOS(){
      /**
       * ios 获取 bridge 对象
       * 侦听方法: bridge.registerHandler
       * 调用方法: bridge.callHandler
       */
      setupWebViewJavascriptBridge(function(bridge) {
        self.bridge = bridge
        
        self.addListener = function (name, cb){
          console.log('registerHandler---start:', name)
          bridge.registerHandler(name, function(data, responseCallback) {
            console.log('ObjC called testJavascriptHandler with', data)
            cb(data)
          })
          console.log('registerHandler---end')
        }
        self.call = function(name, params, cb){
          console.log('callHandler---start:', name)
          bridge.callHandler(name, params, function responseCallback(responseData) {
            cb(responseData)
            console.log("JS received response:", responseData)
          })
          console.log('callHandler---end')
        }
        self._pub('bridgeReady')
      })
    }
    // console.log(navigator.userAgent)
    // console.log(globalConfig.platform)
    // 判断不同平台
    if(globalConfig.platform.isAndroid){
      /**
       * Android 平台 jsBridge
       * https://github.com/marcuswestin/WebViewJavascriptBridge
       * WebViewJavascriptBridge 会被 Native 自动注入
       */
      if (window.WebViewJavascriptBridge) {
          initAndroid(window.WebViewJavascriptBridge)
      } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function() {
              initAndroid(window.WebViewJavascriptBridge)
            },
            false
        );
      }
    }else if(globalConfig.platform.isIOS){
      initIOS()
    }

    // 在window对象上注册 LINGAN_TECH_WEB 方法供 Native 调用
    // window.LINGAN_TECH_WEB = function (name, data, cbId) {
    //   // 有回调 id 的则是普通接口调用
    //   if(cbId && self.cbs[name] && self.cbs[name][cbId]){
    //     self.cbs[name][cbId].call(this, data)
    //     // self.cbs[name][cbId] = null
    //   } else { 
    //     // 没有 cbId 则是系统消息，需要sub/pub
    //     self._pub(name, data)
    //   }
    // }
  }
  _pub(name, data){
    if(Array.isArray(this.spcbs[name])){
      this.spcbs[name].forEach(cb => {
        // console.log(cb, data)
        cb(data)
      });
    }
  }
  _sub(name, cb){
    if(!isFunction(cb)){
      return 
    }
    if(!this.spcbs[name]){
      this.spcbs[name] = []
    }
    this.spcbs[name].push(cb)
  }
  _unsub(name){
    this.spcbs[name] = null
  }
  _getSchemaURL(name, params, cbId){
    var k,paramStr = '',
    url = 'lingantech://' + name,
    flag = '?';
    if( cbId ){
        flag = '&';
        url += '?callback_id=' + cbId
    }
    if ( typeof params == 'object' && params != null){
      paramStr = JSON.stringify(params)
      url = url + flag +  'params=' + encodeURIComponent(paramStr);
    }
    // console.log(url)
    // console.log(JSON.parse(getQueryString(url).params))
    // lingantech://?callback_id=cbId
    return url;
  }
  // _callNative(name, params, cbId){
  //   let ifr = document.createElement('iframe')
    
  //   if(!params){
  //     params = {}
  //   }

  //   if(!cbId){
  //     cbId = ''
  //   }

  //   // 调用 Native 
  //   params = JSON.stringify(params)
  //   console.log('调用Native方法名: ' + name + ' | 参数: ' +  params + ' | callbackID: ' + cbId)

  //   if(window.LINGAN_TECH_NATIVE){
  //     window.LINGAN_TECH_NATIVE(name, params, cbId)
  //   }else{
  //     console.log('LINGAN_TECH_NATIVE 未正确注入')
  //   }

  //   if(cbId){
  //     ifr.id = cbId
  //   }
  //   ifr.src = this._getSchemaURL(name, params, cbId)
  //   ifr.onload = function() {
  //     ifr.remove()
  //   }
  //   document.body.appendChild(ifr)
  // }
  // call(name, params, cb){
  //   const cbId = uniqueId()
  //   if(isFunction(cb)){
  //     if(!this.cbs[name]){
  //       this.cbs[name] = {}
  //     }
  //     this.cbs[name][cbId] = cb
  //   }
  //   this._callNative(name, params, cbId)
  // }
  // addListener(name, cb){
  //   console.log(EVENT[name], name)
  //   if(!EVENT[name]){
  //     return
  //   }
  //   this.call(name)
  //   if(isFunction(cb)){
  //     this._sub(name, cb)
  //   }
  // }
  getToken(){
    if(!token){
      token = localStorage.getItem(globalConfig.APP_PREFIX + 'token')
    }
    return token
  }
  refreshToken(){
    console.log('登录过期')
    // 重新授权登录
  }
  // 为防bridge对象非同步注入，可在ready内执行bridge类型的操作
  ready(cb){
    if(this.bridge){
      cb()
    }else{
      this._sub('bridgeReady', cb)
    }
  }
  nav(url){
    location.href = url
  }
}
const Bridge = new JSBridge()
export default Bridge