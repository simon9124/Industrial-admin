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
      <i-col :md="24"
             :lg="8"
             style="margin-bottom: 20px;">
        <Card shadow>
          <check-standard class='chart-check-standard'
                          style="height: 320px;"></check-standard>
        </Card>
      </i-col>
      <i-col :md="24"
             :lg="8"
             style="margin-bottom: 20px;">
        <Card shadow>
          <product-sum style="height: 320px;"></product-sum>
        </Card>
      </i-col>
    </Row>

    <!-- table -->
    <Row>
      <ElectricSearch></ElectricSearch>
    </Row>

  </div>
</template>

<script>
import InforCard from '_c/info-card';
import CountTo from '_c/count-to';
import CheckStandard from './checkStandard.vue';
import ProductSum from './productSum.vue';
import QualificationRateToday from './qualificationRateToday.vue';
import Example from './example.vue';
import ElectricSearch from '@/view/2systemManage/electricSearch';

export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    Example,
    ProductSum,
    CheckStandard,
    QualificationRateToday,
    ElectricSearch
  },
  data () {
    return {
      inforCardData: [
        {
          title: '今日检测',
          icon: 'ios-build',
          count: 12,
          color: '#2d8cf0'
        },
        {
          title: '本月检测',
          icon: 'ios-build-outline',
          count: 298,
          color: '#19be6b'
        },
        {
          title: '本季检测',
          icon: 'md-build',
          count: 744,
          color: '#ff9900'
        },
        // { title: '合格率', icon: 'md-share', count: 92, color: '#ed3f14' },
        {
          title: '生产总量',
          icon: 'md-hand',
          count: 1288,
          color: '#E46CBB'
        }
        // { title: '新增页面', icon: 'md-map', count: 14, color: '#9A66E4' }
      ]
    };
  },
  mounted () {
    //
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .count-style {
    font-size: 50px;
  }
  .chart-check-standard > div {
    canvas:not(:first-child) {
      top: 10px !important;
    }
  }
}
</style>
