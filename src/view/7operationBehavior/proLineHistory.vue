<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    selectTagHistoryProLine: {
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
            max: 720,
            min: 640,
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
            data: [675, 684, 720, 702, 684, 648],
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
    selectTagHistoryProLine (val) {
      this.selectTagHistoryProLine = val;
      switch (val) {
        case "20":
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
              max: 720,
              min: 640,
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
              data: [675, 684, 720, 702, 684, 648],
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
        case "21":
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
              max: 870,
              min: 770,
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
              data: [810, 821, 864, 842, 821, 778],
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
        case "22":
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
              max: 480,
              min: 430,
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
              data: [450, 456, 480, 468, 456, 432],
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
        case "23":
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
              max: 960,
              min: 860,
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
        case "24":
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
              max: 870,
              min: 770,
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
              data: [810, 821, 864, 842.4, 821, 778],
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
        case "25":
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
              max: 920,
              min: 820,
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
              data: [855, 867, 912, 889, 866, 821],
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
