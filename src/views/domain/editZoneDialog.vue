<template>
  <div>
    <el-dialog
     :title=title
     width="40%"
     :visible.sync="dialogFormVisible">
		<el-form :model="form">
			<el-form-item label="名称" :label-width="formLabelWidth">
				<el-input v-model="form.name" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item label="英文名" :label-width="formLabelWidth">
				<el-input v-model="form.ename" auto-complete="off"></el-input>
			</el-form-item>
      <!-- <el-form-item label="状态" :label-width="formLabelWidth">
				<el-input v-model="form.state" auto-complete="off"></el-input>
			</el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
				<el-input v-model="form.type" auto-complete="off"></el-input>
			</el-form-item> -->
      <el-form-item label="描述" :label-width="formLabelWidth">
				<el-input v-model="form.description" auto-complete="off"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer" style="overflow:hidden">
			<el-button @click="dialogFormVisible=false" style="float:right !important">取 消</el-button>
			<el-button type="primary" @click="submit(form)" style="margin:0px 10px;float:right !important">确 定</el-button>
		</div>
	</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { addNewZone, editNewZone } from "@/api/zone.js";
    export default {
      name:"editZone-dialog",
      data(){
        return{
          form:{},
          title:'编辑域',
          formLabelWidth:'100px',
          dialogFormVisible:false
        }
      },
      computed: {
        ...mapGetters(["currentZoneCode"])
      },
      props:['loadData'],
      methods: {
        submit(data) {
          this.saveZone(data);
        },
        // 保存数据
        saveZone(data) {
            // 创建域时添加 parentCode字段
            if (!data.parentCode) {
              data.parentCode = this.currentZoneCode;
            }

            // 编辑操作
            if (data.code) {
              editNewZone(data)
                .then(res => {
                  const data = res.data;
                  if (data.success) {
                    this.$message({ message: "编辑域成功！", type: "success" });
                    this.dialogFormVisible = false;
                    this.loadData(1);
                  } else {
                    this.$message({
                      message: "编辑域失败:" + data.msg,
                      type: "error"
                    });
                  }
                })
                .catch(error => {
                  this.$message({ message: "编辑域失败:" + error, type: "error" });
                });
            } else {
            // 增加操作
              addNewZone(data)
                .then(res => {
                  const data = res.data;
                  if (data.success) {
                    this.$message({ message: "创建域成功！", type: "success" });
                    this.dialogFormVisible = false;
                    this.loadData(1);
                  } else {
                    this.$message({
                      message: "创建域失败:" + data.msg,
                      type: "error"
                    });
                  }
                })
                .catch(error => {
                  this.$message({ message: "创建域失败:" + error, type: "error" });
                });
            }
        }
      },
      created () {
        // index中$emit
          this.$bus.$on("editZone",(item)=>{
            this.title='编辑域';
            this.form={};
            Object.assign(this.form, item);
            this.dialogFormVisible=true;
          })

          this.$bus.$on('createZone',()=>{
            this.title='创建域';
            this.form={};
            this.dialogFormVisible=true;
          })
      }
    }
</script>
