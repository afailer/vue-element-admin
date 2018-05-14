<template>
	<div>
		<!-- 创建编辑域 -->
		<editZoneDialog :loadData=loadData></editZoneDialog>
		<!-- 设置域 管理员 权限 -->
		<setZoneDialog></setZoneDialog>
		<div class="createbtn">
			<el-button  icon="el-icon-plus" type="primary" @click="openCreateZoneDialog">创建域</el-button>
		</div>
		<!-- 表格 -->
	  <el-table :data="tableData" border class="table">
	    <el-table-column label="名称" width="180">
	      <template slot-scope="scope">
	        <span style="margin-left: 10px">{{ scope.row.name }}</span>
	      </template>
	    </el-table-column>
	    <el-table-column label="英文名" width="180">
	      <template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.ename }}</span>	          
	      </template>
	    </el-table-column>
	    <!-- <el-table-column label="状态" width="150">
	      <template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.state }}</span>	          
	      </template>
	    </el-table-column>
			<el-table-column label="类型" width="150">
	      <template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.type }}</span>	          
	      </template>
	    </el-table-column> -->
			<el-table-column label="描述" width="180">
	      <template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.description }}</span>	          
	      </template>
	    </el-table-column>
	    <el-table-column label="操作">
	      <template slot-scope="scope">
					<el-button type="primary" size="mini" @click="editZone(scope.row)">编辑</el-button>
	        <el-button type="primary" size="mini" @click="setZone(scope.row)">设置</el-button>
	      	<el-button type="primary" size="mini" @click="enterZone(scope.row)">进入域</el-button>
					<el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
		<!-- 分页 -->
		<el-pagination :class="$style.pagination" background  @current-change="handleCurrentChange" :current-page="listQuery.currentPage"  :page-size="listQuery.pageSize" layout="total, prev, pager, next" :total="total">
		</el-pagination>

	</div>
</template>

<script>
import { mapGetters } from "vuex";
import { getZoneList, addNewZone, editNewZone, delZone } from "@/api/zone.js"; // 测试request方式
import setZoneDialog from "./setZoneDialog.vue";
import editZoneDialog from "./editZoneDialog";
import beforeEach from "@/utils/beforeEach.js";
export default {
  name: "domain",
  mixins: [beforeEach],
  data() {
    return {
      tableData: [],
      editRow: {},
      total: null,
      listLoading: true,
      listQuery: {
        currentPage: 1,
        pageSize: 10
      }
    };
  },
  created() {
    this.loadData(1);
  },
  components: {
    setZoneDialog,
    editZoneDialog
  },
  computed: {
    ...mapGetters(["currentZoneCode", "childZones"])
  },
  watch: {
    currentZoneCode: function() {
      this.loadData(1);
    }
  },
  methods: {
    // 初始化数据
    loadData(currentPage) {
      getZoneList(this.currentZoneCode, currentPage).then(res => {
        this.tableData = res.data.obj.result;
        this.total = res.data.obj.totalCount;
        this.listQuery.currentPage = res.data.obj.pageNum;
        this.listQuery.pageSize = res.data.obj.pageSize;
      });
    },  
    // 切换页码
    handleCurrentChange(currentPage) {
      this.loadData(currentPage);
    },
    handleFilter() {
      this.listQuery.currentPage = 1;
      this.loadData(1);
    },
    // 创建域
    openCreateZoneDialog() {
      this.$bus.$emit("createZone", "");
    },
    // 编辑域
    editZone(item) {
      this.$bus.$emit("editZone", item);
    },
    // 设置域
    setZone(row) {
      this.$bus.$emit("setZone", row);
    },
    // 删除域
    handleDel(row) {
      this.$confirm("此操作将删除域, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          delZone(row.code)
            .then(res => {
              this.loadData(1);
            })
            .catch(error => {
              this.$message({
                type: "warning",
                message: "删除失败！"
              });
            });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(error => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 进入域
    enterZone(row) {
      this.$store.dispatch("currentZoneCode", row.code);
      this.$store.dispatch("childZones", [...this.childZones, row]);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" module>
@import "src/styles/mixin.scss";
.pagination {
  margin: 30px auto;
  width: 30%;
  position: relative;
  bottom: 20px;
}
</style>
