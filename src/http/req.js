/**
 * 统一全局请求
 */
import axios from 'axios'
import qs from 'qs'
import config from './config.js'


let hasErr = false
let tokenTimeout = false

const instance = axios.create(config)
const sortFunc = (a, b)=>{
	if(a[0] > b[0]){
		return 1
	}else if(a[0] < b[0]){
		return -1
	}
	return 0
}

instance.interceptors.request.use((_config) => {
	_config.data =_config.data || {}
  _config.data = qs.stringify(_config.data);
  return _config
}, function(error) {
    return Promise.reject(new Error('axios配置出错'))
})

instance.interceptors.response.use((response) => {
	const data = response.data
	if(data.code == '1005' && !tokenTimeout){
		// 登录过期仅需要拦截一次，直接调用 Native 重新授权
		tokenTimeout = true
	}
	return data
}, (err) => { // 状态码不为200	
	if (err && err.response) {
		switch (err.response.status) {
			case 400:
				err.message = '请求错误'
				break

			case 401:
				err.message = '未授权，请登录'
				break

			case 403:
				err.message = '拒绝访问'
				break

			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				break

			case 408:
				err.message = '请求超时'
				break

			case 500:
				err.message = '服务器内部错误'
				break

			case 501:
				err.message = '服务未实现'
				break

			case 502:
				err.message = '网关错误'
				break

			case 503:
				err.message = '服务不可用'
				break

			case 504:
				err.message = '网关超时'
				break

			case 505:
				err.message = 'HTTP版本不受支持'
				break

			default:
		}
	}
	// 确保一次只出现一条网络通信错误提示信息
	if(!hasErr){
		hasErr = true
	}
	
	return Promise.reject(err)
})
export default instance