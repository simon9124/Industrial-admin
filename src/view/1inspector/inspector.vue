<template>
  <div class="dooya-container">
    <Row :gutter="16">

      <!-- QC1 -->
      <Col :md="8"
           :sm="24"
           :xs="24">
      <Card>
        <p slot="title">QC1 综合测试</p>
        <Form v-if="!formQC1Login"
              ref="formQC1"
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
            <Button type="primary"
                    @click="formLogin('QC1')">登录</Button>
          </FormItem>
        </Form>
        <Form v-if="formQC1Login"
              ref="formQC1"
              :rules="formQC1Rule"
              :model="formQC1"
              :label-width="100">
          <FormItem label="QC1 检测员："
                    prop="account">
            {{formQC1.account}}
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
        <Form v-if="!formQC2Login"
              ref="formQC2"
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
            <Button type="primary"
                    @click="formLogin('QC2')">登录</Button>
          </FormItem>
        </Form>
        <Form v-if="formQC2Login"
              ref="formQC2"
              :rules="formQC2Rule"
              :model="formQC2"
              :label-width="100">
          <FormItem label="QC2 检测员："
                    prop="account">
            {{formQC2.account}}
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
        <Form v-if="!formQC3Login"
              ref="formQC3"
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
            <Button type="primary"
                    @click="formLogin('QC3')">登录</Button>
          </FormItem>
        </Form>
        <Form v-if="formQC3Login"
              ref="formQC3"
              :rules="formQC3Rule"
              :model="formQC3"
              :label-width="100">
          <FormItem label="QC3 检测员："
                    prop="account">
            <Input v-model="formQC3.account"
                   placeholder="请输入账号"></Input>
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
      formQC1Login: false,
      // QC2
      formQC2: {},
      formQC2Rule: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      formQC2Login: false,
      // QC3
      formQC3: {},
      formQC3Rule: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      formQC3Login: false
    };
  },
  methods: {
    // 登录
    formLogin (formName) {
      // console.log(formName);
      switch (formName) {
        case 'QC1':
          this.$refs.formQC1.validate(valid => {
            if (valid) {
              this.$Message.success('登录成功！');
              this.formQC1Login = true;
            } else {
              this.$Message.error('登录失败！');
            }
          });
          break;
        case 'QC2':
          this.$refs.formQC2.validate(valid => {
            if (valid) {
              this.$Message.success('登录成功！');
              this.formQC2Login = true;
            } else {
              this.$Message.error('登录失败！');
            }
          });
          break;
        case 'QC3':
          this.$refs.formQC3.validate(valid => {
            if (valid) {
              this.$Message.success('登录成功！');
              this.formQC3Login = true;
            } else {
              this.$Message.error('登录失败！');
            }
          });
          break;
      }
    }
  }
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
