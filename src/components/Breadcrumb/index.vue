<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item>
        <span :key="123">{{breadName}}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "breadcrumb",
  data() {
    return {
      breadName: "breadcrumb"
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  line-height: 36px;
  padding-left: 10px;
  background: #ecf0f5;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
