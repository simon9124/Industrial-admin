 <template>
  <div>

    <!-- Modal - 整体数据-->
    <Modal v-model="paramModalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           width="80%"
           title="配置参数">

      <!-- 操作 - 新增 -->
      <div style="margin:0 0 20px 0">
        <Button type="success"
                icon="md-add"
                style="margin-right: 10px"
                @click="insert">新增参数</Button>
      </div>

      <!-- table - 配置信息 -->
      <Table border
             disabled-hover
             :loading="tableLoading"
             :data="tableData"
             :columns="tableColumns"
             no-data-text="未配置参数"
             stripe>
      </Table>

      <!-- 操作 - 保存/取消 -->
      <div style="margin:20px 0 10px 0">
        <Button type="primary"
                @click="submitParamlist"
                :loading="buttonLoading">确定</Button>
        <Button type="warning"
                style="margin-left: 8px"
                @click="paramModalShow=false">取消</Button>
      </div>
    </Modal>

    <!-- Modal - 新增/编辑参数 -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           :title="modalType==='edit'?'编辑参数':'新增参数'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="modalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="参数名"
                  prop="name">
          <Input type="text"
                 v-model.trim="modalData.name"
                 placeholder="请输入参数名"></Input>
        </FormItem>
        <FormItem label="显示名"
                  prop="title">
          <Input type="text"
                 v-model.trim="modalData.title"
                 placeholder="请输入显示名"></Input>
        </FormItem>
        <FormItem label="数据类型"
                  prop="dataType">
          <Select v-model="modalData.dataType"
                  placeholder="请选择">
            <Option v-for="(item,i) in dataTypeList"
                    :value="item"
                    :key="i">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="显示元素"
                  prop="elementType">
          <Select v-model="modalData.elementType"
                  placeholder="请选择"
                  @on-change="elementTypeOnChange">
            <Option v-for="(item,i) in elementTypeList"
                    :value="item"
                    :key="i">{{ item }}</Option>
          </Select>
        </FormItem>
        <FormItem label="操作符"
                  prop="op">
          <Select v-model="modalData.op"
                  placeholder="请选择">
            <Option v-for="(item,i) in operatorList"
                    :value="item.opKey.toString()"
                    :key="i"
                    :disabled="(modalData.dataType==='text' && ['2','3','4','5'].indexOf(item.opKey)>-1)
                            || (modalData.dataType!=='text' && item.opKey==='6')">
              {{ item.opLabel }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="数据源key"
                  prop="labelName"
                  v-show="modalData.elementType==='下拉单选'
                      ||modalData.elementType==='下拉多选'">
          <Input type="text"
                 v-model.trim="modalData.labelName"
                 placeholder="请输入参数名"
                 @on-change="labelNameOnChange"></Input>
        </FormItem>
        <FormItem label="数据源value"
                  prop="valueName"
                  v-show="modalData.elementType==='下拉单选'
                      ||modalData.elementType==='下拉多选'">
          <Input type="text"
                 v-model.trim="modalData.valueName"
                 placeholder="请输入参数名"
                 @on-change="valueNameOnChange"></Input>
        </FormItem>
        <FormItem label="可选值"
                  prop="data"
                  v-show="modalData.elementType==='下拉单选'
                      ||modalData.elementType==='下拉多选'">
          <Tag v-for="(item,i) in modalData.data"
               v-if="JSON.stringify(modalData.data).indexOf(modalData.valueName)>-1"
               :key="i"
               type="border"
               color="primary"
               closable
               checkable
               :fade="false"
               @on-change="optionalOnChange(i)"
               @on-close="deleteOptional(i)">{{item[modalData.valueName]}}</Tag>
          <Button size="small"
                  icon="md-add"
                  type="primary"
                  :disabled="modalData.labelName===''||modalData.valueName===''"
                  @click="addOptional"></Button>
        </FormItem>
        <FormItem label="默认值"
                  prop="defaultData">
          <Input type="text"
                 v-show="modalData.elementType!=='下拉单选'&&modalData.elementType!=='下拉多选'"
                 v-model.trim="modalData.defaultData"
                 placeholder="请输入默认值，30字以内"></Input>
          <Select v-model="modalData.defaultData"
                  v-show="modalData.elementType==='下拉单选'||modalData.elementType==='下拉多选'"
                  placeholder="请选择">
            <Option v-for="(item,i) in modalData.data"
                    :value="item[modalData.labelName]"
                    :key="i">{{ item[modalData.valueName] }}</Option>
          </Select>
        </FormItem>
        <FormItem label="备注"
                  prop="discription">
          <Input type="text"
                 v-model.trim="modalData.discription"
                 placeholder="请输入备注，30字以内"></Input>
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

    <!-- Modal - 可选值 -->
    <Modal v-model="modalShowOptional"
           :mask-closable="false"
           :closable="false"
           footer-hide
           :title="modalTypeOptional==='edit'?'编辑可选值':'新增可选值'"
           @on-ok="handleSubmitOptional">
      <Form ref="formModalDataOptional"
            :model="modalDataOptional"
            :rules="modalRuleOptional"
            :label-width="80"
            @submit.native.prevent>
        <FormItem label="key"
                  prop="key">
          <Input type="text"
                 v-model.trim="modalDataOptional.key"
                 placeholder="请输入key"></Input>
        </FormItem>
        <FormItem label="value"
                  prop="value">
          <Input type="text"
                 v-model.trim="modalDataOptional.value"
                 placeholder="请输入value"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmitOptional('formModalDataOptional')"
                  :loading="buttonLoadingOptional">确定</Button>
          <Button @click="modalShowOptional=false"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
// mockData
import {
  dataTypeList, // 数据类型列表
  elementTypeList, // 显示元素列表
  operatorList // 参数操作符列表
} from "./mould";
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import {
  getReortConditionInfo, // 根据id获取参数信息
  addOrEditReportConditionInfo // 更新参数信息
} from "@/api/mould";

export default {
  name: "param-setting",
  data() {
    return {
      /*  全局 */
      rowId: "", // 当前行的id
      paramModalShow: false, // 参数列表整体显示与否
      dataTypeList: dataTypeList, // 数据类型列表
      elementTypeList: elementTypeList, // 显示元素列表
      operatorList: operatorList, // 参数操作符列表
      tableData: [], // table数据
      tableColumns: [
        {
          title: "参数名",
          key: "name",
          align: "center",
          minWidth: 100
        },
        {
          title: "显示名",
          key: "title",
          align: "center",
          minWidth: 100
        },
        {
          title: "数据类型",
          key: "dataType",
          align: "center",
          minWidth: 100
        },
        {
          title: "显示元素",
          key: "elementType",
          align: "center",
          minWidth: 100
        },
        {
          title: "可选值",
          key: "data",
          // align: "center",
          render: (h, params) => {
            if (!this.isMock) {
              if (params.row.data === "") {
              } else {
                return h("div", [
                  JSON.parse(params.row.data).map(item => {
                    return h(
                      "Tag",
                      {
                        props: {
                          color: "blue"
                        }
                      },
                      item[params.row.valueName]
                    );
                  })
                ]);
              }
            } else {
              return h("div", [
                params.row.data.map(item => {
                  return h(
                    "Tag",
                    {
                      props: {
                        color: "blue"
                      }
                    },
                    item[params.row.valueName]
                  );
                })
              ]);
            }
          },
          minWidth: 300
        },
        {
          title: "默认值",
          key: "defaultData",
          align: "center",
          minWidth: 100
        },
        {
          title: "备注",
          key: "discription",
          align: "center",
          minWidth: 100
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 120,
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
      ], // table表头- 配置信息
      /* loading */
      tableLoading: false,
      buttonLoading: false,
      buttonLoadingOptional: false,
      /* modal - 编辑参数 */
      modalShow: false, // 是否显示
      modalType: "", // 类型：insert/edit
      modalData: {
        name: "", // 查询条件系统名
        title: "", // 查询条件展现名
        dataType: "", // 数据类型
        elementType: "", // 显示元素
        op: "", // 参数操作符
        data: [], // 可选值
        labelName: "", // 数据源key
        valueName: "", // 数据源value
        defaultData: "", // 默认值
        discription: "" // 备注
      }, // 数据 - 获取或提交
      modalDataOrg: {}, // 原始数据
      modalRule: {
        name: [
          {
            required: true,
            message: "请输入参数名",
            trigger: "change"
          },
          { type: "string", max: 15, message: "参数名过长", trigger: "change" }
        ],
        title: [
          {
            required: true,
            message: "请输入显示名",
            trigger: "blur"
          },
          { type: "string", max: 15, message: "显示名过长", trigger: "change" }
        ],
        dataType: [
          {
            required: true,
            message: "请选择数据类型",
            trigger: "change"
          }
        ],
        elementType: [
          {
            required: true,
            message: "请选择显示元素",
            trigger: "change"
          }
        ],
        op: [
          {
            required: true,
            message: "请选择参数操作符",
            trigger: "change"
          }
        ],
        labelName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== undefined && value !== null) {
                if (value === "") {
                  callback(new Error("请输入数据源key"));
                } else if (value.length > 20) {
                  callback(new Error("数据源key过长"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        valueName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value !== undefined && value !== null) {
                if (value === "") {
                  callback(new Error("请输入数据源value"));
                } else if (value.length > 20) {
                  callback(new Error("数据源数据源value"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        data: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (
                this.modalData.labelName !== undefined &&
                this.modalData.labelName !== null
              ) {
                if (value.length === 0) {
                  callback(new Error("请添加可选值"));
                } else {
                  callback();
                }
              } else {
                callback();
              }
            },
            trigger: "blur"
          }
        ],
        discription: [
          {
            type: "string",
            max: 30,
            message: "备注过长",
            trigger: "change"
          }
        ]
      }, // form规则
      /* modal - 编辑可选值 */
      modalShowOptional: false, // 是否显示
      modalTypeOptional: "", // 类型：insert/edit
      modalDataOptional: {
        key: "",
        value: ""
      }, // 数据 - 获取或提交
      modalDataOptionalOrg: {}, // 原始数据
      modalRuleOptional: {
        key: [
          {
            required: true,
            validator: (rule, value, callback) => {
              // console.log(this.modalDataOptional);
              if (
                this.modalDataOptional.key === "" ||
                this.modalDataOptional.key === undefined
              ) {
                callback(new Error("请输入key"));
              } else if (this.modalDataOptional.key.length > 10) {
                callback(new Error("key过长"));
              } else {
                callback();
              }
            },
            trigger: "blur,change"
          }
        ],
        value: [
          {
            required: true,
            validator: (rule, value, callback) => {
              // console.log(this.modalDataOptional);
              if (
                this.modalDataOptional.value === "" ||
                this.modalDataOptional.value === undefined
              ) {
                callback(new Error("请输入value"));
              } else if (this.modalDataOptional.value.length > 10) {
                callback(new Error("value过长"));
              } else {
                callback();
              }
            },
            trigger: "blur,change"
          }
        ]
      } // form规则
    };
  },
  methods: {
    // 显示配置参数弹框
    showModal(param) {
      console.log(param);
      this.getData(param);
      this.paramModalShow = true;
    },
    // 数据初始化
    async getData(param) {
      this.rowId = param.id;
      if (!this.isMock) {
        /* 接口数据 */
        this.tableLoading = true;
        this.tableData =
          JSON.parse(
            (await getReortConditionInfo(param.id)).data.data.condition
          ) || [];
        this.tableLoading = false;
      } else {
        /* mock数据 */
        this.tableData = param.paramList;
        this.refreshData();
      }
    },
    // 根据条件刷新配置信息数据
    refreshData() {
      // 按name升序
      this.tableData.sort(arraySort("name", "asc"));
    },
    // 新增参数
    insert() {
      this.modalType = "insert";
      this.$refs.formModalData.resetFields();
      this.modalDataOrg = JSON.parse(JSON.stringify(this.modalData));
      this.modalShow = true;
    },
    // 编辑参数
    async edit(row) {
      this.modalType = "edit";
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalData.op = this.modalData.op.toString() || "";
      /* eslint-disable */
      if (this.modalData.data.indexOf('"') > -1) {
        this.modalData.data = JSON.parse(this.modalData.data);
      }
      this.modalDataOrg = JSON.parse(JSON.stringify(this.modalData));
      this.modalShow = true;
    },
    // 删除参数
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该参数？",
        onOk: async () => {
          // if (!this.isMock) {
          // 接口数据
          // const result = await removeLineWorkStation(row.id);
          // resultCallback(result.data.status, "删除成功！", () => {
          //   this.getData();
          // });
          // } else {
          this.tableData.forEach((list, i) => {
            if (row.name === list.name) {
              this.tableData.splice(i, 1);
            }
          });
          resultCallback(200, "删除成功！", () => {
            this.refreshData();
          });
          // }
        },
        closable: true
      });
    },
    // Modal弹框 - 显示元素选项发生变化
    elementTypeOnChange(value) {
      if (value === "下拉单选" || value === "下拉多选") {
        this.$set(this.modalData, "labelName", "");
        this.$set(this.modalData, "valueName", "");
        this.$set(this.modalData, "data", []);
      } else {
        this.$delete(this.modalData, "labelName");
        this.$delete(this.modalData, "valueName");
        this.$set(this.modalData, "data", "");
      }
    },
    // modal弹框 - 数据源key发生改变
    labelNameOnChange(event) {
      // console.log(this.modalDataOrg.labelName);
      this.modalData.data.forEach(item => {
        // 1.用modalDataOrg里的key设置过来
        this.$set(item, event.target.value, item[this.modalDataOrg.labelName]);
        // 2.删掉原来的key
        this.$delete(item, this.modalDataOrg.labelName);
      });
      // 3.更新modalDataOrg里的key
      this.modalDataOrg.labelName = event.target.value;
      // console.log(this.modalData.data);
      // console.log(this.modalDataOrg);
    },
    // modal弹框 - 数据源value发生改变
    valueNameOnChange(event) {
      // console.log(this.modalDataOrg.valueName);
      this.modalData.data.forEach(item => {
        // 1.用modalDataOrg里的key设置过来
        this.$set(item, event.target.value, item[this.modalDataOrg.valueName]);
        // 2.删掉原来的key
        this.$delete(item, this.modalDataOrg.valueName);
      });
      // 3.更新modalDataOrg里的key
      this.modalDataOrg.valueName = event.target.value;
      // console.log(this.modalData.data);
      // console.log(this.modalDataOrg);
    },
    // modal弹框 - 添加可选值
    addOptional() {
      this.modalTypeOptional = "insert";
      this.$refs.formModalDataOptional.resetFields();
      this.modalDataOptional[this.modalData.labelName] = "";
      this.modalDataOptional[this.modalData.valueName] = "";
      // console.log(this.modalDataOptional);
      this.modalShowOptional = true;
    },
    // modal弹框 - 切换选中的可选值 - 编辑可选值
    optionalOnChange(index) {
      this.modalTypeOptional = "edit";
      this.modalDataOptional = JSON.parse(
        JSON.stringify(this.modalData.data[index])
      );
      /* eslint-disable */
      this.modalDataOptional.key = this.modalDataOptional[
        this.modalData.labelName
      ];
      this.modalDataOptional.value = this.modalDataOptional[
        this.modalData.valueName
      ];
      // console.log(this.modalDataOptional);
      this.modalDataOptionalOrg = JSON.parse(
        JSON.stringify(this.modalDataOptional)
      );
      this.modalShowOptional = true;
    },
    // modal弹框 - 删除可选值
    deleteOptional(i) {
      this.modalData.data.splice(i, 1);
      // this.$refs.formModalDataOptional.validate();
    },
    // 可选值表单提交
    handleSubmitOptional() {
      this.$refs.formModalDataOptional.validate(valid => {
        if (valid) {
          // this.buttonLoadingOptional = true;
          this.$set(
            this.modalDataOptional,
            this.modalData.valueName,
            this.modalDataOptional.value
          );
          switch (this.modalTypeOptional) {
            case "insert":
              if (
                this.modalData.data.some(
                  item =>
                    item[this.modalData.labelName].toString() ===
                    this.modalDataOptional.key
                )
              ) {
                // key去重
                this.$Message.error("该key已存在！");
                this.buttonLoadingOptional = false;
              } else if (
                this.modalData.data.some(
                  item =>
                    item[this.modalData.valueName] ===
                    this.modalDataOptional.value
                )
              ) {
                // value去重
                this.$Message.error("该value已存在！");
                this.buttonLoadingOptional = false;
              } else {
                // 更新key
                this.$set(
                  this.modalDataOptional,
                  this.modalData.labelName,
                  this.modalDataOptional.key
                );
                // 塞入数据
                this.modalData.data.push(
                  JSON.parse(JSON.stringify(this.modalDataOptional))
                );
                // 排序
                this.modalData.data.sort(
                  arraySort(this.modalData.labelName, "asc")
                );
                // 请求回调
                resultCallback(200, "添加成功！", () => {
                  this.buttonLoadingOptional = false;
                  this.modalShowOptional = false;
                });
              }
              break;
            case "edit":
              if (
                this.modalData.data.some(
                  item =>
                    item[this.modalData.labelName].toString() ===
                    this.modalDataOptional.key
                ) &&
                this.modalDataOptional.key !==
                  this.modalDataOptionalOrg[this.modalData.labelName].toString()
              ) {
                // key去重
                this.$Message.error("该key已存在！");
                this.buttonLoadingOptional = false;
              } else if (
                this.modalData.data.some(
                  item =>
                    item[this.modalData.valueName] ===
                    this.modalDataOptional.value
                ) &&
                this.modalDataOptional.value !==
                  this.modalDataOptionalOrg[this.modalData.valueName]
              ) {
                // value去重
                this.$Message.error("该value已存在！");
                this.buttonLoadingOptional = false;
              } else {
                this.modalData.data.forEach(item => {
                  // console.log(item);
                  if (
                    item[this.modalData.labelName] ===
                    this.modalDataOptional[this.modalData.labelName]
                  ) {
                    // 更新key
                    this.$set(
                      this.modalDataOptional,
                      this.modalData.labelName,
                      this.modalDataOptional.key
                    );
                    this.$set(
                      item,
                      this.modalData.labelName,
                      this.modalDataOptional[this.modalData.labelName]
                    );
                    // 更新value
                    this.$set(
                      item,
                      this.modalData.valueName,
                      this.modalDataOptional[this.modalData.valueName]
                    );
                  }
                });
                // 排序
                this.modalData.data.sort(
                  arraySort(this.modalData.labelName, "asc")
                );
                // 请求回调
                resultCallback(200, "修改成功！", () => {
                  this.buttonLoadingOptional = false;
                  this.modalShowOptional = false;
                });
              }
              break;
          }
        }
      });
    },
    // 参数总表单提交
    handleSubmit() {
      console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          switch (this.modalType) {
            case "insert":
              if (
                this.tableData.some(item => item.name === this.modalData.name)
              ) {
                this.$Message.error("该参数已存在！");
                this.buttonLoading = false;
              } else {
                const modalDataSubmit = JSON.parse(
                  JSON.stringify(this.modalData)
                );
                if (!this.isMock)
                  // 非mock数据时需进行格式转换
                  modalDataSubmit.data =
                    typeof modalDataSubmit.data !== "string"
                      ? JSON.stringify(modalDataSubmit.data)
                      : modalDataSubmit.data;
                this.tableData.push(modalDataSubmit);
                resultCallback(200, "添加成功！", () => {
                  this.refreshData();
                  this.buttonLoading = false;
                  this.modalShow = false;
                });
              }
              break;
            case "edit":
              // 判断重复
              if (
                this.tableData.some(
                  item => item.name === this.modalData.name
                ) &&
                this.modalData.name !== this.modalDataOrg.name
              ) {
                this.$Message.error("该参数已存在！");
                this.buttonLoading = false;
              } else {
                const modalDataSubmit = JSON.parse(
                  JSON.stringify(this.modalData)
                );
                if (!this.isMock)
                  // 非mock数据时需进行格式转换
                  modalDataSubmit.data =
                    typeof modalDataSubmit.data !== "string"
                      ? JSON.stringify(modalDataSubmit.data)
                      : modalDataSubmit.data;
                // console.log(modalDataSubmit);
                this.$set(
                  this.tableData,
                  this.modalData._index,
                  modalDataSubmit
                );
                resultCallback(200, "修改成功！", () => {
                  this.refreshData();
                  this.buttonLoading = false;
                  this.modalShow = false;
                });
              }
              break;
          }
        }
      });
    },
    // 提交参数列表
    async submitParamlist() {
      // console.log(this.tableData);
      if (!this.isMock) {
        /* 接口数据 */
        this.buttonLoading = true;
        const result = (
          await addOrEditReportConditionInfo({
            id: this.rowId,
            condition: this.tableData
          })
        ).data.status;
        resultCallback(
          result,
          "配置成功！",
          () => {
            this.paramModalShow = false;
            this.buttonLoading = false;
          },
          () => {
            this.buttonLoading = false;
          }
        );
      } else {
        this.$emit("submitParamlist", {
          id: this.rowId,
          data: this.tableData
        });
        this.paramModalShow = false;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.v-transfer-dom /deep/ {
}
</style>
