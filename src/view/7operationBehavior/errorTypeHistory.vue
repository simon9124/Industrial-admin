<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    selectTagHistoryErrorType: {
      type: String,
      default: "instandardized"
    }
  },
  data () {
    return {
      dom: null,
      option: {
        textStyle: {
          color: "#fff"
        },
        color: ["#91dcff", "#2d8cf0", "#32ce32", "#fc8a53", "#ff81f6"],
        tooltip: {
          trigger: "axis",
          formatter: "{b} : {c}(次)",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          top: "60px",
          left: "30px",
          right: "30px",
          bottom: "20px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["8-5", "8-6", "8-7", "8-8", "8-9", "8-10"],
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
            max: 3600,
            min: 3200,
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
              formatter: "{value}次"
            }
          }
        ],
        series: [
          {
            type: "line",
            smooth: true,
            data: [3375, 3420, 3600, 3510, 3420, 3240],
            areaStyle: {
              normal: {
                color: {
                  type: "linear", // 设置线性渐变
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
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
                    color: "#ffff43",
                    // color: '#fc8a53',
                    fontSize: 13
                  },
                  formatter: "{c}次"
                }
              }
            },
            markLine: {
              symbol: "none",
              data: [
                {
                  type: "average",
                  name: "平均值",
                  label: {
                    show: false
                  },
                  lineStyle: {
                    normal: {
                      color: "#fff"
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    };
  },
  methods: {
    resize () {
      this.dom.resize();
    },
    drawChart () {
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(this.option, true, true);
        on(window, "resize", this.resize);
      });
    }
  },
  mounted () {
    this.drawChart();
  },
  beforeDestroy () {
    off(window, "resize", this.resize);
  },
  watch: {
    selectTagHistoryErrorType (val) {
      this.selectTagHistoryErrorType = val;
      switch (val) {
        case "instandardized":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#91dcff",
            "#2d8cf0",
            "#32ce32",
            "#fc8a53",
            "#ff81f6"
          ]);
          this.$set(this.option, "yAxis", [
            {
              type: "value",
              show: false,
              max: 3600,
              min: 3200,
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
                formatter: "{value}次"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "line",
              smooth: true,
              data: [3375, 3420, 3600, 3510, 3420, 3240],
              areaStyle: {
                normal: {
                  color: {
                    type: "linear", // 设置线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
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
                      // color: '#fc8a53',
                      color: "#ffff43",
                      fontSize: 13
                    },
                    formatter: "{c}次"
                  }
                }
              },
              markLine: {
                symbol: "none",
                data: [
                  {
                    type: "average",
                    name: "平均值",
                    label: {
                      show: false
                    },
                    lineStyle: {
                      normal: {
                        color: "#fff"
                      }
                    }
                  }
                ]
              }
            }
          ]);
          this.drawChart();
          break;
        case "missStep":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#32cd32",
            "#8bd46e",
            "#91dcff",
            "#2d8cf0",
            "#fc8a53",
            "#ff81f6"
          ]);
          this.$set(this.option, "yAxis", [
            {
              type: "value",
              show: false,
              max: 1000,
              min: 800,
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
                formatter: "{value}次"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "line",
              smooth: true,
              data: [900, 912, 960, 936, 912, 864],
              areaStyle: {
                normal: {
                  color: {
                    type: "linear", // 设置线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#09bcb7" // 0% 处的颜色
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
                      // color: '#fc8a53',
                      fontSize: 13
                    },
                    formatter: "{c}次"
                  }
                }
              },
              markLine: {
                symbol: "none",
                data: [
                  {
                    type: "average",
                    name: "平均值",
                    label: {
                      show: false
                    },
                    lineStyle: {
                      normal: {
                        color: "#fff"
                      }
                    }
                  }
                ]
              }
            }
          ]);
          this.drawChart();
          break;
        case "leaveOut":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#ffff43",
            "#ff9900",
            "#fc8a53",
            "#91dcff",
            "#2d8cf0",
            "#32ce32",
            "#ff81f6"
          ]);
          this.$set(this.option, "yAxis", [
            {
              type: "value",
              show: false,
              max: 240,
              min: 215,
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
                formatter: "{value}次"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "line",
              smooth: true,
              data: [225, 228, 240, 234, 228, 216],
              areaStyle: {
                normal: {
                  color: {
                    type: "linear", // 设置线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#ffff43" // 0% 处的颜色
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
                      color: "#25f3e6",
                      // color: '#00f6ff',
                      fontSize: 13
                    },
                    formatter: "{c}次"
                  }
                }
              },
              markLine: {
                symbol: "none",
                data: [
                  {
                    type: "average",
                    name: "平均值",
                    label: {
                      show: false
                    },
                    lineStyle: {
                      normal: {
                        color: "#fff"
                      }
                    }
                  }
                ]
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
