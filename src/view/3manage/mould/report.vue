<template>
  <div>

    <!-- Modal - 整体数据-->
    <Modal v-model="modalShow"
           :mask-closable="false"
           footer-hide
           width="80%"
           title="查看报表">

      <!-- form - 筛选项 -->
      <Form v-if="paramListData.length!==0"
            ref="filterFormData"
            :model="filterFormData"
            inline
            label-position="right"
            @submit.native.prevent
            style="margin:0 0 10px 10px">
        <FormItem v-for="(item,i) in paramListData"
                  :key='i'
                  :label="item.title"
                  :prop="item.name">

          <!-- 下拉单选 -->
          <Select v-if="item.elementType==='下拉单选'"
                  v-model="filterFormData[item.name]"
                  placeholder="请选择"
                  style="width:fit-content;min-width:160px">
            <Option v-for="_item in isMock?item.data:JSON.parse(item.data)"
                    :value="_item[item.valueName]"
                    :key="_item[item.labelName]">{{ _item[item.valueName] }}</Option>
          </Select>

          <!-- 文本框 -->
          <Input v-if="item.elementType==='文本框'"
                 type="text"
                 v-model.trim="filterFormData[item.name]">
          </Input>

          <!-- 日期选择 -->
          <DatePicker v-if="item.elementType==='日期选择'"
                      type="date"
                      placeholder="请选择"
                      style="width:fit-content;min-width:160px">
          </DatePicker>

        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="submitFilter('filterFormData')">搜索</Button>
        </FormItem>
      </Form>

      <!-- 表格 -->
      <table id="report"></table>
      <Table border
             :style="{borderTop:JSON.stringify(tableHeader) === '{}'?'1px solid #e8eaec':'none'}"
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

      <!-- spin -->
      <Spin size="large"
            fix
            v-if="spinShow">
      </Spin>

    </Modal>

  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";
// function
import excel from "@/libs/excel";
// api
import {
  getReortConditionInfo, // 根据id获取参数信息
  getReortHeaderInfo, // 根据id获取表头信息
  getReportData // 获取报表数据
} from "@/api/mould";

export default {
  name: "view-report",
  data() {
    return {
      /* 全局 */
      rowId: "", // 当前行的id
      modalShow: false, // 是否显示
      spinShow: false,
      /* filterForm */
      paramListData: [], // 筛选数据 - 父组件传递
      filterFormData: {}, // 筛选数据 - 呈现在表单
      /* table */
      tableHeader: {},
      tableData: [],
      tableColumns: [],
      tableLoading: false,
      total: 0, // 总数
      pageNum: 1, // 页码
      pageSize: 10 // 每页显示数量
    };
  },
  methods: {
    // 显示配置参数弹框
    showModal(param) {
      console.log(param);
      this.getData(param);
      this.modalShow = true;
    },
    // 数据初始化
    async getData(param) {
      this.rowId = param.id;
      this.filterFormData = {}; // 清空表单
      document.getElementById("report").innerHTML = ""; // 清空动态表头
      if (!this.isMock) {
        /* 接口数据 */
        this.spinShow = true;
        // 动态表单
        this.paramListData =
          JSON.parse(
            (await getReortConditionInfo(param.id)).data.data.condition
          ) || [];
        this.paramListData.forEach(item => {
          this.filterFormData[item.name] = item.defaultData;
        });
        // 动态表头
        this.tableHeader = (
          await getReortHeaderInfo(param.id)
        ).data.data.header;
        this.tableHeader =
          this.tableHeader !== null ? JSON.parse(this.tableHeader) : {};
        if (JSON.stringify(this.tableHeader) === "{}") {
          const tableHeaderCopy = JSON.parse(JSON.stringify(this.tableHeader));
          tableHeaderCopy["!ref"] = "'':''";
          this.headerHandle(tableHeaderCopy);
        } else {
          this.headerHandle(this.tableHeader);
        }
      } else {
        /* mock数据 */
        this.paramListData = param.paramList;
        this.paramListData.forEach(item => {
          this.filterFormData[item.name] = item.defaultData; // 动态表单
        });
        // this.refreshData();
      }
    },
    // 表头处理
    headerHandle(tableHeader) {
      /* 1.生成原始表格Html */
      let temp = excel.builderOriginalHtml(tableHeader["!ref"].split(":")[1]);
      // console.log(temp);
      /* 2.生成Dom元素 */
      excel.builderHtml(tableHeader, temp);
      /* 3.将生成的Html写入表格 */
      const tableDom = excel.writeToTable("report", temp);
      // console.log(tableDom);
      /* 4.将tableDom对象转化成vue虚拟dom */
      var oSerializer = new XMLSerializer();
      var tableStr = oSerializer.serializeToString(tableDom);
      var Profile = Vue.extend({
        template: `<table id="report">${tableStr}</table>`
      });
      /* 5.创建实例，并挂载到元素上 */
      new Profile().$mount("#report");

      this.spinShow = false;
    },
    // 点击搜索
    async submitFilter() {
      console.log(this.filterFormData);
      const form = {
        id: this.rowId,
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
        // condition: JSON.stringify(this.filterFormData)
        condition: this.filterFormData
      };
      console.log(await getReportData(form));
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
.v-transfer-dom /deep/ {
  #report {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    color: #515a6e;
    border: 1px solid #dcdee2;
    overflow: auto;
    td,
    th {
      text-align: center;
      border: 1px solid #e8eaec;
      padding: 0 18px;
    }
    thead th {
      height: 40px;
      white-space: nowrap;
      overflow: hidden;
      background-color: #f8f8f9;
    }
    tbody td {
      height: 48px;
    }
  }
  .ivu-modal {
    .ivu-form {
      &-item {
        margin-right: 20px;
        margin-bottom: 14px;
      }
      &-item-content {
        display: inline-block;
      }
      &-item-label {
        padding-right: 10px;
      }
    }
  }
}
</style>
