<template>
  <div>
    <!-- 设置管理员、权限 对话框 -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-tabs type="border-card">
            <!--设置管理员-->
            <el-tab-pane>
                <span slot="label">管理员</span>
                <el-form :model="nowRow" v-if="this.managerCode">
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="nowRow.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名" :label-width="formLabelWidth">
                        <el-input v-model="nowRow.loginName" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="修改密码" :label-width="formLabelWidth">
                        <el-checkbox v-model="checked"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="formLabelWidth" v-if="this.checked">
                        <el-input v-model="password" auto-complete="off" type="password" placeholder="如需修改密码，请输入新密码"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth" v-if="this.checked">
                        <el-input v-model="newpassword" auto-complete="off" type="password"></el-input>
                    </el-form-item>
                
                </el-form>
                 <el-form :model="nowRow" v-else>
                    <el-form-item label="名称" :label-width="formLabelWidth">
                        <el-input v-model="nowRow.name" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="登录名" :label-width="formLabelWidth">
                        <el-input v-model="nowRow.loginName" auto-complete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="密码" :label-width="formLabelWidth">
                        <el-input v-model="password" auto-complete="off" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" :label-width="formLabelWidth">
                        <el-input v-model="newpassword" auto-complete="off" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <el-button @click="dialogFormVisible = false" style="float:right !important">取消</el-button>
                <el-button type="primary" @click="saveSet(row, nowRow, managerCode)" style="margin:0px 10px;float:right !important">确定</el-button>
            </el-tab-pane>
            
            <!--设置权限-->
            <el-tab-pane label="权限" :class="$style.checkboxs">
                <el-tree
                    :data="permissions"
                    show-checkbox
                    node-key="code"
                    ref="tree"
                    :props="defaultProps"
                    :default-checked-keys="managerPermissions">
                    <!-- :render-content="renderContent" -->
                </el-tree>

                <el-button @click="dialogFormVisible = false" style="float:right !important">取消</el-button>
                <el-button type="primary" @click="setPermissions(row)" style="margin:0px 10px;float:right !important">确定</el-button>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { validatePassWord } from "@/utils/validate.js";
import {
  setZoneManager,
  setZonePermissions,
  getZoneManager,
  getZonePermissions,
  modifyZoneManager
} from "@/api/zone.js";
export default {
  name: "setZone-dialog",
  data() {
    return {
      title: "创建",
      password: "",
      newpassword: "",
      nowRow: {},
      row: {},
      managerCode: "", // 是否有管理员
      formLabelWidth: "100px",
      dialogFormVisible: false,
      permissions: [],
      managerPermissions: [], //默认勾选的节点的 key 的数组
      checkpermissions: [], // 新勾选
      defaultProps: {
        children: "children", //指定子树为节点对象的某个属性值
        label: "name" //指定节点标签为节点对象的某个属性值
      },
      checked: false
    };
  },
  computed: {
    ...mapGetters(["currentZoneCode"])
  },
  props: ["loadData"],
  methods: {
    saveSet(row, nowRow, managerCode) {
      if (this.password != this.newpassword) {
        this.$message({ message: "两次密码不一致！", type: "warning" });
        return;
      }
      if (this.managerCode == "" || this.checked) {
        //不是管理员，打算注册管理员；修改管理员信息并且是否修改密码被打钩
        if (!validatePassWord(this.password)) {
          this.$message({
            message: "密码需要6-12位的字母或数字",
            type: "warning"
          });
          return;
        }
      }

      if (this.password.length > 0) {
        nowRow.password = this.password;
      }
      if (managerCode == "") {
        // 创建
        this.setManager(row, nowRow);
      } else {
        // 修改
        this.modifyManager(nowRow);
      }
    },
    // 获取管理员
    getManager(row) {
      getZoneManager(row.code).then(res => {
        res = res.data;
        if (res.obj.length == 0) {
          this.managerCode = "";
        } else {
          const managerCode = res.obj[0].code;
          this.managerCode = managerCode;
        }
        if (this.managerCode) {
          // 有管理员 获取
          this.title = "修改";
          this.nowRow = Object.assign({}, res.obj[0]);
        } else {
          // 没有管理员 创建
          this.title = "创建";
          this.nowRow = {};
        }
        console.log(res.obj);
      });
    },
    // 创建管理员
    setManager(row, nowRow) {
      setZoneManager(row.code, nowRow)
        .then(res => {
          this.$Toast(res);
          this.dialogFormVisible = false;
        })
        .catch(error => {
          this.$Toast(res);
        });
    },
    // 修改管理员
    modifyManager(nowRow) {
      modifyZoneManager(nowRow)
        .then(res => {
          this.$Toast(res);
          this.dialogFormVisible = false;
        })
        .catch(error => {
          this.$Toast(res);
        });
    },
    // 获取权限
    getPermissions(row) {
      getZonePermissions(row.code)
        .then(res => {
          res = res.data;
          this.permissions = res.obj;
          // 勾选权限回显
          this.permissions.forEach(element => {
            if (element.state == "1") {
              this.managerPermissions.push(element.code);
            }
          });
        })
        .catch(error => {
          this.$Toast(res);
        });
    },
    // 设置保存权限
    setPermissions(row) {
      var targetData = [];
      this.$refs.tree.getCheckedKeys().forEach(element => {
        if (this.checkpermissions.indexOf(element) < 0) {
          targetData.push(element);
        }
      });
      setZonePermissions(row.code, targetData) // "152232931231400001"
        .then(res => {
          this.$Toast(res);
          this.dialogFormVisible = false;
        })
        .catch(error => {
          this.$Toast(res);
        });
    }
  },
  created() {
    // index中$emit row是index的table当前行数据
    this.$bus.$on("setZone", row => {
      this.dialogFormVisible = true;
      this.nowRow = {};
      this.password = "";
      this.newpassword = "";
      this.managerCode = "";
      this.checked = false;
      this.managerPermissions.length = 0;
      this.row = Object.assign({}, row);
      this.getManager(row);
      this.getPermissions(row);
    });
  },
  beforeDestroy() {
    this.$bus.$off("setZone");
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" module>
@import "src/styles/mixin.scss";
.checkboxs {
  div {
    margin-top: 20px;
    &:first-of-type {
      margin-top: 0;
    }
    &:last-of-type {
      margin-bottom: 20px;
    }
  }
}
</style>