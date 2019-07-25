<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in"
            :bordered="false">
        <p slot="title">
          <Icon type="ios-log-in" />
          杜亚管理登录
        </p>
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">超级管理员：super_admin，123456</p>
          <p class="login-tip">管理员：admin，123456</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form';
import { mapActions } from 'vuex';
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          });
        });
      });
    }
  }
};
</script>

<style>
</style>
