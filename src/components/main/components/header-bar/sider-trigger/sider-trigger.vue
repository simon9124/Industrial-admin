<template>
  <a @click="handleChange"
     :disabled="disabled"
     type="text"
     :class="['sider-trigger-a', collapsed ? 'collapsed' : '']">
    <Icon :type="icon"
          :size="size" /></a>
</template>
<script>
export default {
  name: "siderTrigger",
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: "navicon-round"
    },
    size: {
      type: Number,
      default: 26
    }
  },
  data() {
    return {
      disabled: false
    };
  },
  created() {
    // 如果是移动端小屏，则初始化后禁用展开菜单
    if (document.body.clientWidth <= 900) {
      this.disabled = true;
    }
  },
  methods: {
    handleChange() {
      this.$emit("on-change", !this.collapsed);
    }
  }
};
</script>
<style lang="less">
@import "./sider-trigger.less";
</style>
