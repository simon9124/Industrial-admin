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
            <Button type="success"
                    icon="md-add"
                    style="margin-right: 10px"
                    @click="insert">新增设备</Button>
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
           :title="modalDataType==='edit'?'编辑设备':'新增设备'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="equipmentName">
          <Input type="text"
                 v-model.trim="modalData.equipmentName"
                 placeholder="请输入名称"></Input>
        </FormItem>
        <FormItem label="hmi屏幕："
                  prop="readFlag">
          <Select v-model="modalData.readFlag">
            <Option :value="1">有</Option>
            <Option :value="0">无</Option>
          </Select>
        </FormItem>
        <FormItem label="详情："
                  prop="equipmentMark">
          <Input type="text"
                 v-model.trim="modalData.equipmentMark"
                 placeholder="请输入详情，100字以内"></Input>
        </FormItem>
        <FormItem label="关联SOP："
                  prop="list"
                  class="sop">

          <!-- 多选框 -->
          <Select v-model="sopSelectedId"
                  filterable
                  multiple
                  label-in-value
                  placeholder="添加SOP"
                  style="margin:0 10px 0px 0;width:300px"
                  @on-change="sopOnChange">
            <Option v-for="item in sopList"
                    :value="item.id"
                    :key="item.id"
                    :disabled="JSON.stringify(sopSelectList).indexOf(item.sop)>-1">{{ item.sop }}</Option>
          </Select>

          <!-- 按钮：添加SOP -->
          <Button type="success"
                  size="small"
                  @click="addToSopSelect">添加</Button>

          <!-- tagList -->
          <div style="margin-top:10px">
            <Tag v-for="(item,i) in sopSelectList"
                 :key="i"
                 type="border"
                 color="primary"
                 closable
                 @on-close="deleteSopItem(i)">{{item.sop}}</Tag>
          </div>

        </FormItem>

        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="modalShow=false;sopSelectedId=[]"
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
  sopList // sop列表
} from "./mockData/sop";
import { equipmentList } from "./mockData/equipment"; // 设备列表
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback, // 根据请求的status执行回调函数
  getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
// api
import { getAllEquipmentFunctype } from "@/api/process"; // 获取顶部标签
import {
  findEquipmentByPage, // 分页查询设备信息
  findSopByKey, // 查询所有SOP
  addEquipment, // 新增设备
  editEquipment, // 更新设备
  removeEquipment // 删除设备
} from "@/api/equipment";

export default {
  data() {
    return {
      /* 全局 */
      tabList: [], // 顶部tab列表
      tabSelected: 1, // 顶部tab切换
      sopList: [], // 全部SOP列表 - select用
      /* 每页 */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "名称",
          key: "equipmentName",
          align: "center",
          minWidth: 120
        },
        {
          title: "hmi屏幕",
          key: "readFlag",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.readFlag === 1 ? "有" : "无");
          },
          minWidth: 100
        },
        {
          title: "关联的sop",
          key: "describe",
          // align: "center",
          render: (h, params) => {
            if (params.row.items !== null) {
              return h("div", [
                params.row.items.map(item => {
                  return h(
                    "Tag",
                    {
                      props: {
                        color: "blue"
                      }
                    },
                    item.sop
                  );
                })
              ]);
            }
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
        equipmentName: "",
        equipmentMark: "",
        readFlag: 1
      }, // 数据 - 获取或提交
      modalDataOrg: {}, // 数据 - 行内原始
      sopSelectList: [], // 已选择的sop - 标签列表
      sopSelectedId: [], // select里选择的sop - id
      sopSelectedData: [], // select里选择的sop - 整个data
      formModalRule: {
        equipmentName: [
          {
            required: true,
            message: "请输入设备名称",
            trigger: "change"
          },
          { type: "string", max: 64, message: "名称过长", trigger: "change" }
        ],
        equipmentMark: [
          {
            type: "string",
            max: 100,
            message: "详情不得超过100字",
            trigger: "change"
          }
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
    this.tabList.forEach(tab => {
      this.$set(tab, "id", tab.id.toString());
    });
    if (this.tabList.length !== 0) {
      /* 2.自动选择第一个标签 */
      this.tabSelected = this.tabList[0].id;
      /* 3.渲染数据 */
      this.getData();
    }
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
        /* 表格数据 */
        const dataResult = (
          await findEquipmentByPage(
            this.pageNum,
            this.pageSize,
            this.tabSelected
          )
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
        /* SOP下拉框数据 - 按工序 */
        this.sopList = (await findSopByKey(this.tabSelected)).data.data;
        this.buttonLoading = false;
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = equipmentList[this.tabSelected];
        this.sopList = sopList[this.tabSelected];
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"名称"升序
      this.tableDataOrg.sort(arraySort("equipmentName", "asc"));
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
      this.sopSelectList = [];
      this.sopSelectedId = [];
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalDataType = "edit";
      this.modalDataOrg = row;
      this.modalData = JSON.parse(JSON.stringify(row));
      this.sopSelectList = this.modalData.items;
      this.modalShow = true;
    },
    // select框选择的数据发生变化
    sopOnChange(value) {
      this.sopSelectedData = [];
      value.forEach(item => {
        this.sopSelectedData.push({
          sopId: item.value,
          sop: item.label,
          qc: getValueByKey(this.sopList, "id", item.value, "qc")
        });
      });
    },
    // 将select框内选择的sop，添加到sopSelectList
    addToSopSelect() {
      this.sopSelectedData.forEach(item => {
        this.sopSelectList.push(item);
      });
      // console.log(this.sopSelectList);
      // 清空已选项
      this.sopSelectedId = [];
    },
    // 删除已选择的sop标签
    deleteSopItem(i) {
      this.sopSelectList.splice(i, 1);
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      // console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          if (this.sopSelectList.length === 0) {
            this.$Message.error("请至少绑定一个SOP");
          } else {
            this.modalData.list = [];
            this.sopSelectList.forEach(item => {
              this.modalData.list.push(item.sopId);
            });
            this.modalData.equipmentFuncTypeId = this.tabSelected;
            this.buttonLoading = true;
            switch (this.modalDataType) {
              case "insert":
                if (!this.isMock) {
                  // 接口数据
                  const result = (await addEquipment(this.modalData)).data
                    .status;
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
                  // 按"sop"升序
                  this.sopSelectList.sort(arraySort("sop", "asc"));
                  this.modalData.items = this.sopSelectList;
                  // 随机生成equipment的id
                  this.modalData.id = Math.random()
                    .toString(36)
                    .substr(-10);
                  if (
                    this.tableDataOrg.some(
                      item =>
                        item.equipmentName === this.modalData.equipmentName
                    )
                  ) {
                    this.$Message.error("此设备已存在！");
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
                  // 接口数据
                  const result = (await editEquipment(this.modalData)).data
                    .status;
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
                  // 按"sop"升序
                  this.sopSelectList.sort(arraySort("sop", "asc"));
                  this.modalData.items = this.sopSelectList;
                  // 判断重复
                  if (
                    this.tableDataOrg.some(
                      item =>
                        item.equipmentName === this.modalData.equipmentName
                    ) &&
                    this.modalData.equipmentName !==
                      this.modalDataOrg.equipmentName
                  ) {
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
        title: "确定删除该设备？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeEquipment(row.id);
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
                if (row.id === item.id) {
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
  .ivu-table {
    th {
      text-align: center;
    }
    td {
      padding: 10px 0;
    }
  }
}
.v-transfer-dom /deep/ {
  .ivu-modal {
    .ivu-form {
      .sop {
        margin-bottom: 14px;
      }
    }
  }
}
</style>
