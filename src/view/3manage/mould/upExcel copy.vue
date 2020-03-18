<template>
  <div>

    <!-- Modal - 整体数据-->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           width="80%"
           title="配置模板">

      <Card title="导入EXCEL">
        <Row>
          <Upload action=""
                  :before-upload="handleBeforeUpload"
                  accept=".xls, .xlsx">
            <Button icon="ios-cloud-upload-outline"
                    :loading="uploadLoading"
                    @click="handleUploadFile">上传文件</Button>
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
      </Card>
      <Row class="margin-top-10">
        <Table :columns="tableTitle"
               :data="tableData"
               :loading="tableLoading"></Table>
      </Row>

    </Modal>

  </div>
</template>

<script>
import excel from "@/libs/excel";

export default {
  name: "update-excel",
  data() {
    return {
      /* 全局 */
      rowId: "", // 当前行的id
      modalShow: true, // 是否显示
      /* filterForm */
      paramListData: [], // 筛选数据 - 父组件传递
      filterFormData: {}, // 筛选数据 - 呈现在表单

      uploadLoading: false,
      progressPercent: 0,
      showProgress: false,
      showRemoveFile: false,
      file: null,
      tableData: [],
      tableTitle: [],
      tableLoading: false
    };
  },
  mounted() {},
  methods: {
    initUpload() {
      this.file = null;
      this.showProgress = false;
      this.loadingProgress = 0;
      this.tableData = [];
      this.tableTitle = [];
    },
    handleUploadFile() {
      this.initUpload();
    },
    handleRemove() {
      this.initUpload();
      this.$Message.info("上传的文件已删除！");
    },
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
        this.tableLoading = true;
        this.showProgress = true;
      };
      reader.onprogress = e => {
        this.progressPercent = Math.round((e.loaded / e.total) * 100);
      };
      reader.onerror = e => {
        this.$Message.error("文件读取出错");
      };
      reader.onload = e => {
        this.$Message.info("文件读取成功");
        const data = e.target.result;
        const { header, results } = excel.read(data, "array");
        const tableTitle = header.map(item => {
          return { title: item, key: item };
        });
        this.tableData = results;
        this.tableTitle = tableTitle;
        this.uploadLoading = false;
        this.tableLoading = false;
        this.showRemoveFile = true;
      };
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.v-transfer-dom /deep/ {
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
    color: #515a6e;
    border: 1px solid #515a6e;
  }
  .table thead tr th {
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
  }
  td,
  th {
    text-align: center;
    border: 1px solid #e8eaec;
  }
  /*tr:hover{*/
  /*background:#EBF7FF;*/
  /*}*/
  .table thead tr th,
  .table tbody tr td {
    padding: 0 10px;
  }
  .table tbody tr td {
    height: 48px;
  }
}
</style>
