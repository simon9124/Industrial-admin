<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";

var dataList = [
  {
    text: "生产目标",
    value: "4800件",
    color: "#097ff9"
    // color: '#5dd054'
  },
  {
    text: "测量总数",
    value: "4600件",
    color: "#097ff9"
  },
  {
    text: "任务达成率",
    value: "95.83%",
    color: "#097ff9"
    // color: '#ff6804'
  },
  {
    text: "一次合格率",
    value: "97.00%",
    color: "#097ff9"
    // color: '#ff6804'
  }
];

function dataFormat(
  v = {
    value: "12345,12",
    color: "#5dd054"
  }
) {
  return [
    {
      value: 0,
      name: v.value,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              // color: '#00feff'
              color: "#91dcff"
            },
            {
              offset: 1,
              color: v.color
            }
          ])
        }
      },
      label: {
        normal: {
          textStyle: {
            fontSize: 26,
            fontWeight: "bold",
            color: "#f56d04"
          }
        }
      }
    }
  ];
}

function childrenFun(str = "按钮") {
  return [
    {
      type: "rect",
      left: "center",
      top: "center",
      shape: {
        width: 150,
        height: 40,
        r: 20
      },
      style: {
        fill: "#4709f9",
        shadowColor: "#f909a1",
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        lineWidth: 2,
        shadowBlur: 10
        //   stroke: '#00feff'
      }
    },
    {
      type: "text",
      left: "center",
      top: "center",
      style: {
        fill: "#fff",
        text: str,
        font: "14px Microsoft YaHei"
      }
    }
  ];
}
export default {
  name: "serviceRequests",
  props: {
    selectTagHistoryTask: {
      type: String,
      default: "day"
    }
  },
  data() {
    return {
      dom: null,
      option: {
        // backgroundColor: '#04184A',
        legend: {
          show: false
        },
        tooltip: {
          show: false
        },
        series: [
          {
            type: "pie",
            radius: ["50%", "53%"],
            center: ["18%", "40%"],
            hoverAnimation: false,
            label: {
              normal: {
                position: "center"
              }
            },
            data: dataFormat(dataList[0])
          },
          {
            type: "pie",
            radius: ["50%", "53%"],
            center: ["40%", "40%"],
            hoverAnimation: false,
            label: {
              normal: {
                position: "center"
              }
            },
            data: dataFormat(dataList[1])
          },
          {
            type: "pie",
            radius: ["50%", "53%"],
            center: ["62%", "40%"],
            hoverAnimation: false,
            label: {
              normal: {
                position: "center"
              }
            },
            data: dataFormat(dataList[2])
          },
          {
            type: "pie",
            radius: ["50%", "53%"],
            center: ["84%", "40%"],
            hoverAnimation: false,
            label: {
              normal: {
                position: "center"
              }
            },
            data: dataFormat(dataList[3])
          }
        ],
        graphic: {
          elements: [
            {
              type: "group",
              left: "8%",
              bottom: "10%",
              z: 100,
              children: childrenFun(dataList[0].text)
            },
            {
              type: "group",
              left: "30%",
              bottom: "10%",
              z: 100,
              children: childrenFun(dataList[1].text)
            },
            {
              type: "group",
              left: "52%",
              bottom: "10%",
              z: 100,
              children: childrenFun(dataList[2].text)
            },
            {
              type: "group",
              left: "74%",
              bottom: "10%",
              z: 100,
              children: childrenFun(dataList[3].text)
            }
          ]
        }
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
  }
};
</script>
