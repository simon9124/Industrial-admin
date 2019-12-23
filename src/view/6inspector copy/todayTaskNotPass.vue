<template>
  <div ref="dom"></div>
  <!-- style="padding:10px" -->
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
// api
import { getDateTotalByQc } from "@/api/contrlCabin";

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
    const result = (await getDateTotalByQc("")).data.data;
    const option = {
      color: [
        // '#91dcff',
        // '#ffff43',
        // '#fc8a53',
        "#ff9900",
        "#2d8cf0",
        "#32ce32"
        // '#ff81f6'
      ],
      // title: {
      //   text: "检测步骤分布",
      //   x: "center",
      //   textStyle: {
      //     color: "#ffffff"
      //   }
      // },
      tooltip: {
        trigger: "item",
        // formatter: '{b} : {c}% {a} {d}'
        formatter: "{b} : {c}（{d}%）"
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
        data: ["综合测试", "静音测试", "外观测试"],
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
            { value: result[0].qc1, name: "综合测试" },
            { value: result[0].qc2, name: "静音测试" },
            { value: result[0].qc3, name: "外观测试" }
            // { value: 35, name: '综合测试' },
            // { value: 45, name: '静音测试' },
            // { value: 20, name: '外观测试' }
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
              // formatter: '{c}%',
              formatter: "{c}",
              textStyle: {
                color: "#fff",
                fontSize: 16
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
            { value: result[0].qc1, name: "综合测试" },
            { value: result[0].qc2, name: "静音测试" },
            { value: result[0].qc3, name: "外观测试" }
            // { value: 35, name: "综合测试" },
            // { value: 45, name: "静音测试" },
            // { value: 20, name: "外观测试" }
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
