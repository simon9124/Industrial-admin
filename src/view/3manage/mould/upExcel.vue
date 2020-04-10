<template>
  <div>
    <!-- Modal - 整体数据-->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           width="80%"
           title="配置模板">
      <!-- 操作  -->
      <Row>
        <Upload action
                :before-upload="handleBeforeUpload"
                accept=".xls, .xlsx">
          <Button type="primary"
                  icon="ios-cloud-upload-outline"
                  :loading="uploadLoading"
                  @click="handleUploadFile">上传模板</Button>
        </Upload>
      </Row>
      <!-- <Row>
        <div class="ivu-upload-list-file"
             v-if="file !== null">
          <Icon type="ios-stats"></Icon>
          {{ file.name }}
          <Icon v-show="showRemoveFile"
                type="ios-close"
                class="ivu-upload-list-remove"
                @click.native="handleRemove()"></Icon>
        </div>
      </Row>-->
      <!-- <Row>
        <transition name="fade">
          <Progress v-if="showProgress"
                    :percent="progressPercent"
                    :stroke-width="2">
            <div v-if="progressPercent == 100">
              <Icon type="ios-checkmark-circle"></Icon>
              <span>成功</span>
            </div>
          </Progress>
        </transition>
      </Row>-->

      <!-- tableHeader -->
      <Row style="margin-top:10px;overflow-x:auto;">
        <table id="example"></table>
        <Table v-if="JSON.stringify(tableHeader) === '{}'"
               style="margin-bottom:10px"
               :columns="[]"
               :data="[]"
               no-data-text="未配置模板"></Table>
      </Row>

      <!-- fieldForm -->
      <Form v-if="JSON.stringify(this.tableHeader) !== '{}'"
            :model="{}"
            inline
            label-position="right"
            @submit.native.prevent
            style="margin:20px 0 0 0">
        <FormItem v-for="(item,i) in fieldArrayData"
                  :key="i"
                  :label="item.title+'-'+item.colTag"
                  prop="name">
          <Input type="text"
                 v-model.trim="item.name"></Input>
        </FormItem>
      </Form>

      <!-- form -->
      <Form ref="formData"
            :model="formData"
            :rules="formRule"
            inline
            @submit.native.prevent
            style="margin:6px 0 0 0">
        <FormItem label="数据源类型"
                  prop="sourceType">
          <Select v-model="formData.sourceType"
                  placeholder="请选择"
                  style="width:200px">
            <Option v-for="(item,i) in sourceTypeList"
                    :value="item"
                    :key="i">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="分页查询"
                  prop="isPage">
          <Checkbox v-model="formData.isPage">isPage</Checkbox>
        </FormItem>
        <FormItem label="Sql语句"
                  prop="sourceSql"
                  style="display:block;margin-top:10px">
          <Input type="textarea"
                 style="width:600px"
                 :autosize="{minRows: 4,maxRows: 8}"
                 v-model.trim="formData.sourceSql"
                 placeholder="请输入"></Input>
        </FormItem>
        <FormItem label="排序规则"
                  prop="sourceOrder"
                  style="display:block;margin-top:20px">
          <Input type="textarea"
                 style="width:600px"
                 :autosize="{minRows: 4,maxRows: 8}"
                 v-model.trim="formData.sourceOrder"
                 placeholder="请输入"></Input>
        </FormItem>
      </Form>

      <!-- 操作 - 保存/取消 -->
      <div style="margin:20px 0 10px 0">
        <Button type="primary"
                @click="submitTableHeader"
                :loading="buttonLoading">确定</Button>
        <Button type="warning"
                style="margin-left: 8px"
                @click="modalShow=false;showProgress=false;file=null">取消</Button>
      </div>

      <!-- spin -->
      <Spin size="large"
            fix
            v-if="spinShow"></Spin>
    </Modal>
  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";
// mockData
import { sourceTypeList } from "./mould"; // 数据源类型
// function
import excel from "@/libs/excel";
import {
  setKeyFromTableHeader, // 根据上传后的原始数据，给表头最后一行（若被合并则同列向上找）每个label绑定key
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import {
  getReortHeaderInfo, // 根据id获取表头信息
  addOrEditReporSorceInfo // 更新表头信息
} from "@/api/mould";

export default {
  name: "update-excel",
  data() {
    return {
      /* 全局 */
      rowId: "", // 当前行的id
      modalShow: false, // 是否显示
      /* loading */
      spinShow: false,
      buttonLoading: false,
      /* update */
      uploadLoading: false, // loading
      progressPercent: 0, // 进度
      showProgress: false, // 是否显示进度条
      showRemoveFile: false, // 是否显示 "删除文件"
      file: null, // 上传的文件
      tableHeader: {}, // 表头数据
      fieldArrayData: [], // 筛选参数table
      sourceTypeList: sourceTypeList, // 数据源类型
      /* form */
      formData: {
        id: 0,
        sourceType: "",
        sourceOrder: "",
        isPage: false,
        sourceSql: ""
      }, // 表单数据
      formRule: {
        sourceType: [
          {
            required: true,
            message: "请选择数据源类型",
            trigger: "change"
          }
        ],
        sourceSql: [
          {
            required: true,
            message: "请输入sql语句",
            trigger: "change"
          }
        ]
      } // 表单规则
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
      if (!this.isMock) {
        /* 接口数据 */
        this.spinShow = true;
        this.formData = (await getReortHeaderInfo(param.id)).data.data;
        this.tableHeader =
          this.formData.header !== null ? JSON.parse(this.formData.header) : {};
        this.fieldArrayData =
          this.formData.field !== null ? JSON.parse(this.formData.field) : [];
      } else {
        /* mock数据 */
        this.tableHeader = param.tableHeader;
        this.fieldArrayData = param.field;
      }
      if (JSON.stringify(this.tableHeader) === "{}") {
        const tableHeaderCopy = JSON.parse(JSON.stringify(this.tableHeader));
        tableHeaderCopy["!ref"] = "'':''";
        this.headerHandle(tableHeaderCopy);
        this.$refs.formData.resetFields();
      } else {
        this.headerHandle(this.tableHeader);
      }
      this.spinShow = false;
    },
    // 上传初始化
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
    },
    // 上传
    handleUploadFile() {
      this.initUpload();
    },
    // 删除文件
    handleRemove() {
      this.initUpload();
      this.$Message.info("模板已删除！");
    },
    // 上传文件之前的钩子
    handleBeforeUpload(file) {
      const fileExt = file.name
        .split(".")
        .pop()
        .toLocaleLowerCase();
      if (fileExt === "xlsx" || fileExt === "xls") {
        this.readFile(file);
        this.file = file;
      } else {
        this.$Notice.warning({
          title: "文件类型错误",
          desc:
            "文件：" +
            file.name +
            "不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。"
        });
      }
      return false;
    },
    // 读取文件
    readFile(file) {
      //  let wb; // 读取完成的数据
      console.log(file);
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onloadstart = e => {
        this.uploadLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        this.$Message.info("上传成功");
        let data = e.target.result;
        this.tableHeader = excel.readMergeHeader(data, "binary");
        // console.log(this.tableHeader);
        this.headerHandle(this.tableHeader);
        this.headerField(this.tableHeader);
        this.uploadLoading = false;
        this.showRemoveFile = true;
      };
    },

    // const reader = new FileReader();
    // // reader.readAsArrayBuffer(file);
    // reader.readAsBinaryString(f);
    // reader.onloadstart = e => {
    //   this.uploadLoading = true;
    //   this.showProgress = true;
    // };
    // reader.onprogress = e => {
    //   this.progressPercent = Math.round((e.loaded / e.total) * 100);
    // };
    // reader.onerror = e => {
    //   this.$Message.error("文件读取出错");
    // };
    // reader.onload = e => {
    //   this.$Message.info("上传成功");
    //   const data = e.target.result;
    //   // this.tableHeader = excel.readMergeHeader(data, "array"); // 读取表头数据json
    //   // console.log(this.tableHeader);
    //   // this.headerHandle(this.tableHeader);
    //   // this.headerField(this.tableHeader);

    //   this.uploadLoading = false;
    //   this.showRemoveFile = true;
    // };
    // },
    // 表头处理
    headerHandle(tableHeader) {
      /* 1.生成原始表格Html */
      let temp = excel.builderOriginalHtml(tableHeader["!ref"].split(":")[1]);
      // console.log(temp);
      /* 2.生成Dom元素 */
      excel.builderHtml(tableHeader, temp);
      /* 3.将生成的Html写入表格 */
      const tableDom = excel.writeToTable("example", temp);
      // console.log(tableDom);
      /* 4.将tableDom对象转化成vue虚拟dom */
      var oSerializer = new XMLSerializer();
      var tableStr = oSerializer.serializeToString(tableDom);
      var Profile = Vue.extend({
        template: `<table id="example">${tableStr}</table>`
      });
      /* 5.创建实例，并挂载到元素上 */
      new Profile().$mount("#example");
    },
    // 表头处理 - 列对应关系 - 找到每列最下面的行 - 渲染成表单并处理
    headerField(tableHeader) {
      this.fieldArrayData = []; // 清空fieldArrayData
      const resultArray = setKeyFromTableHeader(tableHeader); // 获取表头末行的key(若合并则同列向上)
      // console.log(resultArray);
      resultArray.forEach(item => {
        this.fieldArrayData.push({
          title: tableHeader[item].v,
          name: "",
          colTag: item
        });
      });
    },
    // 提交modal - 表头、表头参数form、sql信息等
    async submitTableHeader() {
      // console.log(this.fieldArrayData);
      if (this.fieldArrayData.some(item => item.name.trim() === "")) {
        this.$Message.error("参数value未填写完整！");
      } else {
        this.$refs.formData.validate(async valid => {
          if (valid) {
            if (!this.isMock) {
              /* 接口数据 */
              this.formData.header = JSON.stringify(this.tableHeader);
              this.formData.field = this.fieldArrayData;
              // console.log(this.formData);
              this.$delete(this.formData, "condition");
              this.buttonLoading = true;
              const result = (await addOrEditReporSorceInfo(this.formData)).data
                .status;
              resultCallback(
                result,
                "配置成功！",
                () => {
                  this.modalShow = false;
                  this.showProgress = false;
                  this.file = null;
                  this.buttonLoading = false;
                },
                () => {
                  this.buttonLoading = false;
                }
              );
            } else {
              this.$emit("submitTableHeader", {
                id: this.rowId,
                header: this.tableHeader,
                field: this.fieldArrayData
              });
              this.modalShow = false;
              this.showProgress = false;
              this.file = null;
            }
          }
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.v-transfer-dom /deep/ {
  #example {
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
        width: 100px;
        padding-right: 10px;
      }
    }
  }
}
</style>
