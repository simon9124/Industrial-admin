<template>
  <div class="dooya-container">
    <Row :gutter="16">

      <!-- 服务器 -->
      <Col :lg="8"
           :sm="12"
           :xs="24">
      <Card>
        <p slot="title">
          <Icon type="ios-desktop-outline" />
          &nbsp;服务器
        </p>
        <Form ref="server"
              :model="server"
              label-position="left"
              :label-width="120">
          <FormItem label="服务器地址："
                    class="gray">
            <Tag color="success">{{server.ip}}</Tag>
          </FormItem>
          <FormItem label="服务器端口："
                    class="gray">
            <Tag color="success">{{server.port}}</Tag>
          </FormItem>
          <FormItem label="前端地址："
                    class="gray">
            <Tag color="success">{{'http://'+server.frontEnd}}</Tag>
          </FormItem>
          <FormItem label="数据库链接类型："
                    class="gray">
            <Tag color="success">{{server.dataBase}}</Tag>
          </FormItem>
          <FormItem label="./cache/可写："
                    class="red">
            <Tag :color="server.cache?'success':'error'">{{server.cache?'success':'error'}}</Tag>
          </FormItem>
          <FormItem label="upload/可写："
                    class="red">
            <Tag :color="server.upload?'success':'error'">{{server.upload?'success':'error'}}</Tag>
          </FormItem>
          <FormItem label="内存大小限制："
                    class="gray">
            <Tag color="success">{{server.internalStorage+'M'}}</Tag>
          </FormItem>
          <FormItem label="上传大小限制："
                    class="gray">
            <Tag color="success">{{server.uploadSize+'M'}}</Tag>
          </FormItem>
          <div class="explain">
          </div>
        </Form>

      </Card>
      </Col>

      <!-- 服务器扩展检查 -->
      <Col :lg="8"
           :sm="12"
           :xs="24">
      <Card>
        <p slot="title">
          <Icon type="ios-desktop" />
          &nbsp;服务器扩展检查
        </p>
        <Form ref="server"
              :model="server"
              label-position="left"
              :label-width="120">
          <FormItem label="GD图片处理："
                    class="gray">
            <Tag color="success">{{server.GDPic}}</Tag>
          </FormItem>
          <FormItem label="Mysql："
                    class="gray">
            <Tag color="success">{{server.Mysql}}</Tag>
          </FormItem>
          <FormItem label="Mysqli："
                    class="gray">
            <Tag color="success">{{server.Mysqli}}</Tag>
          </FormItem>
          <FormItem label="XML："
                    class="gray">
            <Tag color="success">{{server.XML}}</Tag>
          </FormItem>
          <FormItem label="iconv："
                    class="gray">
            <Tag color="success">{{server.iconv}}</Tag>
          </FormItem>
          <FormItem label="json："
                    class="gray">
            <Tag color="success">{{server.json}}</Tag>
          </FormItem>
          <FormItem label="Zip："
                    class="gray">
            <Tag color="success">{{server.Zip}}</Tag>
          </FormItem>
          <FormItem label="CURL："
                    class="gray">
            <Tag color="success">{{server.CURL}}</Tag>
          </FormItem>
          <div class="explain">
            *扩展保证了站点正常的运行
          </div>
        </Form>

      </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
import server from "./mockData/server";

export default {
  name: "inspector",
  data() {
    return {
      server: server
    };
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    margin-bottom: 20px;
    .ivu-card-body {
      // padding: 10px;
    }
  }
  .ivu-form {
    &-item {
      margin-bottom: 5px;
      &-content {
        text-align: right;
      }
    }
    label {
      font-size: 13px;
      font-weight: bold;
    }
    .gray label {
      color: #808695;
    }
    .red label {
      color: #ed4014;
    }
    .explain {
      height: 20px;
      font-size: 12px;
      color: #ed4014;
    }
  }
}
</style>
