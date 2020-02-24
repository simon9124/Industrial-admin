<template>
  <div class="dooya-container">
    <Card>

      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                style="margin-right: 10px"
                @click="insert">新增工位</Button>
      </div>

      <!-- 表格 -->
      <Table border
             disabled-hover
             :loading="tableLoading"
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
           :title="modalDataType==='edit'?'编辑工位':'新增工位'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="工位名称"
                  prop="workStationName">
          <Input v-model.trim="modalData.workStationName"
                 placeholder="请输入工位名称"></Input>
        </FormItem>
        <FormItem label="工位号"
                  prop="sort">
          <Input v-model.trim="modalData.sort"
                 placeholder="请输入工位号"
                 @on-keydown='keydown($event)'>
          </Input>
        </FormItem>
        <FormItem label="功能类别"
                  prop="funcTypeId">
          <Select v-model="modalData.funcTypeId"
                  placeholder="请选择">
            <Option v-for="(item,i) in tabList"
                    :value="item.id"
                    :key="i">{{ item.typeName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="工位描述"
                  prop="decripttion">
          <Input v-model.trim="modalData.decripttion"
                 placeholder="请输入工位描述"></Input>
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
import { tabList } from "./mockData/sop"; // 顶部tab列表
// function
import {
  arraySort, // 对象数组根据key排序
  getValueByKey, // 根据对象数组某个key的value，查询另一个key的value
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import { getAllEquipmentFunctype } from "@/api/process"; // 获取功能类别list
import {
  getWorkStationsByLineNo,
  addLineWorkStation,
  updateLineWorkStation,
  removeLineWorkStation
} from "@/api/workStation"; // 工位的增删改查

export default {
  data() {
    return {
      /* 全局 */
      lineNo: "22", // 产线号
      tabList: [], // 顶部tab列表
      /* table */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "工位号",
          key: "sort",
          align: "center",
          minWidth: 100
        },
        {
          title: "工位名称",
          key: "workStationName",
          align: "center",
          minWidth: 150
        },
        {
          title: "功能类别",
          key: "funcTypeId",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              getValueByKey(
                this.tabList,
                "id",
                params.row.funcTypeId.toString(),
                "typeName"
              )
            );
          },
          minWidth: 150
        },
        {
          title: "描述",
          key: "decripttion",
          align: "center",
          minWidth: 180
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
                        this.delete(params.row);
                      }
                    }
                  })
                ]
              )
            ]);
          }
        }
      ], // table表头
      /* loading */
      tableLoading: false, // table
      buttonLoading: false, // button
      /* modal */
      modalShow: false, // 是否显示
      modalDataType: "", // 类型 - insert or edit
      modalData: {
        workStationName: "",
        sort: "",
        funcTypeId: 1,
        decripttion: ""
      }, // 数据
      modalDataOrg: {}, // 数据 - 行内原始
      formModalRule: {
        workStationName: [
          {
            required: true,
            message: "请输入工位名称",
            trigger: "change"
          },
          { type: "string", max: 10, message: "名称过长", trigger: "change" }
        ],
        sort: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入工位号"));
              } else if (value > 999 || value < 1 || value.indexOf(".") > -1) {
                callback(new Error("请输入1-999的整数"));
              } else {
                callback();
              }
            },
            trigger: "blur,change"
          }
        ]
      }, // form规则
      tagKeyCodeList: [
        8,
        48,
        49,
        50,
        51,
        52,
        53,
        54,
        55,
        56,
        57,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105
      ] // 符合sort的键盘code
    };
  },
  async created() {
    this.lineNo = localStorage.getItem("loginLineNo") || "22";
    this.getData();
  },
  methods: {
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.tabList = (await getAllEquipmentFunctype()).data.data || [];
        this.tableData =
          (await getWorkStationsByLineNo(this.lineNo)).data.data || [];
        this.tableLoading = false;
        this.buttonLoading = false;
      } else {
        // mock数据
        this.tabList = tabList;
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"工序号"升序
      this.tableDataOrg.sort(arraySort("sort", "asc"));
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
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalData.sort = this.modalData.sort.toString();
      this.modalDataOrg = JSON.parse(JSON.stringify(this.modalData));
      this.modalDataOrg.sort = this.modalDataOrg.sort.toString();
      this.modalShow = true;
    },
    // 工位号的input的keydown事件
    keydown(event) {
      if (this.tagKeyCodeList.indexOf(event.keyCode) === -1) {
        event.preventDefault();
      }
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      // console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          this.modalData.sort = parseInt(this.modalData.sort);
          switch (this.modalDataType) {
            case "insert":
              if (!this.isMock) {
                // 接口数据
                const result = (await addLineWorkStation(this.modalData)).data
                  .status;
                resultCallback(
                  result,
                  "添加成功！",
                  () => {
                    this.modalShow = false;
                    this.getData();
                  },
                  () => {
                    this.modalData.sort = this.modalData.sort.toString();
                    this.buttonLoading = false;
                  }
                );
              } else {
                // mock数据
              }
              break;
            case "edit":
              if (!this.isMock) {
                // 接口数据
                const result = (await updateLineWorkStation(this.modalData))
                  .data.status;
                resultCallback(
                  result,
                  "修改成功！",
                  () => {
                    this.modalShow = false;
                    this.getData();
                  },
                  () => {
                    this.modalData.sort = this.modalData.sort.toString();
                    this.buttonLoading = false;
                  }
                );
              } else {
                // mock数据
              }
              break;
          }
        }
      });
    },
    // 点击按钮 - 删除
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该sn码？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeLineWorkStation(row.id);
            resultCallback(result.data.status, "删除成功！", () => {
              this.getData();
            });
          } else {
          }
        },
        closable: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
// .dooya-container /deep/ {
// .ivu-table-body {
// overflow: hidden;
// }
// .ivu-table-cell {
//   padding: 0;
// }
// }
</style>
