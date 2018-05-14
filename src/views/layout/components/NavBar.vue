<template>
	<div class="nav-con">
	  <el-menu class="navbar" mode="horizontal">
	    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
	  </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav-con {
  width: 100%;
  top: 0;
  height: 50px;
  line-height: 50px;
  .navbar {
    position: fixed;
    width: 100%;
    top: 0;
    height: 50px;
    line-height: 50px;
    color: white;
    z-index: 20;
    background-color: #2b3643;
    border-radius: 0px !important;
    .hamburger-container {
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .breadcrumb-container {
      float: left;
    }
  }
}
</style>
