import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '@/utils/auth'

// request interceptor
axios.interceptors.request.use(function(config) {
    var token = getToken();
    if (token) {
        config.headers.Authorization = 'bearer ' + token; // 设置请求头
    }
    return config;
}, function(err) {
    return Promise.reject(err);
})

// respone interceptor
axios.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error) // for debug
            // token 过期
        if (error.response.status === 401) {
            Message({
                message: "Token过期，正在跳转往登录页面...",
                type: 'error',
                duration: 1500
            });
            removeToken();
            setTimeout(function() {
                window.location.href = '/#/login';
            }, 1500);
        } else {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            });
        }
        return Promise.reject(error)
    })

export default axios