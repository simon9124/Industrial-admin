<template>
  <div class="control-container"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <img class="control-container-header"
         src="@/assets/images/control/bg_top.png">

    <!-- 清除浮动 -->
    <table></table>

    <!-- title -->
    <div class="control-container-title">
      <h2 @click="backRouter">{{lineNo}}号产线</h2>
    </div>

    <!-- content -->
    <div class="control-container-inner">
      <Row :gutter="20">

        <!-- 左 -->
        <Col :xs="24"
             :sm="24"
             :md="8"
             :xl="6"
             class="col-left">

        <ul>
          <li v-for='(item,i) in lineCompletedRate'
              :key="i"
              class="col-block col-block-min"
              :style="{height:colBlockMinHeight}">
            <div class="col-block-title left">
              达成率：{{item.process}}
            </div>
            <div class="col-block-chart">
              <lineChart :style="{height:parseInt(colBlockMinHeight)-70+'px'}"
                         :chartData="item.chartData"
                         :standardValue="item.standardValue||80" />
            </div>
          </li>
        </ul>

        </Col>

        <!-- 中 -->
        <Col :xs="24"
             :sm="24"
             :md="16"
             :xl="12">
        <div class="col-block col-block-large"
             ref="colBlockLarge"
             :style="{height:colBlockLargeHeight}">
          <div class="col-block-title">
            产线总览
          </div>
          <div class="col-block-chart whole"
               :style="{height:parseInt(colBlockLargeHeight)-70+'px',
                        padding:screenHeight>900?'2% 0':'1% 0'}">

            <div v-for="(item,j) in lineProcessData"
                 :key="j"
                 class="MainBlock"
                 :style="{padding:screenHeight>1000?'20px 0':screenHeight>800?'10px 0':'0'}">

              <div class="MainBlock-title">{{item.process}}</div>

              <span class="MainBlock-title-block-small">检测数</span>
              <span class="MainBlock-title-block-huge">{{item.totalNum}}</span>
              <span class="MainBlock-title-block-small">台</span>
              <span class="MainBlock-title-block-small">/</span>
              <span class="MainBlock-title-block-small">良品数</span>
              <span class="MainBlock-title-block-huge">{{item.completeNum}}</span>
              <span class="MainBlock-title-block-small">台</span>

              <span class="MainBlock-title-block-small"></span>

              <span class="MainBlock-title-block"
                    style="vertical-align:bottom">
                <i-circle :percent="item.completeRate"
                          :stroke-color="item.completeRate===100?'#5cb85c':item.completeRate>=60?'#2db7f5':'#ff5500'"
                          :size="70"
                          style="margin-right:10px">
                  <span class="demo-Circle-inner"
                        style="font-size:1.2em;color:#fff">
                    <p style="line-height:1.3em">达成率</p>
                    {{item.completeRate}}%
                  </span>
                </i-circle>
                <i-circle :percent="item.qualifiedRate"
                          :stroke-color="item.qualifiedRate===100?'#5cb85c':item.qualifiedRate>=60?'#2db7f5':'#ff5500'"
                          :size="70">
                  <span class="demo-Circle-inner"
                        style="font-size:1.2em;color:#fff">
                    <p style="line-height:1.3em">良品率</p>
                    {{item.qualifiedRate}}%
                  </span>
                </i-circle>
              </span>

            </div>

          </div>
        </div>

        <Row :gutter="20">
          <Col :xs="24"
               :sm="24"
               :md="8"
               :xl="8">
          <div class="col-block col-block-min col-block-min-mid"
               :style="{height:colBlockMidHeight}">
            <div class="col-block-title">
              不合格原因：综合检测
            </div>
            <div class="col-block-chart">
              <pieChart :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}"
                        :chartData="pieUnqalifiedReason.qc1" />
            </div>

          </div>
          </Col>

          <Col :xs="24"
               :sm="24"
               :md="8"
               :xl="8">
          <div class="col-block col-block-min col-block-min-mid"
               :style="{height:colBlockMidHeight}">
            <div class="col-block-title">
              不合格原因：静音检测
            </div>
            <div class="col-block-chart">
              <pieChart :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}"
                        :chartData="pieUnqalifiedReason.qc2" />
            </div>

          </div>
          </Col>

          <Col :xs="24"
               :sm="24"
               :md="8"
               :xl="8">
          <div class="col-block col-block-min col-block-min-mid"
               :style="{height:colBlockMidHeight}">
            <div class="col-block-title">
              不合格原因：外观检测
            </div>
            <div class="col-block-chart">
              <pieChart :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}"
                        :chartData="pieUnqalifiedReason.qc3" />
            </div>

          </div>
          </Col>
        </Row>

        </Col>

        <!-- 右 -->
        <Col :xs="24"
             :sm="24"
             :md="24"
             :xl="6">
        <ul>
          <li v-for='(item,i) in lineQualifiedRate'
              :key="i"
              class="col-block col-block-min"
              :style="{height:colBlockMinHeight}">
            <div class="col-block-title left">
              良品率：{{item.process}}
            </div>
            <div class="col-block-chart">
              <lineChart :style="{height:parseInt(colBlockMinHeight)-70+'px'}"
                         :chartData="item.chartData"
                         :standardValue="item.standardValue||80" />
            </div>
          </li>
        </ul>
        </Col>

      </Row>
    </div>

  </div>
</template>

<script>
// functions
import { params } from "@/libs/params";
// components
import lineChart from "./lineChart.vue";
import pieChart from "./pieChart.vue";
// mockData
import {
  lineCompletedRate,
  lineQualifiedRate,
  lineProcessData,
  pieUnqalifiedReason
} from "./mockData";
// mqtt
import { mqtt, MQTT_SERVICE, options } from "@/libs/sysconstant.js";

export default {
  components: {
    lineChart,
    pieChart
  },
  data() {
    return {
      // 当前产线
      lineNo: "",
      /* 动态高度 */
      screenHeight: 0, // 屏幕
      colBlockMinHeight: "0px", // 左 & 右 - 达成率 & 良品率（每个）
      colBlockLargeHeight: "0px", // 中 - 检测总览
      colBlockMidHeight: "0px", // 中 - 生产任务 & 产线概况
      /* 页面数据 */
      lineCompletedRate: [
        {
          process: "综合检测",
          chartData: { xAxisData: [], seriesData: [] }
        },
        {
          process: "综合检测",
          chartData: { xAxisData: [], seriesData: [] }
        },
        {
          process: "综合检测",
          chartData: { xAxisData: [], seriesData: [] }
        }
      ], // 左 - 达成率
      lineQualifiedRate: [
        {
          process: "综合检测",
          chartData: { xAxisData: [], seriesData: [] }
        },
        {
          process: "综合检测",
          chartData: { xAxisData: [], seriesData: [] }
        },
        {
          process: "综合检测",
          chartData: { xAxisData: [], seriesData: [] }
        }
      ], // 右 - 良品率
      pieUnqalifiedReason: {}, // 中 - 不合格原因
      lineProcessData: [], // 中 - 检测总览,
      // mqtt服务
      client: null
    };
  },
  async mounted() {
    // 设置各组件高度
    this.getHeight();
    // 屏幕缩放
    window.onresize = () => {
      return (() => {
        this.getHeight();
      })();
    };
  },
  created() {
    if (this.$route.query.lineNo !== undefined) {
      // 如果是从车间进入
      this.lineNo = this.$route.query.lineNo;
    } else {
      // 如果是从菜单进入
      this.lineNo = params(this, "loginLineNo");
    }
    // 获取数据
    this.getData();
  },
  methods: {
    // 获取动态高度
    getHeight() {
      this.screenHeight = document.body.clientHeight;
      // const imgTitle = document.getElementsByClassName(
      //   "control-container-header"
      // )[0].clientHeight;
      const imgTitle = 80;

      this.colBlockMinHeight =
        (this.screenHeight - imgTitle - 40 - 60) / 3 + "px";
      this.colBlockLargeHeight =
        ((this.screenHeight - imgTitle - 40 - 40) * 2) / 3 + "px";
      this.colBlockMidHeight =
        ((this.screenHeight - imgTitle - 40 - 40) * 1) / 3 + "px";
    },
    async getData() {
      if (!this.isMock) {
        /* 非mock数据 */
        this.client = mqtt.connect(MQTT_SERVICE, options);

        // mqtt连接
        this.client.on("connect", e => {
          // 连接成功
          this.client.subscribe(
            `${this.lineNo}-ProductLine`,
            { qos: 1 },
            error => {
              if (!error) {
                // 订阅成功
              } else {
                // 订阅失败
              }
            }
          );
        });
        // 接收消息处理
        this.client.on("message", (topic, message) => {
          const msg = JSON.parse(message.toString());
          console.log(msg);
          // 产线总览
          const lineRateOverview = msg.LineRateOverview;
          this.lineProcessData = [
            {
              process: "检测结果",
              totalNum: lineRateOverview.QcSum,
              completeNum: lineRateOverview.QcQualified,
              completeRate:
                parseInt(lineRateOverview.QcCompleteRate * 10000) / 100,
              qualifiedRate:
                parseInt(lineRateOverview.QcQualifiedRate * 10000) / 100
            },
            {
              process: "综合检测",
              totalNum: lineRateOverview.Qc1Sum,
              completeNum: lineRateOverview.Qc1Qualified,
              completeRate:
                parseInt(lineRateOverview.Qc1CompleteRate * 10000) / 100,
              qualifiedRate:
                parseInt(lineRateOverview.Qc1QualifiedRate * 10000) / 100
            },
            {
              process: "静音检测",
              totalNum: lineRateOverview.Qc2Sum,
              completeNum: lineRateOverview.Qc2Qualified,
              completeRate:
                parseInt(lineRateOverview.Qc2CompleteRate * 10000) / 100,
              qualifiedRate:
                parseInt(lineRateOverview.Qc2QualifiedRate * 10000) / 100
            },
            {
              process: "外观检测",
              totalNum: lineRateOverview.Qc3Sum,
              completeNum: lineRateOverview.Qc3Qualified,
              completeRate:
                parseInt(lineRateOverview.Qc3CompleteRate * 10000) / 100,
              qualifiedRate:
                parseInt(lineRateOverview.Qc3QualifiedRate * 10000) / 100
            }
          ];
          // 不合格原因
          if (msg.Qc1UnqualifiedReason !== null) {
            msg.Qc1UnqualifiedReason.forEach(row => {
              this.$set(row, "value", row.Value);
              this.$set(row, "name", row.Key || "未知");
            });
          }
          if (msg.Qc2UnqualifiedReason !== null) {
            msg.Qc2UnqualifiedReason.forEach(row => {
              this.$set(row, "value", row.Value);
              this.$set(row, "name", row.Key || "未知");
            });
          }
          if (msg.Qc3UnqualifiedReason !== null) {
            msg.Qc3UnqualifiedReason.forEach(row => {
              this.$set(row, "value", row.Value);
              this.$set(row, "name", row.Key || "未知");
            });
          }
          this.pieUnqalifiedReason = {
            qc1: msg.Qc1UnqualifiedReason || [],
            qc2: msg.Qc2UnqualifiedReason || [],
            qc3: msg.Qc3UnqualifiedReason || []
          };
          // 达成率 & 良品率
          const Qc1CompleteData = { xAxisData: [], seriesData: [] };
          const Qc2CompleteData = { xAxisData: [], seriesData: [] };
          const Qc3CompleteData = { xAxisData: [], seriesData: [] };
          const Qc1QualifiedData = { xAxisData: [], seriesData: [] };
          const Qc2QualifiedData = { xAxisData: [], seriesData: [] };
          const Qc3QualifiedData = { xAxisData: [], seriesData: [] };
          if (msg.LineRateDetail !== null) {
            msg.LineRateDetail.forEach(row => {
              // 达成
              Qc1CompleteData.xAxisData.push(
                row.StartTime.substring(0, row.StartTime.length - 3)
              );
              Qc2CompleteData.xAxisData.push(
                row.StartTime.substring(0, row.StartTime.length - 3)
              );
              Qc3CompleteData.xAxisData.push(
                row.StartTime.substring(0, row.StartTime.length - 3)
              );
              Qc1CompleteData.seriesData.push(row.Qc1CompleteRate * 100);
              Qc2CompleteData.seriesData.push(row.Qc2CompleteRate * 100);
              Qc3CompleteData.seriesData.push(row.Qc3CompleteRate * 100);
              // 良品
              Qc1QualifiedData.xAxisData.push(
                row.StartTime.substring(0, row.StartTime.length - 3)
              );
              Qc2QualifiedData.xAxisData.push(
                row.StartTime.substring(0, row.StartTime.length - 3)
              );
              Qc3QualifiedData.xAxisData.push(
                row.StartTime.substring(0, row.StartTime.length - 3)
              );
              Qc1QualifiedData.seriesData.push(row.Qc1QualifiedRate * 100);
              Qc2QualifiedData.seriesData.push(row.Qc2QualifiedRate * 100);
              Qc3QualifiedData.seriesData.push(row.Qc3QualifiedRate * 100);
            });
            const standardValue =
              parseInt(msg.LineRateDetail[0].CompleteRateTask * 10000) / 100;
            this.lineCompletedRate = [
              {
                process: "综合检测",
                chartData: Qc1CompleteData,
                standardValue: standardValue
              },
              {
                process: "静音检测",
                chartData: Qc2CompleteData,
                standardValue: standardValue
              },
              {
                process: "外观检测",
                chartData: Qc3CompleteData,
                standardValue: standardValue
              }
            ];
            this.lineQualifiedRate = [
              {
                process: "综合检测",
                chartData: Qc1QualifiedData,
                standardValue: standardValue
              },
              {
                process: "静音检测",
                chartData: Qc2QualifiedData,
                standardValue: standardValue
              },
              {
                process: "外观检测",
                chartData: Qc3QualifiedData,
                standardValue: standardValue
              }
            ];
          }
        });
        // 断开发起重连
        // this.client.on("reconnect", error => {
        //   console.log("正在重连:", error);
        // });
        // 链接异常处理
        // this.client.on("error", error => {
        //   console.log("连接失败:", error);
        // });
      } else {
        /* mock数据 */
        this.lineCompletedRate = lineCompletedRate;
        this.lineQualifiedRate = lineQualifiedRate;
        this.pieUnqalifiedReason = pieUnqalifiedReason;
        this.lineProcessData = lineProcessData;
      }
    },
    // 返回上一页
    backRouter() {
      if (!this.isMock) this.client.end();
      this.$router.go(-1);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./control.scss";
</style>
