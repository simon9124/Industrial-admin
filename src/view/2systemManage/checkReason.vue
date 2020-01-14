<template>
  <div class="dooya-container">
    <Card>

      <Tabs value="1"
            @on-click="tabSelect">

        <!-- 综合检测 -->
        <TabPane label="综合检测"
                 name="1">

          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in resolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>

          <!-- table -->
          <Table :data="isMock?tableData:dataResult.pageData"
                 :columns="tableColumns_qc1"
                 :loading="tableLoading"
                 stripe
                 @on-selection-change="onSelectChange">
          </Table>

          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    transfer
                    placement="top"
                    :total="isMock?tableDataFilter.length:dataResult.dataCount"
                    :current.sync="pageNum"
                    :page-size-opts="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>

        <!-- 静音检测 -->
        <TabPane label="静音检测"
                 name="2">

          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in resolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>

          <!-- table -->
          <Table :data="isMock?tableData:dataResult.pageData"
                 :columns="tableColumns_qc2"
                 :loading="tableLoading"
                 stripe>
          </Table>

          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    transfer
                    placement="top"
                    :total="isMock?tableDataFilter.length:dataResult.dataCount"
                    :current.sync="pageNum"
                    :page-size-opts="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>

        <!-- 外观检测 -->
        <TabPane label="外观检测"
                 name="3">

          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in resolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>

          <!-- table -->
          <Table :data="isMock?tableData:dataResult.pageData"
                 :columns="tableColumns_qc3"
                 :loading="tableLoading"
                 stripe>
          </Table>

          <!-- 分页 -->
          <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    transfer
                    placement="top"
                    :total="isMock?tableDataFilter.length:dataResult.dataCount"
                    :current.sync="pageNum"
                    :page-size-opts="[10, 20, 50, 100]"
                    :page-size="pageSize"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>

      </Tabs>

      <!-- 检测标准form -->
      <Modal v-model="modalShow"
             title="请选择错误原因"
             footer-hide>
        <Form :model="modalData"
              :label-width="80"
              ref="modalData"
              :rules="modalDataRule">
          <FormItem label="异常原因"
                    prop="reason">
            <Select v-model="modalData.reason">
              <Option v-for="item in checkReasonList"
                      :value="item"
                      :key="item">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="checkReasonConfirm">确定</Button>
            <Button style="margin-left: 8px"
                    @click="modalShow=false">取消</Button>
          </FormItem>
        </Form>
      </Modal>

      <span :id="printable"
            style="opacity:0;position:absolute;left:0;top:0;width:150px">
        {{printable}}
      </span>

    </Card>
  </div>
</template>

<script>
// Print.js
import printJS from "print-js";
// mockData
import {
  checkReasonList, // 异常确认列表
  resolvedSelect // 异常原因列表
} from "./mockData/checkReason";
// function
import { resultCallback } from "@/libs/dataHanding"; // 根据请求的status执行回调函数
// api
import {
  findUnqualifiedWithPage, // 查询异常确认列表
  getDropDownList, // 获取异常原因列表
  updateCheckReason // 更新异常原因
} from "@/api/check";

/* eslint-disable*/
export default {
  data() {
    return {
      /* 全局 */
      tabList: ["综合检测", "静音检测", "外观检测"], // 顶部tab列表
      tabSelected: "1", // 顶部tab切换
      checkReasonList: [], // 错误原因select列表
      resolvedSelect: resolvedSelect, // 筛选 - 下拉框list
      isResolvedui: 0, // 筛选 - 界面绑定的值
      isResolved: "", // 筛选 - 要传给后台的值
      lineNo: "", // 产线号
      /* 每页 */
      tableDataOrg: [], // 原始数据
      tableDataFilter: [], // 筛选后的所有数据
      dataResult: {},
      tableData: [], // 处理后的当页数据
      tableColumns_qc1: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.$router.push({
                      path: "/check/checkSearch",
                      name: "checkSearch",
                      params: {
                        checkSearchNumber: params.row.barcode
                      }
                    });
                  }
                }
              },
              params.row.barcode
            );
          },
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
        },
        {
          title: "检测结果",
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
          title: "异常原因",
          key: "mark_reason_qc1",
          align: "center",
          minWidth: 100
        },
        {
          title: "日期时间",
          key: "record_time",
          align: "center",
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
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "异常原因"
              )
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small",
              //       disabled:
              //         this.tabSelected === "1"
              //           ? params.row.mark_reason_qc1 === null
              //           : this.tabSelected === "2"
              //           ? params.row.mark_reason_qc2 === null
              //           : params.row.mark_reason_qc3 === null
              //     },
              //     on: {
              //       click: () => {
              //         this.print(params.row);
              //       }
              //     }
              //   },
              //   "打印"
              // )
            ]);
          }
        }
      ], // 表头列项 - qc1
      tableColumns_qc2: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.$router.push({
                      path: "/check/checkSearch",
                      name: "checkSearch",
                      params: {
                        checkSearchNumber: params.row.barcode
                      }
                    });
                  }
                }
              },
              params.row.barcode
            );
          },
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
        },
        {
          title: "静音检测",
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
          title: "异常原因",
          key: "mark_reason_qc2",
          align: "center",
          minWidth: 100
        },
        {
          title: "日期时间",
          key: "record_time",
          align: "center",
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
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "异常原因"
              )
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small",
              //       disabled:
              //         this.tabSelected === "1"
              //           ? params.row.mark_reason_qc1 === null
              //           : this.tabSelected === "2"
              //           ? params.row.mark_reason_qc2 === null
              //           : params.row.mark_reason_qc3 === null
              //     },
              //     on: {
              //       click: () => {
              //         this.print(params.row);
              //       }
              //     }
              //   },
              //   "打印"
              // )
            ]);
          }
        }
      ], // 表头列项 - qc2
      tableColumns_qc3: [
        {
          title: "编号",
          key: "barcode",
          align: "center",
          render: (h, params) => {
            return h(
              "a",
              {
                on: {
                  click: () => {
                    this.$router.push({
                      path: "/check/checkSearch",
                      name: "checkSearch",
                      params: {
                        checkSearchNumber: params.row.barcode
                      }
                    });
                  }
                }
              },
              params.row.barcode
            );
          },
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
        },
        {
          title: "外观检测",
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
          title: "异常原因",
          key: "mark_reason_qc3",
          align: "center",
          minWidth: 100
        },
        {
          title: "日期时间",
          key: "record_time",
          align: "center",
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
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.edit(params.row);
                    }
                  }
                },
                "异常原因"
              )
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small",
              //       disabled:
              //         this.tabSelected === "1"
              //           ? params.row.mark_reason_qc1 === null
              //           : this.tabSelected === "2"
              //           ? params.row.mark_reason_qc2 === null
              //           : params.row.mark_reason_qc3 === null
              //     },
              //     on: {
              //       click: () => {
              //         this.print(params.row);
              //       }
              //     }
              //   },
              //   "打印"
              // )
            ]);
          }
        }
      ], // 表头列项 - qc3
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示数量
      // 选中的选项 - 当前
      selectionChange: [],
      // loading
      tableLoading: false,
      /* modal弹框 */
      modalShow: false, //是否显示
      modalData: {
        reason: ""
      }, //电机型号form
      modalDataRule: {
        reason: [
          { required: true, message: "请选择异常原因", trigger: "change" }
        ]
      }, //电机型号form规则
      printable: ""
    };
  },
  async created() {
    this.lineNo = localStorage.getItem("loginLineNo") || "22";
    this.getData();
    this.getCheckReason();
  },
  methods: {
    // 顶部tab被选择
    tabSelect(name) {
      this.tabSelected = name;
      this.isResolvedui = 0;
      this.isResolved = "";
      this.pageNum = 1;
      this.pageSize = 10;
      this.getData();
      this.getCheckReason();
    },
    // 获取异常原因下拉列表
    async getCheckReason() {
      this.checkReasonList = (await getDropDownList(
        this.tabSelected
      )).data.data;
    },
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.dataResult = (await findUnqualifiedWithPage(this)).data.data;
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataFilter = checkReasonList;
        this.refreshData();
      }
    },
    // 顶部下拉框筛选
    resolveChange(value) {
      this.isResolved = value === 0 ? "" : value === 1 ? "true" : "false";
      this.pageNum = 1;
      this.pageSize = 10;
      this.getData();
    },
    // 根据条件刷新数据
    refreshData() {
      if (this.isMock) {
        // 分页 & 每页数量
        this.tableData = this.tableDataFilter.slice(
          (this.pageNum - 1) * this.pageSize,
          this.pageNum * this.pageSize
        );
      } else {
        this.tableData = this.tableDataFilter;
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
    // 选项发生变化
    onSelectChange(selection) {
      this.selectionChange = [];
      selection.forEach(row => {
        this.selectionChange.push(row.barcode);
      });
      // console.log(this.selectionChange);
    },
    // 点击按钮 - 编辑
    edit(row) {
      this.$refs.modalData.resetFields();
      if (!this.isMock) {
        // 非mock时
        this.modalData = {
          barcode: row.barcode,
          qcIndex: parseInt(this.tabSelected),
          reason:
            this.tabSelected === "1"
              ? row.mark_reason_qc1 || ""
              : this.tabSelected === "2"
              ? row.mark_reason_qc2 || ""
              : row.mark_reason_qc3 || ""
        };
        this.modalShow = true;
      }
    },
    // 异常原因确认
    async checkReasonConfirm() {
      this.$refs.modalData.validate(async valid => {
        if (valid) {
          if (!this.isMock) {
            const result = (await updateCheckReason(this.modalData)).data
              .status;
            resultCallback(result, "修改成功！", () => {
              this.getData();
              this.modalShow = false;
            });
          }
        }
      });
    },
    // PrintJs调用打印机
    printCodes(printable) {
      printJS({
        printable: printable,
        type: "html",
        // header: 'Multiple Images',
        // imageStyle: 'width:50%;margin-bottom:20px;'
        imageStyle: "width:100%"
      });
    },
    // 打印错误原因
    async print(paramsRow) {
      this.tableData.forEach(row => {
        if (paramsRow.barcode === row.barcode) {
          this.printable =
            this.tabSelected === "1"
              ? row.mark_reason_qc1
              : this.tabSelected === "2"
              ? row.mark_reason_qc2
              : row.mark_reason_qc3;
        }
      });
      this.$nextTick(() => {
        this.printCodes(this.printable);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  // .ivu-table-body {
  // overflow: hidden;
  // }
  .ivu-table-cell {
    padding: 0;
    a {
      color: #2db7f5;
      text-decoration: underline;
    }
  }
}
</style>
