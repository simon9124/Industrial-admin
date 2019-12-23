<template>
  <div class="control-container"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- <img class="control-container-bg"
         src="@/assets/images/true.png"> -->
    <img class="control-container-header"
         src="@/assets/images/control/bg_top.png">

    <!-- 清除浮动 -->
    <table></table>

    <!-- title -->
    <div class="title">
      <h2>检测驾驶舱</h2>
    </div>

    <div class="control-container-inner">
      <Row :gutter="20">

        <!-- 左 -->
        <Col :xs="24"
             :sm="24"
             :lg="6">
        <div class="col-block col-block-min col-block-min-left1"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title left1">
            检测总数趋势图
          </div>
          <div class="col-block-chart">
            <div class="col-block-chart-tag">
              <Tag :color="selectTagHistoryTask==='day'?'primary':'default'"
                   :fade="false">近7日统计</Tag>
              <!-- @click.native="selectTagHistoryTask='day'" -->
              <!-- <Tag :color="selectTagHistoryTask==='week'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTask='week'">周统计</Tag> -->
              <!-- <Tag :color="selectTagHistoryTask==='month'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTask='month'">月统计</Tag> -->
            </div>
            <history-task :style="{height:colBlockMinHeight}"
                          :selectTagHistoryTask="selectTagHistoryTask"
                          :chartData="chartData" />
          </div>
        </div>
        <div class="col-block col-block-min col-block-min-left2"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title left2">
            一次合格率趋势图
          </div>
          <div class="col-block-chart">
            <div class="col-block-chart-tag">
              <Tag :color="selectTagOneTimePass==='day'?'primary':'default'"
                   :fade="false">近7日统计</Tag>
              <!-- @click.native="selectTagOneTimePass='day'" -->
              <!-- <Tag :color="selectTagOneTimePass==='week'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagOneTimePass='week'">周统计</Tag> -->
              <!-- <Tag :color="selectTagOneTimePass==='month'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagOneTimePass='month'">月统计</Tag> -->
            </div>
            <history-task-pass :style="{height:colBlockMinHeight}"
                               :selectTagOneTimePass="selectTagOneTimePass"
                               :chartData="chartData" />
          </div>
        </div>
        <div class="col-block col-block-min col-block-min-left3"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title left3">
            不合格数趋势图
          </div>
          <div class="col-block-chart-tag">
            <Tag :color="selectTagNoPass==='day'?'primary':'default'"
                 :fade="false">近7日统计</Tag>
            <!-- @click.native="selectTagNoPass='day'" -->
            <!-- <Tag :color="selectTagNoPass==='week'?'success':'default'"
                 :fade="false"
                 @click.native="selectTagNoPass='week'">周统计</Tag> -->
            <!-- <Tag :color="selectTagNoPass==='month'?'warning':'default'"
                 :fade="false"
                 @click.native="selectTagNoPass='month'">月统计</Tag> -->
          </div>
          <div class="col-block-chart">
            <history-task-not-pass :style="{height:colBlockMinHeight}"
                                   :selectTagNoPass="selectTagNoPass"
                                   :chartData="chartData" />
          </div>
        </div>
        </Col>

        <!-- 中 -->
        <Col :xs="24"
             :sm="24"
             :lg="12">
        <div class="col-block col-block-large"
             ref="colBlockLarge"
             :style="{height:colBlockLargeHeight}">
          <div class="col-block-title mid1">
            今日检测总览
          </div>
          <div class="col-block-chart">
            <div class="MainBlock">
              <div class="MainBlock-title">
                <div class="MainBlock-title-block">
                  <span class="MainBlock-title-block-small">今日累计检测</span>
                  <span class="MainBlock-title-block-huge"
                        v-for="(num,i) in todayTotalNum.toString().split('')"
                        :key="i">{{num}}</span>
                  <!-- <span class="MainBlock-title-block-huge">4</span>
                  <span class="MainBlock-title-block-huge">6</span>
                  <span class="MainBlock-title-block-huge">0</span>
                  <span class="MainBlock-title-block-huge">0</span> -->
                  <span class="MainBlock-title-block-small">台</span>
                </div>
              </div>
              <div class="MainBlock-txt"
                   :style="{height:mainBlockTxtHeight}">
                <Col :span="15"
                     :style="{height:mainBlockTxtHeight,position:'relative',top:'-5%'}">
                <div :style="{height:tableBlockHeight,position:'absolute',top:0,bottom:0,left:'10%',right:0,margin:'auto'}">
                  <div class="MainBlock-txt-table-header">生产目标</div>
                  <table :style="{height:tableHeight}">
                    <thead>
                      <tr>
                        <!-- <th>生产系列</th> -->
                        <th>生产线</th>
                        <th>产品型号</th>
                        <!-- <th>生产任务</th> -->
                      </tr>
                    </thead>
                    <tbody :style="{height:tableHeight}">
                      <tr v-for="item in proTarget"
                          :key="item.lineNo"
                          :style="{height:parseInt(tableHeight)/proTarget.length+'px',
                                   minHeight:'22px'}">
                        <td>{{item.lineNo}} #产线</td>
                        <td>{{item.productClass}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </Col>
                <!-- <Col :span="7"
                     style="position:absolute;left:42%;margin:auto">
                <today-task-get :style="{height:circleChartHeight,position:'absolute',width:'100%'}"
                                :circleChartHeight="circleChartHeight"
                                txt="任务达成率"
                                num='95.83' />
                </Col> -->
                <Col :span="7"
                     style="position:absolute;left:42%">
                <today-task-get :style="{height:circleChartHeight,position:'absolute',width:'100%',left:'90%'}"
                                :circleChartHeight="circleChartHeight"
                                txt="一次合格率"
                                :num="todayPassRate" />
                </Col>
              </div>
            </div>
          </div>
        </div>
        <div class="col-block col-block-min col-block-min-mid2"
             :style="{height:colBlockMidHeight}">
          <div class="col-block-title mid2">
            今日不合格产品概况
          </div>
          <div class="col-block-txt">
            <!-- 电机不合格数：138件 -->
            电机不合格数：{{todayNotPass}}件
          </div>

          <!-- left -->
          <Col :span="12">
          <div class="col-block-chart">
            <div class="txt-title">
              检测步骤分布
            </div>
            <today-task-not-pass :style="{height:colBlockMidChartHeight}"
                                 :selectTagNoPass="selectTagNoPass" />
          </div>
          </Col>

          <!-- right -->
          <Col :span="12">
          <div class="col-block-chart">
            <div class="txt-title">
              一次合格率
            </div>
            <!-- <today-task-not-pass-pro :style="{height:colBlockMidChartHeight}"
                                     :selectTagNoPass="selectTagNoPass" /> -->
            <today-rank :style="{height:colBlockMidChartHeight}"
                        selectTagTodayPass="once"
                        :todayRank="todayRank" />
          </div>
          </Col>

        </div>
        </Col>

        <!-- 右 -->
        <Col :xs="24"
             :sm="24"
             :lg="6">
        <div class="col-block col-block-min col-block-min-right1"
             :style="{height:colBlockRightMinHeight2}">
          <div class="col-block-title right1">
            今日各产线概况
          </div>
          <div class="col-block-chart">
            <img src="~@/assets/images/control/zuoyi.png"
                 class="img-title">
            <Row class="col-block-chart-row"
                 :gutter="15"
                 :style="{height:parseInt(colBlockRightMinHeight2)-48+'px',padding:'0 10px'}">
              <!-- style="padding:0 10px" -->
              <Col :span="12"
                   class="col-block-chart-box"
                   v-for="(pro,i) in todayPro"
                   :key="i">
              <div class="BoxWrap"
                   :style="{height:proBlockHeight}">
                <div class="horn">
                  <div class="lt"></div>
                  <div class="rt"></div>
                  <div class="rb"></div>
                  <div class="lb"></div>
                </div>
                <div class="BoxWrap-title">
                  {{pro.lineNo}}# 生产线
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{pro.total}}件
                  </p>
                  <p>
                    测量总数
                  </p>
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{pro.qualifiedRate}}%
                  </p>
                  <p>
                    一次合格率
                  </p>
                </div>
              </div>
              </Col>

            </Row>

          </div>
        </div>
        <!-- <div class="col-block col-block-min col-block-min-right2"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title right3">
            今日产线排名
          </div>
          <div class="col-block-chart">
            <div class="col-block-chart-tag">
              <Tag :color="selectTagTodayPass==='task'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagTodayPass='task'">任务达成率</Tag>
              <Tag :color="selectTagTodayPass==='once'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagTodayPass='once'">一次合格率</Tag>
            </div>
            <today-rank :style="{height:colBlockMinHeight}"
                        :selectTagTodayPass="selectTagTodayPass" />
          </div>
        </div> -->
        </Col>

      </Row>
    </div>

    <!-- buttons -->
    <Button style="position:absolute;left:20px;top:10px;padding:5px 10px"
            icon="md-arrow-back"
            type="primary"
            @click="backRouter">返回</Button>
    <!-- <Button style="position:absolute;right:20px;top:10px;padding:5px 10px"
            icon="md-arrow-forward"
            type="primary"
            @click="toOperationPage">检测操作行为分析</Button> -->
    <!-- <Button style="position:absolute;left:20px;top:10px;padding:5px 10px"
            icon="md-arrow-back"
            type="primary"
            @click="toElectricSearch">电机检测管理</Button> -->

  </div>
</template>

<script>
// components
import historyTask from "./historyTask.vue";
import historyTaskPass from "./historyTaskPass.vue";
import historyTaskNotPass from "./historyTaskNotPass.vue";
import todayTaskNotPass from "./todayTaskNotPass.vue";
import todayTaskNotPassPro from "./todayTaskNotPassPro.vue";
import historyExamineWhole from "./historyExamineWhole.vue";
import todayTaskGet from "./todayTaskGet.vue";
import todayRank from "./todayRank.vue";
// api
import {
  findTotalByDate,
  findActiveProductCalss,
  getDateTotalByLineNo,
  getDateQualifiedRateByLineNo,
  getCurrentLineReport
} from "@/api/contrlCabin";

export default {
  components: {
    historyTask,
    historyTaskPass,
    historyTaskNotPass,
    todayTaskNotPass,
    todayTaskNotPassPro,
    historyExamineWhole,
    todayTaskGet,
    todayRank
  },
  data() {
    return {
      // 动态高度
      screenHeight: 0,
      colBlockLargeHeight: "0px",
      colBlockMinHeight: "0px",
      colBlockMidHeight: "0px",
      colBlockMidChartHeight: "0px",
      colBlockRightMinHeight2: "0px",
      proBlockHeight: "0px",
      boxWrapBlockHeight: "0px",
      mainBlockTxtHeight: "0px",
      tableBlockHeight: "0px",
      tableHeight: "0px",
      circleChartHeight: "0px",
      // tags
      selectTagHistoryTask: "day",
      selectTagOneTimePass: "day",
      selectTagNoPass: "day",
      selectTagTodayPass: "task",
      // 今日总览
      todayTotalNum: 4600,
      todayNotPass: 0,
      todayPassRate: "97.00",
      // 今日各产线
      todayPro: [
        {
          lineNo: 20,
          total: "",
          passNum: ""
        },
        {
          lineNo: 21,
          total: "",
          passNum: ""
        },
        {
          lineNo: 22,
          total: "",
          passNum: ""
        },
        {
          lineNo: 23,
          total: "",
          passNum: ""
        },
        {
          lineNo: 24,
          total: "",
          passNum: ""
        },
        {
          lineNo: 25,
          total: "",
          passNum: ""
        },
        {
          lineNo: 26,
          total: "",
          passNum: ""
        },
        {
          lineNo: 27,
          total: "",
          passNum: ""
        },
        {
          lineNo: 28,
          total: "",
          passNum: ""
        },
        {
          lineNo: 29,
          total: "",
          passNum: ""
        },
        {
          lineNo: 30,
          total: "",
          passNum: ""
        },
        {
          lineNo: 31,
          total: "",
          passNum: ""
        },
        {
          lineNo: 32,
          total: "",
          passNum: ""
        },
        {
          lineNo: 33,
          total: "",
          passNum: ""
        },
        {
          lineNo: 34,
          total: "",
          passNum: ""
        },
        {
          lineNo: 35,
          total: "",
          passNum: ""
        },
        {
          lineNo: 36,
          total: "",
          passNum: ""
        },
        {
          lineNo: 37,
          total: "",
          passNum: ""
        },
        {
          lineNo: 38,
          total: "",
          passNum: ""
        },
        {
          lineNo: 39,
          total: "",
          passNum: ""
        },
        {
          lineNo: 40,
          total: "",
          passNum: ""
        },
        {
          lineNo: 41,
          total: "",
          passNum: ""
        }
      ],
      // 驾驶舱数据
      chartData: {
        name: [],
        qualified: [],
        qualifiedRate: [],
        total: [],
        unqualified: [],
        unqualifiedRate: []
      },
      // 一次合格率数据
      todayRank: {},
      // 生产目标数据
      proTarget: [
        // {
        //   lineNo: 22,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 23,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 24,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 25,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 26,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 27,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 28,
        //   productClass: 'DM35R-3/28'
        // },
        // {
        //   lineNo: 29,
        //   productClass: 'DM35R-3/28'
        // }
      ]
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
    // 获取数据
    this.getData();
  },
  methods: {
    // 获取动态高度
    getHeight() {
      this.screenHeight = document.body.clientHeight;
      this.colBlockMinHeight =
        (this.screenHeight - 40 - 16 * 2 - 20 * 2 - 40 - 10 - 50 * 2) / 3 +
        "px";
      this.colBlockLargeHeight =
        this.screenHeight -
        40 -
        16 * 2 -
        20 * 2 -
        40 -
        10 -
        parseInt(this.colBlockMinHeight) -
        150 +
        "px";
      this.colBlockMidHeight =
        this.screenHeight -
        40 -
        16 * 2 -
        20 * 2 -
        40 -
        10 -
        parseInt(this.colBlockLargeHeight) -
        50 +
        "px";
      this.colBlockMidChartHeight =
        parseInt(this.colBlockMidHeight) - 60 + "px";
      this.colBlockRightMinHeight =
        this.screenHeight -
        40 -
        16 * 2 -
        20 * 2 -
        40 -
        10 -
        parseInt(this.colBlockMinHeight) -
        50 +
        "px";
      this.colBlockRightMinHeight2 =
        this.screenHeight - 40 - 16 * 2 - 20 * 2 - 40 - 10 + "px";
      this.proBlockHeight =
        (parseInt(this.colBlockRightMinHeight) -
          document.getElementsByClassName("img-title")[0].clientHeight -
          20 * 2 -
          10) /
          4.82 +
        "px";
      this.boxWrapBlockHeight =
        (parseInt(this.proBlockHeight) -
          document.getElementsByClassName("BoxWrap-title")[0].clientHeight) /
          2 +
        "px";

      this.mainBlockTxtHeight =
        parseInt(this.colBlockLargeHeight) -
        40 -
        20 -
        20 -
        document.getElementsByClassName("MainBlock-title")[0].clientHeight +
        "px";

      this.tableHeight = parseInt(this.mainBlockTxtHeight) * 0.6 + "px";
      this.tableBlockHeight = parseInt(this.tableHeight) - 15 + "px";
      // this.circleChartHeight = parseInt(this.mainBlockTxtHeight) * 0.8 + 'px';

      // this.tableHeight =
      //   parseInt(this.colBlockLargeHeight) -
      //   10 * 2 -
      //   document.getElementsByClassName('MainBlock-title')[0].clientHeight -
      //   document.getElementsByClassName('MainBlock-txt-table-header')[0]
      //     .clientHeight -
      //   20 -
      //   240 +
      //   'px';
      this.circleChartHeight =
        parseInt(this.colBlockLargeHeight) -
        10 * 2 -
        document.getElementsByClassName("MainBlock-title")[0].clientHeight -
        document.getElementsByClassName("MainBlock-txt-table-header")[0]
          .clientHeight -
        20 +
        "px";
    },
    async getData() {
      // 全部数据
      this.chartData = (await findTotalByDate("", "", "")).data.data;

      // 今日数据
      const todayData = (await getCurrentLineReport()).data.data;
      this.todayTotalNum = todayData.total.toString();
      this.todayNotPass = (todayData.total - todayData.qualified).toString();
      this.todayPassRate = todayData.qualifiedRate.toString();

      this.proTarget = (await findActiveProductCalss()).data.data;
      this.todayPro = (await getDateTotalByLineNo("", "")).data.data;
      this.todayRank = (await getDateQualifiedRateByLineNo("", "")).data.data;
      while (this.todayPro.length < 14) {
        this.todayPro.push({
          lineNo: "",
          total: ""
        });
      }
    },
    // 前往operation页
    toOperationPage() {
      this.$router.push({
        path: "/operation",
        name: "operation"
      });
    },
    // 前往electricSearch页
    toElectricSearch() {
      this.$router.push({
        path: "/systemManage/electricSearch",
        name: "electricSearch"
      });
    },
    // 返回上一页
    backRouter() {
      this.$router.go(-1);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./control.scss";
</style>
