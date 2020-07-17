import axios from '@/http/req.js'
import globalConfig from '@/assets/js/config'
// 微信签名服务成功返回的数据
let signed = null

// 微信注入 sdk ready 函数
export let onBridgeReady = function(cb) {
    if (typeof WeixinJSBridge == "undefined"){
        if( document.addEventListener ){
            document.addEventListener('WeixinJSBridgeReady', cb, false);
        }else if (document.attachEvent){
            document.attachEvent('WeixinJSBridgeReady', cb); 
            document.attachEvent('onWeixinJSBridgeReady', cb);
        }
    }else{
        cb();
    }
}
export let getWeixinVersion = function(){
    let wechat = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
    if(wechat && wechat[1]){
        return wechat[1]
    }
    return null
}
export let wxQuit = function(){
    WeixinJSBridge.call('closeWindow');
}
// 微信 v2 公众号支付方式
export let wxPay = function (params){
    const promise = new Promise( (resolve, reject) => {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": params.appId,     //公众号名称，由商户传入     
                "timeStamp": params.timeStamp,         //时间戳，自1970年以来的秒数     
                "nonceStr": params.nonceStr, //随机串     
                "package":  params.package, // "prepay_id=u802345jgfjsdfgsdg888",     
                "signType": "MD5",         //微信签名方式：     
                "paySign": params.paySign //微信签名 
            },
            function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 支付操作结束, 服务端还需要确认是否支付成功
                resolve(res)
            }else{
                reject(res)
            }
        }); 
    })
    
    return promise
}

// 获取微信签名并认证
export const wxGetSign = async function(){
    if(!signed){
        const resp = await axios.post('wxgzh/share', {
            url: location.href.split('#')[0]
        })
        if(resp.code === '0' && resp.data){
            wx.config({
                appId: resp.data.appid,
                // debug: true,
                timestamp: resp.data.timestamp,
                nonceStr: resp.data.noncestr,
                signature: resp.data.signature,
                jsApiList: [
                    'onMenuShareTimeline', //分享给好友
                    'onMenuShareAppMessage', //分享到朋友圈
                    'showMenuItems',
                    'hideMenuItems'
                ],
                openTagList: ['wx-open-launch-app']
            });
        }
        // 保存结果下次调用时直接返回结果不请求服务器
        signed = resp
    }
    
    return signed
}

export const wxSetShare = async function(title, desc, link, imgUrl) {
    const resp = await wxGetSign()
    console.log(resp)
    if(resp.code === '0' && resp.data){
        wx.ready(function(){
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                desc: desc, //分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc, // 分享描述
                link: link, // 分享链接
                imgUrl: imgUrl // 分享图标
            });
        });
    }
}

// 跳转微信授权
export const wxRedirect = function(callbackUrl) {
    if(!callbackUrl){
        alert('必须要给微信授权后的回调网址')
    }
    callbackUrl = encodeURIComponent(callbackUrl)
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${globalConfig.WEIXIN_MP_APP_ID}&redirect_uri=${callbackUrl}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    if(globalConfig.platform.isWeixin){
        window.location.href = url
    }
}