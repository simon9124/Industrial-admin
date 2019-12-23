<template>
  <div class="dooya-container">
    <Card>
      <iframe :src="src"></iframe>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src:
        "http://192.168.200.96:3000/public/dashboard/5bc0a2f4-11c1-4a7a-94f2-5608ffc31cbe"
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    .ivu-card-body {
      padding: 10px;
      iframe {
        border: none;
        width: 100%;
        height: calc(100vh - 150px);
      }
    }
  }
}
</style>
