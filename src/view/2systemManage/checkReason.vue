<template>
  <div class="dooya-container">
    <Card>

      <Tabs value="qc1"
            @on-click="tabSelect">

        <!-- <TabPane v-for="(tab,i) in tabList"
                 :key="i"
                 :label="tab"
                 :name="'qc'+(i+1)">

          <div style="margin-bottom: 10px">
            <Select v-model="isResolved"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in isResolvedSelect"
                      :value="item.value"
                      :key="i">{{ item.label }}</Option>
            </Select>
          </div>

          <Table :data="isMock?tableData:dataResult.pageData"
                 :columns="'tableColumns_qc'+(i+1)"
                 :loading="tableLoading"
                 stripe
                 @on-selection-change="onSelectChange">
          </Table>

        </TabPane> -->

        <!-- 综合检测 -->
        <TabPane label="综合检测"
                 name="qc1">

          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in isResolvedSelect"
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
                    :total="isMock?tableDataFilter.length:dataResult.dataCount"
                    :current="1"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>

        <!-- 静音检测 -->
        <TabPane label="静音检测"
                 name="qc2">

          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in isResolvedSelect"
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
                    :total="isMock?tableDataFilter.length:dataResult.dataCount"
                    :current="1"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div>
        </TabPane>

        <!-- 外观检测 -->
        <TabPane label="外观检测"
                 name="qc3">

          <!-- 选择框 -->
          <div style="margin-bottom: 10px">
            <Select v-model="isResolvedui"
                    style="width:200px"
                    placeholder="已 / 未填写错误原因"
                    @on-change="resolveChange">
              <Option v-for="(item,i) in isResolvedSelect"
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
                    :total="isMock?tableDataFilter.length:dataResult.dataCount"
                    :current="1"
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
          <FormItem label="错误原因"
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
import { checkReasonList, resolvedSelect } from "./mockData/checkReason";
// api
import {
  findUnqualifiedWithPage,
  getDropDownList,
  updateCheckReason
} from "@/api/check";

/* eslint-disable*/
export default {
  data() {
    return {
      tabList: ["综合检测", "静音检测", "外观检测"],
      // 顶部tab切换
      tabSelected: "1",
      // 错误原因下拉select框 - 原因列表
      checkReasonList: [],

      /* 筛选：是否已填写错误原因 */
      isResolvedSelect: resolvedSelect,
      isResolvedui: 0,
      isResolved: "",

      // 产线号
      lineNo: "22",
      // 原始数据
      tableDataOrg: [],
      // 筛选后的所有数据
      tableDataFilter: [],
      dataResult: {},
      // 处理后的当页数据
      tableData: [],
      // 表头列项 - qc1
      tableColumns_qc1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
        },
        {
          title: "综合检测",
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
          title: "错误原因",
          key: "mark_reason_qc1",
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
                "错误原因"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled:
                      this.tabSelected === "1"
                        ? params.row.mark_reason_qc1 === null
                        : this.tabSelected === "2"
                        ? params.row.mark_reason_qc2 === null
                        : params.row.mark_reason_qc3 === null
                  },
                  on: {
                    click: () => {
                      this.print(params.row);
                    }
                  }
                },
                "打印"
              )
            ]);
          }
        }
      ],
      // 表头列项 - qc2
      tableColumns_qc2: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          title: "错误原因",
          key: "mark_reason_qc2",
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
                "错误原因"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled:
                      this.tabSelected === "1"
                        ? params.row.mark_reason_qc1 === null
                        : this.tabSelected === "2"
                        ? params.row.mark_reason_qc2 === null
                        : params.row.mark_reason_qc3 === null
                  },
                  on: {
                    click: () => {
                      this.print(params.row);
                    }
                  }
                },
                "打印"
              )
            ]);
          }
        }
      ],
      // 表头列项 - qc3
      tableColumns_qc3: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
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
          title: "错误原因",
          key: "mark_reason_qc3",
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
                "错误原因"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small",
                    disabled:
                      this.tabSelected === "1"
                        ? params.row.mark_reason_qc1 === null
                        : this.tabSelected === "2"
                        ? params.row.mark_reason_qc2 === null
                        : params.row.mark_reason_qc3 === null
                  },
                  on: {
                    click: () => {
                      this.print(params.row);
                    }
                  }
                },
                "打印"
              )
            ]);
          }
        }
      ],
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
      // 选中的选项 - 当前
      selectionChange: [],
      // loading
      tableLoading: false,
      // modal弹框 - 是否显示
      modalShow: false,
      // modal弹框 - 电机型号form
      modalData: {
        // mNumber: 'DM35R-3/28'
      },
      // modal弹框 - 电机型号form规则
      modalDataRule: {
        test_item_group_index: [
          { required: true, message: "请选择所属步骤", trigger: "blur" }
        ]
      },
      printable: ""
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    // 顶部tab被选择
    tabSelect(name) {
      // console.log(name);
      this.tabSelected = name === "qc1" ? "1" : name === "qc2" ? "2" : "3";
      this.getData();
    },
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 错误原因下拉列表
        this.tableLoading = true;
        this.checkReasonList = (await getDropDownList(
          this.tabSelected
        )).data.data;
        // table表格数据
        this.dataResult = (await findUnqualifiedWithPage(this)).data.data;
        this.tableLoading = false;
      } else {
        this.tableDataFilter = checkReasonList;
        this.refreshData();
      }
    },
    // 顶部下拉框被选择
    resolveChange(value) {
      this.isResolved = value === 0 ? "" : value === 1 ? "true" : "false";
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
      this.getData();
    },
    // 选项发生变化
    onSelectChange(selection) {
      this.selectionChange = [];
      selection.forEach(row => {
        this.selectionChange.push(row.barcode);
      });
      console.log(this.selectionChange);
    },
    // 点击按钮 - 编辑
    edit(row) {
      if (!this.isMock) {
        // 非mock时
        this.modalData = {
          barcode: row.barcode,
          qcIndex: parseInt(this.tabSelected),
          reason:
            this.tabSelected === "1"
              ? row.mark_reason_qc1
              : this.tabSelected === "2"
              ? row.mark_reason_qc2
              : row.mark_reason_qc3
        };
        this.modalShow = true;
      }
    },
    // 错误原因确认
    async checkReasonConfirm() {
      if (!this.isMock) {
        updateCheckReason(this.modalData);
        this.getData();
        this.modalShow = false;
      }
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
  }
}
</style>
