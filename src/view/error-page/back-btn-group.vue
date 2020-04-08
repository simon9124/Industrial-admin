<template>
  <div>
    <Button size="large"
            type="text"
            @click="backHome">返回首页</Button>
    <Button size="large"
            type="text"
            @click="backPrev">返回上一页({{ second }}s)</Button>
  </div>
</template>

<script>
import "./error.less";
export default {
  name: "backBtnGroup",
  data() {
    return {
      second: 5,
      timer: null
    };
  },
  methods: {
    backHome() {
      const access = this.$store.state.user.access[0].name;
      switch (access) {
        case "workshop_manager":
          this.$router.replace({
            name: "control-leader-shop"
          });
          break;
        case "test":
          this.$router.replace({
            name: "checkSearch"
          });
          break;
        case "cestc":
          this.$router.replace({
            name: "sop"
          });
          break;
        default:
          this.$router.replace({
            name: this.$config.homeName
          });
          break;
      }
    },
    backPrev() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
