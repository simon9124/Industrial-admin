<template>
  <div class="dooya-container">

    <!-- Modal - 整体数据-->
    <Modal v-model="modalShow"
           :mask-closable="false"
           footer-hide
           width="80%"
           title="查看报表">

      <!-- form - 筛选项 -->
      <Form v-if="paramListData.length!==0"
            ref="filterFormData"
            :model="filterFormData"
            inline
            label-position="right"
            @submit.native.prevent
            style="margin:0 0 20px 10px">
        <FormItem v-for="(item,i) in paramListData"
                  :key='i'
                  :label="item.title"
                  :prop="item.name">

          <!-- 下拉单选 -->
          <Select v-if="item.elementType==='下拉单选'"
                  v-model="filterFormData[item.name]"
                  placeholder="请选择"
                  style="width:fit-content;min-width:160px">
            <Option v-for="_item in item.data"
                    :value="_item[item.valueName]"
                    :key="_item[item.labelName]">{{ _item[item.valueName] }}</Option>
          </Select>

          <!-- 文本框 -->
          <Input v-if="item.elementType==='文本框'"
                 type="text"
                 v-model.trim="filterFormData[item.name]">
          </Input>

          <!-- 日期选择 -->
          <DatePicker v-if="item.elementType==='日期选择'"
                      type="date"
                      placeholder="请选择"
                      style="width:fit-content;min-width:160px">
          </DatePicker>

        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="submitFilter('filterFormData')">搜索</Button>
        </FormItem>
      </Form>

      <!-- table -->

    </Modal>

  </div>
</template>

<script>
export default {
  name: "view-report",
  data() {
    return {
      /* 全局 */
      rowId: "", // 当前行的id
      modalShow: false, // 是否显示
      /* filterForm */
      paramListData: [], // 筛选数据 - 父组件传递
      filterFormData: {} // 筛选数据 - 呈现在表单
    };
  },
  methods: {
    // 显示配置参数弹框
    showModal(param) {
      console.log(param);
      this.getData(param);
      this.modalShow = true;
    },
    // 数据初始化
    getData(param) {
      this.filterFormData = {};
      // if (!this.isMock) {
      //   /* 接口数据 */
      //   this.tableData = tableData; // 表格
      // } else {
      /* mock数据 */
      this.paramListData = param.paramList;
      this.paramListData.forEach(item => {
        this.filterFormData[item.name] = item.defaultData; // 动态表单
      });
      this.rowId = param.id;
      // this.refreshData();
      // }
    },
    // 点击搜索
    submitFilter() {
      console.log(this.filterFormData);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.v-transfer-dom /deep/ {
  .ivu-modal {
    .ivu-form {
      &-item {
        margin-right: 20px;
        margin-bottom: 14px;
      }
      &-item-content {
        display: inline-block;
      }
      &-item-label {
        padding-right: 10px;
      }
    }
  }
}
</style>
