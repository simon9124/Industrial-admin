<template>
  <div class="dooya-container">
    <Row :gutter="16">

      <!-- 服务器 -->
      <Col :lg="8"
           :sm="12"
           :xs="24">
      <Card>
        <p slot="title">
          <Icon type="ios-lock-outline" />
          &nbsp;栏目权限
        </p>

        <Button slot="extra"
                type="primary"
                icon="md-add"
                size="small">权限</Button>

        <Form ref="authority"
              :model="authority"
              label-position="left"
              :label-width="120">
          <div class="explain">
            *注：栏目信息的管理权限
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
          <Icon type="ios-lock" />
          &nbsp;管理权限
        </p>
        <Form ref="authority"
              :model="authority"
              label-position="left"
              :label-width="20">
          <FormItem label="-"
                    class="gray">
            <Tag color="success">编号管理</Tag>
          </FormItem>
          <FormItem label="-"
                    class="gray">
            <Tag color="success">检测查询</Tag>
            <Tag color="success">电机检测管理列表查看</Tag>
          </FormItem>
          <FormItem label="-"
                    class="gray">
            <Tag color="success">检测标准管理</Tag>
          </FormItem>
          <FormItem label="-"
                    class="gray">
            <Tag color="success">账号管理</Tag>
          </FormItem>
          <FormItem label="-"
                    class="gray">
            <Tag color="success">首页展示</Tag>
          </FormItem>

          <div class="explain">
            *注：管理权限
          </div>
        </Form>

      </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
export default {
  name: 'authority',
  computed: {
    access () {
      return this.$store.state.user.access;
    }
  },
  data () {
    return {
      authority: {}
    };
  },
  created () {
    console.log(this.access);
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
      color: #515a6e;
    }
  }
}
</style>
