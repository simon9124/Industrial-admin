<template>
  <div class="dooya-container">
    <Card>
      <Row>
        <!-- 搜索框 -->
        <Input v-model="number"
               search
               placeholder="请输入电机编码..."
               style="width: 300px"
               @on-search="search" />
      </Row>

      <br>

      <Row>
        <!-- 基本信息 -->
        <Card>
          <Form ref="formValidate"
                :model="FormData"
                :label-width="120">
            <FormItem label="电机编码：">
              {{FormData.number}}
            </FormItem>
            <FormItem label="线号：">
              {{FormData.lineNumber}}
            </FormItem>
            <FormItem label="结果：">
              <Tag v-if="FormData.result!==undefined"
                   :color="FormData.result?'success':'error'">
                {{FormData.result?'合格':'不合格'}}
              </Tag>
            </FormItem>
          </Form>
        </Card>
      </Row>

      <br>

      <Row :gutter="16">
        <Col span="12">
        <!-- QC1综合测试 -->
        <Card>
          <p slot="title">QC1综合测试</p>
          <Form ref="formValidate"
                :model="FormData"
                :label-width="120">
            <FormItem label="测试员：">
              {{FormData.testInspector}}
            </FormItem>
            <FormItem label="测试结果：">
              <Tag v-if="FormData.testing!==undefined"
                   :color="FormData.testing?'success':'error'">
                {{FormData.testing?'合格':'不合格'}}
              </Tag>
            </FormItem>
            <FormItem label="测试日期：">
              <!-- {{FormData.testBeginTime}} -->
              2019-08-15
            </FormItem>
            <FormItem label="测试开始时间：">
              {{FormData.testBeginTime}}
            </FormItem>
            <FormItem label="测试完成时间：">
              {{FormData.testCompleteTime}}
            </FormItem>
            <FormItem label="顺转一：">
              <Tag v-if="FormData.veer1Slip!==undefined"
                   :color="FormData.veer1Slip===1?'success':'error'">
                {{FormData.veer1Slip===1?'合格':'不合格'}}
              </Tag>
              <Tag v-if="FormData.veer1cm!==undefined"
                   color="primary">
                {{FormData.veer1cm}}
              </Tag>
              <Tag v-if="FormData.veer1Slip!==undefined"
                   :color="FormData.veer1Slip===1?'success':'error'">
                {{FormData.veer1Slip===1?'不打滑':'打滑'}}
              </Tag>
            </FormItem>
            <FormItem label="顺转二：">
              <Tag v-if="FormData.veer2Slip!==undefined"
                   :color="FormData.veer2Slip===1?'success':'error'">
                {{FormData.veer2Slip===1?'合格':'不合格'}}
              </Tag>
              <Tag v-if="FormData.veer2cm!==undefined"
                   color="primary">
                {{FormData.veer2cm}}
              </Tag>
              <Tag v-if="FormData.veer2Slip!==undefined"
                   :color="FormData.veer2Slip===1?'success':'error'">
                {{FormData.veer2Slip===1?'不打滑':'打滑'}}
              </Tag>
            </FormItem>
            <FormItem label="顺转三：">
              <Tag v-if="FormData.veer3Slip!==undefined"
                   :color="FormData.veer3Slip===1?'success':'error'">
                {{FormData.veer3Slip===1?'合格':'不合格'}}
              </Tag>
              <Tag v-if="FormData.veer3cm!==undefined"
                   color="primary">
                {{FormData.veer3cm}}
              </Tag>
              <Tag v-if="FormData.veer3Slip!==undefined"
                   :color="FormData.veer3Slip===1?'success':'error'">
                {{FormData.veer3Slip===1?'不打滑':'打滑'}}
              </Tag>
            </FormItem>
            <FormItem label="逆转一：">
              <Tag v-if="FormData.turn1Slip!==undefined"
                   :color="FormData.turn1Slip===1?'success':'error'">
                {{FormData.turn1Slip===1?'合格':'不合格'}}
              </Tag>
              <Tag v-if="FormData.turn1cm!==undefined"
                   color="primary">
                {{FormData.turn1cm}}
              </Tag>
              <Tag v-if="FormData.turn1Slip!==undefined"
                   :color="FormData.turn1Slip===1?'success':'error'">
                {{FormData.turn1Slip===1?'不打滑':'打滑'}}
              </Tag>
            </FormItem>
            <FormItem label="逆转二：">
              <Tag v-if="FormData.turn2Slip!==undefined"
                   :color="FormData.turn2Slip===1?'success':'error'">
                {{FormData.turn2Slip===1?'合格':'不合格'}}
              </Tag>
              <Tag v-if="FormData.turn2cm!==undefined"
                   color="primary">
                {{FormData.turn2cm}}
              </Tag>
              <Tag v-if="FormData.turn2Slip!==undefined"
                   :color="FormData.turn2Slip===1?'success':'error'">
                {{FormData.turn2Slip===1?'不打滑':'打滑'}}
              </Tag>
            </FormItem>
            <FormItem label="逆转三：">
              <Tag v-if="FormData.turn3Slip!==undefined"
                   :color="FormData.turn3Slip===1?'success':'error'">
                {{FormData.turn3Slip===1?'合格':'不合格'}}
              </Tag>
              <Tag v-if="FormData.turn3cm!==undefined"
                   color="primary">
                {{FormData.turn3cm}}
              </Tag>
              <Tag v-if="FormData.turn3Slip!==undefined"
                   :color="FormData.turn3Slip===1?'success':'error'">
                {{FormData.turn3Slip===1?'不打滑':'打滑'}}
              </Tag>
            </FormItem>
            <FormItem label="顺转：">
              <Tag v-if="FormData.veer!==undefined"
                   :color="FormData.veer?'success':'error'">
                {{FormData.veer?'合格':'不合格'}}
              </Tag>
            </FormItem>
            <FormItem label="逆转：">
              <Tag v-if="FormData.turn!==undefined"
                   :color="FormData.turn?'success':'error'">
                {{FormData.turn?'合格':'不合格'}}
              </Tag>
            </FormItem>
            <FormItem label="电流：">
              <Tag v-if="FormData.current!==undefined"
                   color="primary">
                {{FormData.current}}
              </Tag>
            </FormItem>
            <FormItem label="电压：">
              <Tag v-if="FormData.voltage!==undefined"
                   color="primary">
                {{FormData.voltage}}
              </Tag>
            </FormItem>
            <FormItem label="功率值：">
              <Tag v-if="FormData.power!==undefined"
                   color="primary">
                {{FormData.power}}
              </Tag>
            </FormItem>
          </Form>
        </Card>
        </Col>

        <Col span="12">
        <Row>
          <!-- QC2静音间测试 -->
          <Card>
            <p slot="title">静音间测试</p>
            <Form ref="formValidate"
                  :model="FormData"
                  :label-width="120">
              <FormItem label="测试员：">
                {{FormData.muteInspector}}
              </FormItem>
              <FormItem label="测试结果：">
                <Tag v-if="FormData.mute!==undefined"
                     :color="FormData.mute?'success':'error'">
                  {{FormData.mute?'合格':'不合格'}}
                </Tag>
              </FormItem>
              <FormItem label="测试日期：">
                <!-- {{FormData.muteBeginTime}} -->
                2019-08-15
              </FormItem>
              <FormItem label="测试开始时间：">
                {{FormData.muteBeginTime}}
              </FormItem>
              <FormItem label="测试完成时间：">
                {{FormData.muteCompleteTime}}
              </FormItem>
              <FormItem label="低压测试结果：">
                <Tag v-if="FormData.lowPressure!==undefined"
                     :color="FormData.lowPressure===1?'success':'error'">
                  {{FormData.lowPressure===1?'合格':'不合格'}}
                </Tag>
              </FormItem>
              <FormItem label="分贝检测结果：">
                <Tag v-if="FormData.decibel!==undefined"
                     :color="FormData.decibel===1?'success':'error'">
                  {{FormData.decibel===1?'合格':'不合格'}}
                </Tag>
              </FormItem>
              <FormItem label="接地测试结果：">
                <Tag v-if="FormData.landing!==undefined"
                     :color="FormData.landing===1?'success':'error'">
                  {{FormData.landing===1?'合格':'不合格'}}
                </Tag>
              </FormItem>
              <FormItem label="耐压测试结果：">
                <Tag v-if="FormData.pressurization!==undefined"
                     :color="FormData.pressurization===1?'success':'error'">
                  {{FormData.pressurization===1?'合格':'不合格'}}
                </Tag>
              </FormItem>

            </Form>
          </Card>
        </Row>

        <br>

        <Row>
          <!-- QC3外观检测 -->
          <Card>
            <p slot="title">外观检测</p>
            <Form ref="formValidate"
                  :model="FormData"
                  :label-width="120">
              <FormItem label="测试员：">
                {{FormData.appearanceInspector}}
              </FormItem>
              <FormItem label="测试结果：">
                <Tag v-if="FormData.appearance!==undefined"
                     :color="FormData.appearance===1?'success':'error'">
                  {{FormData.appearance===1?'合格':'不合格'}}
                </Tag>
              </FormItem>
              <FormItem label="测试日期：">
                <!-- {{FormData.appearanceTime}} -->
                2019-08-15
              </FormItem>
            </Form>
          </Card>
        </Row>
        </Col>

      </Row>

    </Card>
  </div>
</template>

<script>
// import list from './mockData.js';
import { params } from "@/libs/params";

export default {
  data () {
    return {
      // 搜索主键
      number: "",
      // 表单数据
      FormData: {},
      row: {}
    };
  },
  created () {
    // this.number = params(this, 'checkSearchNumber');
    this.row = JSON.parse(params(this, "checkSearchNumber"));
    this.number = this.row.number;
    if (this.number !== undefined) {
      this.search();
    }
  },
  methods: {
    // 顶部搜索
    search () {
      // if (list.some(row => this.number === row.number)) {
      //   list.forEach(row => {
      //     // 数据处理
      //     if (this.number === row.number) {
      this.FormData = this.row;
      const row = this.row;
      // QC1综合测试
      this.FormData.veer =
        row.veer1Slip === 1 && row.veer2Slip === 1 && row.veer3Slip === 1;
      this.FormData.turn =
        row.turn1Slip === 1 && row.turn2Slip === 1 && row.turn3Slip === 1;
      this.FormData.testing = this.FormData.veer && this.FormData.turn;
      // 静音间测试
      this.FormData.mute =
        row.lowPressure === 1 &&
        row.decibel === 1 &&
        row.landing === 1 &&
        row.pressurization === 1;
      // 总结果
      this.FormData.result =
        this.FormData.veer && this.FormData.mute && this.FormData.appearance;
      //     }
      //   });
      // } else {
      //   this.$Message.error('查无此编码！');
      //   // this.FormData = {};
      // }
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
        margin-bottom: 5px;
        &-content {
          // font-size: 13px;
        }
      }
      label {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}
</style>
