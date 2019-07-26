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
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '40px',
        left: '20px',
        right: '30px',
        bottom: '50px',
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
            formatter: '{value}%'
          },
          min: 60,
          max: 100
        }
      ],
      legend: {
        data: ['其他', '1#线', '2#线', '22#线'],
        bottom: 0,
        textStyle: {
          color: '#fff'
        }
      },
      dataZoom: [
        {
          show: true,
          height: 15,
          xAxisIndex: [0],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon:
            'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'
          },
          textStyle: {
            color: '#fff'
          },
          borderColor: '#90979c'
        },
        {
          type: 'inside'
          // show: true
          // height: 15,
          // start: 1,
          // end: 35
        }
      ],
      series: [
        {
          name: '其他',
          type: 'line',
          smooth: true,
          data: [93, 82, 83, 74, 90, 88, 91]
        },
        {
          name: '1#线',
          type: 'line',
          smooth: true,
          data: [92, 95, 93, 93, 89, 86, 90]
        },
        {
          name: '2#线',
          type: 'line',
          smooth: true,
          data: [88, 94, 89, 91, 91, 86, 83]
        },
        {
          name: '22#线',
          type: 'line',
          smooth: true,
          data: [80, 77, 75, 83, 79, 74, 81]
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
