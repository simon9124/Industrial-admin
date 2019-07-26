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
      dom: null,
      data: [0.63, 0.65, 0.64, 0.68, 0.61]
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    }
  },
  mounted () {
    const option = {
      graphic: [
        {
          type: 'group',
          left: 'center',
          bottom: 15,
          children: [
            {
              type: 'text',
              z: 100,
              left: '10',
              top: 'middle',
              style: {
                fill: '#fff',
                text: '合格数量：',
                font: '13px Microsoft YaHei'
              }
            },
            {
              type: 'text',
              z: 100,
              left: '75',
              top: 'middle',
              style: {
                fill: '#fff',
                text: '48',
                font: '16px Microsoft YaHei'
              }
            },
            {
              type: 'text',
              z: 100,
              left: '110',
              top: 'middle',
              style: {
                fill: '#fff',
                text: '不合格数量：',
                font: '13px Microsoft YaHei'
              }
            },
            {
              type: 'text',
              z: 100,
              left: '185',
              top: 'middle',
              style: {
                fill: '#fff',
                text: '4',
                font: '16px Microsoft YaHei'
              }
            }
          ]
        }
      ],
      series: [
        {
          type: 'liquidFill',
          radius: '55%',
          data: this.data,
          // color: '#e5e315',
          backgroundStyle: {
            borderWidth: 3,
            borderColor: 'rgb(255,0,255,0.6)',
            color: 'rgb(255,0,255,0.01)'
          },
          amplitude: 16,
          label: {
            normal: {
              formatter: (0.93 * 100).toFixed(1) + '%',
              textStyle: {
                fontSize: 24
                // color: '#fff'
              }
            }
          },
          outline: {
            itemStyle: {
              // borderColor: '#87cefa',
              borderWidth: 5
            }
          }
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
