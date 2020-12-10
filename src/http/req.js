/**
 * 统一全局请求
 */
import axios from 'axios'
import qs from 'qs'
import config from './config.js'

const instance = axios.create(config)

instance.interceptors.request.use((_config) => {
	// 此处可根据业务需求封装发送至服务器时的数据
	_config.data =_config.data || {}
  _config.data = qs.stringify(_config.data);
  return _config
}, function(error) {
    return Promise.reject(new Error('axios配置出错'))
})

instance.interceptors.response.use((response) => {
	// 此处可根据业务需求过滤服务端返回的数据
	const data = response.data
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

	return Promise.reject(err)
})
export default instance