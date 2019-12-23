<template>
  <div>
    <button @click="clear">
      清空
    </button>
    <canvas id="canvas"
            width="800"
            height="600"
            @mousedown="canvasDown($event)"
            @mousemove="canvasMove($event)"
            @mouseup="canvasUp($event)"
            @mouseleave="canvasLeave($event)"
            ref="canvas">抱歉，您的浏览器不支持canvas元素</canvas>
    <!-- canvas 标签内部的元素指的是当你的浏览器不支持canvas是所展示的内容 -->
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.show();
  },
  methods: {
    show() {
      this.canvas = this.$refs.canvas; // 指定canvas
      this.ctx = this.canvas.getContext("2d"); // 设置2D渲染区域
      this.ctx.lineWidth = 5; // 设置线的宽度
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const canvasX = e.clientX - e.target.offsetLeft;
      const canvasY =
        e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
      this.ctx.beginPath(); // 移动的起点
      this.ctx.moveTo(canvasX, canvasY);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        const t = e.target;
        let canvasX;
        let canvasY;
        canvasX = e.clientX - t.offsetLeft;
        canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
        this.ctx.lineTo(canvasX, canvasY);
        this.ctx.stroke();
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false;
    },
    canvasLeave(e) {
      this.canvasMoveUse = false;
    },
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }
};
</script>
<style lang="scss" scoped>
.canvas {
  cursor: crosshair;
}
</style>
