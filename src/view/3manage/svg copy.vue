 <template>
  <div>
    <!-- <img src="../../../public/svgs/drawing.svg"> -->
    <div style="margin: 10px 0">
      <Button type="success"
              style="margin-right: 10px"
              @click="handleResult('#19be6b')">set success</Button>
      <Button type="error"
              style="margin-right: 10px"
              @click="handleResult('#ed4014')">set error</Button>
    </div>
    <div v-html="svgTemplate"></div>
  </div>
</template>

<script>
// functions
import config from "@/config"; // 全局变量

export default {
  name: "svg-drawing",
  data() {
    return {
      timer: null, // 定时器
      /* svg相关 */
      baseUrl:
        process.env.NODE_ENV === "development"
          ? config.pdfUrl.dev
          : config.pdfUrl.pro,
      svgUrl: "", // svg的url
      svgDom: null, // 获取到的svg元素
      svgTemplate: null, // 要插入的svg模板
      nowTime: "", // 变量 - 时间
      color: "#19be6b" // 变量 - 颜色  #19be6b or #ed4014
    };
  },
  created() {
    this.getTime();
    this.getSvg();
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.getTime();
      }, 1000);
    }
  },
  methods: {
    // 当前时间
    getTime() {
      var now = new Date();
      var year = now.getFullYear();
      var month =
        now.getMonth() + 1 >= 10
          ? now.getMonth() + 1
          : "0" + (now.getMonth() + 1);
      var day = now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
      var hour = now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
      var minute =
        now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
      var second =
        now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
      this.nowTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      // console.log(this.nowTime);
    },
    // 获取svg
    getSvg() {
      // 1. 获取 dom
      const xhr = new XMLHttpRequest();
      this.svgUrl = this.baseUrl + "/svgs/" + "drawing.svg";
      xhr.open("GET", this.svgUrl, true);
      xhr.send();
      xhr.addEventListener("load", () => {
        const resXML = xhr.responseXML;
        this.svgDom = resXML.documentElement.cloneNode(true);
        // console.log(this.svgDom);

        // 2. 修改 dom
        // console.log(
        //   this.svgDom.getElementById("block-in").getAttribute("style")
        // );
        this.svgDom
          .getElementById("block-in")
          .setAttribute(
            "style",
            `opacity:1;fill:${this.color};fill-opacity:1;stroke:#000000;stroke-width:1.20000005;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1`
          );
        this.svgDom.getElementById(
          "time"
        ).childNodes[0].childNodes[0].nodeValue = this.nowTime;

        // 3. 转换 domString
        const svgStr = new XMLSerializer().serializeToString(this.svgDom);

        // 4. 转换 URL
        const blob = new Blob([svgStr], {
          type: "image/svg+xml"
        });
        const blobStr = URL.createObjectURL(blob);
        this.svgTemplate = `<img src="${blobStr}">`;
        // this.svgTemplate = `<embed type="image/svg+xml" src="${blobStr}">`;

        // const base64 = window.btoa(svgStr);
        // this.svgTemplate = `<img src="data:image/svg+xml;base64,${base64}">`;
      });
    },
    // 切换结果值
    handleResult(value) {
      this.color = value;
    }
  },
  watch: {
    // 离开页面销毁定时器，进入页面打开定时器
    $route(to, from) {
      if (to.name !== "svg-drawing") {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(() => {
          this.getTime();
        }, 1000);
      }
    },
    nowTime(oldVal, newVal) {
      this.getSvg();
    },
    color(oldVal, newVal) {
      this.getSvg();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
