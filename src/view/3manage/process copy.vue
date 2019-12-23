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
            <Select v-model="sopSelected"
                    filterable
                    transfer
                    placeholder="请选择sop"
                    style="width:200px"
                    @on-change="sopSearch">
              <Option v-for="item in sopSelectList"
                      :value="item.sop"
                      :key="item.sop">{{ item.sop }}</Option>
            </Select>
          </div>

          <!-- 表格 -->
          <Table border
                 disabled-hover
                 :loading="tableLoading"
                 :data="tableData"
                 :columns="tableColumns"
                 no-data-text="请选择SOP"
                 stripe>
          </Table>

        </TabPane>

        <!-- 静音检测 -->
        <TabPane label="静音检测"
                 name="qc2">

          <div style="margin: 10px 0">
            <Select v-model="sopSelected"
                    filterable
                    transfer
                    placeholder="请选择sop"
                    style="width:200px"
                    @on-change="sopSearch">
              <Option v-for="item in sopSelectList"
                      :value="item.sop"
                      :key="item.sop">{{ item.sop }}</Option>
            </Select>
          </div>

          <Table border
                 disabled-hover
                 :loading="tableLoading"
                 :data="tableData"
                 :columns="tableColumns"
                 no-data-text="请选择SOP"
                 stripe>
          </Table>

        </TabPane>

      </Tabs>

    </Card>

    <!-- Modal -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           title="参数选择"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="60"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="description">
          <Input type="text"
                 disabled
                 v-model="modalData.description"
                 placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="参数："
                  prop="describe"
                  style="margin-bottom: 14px">
          <CheckboxGroup v-model="modalDataDescribe">
            <Checkbox v-for="(item,i) in processSelectList"
                      :key="i"
                      :label="item.id">
              <span>{{item.description}}</span>
            </Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')">确定</Button>
          <Button @click="modalShow=false"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
// mockData
import {
  processList,
  sopSelectList,
  processSelectList
} from "./mockData/process";
// api
import {
  findSopByKey,
  findSopItemBySop,
  findAllItemParam,
  editItemParam
} from "@/api/process";

export default {
  data() {
    return {
      // 顶部tab切换
      tabSelected: 1,
      // sop下拉框
      sopSelectList: sopSelectList,
      // 被选择的sop
      sopSelected: "",
      // table数据
      tableData: [],
      // table表头
      tableColumns: [
        {
          title: "名称",
          key: "description",
          // align: "center",
          minWidth: 100
        },
        {
          title: "参数",
          key: "describe",
          // align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: params.row.params.length === 0 ? "none" : "block"
                }
              },
              [
                params.row.params.map(item => {
                  return h(
                    "Tag",
                    {
                      props: {
                        color: "blue"
                      }
                    },
                    item.description
                  );
                })
              ]
            );
          },
          minWidth: 500
        },
        {
          title: "操作",
          key: "action",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                        this.edit(params.row);
                      }
                    }
                  })
                ]
              )
            ]);
          }
        }
      ],
      // loading
      tableLoading: false,
      // modal弹框 - 是否显示
      modalShow: false,
      // modal弹框 - 数据
      modalData: {},
      // 编辑SOP工序时临时的数组
      modalDataDescribe: [],
      // modal弹框 - form规则
      formModalRule: {
        description: [
          { required: true, message: "请输入SOP名称", trigger: "blur" }
        ]
      },
      // modal弹框 - 参数列表
      processSelectList: processSelectList
    };
  },
  async created() {
    // this.getData();
    this.tabSelect("qc1");
  },
  methods: {
    // 顶部tab被选择
    async tabSelect(name) {
      this.tableLoading = true;
      this.tabSelected = name === "qc1" ? 1 : 2;
      if (!this.isMock) {
        // sop下拉框
        this.sopSelectList = (await findSopByKey(
          this.tabSelected,
          ""
        )).data.data;
        // 默认选择第一个
        if (this.sopSelectList.length !== 0) {
          this.sopSearch(this.sopSelectList[0].sop);
        }
        // 工序参数列表
        this.processSelectList = (await findAllItemParam(
          this.tabSelected
        )).data.data;
      } else {
        // 默认选择第一个
        if (this.sopSelectList.length !== 0) {
          this.sopSearch(this.sopSelectList[0].sop);
        }
      }
    },
    // sop被选择
    sopSearch(value) {
      this.sopSelected = value;
      this.getData();
    },
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 非mock时
        this.tableData = (await findSopItemBySop(this.sopSelected)).data.data;
        this.tableLoading = false;
      } else {
        // mock时
        this.tableData = processList;
        this.tableLoading = false;
      }
      this.refreshData();
    },
    // 根据条件刷新数据
    refreshData() {
      // this.tableData = this.tableData;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalDataDescribe = [];
      this.modalData.params.forEach(item => {
        this.modalDataDescribe.push(parseInt(item.id));
      });
      this.modalShow = true;
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          const updateData = {
            itemId: this.modalData.id,
            paramCode: this.modalDataDescribe
          };
          if (!this.isMock) {
            // 非mock时
            const result = (await editItemParam(updateData)).data.status;
            if (result === 200) {
              this.$Message.success("修改成功！");
            }
            this.modalShow = false;
            this.getData();
          } else {
            // mock时
            this.$Message.success("修改成功！");
            this.getData();
            this.modalShow = false;
          }
        }
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
  .ivu-table {
    max-height: calc(100vh - 260px);
    overflow-y: auto;
    overflow: overlay;
    th {
      text-align: center;
    }
  }
  // .ivu-table-cell {
  //   padding: 0;
  // }
}
</style>
