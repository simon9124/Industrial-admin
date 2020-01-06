<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
import { formatDate } from "@/libs/getDate";
import { monthData } from "./mockData";

// api
import { findTotalWithCurrentMonthByDate } from "@/api/contrlCabin";

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
  async mounted() {
    /* eslint-disable */
    const result = !this.isMock
      ? (await findTotalWithCurrentMonthByDate(
          new Date().getFullYear() +
            "-" +
            (new Date().getMonth() + 1) +
            "-" +
            "01",
          formatDate(new Date()),
          "line"
        )).data.data
      : monthData;
    const option = {
      color: ["#2d8cf0", "#19be6b"],
      title: {
        text: "本月合格率",
        x: "center",
        textStyle: {
          color: "#516b91"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        // orient: 'vertical',
        left: 30,
        top: 0,
        data: ["产量", "合格数"]
      },
      grid: {
        // top: "80px",
        left: "3%",
        right: "4%",
        bottom: "20px",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: result.name
        }
      ],
      yAxis: [
        {
          show: false,
          type: "value"
        }
      ],
      // dataZoom: [
      //   {
      //     // show: true,
      //     show: false,
      //     height: 5,
      //     xAxisIndex: [0],
      //     bottom: 30,
      //     start: 30,
      //     end: 70,
      //     handleIcon:
      //       "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
      //     handleSize: "110%",
      //     handleStyle: {
      //       color: "#d3dee5"
      //     },
      //     textStyle: {
      //       color: "#fff"
      //     },
      //     borderColor: "#90979c"
      //   },
      //   {
      //     // type: 'inside'
      //     // show: true
      //     height: 15,
      //     bottom: 0
      //     // start: 1,
      //     // end: 7
      //   }
      // ],
      series: [
        {
          name: "产量",
          type: "line",
          smooth: true,
          data: result.total,
          // areaStyle: {},
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: "top", // 在上方显示
                textStyle: {
                  // 数值样式
                  color: "#2d8cf0",
                  fontSize: 13
                }
              }
            }
          }
        },
        {
          name: "合格数",
          type: "line",
          smooth: true,
          data: result.qualified,
          // areaStyle: {},
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                position: "top", // 在上方显示
                // position: "bottom", // 在上方显示
                textStyle: {
                  // 数值样式
                  color: "#19be6b",
                  // color: "#F5A503",
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
