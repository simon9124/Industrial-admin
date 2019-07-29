<template>
  <div class="dooya-container">
    <Row :gutter="16">

      <!-- QC1 -->
      <Col :md="8"
           :sm="12"
           :xs="24">
      <Card>
        <p slot="title">检测标准</p>
        <Form ref="standardForm"
              :model="standardForm"
              :label-width="100">
          <FormItem label="高压接地："
                    prop="highVoltage">
            {{standardForm.highVoltage}}
          </FormItem>
          <FormItem label="声噪（DB）："
                    prop="acousticNoise">
            {{standardForm.acousticNoise}}
          </FormItem>
          <FormItem label="转速："
                    prop="revolutionSpeed">
            {{standardForm.revolutionSpeed}}
          </FormItem>
          <FormItem label="电压："
                    prop="voltage">
            {{standardForm.voltage}}
          </FormItem>
          <FormItem label="电流："
                    prop="current">
            {{standardForm.current}}
          </FormItem>
        </Form>
      </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
export default {
  name: 'checkStandard',
  data () {
    return {
      standardForm: {
        highVoltage: 0,
        acousticNoise: 0,
        revolutionSpeed: 0,
        voltage: 0,
        current: 0
      }
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    .ivu-card-body {
      padding: 10px;
    }
  }
  .ivu-form {
    &-item {
      margin-bottom: 5px;
    }
    label {
      font-size: 13px;
      font-weight: bold;
    }
  }
}
</style>
