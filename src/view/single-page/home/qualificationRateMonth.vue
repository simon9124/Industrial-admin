<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
import { formatDate } from "@/libs/getDate";
import { monthData } from "./mockData";

// api
import { findTotalByDate } from "@/api/contrlCabin";

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
      ? (await findTotalByDate(
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
        bottom: "30px",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: result.name
          // data: [
          //   '9-1',
          //   '9-2',
          //   '9-3',
          //   '9-4',
          //   '9-5',
          //   '9-6',
          //   '9-7',
          //   '9-8',
          //   '9-9',
          //   '9-10',
          //   '9-11',
          //   '9-12',
          //   '9-13',
          //   '9-14',
          //   '9-15',
          //   '9-16',
          //   '9-17',
          //   '9-18',
          //   '9-19',
          //   '9-20',
          //   '9-21',
          //   '9-22',
          //   '9-23',
          //   '9-24',
          //   '9-25',
          //   '9-26',
          //   '9-27',
          //   '9-28',
          //   '9-29',
          //   '9-30'
          // ]
        }
      ],
      yAxis: [
        {
          show: false,
          type: "value"
        }
      ],
      dataZoom: [
        {
          // show: true,
          show: false,
          height: 5,
          xAxisIndex: [0],
          bottom: 30,
          start: 30,
          end: 70,
          handleIcon:
            "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
          handleSize: "110%",
          handleStyle: {
            color: "#d3dee5"
          },
          textStyle: {
            color: "#fff"
          },
          borderColor: "#90979c"
        },
        {
          // type: 'inside'
          // show: true
          height: 15,
          bottom: 0
          // start: 1,
          // end: 7
        }
      ],
      series: [
        {
          name: "产量",
          type: "line",
          smooth: true,
          data: result.total,
          // data: [
          //   320,
          //   332,
          //   301,
          //   334,
          //   390,
          //   330,
          //   320,
          //   320,
          //   332,
          //   301,
          //   334,
          //   390,
          //   330,
          //   320,
          //   320,
          //   332,
          //   301,
          //   334,
          //   390,
          //   330,
          //   320,
          //   320,
          //   332,
          //   301,
          //   334,
          //   390,
          //   330,
          //   320,
          //   320,
          //   332
          // ],
          areaStyle: {},
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
          // data: [
          //   120,
          //   132,
          //   101,
          //   134,
          //   90,
          //   230,
          //   210,
          //   120,
          //   132,
          //   101,
          //   134,
          //   90,
          //   230,
          //   210,
          //   120,
          //   132,
          //   101,
          //   134,
          //   90,
          //   230,
          //   210,
          //   120,
          //   132,
          //   101,
          //   134,
          //   90,
          //   230,
          //   210,
          //   120,
          //   132
          // ],
          areaStyle: {},
          itemStyle: {
            normal: {
              label: {
                show: true, // 开启显示
                // position: 'top', // 在上方显示
                position: "bottom", // 在上方显示
                textStyle: {
                  // 数值样式
                  color: "#ffff43",
                  // color: '#F5A503',
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
