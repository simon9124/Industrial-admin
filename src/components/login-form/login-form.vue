<template>
  <Form ref="loginForm"
        :model="form"
        :rules="rules"
        @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName"
             placeholder="请输入用户名">
      <span slot="prepend">
        <Icon :size="16"
              type="ios-person"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password"
             v-model="form.password"
             placeholder="请输入密码">
      <span slot="prepend">
        <Icon :size="14"
              type="md-lock"></Icon>
      </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit"
              :loading="buttonLoading"
              type="primary"
              long>登录</Button>
    </FormItem>
  </Form>
</template>

<script>
// getUrlKey 截取地址栏参数
// function getUrlKey(name) {
//   return (
//     decodeURIComponent(
//       (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
//         location.href
//         // eslint-disable-next-line no-sparse-arrays
//       ) || [, ""])[1].replace(/\+/g, "%20")
//     ) || null
//   );
// }

export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "",
        password: "",
        // lineNo: getUrlKey('lineNo') || 22
        lineNo: parseInt(this.$route.query.lineNo) || 22
      },
      buttonLoading: false
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.buttonLoading = true;
          this.$emit("on-success-valid", {
            userName: this.form.userName,
            password: this.form.password,
            lineNo: this.form.lineNo
          });
          localStorage.setItem("loginLineNo", this.form.lineNo);
          setTimeout(() => {
            this.buttonLoading = false;
          }, 1500);
        }
      });
    }
  }
};
</script>
