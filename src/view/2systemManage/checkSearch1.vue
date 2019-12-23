<template>
  <div class="dooya-container">
    <Card>

      <!-- 搜索框 -->
      <Row>
        <Row style="margin-bottom:10px;font-weight:bold">
          电机编码：{{FormData.barcode}}
          &nbsp;&nbsp;&nbsp;
          检测结果：{{ FormData.qc1_result.qcStatus===2 || FormData.qc2_result.qcStatus===2
                      || (FormData.qc3_result.qcStatus!==0 && FormData.qc3_result.qcStatus!==1) ?'不合格':
                      FormData.qc1_result.qcStatus===0 || FormData.qc2_result.qcStatus===0
                      || FormData.qc3_result.qcStatus===0 ?'未检测':
                      FormData.qc1_result.qcStatus===1 && FormData.qc2_result.qcStatus===1 &&FormData.qc3_result.qcStatus===1 ?'合格':'异常'}}
          <!-- 检测结果：{{FormData.qc3_result.qcStatus===0?'未检测完毕':
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
                 v-if="FormData.qc1_result.qcStatus===1&&FormData.qc2_result.qcStatus===1"
                 v-model="qc3_result"
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
                  accordion>

          <!-- QC1 -->
          <Panel name="QC1">
            <!-- title -->
            <span>
              <span :style="{width:largePage?'100px':'30px',marginRight:'5px',display:'inline-block'}">
                QC1 {{largePage?FormData.qc1_result.name:''}}
              </span>
              <span :style="{ width:largePage?'60px':'60px',
                              marginRight:largePage?'15px':'0',
                              display:'inline-block'}">
                <Tag :color="FormData.qc1_result.qcStatus===0?'default':
                           FormData.qc1_result.qcStatus===1?'success':'error'">
                  {{FormData.qc1_result.qcStatus===0?'未检测':
                  FormData.qc1_result.qcStatus===1?'合格':'不合格'}}
                </Tag>
              </span>
              <span v-if="FormData.qc1_result.qcStatus!==0">
                <span :style="{ marginRight:largePage?'15px':'5px',
                                width:largePage?'90px':'40px',
                                display:'inline-block'}">
                  {{largePage?'测试员：':''}}{{FormData.qc1_result.qcUser}}
                </span>
                <span :style="{marginRight:largePage?'15px':'5px',width:'100px'}">
                  {{largePage?'日期：':''}}{{FormData.qc1_result.qcStartTime.substring(0,10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  开始时间：{{FormData.qc1_result.qcStartTime.substring(10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  完成时间：{{FormData.qc1_result.qcEndTime.substring(10)}}
                </span>
                <span v-else
                      style="margin-right:5px;width:110px">
                  {{FormData.qc1_result.qcStartTime.substring(10)}}-{{FormData.qc1_result.qcEndTime.substring(10)}}
                </span>
                <span style="margin-right:15px;width:110px">
                  {{largePage?'测试耗时：':''}}{{(new Date(Date.parse(FormData.qc1_result.qcEndTime))-new Date(Date.parse(FormData.qc1_result.qcStartTime)))/1000}}秒
                </span>
              </span>
            </span>
            <!-- data -->
            <Table slot="content"
                   :data="FormData.qc1_result.qcItems"
                   :columns="qc1Columns"
                   border></Table>
          </Panel>

          <!-- QC2 -->
          <Panel name="QC2">
            <!-- title -->
            <span>
              <span :style="{width:largePage?'100px':'30px',marginRight:'5px',display:'inline-block'}">
                QC2 {{largePage?FormData.qc2_result.name:''}}
              </span>
              <span :style="{ width:largePage?'60px':'60px',
                              marginRight:largePage?'15px':'0',
                              display:'inline-block'}">
                <Tag :color="FormData.qc2_result.qcStatus===0?'default':
                           FormData.qc2_result.qcStatus===1?'success':'error'">
                  {{FormData.qc2_result.qcStatus===0?'未检测':
                  FormData.qc2_result.qcStatus===1?'合格':'不合格'}}
                </Tag>
              </span>
              <span v-if="FormData.qc2_result.qcStatus!==0">
                <span :style="{ marginRight:largePage?'15px':'5px',
                                width:largePage?'90px':'40px',
                                display:'inline-block'}">
                  {{largePage?'测试员：':''}}{{FormData.qc2_result.qcUser}}
                </span>
                <span :style="{marginRight:largePage?'15px':'5px',width:'100px'}">
                  {{largePage?'日期：':''}}{{FormData.qc2_result.qcStartTime.substring(0,10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  开始时间：{{FormData.qc2_result.qcStartTime.substring(10)}}
                </span>
                <span v-if="largePage"
                      style="margin-right:15px;width:110px">
                  完成时间：{{FormData.qc2_result.qcEndTime.substring(10)}}
                </span>
                <span v-else
                      style="margin-right:5px;width:110px">
                  {{FormData.qc2_result.qcStartTime.substring(10)}}-{{FormData.qc2_result.qcEndTime.substring(10)}}
                </span>
                <span style="margin-right:15px;width:110px">
                  {{largePage?'测试耗时：':''}}{{(new Date(Date.parse(FormData.qc2_result.qcEndTime))-new Date(Date.parse(FormData.qc2_result.qcStartTime)))/1000}}秒
                </span>
              </span>
            </span>
            <!-- data -->
            <Table slot="content"
                   :data="FormData.qc2_result.qcItems"
                   :columns="qc2Columns"
                   border></Table>
          </Panel>

          <!-- QC3 -->
          <Panel name="QC3">
            <!-- title -->
            <span>
              <span :style="{width:largePage?'100px':'30px',marginRight:'5px',display:'inline-block'}">
                QC3 {{largePage?FormData.qc3_result.name:''}}
              </span>
              <span :style="{ width:largePage?'60px':'60px',
                              marginRight:largePage?'15px':'0',
                              display:'inline-block'}">
                <Tag :color="FormData.qc3_result.qcStatus===0?'default':
                           FormData.qc3_result.qcStatus===1?'success':'error'">
                  {{FormData.qc3_result.qcStatus===0?'未检测':
                  FormData.qc3_result.qcStatus===1?'合格':'不合格'}}
                </Tag>
              </span>
              <span v-if="FormData.qc3_result.qcStatus!==0">
                <span :style="{ marginRight:largePage?'15px':'5px',
                                width:largePage?'90px':'40px',
                                display:'inline-block'}">
                  {{largePage?'测试员：':''}}{{FormData.qc3_result.qcUser}}
                </span>
                <span style="margin-right:15px;width:110px">
                  检测时间：{{FormData.qc3_result.qcStartTime}}
                </span>
              </span>
            </span>
            <!-- data -->
            <Form slot="content"
                  :model="qc3_form"
                  :label-width="120">
              <FormItem v-if="qc3_form.label!==undefined"
                        :label="qc3_form.label+'：'">
                <div v-for="item in qc3_form.details"
                     :key="item.problem">{{item.problem}}</div>
              </FormItem>
            </Form>
          </Panel>

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
import { getCheckProduct, updateQc3 } from "@/api/check";

export default {
  /* eslint-disable */
  data() {
    return {
      // 搜索主键
      // barcode: '22Y1309070209',
      barcode: "",
      // 表单数据
      FormData: {
        qc1_result: {
          qcItems: [],
          qcStartTime: "",
          qcEndTime: ""
        },
        qc2_result: {
          qcItems: [],
          qcStartTime: "",
          qcEndTime: ""
        },
        qc3_result: {
          qcStartTime: "",
          qcEndTime: "",
          qcStatus: 0
        }
      },
      // 表格列项 - qc1
      qc1Columns: [
        {
          title: "步骤",
          type: "index",
          minWidth: 80,
          align: "center"
        },
        {
          title: "描述",
          key: "test_group_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "结果",
          key: "qc_result",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    {
                      style: {
                        height:
                          this.FormData.qc1_result.qcItems[params.index]
                            .qc_result === null
                            ? "120px"
                            : "60px",
                        lineHeight:
                          this.FormData.qc1_result.qcItems[params.index]
                            .qc_result === null
                            ? "120px"
                            : "100px",
                        border: 0,
                        fontWeight: "bold",
                        color:
                          this.FormData.qc1_result.qcItems[params.index]
                            .qc_result === null
                            ? "#515a6e"
                            : this.FormData.qc1_result.qcItems[params.index]
                                .qc_result === "1"
                            ? "#19be6b"
                            : "#ed4014"
                      }
                    },
                    this.FormData.qc1_result.qcItems[params.index].qc_result ===
                      null
                      ? "未检测"
                      : "已检测"
                  ),
                  h(
                    "li",
                    {
                      style: {
                        height: "60px",
                        lineHeight: "20px",
                        display:
                          this.FormData.qc1_result.qcItems[params.index]
                            .qc_result === null
                            ? "none"
                            : "block",
                        fontWeight: "bold",
                        color:
                          this.FormData.qc1_result.qcItems[params.index]
                            .qc_result === null
                            ? "#515a6e"
                            : this.FormData.qc1_result.qcItems[params.index]
                                .qc_result === "1"
                            ? "#19be6b"
                            : "#ed4014"
                      }
                    },
                    this.FormData.qc1_result.qcItems[params.index].qc_result ===
                      "1"
                      ? "合格"
                      : "不合格"
                  )
                ])
              ]
            );
          },
          minWidth: 100
        },
        {
          title: "项目",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h("li", "检测值"),
                  h("li", "标准范围"),
                  h("li", "结果")
                ])
              ]
            );
          },
          minWidth: 120
        },
        {
          title: "行程",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[0].curr_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[0].curr_value + "cm"
                      : ""
                  ),
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[0].down_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[0].down_value +
                          "cm" +
                          "-" +
                          this.FormData.qc1_result.qcItems[params.index]
                            .item_group_value[0].up_value +
                          "cm"
                      : ""
                  ),
                  h("li", [
                    h(
                      "Tag",
                      {
                        props: {
                          color:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[0].result === "1"
                              ? "success"
                              : "error"
                        },
                        style: {
                          display:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[0].result === null
                              ? "none"
                              : "inline-block"
                        }
                      },
                      this.FormData.qc1_result.qcItems[params.index]
                        .item_group_value[0].result === "1"
                        ? "合格"
                        : "不合格"
                    )
                  ])
                ])
              ]
            );
          },
          minWidth: 150
        },
        {
          title: "转速",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[1].curr_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[1].curr_value + "r/min"
                      : ""
                  ),
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[1].down_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[1].down_value +
                          "r/min" +
                          "-" +
                          this.FormData.qc1_result.qcItems[params.index]
                            .item_group_value[1].up_value +
                          "r/min"
                      : ""
                  ),
                  h("li", [
                    h(
                      "Tag",
                      {
                        props: {
                          color:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[1].result === "1"
                              ? "success"
                              : "error"
                        },
                        style: {
                          display:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[1].result === null
                              ? "none"
                              : "inline-block"
                        }
                      },
                      this.FormData.qc1_result.qcItems[params.index]
                        .item_group_value[1].result === "1"
                        ? "合格"
                        : "不合格"
                    )
                  ])
                ])
              ]
            );
          },
          minWidth: 150
        },
        {
          title: "电压",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[2].curr_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[2].curr_value + "V"
                      : ""
                  ),
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[2].down_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[2].down_value +
                          "V" +
                          "-" +
                          this.FormData.qc1_result.qcItems[params.index]
                            .item_group_value[2].up_value +
                          "V"
                      : ""
                  ),
                  h("li", [
                    h(
                      "Tag",
                      {
                        props: {
                          color:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[2].result === "1"
                              ? "success"
                              : "error"
                        },
                        style: {
                          display:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[2].result === null
                              ? "none"
                              : "inline-block"
                        }
                      },
                      this.FormData.qc1_result.qcItems[params.index]
                        .item_group_value[2].result === "1"
                        ? "合格"
                        : "不合格"
                    )
                  ])
                ])
              ]
            );
          },
          minWidth: 150
        },
        {
          title: "电流",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[3].curr_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[3].curr_value + "A"
                      : ""
                  ),
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[3].down_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[3].down_value +
                          "A" +
                          "-" +
                          this.FormData.qc1_result.qcItems[params.index]
                            .item_group_value[3].up_value +
                          "A"
                      : ""
                  ),
                  h("li", [
                    h(
                      "Tag",
                      {
                        props: {
                          color:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[3].result === "1"
                              ? "success"
                              : "error"
                        },
                        style: {
                          display:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[3].result === null
                              ? "none"
                              : "inline-block"
                        }
                      },
                      this.FormData.qc1_result.qcItems[params.index]
                        .item_group_value[3].result === "1"
                        ? "合格"
                        : "不合格"
                    )
                  ])
                ])
              ]
            );
          },
          minWidth: 150
        },
        {
          title: "功率",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[4].curr_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[4].curr_value + "W"
                      : ""
                  ),
                  h(
                    "li",
                    this.FormData.qc1_result.qcItems[params.index]
                      .item_group_value[4].down_value !== null
                      ? this.FormData.qc1_result.qcItems[params.index]
                          .item_group_value[4].down_value +
                          "W" +
                          "-" +
                          this.FormData.qc1_result.qcItems[params.index]
                            .item_group_value[4].up_value +
                          "W"
                      : ""
                  ),
                  h("li", [
                    h(
                      "Tag",
                      {
                        props: {
                          color:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[4].result === "1"
                              ? "success"
                              : "error"
                        },
                        style: {
                          display:
                            this.FormData.qc1_result.qcItems[params.index]
                              .item_group_value[4].result === null
                              ? "none"
                              : "inline-block"
                        }
                      },
                      this.FormData.qc1_result.qcItems[params.index]
                        .item_group_value[4].result === "1"
                        ? "合格"
                        : "不合格"
                    )
                  ])
                ])
              ]
            );
          },
          minWidth: 150
        }
      ],
      // 表格列项 - qc2
      qc2Columns: [
        {
          title: "描述",
          key: "test_group_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "结果",
          key: "qc_result",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    {
                      style: {
                        height:
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === null ||
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === "已检测" ||
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === "未检测"
                            ? "120px"
                            : "60px",
                        lineHeight:
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === null ||
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === "已检测" ||
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === "未检测"
                            ? "120px"
                            : "100px",
                        border: 0,
                        fontWeight: "bold",
                        color:
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === null
                            ? "#515a6e"
                            : this.FormData.qc2_result.qcItems[params.index]
                                .qc_result === "1" ||
                              this.FormData.qc2_result.qcItems[params.index]
                                .qc_result === "已检测"
                            ? "#19be6b"
                            : "#ed4014"
                      }
                    },
                    this.FormData.qc2_result.qcItems[params.index].qc_result ===
                      null ||
                      this.FormData.qc2_result.qcItems[params.index]
                        .qc_result === "未检测"
                      ? "未检测"
                      : "已检测"
                  ),
                  h(
                    "li",
                    {
                      style: {
                        height: "60px",
                        lineHeight: "20px",
                        display:
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === null ||
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === "已检测" ||
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === "未检测"
                            ? "none"
                            : "block",
                        fontWeight: "bold",
                        color:
                          this.FormData.qc2_result.qcItems[params.index]
                            .qc_result === null
                            ? "#515a6e"
                            : this.FormData.qc2_result.qcItems[params.index]
                                .qc_result === "1"
                            ? "#19be6b"
                            : "#ed4014"
                      }
                    },
                    this.FormData.qc2_result.qcItems[params.index].qc_result ===
                      "1"
                      ? "合格"
                      : this.FormData.qc2_result.qcItems[params.index]
                          .qc_result === "201"
                      ? "电机故障"
                      : "不合格"
                  )
                ])
              ]
            );
          },
          minWidth: 100
        },
        {
          title: "项目",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h("li", "检测值"),
                  h("li", "标准范围"),
                  h("li", "结果")
                ])
              ]
            );
          },
          minWidth: 100
        },
        {
          title: "过程值",
          key: "item_group_value",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h("ul", [
                  h(
                    "li",
                    this.FormData.qc2_result.qcItems[params.index]
                      .item_group_value[0].curr_value === null
                      ? ""
                      : this.FormData.qc2_result.qcItems[params.index]
                          .test_group_code === "2010" ||
                        this.FormData.qc2_result.qcItems[params.index]
                          .test_group_code === "2020"
                      ? this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].curr_value + "dB"
                      : this.FormData.qc2_result.qcItems[params.index]
                          .test_group_code === "2040"
                      ? this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].curr_value + "mΩ"
                      : this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].curr_value + "mA"
                  ),
                  h(
                    "li",
                    this.FormData.qc2_result.qcItems[params.index]
                      .item_group_value[0].down_value === null
                      ? ""
                      : this.FormData.qc2_result.qcItems[params.index]
                          .test_group_code === "2010" ||
                        this.FormData.qc2_result.qcItems[params.index]
                          .test_group_code === "2020"
                      ? this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].down_value +
                        "dB-" +
                        this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].up_value +
                        "dB"
                      : this.FormData.qc2_result.qcItems[params.index]
                          .test_group_code === "2040"
                      ? this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].down_value +
                        "mΩ-" +
                        this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].up_value +
                        "mΩ"
                      : this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].down_value +
                        "mA-" +
                        this.FormData.qc2_result.qcItems[params.index]
                          .item_group_value[0].up_value +
                        "mA"
                  ),
                  h("li", [
                    h(
                      "Tag",
                      {
                        props: {
                          color:
                            this.FormData.qc2_result.qcItems[params.index]
                              .item_group_value[0].result === "1"
                              ? "success"
                              : "error"
                        },
                        style: {
                          display:
                            this.FormData.qc2_result.qcItems[params.index]
                              .item_group_value[0].result === null
                              ? "none"
                              : "inline-block"
                        }
                      },
                      this.FormData.qc2_result.qcItems[params.index]
                        .item_group_value[0].result === "1"
                        ? "合格"
                        : "不合格"
                    )
                  ])
                ])
              ]
            );
          },
          minWidth: 120
        }
      ],
      // loading
      searchLoading: false,
      // qc3表单
      qc3_result: "",
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
      largePage: document.body.clientWidth > 900
    };
  },
  async created() {
    this.barcode = params(this, "checkSearchNumber");
    if (this.barcode !== undefined) {
      await this.search();
    }
  },
  methods: {
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
      const resultCheck = await getCheckProduct(this.barcode);

      if (resultCheck.data.status === 200) {
        this.FormData = resultCheck.data.data;

        // 顶部搜索框自动获取焦点
        this.$refs.autofocusInput.focus();

        // 解析qc3检测结果
        const qc3_result = this.FormData.qc3_result.qcStatus;
        if (qc3_translate[qc3_result] !== undefined) {
          this.qc3_form = {
            label: qc3_translate[qc3_result][0],
            details:
              qc3_translate[qc3_result][1] !== undefined
                ? qc3_translate[qc3_result][1]
                : []
          };
        } else if (qc3_result === 0 || qc3_result === 1) {
          this.qc3_form = {};
        } else {
          this.$Message.error("输入有误！");
          this.qc3_form = {};
        }
        this.searchLoading = false;

        // 播放音频
        // const result = (await getCheckProduct(this.barcode)).data.data.result;
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
        this.$Message.error("查无此号");
        this.searchLoading = false;
        this.$refs.autofocusInput.focus();
      }
    },
    // qc3更新外观检测结果
    async qc3Enter() {
      const qc3_form = {
        barcode: this.barcode,
        result: this.qc3_result
      };
      const array = ["0", "1", "3", "4", "5", "6", "7", "8", "9", "10", "11"];
      if (array.indexOf(qc3_form.result) === -1) {
        this.$Message.error("输入有误！");
      } else {
        await updateQc3(qc3_form);
        this.search();
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
    .ivu-table-body {
      // overflow: hidden;
    }
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
