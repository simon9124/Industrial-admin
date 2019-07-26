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
      color: ['#ef567c', '#3893e5'],
      title: {
        text: '92.0%',
        x: 'center',
        y: 'center',
        textStyle: {
          color: '#fff',
          fontSize: 24,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      legend: {
        data: ['合格数量', '不合格数量'],
        bottom: 5,
        textStyle: {
          color: '#fff'
        }
      },
      calculable: true,
      series: [
        {
          name: '合格数量',
          type: 'pie',
          radius: [85, 105],
          center: ['50%', '50%'],
          data: [
            {
              value: 2256,
              name: '合格数量',
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: '#da70d6'
                  },
                  {
                    offset: 1,
                    color: '#ff4236'
                  }
                ])
              },
              label: {
                normal: {
                  show: false,
                  position: 'center'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            },
            {
              value: 197,
              name: '不合格数量',
              itemStyle: {
                color: 'transparent'
              }
            }
          ]
        },
        {
          name: '不合格数量',
          type: 'pie',
          radius: [90, 100],
          center: ['50%', '50%'],
          data: [
            {
              value: 2256,
              name: '合格数量',
              itemStyle: {
                color: 'transparent'
              }
            },
            {
              value: 197,
              name: '不合格数量',
              itemStyle: {
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
              },
              label: {
                normal: {
                  show: false,
                  position: 'center'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            }
          ]
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
