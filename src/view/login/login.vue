<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <div class="login-con">

      <!-- 追溯系统登录 -->
      <Card v-if="isManage"
            icon="log-in"
            :bordered="false">
        <p slot="title"
           style="color:#2d8cf0">
          <Icon type="ios-log-in" />
          &nbsp;追溯系统登录
          <!-- &nbsp;管理登录 -->
        </p>

        <!-- <a class="toggle-login"
           style="color:#19be6b"
           slot="extra"
           type="primary"
           icon="md-add"
           size="small"
           @click="isManage=!isManage">产品检测入口</a> -->

        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">超级管理员：super_admin，123456</p> -->
          <!-- <p class="login-tip">管理员：admin，123456</p> -->
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
           @click="isManage=!isManage">追溯系统登录</a>

        <p class="login-tip">选择所在流水线进入</p>
        <div class="form-con">
          <inspect-form @on-success-validInspect="handleInspectSubmit"></inspect-form>

        </div>
      </Card>

    </div>
  </div>
</template>

<script>
// vuex
import { mapActions } from "vuex";
// component
import LoginForm from "_c/login-form";
import InspectForm from "_c/login-form/inspect-form";
// function
import { refreshRoute } from "@/router"; // 路由初始化，清空动态路由

export default {
  components: {
    LoginForm,
    InspectForm
  },
  data() {
    return {
      isManage: true
    };
  },
  created() {
    localStorage.setItem("dynamicRouter", []);
    refreshRoute();
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo", "getRouters"]),
    // 用户登录
    handleSubmit({ userName, password, lineNo }) {
      this.handleLogin({ userName, password, lineNo }).then(res => {
        this.getUserInfo().then(resUserInfo => {
          this.getRouters().then(resRoutes => {
            if (
              JSON.stringify(resUserInfo.data.roles).indexOf(
                "workshop_manager"
              ) > -1
            ) {
              // 车间主管 -> 直接进入驾驶舱-车间
              this.$router.push({
                path: "/control-leader-shop",
                name: "control-leader-shop"
              });
            } else if (
              JSON.stringify(resUserInfo.data.roles).indexOf("test") > -1
            ) {
              // 检测员 -> 直接进入追溯查询
              this.$router.push({
                path: "/check/checkSearch",
                name: "checkSearch"
              });
            } else if (
              JSON.stringify(resUserInfo.data.roles).indexOf("cestc") > -1
            ) {
              // 工程师 -> 直接进入SOP配置
              this.$router.push({
                path: "/dispose/sop",
                name: "sop"
              });
            } else {
              // 其他角色 -> 进入首页
              this.$router.push({
                name: this.$config.homeName
              });
            }
          });
        });
      });
    },
    // 产品线登录
    handleInspectSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            path: "/inspect/inspector",
            name: "inspector"
          });
        });
      });
    }
  }
};
</script>

<style>
</style>
