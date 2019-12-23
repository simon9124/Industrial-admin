<template>
  <div ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/libs/tools";

export default {
  name: "pie-chart",
  props: {
    chartData: {
      type: Array,
      default: () => []
    },
    // 颜色搭配
    color: {
      type: Array,
      default: () => ["#91dcff", "#2db7f5", "#2d8cf0", "#034c6a"]
    },
    // 图例数据
    legendData: {
      type: Array,
      default: () => []
    },
    // 饼图中心的位置
    seriesCenter: {
      type: Array,
      default: () => ["50%", "50%"]
    },
    // 值的单位
    unit: {
      type: String,
      default: "件"
    }
  },
  data() {
    return {
      dom: null
    };
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    drawChart() {
      const option = {
        color: this.color,
        tooltip: {
          trigger: "item",
          formatter: `{b} : {c}${this.unit}`
        },
        legend: {
          orient: "vertical",
          left: "5%",
          bottom: "5%",
          data: this.legendData,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "今日生产",
            type: "pie",
            radius: "80%",
            center: this.seriesCenter,
            // hoverAnimation: false,
            // roseType: "radius",
            data: this.chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              },
              // borderWidth: 6,
              borderWidth: 0,
              borderColor: "#0b122e"
            },
            label: {
              normal: {
                position: "inner",
                // formatter: '{c}%',
                formatter: `{b}\n{c}${this.unit}`,
                textStyle: {
                  color: "#fff",
                  fontSize: 14
                }
              }
            }
          }
        ],
        // 关闭切换数据时重新渲染的动画
        animation: false
      };
      this.$nextTick(() => {
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    }
  },
  async mounted() {
    this.drawChart();
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
  watch: {
    chartData: {
      handler(newVal, oldVal) {
        this.dom.clear();
        this.drawChart();
      },
      deep: true
    }
  }
};
</script>
