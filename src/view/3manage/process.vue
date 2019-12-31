<template>
  <div class="dooya-container">
    <Card>

      <Tabs @on-click="tabSelect">

        <TabPane v-for="tab in tabList"
                 :key="tab.id"
                 :label="tab.typeName"
                 :name="tab.id">

          <!-- 操作 -->
          <div style="margin: 10px 0">
            <Select v-model="sopSelected"
                    filterable
                    transfer
                    placeholder="请选择sop"
                    style="width:200px"
                    @on-change="sopSearch">
              <Option v-for="item in sopSelectList"
                      :value="item.id"
                      :key="item.id">{{ item.sop }}</Option>
            </Select>
          </div>

          <!-- 表格 -->
          <Table border
                 disabled-hover
                 :loading="tableLoading"
                 :data="tableData"
                 :columns="tableColumns"
                 no-data-text="请选择SOP，或配置该SOP的相关工序"
                 stripe>
          </Table>

        </TabPane>

      </Tabs>

    </Card>

    <!-- Modal -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           footer-hide
           title="参数选择"
           width='620'
           @on-visible-change="handleVisibleChange">
      <Form ref="formModalData"
            :model="modalData"
            :label-width="80"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="description">
          <Input type="text"
                 disabled
                 v-model="modalData.description"
                 placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="结果值："
                  prop="plcResultAdd"
                  style="height:32.89px">
          <Checkbox v-model="resultValueShow"
                    @on-change="resultValueOnchange"></Checkbox>
          <Input v-if="resultValueShow"
                 v-model.trim="modalData.plcResultAdd"
                 :disabled="!resultValueCanBeEdit"
                 type="text"
                 style="width:200px;margin-left:10px"
                 placeholder="请输入结果值"></Input>
          <div v-if="resultValueShow"
               style="float:right;margin-right:10px">
            <Button :disabled="resultValueCanBeEdit"
                    type="primary"
                    size="small"
                    style="margin-left:10px"
                    @click="resultValueCanBeEdit=!resultValueCanBeEdit">修改
            </Button>
            <Button :disabled="!resultValueCanBeEdit"
                    type="success"
                    size="small"
                    style="margin-left:10px"
                    :loading="buttonLoading"
                    @click="resultValueSubmit">确认
            </Button>
          </div>
        </FormItem>
        <FormItem label="参数："
                  prop="describe"
                  style="margin-bottom: 14px">

          <!-- checkbox：参数 -->
          <CheckboxGroup v-model="modalDataDescribe"
                         @on-change="describeOnChange">
            <Checkbox v-for="(item,i) in processSelectList"
                      :key="i"
                      :disabled="JSON.stringify(describeParams).indexOf(item.description)>-1"
                      :label="item.code">
              <span>{{item.description}}</span>
            </Checkbox>
          </CheckboxGroup>

          <!-- select：参数 + 值 -->
          <div v-if="modalDataDescribe.length!==0">
            <Select v-model="processSelected"
                    ref="processSelect"
                    clearable
                    placeholder="请选择参数"
                    style="margin:10px 10px 0 0;width:120px">
              <Option v-for="(item,i) in processTempList"
                      :key="i"
                      :value="item.id">{{ item.description }}</Option>
            </Select>
            <Select v-model="valueSelected"
                    ref="valueSelect"
                    clearable
                    placeholder="请选择值"
                    style="margin:10px 10px 0 0;width:120px">
              <Option v-for="(item,i) in valueSelectList"
                      :key="i"
                      :value="item.key">{{ item.value }}</Option>
            </Select>
            <Input v-model.trim="processPlcAdd"
                   type="text"
                   style="width:100px;margin-right:10px;vertical-align:bottom"
                   placeholder="请输入"></Input>
            <Button type="info"
                    size="small"
                    style="vertical-align:text-top"
                    :disabled="processSelected===''||processSelected===undefined
                               ||valueSelected===''||valueSelected===undefined||processPlcAdd===''"
                    :loading="buttonLoading"
                    @click="addParams">添加
            </Button>
          </div>

          <!-- list：参数 + 值 -->
          <div v-if="describeParams.length!==0"
               class="describe-params">
            <div v-for="(describe,i) in describeParams"
                 :key="i"
                 class="describe-params-content">
              <span>
                {{describe.paramDescription}}
              </span>
              <span style="width:80px">
                {{describe.plcType===1?'下限':describe.plcType===2?'上限':'过程值'}}
              </span>
              <span>
                <Input v-model.trim="describe.plCAdd"
                       :disabled="!describe.isEdit"
                       style="width:100px"></Input>
              </span>
              <div style="float:right;margin:10px 10px 0 0">
                <Button :disabled="describe.isEdit"
                        type="primary"
                        size="small"
                        style="margin-left:10px"
                        @click="describe.isEdit=!describe.isEdit">修改
                </Button>
                <Button :disabled="!describe.isEdit"
                        type="success"
                        size="small"
                        style="margin-left:10px"
                        :loading="describe.loading"
                        @click="submitParams(describe)">确认
                </Button>
                <Button type="error"
                        size="small"
                        style="margin-left:10px"
                        @click="deleteParams(describe)">删除
                </Button>
              </div>
            </div>
          </div>

        </FormItem>
      </Form>
      <Spin size="large"
            fix
            v-if="spinShow"></Spin>
    </Modal>

  </div>
</template>

<script>
// mockData
import {
  processList, // 工序列表
  processSelectList, // 工序参数列表
  valueSelectList // 过程值下拉列表
} from "./mockData/process";
import {
  tabList, // 顶部tab列表
  sopList // sop列表 - select下拉
} from "./mockData/sop";
// function
import {
  getValueByKey, // 根据对象数组某个key的value，查询另一个key的value
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import {
  getAllEquipmentFunctype, // 获取顶部标签列表
  findAllItemParam, // 根据步骤，查询参数列表
  findSopByKey, // 根据步骤，查询sop列表（下拉框）
  findSopItemBySop, // 根据sopid，查询其工序列表
  getItemParamAddByItemId, // 根据工序id，查询其已选的参数列表
  editSopItemPlcAdd, // 根据工序id，更新过程值
  addItemParamPlcAdd, // 根据工序id和参数id，添加参数的 下限/上限/过程值
  editSopItemParamAdd, // 根据参数id，更新参数的 下限/上限/过程值
  removeSopItemParamAdd // 根据参数id，删除参数的 下限/上限/过程值
} from "@/api/process";

export default {
  data() {
    return {
      /* 全局 */
      tabList: [], // 顶部tab列表
      tabSelected: 1, // 顶部tab切换
      rowId: "", // 当前行的id
      /* 每页 */
      sopSelectList: [], // sop下拉框
      sopSelected: "", // 被选择的sop
      tableData: [], // table数据
      tableColumns: [
        {
          title: "工序",
          key: "description",
          // align: "center",
          minWidth: 100
        },
        {
          title: "地址",
          key: "plcResultAdd",
          // align: "center",
          minWidth: 120
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
      ], // table列
      /* loading */
      tableLoading: false, // table
      buttonLoading: false, //  button
      spinShow: false, //  form
      /* modal弹框 */
      modalShow: false, // 是否显示
      modalData: {}, // 数据
      resultValueShow: false, // 结果值 - 是否显示
      resultValueCanBeEdit: false, // 结果值 - 是否可编辑
      processSelectList: [], // 参数列表 - checkBox全部
      modalDataDescribe: [], // 参数列表 - checkBox已选择
      processTempList: [], // 参数列表 - 下拉框
      valueSelectList: valueSelectList, // 值列表 - 下拉框（结果值/上限/下限）
      describeParams: [], // 参数列表 - 底部list
      processSelected: "", // 被选中的参数
      processPlcAdd: "", // 新增的参数
      valueSelected: "" // 被选择的值（结果值/上限/下限）
    };
  },
  async created() {
    /* 1.顶部标签列表 */
    this.tabList = !this.isMock
      ? (await getAllEquipmentFunctype()).data.data
      : tabList;
    this.tabList.forEach(tab => {
      this.$set(tab, "id", tab.id.toString());
    });
    if (this.tabList.length !== 0) {
      /* 2.自动选择第一个标签 */
      this.tabSelected = this.tabList[0].id;
      this.tabSelect(this.tabSelected);
    }
  },
  methods: {
    // 顶部tab被选择
    async tabSelect(name) {
      this.tabSelected = name;
      this.tableLoading = true;
      // sop下拉框
      this.sopSelectList = !this.isMock
        ? (await findSopByKey(this.tabSelected)).data.data
        : sopList[this.tabSelected];
      // 默认选择第一个下拉框
      if (this.sopSelectList.length !== 0) {
        this.sopSearch(this.sopSelectList[0].id);
      } else {
        this.sopSelected = "";
        this.tableLoading = false;
      }
      // 工序参数列表
      this.processSelectList = !this.isMock
        ? (await findAllItemParam(this.tabSelected)).data.data
        : processSelectList[this.tabSelected];
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
        this.tableData = processList[this.tabSelected];
        this.tableLoading = false;
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // this.tableData = this.tableData;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalData = JSON.parse(JSON.stringify(row));
      // 过程值显示与否
      this.resultValueShow =
        this.modalData.plcResultAdd !== "" &&
        this.modalData.plcResultAdd !== null;
      // 渲染已选择的参数checkbox
      this.modalDataDescribe = [];
      this.modalData.params.forEach(item => {
        this.modalDataDescribe.push(parseInt(item.code));
      });
      // 根据已选择的参数，渲染参数select框
      this.describeOnChange(this.modalDataDescribe.sort());
      // 渲染参数list
      if (!this.isMock) {
        // 接口数据
        this.rowId = row.id;
        this.getDescribeParams();
      } else {
        // mock数据
        this.describeParams = this.modalData.describeParams;
      }
      this.modalShow = true;
    },
    // 根据工序id获取参数list（下限/上限/结果值）
    async getDescribeParams() {
      this.spinShow = true;
      this.describeParams = (await getItemParamAddByItemId(
        this.rowId
      )).data.data;
      // 为每行数据添加 isEdit 和 loading 属性
      this.describeParams.forEach(item => {
        this.$set(item, "isEdit", false);
        this.$set(item, "loading", false);
      });
      this.spinShow = false;
    },
    // 结果值 - 是否可见
    resultValueOnchange(value) {
      this.resultValueShow = value;
      // 关闭可见的同时，设置为"不可编辑"
      if (value === false) {
        this.resultValueCanBeEdit = false;
      }
    },
    // 结果值 - 提交
    async resultValueSubmit() {
      if (
        this.modalData.plcResultAdd !== "" &&
        this.modalData.plcResultAdd.substr(0, 2) !== "DB"
      ) {
        // 验证是否以"DB开头"
        this.$Message.error("结果值必须以'DB'开头");
      } else {
        if (!this.isMock) {
          // 接口数据
          this.buttonLoading = true;
          const data = {
            id: this.rowId,
            plCAdd: this.modalData.plcResultAdd
          };
          const result = await editSopItemPlcAdd(data);
          resultCallback(
            result.data.status,
            "修改成功！",
            () => {
              this.resultValueCanBeEdit = false;
              this.buttonLoading = false;
            },
            () => {
              this.buttonLoading = false;
            }
          );
        } else {
          // mock数据
          resultCallback(200, "修改成功！", () => {
            this.resultValueCanBeEdit = !this.resultValueCanBeEdit;
          });
        }
      }
    },
    // 参数被勾选 -> 渲染参数select框
    describeOnChange(value) {
      this.processTempList = [];
      this.modalDataDescribe = this.modalDataDescribe.sort();
      this.modalDataDescribe.forEach(i => {
        this.processTempList.push(this.processSelectList[i - 1]);
      });
    },
    // 参数值 - 添加（结果值/上限/下限）
    async addParams() {
      // 根据数组[{},{},{}...]中某个对象的key的value，查询该对象另一个key的value
      var processSelected = getValueByKey(
        this.processTempList,
        "id",
        this.processSelected,
        "description"
      );
      var valueSelected = this.valueSelected;
      if (this.processPlcAdd.substr(0, 2) !== "DB") {
        // 验证是否以"DB开头"
        this.$Message.error("过程值/上限/下限均必须以'DB'开头");
      } else if (
        // 验证是否添加过该组合
        this.describeParams.some(
          item =>
            item.paramDescription === processSelected &&
            item.plcType === valueSelected
        )
      ) {
        this.$Message.error("添加重复！");
      } else {
        // 验证通过 -> 放入describeParams数组
        if (!this.isMock) {
          // 接口数据
          this.buttonLoading = true;
          const data = {
            ItemId: this.rowId,
            ParamId: this.processSelected,
            PlcAdd: this.processPlcAdd,
            Type: valueSelected
          };
          const result = await addItemParamPlcAdd(data);
          resultCallback(
            result.data.status,
            "添加成功！",
            () => {
              this.getDescribeParams();
              // 清空2个select框和1个input框
              this.$refs.processSelect.clearSingleSelect();
              this.$refs.valueSelect.clearSingleSelect();
              this.processPlcAdd = "";
              this.buttonLoading = false;
            },
            () => {
              this.buttonLoading = false;
            }
          );
        } else {
          // mock数据
          resultCallback(200, "添加成功！", () => {
            this.describeParams.push({
              paramDescription: processSelected,
              plcType: valueSelected,
              plCAdd: this.processPlcAdd,
              isEdit: false
            });
            // 清空2个select框和1个input框
            this.$refs.processSelect.clearSingleSelect();
            this.$refs.valueSelect.clearSingleSelect();
            this.processPlcAdd = "";
          });
        }
      }
    },
    // 参数值 - 更新
    async submitParams(describe) {
      if (describe.plCAdd.substr(0, 2) !== "DB") {
        // 验证是否以"DB开头"
        this.$Message.error("过程值/上限/下限均必须以'DB'开头");
      } else {
        // 验证通过
        if (!this.isMock) {
          // 接口数据
          const data = {
            id: describe.id,
            plcAdd: describe.plCAdd
          };
          describe.loading = true;
          const result = await editSopItemParamAdd(data);
          resultCallback(
            result.data.status,
            "修改成功！",
            () => {
              describe.isEdit = !describe.isEdit;
              describe.loading = false;
            },
            () => {
              describe.loading = false;
            }
          );
        } else {
          // mock数据
          resultCallback(200, "修改成功！", () => {
            describe.isEdit = !describe.isEdit;
          });
        }
      }
    },
    // 参数值 - 删除
    deleteParams(describe) {
      this.$Modal.confirm({
        title: "确定删除？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeSopItemParamAdd(describe.id);
            resultCallback(result.data.status, "删除成功！", () => {
              this.getDescribeParams();
            });
          } else {
            // mock数据
            resultCallback(200, "删除成功！", () => {
              this.describeParams.forEach((item, i) => {
                if (item.id === describe.id) {
                  this.describeParams.splice(i, 1);
                }
              });
            });
          }
        },
        closable: true
      });
    },
    // 表单显示状态发生变化
    handleVisibleChange(visible) {
      if (visible === false) {
        // 过程值恢复"不可编辑"
        this.resultValueCanBeEdit = false;
        // 参数列表恢复"不可编辑"
        this.describeParams.forEach(item => {
          this.$set(item, "isEdit", false);
        });
        // 重置table
        this.getData();
      }
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
.v-transfer-dom /deep/ {
  .ivu-modal {
    .describe-params {
      margin: 10px 0;
      &-title > span {
        display: inline-block;
        width: 100px;
        margin-right: 10px;
        text-align: center;
        font-size: 15px;
        font-weight: bold;
      }
      &-content {
        & > span {
          display: inline-block;
          width: 100px;
          margin-right: 10px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
