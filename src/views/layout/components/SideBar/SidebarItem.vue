<template>
  <div class="menu-wrapper">

   <template v-for="item in menus">
     <router-link :to="item.path" :key="item.id">
       <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
         <i v-if="item.icon" :class="item.icon"></i>
         <span>{{item.name}}</span>
       </el-menu-item>
     </router-link>
   </template>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { loadMenus } from "@/api/setting.js";
export default {
  name: "SidebarItem",
  props: {
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menus: []
    };
  },
  mounted() {
    this.loadCurrentMenus();
  },
  methods: {
    loadCurrentMenus() {
      this.menus.length = 0;
      this.menus.push({
        code: "-1",
        name: "首页",
        ename: "sitemap",
        icon: "fa fa-home",
        path: "/sitemap"
      });
    }
  }
};
</script>
<style>
el-icon-menu,
.el-menu-item [class^="fa fa-"] {
  margin-right: 5px;
  width: 14px !important;
  text-align: center;
  font-size: 14px !important;
  vertical-align: middle;
}
</style>

