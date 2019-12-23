<template>

  <div class="dooya-container">
    <Card>

      <h2 @click="backRouter">返回</h2>

      <Tabs value="qc1"
            @on-click="tabSelect">

        <!-- 综合检测 -->
        <TabPane label="综合检测"
                 name="qc1">
          <Table :columns="tableColumn"
                 :data="tableData"></Table>
          <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    :total="tableDataFilter.length"
                    :current="1"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div> -->
        </TabPane>

        <!-- 静音检测 -->
        <TabPane label="静音检测"
                 name="qc2">
          <Table :columns="tableColumn"
                 :data="tableData"></Table>
          <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    :total="tableDataFilter.length"
                    :current="1"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div> -->
        </TabPane>

        <!-- 外观检测 -->
        <TabPane label="外观检测"
                 name="qc3">
          <Table :columns="tableColumn"
                 :data="tableData"></Table>
          <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <Page show-sizer
                    :total="tableDataFilter.length"
                    :current="1"
                    @on-change="changePage"
                    @on-page-size-change="changePageSize"></Page>
            </div>
          </div> -->
        </TabPane>

      </Tabs>

    </Card>
  </div>
  <!-- <div>
    <Table :columns="tableColumn"
           :data="tableData"></Table>
  </div> -->
</template>

<script>
import mqtt from "mqtt";

const MQTT_SERVICE = "ws://192.168.200.99:1884/mqtt";
const MQTT_USERNAME = "admin";
const MQTT_PASSWORD = "public";
// var client;
const options = {
  connectTimeout: 40000,
  // clientId: 'mqtitId-Home',
  clientId:
    "mqttjs_" +
    Math.random()
      .toString(16)
      .substr(2, 8),
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
  clean: false
};
// client = mqtt.connect(MQTT_SERVICE, options);

export default {
  name: "viewtest",
  data() {
    return {
      // 顶部切换
      tabSelected: "QC1_A",
      // 数据行
      tableColumn: [
        {
          title: "key",
          key: "key",
          align: "left",
          minWidth: 120
        },
        {
          title: "value",
          key: "value",
          align: "left",
          minWidth: 150
        },
        {
          title: " ",
          key: "user",
          align: "left"
        },
        {
          title: " ",
          key: "number",
          align: "left"
        },
        {
          title: " ",
          key: "phone",
          align: "left"
        }
      ],
      // 表格数据
      tableData: [],
      // 接收到的mqtt即时消息
      msg: "",
      client: null
    };
  },
  created() {
    this.mqttMSG();
  },
  methods: {
    // 顶部切换
    tabSelect(name) {
      this.tabSelected = name;
    },
    // mqtt实时数据采集
    mqttMSG() {
      this.client = mqtt.connect(MQTT_SERVICE, options);
      // mqtt连接
      this.client.on("connect", e => {
        // console.log('连接成功:');
        this.client.subscribe("data/message1", { qos: 0 }, error => {
          if (!error) {
            // console.log('订阅成功');
          } else {
            console.log("订阅失败");
          }
        });
      });

      // 接收消息处理
      this.client.on("message", (topic, message) => {
        const msg = JSON.parse(message.toString());
        this.msg = msg;
        console.log(this.msg);

        // console.log(this.msg[this.tabSelected]);

        // 处理数据
        const tableData = [];
        this.msg[this.tabSelected].forEach(item => {
          tableData.push({
            key: Object.keys(item)[0],
            value: item[Object.keys(item)]
          });
        });
        this.tableData = tableData;
      });

      // 断开发起重连
      this.client.on("reconnect", error => {
        console.log("正在重连:", error);
      });
      // 链接异常处理
      this.client.on("error", error => {
        console.log("连接失败:", error);
      });
    },
    // 返回上一页
    backRouter() {
      // this.client = null;
      // client.on("disconnect", () => {
      //   console.log("断开连接");
      // });
      this.client.end();
      // client.unsubscribe("data/message1");
      this.$router.go(-1);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  // .ivu-table-body {
  //   overflow: hidden;
  // }
  .ivu-table {
    th {
      text-align: center;
    }
    tr {
      th:first-child,
      th:nth-child(2),
      td:first-child,
      td:nth-child(2) {
        border-right: 1px solid #e8eaec;
      }
    }
  }
  // .ivu-table-cell {
  //   padding: 0;
  // }
}
</style>
