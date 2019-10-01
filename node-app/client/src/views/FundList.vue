<template>
  <div class="fundlist">
    <div class="fliterform">
      <el-form :inline="true">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table_container">
      <el-table
        v-if="tableData.length>0"
        :data="tableData"
        max-height="450"
        border
        :default-sort="{prop:'date',order:'descending'}"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" align="center" width="70"></el-table-column>
        <el-table-column prop="date" label="创建时间" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left:10px">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">+{{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span tyle="color:#f56767">-{{scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户现金" align="center" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{scope.row.cash}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column prop="operation" align="center" label="操作" fixed="right" width="180">
          <template slot-scope="scope">
            <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              @click="handleDelete(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹框页面 -->
    <Dialog :dialog="dialog" :form="form" @update="getProfile()"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      form: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      }
    };
  },
  components: {
    Dialog
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profiles").then(res => {
        this.tableData = res.data;
      });
    },
    handleAdd() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.form = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleEdit(row) {
      console.log("1234");
    },
    handleDelete(row, index) {
      console.log("456");
    }
  }
};
</script>
<style scoped>
.fundlist {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
</style>
