<template>
  <div class="dooya-container">
    <Card>

      <Tabs value="qc1"
            @on-click="tabSelect">

        <!-- 综合检测 -->
        <TabPane label="综合检测"
                 name="qc1">

          <!-- 操作 -->
          <div style="margin: 10px 0">
            <Select v-model="processSelected"
                    style="width:150px;margin-right: 10px;display:inline-block">
              <Option v-for="(item,i) in productTypeList"
                      :value="item"
                      :key="i">{{ item }}</Option>
            </Select>
            <Button type="warning"
                    icon="md-add"
                    style="margin-right: 10px"
                    @click="insert">新增类型</Button>
            <Button type="success"
                    icon="md-add"
                    @click="insert">新增步骤</Button>
          </div>

          <!-- 表格 -->
          <Table border
                 disabled-hover
                 :data="tableData"
                 :columns="tableColumns"
                 stripe>
          </Table>

        </TabPane>

        <!-- 静音检测 -->
        <TabPane label="静音检测"
                 name="qc2">

          <!-- 操作 -->
          <div style="margin: 10px 0">
            <Select v-model="processSelected"
                    style="width:150px;margin-right: 10px;display:inline-block">
              <Option v-for="(item,i) in productTypeList"
                      :value="item"
                      :key="i">{{ item }}</Option>
            </Select>
            <Button type="warning"
                    icon="md-add"
                    style="margin-right: 10px"
                    @click="insert">新增类型</Button>
            <Button type="success"
                    icon="md-add"
                    @click="insert">新增步骤</Button>
          </div>

          <!-- 表格 -->
          <Table border
                 disabled-hover
                 :data="tableData"
                 :columns="tableColumns"
                 stripe>
          </Table>

        </TabPane>

      </Tabs>

    </Card>

    <!-- Modal -->
    <!-- <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           title="账号详情"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="所属步骤："
                  prop="test_item_group_index">
          <Select v-model="modalData.test_item_group_index">
            <Option value="1">综合检测</Option>
            <Option value="2">静音检测</Option>
            <Option value="3">外观检测</Option>
          </Select>
        </FormItem>
        <FormItem label="不良品项："
                  prop="unqualified_name">
          <Input type="text"
                 v-model="modalData.unqualified_name"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')">确定</Button>
          <Button @click="handleReset('formModalData')"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal> -->
  </div>
</template>

<script>
// import {
//   getUnqualifiedList,
//   updateUnqualified,
//   insertUnqualified,
//   deleteUnqualified
// } from "@/api/unqualified";

export default {
  data() {
    return {
      // 顶部tab切换
      tabSelected: "1",
      // 产品类型 - select选项
      productTypeList: ["DM35R-6/28", "DM35R-6/23", "DM35R-6/21"],
      // 产品类型 - 被选中的选项
      processSelected: "DM35R-6/28",
      // table数据
      tableData: [
        {
          process: 1,
          describe: "前置工序"
        },
        {
          process: 2,
          describe: "顺转一"
        },
        {
          process: 3,
          describe: "顺转二"
        },
        {
          process: 4,
          describe: "顺转三"
        },
        {
          process: 5,
          describe: "逆转一"
        },
        {
          process: 6,
          describe: "逆转二"
        },
        {
          process: 7,
          describe: "逆转三"
        }
      ],
      // table表头
      tableColumns: [
        {
          title: "工序步骤",
          key: "process",
          align: "center",
          minWidth: 120
        },
        {
          title: "工序名称",
          key: "describe",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("Button", {
                props: {
                  type: "info",
                  size: "small",
                  icon: "md-arrow-up"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.show(params.row);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "info",
                  size: "small",
                  icon: "md-arrow-down"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.show(params.row);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "primary",
                  size: "small",
                  icon: "ios-create-outline"
                },
                style: {
                  marginRight: "5px"
                },
                on: {
                  click: () => {
                    this.show(params.row);
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "error",
                  size: "small",
                  icon: "ios-close"
                },
                on: {
                  click: () => {
                    this.show(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      // modal弹框 - 是否显示
      modalShow: false,
      // modal弹框 - 数据
      modalData: {},
      // modal弹框 - form规则
      formModalRule: {
        test_item_group_index: [
          { required: true, message: "请选择所属步骤", trigger: "blur" }
        ],
        unqualified_name: [
          { required: true, message: "请输入不良品项", trigger: "blur" },
          {
            type: "string",
            max: 20,
            message: "不良品项过长",
            trigger: "change"
          }
        ]
      },
      // modal弹框 - 类型
      modalDataType: ""
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    // 顶部tab被选择
    tabSelect(name) {
      this.tabSelected = name === "qc1" ? "1" : "2";
      this.getData();
    },
    // 获取首页数据
    async getData() {
      this.refreshData();
    },
    // 根据条件刷新数据
    refreshData() {
      // this.tableData = this.tableData;
    },
    // 点击按钮 - 新增
    insert() {
      this.modalDataType = "insert";
      this.modalData = {};
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      // console.log(row);
      if (!this.isMock) {
        // 非mock时
        this.modalDataType = "edit";
        this.modalData = JSON.parse(JSON.stringify(row));
        this.modalData.test_item_group_index = this.modalData.test_item_group_index.toString();
        this.modalShow = true;
      } else {
        // mock时
        this.modalDataType = "edit";
        this.modalData = row;
        this.modalData.test_item_group_name = row.test_item_group_name;
        localStorage.setItem(
          "test_item_group_name",
          this.modalData.test_item_group_name
        );
        this.modalShow = true;
      }
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          switch (this.modalDataType) {
            case "insert":
              if (!this.isMock) {
                // 非mock时
                await insertUnqualified(this.modalData);
                this.modalShow = false;
                this.getData();
              } else {
                // mock时
                this.tableData.forEach(list => {
                  if (
                    this.modalData.test_item_group_name.indexOf(
                      list.test_item_group_name
                    ) > -1
                  ) {
                    // console.log(list);
                    this.modalData.id = (this.tableData.length + 1).toString();
                    list.unqualified_item.push(this.modalData);
                  }
                });
                this.refreshData();
                this.$Message.success("添加成功!");
                this.modalShow = false;
              }
              break;
            case "edit":
              if (!this.isMock) {
                // 非mock时
                await updateUnqualified(this.modalData);
                this.modalShow = false;
                this.getData();
              } else {
                // mock时
                if (
                  localStorage.getItem("test_item_group_name") ===
                  this.modalData.test_item_group_name
                ) {
                  // 所属步骤分组无变化
                  this.tableData.forEach(list => {
                    if (
                      this.modalData.test_item_group_name ===
                      list.test_item_group_name
                    ) {
                      list.unqualified_item.forEach(item => {
                        if (this.modalData.id === item.id) {
                          this.$set(
                            item,
                            "unqualified_name",
                            this.modalData.unqualified_name
                          );
                        }
                      });
                    }
                  });
                } else {
                  // 所属步骤分组有变化
                  this.tableData.forEach(list => {
                    // 在原所属分组下删除
                    if (
                      localStorage.getItem("test_item_group_name") ===
                      list.test_item_group_name
                    ) {
                      // console.log(list);
                      list.unqualified_item.forEach(item => {
                        if (this.modalData.id === item.id) {
                          const index = list.unqualified_item.indexOf(item);
                          list.unqualified_item.splice(index, 1);
                        }
                      });
                    }
                    // 在新所属分组下增加
                    if (
                      this.modalData.test_item_group_name ===
                      list.test_item_group_name
                    ) {
                      list.unqualified_item.push(this.modalData);
                    }
                  });
                }
                this.refreshData();
                this.$Message.success("修改成功!");
                this.modalShow = false;
              }
              break;
          }
        }
      });
    },
    // 点击表单按钮 - 取消
    handleReset() {
      this.modalShow = false;
      this.modalData = {};
    },
    // 点击按钮 - 删除
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该不良品项？",
        onOk: async () => {
          if (!this.isMock) {
            // 非mock时
            await deleteUnqualified(row.id);
            this.getData();
          } else {
            // mock时
            this.tableData.forEach(list => {
              if (row.test_item_group_name === list.test_item_group_name) {
                list.unqualified_item.forEach(item => {
                  if (row.test_item_group_name === item.test_item_group_name) {
                    const index = list.unqualified_item.indexOf(item);
                    list.unqualified_item.splice(index, 1);
                  }
                });
              }
            });
            this.$Message.success("删除成功");
            this.refreshData();
          }
        },
        closable: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-table-body {
    overflow: hidden;
  }
  .ivu-table-cell {
    padding: 0;
  }
}
</style>
