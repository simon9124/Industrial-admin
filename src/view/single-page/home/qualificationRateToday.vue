<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";
// api
import { getCurrentLineReport } from "@/api/contrlCabin";

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
    const result = !this.isMock
      ? (await getCurrentLineReport("day")).data.data
      : { lineNo: 22, total: 0, qualifiedRate: 0, qualified: 0 };
    const option = {
      color: ["#ff9900", "#9A66E4"],
      title: {
        text: "今日合格率：" + result.qualifiedRate + "%",
        x: "center",
        textStyle: {
          color: "#516b91"
        }
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      grid: {
        top: "40px",
        left: "20px",
        right: "30px",
        bottom: "30px",
        containLabel: true
      },
      legend: {
        orient: "vertical",
        left: "left",
        top: 0,
        data: ["不合格", "合格"]
      },
      series: [
        {
          name: "今日生产",
          type: "pie",
          radius: "60%",
          center: ["50%", "55%"],
          // data: [{ value: 4, name: '不合格' }, { value: 48, name: '合格' }],
          data: [
            { value: result.total - result.qualified, name: "不合格" },
            { value: result.qualified, name: "合格" }
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
              formatter: "{b} : {c} ({d}%)"
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
