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
      <h2 @click="backRouter">车间驾驶舱</h2>
    </div>

    <!-- content -->
    <div class="control-container-inner">
      <Row :gutter="20">

        <!-- 左 -->
        <Col :xs="24"
             :sm="24"
             :md="8"
             :xl="6"
             :style="{height:parseInt(colBlockHeight)+20+'px'}"
             class="col-left">

        <ul v-if="alertList.length!==0"
            :style="alertAnimate===true?alertAnimStyle:''"
            @mouseenter="mouseEnter('alertList')"
            @mouseleave="mouseLeave('alertList')">
          <li v-for='(item,i) in alertList'
              :key="i"
              class="col-block col-block-min col-block-min-alert"
              :style="{height:colBlockMinHeight}">
            <div class="col-block-title left">
              {{alertList[0].LineNo!==''?'预警：'+item.LineNo+'#产线':'暂无预警'}}
            </div>
            <div class="col-block-chart">
              <lineChart v-if="alertList[0].LineNo!==''"
                         :style="{height:parseInt(colBlockMinHeight)-70+'px'}"
                         :chartData="item.chartData"
                         :standardValue="item.AverageCount||20"
                         :yAxisMaxValue="item.AverageCount*2||30"
                         unit="台" />
              <!-- <div v-else
                   class="no-data"
                   :style="{height:parseInt(colBlockMinHeight)-70+'px'}">
                <div class="content">暂无预警</div>
              </div> -->
            </div>
          </li>
        </ul>
        <ul v-else
            :style="alertAnimate===true?alertAnimStyle:''">
          <li v-for='(item,i) in alertListNull'
              :key="i"
              class="col-block col-block-min col-block-min-alert"
              :style="{height:colBlockMinHeight}">
            <div class="col-block-title left">
              暂无预警
            </div>
            <div class="col-block-chart">
              <lineChart :style="{height:parseInt(colBlockMinHeight)-70+'px'}"
                         :chartData="item.chartData"
                         :standardValue="item.AverageCount||20"
                         :yAxisMaxValue="item.AverageCount*2||30"
                         unit="台" />
              <div class="no-data"
                   :style="{height:parseInt(colBlockMinHeight)-70+'px'}">
                <div class="content">暂无预警</div>
              </div>
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
            检测总览
          </div>
          <div v-if="todayList.length!==0"
               class="col-block-chart whole"
               :style="{height:parseInt(colBlockLargeHeight)-70+'px',
                        padding:screenHeight>900?'2% 0':'1% 0'}"
               @mouseenter="mouseEnter('todayList')"
               @mouseleave="mouseLeave('todayList')">

            <div :style="{height:(parseInt(colBlockLargeHeightEvery))*4+'px',
                          overflow:'hidden'}">
              <div :style="{transition:wholeAnimate? wholeAnimStyle.transition:'',
                            transform: wholeAnimate? wholeAnimStyle.transform:''}">
                <div v-for="(item,j) in todayList"
                     :key="j"
                     class="MainBlock"
                     :style="{padding:screenHeight>1000?'20px 0':screenHeight>800?'10px 0':'0',textAlign:'left'}">

                  <!-- class="MainBlock-title" -->
                  <div style="width:30%;display:inline-block;text-align:right">
                    <div class="MainBlock-title">
                      {{item.ProductClass}}
                    </div>
                  </div>
                  <span class="MainBlock-title-block-small">目标</span>
                  <span class="MainBlock-title-block-huge">{{item.TaskCount}}</span>
                  <span class="MainBlock-title-block-small">台</span>
                  <span class="MainBlock-title-block-small">/</span>
                  <span class="MainBlock-title-block-small">完成</span>
                  <span class="MainBlock-title-block-huge">{{item.QualifiedCount}}</span>
                  <span class="MainBlock-title-block-small">台</span>

                  <span class="MainBlock-title-block-small"></span>

                  <span class="MainBlock-title-block"
                        style="vertical-align:bottom">
                    <i-circle :percent="item.CompletedRate"
                              :stroke-color="item.CompletedRate===100?'#5cb85c':item.CompletedRate>=60?'#2db7f5':'#ff5500'"
                              :size="70">
                      <span class="demo-Circle-inner"
                            style="font-size:1.2em;color:#fff">
                        <p style="line-height:1.3em">达成率</p>
                        {{item.CompletedRate}}%
                      </span>
                    </i-circle>
                  </span>

                </div>
              </div>
            </div>

          </div>
          <div v-else
               class="col-block-chart whole"
               :style="{height:parseInt(colBlockLargeHeight)-70+'px',padding:0}">

            <div v-for="(item,j) in todayListNull"
                 :key="j"
                 class="MainBlock"
                 :style="{padding:screenHeight>1000?'20px 0':screenHeight>800?'10px 0':'0',textAlign:'left'}">

              <!-- class="MainBlock-title" -->
              <div style="width:30%;display:inline-block;text-align:right">
                <div class="MainBlock-title">
                  {{item.ProductClass}}
                </div>
              </div>
              <span class="MainBlock-title-block-small">目标</span>
              <span class="MainBlock-title-block-huge">{{item.TaskCount}}</span>
              <span class="MainBlock-title-block-small">台</span>
              <span class="MainBlock-title-block-small">/</span>
              <span class="MainBlock-title-block-small">完成</span>
              <span class="MainBlock-title-block-huge">{{item.QualifiedCount}}</span>
              <span class="MainBlock-title-block-small">台</span>

              <span class="MainBlock-title-block-small"></span>

              <span class="MainBlock-title-block"
                    style="vertical-align:bottom">
                <i-circle :percent="item.CompletedRate"
                          :stroke-color="item.CompletedRate===100?'#5cb85c':item.CompletedRate>=60?'#2db7f5':'#ff5500'"
                          :size="70">
                  <span class="demo-Circle-inner"
                        style="font-size:1.2em;color:#fff">
                    <p style="line-height:1.3em">达成率</p>
                    {{item.CompletedRate}}%
                  </span>
                </i-circle>
              </span>

            </div>
            <div class="no-data">
              <div class="content">当前未生产</div>
            </div>
          </div>
        </div>

        <Row :gutter="20">
          <Col :xs="24"
               :sm="24"
               :md="12"
               :xl="12">
          <div class="col-block col-block-min col-block-min-mid"
               :style="{height:colBlockMidHeight}">
            <div class="col-block-title">
              生产任务
            </div>
            <div class="col-block-chart">
              <pieChart :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}"
                        :chartData="todayAssignPieData"
                        radius="60%"
                        unit="台"
                        labelPosition="top" />
              <div v-if="todayAssign.proAssign.length===0"
                   class="no-data"
                   :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}">
                <div class="content">当前未生产</div>
              </div>
            </div>

          </div>
          </Col>

          <Col :xs="24"
               :sm="24"
               :md="12"
               :xl="12">
          <div class="col-block col-block-min col-block-min-mid"
               :style="{height:colBlockMidHeight}">
            <div class="col-block-title">
              产线概况
            </div>
            <div v-if="todayAssign.proLine.length!==0"
                 class="col-block-chart">
              <pieChart :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}"
                        :chartData="todayAssign.proLine"
                        :color="['#fc8a53','#32ce32','#2db7f5']"
                        unit="条"
                        radius="60%"
                        labelPosition="top" />
            </div>
            <div v-else
                 class="col-block-chart">
              <pieChart :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}"
                        :chartData="todayAssign.proLineNull"
                        :color="['#fc8a53','#32ce32','#2db7f5']"
                        unit="条"
                        radius="60%"
                        labelPosition="top" />
              <div class="no-data"
                   :style="{height:parseInt(colBlockMidHeight) - 70 + 'px'}">
                <div class="content">当前未生产</div>
              </div>
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
        <div class="col-block col-block-min"
             :style="{height:colBlockHeight}">
          <div class="col-block-title">
            今日各产线概况
          </div>
          <div v-if="todayPro.length!==0"
               class="col-block-chart"
               style="background:transparent"
               @mouseenter="mouseEnter('todayPro')"
               @mouseleave="mouseLeave('todayPro')">
            <Row class="col-block-chart-row"
                 :gutter="15"
                 :style="{height:parseInt(colBlockHeight)-70+'px',padding:'0'}">
              <div :style="proAnimate===true?proAnimStyle:''">
                <Col :xs="24"
                     :sm="24"
                     :md="12"
                     :xl="24"
                     class="col-block-chart-box"
                     v-for="(pro,i) in todayPro"
                     :key="i">

                <div class="BoxWrap"
                     :style="{height:proBlockHeight}"
                     @click="proHandleClick(i)">

                  <!-- 蓝色边框 -->
                  <div class="horn">
                    <div class="lt"></div>
                    <div class="rt"></div>
                    <div class="rb"></div>
                    <div class="lb"></div>
                  </div>

                  <!-- 清除浮动 -->
                  <table></table>
                  <div class="BoxWrap-title">
                    <Tag :color="!pro.IsWarning?'success':'error'"
                         style="padding:0 5px">
                      {{!pro.IsWarning?'正常':'预警'}}
                    </Tag>
                    &nbsp;{{pro.LineNo}}#&nbsp;{{pro.captain}}&nbsp;{{pro.captionPhone}}
                  </div>
                  <div class="BoxWrap-block">
                    <p class="BoxWrap-block-num">
                      {{isMock?pro.ProductClass:
                      pro.ProductClass.substring((pro.ProductClass).length - 2)==="电机"?
                      pro.ProductClass.substring(0,pro.ProductClass.length-2):pro.ProductClass}}
                    </p>
                    <p>
                      型号
                    </p>
                  </div>
                  <div class="BoxWrap-block">
                    <p class="BoxWrap-block-num">
                      {{pro.TaskCount}}台
                    </p>
                    <p>
                      任务量
                    </p>
                  </div>
                  <div class="BoxWrap-block">
                    <p class="BoxWrap-block-num">
                      {{pro.QualifiedCount}}台
                    </p>
                    <p>
                      达成量
                    </p>
                  </div>
                  <div class="BoxWrap-block">
                    <p class="BoxWrap-block-num">
                      {{pro.CompletedRate}}%
                    </p>
                    <p>
                      达成率
                    </p>
                  </div>
                  <div class="BoxWrap-block">
                    <p class="BoxWrap-block-num">
                      {{pro.QualifiedRate}}%
                    </p>
                    <p>
                      良品率
                    </p>
                  </div>

                </div>
                </Col>
              </div>
            </Row>
          </div>
          <div v-else
               class="col-block-chart"
               style="background:transparent">
            <Row class="col-block-chart-row"
                 :gutter="15"
                 :style="{height:parseInt(colBlockHeight)-70+'px',padding:'0'}">
              <Col :xs="24"
                   :sm="24"
                   :md="12"
                   :xl="24"
                   class="col-block-chart-box"
                   v-for="(pro,i) in todayProNull"
                   :key="i">

              <div class="BoxWrap"
                   :style="{height:proBlockHeight}">

                <!-- 蓝色边框 -->
                <div class="horn">
                  <div class="lt"></div>
                  <div class="rt"></div>
                  <div class="rb"></div>
                  <div class="lb"></div>
                </div>

                <!-- 清除浮动 -->
                <table></table>
                <div class="BoxWrap-title">
                  <Tag :color="!pro.IsWarning?'success':'error'"
                       style="padding:0 5px">
                    {{!pro.IsWarning?'正常':'预警'}}
                  </Tag>
                  &nbsp;{{pro.LineNo}}#&nbsp;{{pro.captain}}&nbsp;{{pro.captionPhone}}
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{isMock?pro.ProductClass:
                      pro.ProductClass.substring((pro.ProductClass).length - 2)==="电机"?
                      pro.ProductClass.substring(0,pro.ProductClass.length-2):pro.ProductClass}}
                  </p>
                  <p>
                    型号
                  </p>
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{pro.TaskCount}}台
                  </p>
                  <p>
                    任务量
                  </p>
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{pro.QualifiedCount}}台
                  </p>
                  <p>
                    达成量
                  </p>
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{pro.CompletedRate}}%
                  </p>
                  <p>
                    达成率
                  </p>
                </div>
                <div class="BoxWrap-block">
                  <p class="BoxWrap-block-num">
                    {{pro.QualifiedRate}}%
                  </p>
                  <p>
                    良品率
                  </p>
                </div>

              </div>
              </Col>

              <div class="no-data">
                <div class="content">当前未生产</div>
              </div>

            </Row>
          </div>
        </div>
        </Col>

      </Row>
    </div>

  </div>
</template>

<script>
// components
import lineChart from "./lineChart.vue";
import pieChart from "./pieChart.vue";
// mockData
import { todayList, todayAssign, todayPro, alertList } from "./mockData";
// function
import { arraySort, addValueByKey, getValueByKey } from "@/libs/dataHanding";
// mqtt
import { mqtt, MQTT_SERVICE, options } from "@/libs/sysconstant.js";
// vuex
import { mapGetters } from "vuex";

export default {
  components: {
    lineChart,
    pieChart
  },
  data() {
    return {
      /* 动态高度 */
      screenHeight: 0, // 屏幕
      colBlockMinHeight: "0px", // 左 - 预警（每个）
      colBlockLargeHeight: "0px", // 中 - 检测总览
      colBlockLargeHeightEvery: "0px", // 中 - 检测总览（每个）
      colBlockMidHeight: "0px", // 中 - 生产任务 & 产线概况
      colBlockHeight: "0px", // 右 - 各产线（总）
      proBlockHeight: "0px", // 右 - 各产线（每个）
      /* 页面数据 */
      alertList: [], // 左 - 预警总览
      alertListNull: [], // 左 - 预警总览为空时
      todayPro: [], // 右 - 今日各产线
      todayProNull: [], // 右 - 今日各产线为空时
      todayList: [], // 中 - 检测总览
      todayListNull: [], // 中 - 检测总览为空时
      todayAssign: {
        proAssign: [],
        proLine: [],
        proAssignNull: [],
        proLineNull: []
      }, // 中 - 生产任务 & 产线概况
      todayAssignPieData: [], // 生产任务呈现在饼图的数据
      /* 多个预警栏、今日产线、检测总览时的动效 */
      alertAnimate: false, // 是否开启动效 - 预警
      wholeAnimate: false, // 是否开启动效 - 检测总览
      proAnimate: false, // 是否开启动效 - 今日各产线
      alertAnimStyle: {
        transition: "all 1.5s",
        transform: "translate(0,0)"
      }, // 动效样式 - 预警
      wholeAnimStyle: {
        transition: "all 1.5s",
        transform: "translate(0,0)"
      }, // 动效样式 - 检测总览
      proAnimStyle: {
        transition: "all 1.5s",
        transform: "translate(0,0)"
      }, // 动效样式 - 今日各产线
      alertTimer: "", // 定时器 - 预警
      wholeTimer: "", // 定时器 - 检测总览
      proTimer: "", // 定时器 - 今日各产线
      /* mqtt */
      client: null
    };
  },
  computed: {
    ...mapGetters(["userAccess"])
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
    // 监听浏览器的返回按钮：向历史记录中插入了当前页
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
  },
  created() {
    // 获取数据
    this.getData();
    /* 如果预警/今日各产线/检测总览超过3个，分别采用相应的轮播动画 */
    if (this.alertList.length > 3) {
      this.alertTimer = setInterval(this.alertScroll, 5000);
    }
    if (this.todayPro.length > 5) {
      this.todayPro = this.todayPro.concat(this.todayPro);
      this.proTimer = setInterval(this.proScroll, 5000);
    }
    if (this.todayList.length > 4) {
      this.todayList = this.todayList.concat(this.todayList);
      this.wholeTimer = setInterval(this.wholeScroll, 5000);
    }
  },
  // 监听浏览器的返回按钮：页面销毁时取消监听（否则其他路由页面也会被监听）
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
  },
  methods: {
    // 左侧预警向上滚动
    alertScroll() {
      // 消息向上滚动时，添加过渡动画
      this.alertAnimate = true;
      setTimeout(() => {
        // 数组首元素添加到尾部，并删除首元素
        this.alertList.push(this.alertList[0]);
        this.alertList.shift();
        // margin-top 为 0 的时候取消动画，实现无缝滚动
        this.alertAnimate = false;
      }, 1500);
    },
    // 中部检测总览向上滚动
    wholeScroll() {
      // 消息向上滚动时，添加过渡动画
      this.wholeAnimate = true;
      setTimeout(() => {
        // 数组首元素添加到尾部，并删除首元素
        for (let i = 0; i < 2; i++) {
          this.todayList.push(this.todayList[0]);
          this.todayList.shift();
        }
        // margin-top 为 0 的时候取消动画，实现无缝滚动
        this.wholeAnimate = false;
      }, 1500);
    },
    // 右侧产线向上滚动
    proScroll() {
      // 消息向上滚动时，添加过渡动画
      this.proAnimate = true;
      setTimeout(async () => {
        // 数组首元素添加到尾部，并删除首元素
        for (let i = 0; i < 3; i++) {
          await this.todayPro.push(this.todayPro[0]);
          this.todayPro.shift();
        }
        // margin-top 为 0 的时候取消动画，实现无缝滚动
        this.proAnimate = false;
      }, 1500);
    },
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
      /* eslint-disable */
      this.colBlockLargeHeightEvery =
        document.getElementsByClassName("MainBlock").length !== 0
          ? parseInt(
              document.getElementsByClassName("MainBlock")[0].clientHeight
            ) + "px"
          : "0px";
      this.colBlockMidHeight =
        ((this.screenHeight - imgTitle - 40 - 40) * 1) / 3 + "px";
      this.colBlockHeight = this.screenHeight - imgTitle - 40 - 20 + "px";
      this.proBlockHeight =
        (parseInt(this.colBlockHeight) - 45 - 5 - 20 * 4 - 2 * 10) / 5 + "px";

      /* css3性能优化：动态属性时，用transform代替margin */
      this.alertAnimStyle.transform =
        "translate(0," + "-" + (parseInt(this.colBlockMinHeight) + 20) + "px)";
      this.wholeAnimStyle.transform =
        "translate(0," +
        "-" +
        ((parseInt(this.colBlockLargeHeightEvery) + 20) * 2 + 20 * 2) +
        "px)";
      this.proAnimStyle.transform =
        "translate(0," +
        "-" +
        (parseInt(this.proBlockHeight) * 3 + 20 * 3) +
        "px)";
      // this.alertAnimStyle.marginTop =
      //   "-" + (parseInt(this.colBlockMinHeight) + 20) + "px";
      // this.proAnimStyle.marginTop =
      //   "-" + (parseInt(this.proBlockHeight) * 3 + 20 * 3) + "px";
    },
    // 初始化数据
    async getData() {
      if (!this.isMock) {
        /* 非mock数据 */
        this.client = mqtt.connect(MQTT_SERVICE, options);

        // mqtt连接
        this.client.on("connect", e => {
          // 连接成功：先退订其他消息！
          this.client.unsubscribe("ProductRoom");
          for (let i = 1; i <= 60; i++) {
            this.client.unsubscribe(`${i}-ProductLine`);
          }

          // 再订阅该订阅的消息
          this.client.subscribe("ProductRoom", { qos: 1 }, error => {
            if (!error) {
              // 订阅成功
              // console.log("订阅成功：ProductRoom");
            } else {
              // 订阅失败
            }
          });

          // 接收消息处理
          /* eslint-disable */
          this.client.on("message", (topic, message) => {
            const msg = JSON.parse(message.toString());
            console.log(topic, msg);

            // 产线总览
            msg.ProductClassOverview.forEach(row => {
              this.$set(
                row,
                "CompletedRate",
                parseInt(row.CompletedRate * 10000) / 100
              );
            });
            this.todayList = msg.ProductClassOverview;
            // 生产任务 & 产线概况
            const legendDataAssign = [];
            msg.ProductClassTask.forEach(row => {
              this.$set(row, "value", row.TaskCount);
              this.$set(row, "name", row.ProductClass);
              legendDataAssign.push(row.ProductClass);
            });
            const proLine = [];
            Object.keys(msg.LineStatuOverview).forEach(key => {
              proLine.push({
                name:
                  key === "NormalCount"
                    ? "正常"
                    : key === "WaringCount"
                    ? "预警"
                    : "未生产",
                value: msg.LineStatuOverview[key]
              });
            });
            this.todayAssign = {
              proAssign: msg.ProductClassTask,
              proLine: proLine,
              legendDataAssign: legendDataAssign
            };
            // 如果生产任务的项数大于4
            if (this.todayAssign.proAssign.length > 4) {
              this.todayAssign.proAssign.sort(arraySort("value", "desc"));
              const todayAssignPieData = [
                this.todayAssign.proAssign[0].name,
                this.todayAssign.proAssign[1].name,
                this.todayAssign.proAssign[2].name
              ];
              this.getPieData(todayAssignPieData, 1);
            } else {
              this.todayAssignPieData = this.todayAssign.proAssign;
            }
            // 预警
            msg.LineWorkingTimeWarning.forEach(row => {
              const xAxisData = [];
              const seriesData = [];
              row.WorkInfo.forEach(work => {
                xAxisData.push(
                  work.EndTime.substring(0, work.EndTime.length - 3)
                );
                seriesData.push(work.CompleteCount);
              });
              this.$set(row, "chartData", {
                xAxisData: xAxisData,
                seriesData: seriesData
              });
            });
            this.alertList = msg.LineWorkingTimeWarning;
            // 今日各产线
            msg.LineOverviewReport.forEach(row => {
              this.$set(
                row,
                "CompletedRate",
                parseInt(row.CompletedRate * 10000) / 100
              );
              this.$set(
                row,
                "QualifiedRate",
                parseInt(row.QualifiedRate * 10000) / 100
              );
            });
            this.todayPro = msg.LineOverviewReport;

            /* 如果有数据为空 */
            // this.todayList = [];
            // this.todayAssign.proAssign = [];
            // this.todayAssign.proLine = [];
            // this.todayPro = [];
            // this.alertList = [];
            if (this.todayList.length === 0) {
              this.todayListNull = todayList.slice(0, 4);
            }
            if (this.todayAssign.proAssign.length === 0) {
              this.todayAssign.proAssignNull = todayAssign.proAssign;
              this.todayAssignPieData = this.todayAssign.proAssignNull;
            }
            if (this.todayAssign.proLine.length === 0) {
              this.todayAssign.proLineNull = todayAssign.proLine;
            }
            if (this.todayPro.length === 0) {
              this.todayProNull = todayPro.slice(0, 5);
            }
            if (this.alertList.length === 0) {
              this.alertListNull = alertList.slice(0, 1);
            }
          });
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
        this.alertList = alertList;
        this.todayPro = todayPro;
        this.todayList = todayList;
        this.todayAssign = todayAssign;
        // 如果生产任务的项数大于4
        if (this.todayAssign.proAssign.length > 4) {
          this.todayAssign.proAssign.sort(arraySort("value", "desc"));
          const todayAssignPieData = [
            this.todayAssign.proAssign[0].name,
            this.todayAssign.proAssign[1].name,
            this.todayAssign.proAssign[2].name
          ];
          this.getPieData(todayAssignPieData, 1);
        } else {
          this.todayAssignPieData = this.todayAssign.proAssign;
        }
      }
    },
    // 封装：呈现给pieData的方法
    getPieData(selectArray, pieIndex) {
      switch (pieIndex) {
        case 1:
          this.todayAssignPieData = [];
          var addValue1 = 0;
          selectArray.forEach(select => {
            this.todayAssignPieData.push({
              value: getValueByKey(
                this.todayAssign.proAssign,
                "name",
                select,
                "value"
              ),
              name: select
            });
            addValue1 += getValueByKey(
              this.todayAssign.proAssign,
              "name",
              select,
              "value"
            );
          });
          var otherValue1 =
            addValueByKey(this.todayAssign.proAssign, "value") - addValue1;
          this.todayAssignPieData.push({
            value: otherValue1,
            name: "其他"
          });
          break;
      }
    },
    // 车间主管 -> 返回检测列表 / 管理员 -> 返回上一页
    backRouter() {
      if (JSON.stringify(this.userAccess).indexOf("workshop_manager") !== -1) {
        if (!this.isMock) {
          this.client.unsubscribe("ProductRoom");
          this.client.end(
            true,
            clearInterval(this.alertTimer),
            clearInterval(this.proTimer),
            clearInterval(this.wholeTimer),
            this.$router.push({
              path: "/electric/electricSearch",
              name: "electricSearch"
            })
          );
        } else {
          clearInterval(this.alertTimer);
          clearInterval(this.proTimer);
          clearInterval(this.wholeTimer);
          this.$router.push({
            path: "/electric/electricSearch",
            name: "electricSearch"
          });
        }
      } else {
        if (!this.isMock) {
          this.client.unsubscribe("ProductRoom");
          this.client.end(
            clearInterval(this.alertTimer),
            clearInterval(this.proTimer),
            clearInterval(this.wholeTimer),
            this.$router.go(-1)
          );
        } else {
          clearInterval(this.alertTimer);
          clearInterval(this.proTimer);
          clearInterval(this.wholeTimer);
          this.$router.go(-1);
        }
      }
    },
    // 鼠标进入预警框/今日各产线/检测总览 - 相应的动效暂停
    mouseEnter(param) {
      switch (param) {
        case "alertList":
          clearInterval(this.alertTimer);
          break;
        case "todayList":
          clearInterval(this.wholeTimer);
          break;
        case "todayPro":
          clearInterval(this.proTimer);
          break;
      }
    },
    // 鼠标离开预警框/今日各产线/检测总览 - 相应的动效再次开始
    mouseLeave(param) {
      switch (param) {
        case "alertList":
          if (this.alertList.length > 3) {
            this.alertTimer = setInterval(this.alertScroll, 5000);
          }
          break;
        case "todayList":
          if (this.todayList.length > 4) {
            this.wholeTimer = setInterval(this.wholeScroll, 5000);
          }
          break;
        case "todayPro":
          if (this.todayPro.length > 5) {
            this.proTimer = setInterval(this.proScroll, 5000);
          }
          break;
      }
    },
    // 前往驾驶舱 - 产线
    proHandleClick(i) {
      if (!this.isMock) {
        this.client.unsubscribe("ProductRoom");
        this.client.end(
          true,
          clearInterval(this.alertTimer),
          clearInterval(this.proTimer),
          clearInterval(this.wholeTimer),
          this.$router.push({
            path: "/control-leader-line",
            name: "control-leader-line",
            query: {
              lineNo: this.todayPro[i].LineNo
            }
          })
        );
      } else {
        clearInterval(this.alertTimer);
        clearInterval(this.proTimer);
        clearInterval(this.wholeTimer);
        this.$router.push({
          path: "/control-leader-line",
          name: "control-leader-line",
          query: {
            lineNo: this.todayPro[i].LineNo
          }
        });
      }
    },
    // 监听浏览器的返回按钮
    goBack() {
      if (!this.isMock) {
        this.client.unsubscribe("ProductRoom");
        this.client.end(
          true,
          clearInterval(this.alertTimer),
          clearInterval(this.proTimer),
          clearInterval(this.wholeTimer),
          sessionStorage.clear(),
          window.history.back()
        );
      } else {
        clearInterval(this.alertTimer);
        clearInterval(this.proTimer);
        clearInterval(this.wholeTimer);
        sessionStorage.clear();
        window.history.back();
      }
    }
  },
  watch: {
    todayList: {
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          /* eslint-disable */
          this.colBlockLargeHeightEvery =
            document.getElementsByClassName("MainBlock").length !== 0
              ? parseInt(
                  document.getElementsByClassName("MainBlock")[0].clientHeight
                ) + "px"
              : "0px";
        });
      },
      deep: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./control.scss";
</style>
