<template>
  <div class="dooya-container">
    <Card>

      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                style="margin-right: 10px"
                @click="insert">新增配方组合</Button>
      </div>

      <!-- 表格 -->
      <Table border
             disabled-hover
             :loading="tableLoading"
             :data="tableData"
             :columns="tableColumns"
             stripe>
      </Table>

      <!-- 分页 -->
      <div v-if="tableData.length>0"
           style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                transfer
                placement="top"
                :total="total"
                :current.sync="pageNum"
                :page-size-opts="[10, 20, 50, 100]"
                :page-size="pageSize"
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>

    </Card>

    <!-- Modal -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           :title="modalDataType==='edit'?'编辑配方组合':'新增配方组合'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="综合检测："
                  prop="qc1SopTagId">
          <Cascader :data="qc1List"
                    v-model="modalData.qc1Select"
                    trigger="hover"
                    @on-change="(value)=>{modalData.qc1SopTagId=value[1]}">
          </Cascader>
        </FormItem>
        <FormItem label="静音检测："
                  prop="qc2SopTagId">
          <Cascader :data="qc2List"
                    v-model="modalData.qc2Select"
                    trigger="hover"
                    @on-change="(value)=>{modalData.qc2SopTagId=value[1]}">
          </Cascader>
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
import { snCodeList } from "./mockData/snCode"; // snCode列表
import { mNumberList } from "./mockData/checkStandard"; // [SOP-型号]级联选择器
// function
import {
  arraySort, // 对象数组根据key排序
  getValueByKey, // 根据对象数组某个key的value，查询另一个key的value
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import {
  findSopTagsByQcIndex // 获取标准标签列表 - cascader选择
} from "@/api/standard";
import { findSnWithPage, addSn, editSn, removeSn } from "@/api/snCode"; // snCode的增删改查

export default {
  data() {
    return {
      /* 全局 */
      qc1List: [], // qc1级联选择 - 数据list
      qc2List: [], // qc2级联选择 - 数据list
      /* table */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "综合检测",
          key: "sop1",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.sop1} / ${params.row.sop1Tag} / ${params.row.sop1TagCode}`
            );
          },
          minWidth: 250
        },
        {
          title: "静音检测",
          key: "sop2",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              `${params.row.sop2} / ${params.row.sop2Tag} / ${params.row.sop2TagCode}`
            );
          },
          minWidth: 250
        },
        {
          title: "sn码",
          key: "sn",
          align: "center",
          minWidth: 100
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
      total: 0, // 总数
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示数量
      /* loading */
      tableLoading: false, // table
      buttonLoading: false, // button
      /* modal */
      modalShow: false, // 是否显示
      modalDataType: "", // 类型 - insert or edit
      modalData: {}, // 数据
      modalDataOrg: {}, // 数据 - 行内原始
      formModalRule: {
        qc1SopTagId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.modalData.qc1Select.length === 0) {
                callback(new Error("请选择SOP1"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        qc2SopTagId: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (this.modalData.qc2Select.length === 0) {
                callback(new Error("请选择SOP2"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      } // form规则
    };
  },
  async created() {
    this.getData();
    this.initCascader();
  },
  methods: {
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        const dataResult = (await findSnWithPage(this.pageNum, this.pageSize))
          .data.data;
        if (dataResult !== null) {
          // 如果是在删除之后获取的数据 -> 若删掉的是某一页的最后项且页码不是1，则自动获取前一页的数据
          if (dataResult.pageData.length === 0 && dataResult.pageIndex !== 1) {
            this.pageNum--;
            this.getData();
          }
          this.tableData = dataResult.pageData;
          this.total = dataResult.dataCount;
        } else {
          this.tableData = [];
          this.total = 0;
        }
        this.tableLoading = false;
        this.buttonLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = snCodeList;
        this.refreshData();
      }
    },
    // 渲染级联选择器
    async initCascader() {
      if (!this.isMock) {
        // 接口数据
        this.qc1List = (await findSopTagsByQcIndex("1")).data.data || [];
        this.qc2List = (await findSopTagsByQcIndex("2")).data.data || [];
      } else {
        // mock数据
        this.qc1List = mNumberList["1"];
        this.qc2List = mNumberList["2"];
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"sn码"升序
      this.tableDataOrg.sort(arraySort("sn", "asc"));
      // 分页 & 每页条数
      this.tableData = this.tableDataOrg.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
      this.total = this.tableDataOrg.length;
      // 如果是在删除之后获取的数据 -> 若删掉的是某一页的最后项且页码不是1，则自动获取前一页的数据
      if (this.tableData.length === 0 && this.tableDataOrg.length !== 0) {
        this.pageNum--;
        this.refreshData();
      }
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.getData();
    },
    // 每页条数变化
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.getData();
    },
    // 点击按钮 - 新增
    insert() {
      this.modalDataType = "insert";
      this.$refs.formModalData.resetFields();
      this.modalData.qc1Select = [];
      this.modalData.qc2Select = [];
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalDataType = "edit";
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalData.qc1Select = [
        this.modalData.sop1Id.toString(),
        this.modalData.sop1TagId
      ];
      this.modalData.qc2Select = [
        this.modalData.sop2Id.toString(),
        this.modalData.sop2TagId
      ];
      this.modalData.qc1SopTagId = this.modalData.sop1TagId;
      this.modalData.qc2SopTagId = this.modalData.sop2TagId;
      this.modalDataOrg = JSON.parse(JSON.stringify(this.modalData));
      this.modalShow = true;
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      // console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          switch (this.modalDataType) {
            case "insert":
              if (!this.isMock) {
                // 接口数据
                const result = (await addSn(this.modalData)).data.status;
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
                // mock数据
                if (
                  this.tableDataOrg.some(
                    item =>
                      item.sop1TagId === this.modalData.qc1SopTagId &&
                      item.sop2TagId === this.modalData.qc2SopTagId
                  )
                ) {
                  // 判断重复
                  this.$Message.error("此SOP组合已存在！");
                  this.buttonLoading = false;
                } else {
                  // 生成模拟snCode，不能与现有的code重复
                  var snCode = 1001;
                  this.tableDataOrg.forEach(item => {
                    if (snCode === item.sn) snCode++;
                  });
                  // 生成模拟sop1TagCode和sop2TagCode
                  var array = ["22", "23"];
                  this.modalData.sop1TagCode =
                    array[Math.round(Math.random() * (array.length - 1))] +
                    parseInt(Math.random() * (99999 - 10000) + 10000, 10);
                  this.modalData.sop2TagCode =
                    array[Math.round(Math.random() * (array.length - 1))] +
                    parseInt(Math.random() * (99999 - 10000) + 10000, 10);
                  // 重构要塞入的数据
                  this.modalData.sn = snCode;
                  this.modalData.sop1 = getValueByKey(
                    this.qc1List,
                    "value",
                    this.modalData.qc1Select[0],
                    "label"
                  );
                  this.modalData.sop1Tag = getValueByKey(
                    getValueByKey(
                      this.qc1List,
                      "value",
                      this.modalData.qc1Select[0],
                      "children"
                    ),
                    "value",
                    this.modalData.qc1Select[1],
                    "label"
                  );
                  this.modalData.sop1Id = this.modalData.qc1Select[0];
                  this.modalData.sop1TagId = this.modalData.qc1Select[1];
                  this.modalData.sop2 = getValueByKey(
                    this.qc2List,
                    "value",
                    this.modalData.qc2Select[0],
                    "label"
                  );
                  this.modalData.sop2Tag = getValueByKey(
                    getValueByKey(
                      this.qc2List,
                      "value",
                      this.modalData.qc2Select[0],
                      "children"
                    ),
                    "value",
                    this.modalData.qc2Select[1],
                    "label"
                  );
                  this.modalData.sop2Id = this.modalData.qc2Select[0];
                  this.modalData.sop2TagId = this.modalData.qc2Select[1];
                  // console.log(this.modalData);
                  // 成功塞入数据
                  this.tableDataOrg.push(
                    JSON.parse(JSON.stringify(this.modalData))
                  );
                  resultCallback(200, "添加成功！", () => {
                    this.refreshData();
                    this.buttonLoading = false;
                    this.modalShow = false;
                  });
                }
              }
              break;
            case "edit":
              if (!this.isMock) {
                // 接口数据
                const result = (await editSn(this.modalData)).data.status;
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
                // mock数据
                if (
                  this.tableDataOrg.some(
                    item =>
                      item.sop1TagId === this.modalData.qc1SopTagId &&
                      item.sop2TagId === this.modalData.qc2SopTagId
                  ) &&
                  (this.modalData.qc1SopTagId !==
                    this.modalDataOrg.qc1SopTagId ||
                    this.modalData.qc2SopTagId !==
                      this.modalDataOrg.qc2SopTagId)
                ) {
                  // 判断重复
                  this.$Message.error("此SOP组合已存在！");
                  this.buttonLoading = false;
                } else {
                  // 重构要塞入的数据
                  this.modalData.sop1 = getValueByKey(
                    this.qc1List,
                    "value",
                    this.modalData.qc1Select[0],
                    "label"
                  );
                  this.modalData.sop1Tag = getValueByKey(
                    getValueByKey(
                      this.qc1List,
                      "value",
                      this.modalData.qc1Select[0],
                      "children"
                    ),
                    "value",
                    this.modalData.qc1Select[1],
                    "label"
                  );
                  this.modalData.sop1Id = this.modalData.qc1Select[0];
                  this.modalData.sop1TagId = this.modalData.qc1Select[1];
                  this.modalData.sop2 = getValueByKey(
                    this.qc2List,
                    "value",
                    this.modalData.qc2Select[0],
                    "label"
                  );
                  this.modalData.sop2Tag = getValueByKey(
                    getValueByKey(
                      this.qc2List,
                      "value",
                      this.modalData.qc2Select[0],
                      "children"
                    ),
                    "value",
                    this.modalData.qc2Select[1],
                    "label"
                  );
                  this.modalData.sop2Id = this.modalData.qc2Select[0];
                  this.modalData.sop2TagId = this.modalData.qc2Select[1];
                  // console.log(this.modalData);
                  // 修改数据
                  this.$set(
                    this.tableDataOrg,
                    (this.pageNum - 1) * this.pageSize + this.modalData._index,
                    JSON.parse(JSON.stringify(this.modalData))
                  );
                  resultCallback(200, "修改成功！", () => {
                    this.refreshData();
                    this.buttonLoading = false;
                    this.modalShow = false;
                  });
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
        title: "确定删除该sn码？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeSn(row.sn);
            resultCallback(result.data.status, "删除成功！", () => {
              this.getData();
            });
          } else {
            // mock数据
            this.tableDataOrg
              .slice(
                (this.pageNum - 1) * this.pageSize,
                this.pageNum * this.pageSize
              )
              .forEach((item, i) => {
                if (row.sn === item.sn) {
                  this.tableDataOrg.splice(
                    (this.pageNum - 1) * this.pageSize + i,
                    1
                  );
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
  // .ivu-table-body {
  // overflow: hidden;
  // }
  // .ivu-table-cell {
  //   padding: 0;
  // }
}
</style>
