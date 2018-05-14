import Vue from "vue";
import Router from "vue-router";
import axios from "axios";
Vue.prototype.$http = axios;

Vue.use(Router);

/* Layout */
import Layout from "../views/layout/layout";
export const constantRouterMap = [{
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login/index")
    },
    {
        path: "/",
        component: Layout,
        name: "Layout",
        children: [{
            path: "sitemap",
            name: "sitemap",
            component: () =>
                import ("@/views/sitemap"),
            meta: { title: "首页", icon: "table" }
        }]
    }
];

export default new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
});