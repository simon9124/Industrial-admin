<template>
  <div class="control-container">
    <img class="control-container-header"
         src="@/assets/images/control/bg_top.png">

    <!-- 清除浮动 -->
    <table></table>

    <!-- title -->
    <div class="title">
      <h2>检测操作行为分析</h2>
    </div>

    <div class="control-container-inner">
      <Row :gutter="20">

        <!-- 左 -->
        <Col :xs="24"
             :sm="24"
             :lg="8">
        <div class="col-block col-block-large"
             ref="colBlockLarge"
             :style="{height:colBlockLargeHeight}">
          <div class="col-block-title mid1">
            今日检测操作行为分析
          </div>
          <div class="col-block-chart">
            <div class="MainBlock">
              <div class="MainBlock-title">
                <div class="MainBlock-title-block">
                  <span class="MainBlock-title-block-small">今日不规范操作累计</span>
                  <span class="MainBlock-title-block-huge">6</span>
                  <span class="MainBlock-title-block-huge">2</span>
                  <span class="MainBlock-title-block-huge">6</span>
                  <span class="MainBlock-title-block-huge">0</span>
                  <span class="MainBlock-title-block-small">次</span>
                </div>
              </div>
              <div class="MainBlock-txt"
                   :style="{height:mainBlockTxtHeight}">
                <Col :span="24"
                     :style="{height:mainBlockTxtHeight,position:'relative',top:'-5%'}">
                <div :style="{height:tableBlockHeight,position:'absolute',top:0,bottom:0,left:0,right:0,margin:'auto'}">
                  <!-- <div class="MainBlock-txt-table-header">生产目标</div> -->
                  <table :style="{height:tableHeight}">
                    <tr>
                      <th>产品系列</th>
                      <th>产品型号</th>
                      <th>不规范操作</th>
                    </tr>
                    <tr>
                      <td>DM35S</td>
                      <td>DM35S-10N17R</td>
                      <td>1565</td>
                    </tr>
                    <tr>
                      <td>DM35S</td>
                      <td>DM35S-6N28R</td>
                      <td>1393</td>
                    </tr>
                    <tr>
                      <td>DM45S</td>
                      <td>DM45S-10N15R</td>
                      <td>1565</td>
                    </tr>
                    <tr>
                      <td>DM45S</td>
                      <td>DM45S-20N15R</td>
                      <td>761</td>
                    </tr>
                    <tr>
                      <td>DM45S</td>
                      <td>DM45S-50N12R</td>
                      <td>976</td>
                    </tr>
                  </table>
                </div>
                </Col>
              </div>
            </div>
          </div>
        </div>
        <div class="col-block col-block-min col-block-min-mid2"
             :style="{height:colBlockMidHeight}">
          <div class="col-block-title mid2">
            不规范操作趋势图
          </div>
          <!-- <div class="col-block-txt">
            马达不合格数：138件
          </div> -->

          <in-standardizate-history :style="{height:colBlockInStandardHeight}" />

        </div>
        </Col>

        <!-- 右 -->
        <Col :xs="24"
             :sm="24"
             :lg="16">
        <div class="col-block col-block-min col-block-min-left1"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title left1">
            根据检测步骤统计及趋势图
          </div>
          <Col :span="12">
          <div class="col-block-chart">
            <div class="col-block-chart-tag"
                 style="left:60px">
              <Tag :color="selectTagHistoryTestStepSpread==='whole'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStepSpread='whole'">总览</Tag>
              <Tag :color="selectTagHistoryTestStepSpread==='comprehensive'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStepSpread='comprehensive'">综合测试</Tag>
              <Tag :color="selectTagHistoryTestStepSpread==='mute'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStepSpread='mute'">静音测试</Tag>
              <Tag :color="selectTagHistoryTestStepSpread==='outward'?'#FFA2D3':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStepSpread='outward'">外观测试</Tag>
            </div>
            <test-step-history-spread :style="{height:colBlockMinHeight}"
                                      :selectTagHistoryTestStepSpread="selectTagHistoryTestStepSpread" />
          </div>
          </Col>
          <Col :span="12">
          <div class="col-block-chart">
            <div class="col-block-chart-tag">
              <Tag :color="selectTagHistoryTestStep==='comprehensive'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStep='comprehensive'">综合测试</Tag>
              <Tag :color="selectTagHistoryTestStep==='mute'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStep='mute'">静音测试</Tag>
              <Tag :color="selectTagHistoryTestStep==='outward'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryTestStep='outward'">外观测试</Tag>
            </div>
            <test-step-history :style="{height:colBlockMinHeight}"
                               :selectTagHistoryTestStep="selectTagHistoryTestStep" />
          </div>
          </Col>

        </div>
        <div class="col-block col-block-min col-block-min-left2"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title left2">
            根据错误类型统计及趋势图
          </div>
          <Col :span="12">
          <div class="col-block-chart">
            <div class="col-block-chart-tag"
                 style="left:60px">
              <Tag color="primary"
                   :fade="false">总览</Tag>
              <Tag :fade="false">不规范</Tag>
              <Tag :fade="false">漏步</Tag>
              <Tag :fade="false">漏测</Tag>
            </div>
            <error-type-history-spread :style="{height:colBlockMinHeight}" />
          </div>
          </Col>
          <Col :span="12">
          <div class="col-block-chart">
            <div class="col-block-chart-tag">
              <Tag :color="selectTagHistoryErrorType==='instandardized'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryErrorType='instandardized'">不规范</Tag>
              <Tag :color="selectTagHistoryErrorType==='missStep'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryErrorType='missStep'">漏步</Tag>
              <Tag :color="selectTagHistoryErrorType==='leaveOut'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryErrorType='leaveOut'">漏测</Tag>
            </div>
            <error-type-history :style="{height:colBlockMinHeight}"
                                :selectTagHistoryErrorType="selectTagHistoryErrorType" />
          </div>
          </Col>
        </div>
        <div class="col-block col-block-min col-block-min-left3"
             :style="{height:colBlockMinHeight}">
          <div class="col-block-title left3">
            根据生产线统计及趋势图
          </div>
          <Col :span="12">
          <div class="col-block-chart">
            <!-- <div class="col-block-chart-tag"
                 style="left:60px">
              <Tag color="primary"
                   :fade="false">20#</Tag>
              <Tag :fade="false">21#</Tag>
              <Tag :fade="false">22#</Tag>
              <Tag :fade="false">23#</Tag>
              <Tag :fade="false">24#</Tag>
              <Tag :fade="false">25#</Tag>
            </div> -->
            <pro-line-history-spread :style="{height:colBlockMinHeight}" />
          </div>
          </Col>
          <Col :span="12">
          <div class="col-block-chart">
            <div class="col-block-chart-tag">
              <Tag :color="selectTagHistoryProLine==='20'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryProLine='20'">20#</Tag>
              <Tag :color="selectTagHistoryProLine==='21'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryProLine='21'">21#</Tag>
              <Tag :color="selectTagHistoryProLine==='22'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryProLine='22'">22#</Tag>
              <Tag :color="selectTagHistoryProLine==='23'?'primary':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryProLine='23'">23#</Tag>
              <Tag :color="selectTagHistoryProLine==='24'?'success':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryProLine='24'">24#</Tag>
              <Tag :color="selectTagHistoryProLine==='25'?'warning':'default'"
                   :fade="false"
                   @click.native="selectTagHistoryProLine='25'">25#</Tag>
            </div>
            <pro-line-history :style="{height:colBlockMinHeight}"
                              :selectTagHistoryProLine="selectTagHistoryProLine" />
          </div>
          </Col>
        </div>
        </Col>

      </Row>
    </div>

    <!-- buttons -->
    <Button style="position:absolute;right:20px;top:10px;padding:5px 10px"
            icon="md-arrow-forward"
            type="primary"
            @click="toRealTimeData">检测过程实时监控</Button>
    <Button style="position:absolute;left:20px;top:10px;padding:5px 10px"
            icon="md-arrow-back"
            type="primary"
            @click="toControl">返回驾驶舱</Button>

  </div>
</template>

<script>
// components
import testStepHistory from "./testStepHistory.vue";
import testStepHistorySpread from "./testStepHistorySpread.vue";
import errorTypeHistory from "./errorTypeHistory.vue";
import errorTypeHistorySpread from "./errorTypeHistorySpread.vue";
import proLineHistory from "./proLineHistory.vue";
import proLineHistorySpread from "./proLineHistorySpread.vue";
import inStandardizateHistory from "./inStandardizateHistory.vue";

export default {
  name: "control",
  components: {
    testStepHistory,
    testStepHistorySpread,
    errorTypeHistory,
    errorTypeHistorySpread,
    proLineHistory,
    proLineHistorySpread,
    inStandardizateHistory
  },
  data () {
    return {
      // 动态高度
      screenHeight: 0,
      colBlockLargeHeight: "0px",
      colBlockMinHeight: "0px",
      colBlockInStandardHeight: "0px",
      colBlockMidHeight: "0px",
      colBlockMidChartHeight: "0px",
      colBlockRightMinHeight: "0px",
      proBlockHeight: "0px",
      boxWrapBlockHeight: "0px",
      mainBlockTxtHeight: "0px",
      tableBlockHeight: "0px",
      tableHeight: "0px",
      circleChartHeight: "0px",
      // tags
      selectTagHistoryTestStep: "comprehensive",
      selectTagHistoryTestStepSpread: "whole",
      selectTagHistoryErrorType: "instandardized",
      selectTagHistoryProLine: "20"
    };
  },
  mounted () {
    this.getHeight();
    // 屏幕缩放
    window.onresize = () => {
      return (() => {
        this.getHeight();
      })();
    };
  },
  methods: {
    // 获取动态高度
    getHeight () {
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
      this.colBlockInStandardHeight =
        parseInt(this.colBlockMinHeight) + 50 + "px";
      this.mainBlockTxtHeight =
        parseInt(this.colBlockLargeHeight) -
        40 -
        20 -
        20 -
        document.getElementsByClassName("MainBlock-title")[0].clientHeight +
        "px";
      this.tableHeight = parseInt(this.mainBlockTxtHeight) * 0.6 + "px";
      this.tableBlockHeight = parseInt(this.tableHeight) - 15 + "px";
    },
    // 前往realTime页
    toRealTimeData () {
      this.$router.push({
        path: "/realTime",
        name: "realTime"
      });
    },
    // 前往control页
    toControl () {
      this.$router.push({
        path: "/control",
        name: "control"
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./control.scss";
</style>
