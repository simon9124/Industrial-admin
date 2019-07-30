<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">

      <!-- 杜亚管理登录 -->
      <Card v-if="isManage"
            icon="log-in"
            :bordered="false">
        <p slot="title"
           style="color:#2d8cf0">
          <Icon type="ios-log-in" />
          &nbsp;杜亚管理登录
        </p>

        <a class="toggle-login"
           style="color:#19be6b"
           slot="extra"
           type="primary"
           icon="md-add"
           size="small"
           @click="isManage=!isManage">产品检测入口</a>

        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">超级管理员：super_admin，123456</p>
          <p class="login-tip">管理员：admin，123456</p>
        </div>
      </Card>

      <!-- 产品检测入口 -->
      <Card v-else
            icon="log-in"
            :bordered="false">
        <p slot="title"
           style="color:#19be6b">
          <Icon type="ios-log-in" />
          &nbsp;产品检测入口
        </p>

        <a class="toggle-login"
           style="color:#2d8cf0"
           slot="extra"
           type="primary"
           icon="md-add"
           size="small"
           @click="isManage=!isManage">杜亚管理登录</a>

        <p class="login-tip">选择所在流水线进入</p>
        <div class="form-con">
          <inspect-form @on-success-validInspect="handleInspectSubmit"></inspect-form>

        </div>
      </Card>

    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form';
import InspectForm from '_c/login-form/inspect-form';
import { mapActions } from 'vuex';
export default {
  components: {
    LoginForm,
    InspectForm
  },
  data () {
    return {
      isManage: true
    };
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    // 用户登录
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    },
    // 产品线登录
    handleInspectSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            path: '/inspect/inspector',
            name: 'inspector'
          });
        });
      });
    }
  }
};
</script>

<style>
</style>
