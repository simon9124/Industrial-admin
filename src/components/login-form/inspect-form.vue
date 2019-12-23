<template>
  <Form ref="inspectForm"
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
    <FormItem prop="selectline">
      <Select v-model="form.selectline">
        <Option v-for="line in beltline"
                :value="line.value"
                :key="line.value">{{ line.label }}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit"
              type="success"
              long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: "InspectForm",
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
    },
    selectlineRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "请选择流水线", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      // 生产线
      beltline: [
        {
          value: "1#线",
          label: "1#线"
        },
        {
          value: "2#线",
          label: "2#线"
        },
        {
          value: "22#线",
          label: "22#线"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      form: {
        userName: "admin",
        password: "",
        selectline: "1#线"
      }
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
        selectline: this.selectlineRules
      };
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.inspectForm.validate(valid => {
        if (valid) {
          this.$emit("on-success-validInspect", {
            userName: this.form.userName,
            password: this.form.password,
            selectline: this.form.selectline
          });
        }
      });
    }
  }
};
</script>
