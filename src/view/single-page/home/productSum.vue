<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    }
  },
  mounted() {
    const option = {
      color: ["#2d8cf0"],
      title: {
        text: "本周流水线生产量",
        x: "center",
        textStyle: {
          color: "#516b91"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            // backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: "40px",
        left: "20px",
        right: "30px",
        bottom: "10px",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: ["7-21", "7-22", "7-23", "7-24", "7-25", "7-26", "7-27"],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#2d8cf0"
            }
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          show: false,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#2d8cf0"
            }
          },
          axisLabel: {
            show: false,
            formatter: "{value}件"
          }
        }
      ],
      // legend: {
      //   data: ['其他', '1#线', '2#线', '22#线'],
      //   bottom: 0
      // },
      series: [
        {
          type: "line",
          smooth: true,
          data: [66, 88, 74, 92, 67, 35, 29],
          areaStyle: {},
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: "top", // 在上方显示
                textStyle: {
                  // 数值样式
                  color: "#034c6a",
                  fontSize: 13
                }
              }
            }
          }
        }
      ]
    };
    this.$nextTick(() => {
      this.dom = echarts.init(this.$refs.dom);
      this.dom.setOption(option);
      on(window, "resize", this.resize);
    });
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
