<template>
  <div class="dooya-container">
    <Card>

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
                  :placeholder="'当前操作符：'+getValueByKey(operatorList,'opKey',item.op.toString(),'opLabel')"
                  style="width:fit-content;min-width:160px">
            <Option v-for="_item in isMock?item.data:JSON.parse(item.data)"
                    :value="_item[item.labelName]"
                    :key="_item[item.labelName]">{{ _item[item.valueName] }}</Option>
          </Select>

          <!-- 文本框 -->
          <Input v-if="item.elementType==='文本框'"
                 type="text"
                 :placeholder="'当前操作符：'+getValueByKey(operatorList,'opKey',item.op.toString(),'opLabel')"
                 v-model.trim="filterFormData[item.name]">
          </Input>

          <!-- 日期选择 -->
          <DatePicker v-if="item.elementType==='日期选择'"
                      v-model="filterFormData[item.name]"
                      type="date"
                      :placeholder="'当前操作符：'+getValueByKey(operatorList,'opKey',item.op.toString(),'opLabel')"
                      style="width:fit-content;min-width:160px">
          </DatePicker>

          <!-- 日期-时间选择 -->
          <DatePicker v-if="item.elementType==='日期-时间选择'"
                      v-model="filterFormData[item.name]"
                      type="datetime"
                      :placeholder="'当前操作符：'+getValueByKey(operatorList,'opKey',item.op.toString(),'opLabel')"
                      style="width:fit-content;min-width:160px">
          </DatePicker>

        </FormItem>
        <FormItem>
          <Button type="warning"
                  style="margin-right:10px"
                  :disabled="JSON.stringify(tableHeader) === '{}'"
                  @click="filterFormData={}">清空</Button>
          <Button type="primary"
                  style="margin-right:10px"
                  :disabled="JSON.stringify(tableHeader) === '{}'"
                  @click="submitFilter('filterFormData')">搜索</Button>
          <Button type="success"
                  :disabled="JSON.stringify(tableHeader) === '{}'"
                  @click="exportExcel">导出</Button>
        </FormItem>
      </Form>

      <!-- 表格 -->
      <table id="report"></table>
      <Table v-if="JSON.stringify(tableHeader) === '{}'"
             style="margin-bottom:10px"
             :columns="[]"
             :data="[]"
             no-data-text="未配置模板"></Table>
      <Table v-else
             border
             :style="{borderTop:JSON.stringify(tableHeader) === '{}'?'1px solid #e8eaec':'none'}"
             :show-header="false"
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

    </Card>
  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";
// mockData
import {
  mouldList, // 模板列表
  operatorList // 参数操作符列表
} from "./mould";
// function
import excel from "@/libs/excel";
import {
  getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
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
      spinShow: false,
      mouldList: mouldList, // 模板列表
      operatorList: operatorList, // 参数操作符列表
      getValueByKey: (array, queryKey, queryValue, getKey) => {
        return getValueByKey(array, queryKey, queryValue, getKey);
      }, // getValueByKey通用方法
      /* filterForm */
      paramListData: [], // 筛选数据 - 父组件传递
      filterFormData: {}, // 筛选数据 - 呈现在表单
      /* table */
      tableHeader: {}, // 表头数据
      tableData: [], // 页面要展示的数据
      tableDataOrg: [], // 原始数据
      tableColumns: [], // 表列项
      tableLoading: false,
      total: 0, // 总数
      pageNum: 1, // 页码
      pageSize: 10 // 每页显示数量
    };
  },
  mounted() {
    // 如果已配置表头且表格数据不为空 -> 监听屏幕缩放，动态设置表格列宽
    window.onresize = () => {
      return (() => {
        if (JSON.stringify(this.tableHeader) !== "{}") {
          const tableHeaderThArray = document
            .getElementById("report")
            .getElementsByTagName("thead")[0]
            .lastElementChild.getElementsByTagName("th");
          this.tableColumns.forEach((column, i) => {
            this.$set(
              column,
              "width",
              i === 0
                ? tableHeaderThArray[i].offsetWidth - 1
                : tableHeaderThArray[i].offsetWidth
            );
          });
        }
      })();
    };
  },
  created() {
    // console.log(this.$route);
    const pathArray = this.$route.path.split("/");
    const id = pathArray[pathArray.length - 1];
    this.$nextTick(() => {
      this.getData(id);
    });
  },
  methods: {
    // 数据初始化
    async getData(id) {
      this.rowId = id;
      this.filterFormData = {}; // 清空表单
      this.tableData = []; // 清空表格
      this.tableColumns = []; // 清空表列项
      document.getElementById("report").innerHTML = ""; // 清空动态表头
      if (!this.isMock) {
        /* 接口数据 */
        this.spinShow = true;
        // 动态表单
        this.paramListData =
          JSON.parse((await getReortConditionInfo(id)).data.data.condition) ||
          [];
        this.paramListData.forEach(item => {
          this.filterFormData[item.name] = item.defaultData;
        });
        // console.log(this.paramListData);

        // 动态多级表头 & 动态表列项 & 动态表数据
        const result = (await getReortHeaderInfo(id)).data.data;
        this.tableHeader = result.header;
        this.tableHeader =
          this.tableHeader !== null ? JSON.parse(this.tableHeader) : {};
        const field = result.field || [];
        if (JSON.stringify(this.tableHeader) === "{}") {
          // 未配置表头
          const tableHeaderCopy = JSON.parse(JSON.stringify(this.tableHeader));
          tableHeaderCopy["!ref"] = "'':''";
          this.headerHandle(tableHeaderCopy); // 处理空表头
          this.spinShow = false;
        } else {
          // 配置了表头
          this.headerHandle(this.tableHeader); // 处理表头
          const tableHeaderThArray = document
            .getElementById("report")
            .getElementsByTagName("thead")[0]
            .lastElementChild.getElementsByTagName("th");
          JSON.parse(field).forEach((item, i) => {
            this.tableColumns.push({
              title: item.title,
              key: item.name,
              align: "center",
              width:
                i === 0
                  ? tableHeaderThArray[i].offsetWidth - 1
                  : tableHeaderThArray[i].offsetWidth
            });
          }); // 生成表列项
          // console.log(this.tableColumns);
          this.submitFilter(); // 生成数据
          this.spinShow = false;
        }
      } else {
        /* mock数据 */
        // this.paramListData = param.paramList;
        this.paramListData = mouldList[0].paramList;
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
    },
    // 点击搜索
    async submitFilter() {
      Object.keys(this.filterFormData).forEach(key => {
        if (this.filterFormData[key] === "null") {
          this.filterFormData[key] = null;
        }
      });
      // console.log(this.filterFormData);
      this.tableLoading = true;
      const form = {
        id: this.rowId,
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
        condition: this.filterFormData
      };
      const result = (await getReportData(form)).data.data;
      this.tableData = result.pageData;
      this.total = result.dataCount;
      if (this.isMock) {
        this.tableDataOrg = (await getReportData(form)).data.data;
        this.refreshData();
      }
      this.tableLoading = false;
    },
    // 根据条件刷新数据
    refreshData() {
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
      this.submitFilter();
    },
    // 每页条数变化
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.submitFilter();
    },
    // 导出Excel
    exportExcel() {
      let keyMap = []; // 通过设置数组让导出时可以按顺序显示
      this.tableColumns.forEach(o => keyMap.push(o.key));
      let maxHeaderColTag = this.tableHeader["!ref"].split(":")[1];
      let headerRowCount = parseInt(maxHeaderColTag.replace(/[^0-9]/gi, ""));
      excel.xlsxUtils.setHeaderStyle(this.tableHeader);

      let data = excel.xlsxUtils.format2Sheet(
        this.tableData,
        0,
        headerRowCount,
        keyMap
      ); // 偏移3行按keyMap顺序转换

      let dataKeys = Object.keys(data);
      for (var k in this.tableHeader) data[k] = this.tableHeader[k]; // 追加列头

      let wbout = excel.xlsxUtils.format2WB(
        data,
        undefined,
        undefined,
        `A1:${dataKeys[dataKeys.length - 1]}`
      );

      let obj = excel.xlsxUtils.format2Blob(wbout);
      let fileName = "报表下载.xlsx";
      let tmpa = document.createElement("a");
      tmpa.download = fileName || "下载";
      tmpa.href = URL.createObjectURL(obj); // 绑定a标签
      tmpa.click(); // 模拟点击实现下载
      setTimeout(function() {
        // 延时释放
        URL.revokeObjectURL(obj); // 用URL.revokeObjectURL()来释放这个object URL
      }, 100);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
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
</style>
