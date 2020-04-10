<template>
  <div class="dooya-container">
    <Card>

      <!-- 搜索框 -->
      <Row>
        <Row style="margin-bottom:10px;font-weight:bold">
          电机编码：{{FormData.barcode}}
          &nbsp;&nbsp;&nbsp;
          检测结果：{{ FormData.qc1_Result.qcStatus===2 || FormData.qc2_Result.qcStatus===2
                      || (FormData.qc3_Result.qcStatus!==0 && FormData.qc3_Result.qcStatus!==1) ?'不合格':
                      FormData.qc1_Result.qcStatus===0 || FormData.qc2_Result.qcStatus===0
                      || FormData.qc3_Result.qcStatus===0 ?'未检测':
                      FormData.qc1_Result.qcStatus===1 && FormData.qc2_Result.qcStatus===1 &&FormData.qc3_Result.qcStatus===1 ?'合格':'异常'}}
          <!-- 检测结果：{{FormData.qc3_Result.qcStatus===0?'未检测完毕':
                     FormData.result===101?'合格':'不合格'}} -->
        </Row>
        <Row>
          <Input ref="autofocusInput"
                 v-model="barcode"
                 search
                 autofocus
                 autocomplete
                 placeholder="请输入电机编码"
                 style="width: 200px"
                 @on-keydown='keydown($event)'
                 @on-focus="focus($event)"
                 @on-enter="focus($event)"
                 @on-search="search" />
          &nbsp;
          <Input ref="autofocusQc3"
                 autofocus
                 v-if="FormData.qc1_Result.qcStatus===1&&FormData.qc2_Result.qcStatus===1"
                 v-model="qc3_Result"
                 placeholder="外观检测"
                 style="width: 200px;display:inline-table"
                 @on-focus="focus($event)"
                 @on-enter="qc3Enter" />
        </Row>
      </Row>

      <br>

      <!-- 手风琴 -->
      <Row>
        <Collapse simple
                  accordion
                  @on-change="collapseDataChange">

          <!-- QC1 -->
          <Panel name="1">
            <!-- loading="true" -->

            <!-- titleOut -->
            <span>
              <span :style="{width:largePage?'100px':'30px',marginRight:'5px',display:'inline-block'}">
                QC1 {{largePage?FormData.qc1_Result.name:''}}
              </span>
              <span :style="{ width:largePage?'60px':'60px',
                              marginRight:largePage?'15px':'0',
                              display:'inline-block'}">
                <Tag :color="FormData.qc1_Result.qcStatus===0?'default':
                           FormData.qc1_Result.qcStatus===1?'success':'error'">
                  {{FormData.qc1_Result.qcStatus===0?'未检测':
                  FormData.qc1_Result.qcStatus===1?'合格':'不合格'}}
                </Tag>
              </span>
              <span v-if="FormData.qc1_Result.qcStatus!==0">
                <span :style="{ marginRight:largePage?'15px':'5px',
                                width:largePage?'100px':'40px',
                                display:'inline-block'}">
                  {{largePage?'测试员：':''}}{{FormData.qc1_Result.qcUser}}
                </span>
                <span :style="{marginRight:largePage?'15px':'5px',width:'100px'}">
                  {{largePage?'日期：':''}}{{FormData.qc1_Result.qcStartTime.substring(0,10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  开始时间：{{FormData.qc1_Result.qcStartTime.substring(10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  完成时间：{{FormData.qc1_Result.qcEndTime.substring(10)}}
                </span>
                <span v-else
                      style="margin-right:5px;width:110px">
                  {{FormData.qc1_Result.qcStartTime.substring(10)}}-{{FormData.qc1_Result.qcEndTime.substring(10)}}
                </span>
                <span style="margin-right:15px;width:110px">
                  {{largePage?'测试耗时：':''}}{{FormData.qc1_Result.qcEndTime!==''?(new Date(Date.parse(FormData.qc1_Result.qcEndTime))-new Date(Date.parse(FormData.qc1_Result.qcStartTime)))/1000:''}}秒
                </span>
              </span>
            </span>

            <Collapse slot="content"
                      simple
                      accordion
                      style="border-bottom:none"
                      @on-change="collapseChange"
                      v-for="(row,i) in dataInner"
                      :key="i">

              <Panel ref="panelIn">

                <!-- title -->
                <span>
                  <span style="width:50px;marginRight:5px;display:inline-block">
                    工序{{i+1}}：
                  </span>
                  <span :style="{width:processWidth,marginRight:'5px',display:'inline-block'}">
                    {{row.test_group_name}}
                  </span>
                  <span style="width:60px;marginRight:5px;display:inline-block">
                    检测结果：
                  </span>
                  <span :style="{width:'120px',marginRight:'5px',display:'inline-block',
                               color:row.qc_result===0?'#515a6e':row.qc_result===1?'#19be6b':'#ed4014'}">
                    {{row.qc_result===0?"未检测":row.qc_result===1?"已检测，合格":'已检测，不合格'}}
                  </span>
                </span>

                <!-- dataInner -->
                <div slot="content"
                     v-if="dataInner[i].item_group_value!==null"
                     style="padding:10px;height:140px">

                  <div :style="{display:'inline-block',minWidth:'150px',height:'120px',
                                borderRight:'1px solid #e8eaec',borderLeft:'1px solid #e8eaec'}">
                    <div style="height:40px;border-bottom:1px solid #e8eaec;border-top:1px solid #e8eaec;text-align:center;line-height:40px">
                      项目
                    </div>
                    <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:40px">
                      检测值
                    </div>
                    <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:40px">
                      标准范围
                    </div>
                    <!-- <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:36px">
                      结果
                    </div> -->

                  </div>

                  <div v-for="(column,i) in dataInner[i].item_group_value"
                       :key="i"
                       :style="{display:'inline-block',minWidth:'150px',height:'120px',
                                borderRight:'1px solid #e8eaec'}">

                    <div style="height:40px;border-bottom:1px solid #e8eaec;border-top:1px solid #e8eaec;text-align:center;line-height:40px">
                      {{column.test_item_name}}
                    </div>
                    <div :style="{height:'40px',borderBottom:'1px solid #e8eaec',textAlign:'center',lineHeight:'40px',color:column.result===2?'#ff9900':'#515a6e'}">
                      {{column.curr_value!==null?column.curr_value:''}}
                    </div>
                    <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:40px">
                      {{column.down_value!==null?column.down_value+'至'+column.up_value:''}}
                    </div>
                    <!-- <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:36px">
                      <Tag style="margin:0"
                           v-if="column.result!==null"
                           :color="column.result===1?'success':
                                  column.result===2?'error':'default'">
                        {{column.result===1?'合格':column.result===2?"不合格":'未检测'}}
                      </Tag>
                    </div> -->

                  </div>

                </div>

              </Panel>

            </Collapse>

          </Panel>

          <!-- QC2 -->
          <Panel name="2">

            <!-- titleOut -->
            <span>
              <span :style="{width:largePage?'100px':'30px',marginRight:'5px',display:'inline-block'}">
                QC2 {{largePage?FormData.qc2_Result.name:''}}
              </span>
              <span :style="{ width:largePage?'60px':'60px',
                              marginRight:largePage?'15px':'0',
                              display:'inline-block'}">
                <Tag :color="FormData.qc2_Result.qcStatus===0?'default':
                           FormData.qc2_Result.qcStatus===1?'success':'error'">
                  {{FormData.qc2_Result.qcStatus===0?'未检测':
                  FormData.qc2_Result.qcStatus===1?'合格':'不合格'}}
                </Tag>
              </span>
              <span v-if="FormData.qc2_Result.qcStatus!==0">
                <span :style="{ marginRight:largePage?'15px':'5px',
                                width:largePage?'100px':'40px',
                                display:'inline-block'}">
                  {{largePage?'测试员：':''}}{{FormData.qc2_Result.qcUser}}
                </span>
                <span :style="{marginRight:largePage?'15px':'5px',width:'100px'}">
                  {{largePage?'日期：':''}}{{FormData.qc2_Result.qcStartTime.substring(0,10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  开始时间：{{FormData.qc2_Result.qcStartTime.substring(10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  完成时间：{{FormData.qc2_Result.qcEndTime.substring(10)}}
                </span>
                <span v-else
                      style="margin-right:5px;width:110px">
                  {{FormData.qc2_Result.qcStartTime.substring(10)}}-{{FormData.qc2_Result.qcEndTime.substring(10)}}
                </span>
                <span style="margin-right:15px;width:110px">
                  {{largePage?'测试耗时：':''}}{{FormData.qc2_Result.qcEndTime!==''?(new Date(Date.parse(FormData.qc2_Result.qcEndTime))-new Date(Date.parse(FormData.qc2_Result.qcStartTime)))/1000:''}}秒
                </span>
              </span>
            </span>

            <Collapse slot="content"
                      simple
                      accordion
                      style="border-bottom:none"
                      @on-change="collapseChange"
                      v-for="(row,i) in dataInner"
                      :key="i">

              <Panel ref="panelIn">

                <!-- title -->
                <span>
                  <span style="width:50px;marginRight:5px;display:inline-block">
                    工序{{i+1}}：
                  </span>
                  <span :style="{width:processWidth,marginRight:'5px',display:'inline-block'}">
                    {{row.test_group_name}}
                  </span>
                  <span style="width:60px;marginRight:5px;display:inline-block">
                    检测结果：
                  </span>
                  <span :style="{width:'120px',marginRight:'5px',display:'inline-block',
                               color:row.qc_result===0?'#515a6e':row.qc_result===1?'#19be6b':'#ed4014'}">
                    {{row.qc_result===0?"未检测":row.qc_result===1?"已检测，合格":'已检测，不合格'}}
                  </span>
                </span>

                <!-- dataInner -->
                <div slot="content"
                     v-if="dataInner[i].item_group_value!==null"
                     style="padding:10px;height:140px">

                  <div :style="{display:'inline-block',minWidth:'150px',height:'120px',
                                borderRight:'1px solid #e8eaec',borderLeft:'1px solid #e8eaec'}">
                    <div style="height:40px;border-bottom:1px solid #e8eaec;border-top:1px solid #e8eaec;text-align:center;line-height:40px">
                      项目
                    </div>
                    <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:40px">
                      检测值
                    </div>
                    <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:40px">
                      标准范围
                    </div>
                    <!-- <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:36px">
                      结果
                    </div> -->

                  </div>

                  <div v-for="(column,i) in dataInner[i].item_group_value"
                       :key="i"
                       :style="{display:'inline-block',minWidth:'150px',height:'120px',
                                borderRight:'1px solid #e8eaec'}">

                    <div style="height:40px;border-bottom:1px solid #e8eaec;border-top:1px solid #e8eaec;text-align:center;line-height:40px">
                      {{column.test_item_name}}
                    </div>
                    <div :style="{height:'40px',borderBottom:'1px solid #e8eaec',textAlign:'center',lineHeight:'40px',color:column.result===2?'#ff9900':'#515a6e'}">
                      {{column.curr_value!==null?column.curr_value:''}}
                    </div>
                    <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:40px">
                      {{column.down_value!==null?column.down_value+'至'+column.up_value:''}}
                    </div>
                    <!-- <div style="height:40px;border-bottom:1px solid #e8eaec;text-align:center;line-height:36px">
                      <Tag style="margin:0"
                           v-if="column.result!==null"
                           :color="column.result===1?'success':
                                  column.result===2?'error':'default'">
                        {{column.result===1?'合格':column.result===2?"不合格":'未检测'}}
                      </Tag>
                    </div> -->

                  </div>

                </div>

              </Panel>

            </Collapse>

          </Panel>

          <!-- QC3 -->
          <Panel name="3">
            <!-- title -->
            <span>
              <span :style="{width:largePage?'100px':'30px',marginRight:'5px',display:'inline-block'}">
                QC3 {{largePage?FormData.qc3_Result.name:''}}
              </span>
              <span :style="{ width:largePage?'60px':'60px',
                              marginRight:largePage?'15px':'0',
                              display:'inline-block'}">
                <Tag :color="FormData.qc3_Result.qcStatus===0?'default':
                           FormData.qc3_Result.qcStatus===1?'success':'error'">
                  {{FormData.qc3_Result.qcStatus===0?'未检测':
                  FormData.qc3_Result.qcStatus===1?'合格':'不合格'}}
                </Tag>
              </span>
              <span v-if="FormData.qc3_Result.qcStatus!==0">
                <span :style="{ marginRight:largePage?'15px':'5px',
                                width:largePage?'100px':'40px',
                                display:'inline-block'}">
                  {{largePage?'测试员：':''}}{{FormData.qc3_Result.qcUser}}
                </span>
                <span style="margin-right:15px;width:110px">
                  检测时间：{{FormData.qc3_Result.qcStartTime}}
                </span>
              </span>
            </span>
            <!-- data -->
            <Form slot="content"
                  :model="qc3_form"
                  :label-width="120">
              <FormItem v-if="qc3_form.label!==''&&qc3_form.label!==undefined"
                        :label="qc3_form.label+'：'">
                <div v-for="item in qc3_form.details"
                     :key="item.problem">{{item.problem}}</div>
              </FormItem>
            </Form>
          </Panel>

          <!-- 展开加载蒙层 -->
          <Spin size="small"
                fix
                v-if="spinShow">
          </Spin>

        </Collapse>
      </Row>

      <!-- 加载蒙层 -->
      <Spin size="large"
            fix
            v-if="searchLoading">
      </Spin>

      <!-- 自动播放音频 -->
      <audio ref="audio"
             class="dn"
             :src="audioUrl"
             :preload="audio.preload">
      </audio>

    </Card>

  </div>
</template>

<script>
// import list from './mockData.js';
// function
import { params } from "@/libs/params";
import qc3_translate from "./qc3_translate";
// api
import { findByBarcode, findQcResultByBarcode, updateQc3 } from "@/api/check";

export default {
  /* eslint-disable */
  data() {
    return {
      // 搜索主键
      // barcode: '22Y1309070209',
      barcode: "",
      // 表单数据
      FormData: {
        qc1_Result: {
          qcItems: [],
          qcStartTime: "",
          qcEndTime: "",
          qcStatus: 0
        },
        qc2_Result: {
          qcItems: [],
          qcStartTime: "",
          qcEndTime: "",
          qcStatus: 0
        },
        qc3_Result: {
          qcStartTime: "",
          qcEndTime: "",
          qcStatus: 0
        }
      },
      // 展开后的内层数据
      dataInner: [],
      processWidth: "80px", // 工序span的动态宽度
      // loading
      searchLoading: false,
      // qc3表单
      qc3_Result: "",
      // qc3结果
      qc3_form: {
        label: "",
        details: []
      },
      // 音频设置
      audio: {
        currentTime: 0,
        maxTime: 0,
        playing: false, // 是否自动播放
        muted: false, // 是否静音
        speed: 1,
        waiting: true,
        preload: "auto"
      },
      // 音频url
      audioUrl: "",
      // 页面宽度
      largePage: document.body.clientWidth > 900,
      // 加载是否显示
      spinShow: false
    };
  },
  async created() {
    this.barcode = params(this, "checkSearchNumber");
    if (this.barcode !== undefined) {
      await this.search();
    }
  },
  methods: {
    // 外层collapes展开/收起 -> 内层collapse收起
    async collapseDataChange(key) {
      if (this.$refs.panelIn !== undefined) {
        this.$refs.panelIn.forEach(panel => {
          panel.isActive = false;
        });
      }
      if (key[0] === "1" || key[0] === "2") {
        this.spinShow = true;
        this.dataInner =
          (await findQcResultByBarcode(this.barcode, key)).data.data || [];
        // 动态设置工序名称的span宽度
        var arr = [];
        this.dataInner.forEach(data => {
          arr.push(data.test_group_name.length);
        });
        this.processWidth = (Math.max(...arr) + 2) * 12 + "px";
        this.spinShow = false;
      }
    },
    // 内层collapes展开/收起 -> 内层其他collapse收起
    collapseChange(key) {
      if (this.$refs.panelIn !== undefined) {
        this.$refs.panelIn.forEach(panel => {
          panel.isActive = false;
        });
      }
    },
    // 顶部搜索框获取焦点时 -> 自动选中文本
    focus(event) {
      // console.log(event);
      event.currentTarget.select();
    },
    // 小键盘 "/" -> 取消默认行为并代替tab键功能
    keydown(event) {
      if (event.keyCode === 111) {
        event.preventDefault();
        this.$refs.autofocusQc3.focus();
      }
    },
    // 顶部搜索
    async search() {
      this.searchLoading = true;
      const resultCheck = await findByBarcode(this.barcode);

      if (resultCheck.data.status === 200) {
        this.FormData = resultCheck.data.data;

        // 顶部搜索框自动获取焦点
        this.$refs.autofocusInput.focus();

        // 解析qc3检测结果
        const qc3_Result = this.FormData.qc3_Result.qcStatus;
        if (qc3_translate[qc3_Result] !== undefined) {
          this.qc3_form = {
            label: qc3_translate[qc3_Result][0],
            details:
              qc3_translate[qc3_Result][1] !== undefined
                ? qc3_translate[qc3_Result][1]
                : []
          };
        } else if (qc3_Result === 0 || qc3_Result === 1) {
          this.qc3_form = {};
        } else {
          this.$Message.error("输入有误！");
          this.qc3_form = {};
        }
        this.searchLoading = false;

        // 播放音频
        // const result = (await findByBarcode(this.barcode)).data.data.result;
        const result = resultCheck.data.data.result;
        switch (result) {
          case 0:
            this.audioUrl = require("./audios/0.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 1:
            this.audioUrl = require("./audios/1.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 2:
            this.audioUrl = require("./audios/2.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 3:
            this.audioUrl = require("./audios/3.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 101:
            this.audioUrl = require("./audios/101.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 103:
            this.audioUrl = require("./audios/103.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 104:
            this.audioUrl = require("./audios/104.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 105:
            this.audioUrl = require("./audios/105.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 106:
            this.audioUrl = require("./audios/106.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 107:
            this.audioUrl = require("./audios/107.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 108:
            this.audioUrl = require("./audios/108.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 109:
            this.audioUrl = require("./audios/109.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 110:
            this.audioUrl = require("./audios/110.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
          case 111:
            this.audioUrl = require("./audios/111.mp3");
            this.$nextTick(() => {
              this.$refs.audio.play();
            });
            break;
        }
      } else {
        // this.$Message.error("查无此号");
        this.searchLoading = false;
        this.FormData = {
          qc1_Result: {
            qcItems: [],
            qcStartTime: "",
            qcEndTime: "",
            qcStatus: 0
          },
          qc2_Result: {
            qcItems: [],
            qcStartTime: "",
            qcEndTime: "",
            qcStatus: 0
          },
          qc3_Result: {
            qcStartTime: "",
            qcEndTime: "",
            qcStatus: 0
          }
        };
        this.$refs.autofocusInput.focus();
      }
    },
    // qc3更新外观检测结果
    async qc3Enter() {
      const qc3_form = {
        barcode: this.barcode,
        result: this.qc3_Result
      };
      const array = ["0", "1", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
      if (array.indexOf(qc3_form.result) === -1) {
        this.$Message.error("输入有误！");
      } else {
        const result = (await updateQc3(qc3_form)).data.status;
        if (result === 200) {
          this.search();
        }
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    .ivu-card {
      .ivu-card-body {
        padding: 10px;
      }
    }
    .ivu-form {
      &-item {
        margin-bottom: 0;
      }
      label {
        font-size: 13px;
        font-weight: bold;
      }
    }
    .ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
      font-size: 12px;
    }
    // .ivu-table-body {
    // overflow: hidden;
    // }
    .ivu-table-cell {
      padding: 0;
    }
  }
  .subCol > ul > li {
    margin: 0 -18px;
    list-style: none;
    text-align: center;
    // padding: 9px 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e8eaec;
    overflow: hidden;
  }
  .subCol > ul > li:last-child {
    border-bottom: none;
  }
}
</style>
