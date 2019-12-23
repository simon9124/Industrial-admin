<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    selectTagTodayPass: {
      type: String,
      default: "task"
    },
    todayRank: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dom: null,
      option: {
        textStyle: {
          color: "#fff"
        },
        color: ["#91dcff", "#2d8cf0", "#32ce32", "#fc8a53", "#ff81f6"],
        tooltip: {
          show: false,
          trigger: "axis",
          formatter: "{b} : {c}(%)",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          // top: '40px',
          top: "60px",
          left: "40px",
          right: "40px",
          bottom: "20px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ['22#', '24#', '21#', '23#', '20#', '25#'],
            splitLine: {
              show: false
            },
            axisLine: {
              show: false,
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
            max: 100,
            min: 90,
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
              formatter: "{value}%"
            }
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "35%",
            // data: [100.0, 97.5, 96.25, 95.0, 93.75, 92.5],
            itemStyle: {
              normal: {
                barBorderRadius: 12,
                label: {
                  show: true, // 开启显示
                  position: "top", // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: "#ffff43",
                    // color: '#fc8a53',
                    fontSize: 13
                  },
                  formatter: "{c}%"
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#248ff7"
                    // color: '#fccb05'
                    // color: '#8bd46e'
                  },
                  {
                    offset: 1,
                    color: "#6851f1"
                    // color: '#f5804d'
                    // color: '#09bcb7'
                  }
                ])
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    drawChart() {
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(this.option, true, true);
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
    todayRank: {
      handler(newVal, oldVal) {
        this.dom.clear();
        this.$set(this.option, "xAxis", [
          {
            type: "category",
            boundaryGap: false,
            // data: ['22#', '24#', '21#', '23#', '20#', '25#'],
            data: newVal.name,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#034c6a"
              }
            }
          }
        ]);
        this.$set(this.option, "yAxis", [
          {
            type: "value",
            show: false,
            // max: 100,
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
              formatter: "{value}%"
            }
          }
        ]);
        this.$set(this.option, "series", [
          {
            type: "bar",
            barWidth: "35%",
            // data: [100.0, 97.5, 96.25, 95.0, 93.75, 92.5],
            data: newVal.qualifiedRate,
            itemStyle: {
              normal: {
                barBorderRadius: 12,
                label: {
                  show: true, // 开启显示
                  position: "top", // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: "#ffff43",
                    // color: '#fc8a53',
                    fontSize: 13
                  },
                  formatter: "{c}%"
                },
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#248ff7"
                    // color: '#fccb05'
                    // color: '#8bd46e'
                  },
                  {
                    offset: 1,
                    color: "#6851f1"
                    // color: '#f5804d'
                    // color: '#09bcb7'
                  }
                ])
              }
            }
          }
        ]);
        this.drawChart();
      },
      deep: true
    },
    selectTagTodayPass(val) {
      this.selectTagTodayPass = val;
      switch (val) {
        case "task":
          this.dom.clear();
          this.$set(this.option, "xAxis", [
            {
              type: "category",
              boundaryGap: false,
              data: ["22#", "24#", "21#", "23#", "20#", "25#"],
              splitLine: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#034c6a"
                }
              }
            }
          ]);
          this.$set(this.option, "yAxis", [
            {
              type: "value",
              show: false,
              max: 100,
              min: 90,
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
                formatter: "{value}%"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "bar",
              barWidth: "35%",
              data: [100.0, 97.5, 96.25, 95.0, 93.75, 92.5],
              itemStyle: {
                normal: {
                  barBorderRadius: 12,
                  label: {
                    show: true, // 开启显示
                    position: "top", // 在上方显示
                    textStyle: {
                      // 数值样式
                      color: "#ffff43",
                      // color: '#fc8a53',
                      fontSize: 13
                    },
                    formatter: "{c}%"
                  },
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#248ff7"
                      // color: '#fccb05'
                      // color: '#8bd46e'
                    },
                    {
                      offset: 1,
                      color: "#6851f1"
                      // color: '#f5804d'
                      // color: '#09bcb7'
                    }
                  ])
                }
              }
            }
          ]);
          this.drawChart();
          break;
        case "once":
          this.dom.clear();
          this.$set(this.option, "xAxis", [
            {
              type: "category",
              boundaryGap: false,
              data: ["23#", "21#", "22#", "24#", "20#", "25#"],
              splitLine: {
                show: false
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "#034c6a"
                }
              }
            }
          ]);
          this.$set(this.option, "yAxis", [
            {
              type: "value",
              show: false,
              max: 100,
              min: 95,
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
                formatter: "{value}%"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "bar",
              barWidth: "35%",
              data: [97.8, 97.62, 97.54, 97.48, 97.43, 96.23],
              itemStyle: {
                normal: {
                  barBorderRadius: 12,
                  label: {
                    show: true, // 开启显示
                    position: "top", // 在上方显示
                    textStyle: {
                      // 数值样式
                      // color: '#ffff43',
                      color: "#fc8a53",
                      fontSize: 13
                    },
                    formatter: "{c}%"
                  },
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#248ff7"
                      // color: '#fccb05'
                      // color: '#8bd46e'
                    },
                    {
                      offset: 1,
                      // color: '#6851f1'
                      // color: '#f5804d'
                      color: "#09bcb7"
                    }
                  ])
                }
              }
            }
          ]);
          this.drawChart();
          break;
      }
    }
  }
};
</script>
