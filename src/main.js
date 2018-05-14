import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "font-awesome/css/font-awesome.css";

import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "@/styles/index.scss"; // global css
import "./assets/css/iconfont/iconfont.css";
import "./assets/css/reset.css";
import App from "./App";
import router from "./router";
import store from "./store";

import i18n from "./lang"; // Internationalization
import "./icons"; // icon
import VueContextMenu from "@xunlei/vue-context-menu";
import Axios from "axios";
import { getToken, getUser, removeToken } from "@/utils/auth";

Vue.prototype.$http = Axios;
Axios.interceptors.request.use(
    function(config) {
        var token = getToken();
        if (token) {
            config.headers.Authorization = "bearer " + token; // 设置请求头
        }
        if (/post/i.test(config.method)) {
            config.transformRequest = [
                data => {
                    config.headers["Content-Type"] = "application/json;charset=utf-8";
                    return JSON.stringify(data);
                }
            ];
        }
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);
Vue.prototype.$Toast = function(res, data) {
    if (data != undefined) {
        if (data == true) {
            this.$message({
                message: res,
                type: "success"
            });
        } else {
            this.$message.error(res);
        }
        return;
    }
    if (res.data.success) {
        this.$message({
            message: res.data.msg,
            type: "success"
        });
    } else {
        this.$message.error(res.data.msg);
    }
};
const eventBus = {
    install(Vue, options) {
        Vue.prototype.$bus = new Vue();
    }
};

Vue.use(eventBus);
Vue.use(VueContextMenu);
Vue.use(Element, {
    size: "medium", // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false;
Vue.prototype.deepClone = function(initalObj) {
    var obj = {};
    obj = JSON.parse(JSON.stringify(initalObj));
    return obj;
};

Vue.prototype.isEmpty = function(obj) {
    if (obj === null) return true;
    if (typeof obj === "undefined") {
        return true;
    }
    if (typeof obj === "string") {
        if (obj === "") {
            return true;
        }
        var reg = new RegExp("^([ ]+)|([　]+)$");
        return reg.test(obj);
    }
    return false;
};
let times = 0;
// router.beforeEach((to, from, next) => {
//     // var user = getUser();
//     // var token = getToken();
//     // if (to.name == "login") {
//     //     if (user && token) {
//     //         next({ path: "/" });
//     //     } else {
//     //         next();
//     //     }
//     // } else {
//     //     if (user && token) {
//     //         store.dispatch("initUser", { user: user, token: token });
//     //         if (times == 0) {
//     //             store.dispatch("currentZoneCode", user.zoneCode);
//     //         }
//     //         times++;
//     //         next();
//     //     } else {
//     //         next({ path: "/login" });
//     //     }
//     // }
// });
new Vue({
    el: "#app",
    router,
    store,
    i18n,
    template: "<App/>",
    components: { App }
});