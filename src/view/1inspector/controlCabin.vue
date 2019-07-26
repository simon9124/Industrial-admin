<template>
  <div class="control-container">

    <!-- title -->
    <div class="title">
      <h2>驾驶舱模块数据</h2>
    </div>

    <Row :gutter="20">

      <!-- 左 -->
      <Col :span="6">
      <div class="col-block col-block-min">
        <div class="col-block-title">
          今日合格率
        </div>
      </div>
      <div class="col-block col-block-min">
        <div class="col-block-title">
          总合格率
        </div>
      </div>
      </Col>

      <!-- 中 -->
      <Col :span="12">
      <div class="col-block col-block-large">
        <div class="col-block-title">
          监测数据
        </div>
      </div>
      </Col>

      <!-- 右 -->
      <Col :span="6">
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

export default {
  components: {
    AssemblyLineNumber,
    AssemblyLinePass
  },
  data () {
    return {};
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./control.scss";
</style>
