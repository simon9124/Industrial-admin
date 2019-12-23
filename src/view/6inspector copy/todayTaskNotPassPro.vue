<template>
  <div ref="dom"></div>
  <!-- style="padding:10px" -->
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
      color: [
        "#91dcff",
        "#ff81f6",
        // '#ffff43',
        "#32ce32",
        "#fc8a53",
        "#2d8cf0",
        "#ff9900"
      ],
      // title: {
      //   text: '产品线分布',
      //   x: 'center',
      //   textStyle: {
      //     color: '#ffffff'
      //   }
      // },
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c}%"
      },
      // grid: {
      //   top: '40px',
      //   left: '20px',
      //   right: '30px',
      //   bottom: '30px',
      //   containLabel: true
      // },
      legend: {
        orient: "vertical",
        left: "10%",
        bottom: "5%",
        data: [
          "20#产线",
          "21#产线",
          "22#产线",
          "23#产线",
          "24#产线",
          "25#产线"
        ],
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
          center: ["60%", "50%"],
          data: [
            { value: 15.94, name: "20#产线" },
            { value: 18.84, name: "21#产线" },
            { value: 11.59, name: "22#产线" },
            { value: 18.12, name: "23#产线" },
            { value: 20.29, name: "24#产线" },
            { value: 15.22, name: "25#产线" }
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
          center: ["60%", "50%"],
          data: [
            { value: 15.94, name: "20#产线" },
            { value: 18.84, name: "21#产线" },
            { value: 11.59, name: "22#产线" },
            { value: 18.12, name: "23#产线" },
            { value: 20.29, name: "24#产线" },
            { value: 15.22, name: "25#产线" }
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
