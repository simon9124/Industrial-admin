<template>
  <div class="dooya-container">

    <!-- count -->
    <Row :gutter="20">
      <i-col :xs="12"
             :md="12"
             :lg="6"
             v-for="(infor, i) in inforCardData"
             :key="`infor-${i}`"
             style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow
                    :color="infor.color"
                    :icon="infor.icon"
                    :icon-size="36">
          <count-to :end="infor.count"
                    count-class="count-style" />
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>

    <!-- charts -->
    <Row :gutter="20"
         style="margin-top: 10px;">
      <i-col :md="24"
             :lg="8"
             style="margin-bottom: 20px;">
        <Card shadow>
          <qualification-rate-today style="height: 320px;"></qualification-rate-today>
        </Card>
      </i-col>
      <!-- <i-col :md="24"
             :lg="8"
             style="margin-bottom: 20px;">
        <Card shadow>
          <check-standard class='chart-check-standard'
                          style="height: 320px;"></check-standard>
        </Card>
      </i-col> -->
      <!-- <i-col :md="24"
             :lg="8"
             style="margin-bottom: 20px;">
        <Card shadow>
          <product-sumWeek style="height: 320px;"></product-sumWeek>
        </Card>
      </i-col> -->
      <i-col :md="24"
             :lg="16"
             style="margin-bottom: 20px;">
        <Card shadow>
          <qualification-rate-month style="height: 320px;"></qualification-rate-month>
        </Card>
      </i-col>
    </Row>

    <!-- table -->
    <Row :gutter="20">
      <!-- <ElectricSearch></ElectricSearch> -->
      <i-col :md="24"
             :lg="8">
        <Card shadow
              v-if="pieUnqalifiedReason.qc1.length!==0">
          <div class="col-block-title"
               style="text-align:center;color:#516b91;font-weight:bold;font-size:18px">
            不合格原因：综合检测
          </div>
          <pieChart :chartData="pieUnqalifiedReason.qc1"
                    style="height: 300px;" />
        </Card>
      </i-col>
      <i-col :md="24"
             :lg="8">
        <Card shadow
              v-if="pieUnqalifiedReason.qc2.length!==0">
          <div class="col-block-title"
               style="text-align:center;color:#516b91;font-weight:bold;font-size:18px">
            不合格原因：静音检测
          </div>
          <pieChart :chartData="pieUnqalifiedReason.qc2"
                    style="height: 300px;" />
        </Card>
      </i-col>
      <i-col :md="24"
             :lg="8">
        <Card shadow
              v-if="pieUnqalifiedReason.qc2.length!==0">
          <div class="col-block-title"
               style="text-align:center;color:#516b91;font-weight:bold;font-size:18px">
            不合格原因：外观检测
          </div>
          <pieChart :chartData="pieUnqalifiedReason.qc2"
                    style="height: 300px;" />
        </Card>
      </i-col>

    </Row>

  </div>
</template>

<script>
import InforCard from "_c/info-card";
import CountTo from "_c/count-to";
import CheckStandard from "./checkStandard.vue";
import ProductSum from "./productSum.vue";
import QualificationRateToday from "./qualificationRateToday.vue";
import QualificationRateMonth from "./qualificationRateMonth.vue";
import Example from "./example.vue";
import ElectricSearch from "@/view/2systemManage/electricSearch";
// functions
import { params } from "@/libs/params";
// mockData
import { pieUnqalifiedReason } from "./mockData";
// components
import pieChart from "@/view/6inspector/pieChart.vue";
// api
import { getCurrentLineReport } from "@/api/contrlCabin";
// mqtt
import { mqtt, MQTT_SERVICE, options } from "@/libs/sysconstant.js";

export default {
  name: "home",
  components: {
    InforCard,
    CountTo,
    Example,
    ProductSum,
    CheckStandard,
    QualificationRateToday,
    QualificationRateMonth,
    ElectricSearch,
    pieChart
  },
  data() {
    return {
      inforCardData: [
        {
          title: "今日检测",
          icon: "ios-build",
          count: 0,
          color: "#2d8cf0"
        },
        {
          title: "本周检测",
          icon: "ios-build-outline",
          count: 0,
          color: "#19be6b"
        },
        {
          title: "本月检测",
          icon: "md-build",
          count: 0,
          color: "#ff9900"
        },
        // { title: '合格率', icon: 'md-share', count: 92, color: '#ed3f14' },
        {
          title: "本季检测",
          icon: "md-hand",
          count: 0,
          color: "#E46CBB"
        }
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ],
      lineNo: "", // 当前产线
      pieUnqalifiedReason: {
        qc1: [],
        qc2: [],
        qc3: []
      } //  不合格原因
    };
  },
  async mounted() {
    if (!this.isMock) {
      // 本日
      var sumDay = (await getCurrentLineReport("day")).data.data.total;

      // 本周
      var sumWeek = (await getCurrentLineReport("week")).data.data.total;

      // 本月
      var sumMonth = (await getCurrentLineReport("month")).data.data.total;

      // 本季
      var sumSeason = (await getCurrentLineReport("season")).data.data.total;

      this.inforCardData[0].count = sumDay;
      this.inforCardData[1].count = sumWeek;
      this.inforCardData[2].count = sumMonth;
      this.inforCardData[3].count = sumSeason;
    }
  },
  created() {
    this.lineNo = params(this, "loginLineNo");
    // 获取数据
    this.getData();
  },
  methods: {
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
        this.pieUnqalifiedReason = pieUnqalifiedReason;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .count-style {
    font-size: 50px;
  }
  .chart-check-standard > div {
    canvas:not(:first-child) {
      top: 10px !important;
    }
  }
}
</style>
