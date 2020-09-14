/* eslint-disable */
import globalConfig from './config'

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

// 日期格式化
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

// 主动复制
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

// 是否满足小数点len长度
export let isFixedToLength = function (v, len) {
    let arr = (v+'').split('.')
    if(arr[1] && arr[1].length > len){
      return false 
    }
    return true
}

// 毫秒数转 天-小-时-分-秒
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