import config from '@/assets/js/config'
export default {
    method: 'post',
    // 基础url前缀
    baseURL: config.baseURL,
    // 请求头信息,如果在这里设置过请求头，调式时就无法跨域请求会变成OPTIONS
    // headers: {
    //   'Content-Type':'application/json;charset=UTF-8'
    // },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 6000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}