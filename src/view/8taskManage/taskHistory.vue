<template>
  <div class="dooya-container">
    <Card>

      <!-- 表格 -->
      <Table border
             disabled-hover
             :loading="tableLoading"
             :data="tableData"
             :columns="tableColumns"
             stripe>
      </Table>

      <!-- 分页 -->
      <div v-if="tableData.length>0"
           style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                transfer
                placement="top"
                :total="total"
                :current.sync="pageNum"
                :page-size-opts="[10, 20, 50, 100]"
                :page-size="pageSize"
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>

    </Card>

  </div>
</template>

<script>
// mockData
import { taskHistoryList } from "./mockData"; // 历史任务列表
// function
import { arraySort } from "@/libs/dataHanding"; // 对象数组根据key排序
// api
import { findTaskByPage } from "@/api/process"; // 分页查询历史任务

export default {
  data() {
    return {
      /* 全局 */
      lineNo: "", // 当前产线
      /* 每页 */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "日期",
          key: "createTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "型号",
          key: "productClass",
          align: "center",
          minWidth: 150
        },
        {
          title: "上班时间",
          key: "startTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "下班时间",
          key: "endTime",
          align: "center",
          minWidth: 180
        },
        {
          title: "任务量",
          key: "taskCount",
          align: "center",
          minWidth: 100
        },
        {
          title: "检测量",
          key: "total",
          align: "center",
          minWidth: 100
        },
        {
          title: "合格量",
          key: "qualified",
          align: "center",
          minWidth: 100
        },
        {
          title: "任务状态",
          key: "statusName",
          align: "center",
          minWidth: 100
        }
      ], // table表头
      total: 0, // 总数
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示数量
      /* loading */
      tableLoading: false // table
    };
  },
  async created() {
    this.lineNo = localStorage.getItem("loginLineNo") || "";
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        const dataResult = (await findTaskByPage(
          this.pageNum,
          this.pageSize,
          this.lineNo
        )).data.data;
        if (dataResult !== null) {
          this.tableData = dataResult.pageData;
          this.total = dataResult.dataCount;
        } else {
          this.tableData = [];
          this.total = 0;
        }
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = taskHistoryList;
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"产线编号"升序
      this.tableDataOrg.sort(arraySort("lineNo", "asc"));
      // 分页 & 每页条数
      this.tableData = this.tableDataOrg.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
      this.total = this.tableDataOrg.length;
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.getData();
    },
    // 每页条数变化
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.getData();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
