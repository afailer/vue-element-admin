<template>
  <scroll-bar>
  	<p class="auth-name">权限管理</p>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#364150" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
export default {
  components: { SidebarItem, ScrollBar },
  computed:{
     ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style>
	.auth-name{
		height: 50px;
		line-height: 50px;
		font-weight: 700;
		text-align: center;
		background: #2b3643;
    color: white;
    font-size: 18px;
		border-right: 1px solid #CCCCCC;
	}
  .el-menu{
    background: #364150
  }
</style>