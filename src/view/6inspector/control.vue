<template>
  <div style="height:100%">
    <ControlCabin v-if="showShop"></ControlCabin>
    <ControlCabinLine v-else></ControlCabinLine>
  </div>
</template>

<script>
// vuex
import { mapGetters } from "vuex";
// components
import ControlCabin from "./controlCabin";
import ControlCabinLine from "./controlCabinLine";

export default {
  components: { ControlCabin, ControlCabinLine },
  computed: {
    ...mapGetters(["userAccess"]),
    showShop() {
      // 车间驾驶舱 or 产线驾驶舱 -> 用户角色是否包含 workshop_manager/admin/cestc
      return (
        JSON.stringify(this.userAccess).indexOf("workshop_manager") !== -1 ||
        JSON.stringify(this.userAccess).indexOf("admin") !== -1 ||
        JSON.stringify(this.userAccess).indexOf("cestc") !== -1
      );
    }
  }
};
</script>

<style scoped>
</style>
