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
        <Upload action=""
                :before-upload="handleBeforeUpload"
                accept=".xls, .xlsx">
          <Button type="primary"
                  icon="ios-cloud-upload-outline"
                  :loading="uploadLoading"
                  @click="handleUploadFile">上传模板</Button>
        </Upload>
      </Row>
      <Row>
        <div class="ivu-upload-list-file"
             v-if="file !== null">
          <Icon type="ios-stats"></Icon>
          {{ file.name }}
          <Icon v-show="showRemoveFile"
                type="ios-close"
                class="ivu-upload-list-remove"
                @click.native="handleRemove()"></Icon>
        </div>
      </Row>
      <Row>
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
      </Row>

      <!-- tableHeader -->
      <Row style="margin-top:10px;overflow-x:auto;">
        <table id="example"></table>
        <Table v-if="JSON.stringify(tableHeader) === '{}'"
               :columns="[]"
               :data="[]"
               no-data-text="未配置模板"></Table>
      </Row>

      <!-- 操作 - 保存/取消 -->
      <div style="margin:20px 0 10px 0">
        <Button type="primary"
                @click="submitTableHeader">确定</Button>
        <Button type="warning"
                style="margin-left: 8px"
                @click="modalShow=false;showProgress=false;file=null">取消</Button>
      </div>

    </Modal>

  </div>
</template>

<script>
import Vue from "vue/dist/vue.esm.js";
// function
import excel from "@/libs/excel";

export default {
  name: "update-excel",
  data() {
    return {
      /* 全局 */
      rowId: "", // 当前行的id
      modalShow: false, // 是否显示
      /* update */
      uploadLoading: false, // loading
      progressPercent: 0, // 进度
      showProgress: false, // 是否显示进度条
      showRemoveFile: false, // 是否显示 "删除文件"
      file: null, // 上传的文件
      tableHeader: {} // 表头数据
    };
  },
  created() {
    // this.headerHandle();
  },
  methods: {
    // 显示配置参数弹框
    showModal(param) {
      console.log(param);
      this.getData(param);
      this.modalShow = true;
    },
    // 数据初始化
    getData(param) {
      // if (!this.isMock) {
      //   /* 接口数据 */
      // } else {
      /* mock数据 */
      this.tableHeader = param.tableHeader;
      console.log(this.tableHeader);
      if (JSON.stringify(this.tableHeader) === "{}") {
        const tableHeaderCopy = JSON.parse(JSON.stringify(this.tableHeader));
        tableHeaderCopy["!ref"] = "'':''";
        this.headerHandle(tableHeaderCopy);
      } else {
        this.headerHandle(this.tableHeader);
      }
      this.rowId = param.id;
      // this.refreshData();
      // }
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
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
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
        const data = e.target.result;
        this.tableHeader = excel.readMergeHeader(data, "array"); // 读取表头数据json
        // console.log(this.tableHeader);
        this.headerHandle(this.tableHeader);
      };
    },
    // 表头处理
    headerHandle(tableHeader) {
      // 生成原始表格Html
      let temp = excel.builderOriginalHtml(tableHeader["!ref"].split(":")[1]);
      // console.log(temp);

      // 生成Dom元素
      excel.builderHtml(tableHeader, temp);

      // 将生成的Html写入表格
      const tableDom = excel.writeToTable("example", temp);
      // console.log(tableDom);

      // 将tableDom对象转化成vue虚拟dom
      var oSerializer = new XMLSerializer();
      var tableStr = oSerializer.serializeToString(tableDom);
      var Profile = Vue.extend({
        template: `<table id="example">${tableStr}</table>`
      });
      // 创建实例，并挂载到元素上
      new Profile().$mount("#example");

      this.uploadLoading = false;
      this.showRemoveFile = true;
    },
    submitTableHeader() {
      this.$emit("submitTableHeader", {
        id: this.rowId,
        header: this.tableHeader
      });
      this.modalShow = false;
      this.showProgress = false;
      this.file = null;
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
}
</style>
