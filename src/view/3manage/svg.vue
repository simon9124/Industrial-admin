 <template>
  <div>
    <!-- <div v-html="svgTemplate"></div> -->
    <!-- <Button type="primary"
            id="button"
            style="margin-right: 10px"
            icon="md-camera"
            v-on:click="takePhoto">拍照</Button> -->
    <div id="svgTemplate"></div>
  </div>
</template>

<script>
import config from "@/config"; // 全局变量
// mqtt
import { mqtt, MQTT_SERVICE, options } from "@/libs/sysconstant.js";
// import Vue from "vue";
import Vue from "vue/dist/vue.esm.js";

// window.takePhotoWindow = () => {
//   console.log(document.getElementById("tspan6557-9-51"));
//   // console.log(window);
// };

export default {
  name: "svg-drawing",
  data() {
    return {
      /* 全局 */
      baseUrl:
        process.env.NODE_ENV === "development"
          ? config.pdfUrl.dev
          : config.pdfUrl.pro,
      svgUrl: "", // svg的url
      svgDom: null, // 获取到的svg元素
      svgTemplate: null, // 要插入的svg模板
      client: null, // mqtt服务
      /* svg的变量 */
      photoResult: {
        resultVal: 0, // 测试结果 - 值
        resultMsg: "未检测", // 测试结果 - 字段
        resultColor: "#dcdee2" // 测试结果 - 字段背景色
      }
    };
  },
  async mounted() {
    // 监听浏览器的返回按钮：向历史记录中插入了当前页
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.goBack, false);
    }
    // 将takePhoto方法绑定到window下面，提供给外部调用
    window["takePhotoWindow"] = () => {
      this.takePhoto();
    };
  },
  created() {
    this.getSvg();
    this.$nextTick(() => {
      // document.getElementById("button").addEventListener("click", e => {
      //   console.log(e);
      //   this.takePhoto();
      // });
      // document.getElementById("button").onclick = () => {
      //   this.takePhoto();
      // };
      // console.log(document.getElementById("button"));
    });
  },
  methods: {
    // 初始化svg
    getSvg() {
      /* 创建xhr对象 */
      const xhr = new XMLHttpRequest();
      this.svgUrl = this.baseUrl + "/svgs/" + "test.svg";
      xhr.open("GET", this.svgUrl, true);
      xhr.send();
      /* 监听xhr对象 */
      xhr.addEventListener("load", () => {
        /* 1. 获取 dom */
        const resXML = xhr.responseXML;
        this.svgDom = resXML.documentElement.cloneNode(true);
        // console.log(this.svgDom);

        /* 2.SVG对象添加click事件 */
        let btnTakePhotoDom = this.svgDom.getElementById("text6553-2-3");
        // console.log(btnTakePhotoDom);

        /*
          尝试无数次后，此处只有 setAttribute + v-on:click 写法有效
          setAttribute不支持@click，会报语法错误
          addEventListener和onclick均会被vue拦截
        */
        // btnTakePhotoDom.addEventListener("click", e => {
        //   console.log(e);
        //   this.takePhoto();
        // });
        // btnTakePhotoDom.setAttribute("onclick", "takePhoto");
        btnTakePhotoDom.setAttribute("v-on:click", "this.takePhotoWindow()");
        /* ↑↑↑ 此处必须注意：原生事件takePhotoWindow此时在window层，解决办法见此文件 */

        /* 3. 修改 dom */
        this.svgDom.getElementById("tspan6557-9-51").childNodes[0].nodeValue =
          "#" + this.photoResult.resultVal; // 测试结果值
        this.svgDom
          .getElementById("rect6555-4-0")
          .setAttribute(
            "style",
            `display:inline;opacity:0.96799999;fill:${this.photoResult.resultColor};fill-opacity:1;fill-rule:nonzero;stroke-width:0.44862741`
          ); // 测试结果字段边框
        this.svgDom.getElementById(
          "tspan6557-9-9"
        ).childNodes[0].nodeValue = this.photoResult.resultMsg; // 测试结果字段值

        /* 4.将svgDom对象转换成vue的虚拟dom（否则无法在svgDom里挂载vue的事件） */
        var oSerializer = new XMLSerializer();
        var sXML = oSerializer.serializeToString(this.svgDom);
        var Profile = Vue.extend({
          template: "<div id='svgTemplate'>" + sXML + "</div>"
          // template: `<div>${this.svgDom}</div>`,
          // data: function() {
          //   return {};
          // }
        });
        // 创建实例，并挂载到元素上
        new Profile().$mount("#svgTemplate");
      });
    },
    // 按钮 - 拍照
    takePhoto() {
      this.client = mqtt.connect(MQTT_SERVICE, options);

      // mqtt连接
      this.client.on("connect", e => {
        console.log("mqtt连接成功");

        // 再订阅消息
        this.client.subscribe("data/svg/result", { qos: 1 }, error => {
          if (!error) {
            // 订阅成功
            console.log("订阅成功：data/svg/result");
          } else {
            // 订阅失败
          }
        });

        const sendMsg = {
          name: "拍照"
        };

        // 发布消息
        this.client.publish("data/svg/send", JSON.stringify(sendMsg), () => {
          console.log("发布成功", JSON.stringify(sendMsg));

          // 发布成功后，接收消息处理
          /* eslint-disable */
          this.client.on("message", (topic, message) => {
            const msg = JSON.parse(message.toString());
            console.log(topic, msg);
            this.photoResult.resultVal = msg.resultVal;
            this.photoResult.resultMsg = msg.resultMsg;
            this.photoResult.resultColor = msg.resultColor;
            this.client.unsubscribe("data/svg/result");
            this.client.end();
          });
        });
      });
    },
    // 按钮 - 按1松零测试
    test1() {
      console.log("2");
    },
    // 浏览器返回
    goBack() {
      this.client.unsubscribe("data/svg");
      this.client.end();
    }
  },
  beforeDestroy() {
    this.svgDom = null;
  },
  destroyed() {
    this.client.unsubscribe("data/svg");
    this.client.end();
  },
  watch: {
    photoResult: {
      handler(newVal, oldVal) {
        this.getSvg();
      },
      deep: true
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
