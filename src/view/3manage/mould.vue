 <template>
  <div class="dooya-container">
    <Card>

      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                style="margin-right: 10px"
                @click="insertScreenItem">新增参数</Button>
      </div>

      <!-- table - 配置信息 -->
      <Table border
             disabled-hover
             :loading="tableLoading"
             :data="paramList"
             :columns="conditionColumns"
             stripe>
      </Table>

      <!-- Modal - 配置信息 -->
      <Modal v-model="modalConditionShow"
             :mask-closable="false"
             :closable="false"
             footer-hide
             :title="modalConditionType==='edit'?'编辑参数':'新增参数'"
             @on-ok="handleSubmit">
        <Form ref="formModalDataCondition"
              :model="modalDataCondition"
              :rules="modalConditionRule"
              :label-width="80"
              @submit.native.prevent>
          <FormItem label="参数名"
                    prop="name">
            <Input type="text"
                   v-model.trim="modalDataCondition.name"
                   placeholder="请输入参数名"></Input>
          </FormItem>
          <FormItem label="显示名"
                    prop="title">
            <Input type="text"
                   v-model.trim="modalDataCondition.title"
                   placeholder="请输入显示名"></Input>
          </FormItem>
          <FormItem label="数据类型"
                    prop="dataType">
            <Select v-model="modalDataCondition.dataType"
                    placeholder="请选择">
              <Option v-for="(item,i) in dataTypeList"
                      :value="item"
                      :key="i">{{ item }}</Option>
            </Select>
          </FormItem>
          <FormItem label="备注"
                    prop="discription">
            <Input type="text"
                   v-model.trim="modalDataCondition.discription"
                   placeholder="请输入备注，30字以内"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary"
                    @click="handleSubmit('formModalDataCondition')"
                    :loading="buttonLoading">确定</Button>
            <Button @click="modalConditionShow=false"
                    style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </Modal>

      <!-- form - 筛选项 -->
      <Form ref="screenFormData"
            :model="screenFormData"
            inline
            label-position="left"
            @submit.native.prevent
            style="margin:20px 0 0 10px">
        <FormItem v-for="(item,i) in paramList"
                  :key='i'
                  :label="item.title+'：'"
                  :prop="item.name">
          <Input type="text"
                 v-model.trim="screenFormData[item.name]"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="screenFormSearch('screenFormData')">搜索</Button>
        </FormItem>
      </Form>

    </Card>
  </div>
</template>

<script>
// mockData
import {
  paramList, // 查询条件配置信息
  dataTypeList // 数据类型列表
} from "./mould/mould";
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";

export default {
  name: "mould",
  data() {
    return {
      /*  配置信息 - table */
      paramList: [], // tabel数据 - 配置信息
      dataTypeList: dataTypeList, // 数据类型列表
      conditionColumns: [
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
          title: "可选值",
          key: "data",
          // align: "center",
          render: (h, params) => {
            if (typeof params.row.data === "string") {
              if (params.row.data !== "") {
                return h("Tag", params.row.data);
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
                    item.lable
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
          title: "显示元素",
          key: "elementType",
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
      /* 配置信息 - modal */
      modalConditionShow: false, // 是否显示
      modalConditionType: "", // 类型：insert/edit
      modalDataCondition: {
        name: "", // 查询条件系统名
        title: "", // 查询条件展现名
        data: [], // 可选值
        discription: "" // 备注
      }, // 数据 - 获取或提交
      modalDataConditionOrg: {}, // 原始数据
      modalConditionRule: {
        name: [
          {
            required: true,
            message: "请输入参数名",
            trigger: "blur"
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
        discription: [
          {
            type: "string",
            max: 30,
            message: "备注过长",
            trigger: "change"
          }
        ]
      }, // form规则
      /* 配置信息 - 筛选表单 */
      screenFormData: {},
      /* loading */
      tableLoading: false,
      buttonLoading: false
    };
  },
  created() {
    this.getConditionData();
  },
  methods: {
    /* 参数信息 */
    // 表格数据 & 表单数据
    getConditionData() {
      // if (!this.isMock) {
      //   /* 接口数据 */
      //   this.paramList = paramList; // 表格
      //   this.paramList.forEach(item => {
      //     this.screenFormData[item.name] = ""; // 动态表单
      //   });
      // } else {
      /* mock数据 */
      this.paramList = paramList; // 表格
      this.refreshConditionData();
      // }
    },
    // 根据条件刷新配置信息数据
    refreshConditionData() {
      this.paramList.sort(arraySort("name", "asc"));
      this.paramList.forEach(item => {
        this.screenFormData[item.name] = ""; // 动态表单
      });
    },
    // 新增参数
    insertScreenItem() {
      this.modalConditionType = "insert";
      this.$refs.formModalDataCondition.resetFields();
      // const items = JSON.parse(JSON.stringify(itemList));
      // this.processTemporary = this.modalDataDescribe;
      this.modalConditionShow = true;
    },
    // 编辑参数
    async edit(row) {
      this.modalConditionType = "edit";
      this.modalDataCondition = JSON.parse(JSON.stringify(row));
      this.modalDataConditionOrg = JSON.parse(
        JSON.stringify(this.modalDataCondition)
      );
      this.modalConditionShow = true;
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
          this.paramList.forEach((list, i) => {
            if (row.name === list.name) {
              this.paramList.splice(i, 1);
            }
          });
          resultCallback(200, "删除成功！", () => {
            this.refreshConditionData();
          });
          // }
        },
        closable: true
      });
    },
    // 参数表单提交
    handleSubmit() {
      this.$refs.formModalDataCondition.validate(async valid => {
        if (valid) {
          // this.buttonLoading = true;
          switch (this.modalConditionType) {
            case "insert":
              // if (!this.isMock) {
              /* 接口数据 */
              // const result = (await addSop(this.modalDataCondition)).data.status;
              // resultCallback(
              //   result,
              //   "添加成功！",
              //   () => {
              //     this.modalConditionShow = false;
              //     this.getData();
              //   },
              //   () => {
              //     this.buttonLoading = false;
              //   }
              // );
              // } else {
              /* mock数据 */
              if (
                this.paramList.some(
                  item => item.name === this.modalDataCondition.name
                )
              ) {
                this.$Message.error("该参数已存在！");
                this.buttonLoading = false;
              } else {
                this.paramList.push(
                  JSON.parse(JSON.stringify(this.modalDataCondition))
                );
                resultCallback(200, "添加成功！", () => {
                  this.refreshConditionData();
                  this.buttonLoading = false;
                  this.modalConditionShow = false;
                });
              }
              // }
              break;
            case "edit":
              // if (!this.isMock) {
              /* 接口数据 */
              // const result = (await editSop(this.modalDataCondition)).data.status;
              //   resultCallback(
              //     result,
              //     "修改成功！",
              //     () => {
              //       this.modalConditionShow = false;
              //       this.getData();
              //     },
              //     () => {
              //       this.buttonLoading = false;
              //     }
              //   );
              // } else {
              /* mock数据 */
              // 判断重复
              if (
                this.paramList.some(
                  item => item.name === this.modalDataCondition.name
                ) &&
                this.modalDataCondition.name !== this.modalDataConditionOrg.name
              ) {
                this.$Message.error("该参数已存在！");
                this.buttonLoading = false;
              } else {
                this.$set(
                  this.paramList,
                  this.modalDataCondition._index,
                  JSON.parse(JSON.stringify(this.modalDataCondition))
                );
                resultCallback(200, "修改成功！", () => {
                  this.refreshConditionData();
                  this.buttonLoading = false;
                  this.modalConditionShow = false;
                });
              }
              // }
              break;
          }
        }
      });
    },
    // 筛选表单搜索
    screenFormSearch() {
      console.log(this.screenFormData);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-table {
    th {
      text-align: center;
    }
    td {
      padding: 10px 0;
    }
  }
  .ivu-form {
    &-item-content {
      display: inline-block;
    }
  }
}
</style>
