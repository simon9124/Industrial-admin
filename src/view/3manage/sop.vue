<template>
  <div class="dooya-container">
    <Card>
      <Tabs @on-click="tabSelect">
        <TabPane v-for="tab in tabList"
                 :key="tab.id"
                 :label="tab.typeName"
                 :name="tab.id.toString()">

          <!-- 操作 -->
          <div style="margin: 10px 0">
            <Button type="success"
                    icon="md-add"
                    style="margin-right: 10px"
                    @click="insert">新增SOP</Button>
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

        </TabPane>
      </Tabs>
    </Card>

    <!-- Modal -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           :title="modalDataType==='edit'?'编辑SOP':'新增SOP'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="60"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="sop">
          <Input type="text"
                 v-model.trim="modalData.sop"
                 placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="描述："
                  prop="sopDescription">
          <Input type="text"
                 v-model.trim="modalData.sopDescription"
                 placeholder="请输入描述，30字以内"></Input>
        </FormItem>
        <FormItem label="工序："
                  prop="describe"
                  style="margin-bottom: 14px"
                  v-if="this.tabSelected!==3">
          <Row v-for="(item,i) in modalDataDescribe"
               :key="i"
               style="margin-bottom: 10px">

            <!-- 输入框 -->
            <Col span="12"
                 style="margin-right: 10px">
            <Input :value="item.description"
                   @on-blur="inputBlur(i)"
                   placeholder="请输入工序名称"></Input>
            </Col>

            <!-- 按钮组 -->
            <Col span="8">
            <Tooltip content="上移"
                     placement="top">
              <Button type="info"
                      icon="md-arrow-up"
                      size="small"
                      style="margin-right: 5px"
                      @click="processToggle(i,'up')"></Button>
            </Tooltip>
            <Tooltip content="下移"
                     placement="top">
              <Button type="info"
                      icon="md-arrow-down"
                      size="small"
                      style="margin-right: 5px"
                      @click="processToggle(i,'down')"></Button>
            </Tooltip>
            <Tooltip content="增加"
                     placement="top">
              <Button type="success"
                      icon="md-add"
                      size="small"
                      style="margin-right: 5px"
                      @click="modalDataDescribe.push({description:''})"></Button>
            </Tooltip>
            <Tooltip content="删除"
                     placement="top">
              <Button type="error"
                      icon="md-close"
                      size="small"
                      :disabled="modalDataDescribe.length===1"
                      @click="modalDataDescribe.splice(i, 1);"></Button>
            </Tooltip>
            </Col>
          </Row>
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
import {
  tabList, // 顶部tab列表
  sopList, // sop列表
  itemList // 默认工序列表
} from "./mockData/sop";
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";
// api
import {
  getAllEquipmentFunctype, // 获取工位列表（顶部tab）
  findSopByPage, // 分页获取SOP
  addSop, // 新增SOP
  editSop, // 编辑SOP
  removeSop // 删除SOP
} from "@/api/process";

export default {
  data() {
    return {
      /* 全局 */
      tabList: [], // 顶部tab列表
      tabSelected: 1, // 顶部tab切换
      /* 每页 */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "名称",
          key: "sop",
          align: "center",
          minWidth: 100
        },
        {
          title: "描述",
          key: "sopDescription",
          // align: "center",
          minWidth: 180
        },
        {
          title: "工序",
          key: "describe",
          // align: "center",
          render: (h, params) => {
            return h("div", [
              params.row.items.map(item => {
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
            ]);
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
        sop: "",
        sopDescription: ""
      }, // 数据 - 获取或提交
      modalDataOrg: {}, // 数据 - 行内原始
      modalDataDescribe: [], // 编辑SOP工序顺序时临时的数组
      processTemporary: [], // 编辑SOP工序顺序时临时的数组 - copy
      formModalRule: {
        sop: [
          { required: true, message: "请输入SOP名称", trigger: "blur" },
          { type: "string", max: 15, message: "名称过长", trigger: "change" }
        ],
        sopDescription: [
          { required: true, message: "请输入SOP描述", trigger: "blur" },
          { type: "string", max: 30, message: "描述过长", trigger: "change" }
        ]
      }, // form规则
      modalDataType: "" // 类型：insert/edit
    };
  },
  async created() {
    /* 1.顶部标签列表 */
    this.tabList = !this.isMock
      ? (await getAllEquipmentFunctype()).data.data
      : tabList;
    /* 2.自动选择第一个标签 */
    this.tabList.length !== 0 && this.tabSelect(this.tabList[0].id);
  },
  methods: {
    // 顶部tab被选择
    tabSelect(name) {
      this.tabSelected = name;
      this.pageNum = 1;
      this.pageSize = 10;
      this.getData();
    },
    // 获取数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        const dataResult = (
          await findSopByPage(this.pageNum, this.pageSize, this.tabSelected)
        ).data.data;
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
        this.buttonLoading = false;
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = sopList[this.tabSelected];
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"名称"升序
      this.tableDataOrg.sort(arraySort("sop", "asc"));
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
      const items = JSON.parse(JSON.stringify(itemList));
      this.modalDataDescribe = items[this.tabSelected];
      this.processTemporary = this.modalDataDescribe;
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalDataType = "edit";
      this.modalDataOrg = row;
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalDataDescribe = this.modalData.items;
      this.processTemporary = this.modalDataDescribe;
      this.modalShow = true;
    },
    // 工序重新排序
    processToggle(index, handle) {
      if (handle === "up") {
        // 上移
        if (index !== 0) {
          const toExchange = this.processTemporary[index - 1];
          this.$set(
            this.modalDataDescribe,
            index - 1,
            this.processTemporary[index]
          );
          this.$set(this.modalDataDescribe, index, toExchange);
        }
      } else {
        // 下移
        if (index !== this.modalDataDescribe.length - 1) {
          const toExchange = this.processTemporary[index + 1];
          this.$set(
            this.modalDataDescribe,
            index + 1,
            this.processTemporary[index]
          );
          this.$set(this.modalDataDescribe, index, toExchange);
        }
      }
    },
    // 工序input输入框失去焦点
    inputBlur(index) {
      // console.log(event);
      this.$set(this.modalDataDescribe, index, {
        description: event.target.value
      });
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      // console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          if (
            this.tabSelected !== 3 &&
            this.modalDataDescribe.some(item => item.description.trim() === "")
          ) {
            this.$Message.error("工序未填写完整");
          } else {
            this.modalData.qc = this.tabSelected;
            this.modalData.items = [];
            this.modalData.SopItem = this.modalDataDescribe;
            this.buttonLoading = true;
            switch (this.modalDataType) {
              case "insert":
                if (this.tabSelected !== 3) {
                  this.modalData.SopItem.forEach(item => {
                    this.modalData.items.push(item.description);
                  });
                }
                if (!this.isMock) {
                  /* 接口数据 */
                  const result = (await addSop(this.modalData)).data.status;
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
                  this.modalData.items = this.modalData.SopItem;
                  // 随机生成sop的id
                  this.modalData.id = Math.random()
                    .toString(36)
                    .substr(-10);
                  if (
                    this.tableDataOrg.some(
                      item => item.sop === this.modalData.sop
                    )
                  ) {
                    this.$Message.error("此Sop已存在！");
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
                if (this.tabSelected !== 3) {
                  let sort = 1;
                  this.modalData.SopItem.forEach(item => {
                    this.$set(item, "sort", sort);
                    sort++;
                  });
                }
                if (!this.isMock) {
                  /* 接口数据 */
                  const result = (await editSop(this.modalData)).data.status;
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
                  this.modalData.items = this.modalData.SopItem;
                  if (
                    this.tableDataOrg.some(
                      item => item.sop === this.modalData.sop
                    ) &&
                    this.modalData.sop !== this.modalDataOrg.sop
                  ) {
                    // 判断重复
                    this.$Message.error("此Sop已存在！");
                    this.buttonLoading = false;
                  } else {
                    this.$set(
                      this.tableDataOrg,
                      (this.pageNum - 1) * this.pageSize +
                        this.modalData._index,
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
        }
      });
    },
    // 点击按钮 - 删除
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该SOP？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeSop(row.id);
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
                row.sop === item.sop &&
                  this.tableDataOrg.splice(
                    (this.pageNum - 1) * this.pageSize + i,
                    1
                  );
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
