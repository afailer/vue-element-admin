import { mapGetters } from "vuex";
export default {
    data() {
        return {
            allPath: ["/domain", "/user", "/role", "/permission", "/organization"]
        };
    },
    methods: {
        getPathIndex(arr, item) {
            for (let l = 0; l < arr.length; l++) {
                if (arr[l] == item || arr[l].path == item) {
                    return l;
                }
            }
            return -1;
        }
    },
    computed: {
        ...mapGetters(["menus"])
    },
    beforeRouteEnter: (to, from, next) => {
        next(vm => {
            let indexInAll = vm.getPathIndex(vm.allPath, to.path); //在所有路由中存在
            if (indexInAll == -1) {
                //在所有限制路由中不存在
            } else {
                //存在于所有限制访问的路由集合中
                let indexInMenu = vm.getPathIndex(vm.menus, to.path);
                if (indexInMenu == -1) {
                    //没有权限
                    if (vm.menus.length == 0) {
                        vm.$router.push({
                            path: "/sitemap"
                        });
                    } else {
                        next({ path: vm.menus[0].path });
                    }
                }
            }
        });
    }
};