import axios from './req.js'

const install = Vue => {
    if (install.installed){
        return;
    }
    install.installed = true;
    Object.defineProperties(Vue.prototype, {
        // 此处挂载在 Vue 原型的 $axios 对象上
        $axios: {
            get() {
                return axios
            }
        }
    })
}

export default install