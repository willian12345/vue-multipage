/* eslint-disable */
import globalConfig from './config'
import ValidatorClass from './ValidatorClass'

// 解析地址栏参数
export let getQueryString =  function (url){
    if(url) {
        url=url.substr(url.indexOf("?")+1);
    }
    var result = {}, queryString =url || location.search.substring(1),
       re = /([^&=]+)=([^&]*)/g, m;
  
    while (m = re.exec(queryString)) {
     result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
   }
  
   return result;
}
// 防抖
export let debounce = function(f, wait){
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
        f(...args)
        }, wait)
    }
}
// 节流
export let throttle = function(fn, delay, mustRunDelay){
    var timer = null;
    var t_start;
    return function(){
        var context = this, args = arguments, t_curr = +new Date();
        clearTimeout(timer);
        if(!t_start){
            t_start = t_curr;
        }
        if(t_curr - t_start >= mustRunDelay){
            fn.apply(context, args);
            t_start = t_curr;
        }
        else {
            timer = setTimeout(function(){
                fn.apply(context, args);
            }, delay);
        }
    }
}
// 日期格式化
// 
export let dateFormat = function(date, format){
    var d = new Date(date);
    var o = {
        "M+" :  d.getMonth()+1,  //month
        "d+" :  d.getDate(),     //day
        "h+" :  d.getHours(),    //hour
          "m+" :  d.getMinutes(),  //minute
          "s+" :  d.getSeconds(), //second
          "q+" :  Math.floor((d.getMonth()+3)/3),
          "S"  :  d.getMilliseconds() //millisecond
    };
    if(/(Y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}
// localstorage 获取
export let storeGet = function(key, isStr){
    key = globalConfig.APP_PREFIX + key;
    var obj, objStr = window.localStorage.getItem(key);
    if(isStr){
        return objStr;
    }
    if(objStr){
        try{
            obj = JSON.parse(objStr); 
        }catch(e){
            console.log('解析string 为 json 出错: storeGet');
            return objStr;
        }
        return obj;
    }
    return null;
}

// localstorage 存储 
export let storeSet = function(key, value){
    key = globalConfig.APP_PREFIX + key;
    if(typeof value != 'string'){
        value = JSON.stringify(value);
    }
    try{
        window.localStorage.setItem(key, value);
    }catch(e){
        console.log('localStorage set: '+ key + 'fail', e);
    }
}

export let toast = function(msg, t){
    console.log(111);
}

// 取多少位小数
export let roundNumber = function (number, decimals, noFixed) {  
    let n = number+''
    let nArr = n.split('.')
    if(nArr[1]){
        return nArr[0]+'.'+ (nArr[1]).substr(0, decimals)
    }else{
        // 是否要填充0以满足小数位置
        if(!noFixed){
            return nArr[0]+'.'+new Array(decimals+1).join('0')    
        }else{
            return nArr[0]
        }
    }
}

export let copyToClipboard = function (copy_str){
    //创建一个textarea节点
    let textarea = document.createElement('textarea');
    //为textarea节点添加style属性
    textarea.setAttribute('style','position:fixed;top:0;left:0;opacity:0;z-index:-10;');
    //把要复制的文本添加到textarea节点中
    let text=document.createTextNode(copy_str);
    textarea.appendChild(text);
    //把textarea节点添加到body节点中
    document.body.appendChild(textarea);
    //选中textarea节点的文本内容
    textarea.select();
    console.log('exec copy')
    //执行复制命令
    if(document.execCommand('copy')){
        console.log('复制成功');
    }else{
        console.log('复制失败');
    }
    //复制完成后从body节点删除textarea节点
    document.body.removeChild(textarea);
}

export let formatSeconds = function (value) {
    var theTime = parseInt(value);// 秒
    var theTime1 = 0;// 分
    var theTime2 = 0;// 小时
    var theTime3 = 0;// 天
    // alert(theTime);
    if(theTime > 60) {
        theTime1 = parseInt(theTime/60);
        theTime = parseInt(theTime%60);
        // alert(theTime1+"-"+theTime);
        if(theTime1 > 60) {
            theTime2 = parseInt(theTime1/60);
            theTime1 = parseInt(theTime1%60);
            if(theTime2 > 24){
                theTime3 = parseInt(theTime2/24);
                theTime2 = parseInt(theTime2%24);
            }
        }
    }
    var result = ""+parseInt(theTime)+"秒";
    if(theTime1 > 0) {
        result = ""+parseInt(theTime1)+"分"+result;
    }
    if(theTime2 > 0) {
        result = ""+parseInt(theTime2)+"小时"+result;
    }
    if(theTime3 > 0){
        result = theTime3+ "天"+result;   
    }
    return result;
}

// 是否满足小数点len长度
export let isFixedToLength = function (v, len) {
    let arr = (v+'').split('.')
    if(arr[1] && arr[1].length > len){
      return false 
    }
    return true
}

export let add = function (a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
export let sub = function(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
export let mul = function (a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
export let div = function (a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

export let varType = function (n) {
    var typeStr = Object.prototype.toString.call(n);
    var typeName = '';
    switch (typeStr){
        case '[object String]':
            typeName = 'string';
            break;
        case '[object Number]':
            typeName = 'number';
            break;
        case '[object Boolean]':
            typeName = 'boolean';
            break;
        case '[object Undefined]':
            typeName = 'undefined';
            break;

        case '[object Object]':
            typeName = 'object';
            break;
        case '[object Array]':
            typeName = 'array';
            break;
        case '[object Null]':
            typeName = 'null';
            break;
        case '[object RegExp]':
            typeName = 'RegExp';
            break;

        case '[object Symbol]':
            typeName = 'symbol';
            break;
        case '[object JSON]':
            typeName = 'json';
            break;
        case '[object Math]':
            typeName = 'math';
            break;

        default:
            typeName = 'object';
    }

    return typeName;
}

// 表单验证规则
export let Validator = {
    create: (vArr) => {
        return new ValidatorClass(vArr)
    }
}

export let formatDuring =  function (mss) {
    let str = ''
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (mss % (1000 * 60)) / 1000;
    if(days){
        str += days + '天'
    }
    if(hours){
        str += hours + " 小时 "
    }
    if(minutes){
        str += minutes + " 分钟 "
    }
    if(seconds){
        str += seconds + " 秒 "
    }
    return str
}