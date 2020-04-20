<template>
  <div class="dooya-container">
    <Card>
      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                @click="insert">新增异常原因</Button>
      </div>

      <!-- 表格 -->
      <Table border
             disabled-hover
             :data="tableData"
             :columns="tableColumns"
             stripe>
      </Table>
    </Card>

    <!-- Modal -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           title="不合格项目"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="所属步骤："
                  prop="test_item_group_index">
          <Select v-model="modalData.test_item_group_index">
            <Option v-for="(workStation,i) in workStationList"
                    :value="workStation.id.toString()"
                    :key="i">
              {{ workStation.typeName }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="不良品项："
                  prop="unqualified_name">
          <Input type="text"
                 v-model.trim="modalData.unqualified_name"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="modalShow=false"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// mockData
import { rejectList } from "./mockData/reject"; // 异常原因列表
import { workStationList } from "./mockData/sop"; // 测试步骤列表
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback, // 根据请求的status执行回调函数
  getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
// api
import {
  getUnqualifiedList,
  updateUnqualified,
  insertUnqualified,
  deleteUnqualified
} from "@/api/unqualified"; // 增删改查

export default {
  data() {
    return {
      workStationList: workStationList, // 测试步骤列表
      /* table */
      tableData: [], // 数据
      tableColumns: [
        {
          title: "测试步骤",
          key: "test_item_group_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "不合格项目",
          key: "list",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h(
                  "ul",
                  this.tableData[params.index].unqualified_item.map(item => {
                    return h("li", {}, item.unqualified_name);
                  })
                )
              ]
            );
          },
          minWidth: 200
        },
        {
          title: "操作",
          key: "action",
          // fixed: 'right',
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  class: "subCol"
                }
              },
              [
                h(
                  "ul",
                  this.tableData[params.index].unqualified_item.map(
                    (item, index) => {
                      return h("li", [
                        h(
                          "Tooltip",
                          {
                            props: {
                              trigger: "hover",
                              content: "修改",
                              placement: "top",
                              transfer: true
                            }
                          },
                          [
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
                                  this.edit(params.row.unqualified_item[index]);
                                }
                              }
                            })
                          ]
                        ),
                        h(
                          "Tooltip",
                          {
                            props: {
                              trigger: "hover",
                              content: "删除",
                              placement: "top",
                              transfer: true
                            }
                          },
                          [
                            h("Button", {
                              props: {
                                type: "error",
                                size: "small",
                                icon: "md-close"
                              },
                              on: {
                                click: () => {
                                  this.delete(
                                    params.row.unqualified_item[index]
                                  );
                                }
                              }
                            })
                          ]
                        )
                      ]);
                    }
                  )
                )
              ]
            );
          }
        }
      ], // 表头列项
      /* loading */
      tableLoading: false, // table
      buttonLoading: false, // button
      /* modal弹框 */
      modalShow: false, // 是否显示
      modalDataType: "", // 类型 - insert or edit
      modalData: {
        test_item_group_index: "",
        unqualified_name: ""
      }, // 数据
      modalDataOrg: {}, // 数据 - 行内原始
      formModalRule: {
        test_item_group_index: [
          { required: true, message: "请选择所属步骤", trigger: "change" }
        ],
        unqualified_name: [
          { required: true, message: "请输入不良品项", trigger: "change" },
          {
            type: "string",
            max: 30,
            message: "不良品项过长",
            trigger: "change"
          }
        ]
      } // form规则
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.tableLoading = true;
      this.tableData = !this.isMock
        ? (await getUnqualifiedList()).data.data || []
        : rejectList;
      this.refreshData();
      this.buttonLoading = false;
      this.tableLoading = false;
    },
    // 根据条件刷新数据
    refreshData() {
      this.isMock &&
        this.tableData.forEach(item => {
          // 按"unqualified_name"升序
          item.unqualified_item.sort(arraySort("unqualified_name", "asc"));
        });
    },
    // 点击按钮 - 新增
    insert() {
      this.modalDataType = "insert";
      this.$refs.formModalData.resetFields();
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalDataType = "edit";
      this.modalDataOrg = row;
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalData.test_item_group_index = this.modalData.test_item_group_index.toString();
      // localStorage.setItem(
      //   "test_item_group_name",
      //   this.modalData.test_item_group_name
      // );
      this.modalShow = true;
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          this.modalData.test_item_group_name = getValueByKey(
            workStationList,
            "id",
            this.modalData.test_item_group_index,
            "typeName"
          );
          // console.log(this.modalData);
          switch (this.modalDataType) {
            case "insert":
              if (!this.isMock) {
                /* 接口数据 */
                const result = (await insertUnqualified(this.modalData)).data
                  .status;
                resultCallback(
                  result,
                  "添加成功！",
                  () => {
                    this.modalShow = false;
                    this.getData();
                  },
                  () => {
                    this.buttonLoading = false;
                  }
                );
              } else {
                /* mock数据 */
                this.tableData.forEach(list => {
                  if (
                    this.modalData.test_item_group_name ===
                    list.test_item_group_name
                  ) {
                    if (
                      list.unqualified_item.some(
                        item =>
                          item.unqualified_name ===
                          this.modalData.unqualified_name
                      )
                    ) {
                      // 判断重复
                      this.$Message.error("该步骤的该不合格项目已存在！");
                      this.buttonLoading = false;
                    } else {
                      // 随机生成id
                      this.modalData.id = Math.random()
                        .toString(36)
                        .substr(-10);
                      list.unqualified_item.push(
                        JSON.parse(JSON.stringify(this.modalData))
                      );
                      resultCallback(200, "添加成功！", () => {
                        this.refreshData();
                        this.buttonLoading = false;
                        this.modalShow = false;
                      });
                    }
                  }
                });
              }
              break;
            case "edit":
              if (!this.isMock) {
                /* 接口数据 */
                const result = (await updateUnqualified(this.modalData)).data
                  .status;
                resultCallback(
                  result,
                  "修改成功！",
                  () => {
                    this.modalShow = false;
                    this.getData();
                  },
                  () => {
                    this.buttonLoading = false;
                  }
                );
              } else {
                /* mock数据 */
                if (
                  this.modalData.test_item_group_name ===
                  this.modalDataOrg.test_item_group_name
                ) {
                  // console.log("所属分组无变化");
                  this.tableData.forEach(list => {
                    if (
                      this.modalData.test_item_group_name ===
                      list.test_item_group_name
                    ) {
                      if (
                        list.unqualified_item.some(
                          item =>
                            item.unqualified_name ===
                            this.modalData.unqualified_name
                        ) &&
                        this.modalData.unqualified_name !==
                          this.modalDataOrg.unqualified_name
                      ) {
                        // 判断重复
                        this.$Message.error("该步骤的该不合格项目已存在！");
                        this.buttonLoading = false;
                      } else {
                        list.unqualified_item.forEach((item, i) => {
                          this.modalData.id === item.id &&
                            this.$set(
                              list.unqualified_item,
                              i,
                              JSON.parse(JSON.stringify(this.modalData))
                            );
                        });
                        resultCallback(200, "修改成功", () => {
                          this.refreshData();
                          this.buttonLoading = false;
                          this.modalShow = false;
                        });
                      }
                    }
                  });
                } else {
                  // console.log("所属分组有变化");
                  if (
                    this.tableData.some(
                      list =>
                        list.unqualified_item.some(
                          item =>
                            item.unqualified_name ===
                            this.modalData.unqualified_name
                        ) &&
                        this.modalData.test_item_group_name ===
                          list.test_item_group_name
                    )
                  ) {
                    // 判断重复
                    this.$Message.error("该步骤的该不合格项目已存在！");
                    this.buttonLoading = false;
                  } else {
                    this.tableData.forEach(list => {
                      // 1.在原所属分组下删除
                      this.modalDataOrg.test_item_group_name ===
                        list.test_item_group_name &&
                        list.unqualified_item.forEach((item, i) => {
                          this.modalData.id === item.id &&
                            list.unqualified_item.splice(i, 1);
                        });
                      // 2.在新所属分组下增加
                      this.modalData.test_item_group_name ===
                        list.test_item_group_name &&
                        list.unqualified_item.push(
                          JSON.parse(JSON.stringify(this.modalData))
                        );
                    });
                    resultCallback(200, "修改成功", () => {
                      this.refreshData();
                      this.buttonLoading = false;
                      this.modalShow = false;
                    });
                  }
                }
              }
              break;
          }
        }
      });
    },
    // 点击按钮 - 删除
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该不良品项？",
        onOk: async () => {
          if (!this.isMock) {
            /* 接口数据 */
            const result = (await deleteUnqualified(row.id)).data.status;
            resultCallback(result, "删除成功！", () => {
              this.getData();
            });
          } else {
            /* mock数据 */
            this.tableData.forEach(list => {
              if (row.test_item_group_name === list.test_item_group_name) {
                list.unqualified_item.forEach((item, i) => {
                  row.id === item.id && list.unqualified_item.splice(i, 1);
                });
              }
            });
            resultCallback(200, "删除成功！", () => {
              this.refreshData();
            });
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
  .subCol > ul > li {
    margin: 0 -18px;
    list-style: none;
    text-align: center;
    // padding: 9px 0;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e8eaec;
    overflow: hidden;
  }
  .subCol > ul > li:last-child {
    border-bottom: none;
  }
}
</style>
