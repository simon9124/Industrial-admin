<template>
  <div class="dooya-container">
    <Card>

      <!-- 回显PDF文件：派发过任务，且文件名称无误 -->
      <Tabs v-if="!noPDF"
            @on-click="tabSelect">
        <TabPane v-for="tab in tabList"
                 :key="tab.id"
                 :label="tab.typeName"
                 :name="tab.id">

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
          <div v-if="pageTotalNum>1"
               style="margin: 10px 0;overflow: hidden">
            <div style="float: right;">
              <Button type="primary"
                      :disabled="pageNum===1"
                      @click="prePage()"
                      style="margin-right:10px">上一页</Button>
              <Button type="primary"
                      :disabled="pageNum===pageTotalNum"
                      @click="nextPage()">下一页</Button>
            </div>
          </div>

        </TabPane>
      </Tabs>

      <!-- 不回显PDF文件：未派发过任务；护着派发过任务但文件名有误 -->
      <div v-if="noPDF"
           style="font-size:16px;margin:10px">当前没有进行任务的SOP或SOP名称错误，请先进行任务派发
      </div>

    </Card>
  </div>
</template>

<script>
// mockData
import { tabList } from "./mockData"; // 顶部tab列表
// plugins
import pdf from "vue-pdf"; // 插件
// functions
import config from "@/config"; // 全局变量
import { getValueByKey } from "@/libs/dataHanding"; // 根据对象数组某个key的value，查询另一个key的value
// api
import {
  getSopTagFilteByEquipment, // 可派发任务的SOP的级联选择
  // getAllEquipmentFunctype, // 获取顶部标签
  getLineSn // 获取任务
} from "@/api/process";

export default {
  components: { pdf },
  data() {
    return {
      /* 全局 */
      tabList: [], // 顶部tab列表
      /* pdf相关 */
      baseUrl:
        process.env.NODE_ENV === "development"
          ? config.pdfUrl.dev
          : config.pdfUrl.pro,
      pdfUrl: "", // pdf的url
      pageNum: 1, // 当前页码
      pageTotalNum: 1, // 总页数
      pageRotate: 0,
      loadedRatio: 0, // 加载进度
      noPDF: false, // 没有文件
      /* 任务 */
      qc1Sop: "",
      qc1SopTag: "",
      qc1List: [],
      qc2Sop: "",
      qc2SopTag: "",
      qc2List: []
    };
  },
  async created() {
    /* 接口数据：根据任务id，判断是否已派发任务 */
    const result = await getLineSn();
    this.distributed = result.data.data !== null;
    if (this.distributed) {
      // 分别获取qc1、qc2的SOP值
      this.qc1Sop = result.data.data.qc1Sop;
      this.qc2Sop = result.data.data.qc2Sop;
      // 分别获取qc1、qc2的下拉框
      this.qc1List =
        (await getSopTagFilteByEquipment("", "", "1")).data.data || [];
      this.qc2List =
        (await getSopTagFilteByEquipment("", "", "2")).data.data || [];
      // 分别获取qc1、qc2的SOP的Tag值
      this.qc1SopTag = getValueByKey(
        getValueByKey(this.qc1List, "label", this.qc1Sop, "children"),
        "value",
        result.data.data.qc1SopTagId,
        "label"
      );
      this.qc2SopTag = getValueByKey(
        getValueByKey(this.qc2List, "label", this.qc2Sop, "children"),
        "value",
        result.data.data.qc2SopTagId,
        "label"
      );
      // 获取顶部标签
      this.getTabList();
    } else {
      this.noPDF = true;
    }
  },
  methods: {
    // 获取顶部标签列表
    async getTabList() {
      // this.tabList = !this.isMock
      //   ? (await getAllEquipmentFunctype()).data.data
      //   : tabList;
      this.tabList = tabList;
      this.tabList.forEach(tab => {
        this.$set(tab, "id", tab.id.toString());
      });
      // 自动选择第一个标签
      if (this.tabList.length !== 0) {
        this.tabSelect(this.tabList[0].id);
      }
    },
    // 顶部tab被选择
    tabSelect(name) {
      this.tabSelected = name;
      this.getPDF(name);
    },
    // 加载pfd文件
    getPDF(name) {
      switch (name) {
        case "1":
          this.pdfUrl =
            this.baseUrl +
            "/pdfs/" +
            this.tabSelected +
            "/" +
            this.qc1Sop +
            this.qc1SopTag +
            ".pdf";
          this.pdfUrl = pdf.createLoadingTask(this.pdfUrl);
          break;
        case "2":
          this.pdfUrl =
            this.baseUrl +
            "/pdfs/" +
            this.tabSelected +
            "/" +
            this.qc2Sop +
            this.qc2SopTag +
            ".pdf";
          this.pdfUrl = pdf.createLoadingTask(this.pdfUrl);
          break;
        case "3":
          this.pdfUrl =
            this.baseUrl +
            "/pdfs/" +
            this.tabSelected +
            "/" +
            "JS-9-1.215交流管状电机外观检查" +
            ".pdf";
          this.pdfUrl = pdf.createLoadingTask(this.pdfUrl);
          break;
      }
    },
    // 上一页
    prePage() {
      var p = this.pageNum;
      p = p > 1 ? p - 1 : this.pageTotalNum;
      this.pageNum = p;
    },
    // 下一页
    nextPage() {
      var p = this.pageNum;
      p = p < this.pageTotalNum ? p + 1 : 1;
      this.pageNum = p;
    },
    // pdf加载失败回调
    pdfError() {
      this.noPDF = true;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    min-height: calc(100vh - 120px);
    .ivu-card-body {
      padding: 10px;
      .pdf > span {
        width: 100%;
      }
    }
  }
}
</style>
