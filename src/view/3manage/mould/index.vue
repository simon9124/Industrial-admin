<template>
  <div class="dooya-container">
    <Card>

      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                style="margin-right: 10px"
                @click="insert">新增模板</Button>
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
           :title="modalDataType==='edit'?'编辑模板':'新增模板'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="60"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="name">
          <Input type="text"
                 v-model.trim="modalData.name"
                 placeholder="请输入名称"></Input>
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

    <!-- ParamModal -->
    <ParamModal ref="paramModal"
                @submitParamlist="submitParamlist"></ParamModal>

    <!-- upExcelModal -->
    <UpExcelModal ref="upExcelModal"
                  @submitTableHeader="submitTableHeader"></UpExcelModal>

    <!-- reportModal -->
    <ReportModal ref="reportModal"></ReportModal>

  </div>
</template>

<script>
// mockData
import {
  mouldList // 模板列表
} from "./mould";
// components
import ParamModal from "./param";
import ReportModal from "./report";
import UpExcelModal from "./upExcel";
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import {
  getReportList, // 获取模板列表
  getReortBaseInfo, // 根据id获取模板基础信息
  addOrEditReportBaseInfo, // 新增模板 & 更新模板
  removeReport // 删除模板
} from "@/api/mould";

export default {
  components: {
    ParamModal,
    ReportModal,
    UpExcelModal
  },
  data() {
    return {
      /* 全局 */
      /* 每页 */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "id",
          key: "id",
          align: "center",
          minWidth: 100
        },
        {
          title: "名称",
          key: "name",
          align: "center",
          minWidth: 100
        },
        // {
        //   title: "参数",
        //   key: "paramList",
        //   // align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       params.row.paramList.map(item => {
        //         return h(
        //           "Tag",
        //           {
        //             props: {
        //               color: "blue"
        //             }
        //           },
        //           item.name
        //         );
        //       })
        //     ]);
        //   },
        //   minWidth: 300
        // },
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
                    content: "参数",
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  h("Button", {
                    props: {
                      type: "info",
                      size: "small",
                      icon: "ios-funnel-outline"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$refs.paramModal.showModal({
                          id: params.row.id,
                          paramList: params.row.paramList
                        });
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
                    content: "模板",
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  h("Button", {
                    props: {
                      type: "warning",
                      size: "small",
                      icon: "ios-cloud-upload-outline"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$refs.upExcelModal.showModal({
                          id: params.row.id,
                          tableHeader: params.row.header,
                          field: params.row.field
                        });
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
                    content: "查看",
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  h("Button", {
                    props: {
                      type: "info",
                      size: "small",
                      icon: "ios-search-outline"
                    },
                    style: {
                      marginRight: "5px",
                      backgroundColor: "#808695",
                      borderColor: "#808695"
                    },
                    on: {
                      click: () => {
                        this.$refs.reportModal.showModal({
                          id: params.row.id,
                          paramList: params.row.paramList
                        });
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
      modalData: {
        name: ""
      }, // 数据 - 获取或提交
      modalDataOrg: {}, // 数据 - 行内原始
      formModalRule: {
        name: [
          {
            required: true,
            message: "请输入模板名称",
            trigger: "blur"
          },
          { type: "string", max: 15, message: "名称过长", trigger: "change" }
        ]
      }, // form规则
      modalDataType: "", // 类型：insert/edit
      /* 子组件 */
      paramModalShow: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.tableDataOrg = (await getReportList()).data.data || [];
        this.refreshData();
        this.buttonLoading = false;
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = mouldList;
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      if (this.isMock) {
        // 按"名称"升序
        this.tableDataOrg.sort(arraySort("name", "asc"));
        // 随机生成id
        this.tableDataOrg.forEach(row => {
          this.$set(
            row,
            "id",
            Math.random()
              .toString(36)
              .substr(-10)
          );
        });
      }
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
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalDataType = "edit";
      this.modalDataOrg = !this.isMock
        ? (await getReortBaseInfo(row.id)).data.data || {}
        : row;
      this.modalData = JSON.parse(JSON.stringify(row));
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
                /* 接口数据 */
                this.modalData.id = 0;
                const result = (await addOrEditReportBaseInfo(this.modalData))
                  .data.status;
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
                // 生成模板的id
                this.modalData.id = Math.random()
                  .toString(36)
                  .substr(-10);
                if (
                  this.tableDataOrg.some(
                    item => item.name === this.modalData.name
                  )
                ) {
                  this.$Message.error("此模板已存在！");
                  this.buttonLoading = false;
                } else {
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
                /* 接口数据 */
                const result = (await addOrEditReportBaseInfo(this.modalData))
                  .data.status;
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
                // 判断重复
                if (
                  this.tableDataOrg.some(
                    item => item.name === this.modalData.name
                  ) &&
                  this.modalData.name !== this.modalDataOrg.name
                ) {
                  this.$Message.error("此模板已存在！");
                  this.buttonLoading = false;
                } else {
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
        title: "确定删除该模板？",
        onOk: async () => {
          if (!this.isMock) {
            /* 接口数据 */
            const result = await removeReport(row.id);
            resultCallback(result.data.status, "删除成功！", () => {
              this.getData();
            });
          } else {
            /* mock数据 */
            this.tableDataOrg
              .slice(
                (this.pageNum - 1) * this.pageSize,
                this.pageNum * this.pageSize
              )
              .forEach((item, i) => {
                if (row.name === item.name) {
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
    },
    // 子组件事件 - 提交参数列表
    submitParamlist(data) {
      console.log(data);
      this.tableData.forEach((row, i) => {
        if (row.id === data.id) {
          this.$set(row, "paramList", data.data);
          resultCallback(200, "修改成功！", () => {
            this.refreshData();
          });
        }
      });
    },
    // 子组件事件 - 提交配置模板
    submitTableHeader(data) {
      console.log(data);
      this.tableData.forEach((row, i) => {
        if (row.id === data.id) {
          this.$set(row, "header", data.header);
          this.$set(row, "field", data.field);
          resultCallback(200, "修改成功！", () => {
            this.refreshData();
          });
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
    th {
      text-align: center;
    }
    td {
      padding: 10px 0;
    }
  }
}
</style>
