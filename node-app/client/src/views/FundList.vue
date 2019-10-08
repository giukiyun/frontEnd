<template>
  <div class="fundlist">
    <div class="filterform">
      <el-form :inline="true" :model="search_data">
        <el-form-item label="按照时间筛选">
          <el-date-picker v-model="search_data.startTime" type="datetime" placeholder="选择开始时间"></el-date-picker>--
          <el-date-picker v-model="search_data.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="view" @click="handleSearch()">筛选</el-button>
        </el-form-item>
        <el-form-item class="btnRight">
          <el-button
            type="primary"
            size="small"
            icon="view"
            v-if="user.identity == 'manager'"
            @click="handleAdd()"
          >添加</el-button>
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
        <el-table-column prop="date"  label="创建时间" width="250" sortable>
          <template slot-scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left:10px">{{scope.row.date | dateFormat}}</span>
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
            <el-button
              type="warning"
              icon="edit"
              size="small"
              v-if="user.identity == 'manager'"
              @click="handleEdit(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="delete"
              size="small"
              v-if="user.identity == 'manager'"
              @click="handleDelete(scope.row,scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-row>
        <el-col :span="24">
          <div class="pagination">
            <el-pagination
              :page-sizes="paginations.page_sizes"
              :page-size="paginations.page_size"
              :layout="paginations.layout"
              :total="paginations.total"
              :current-page.sync="paginations.page_index"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 弹框页面 -->
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile()"></Dialog>
  </div>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundList",
  data() {
    return {
      search_data: {
        startTime: "",
        endTime: ""
      },
      paginations: {
        page_index: 1, //当前位于哪页
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
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
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  created() {
    this.getProfile();
  },
  filters: {
    //时间格式化
    dateFormat:function(date) {
      let t = new Date(date);
      return (
        t.getFullYear() +
        "-" +
        (t.getMonth() + 1) +
        "-" +
        t.getDate() +
        " " +
        t.getHours() +
        ":" +
        t.getMinutes() +
        ":" +
        t.getSeconds()
      );
    }
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios("/api/profiles").then(res => {
        // this.tableData = res.data;
        this.allTableData = res.data;
        this.filterTableData = res.data;
        // 设置分页数据
        this.setPaginations();
      });
    },
    setPaginations() {
      // 分页属性默认设置
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      //设置默认数据,把过滤后的数据放到单页数据中
      this.tableData = this.allTableData.filter((item, index) => {
        // 让每页分得的数据不大于单页指定数
        return index < this.paginations.page_size;
      });
    },
    handleAdd() {
      // 添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
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
      // 编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(row, index) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;

      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    handleCurrentChange(page) {
      // 获取当前页下标
      let index = this.paginations.page_size * (page - 1);
      // 数据总条数
      let nums = this.paginations.page_size * page;

      // 容器
      let tables = [];
      // 遍历,将当前页的数据存放到容器中显示出来
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }

        this.tableData = tables;
      }
    },
    handleSearch() {
      // 筛选功能
      if (!this.search_data.startTime || !this.search_data.endTime) {
        this.$message({
          type: "warning",
          message: "请选择时间区间"
        });
        this.getProfile();
        return;
      }

      // 获取开始时间和结束时间
      const sTime = this.search_data.startTime.getTime();
      const eTime = this.search_data.endTime.getTime();
      // 设置过滤器，把过滤后的数据传回
      this.allTableData = this.filterTableData.filter(item => {
        // 格式化时间(此时时间不是标准格式,需要格式化)
        let date = new Date(item.date);
        let time = date.getTime();
        // 设置判断条件
        return time >= sTime && time <= eTime;
      });
      //调用分页数据
      this.setPaginations();
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
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
