<template>
  <div class="dooya-container">
    <Card>

      <!-- PDF -->
      <div class="pdf">
        <pdf ref="pdf"
             :src="pdfUrl"
             :page="pageNum"
             :rotate="pageRotate"
             @progress="loadedRatio = $event"
             @num-pages="pageTotalNum=$event"
             @error="pdfError($event)"
             @link-clicked="page = $event">
        </pdf>
      </div>

      <!-- 操作 -->
      <div style="margin: 10px 0;overflow: hidden">
        <div style="float: right;">
          <Button type="primary"
                  @click="prePage()"
                  style="margin-right:10px">上一页</Button>
          <Button type="primary"
                  @click="nextPage()">下一页</Button>
        </div>
      </div>

    </Card>
  </div>
</template>

<script>
// plugins
import pdf from "vue-pdf";
// functions
import config from "@/config";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? config.pdfUrl.dev
    : config.pdfUrl.pro;
// api

export default {
  components: { pdf },
  data() {
    return {
      pdfUrl: baseUrl + "/pdfs/06_Koa实战 - 鉴权.pdf",
      pageNum: 1,
      pageTotalNum: 1,
      pageRotate: 0,
      // 加载进度
      loadedRatio: 0,
      curPageNum: 0
    };
  },
  created() {
    this.pdfUrl = pdf.createLoadingTask(this.pdfUrl);
  },
  methods: {
    prePage() {
      var p = this.pageNum;
      p = p > 1 ? p - 1 : this.pageTotalNum;
      this.pageNum = p;
    },
    nextPage() {
      var p = this.pageNum;
      p = p < this.pageTotalNum ? p + 1 : 1;
      this.pageNum = p;
    },
    pdfError(error) {
      console.error(error);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    .ivu-card-body {
      padding: 10px;
      .pdf > span {
        width: 100%;
      }
    }
  }
}
</style>
