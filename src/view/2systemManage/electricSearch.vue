<template>
  <div class="dooya-container">
    <Card>
      <Table :data="this.isMock?tableData:tableData.pageData"
             :columns="tableColumns"
             :loading="tableLoading"
             :ellipsis="true"
             stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                transfer
                placement="top"
                :total="this.isMock?tableDataOrg.length:tableData.dataCount"
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
import checkList from "./mockData/index.js";
import { getCheckListByPage } from "@/api/check";

export default {
  data() {
    return {
      // 原始数据
      tableDataOrg: [],
      // 处理后的当页数据
      tableData: [],
      // 表头列项
      /* eslint-disable*/
      tableColumns: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          minWidth: 150
        },
        {
          title: "线号",
          key: "lineno",
          align: "center",
          render: (h, params) => {
            const text = params.row.lineno + "线";
            return h("div", text);
          },
          minWidth: 80
          // minWidth: document.body.clientWidth <= 1280 ? 0 : 80
        },
        {
          title: "综合测试",
          key: "qc1_result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc1_result === 0
                ? "default"
                : row.qc1_result === 1
                ? "success"
                : "error";
            const text =
              row.qc1_result === 0
                ? "未检测"
                : row.qc1_result === 1
                ? "合格"
                : "不合格";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "综合测试开始时间",
          key: "qc1_time",
          align: "center",
          minWidth: 150
        },
        {
          title: "综合测试检测人",
          key: "qc1_user_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "静音结果",
          key: "qc2_result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc2_result === 0
                ? "default"
                : row.qc2_result === 1
                ? "success"
                : "error";
            const text =
              row.qc2_result === 0
                ? "未检测"
                : row.qc2_result === 1
                ? "合格"
                : "不合格";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "静音测试开始时间",
          key: "qc2_time",
          align: "center",
          minWidth: 150
        },
        {
          title: "静音间检测人",
          key: "qc2_user_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "外观结果",
          key: "qc3_result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc3_result === 0
                ? "default"
                : row.qc3_result === 1
                ? "success"
                : "error";
            const text =
              row.qc3_result === 0
                ? "未检测"
                : row.qc3_result === 1
                ? "合格"
                : "不合格";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "外观测试时间",
          key: "qc3_time",
          align: "center",
          minWidth: 150
        },
        {
          title: "外观检测人",
          key: "qc3_user_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "检测结果",
          key: "result",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.qc1_result === 2 ||
              row.qc2_result === 2 ||
              (row.qc3_result !== 0 && row.qc3_result !== 1)
                ? "error"
                : row.qc1_result === 0 ||
                  row.qc2_result === 0 ||
                  row.qc3_result === 0
                ? "default"
                : row.qc1_result === 1 &&
                  row.qc2_result === 1 &&
                  row.qc3_result === 1
                ? "success"
                : "warning";
            const text =
              row.qc1_result === 2 ||
              row.qc2_result === 2 ||
              (row.qc3_result !== 0 && row.qc3_result !== 1)
                ? "不合格"
                : row.qc1_result === 0 ||
                  row.qc2_result === 0 ||
                  row.qc3_result === 0
                ? "未检测"
                : row.qc1_result === 1 &&
                  row.qc2_result === 1 &&
                  row.qc3_result === 1
                ? "合格"
                : "异常";
            return h(
              "Tag",
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.show(params.row);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
      // loading
      tableLoading: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取首页数据
    async getData() {
      this.tableLoading = true;
      if (this.isMock) {
        // mock数据
        const list = checkList.checkList;

        // 数据处理
        this.tableDataOrg = list;
        this.tableData = list.slice(
          (this.pageNum - 1) * this.pageSize,
          this.pageNum * this.pageSize
        );
        this.tableLoading = false;
      } else {
        // 接口数据
        const list = (await getCheckListByPage(this.pageNum, this.pageSize))
          .data.data;

        // 适配1024px现场小屏幕
        if (document.body.clientWidth <= 1280) {
          const noneArray = [
            "线号",
            "综合测试开始时间",
            "综合测试检测人",
            "静音测试开始时间",
            "静音间检测人",
            "外观测试时间",
            "外观检测人"
          ];
          for (var i = this.tableColumns.length - 1; i >= 0; i--) {
            if (noneArray.indexOf(this.tableColumns[i].title) > -1) {
              this.tableColumns.splice(i, 1);
            }
          }
        }

        // 数据处理
        this.tableData = this.tableDataOrg = list;

        // this.tableData = list.slice(
        //   (this.pageNum - 1) * this.pageSize,
        //   this.pageNum * this.pageSize
        // );

        this.tableLoading = false;
      }
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
    },
    // 点击按钮 - 详情
    show(row) {
      this.$router.push({
        // path: "/systemManage/checkSearch",
        path: "/check/checkSearch",
        name: "checkSearch",
        params: {
          checkSearchNumber: row.barcode
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-table-body {
    // overflow: hidden;
  }
  .ivu-table-cell {
    padding: 0;
  }

  .acs {
    width: 300px !important;
  }
}
</style>
