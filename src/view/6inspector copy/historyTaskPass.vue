<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    selectTagOneTimePass: {
      type: String,
      default: "day"
    },
    chartData: {
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
          trigger: "axis",
          formatter: "{b} : {c}%",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          top: "70px",
          left: "30px",
          right: "30px",
          bottom: "20px",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // data: ['8-5', '8-6', '8-7', '8-8', '8-9', '8-10'],
            // data: this.chartData.name,
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
              formatter: "{value}件"
            }
          }
        ],
        series: [
          {
            type: "line",
            smooth: true,
            // data: [97.84, 97.48, 97.59, 97.86, 96.95, 96.4],
            // data: this.chartData.qualifiedRate,
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
                  formatter: "{c}%"
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
    chartData: {
      handler(newVal, oldVal) {
        this.dom.clear();
        this.$set(this.option, "xAxis", [
          {
            type: "category",
            boundaryGap: false,
            // data: ['8-5', '8-6', '8-7', '8-8', '8-9', '8-10', '8-11'],
            data: newVal.name,
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#034c6a"
              }
            }
          }
        ]);
        this.$set(this.option, "series", [
          {
            type: "line",
            smooth: true,
            // data: [4500, 4560, 4800, 4680, 4560, 4320, 4570],
            data: newVal.qualifiedRate,
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
                  formatter: "{c}%"
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
      },
      deep: true
    },
    selectTagOneTimePass(val) {
      this.selectTagOneTimePass = val;

      switch (val) {
        case "day":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#91dcff",
            "#2d8cf0",
            "#32ce32",
            "#fc8a53",
            "#ff81f6"
          ]);
          this.$set(this.option, "xAxis", [
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
                formatter: "{value}件"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "line",
              smooth: true,
              data: [97.84, 97.48, 97.59, 97.86, 96.95, 96.4],
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
                    formatter: "{c}%"
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
        case "week":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#32cd32",
            "#8bd46e",
            "#91dcff",
            "#2d8cf0",
            "#fc8a53",
            "#ff81f6"
          ]);
          this.$set(this.option, "xAxis", [
            {
              type: "category",
              boundaryGap: false,
              data: ["W26", "W27", "W28", "W29", "W30", "W31"],
              splitLine: {
                show: false
              },
              axisLine: {
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
                formatter: "{value}件"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "line",
              smooth: true,
              data: [97.43, 97.62, 97.54, 97.8, 97.48, 96.23],
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
                    formatter: "{c}%"
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
        case "month":
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
          this.$set(this.option, "xAxis", [
            {
              type: "category",
              boundaryGap: false,
              data: ["2月", "3月", "4月", "5月", "6月", "7月"],
              splitLine: {
                show: false
              },
              axisLine: {
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
                formatter: "{value}件"
              }
            }
          ]);
          this.$set(this.option, "series", [
            {
              type: "line",
              smooth: true,
              data: [97.38, 97.32, 97.56, 97.62, 97.41, 97.18],
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
                    formatter: "{c}%"
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
