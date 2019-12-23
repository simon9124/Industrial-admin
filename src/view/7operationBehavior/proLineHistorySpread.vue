<template>
  <div ref="dom"></div>
  <!-- style="padding:10px" -->
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
export default {
  name: "serviceRequests",
  props: {
    selectTagHistoryTestStepSpread: {
      type: String,
      default: "comprehensive"
    }
  },
  data () {
    return {
      dom: null,
      option: {
        color: [
          "#ff9900",
          "#2d8cf0",
          "#32ce32",
          "#91dcff",
          "#ff81f6",
          "#91c7ae",
          "#fc8a53",
          // '#ffff43',
          "#ff0000"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}%"
        },
        legend: {
          orient: "vertical",
          left: "10%",
          bottom: "5%",
          data: ["#20", "#21", "#22", "#23", "#24", "#25"],
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "今日生产",
            type: "pie",
            radius: "60%",
            // radius: '75%',
            center: ["70%", "50%"],
            data: [
              { value: 15, name: "#20" },
              { value: 18, name: "#21" },
              { value: 10, name: "#22" },
              { value: 20, name: "#23" },
              { value: 18, name: "#24" },
              { value: 19, name: "#25" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                position: "inner",
                formatter: "{c}%",
                textStyle: {
                  color: "#fff",
                  fontSize: 10
                }
              }
            }
          },
          {
            name: "今日生产",
            type: "pie",
            radius: ["70%", "80%"],
            // radius: '75%',
            center: ["70%", "50%"],
            data: [
              { value: 15, name: "#20" },
              { value: 18, name: "#21" },
              { value: 10, name: "#22" },
              { value: 20, name: "#23" },
              { value: 18, name: "#24" },
              { value: 19, name: "#25" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            label: {
              normal: {
                show: false,
                // position: 'inner',
                formatter: "{b}",
                textStyle: {
                  // color: "#fff"
                  fontSize: 14
                }
              }
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
    selectTagHistoryTestStepSpread (val) {
      this.selectTagHistoryTestStepSpread = val;
      switch (val) {
        case "whole":
          this.dom.clear();
          this.$set(this.option, "color", ["#ff9900", "#2d8cf0", "#32ce32"]);
          this.$set(this.option, "legend", {
            orient: "vertical",
            left: "10%",
            bottom: "5%",
            data: ["综合测试", "静音测试", "外观测试"],
            textStyle: {
              color: "#fff"
            }
          });
          this.$set(this.option, "series", [
            {
              name: "今日生产",
              type: "pie",
              radius: "60%",
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 35, name: "综合测试" },
                { value: 45, name: "静音测试" },
                { value: 20, name: "外观测试" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  position: "inner",
                  formatter: "{c}%",
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              }
            },
            {
              name: "今日生产",
              type: "pie",
              radius: ["70%", "80%"],
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 35, name: "综合测试" },
                { value: 45, name: "静音测试" },
                { value: 20, name: "外观测试" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  show: false,
                  // position: 'inner',
                  formatter: "{b}",
                  textStyle: {
                    // color: "#fff"
                    fontSize: 14
                  }
                }
              }
            }
          ]);
          this.drawChart();
          break;
        case "comprehensive":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#ff9900",
            "#2d8cf0",
            "#32ce32",
            "#91dcff",
            "#ff81f6",
            "#91c7ae",
            "#fc8a53",
            // '#ffff43',
            "#ff0000"
          ]);
          this.$set(this.option, "legend", {
            orient: "vertical",
            left: "10%",
            bottom: "5%",
            data: [
              "刹车打滑",
              "砝码拉不动",
              "单转",
              "反转",
              "不转",
              "蜗杆减不死",
              "通电自传",
              "蜗杆加不活"
            ],
            textStyle: {
              color: "#fff"
            }
          });
          this.$set(this.option, "series", [
            {
              name: "今日生产",
              type: "pie",
              radius: "60%",
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 3, name: "刹车打滑" },
                { value: 12, name: "砝码拉不动" },
                { value: 7, name: "单转" },
                { value: 20, name: "反转" },
                { value: 12, name: "不转" },
                { value: 18, name: "蜗杆减不死" },
                { value: 10, name: "通电自传" },
                { value: 18, name: "蜗杆加不活" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  position: "inner",
                  formatter: "{c}%",
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              }
            },
            {
              name: "今日生产",
              type: "pie",
              radius: ["70%", "80%"],
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 3, name: "刹车打滑" },
                { value: 12, name: "砝码拉不动" },
                { value: 7, name: "单转" },
                { value: 20, name: "反转" },
                { value: 12, name: "不转" },
                { value: 18, name: "蜗杆减不死" },
                { value: 10, name: "通电自传" },
                { value: 18, name: "蜗杆加不活" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  show: false,
                  // position: 'inner',
                  formatter: "{b}",
                  textStyle: {
                    // color: "#fff"
                    fontSize: 14
                  }
                }
              }
            }
          ]);
          this.drawChart();
          break;
        case "mute":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#ff9900",
            "#2d8cf0",
            "#32ce32",
            "#91dcff",
            "#ff81f6",
            "#91c7ae",
            "#fc8a53",
            // '#ffff43',
            "#ff0000"
          ]);
          this.$set(this.option, "legend", {
            orient: "vertical",
            left: "10%",
            bottom: "5%",
            data: [
              "低压不吸合",
              "超分贝",
              "接地不过",
              "高压不过",
              "轴承响",
              "电机响"
            ],
            textStyle: {
              color: "#fff"
            }
          });
          this.$set(this.option, "series", [
            {
              name: "今日生产",
              type: "pie",
              radius: "60%",
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 20, name: "低压不吸合" },
                { value: 35, name: "超分贝" },
                { value: 13, name: "接地不过" },
                { value: 15, name: "高压不过" },
                { value: 9, name: "轴承响" },
                { value: 8, name: "电机响" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  position: "inner",
                  formatter: "{c}%",
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              }
            },
            {
              name: "今日生产",
              type: "pie",
              radius: ["70%", "80%"],
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 20, name: "低压不吸合" },
                { value: 35, name: "超分贝" },
                { value: 13, name: "接地不过" },
                { value: 15, name: "高压不过" },
                { value: 9, name: "轴承响" },
                { value: 8, name: "电机响" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  show: false,
                  // position: 'inner',
                  formatter: "{b}",
                  textStyle: {
                    // color: "#fff"
                    fontSize: 14
                  }
                }
              }
            }
          ]);
          this.drawChart();
          break;
        case "outward":
          this.dom.clear();
          this.$set(this.option, "color", [
            "#ff9900",
            "#2d8cf0",
            "#32ce32",
            "#91dcff",
            "#ff81f6",
            "#91c7ae",
            "#fc8a53",
            // '#ffff43',
            "#ff0000"
          ]);
          this.$set(this.option, "legend", {
            orient: "vertical",
            left: "10%",
            bottom: "5%",
            data: [
              "外管不良",
              "排线不良",
              "螺丝/销子不良",
              "电子行程头不良",
              "内外端盖不良",
              "行程内齿套不良",
              "行程网印不良",
              "前盖板方轴不良"
            ],
            textStyle: {
              color: "#fff"
            }
          });
          this.$set(this.option, "series", [
            {
              name: "今日生产",
              type: "pie",
              radius: "60%",
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 8, name: "外管不良" },
                { value: 15, name: "排线不良" },
                { value: 12, name: "螺丝/销子不良" },
                { value: 14, name: "电子行程头不良" },
                { value: 6, name: "内外端盖不良" },
                { value: 8, name: "行程内齿套不良" },
                { value: 22, name: "行程网印不良" },
                { value: 15, name: "前盖板方轴不良" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  position: "inner",
                  formatter: "{c}%",
                  textStyle: {
                    color: "#fff",
                    fontSize: 10
                  }
                }
              }
            },
            {
              name: "今日生产",
              type: "pie",
              radius: ["70%", "80%"],
              // radius: '75%',
              center: ["70%", "50%"],
              data: [
                { value: 8, name: "外管不良" },
                { value: 15, name: "排线不良" },
                { value: 12, name: "螺丝/销子不良" },
                { value: 14, name: "电子行程头不良" },
                { value: 6, name: "内外端盖不良" },
                { value: 8, name: "行程内齿套不良" },
                { value: 22, name: "行程网印不良" },
                { value: 15, name: "前盖板方轴不良" }
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              },
              label: {
                normal: {
                  show: false,
                  // position: 'inner',
                  formatter: "{b}",
                  textStyle: {
                    // color: "#fff"
                    fontSize: 14
                  }
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
