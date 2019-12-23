<template>
  <div class="dooya-container">
    <Card>
      <Tabs :value="tabList[0].value"
            @on-click="tabSelect">
        <TabPane v-for="tab in tabList"
                 :key="tab.value"
                 :label="tab.label"
                 :name="tab.value">

          <!-- 操作 -->
          <div style="margin: 10px 0">
            <Cascader :data="mNumberList"
                      v-model="mNumberSelect"
                      trigger="hover"
                      :clearable="false"
                      style="width:180px;margin-right: 10px;display:inline-block"
                      @on-change="selectOnChange">
              <Spin fix
                    v-if="cascaderLoading"></Spin>
            </Cascader>
            <Button type="success"
                    icon="md-add"
                    style="margin-right: 10px"
                    :disabled="buttonDisabled"
                    @click="insert">新增标准</Button>
            <Button type="error"
                    icon="md-close"
                    style="margin-right: 10px"
                    :disabled="buttonDisabled"
                    @click="removeStandard">删除标准</Button>
          </div>

          <!-- 表格 -->
          <Table border
                 disabled-hover
                 :data="tableData"
                 :columns="tableColumns"
                 :loading="tableLoading"
                 no-data-text="暂无标准，请新增"
                 stripe>
          </Table>

        </TabPane>
      </Tabs>

      <!-- Modal -->
      <Modal v-model="modalVisible"
             title="请选择sop并填写产品型号"
             footer-hide>
        <Form :model="standardForm"
              :label-width="100"
              ref="standardForm"
              :rules="standardRule"
              @submit.native.prevent>
          <FormItem label="配方名称"
                    prop="tagCode">
            <Input v-model.trim="standardForm.tagCode"
                   type="number"
                   placeholder="0-9999的整数"></Input>
          </FormItem>
          <FormItem label="配方说明"
                    prop="tag">
            <Input v-model.trim="standardForm.tag"
                   placeholder="请输入"></Input>
          </FormItem>
          <FormItem label="所属SOP"
                    prop="sopId">
            <Select v-if="tabSelected===1"
                    v-model="standardForm.sopId"
                    placeholder="请选择">
              <Option v-for="(item,i) in qc1List"
                      :value="item.id.toString()"
                      :key="i">{{ item.sop }}</Option>
            </Select>
            <Select v-else
                    v-model="standardForm.sopId"
                    placeholder="请选择">
              <Option v-for="(item,i) in qc2List"
                      :value="item.id.toString()"
                      :key="i">{{ item.sop }}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="insertStandard">确定</Button>
            <Button style="margin-left: 8px"
                    @click="modalVisible=false">取消</Button>
          </FormItem>
        </Form>
      </Modal>

    </Card>
  </div>
</template>

<script>
// mockData
import {
  tabList, // 顶部tab列表
  sopList // sop列表
} from "./mockData/sop";
import {
  mNumberList, // 标准标签列表
  standardList // 标准项列表
} from "./mockData/checkStandard";
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback, // 根据请求的status执行回调函数
  getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
// api
import {
  findSopTagsByQcIndex, // 获取标准标签列表 - cascader选择
  findBySopTag, // 获取标准项列表 - table
  addStandardValues, // 新增标准
  editStandardValues, // 更新标准
  removeTag // 删除标准
} from "@/api/standard";
import { getSopByQcIndex } from "@/api/process"; // 获取sop下拉框 - select选择

export default {
  name: "check-standard",
  data() {
    return {
      /* 全局 */
      tabList: tabList, // 顶部tab列表
      tabSelected: 1, // 顶部tab切换
      qc1List: [], // sop1下拉框
      qc2List: [], // sop2下拉框
      /* 每页 */
      mNumberList: [], // 级联选择 - 数据list
      mNumberSelect: [], // 级联选择 - 被选择的项
      tableData: [], // 表格数据
      tableColumns: [
        {
          title: "描述",
          key: "itemName",
          align: "center",
          minWidth: 120
        },
        {
          title: "项目",
          key: "paramName",
          align: "center",
          minWidth: 120
        },
        {
          title: "上限/下限",
          key: "type",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.type === 1 ? "下限" : "上限");
          },
          minWidth: 120
        },
        {
          title: "值",
          key: "value",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {
                  style: {
                    display: params.row.edit === false ? "inline-block" : "none"
                  }
                },
                params.row.value
              ),
              h("Input", {
                props: {
                  value: params.row.value,
                  type: "number"
                },
                style: {
                  display: params.row.edit === true ? "inline-block" : "none",
                  width: "50%",
                  marginRight: "5px"
                },
                nativeOn: {
                  keyup: event => {
                    var inputValue = event.srcElement.value;
                    inputValue = inputValue.toString();
                    // 最多保留2位小数
                    var pointIndex = inputValue.indexOf(".");
                    if (pointIndex > 0 && inputValue.length - pointIndex > 3) {
                      event.srcElement.value = inputValue =
                        inputValue.split(".")[0] +
                        "." +
                        inputValue.split(".")[1].slice(0, 2);
                    }
                    // 最多保留5位整数
                    if (pointIndex > 5) {
                      event.srcElement.value = inputValue =
                        inputValue.split(".")[0].slice(0, 5) +
                        "." +
                        inputValue.split(".")[1].slice(0, 2);
                    } else if (pointIndex === -1 && inputValue.length > 5) {
                      event.srcElement.value = inputValue = inputValue.slice(
                        0,
                        5
                      );
                    }
                    // 更新表格数据
                    this.$set(
                      this.tableData[params.row._index],
                      "value",
                      inputValue
                    );
                    // 对表格作了更新 -> 还原 edit 的 true 或 false
                    this.$set(
                      this.tableData[params.row._index],
                      "edit",
                      params.row.edit
                    );
                  },
                  keypress: event => {
                    // 禁止输入e和E
                    if (event.key === "e" || event.key === "E") {
                      event.preventDefault();
                    }
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "success",
                  size: "small",
                  icon: "md-checkmark"
                },
                style: {
                  display: params.row.edit === true ? "inline-block" : "none",
                  marginRight: "5px"
                },
                on: {
                  click: async () => {
                    if (!this.isMock) {
                      // 接口数据
                      const data = {
                        id: this.tableData[params.row._index].id,
                        value: this.tableData[params.row._index].value
                      };
                      const result = await editStandardValues(data);
                      resultCallback(result.data.status, "修改成功！", () => {
                        // 对表格作了更新 -> 还原 edit 的 true 或 false
                        this.$set(
                          this.tableData[params.row._index],
                          "edit",
                          false
                        );
                      });
                    } else {
                      // mock数据
                      resultCallback(200, "修改成功！", () => {
                        // 对表格作了更新 -> 还原 edit 的 true 或 false
                        this.$set(
                          this.tableData[params.row._index],
                          "edit",
                          false
                        );
                      });
                    }
                  }
                }
              }),
              h("Button", {
                props: {
                  type: "warning",
                  size: "small",
                  icon: "md-close"
                },
                style: {
                  display: params.row.edit === true ? "inline-block" : "none"
                },
                on: {
                  click: () => {
                    // 对表格作了更新 -> 还原 edit 的 true 或 false
                    this.$set(this.tableData[params.row._index], "edit", false);
                  }
                }
              })
            ]);
          },
          minWidth: 180
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
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
                        this.$set(
                          this.tableData[params.row._index],
                          "edit",
                          true
                        );
                      }
                    }
                  })
                ]
              )
            ]);
          },
          align: "center"
        }
      ], // 表格列项
      /* loading */
      cascaderLoading: false, // cascader
      buttonDisabled: false, // button
      tableLoading: false, // table
      /* modal弹框 */
      modalVisible: false, // 是否显示
      standardForm: {
        tagCode: "",
        tag: "",
        sopId: ""
      }, // 表单数据
      standardRule: {
        tagCode: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入配方名称"));
              } else if (value > 9999 || value < 0 || value.indexOf(".") > -1) {
                callback(new Error("请输入0-9999的整数"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        tag: [
          { required: true, message: "请输入配方说明", trigger: "change" },
          { type: "string", max: 30, message: "说明过长", trigger: "change" }
        ],
        sopId: [{ required: true, message: "请选择SOP", trigger: "change" }]
      } // 表单规则
    };
  },
  async created() {
    // 初始化级联选择器
    await this.initCascader();
    // 根据级联选择初始化表格
    this.getData();
    // sop1和sop2列表
    this.qc1List = !this.isMock
      ? (await getSopByQcIndex("1")).data.data
      : sopList["1"];
    this.qc2List = !this.isMock
      ? (await getSopByQcIndex("2")).data.data
      : sopList["2"];
  },
  methods: {
    // 顶部tab被选择
    async tabSelect(name) {
      this.tabSelected = name === "qc1" ? 1 : 2;
      await this.initCascader();
      this.getData();
    },
    // 渲染级联选择器
    async initCascader() {
      if (!this.isMock) {
        /* 接口数据 */
        this.cascaderLoading = true;
        this.buttonDisabled = true;
        this.tableLoading = true;
        this.mNumberList =
          (await findSopTagsByQcIndex(this.tabSelected)).data.data || [];
        this.cascaderLoading = false;
      } else {
        /* mock数据 */
        this.mNumberList = mNumberList[this.tabSelected];
        // 如果型号被删除 -> 该SOP也在级联表里删除
        this.mNumberList.forEach((item, i) => {
          if (item.children.length === 0) {
            this.mNumberList.splice(i, 1);
          }
        });
        // 按"SOP名称"和"产品型号"升序
        this.mNumberList.sort(arraySort("label", "asc"));
        this.mNumberList.forEach(sop => {
          sop.children.sort(arraySort("label", "asc"));
        });
      }
      // 自动选择第一项
      this.mNumberSelect =
        this.mNumberList.length !== 0
          ? [this.mNumberList[0].value, this.mNumberList[0].children[0].value]
          : [];
    },
    // 根据选择渲染数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.tableData =
          this.mNumberSelect.length !== 0
            ? (await findBySopTag(this.mNumberSelect[1])).data.data
            : [];
        this.tableLoading = false;
        this.buttonDisabled = false;
      } else {
        // mock数据
        this.tableData = standardList[this.tabSelected];
      }
      /* eslint-disable */
      // 每行添加 edit 数据，默认为false
      this.tableData =
        this.tableData.length !== 0
          ? this.tableData.map(row => {
              this.$set(row, "edit", false);
              return row;
            })
          : this.tableData;
    },
    // 级联选择器 - 选项发生变化
    selectOnChange(value) {
      this.mNumberSelect = value;
      this.getData();
    },
    // 按钮 - 弹出新增标准modal
    insert() {
      this.modalVisible = true;
      this.$refs["standardForm"].resetFields();
    },
    // 按钮 - 新增标准
    insertStandard() {
      // console.log(this.standardForm);
      // console.log(this.mNumberList);
      this.$refs["standardForm"].validate(async valid => {
        if (valid) {
          // 判断：该标准是否已存在
          if (
            this.mNumberList.some(sop => {
              return (
                sop.value === this.standardForm.sopId &&
                sop.children.some(
                  number => number.label === this.standardForm.tag
                )
              );
            })
          ) {
            this.$Message.error("该型号的标准已存在！");
          } else {
            if (!this.isMock) {
              // 接口数据
              this.standardForm.qcIndex = this.tabSelected;
              this.standardForm.tagCode = parseInt(this.standardForm.tagCode);
              const result = await addStandardValues(this.standardForm);
              resultCallback(result.data.status, "新增成功！", async () => {
                // 重新获取电机型号list
                this.mNumberList = this.isMock
                  ? mNumberList
                  : (await findSopTagsByQcIndex(this.tabSelected)).data.data;
                // 被选择的选项 -> 即新增的标准
                if (result.data.data.length !== 0) {
                  // 新增的标准添加过过程参数 -> 从结果里取tagId
                  const tagId = result.data.data[0].tagId;
                  this.mNumberSelect = [this.standardForm.sopId, tagId];
                  this.getData();
                  this.modalVisible = false;
                } else {
                  // 新增的标准未添加过过程参数 -> 从mNumberList里判断后取id
                  this.mNumberList.forEach(item => {
                    if (item.value === this.standardForm.sopId) {
                      item.children.forEach(standard => {
                        if (standard.label === this.standardForm.tag) {
                          this.mNumberSelect = [
                            this.standardForm.sopId,
                            standard.value
                          ];
                          this.getData();
                          this.modalVisible = false;
                        }
                      });
                    }
                  });
                }
              });
            } else {
              // mock数据
              // 随机生成产品型号id
              var tagId = Math.random()
                .toString(36)
                .substr(-10);
              if (
                this.mNumberList.some(
                  sop => sop.value === this.standardForm.sopId
                )
              ) {
                /* 情况一：SOP非新增，型号为新增 */
                this.mNumberList.forEach(item => {
                  if (item.value === this.standardForm.sopId) {
                    // 添加数据
                    item.children.push({
                      children: null,
                      label: this.standardForm.tag,
                      value: tagId
                    });
                    resultCallback(200, "新增成功！", async () => {
                      await this.initCascader();
                      // 被选择的选项 -> 即新增的标准
                      this.mNumberSelect = [this.standardForm.sopId, tagId];
                      this.getData();
                      this.modalVisible = false;
                    });
                  }
                });
              } else {
                /* 情况二：SOP和型号均为新增 */
                // 根据sopId获取label
                var label = getValueByKey(
                  this.tabSelected === 1 ? this.qc1List : this.qc2List,
                  "id",
                  this.standardForm.sopId,
                  "sop"
                );
                // 添加数据
                this.mNumberList.push({
                  label: label,
                  value: this.standardForm.sopId,
                  children: [
                    {
                      children: null,
                      label: this.standardForm.tag,
                      value: tagId
                    }
                  ]
                });
                resultCallback(200, "新增成功！", async () => {
                  await this.initCascader();
                  // 被选择的选项 -> 即新增的标准
                  this.mNumberSelect = [this.standardForm.sopId, tagId];
                  this.getData();
                  this.modalVisible = false;
                });
              }
            }
          }
        }
      });
    },
    // 按钮 - 删除标准
    async removeStandard() {
      this.$Modal.confirm({
        title: "确定删除该标准？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeTag(this.mNumberSelect[1]);
            resultCallback(result.data.status, "删除成功！", async () => {
              await this.initCascader();
              this.getData();
            });
          } else {
            // mock数据
            this.mNumberList.forEach(item => {
              if (item.value === this.mNumberSelect[0]) {
                item.children.forEach(async (standard, i) => {
                  if (standard.value === this.mNumberSelect[1]) {
                    resultCallback(200, "删除成功！", async () => {
                      item.children.splice(i, 1);
                      await this.initCascader();
                      this.getData();
                    });
                  }
                });
              }
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
  .ivu-card-body {
    .ivu-table {
      max-height: calc(100vh - 260px);
      overflow-x: auto;
      overflow-y: auto;
      overflow: overlay;
      // 去掉input框右侧的上下箭头
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      input[type="number"] {
        -moz-appearance: textfield;
      }
    }
  }
}
</style>
