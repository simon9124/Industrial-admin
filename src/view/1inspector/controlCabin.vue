<template>
  <div class="control-container">

    <!-- title -->
    <div class="title">
      <h2>驾驶舱模块数据</h2>
    </div>

    <Row :gutter="20">

      <!-- 左 -->
      <Col :xs="24"
           :sm="24"
           :lg="6">
      <div class="col-block col-block-min">
        <div class="col-block-title">
          今日合格率
        </div>
        <div class="col-block-chart">
          <qualification-rate-today style="height: 340px;" />
        </div>
      </div>
      <div class="col-block col-block-min">
        <div class="col-block-title">
          总合格率
        </div>
        <div class="col-block-chart">
          <qualification-rate-all style="height: 340px;" />
        </div>
      </div>
      </Col>

      <!-- 中 -->
      <Col :xs="24"
           :sm="24"
           :lg="12">
      <div class="col-block col-block-large">
        <div class="col-block-title">
          检测总数
        </div>
        <div class="col-block-chart">
          <Check-count style="height: 400px;" />
        </div>
      </div>
      </Col>

      <!-- 右 -->
      <Col :xs="24"
           :sm="24"
           :lg="6">
      <div class="col-block col-block-min">
        <div class="col-block-title">
          流水线生产数量
        </div>
        <div class="col-block-chart">
          <assembly-line-number style="height: 340px;" />
        </div>
      </div>
      <div class="col-block col-block-min">
        <div class="col-block-title">
          流水线合格率
        </div>
        <div class="col-block-chart">
          <assembly-line-pass style="height: 340px;" />
        </div>
      </div>
      </Col>

    </Row>
  </div>
</template>

<script>
// components
import AssemblyLineNumber from './assemblyLineNumber.vue';
import AssemblyLinePass from './assemblyLinePass.vue';
import QualificationRateToday from './qualificationRateToday.vue';
import QualificationRateAll from './qualificationRateAll.vue';
import CheckCount from './checkCount.vue';

export default {
  components: {
    AssemblyLineNumber,
    AssemblyLinePass,
    QualificationRateToday,
    QualificationRateAll,
    CheckCount
  },
  data () {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./control.scss";
</style>
