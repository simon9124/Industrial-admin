<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from 'echarts';
import { on, off } from '@/libs/tools';
export default {
  name: 'serviceRequests',
  data () {
    return {
      dom: null
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    const option = {
      textStyle: {
        color: '#fff'
      },
      color: ['#32ce32', '#fc8a53', '#91dcff', '#ff81f6'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            // backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '40px',
        left: '20px',
        right: '30px',
        bottom: '30px',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['7-21', '7-22', '7-23', '7-24', '7-25', '7-26', '7-27'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#034c6a'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#034c6a'
            }
          },
          axisLabel: {
            formatter: '{value}件'
          }
        }
      ],
      legend: {
        data: ['其他', '1#线', '2#线', '22#线'],
        bottom: 0,
        textStyle: {
          color: '#fff'
        }
      },
      series: [
        {
          name: '其他',
          type: 'line',
          // stack: '总量',
          // areaStyle: {
          //   normal: {
          //     color: '#2d8cf0'
          //   }
          // },
          smooth: true,
          data: [5, 18, 12, 6, 9, 11, 3]
        },
        {
          name: '1#线',
          type: 'line',
          // stack: '总量',
          // areaStyle: {
          //   normal: {
          //     // color: '#10A6FF'
          //   }
          // },
          smooth: true,
          data: [22, 35, 48, 28, 37, 40, 32]
        },
        {
          name: '2#线',
          type: 'line',
          // stack: '总量',
          // areaStyle: {
          //   normal: {
          //     // color: '#0C17A6'
          //   }
          // },
          smooth: true,
          data: [17, 33, 14, 11, 20, 18, 15]
        },
        {
          name: '22#线',
          type: 'line',
          // stack: '总量',
          // areaStyle: {
          //   normal: {
          //     // color: '#4608A6'
          //   }
          // },
          smooth: true,
          data: [35, 42, 47, 56, 43, 38, 40]
        }
      ]
    };
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, 'resize', this.resize);
    });
  },
  beforeDestroy () {
    off(window, 'resize', this.resize);
  }
};
</script>
