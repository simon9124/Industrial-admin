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
    // var myColor = ['#87cefa'];
    const option = {
      grid: {
        // left: '11%',
        top: '80px',
        // right: '0%',
        // bottom: '8%',
        containLabel: true
      },
      xAxis: [
        {
          show: false
        }
      ],
      yAxis: [
        {
          axisTick: 'none',
          axisLine: 'none',
          offset: '27',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '18'
            }
          },
          data: [
            '今日数据：12件',
            '本周数据：65件',
            '本月数据：298件',
            '当季数据：744件',
            '年度数据：3362件'
          ]
        },
        {
          axisTick: 'none',
          axisLine: 'none',
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '16'
            }
          },
          // data: ['10', '9', '8', '7', '6']
          data: ['', '', '', '', '']
        },
        {
          // name: '分拨延误TOP 10',
          nameGap: '50',
          nameTextStyle: {
            color: '#ffffff',
            fontSize: '16'
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)'
            }
          },
          data: []
        }
      ],
      series: [
        {
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: [4, 13, 25, 29, 38],
          label: {
            normal: {
              show: false,
              position: 'right',
              textStyle: {
                color: '#ffffff',
                fontSize: '16'
              }
            }
          },
          barWidth: 12,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#348fe6'
                },
                {
                  offset: 1,
                  color: '#625bef'
                }
              ])
            }
          },
          z: 2
        },
        {
          name: '白框',
          type: 'bar',
          yAxisIndex: 1,
          barGap: '-100%',
          data: [49.5, 49.5, 49.5, 49.5, 49.5],
          barWidth: 20,
          itemStyle: {
            normal: {
              color: '#0e2147',
              barBorderRadius: 5
            }
          },
          z: 1
        },
        {
          name: '外框',
          type: 'bar',
          yAxisIndex: 2,
          barGap: '-100%',
          data: [50, 50, 50, 50, 50],
          barWidth: 24,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#348fe6'
                },
                {
                  offset: 1,
                  color: '#625bef'
                }
              ]),
              barBorderRadius: 5
            }
          },
          z: 0
        },
        {
          name: '外圆',
          type: 'scatter',
          hoverAnimation: false,
          data: [0, 0, 0, 0, 0],
          yAxisIndex: 2,
          symbolSize: 32,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: '#348fe6'
                },
                {
                  offset: 1,
                  color: '#625bef'
                }
              ]),
              opacity: 1
            }
          },
          z: 2
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
