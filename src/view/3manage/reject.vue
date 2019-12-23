<template>
  <div class="dooya-container">
    <Card>
      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                @click="insert">新增不良品</Button>
      </div>

      <!-- 表格 -->
      <Table border
             disabled-hover
             :data="tableData"
             :columns="tableColumns"
             stripe></Table>

      <!-- <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                :total="tableDataOrg.length"
                :current="1"
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div> -->
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
            <Option value="1">综合检测</Option>
            <Option value="2">静音检测</Option>
            <Option value="3">外观检测</Option>
          </Select>
        </FormItem>
        <FormItem label="不良品项："
                  prop="unqualified_name">
          <Input type="text"
                 v-model.trim="modalData.unqualified_name"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')">确定</Button>
          <Button @click="handleReset('formModalData')"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  getUnqualifiedList,
  updateUnqualified,
  insertUnqualified,
  deleteUnqualified
} from "@/api/unqualified";

export default {
  data() {
    return {
      // 原始数据
      tableDataOrg: [
        {
          unqualified_item: [
            {
              unqualified_name: "刹车打滑",
              id: 1,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "砝码拉不动",
              id: 2,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "单转",
              id: 3,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "短路",
              id: 4,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "反转",
              id: 5,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "不转",
              id: 6,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "减速不良",
              id: 7,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "对码不良",
              id: 8,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "转速不良",
              id: 9,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "点动",
              id: 10,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "蜗杆紧/松",
              id: 11,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "蜗杆减不死",
              id: 12,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "通电自转",
              id: 13,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "蜗杆加不活",
              id: 14,
              test_item_group_name: "综合检测"
            },
            {
              unqualified_name: "芯片测试不良",
              id: 15,
              test_item_group_name: "综合检测"
            }
          ],
          test_item_group_name: "综合检测"
        },
        {
          unqualified_item: [
            {
              unqualified_name: "低电压不吸合",
              id: 16,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "热保护不到4分钟",
              id: 17,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "超分贝",
              id: 18,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "轴承响",
              id: 19,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "电机扫堂",
              id: 20,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "电机响",
              id: 21,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "杂音(减速异响）",
              id: 22,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "接地不过",
              id: 23,
              test_item_group_name: "静音检测"
            },
            {
              unqualified_name: "高压不过",
              id: 24,
              test_item_group_name: "静音检测"
            }
          ],
          test_item_group_name: "静音检测"
        },
        {
          unqualified_item: [
            {
              unqualified_name: "外管不良",
              id: 25,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "螺丝、销子不良",
              id: 26,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "排线不良",
              id: 27,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "电源线不良",
              id: 28,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "电子行程头不良",
              id: 29,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "内外端盖不良",
              id: 30,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "行程内齿套不良",
              id: 31,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "行程网印不良",
              id: 32,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "零件漏装、多装、错装",
              id: 33,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "前盖板方轴不良",
              id: 34,
              test_item_group_name: "外观检测"
            },
            {
              unqualified_name: "电源线、铜皮脱落、接地端子不良",
              id: 35,
              test_item_group_name: "外观检测"
            }
          ],
          test_item_group_name: "外观检测"
        }
      ],
      // 处理后的当页数据
      tableData: [],
      // 表头列项
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
                  this.tableDataOrg[params.index].unqualified_item.map(item => {
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
                  this.tableDataOrg[params.index].unqualified_item.map(
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
      ],
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
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
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        this.tableDataOrg = (await getUnqualifiedList()).data.data;
      }
      this.refreshData();
    },
    // 根据条件刷新数据
    refreshData() {
      this.tableData = this.tableDataOrg;
      // this.tableData = this.tableDataOrg.slice(
      //   (this.pageNum - 1) * this.pageSize,
      //   this.pageNum * this.pageSize
      // );
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.refreshData();
    },
    // 每页条数变化
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.refreshData();
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
                const result = (await insertUnqualified(this.modalData)).data
                  .status;
                if (result === 200) {
                  this.$refs.formModalData.resetFields();
                  this.$Message.success("新增成功！");
                  this.modalShow = false;
                  this.getData();
                }
              } else {
                // mock时
                this.tableDataOrg.forEach(list => {
                  if (
                    this.modalData.test_item_group_name.indexOf(
                      list.test_item_group_name
                    ) > -1
                  ) {
                    // console.log(list);
                    this.modalData.id = (
                      this.tableDataOrg.length + 1
                    ).toString();
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
                const result = (await updateUnqualified(this.modalData)).data
                  .status;
                if (result === 200) {
                  this.$refs.formModalData.resetFields();
                  this.$Message.success("修改成功！");
                  this.modalShow = false;
                  this.getData();
                }
              } else {
                // mock时
                if (
                  localStorage.getItem("test_item_group_name") ===
                  this.modalData.test_item_group_name
                ) {
                  // 所属步骤分组无变化
                  this.tableDataOrg.forEach(list => {
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
                  this.tableDataOrg.forEach(list => {
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
      this.$refs.formModalData.resetFields();
      this.modalShow = false;
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
            this.tableDataOrg.forEach(list => {
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
