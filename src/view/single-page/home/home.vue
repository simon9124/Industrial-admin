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

    <!-- 不合格原因 -->
    <Row :gutter="20">
      <!-- <ElectricSearch></ElectricSearch> -->
      <i-col :md="24"
             :xl="8">
        <Card shadow
              style="height:352px">
          <pieChart v-if="pieUnqalifiedReason.qc1.length!==0"
                    title="今日异常：综合检测"
                    :chartData="qc1PieData"
                    style="height: 320px;" />
          <!-- :legendData="pieUnqalifiedReason.qc1LegendData" -->
          <div v-else
               class="no-data">
            <div class="title">今日异常：综合检测</div>
            <div class="content">未检测异常</div>
          </div>
          <Select v-if="pieUnqalifiedReason.qc1.length>4"
                  v-model="qc1Selected"
                  multiple
                  @on-change="qc1SelectOnChange">
            <Option v-for="item in pieUnqalifiedReason.qc1"
                    :value="item.name"
                    :disabled="qc1Selected.length>=3"
                    :key="item.name">{{ item.name }}</Option>
          </Select>
        </Card>
      </i-col>
      <i-col :md="24"
             :xl="8">
        <Card shadow
              style="height:352px">
          <pieChart v-if="pieUnqalifiedReason.qc2.length!==0"
                    title="今日异常：静音检测"
                    :chartData="qc2PieData"
                    style="height: 320px;" />
          <!-- :legendData="pieUnqalifiedReason.qc2LegendData" -->
          <div v-else
               class="no-data">
            <div class="title">今日异常：静音检测</div>
            <div class="content">未检测异常</div>
          </div>
          <Select v-if="pieUnqalifiedReason.qc2.length>4"
                  v-model="qc2Selected"
                  multiple
                  @on-change="qc2SelectOnChange">
            <Option v-for="item in pieUnqalifiedReason.qc2"
                    :value="item.name"
                    :disabled="qc2Selected.length>=3"
                    :key="item.name">{{ item.name }}</Option>
          </Select>
        </Card>
      </i-col>
      <i-col :md="24"
             :xl="8">
        <Card shadow
              style="height:352px">
          <pieChart v-if="pieUnqalifiedReason.qc3.length!==0"
                    title="今日异常：外观检测"
                    :chartData="qc3PieData"
                    style="height: 320px;" />
          <!-- :legendData="pieUnqalifiedReason.qc3LegendData" -->
          <div v-else
               class="no-data">
            <div class="title">今日异常：外观检测</div>
            <div class="content">未检测异常</div>
          </div>
          <Select v-if="pieUnqalifiedReason.qc3.length>4"
                  v-model="qc3Selected"
                  multiple
                  @on-change="qc3SelectOnChange">
            <Option v-for="item in pieUnqalifiedReason.qc3"
                    :value="item.name"
                    :disabled="qc3Selected.length>=3"
                    :key="item.name">{{ item.name }}</Option>
          </Select>
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
import pieChart from "./pieChart.vue";
// functions
import { params } from "@/libs/params";
import { arraySort, addValueByKey, getValueByKey } from "@/libs/dataHanding";
// mockData
import { pieUnqalifiedReason } from "./mockData";
// api
import {
  getCurrentLineReport,
  unqualifiedReasonWithProductClass
} from "@/api/contrlCabin";

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
      lineNo: "", // 当前产线,
      /* 多选 */
      qc1Selected: [], // qc1被选择的项
      qc2Selected: [], // qc2被选择的项
      qc3Selected: [], // qc3被选择的项
      /* 饼图数据 */
      pieUnqalifiedReason: {
        qc1: [],
        qc2: [],
        qc3: [],
        qc1LegendData: [],
        qc2LegendData: [],
        qc3LegendData: []
      }, //  不合格原因 - 总
      qc1PieData: [], // qc1要呈现在饼图的数据
      qc2PieData: [], // qc2要呈现在饼图的数据
      qc3PieData: [] // qc3要呈现在饼图的数据
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
        const result = (await unqualifiedReasonWithProductClass()).data.data;
        if (result.qc1UnqualifiedReason.length !== 0) {
          result.qc1UnqualifiedReason.forEach(row => {
            this.$set(row, "value", row.value);
            this.$set(row, "name", row.key || "未归类");
            this.pieUnqalifiedReason.qc1LegendData.push(row.key || "未归类");
          });
        }
        if (result.qc2UnqualifiedReason.length !== 0) {
          result.qc2UnqualifiedReason.forEach(row => {
            this.$set(row, "value", row.value);
            this.$set(row, "name", row.key || "未归类");
            this.pieUnqalifiedReason.qc2LegendData.push(row.key || "未归类");
          });
        }
        if (result.qc3UnqualifiedReason.length !== 0) {
          result.qc3UnqualifiedReason.forEach(row => {
            this.$set(row, "value", row.value);
            this.$set(row, "name", row.key || "未归类");
            this.pieUnqalifiedReason.qc3LegendData.push(row.key || "未归类");
          });
        }
        this.pieUnqalifiedReason.qc1 = result.qc1UnqualifiedReason || [];
        this.pieUnqalifiedReason.qc2 = result.qc2UnqualifiedReason || [];
        this.pieUnqalifiedReason.qc3 = result.qc3UnqualifiedReason || [];
        // console.log(this.pieUnqalifiedReason);
      } else {
        /* mock数据 */
        this.pieUnqalifiedReason = pieUnqalifiedReason;
      }
      // 如果qc1或qc2或qc3的项数大于4
      if (this.pieUnqalifiedReason.qc1.length > 4) {
        this.pieUnqalifiedReason.qc1.sort(arraySort("value", "desc"));
        this.qc1Selected = [
          this.pieUnqalifiedReason.qc1[0].name,
          this.pieUnqalifiedReason.qc1[1].name,
          this.pieUnqalifiedReason.qc1[2].name
        ];
      } else {
        this.qc1PieData = this.pieUnqalifiedReason.qc1;
      }
      if (this.pieUnqalifiedReason.qc2.length > 4) {
        this.pieUnqalifiedReason.qc2.sort(arraySort("value", "desc"));
        this.qc2Selected = [
          this.pieUnqalifiedReason.qc2[0].name,
          this.pieUnqalifiedReason.qc2[1].name,
          this.pieUnqalifiedReason.qc2[2].name
        ];
      } else {
        this.qc2PieData = this.pieUnqalifiedReason.qc2;
      }
      if (this.pieUnqalifiedReason.qc3.length > 4) {
        this.pieUnqalifiedReason.qc3.sort(arraySort("value", "desc"));
        this.qc3Selected = [
          this.pieUnqalifiedReason.qc3[0].name,
          this.pieUnqalifiedReason.qc3[1].name,
          this.pieUnqalifiedReason.qc3[2].name
        ];
      } else {
        this.qc3PieData = this.pieUnqalifiedReason.qc3;
      }
    },
    // 封装：呈现给pieData的方法
    getPieData(selectArray, pieIndex) {
      switch (pieIndex) {
        case 1:
          this.qc1PieData = [];
          var addValue1 = 0;
          selectArray.forEach(select => {
            this.qc1PieData.push({
              value: getValueByKey(
                this.pieUnqalifiedReason.qc1,
                "name",
                select,
                "value"
              ),
              name: select
            });
            addValue1 += getValueByKey(
              this.pieUnqalifiedReason.qc1,
              "name",
              select,
              "value"
            );
          });
          var otherValue1 =
            addValueByKey(this.pieUnqalifiedReason.qc1, "value") - addValue1;
          this.qc1PieData.push({
            value: otherValue1,
            name: "其他"
          });
          break;
        case 2:
          this.qc2PieData = [];
          var addValue2 = 0;
          selectArray.forEach(select => {
            this.qc2PieData.push({
              value: getValueByKey(
                this.pieUnqalifiedReason.qc2,
                "name",
                select,
                "value"
              ),
              name: select
            });
            addValue2 += getValueByKey(
              this.pieUnqalifiedReason.qc2,
              "name",
              select,
              "value"
            );
          });
          var otherValue2 =
            addValueByKey(this.pieUnqalifiedReason.qc2, "value") - addValue2;
          this.qc2PieData.push({
            value: otherValue2,
            name: "其他"
          });
          break;
        case 3:
          this.qc3PieData = [];
          var addValue3 = 0;
          selectArray.forEach(select => {
            this.qc3PieData.push({
              value: getValueByKey(
                this.pieUnqalifiedReason.qc3,
                "name",
                select,
                "value"
              ),
              name: select
            });
            addValue3 += getValueByKey(
              this.pieUnqalifiedReason.qc3,
              "name",
              select,
              "value"
            );
          });
          var otherValue3 =
            addValueByKey(this.pieUnqalifiedReason.qc3, "value") - addValue3;
          this.qc3PieData.push({
            value: otherValue3,
            name: "其他"
          });
          break;
      }
    },
    // qc1选项发生变化
    qc1SelectOnChange(value) {
      this.qc1Selected = value;
      this.getPieData(this.qc1Selected, 1);
    },
    // qc2选项发生变化
    qc2SelectOnChange(value) {
      this.qc2Selected = value;
      this.getPieData(this.qc2Selected, 2);
    },
    // qc3选项发生变化
    qc3SelectOnChange(value) {
      this.qc3Selected = value;
      this.getPieData(this.qc3Selected, 3);
    }
  },
  watch: {
    qc1Selected: {
      handler(newVal, oldVal) {
        if (newVal.length === 0) {
          this.qc1Selected = [oldVal[0]];
          this.getPieData(this.qc1Selected, 1);
        }
      },
      deep: true
    },
    qc2Selected: {
      handler(newVal, oldVal) {
        if (newVal.length === 0) {
          this.qc2Selected = [oldVal[0]];
          this.getPieData(this.qc2Selected, 1);
        }
      },
      deep: true
    },
    qc3Selected: {
      handler(newVal, oldVal) {
        if (newVal.length === 0) {
          this.qc3Selected = [oldVal[0]];
          this.getPieData(this.qc3Selected, 1);
        }
      },
      deep: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .count-style {
    font-size: 50px;
  }
  .no-data {
    .title {
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: #516b91;
    }
    .content {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      line-height: 200px;
    }
  }
  .ivu-select {
    position: absolute;
    width: fit-content;
    min-width: 150px;
    left: 0;
    right: 0;
    margin: auto;
    top: 45px;
  }
  .chart-check-standard > div {
    canvas:not(:first-child) {
      top: 10px !important;
    }
  }
}
</style>
