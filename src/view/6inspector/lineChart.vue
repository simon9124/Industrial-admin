<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "line-chart",
  props: {
    chartData: {
      type: Object,
      default: () => {}
    },
    // 达标值
    standardValue: {
      type: Number,
      default: 80
    },
    // y轴最大值
    yAxisMaxValue: {
      type: Number,
      default: 100
    },
    // 值的单位
    unit: {
      type: String,
      default: "%"
    }
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    drawChart() {
      const option = {
        textStyle: {
          color: "#fff"
        },
        color: [
          "#F5A503",
          "#32cd32",
          "#8bd46e",
          "#91dcff",
          "#2d8cf0",
          "#fc8a53",
          "#ff81f6"
        ],
        tooltip: {
          trigger: "axis",
          formatter: `{b}：{c}${this.unit}`,
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          top: "30px",
          left: "30px",
          right: "40px",
          bottom: "20px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"],
            data: this.chartData.xAxisData,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#034c6a"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false,
            max: this.yAxisMaxValue,
            // min: 90,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#034c6a"
              }
            },
            axisLabel: {
              show: false,
              formatter: `{value}${this.unit}`
            }
          }
        ],
        series: [
          {
            type: "line",
            smooth: true,
            // data: [20, 22, 23, 18, 15, 13],
            data: this.chartData.seriesData,
            areaStyle: {
              normal: {
                color: {
                  type: "linear", // 设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    // {
                    //   offset: 0,
                    //   color: "#09bcb7" // 0% 处的颜色
                    // },
                    // {
                    //   offset: 1,
                    //   color: "#0b122e" // 100% 处的颜色
                    // },
                    {
                      offset: 0,
                      color: "#6aa2c5" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#0b122e" // 100% 处的颜色
                    }
                  ],

                  globalCoord: false // 缺省为 false
                }
              }
            },
            itemStyle: {
              normal: {
                label: {
                  show: true, // 开启显示
                  position: "top", // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: "#F5A503",
                    // color: "#fc8a53",
                    fontSize: 13
                  },
                  formatter: `{c}${this.unit}`
                }
              }
            },
            markLine: {
              // symbol: "none",
              itemStyle: {
                normal: {
                  borderWidth: 1,
                  lineStyle: {
                    type: "dash",
                    color: "#fff",
                    width: 2
                  },
                  label: {
                    // show: true, // 开启显示
                    position: "end", // 在右侧显示
                    formatter: `达标\n{c}${this.unit}`,
                    textStyle: {
                      fontWeight: "bolder",
                      fontSize: "12"
                    }
                  }
                }
              },
              data: [
                {
                  yAxis: this.standardValue
                  // type: "average",
                  // name: "平均值",
                  // label: {
                  //   show: false
                  // },
                  // lineStyle: {
                  //   normal: {
                  //     color: "#fff"
                  //   }
                  // }
                }
              ]
            }
          }
        ],
        // 关闭切换数据时重新渲染的动画
        animation: false
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option, true, true);
        on(window, "resize", this.resize);
      });
    }
  },
  mounted() {
    this.drawChart();
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.dom.clear();
        this.drawChart();
      },
      deep: true
    }
  }
};
</script>
