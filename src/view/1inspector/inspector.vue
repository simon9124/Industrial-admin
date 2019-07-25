<template>
  <div class="dooya-container">
    <Row :gutter="16">

      <!-- QC1 -->
      <Col :md="8"
           :sm="24"
           :xs="24">
      <Card>
        <p slot="title">QC1 综合测试</p>
        <Form ref="formQC1"
              :rules="formQC1Rule"
              :model="formQC1"
              :label-width="100">
          <FormItem label="QC1 账号："
                    prop="account">
            <Input v-model="formQC1.account"
                   placeholder="请输入账号"></Input>
          </FormItem>
          <FormItem label="QC1 密码："
                    prop="password">
            <Input v-model="formQC1.password"
                   type="password"
                   placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>

      <!-- QC2 -->
      <Col :md="8"
           :sm="24"
           :xs="24">
      <Card>
        <p slot="title">QC2 静音间测试</p>
        <Form ref="formQC2"
              :rules="formQC2Rule"
              :model="formQC2"
              :label-width="100">
          <FormItem label="QC2 账号："
                    prop="account">
            <Input v-model="formQC2.account"
                   placeholder="请输入账号"></Input>
          </FormItem>
          <FormItem label="QC2 密码："
                    prop="password">
            <Input v-model="formQC2.password"
                   type="password"
                   placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>

      <!-- QC3 -->
      <Col :md="8"
           :sm="24"
           :xs="24">
      <Card>
        <p slot="title">QC3 外观测试</p>
        <Form ref="formQC3"
              :rules="formQC3Rule"
              :model="formQC3"
              :label-width="100">
          <FormItem label="QC3 账号："
                    prop="account">
            <Input v-model="formQC3.account"
                   placeholder="请输入账号"></Input>
          </FormItem>
          <FormItem label="QC3 密码："
                    prop="password">
            <Input v-model="formQC3.password"
                   type="password"
                   placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary">登录</Button>
          </FormItem>
        </Form>
      </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
export default {
  name: 'inspector',
  data () {
    return {
      // QC1
      formQC1: {},
      formQC1Rule: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // QC2
      formQC2: {},
      formQC2Rule: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      // QC3
      formQC3: {},
      formQC3Rule: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
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
      padding: 10px;
    }
  }
  .ivu-form {
    label {
      font-weight: bold;
    }
  }
}
</style>
