<template>
  <div class="dooya-container">
    <Card>
      <Tabs @on-click="tabSelect">
        <TabPane v-for="tab in tabList"
                 :key="tab.id"
                 :label="tab.workStationName"
                 :name="JSON.stringify(tab)">

          <!-- 操作 -->
          <div style="margin: 10px 0">
            <Button type="success"
                    icon="md-add"
                    style="margin-right: 10px"
                    @click="insert">关联设备</Button>
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
           :title="modalDataType==='edit'?'关联设备':'关联设备'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="120"
            @submit.native.prevent>
        <FormItem label="产线编号："
                  prop="lineNo">
          <Input type="number"
                 disabled
                 v-model.trim="modalData.lineNo"
                 placeholder="请输入编号"></Input>
        </FormItem>
        <FormItem label="设备ip地址："
                  prop="ip">
          <Input type="text"
                 v-model.trim="modalData.ip"
                 placeholder="请输入ip地址"></Input>
        </FormItem>
        <FormItem label="设备机架号："
                  prop="rack">
          <Input type="number"
                 v-model.trim="modalData.rack"
                 placeholder="请输入机架号"></Input>
        </FormItem>
        <FormItem label="设备槽号："
                  prop="slot">
          <Input type="number"
                 v-model.trim="modalData.slot"
                 placeholder="请输入槽号"></Input>
        </FormItem>
        <FormItem label="条码地址："
                  prop="snAddr">
          <Input type="text"
                 v-model.trim="modalData.snAddr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="测试开始地址："
                  prop="startTimeAddr">
          <Input type="text"
                 v-model.trim="modalData.startTimeAddr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="测试结束地址："
                  prop="finalTimeAddr">
          <Input type="text"
                 v-model.trim="modalData.finalTimeAddr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="测试结果地址："
                  prop="result0Addr">
          <Input type="text"
                 v-model.trim="modalData.result0Addr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="工位编码地址："
                  prop="qcIdAddr">
          <Input type="text"
                 v-model.trim="modalData.qcIdAddr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="标准编码地址："
                  prop="tagCodeAddr">
          <Input type="text"
                 v-model.trim="modalData.tagCodeAddr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="采集状态地址："
                  prop="statusAddr">
          <Input type="text"
                 v-model.trim="modalData.statusAddr"
                 placeholder="请输入以'DB'开头的地址"></Input>
        </FormItem>
        <FormItem label="关联设备"
                  prop="equipmentId">
          <div v-if="tabList.length>0">
            <Select v-model="modalData.equipmentId"
                    placeholder="请选择">
              <Option v-for="(item,i) in equipmentList"
                      :value="item.id"
                      :key="i">{{ item.equipmentName }}</Option>
            </Select>
            <!-- <Select v-if="tabSelected===tabList[0].id"
                    v-model="modalData.equipmentId"
                    placeholder="请选择">
              <Option v-for="(item,i) in equipmentListQc1"
                      :value="item.id"
                      :key="i">{{ item.equipmentName }}</Option>
            </Select> -->
            <!-- <Select v-if="tabSelected===tabList[1].id"
                    v-model="modalData.equipmentId"
                    placeholder="请选择">
              <Option v-for="(item,i) in equipmentListQc2"
                      :value="item.id"
                      :key="i">{{ item.equipmentName }}</Option>
            </Select> -->
          </div>
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
  proLineList // 产线列表
} from "./mockData/proLine";
import { equipmentList } from "./mockData/equipment"; // 设备列表
// function
import {
  arraySort, // 对象数组根据key排序
  resultCallback, // 根据请求的status执行回调函数
  getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
import { isPositiveInteger, validateIP } from "@/libs/validate";
// api
import {
  getWorkStationsByLineNo, // 查询产线工位
  findProLineByPage, // 分页查询产线
  findByFunctionType, // 根据设备功能查询设备
  addLine, // 新增产线
  editLine, // 更新产线
  removeLine // 删除产线
} from "@/api/proLine";

export default {
  data() {
    return {
      /* 全局 */
      tabList: [], // 顶部tab列表
      tabSelected: "", // 顶部tab切换 - 接口
      tabSelectedMock: 1, // 顶部tab切换 - mock
      equipmentList: [], // 设备列表
      equipmentListQc1: [], // qc1设备列表
      equipmentListQc2: [], // qc2设备列表
      /* 每页 */
      tableDataOrg: [], // tabel数据 - 全部
      tableData: [], // table数据 - 当前页
      tableColumns: [
        {
          title: "产线编号",
          key: "lineNo",
          align: "center",
          minWidth: 100
        },
        {
          title: "ip地址",
          key: "ip",
          align: "center",
          minWidth: 150
        },
        {
          title: "机架号",
          key: "rack",
          align: "center",
          minWidth: 100
        },
        {
          title: "槽号",
          key: "slot",
          align: "center",
          minWidth: 100
        },
        {
          title: "关联设备",
          key: "equipmentName",
          align: "center",
          minWidth: 120
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
        lineNo: "",
        ip: "",
        rack: "",
        slot: "",
        snAddr: "",
        startTimeAddr: "",
        finalTimeAddr: "",
        result0Addr: "",
        qcIdAddr: "",
        tagCodeAddr: "",
        statusAddr: "",
        equipmentId: ""
      }, // 数据 - 获取或提交
      modalDataOrg: {}, // 数据 - 行内原始
      formModalRule: {
        lineNo: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入产线编号"));
              } else if (!isPositiveInteger(value, 9999, 0)) {
                callback(new Error("产线编号只能是0-9999的正整数"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        ip: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入ip地址"));
              } else if (!validateIP(value)) {
                callback(new Error("ip地址格式错误"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        rack: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入机架号"));
              } else if (!isPositiveInteger(value, 9999, 0)) {
                callback(new Error("机架号只能是0-9999的正整数"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        slot: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入槽号"));
              } else if (!isPositiveInteger(value, 9999, 0)) {
                callback(new Error("槽号只能是0-9999的正整数"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        snAddr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入条码地址"));
              } else if (value.substr(0, 2) !== "DB") {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        startTimeAddr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入条码地址"));
              } else if (value.substr(0, 2) !== "DB") {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        finalTimeAddr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入条码地址"));
              } else if (value.substr(0, 2) !== "DB") {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        result0Addr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入条码地址"));
              } else if (value.substr(0, 2) !== "DB") {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        qcIdAddr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入条码地址"));
              } else if (value.substr(0, 2) !== "DB") {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        tagCodeAddr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (
                value !== "" &&
                value !== undefined &&
                value.substr(0, 2) !== "DB"
              ) {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ],
        statusAddr: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "" || value === undefined) {
                callback(new Error("请输入条码地址"));
              } else if (value.substr(0, 2) !== "DB") {
                callback(new Error("地址必须以'DB'开头"));
              } else {
                callback();
              }
            },
            trigger: "change"
          }
        ]
      }, // form规则
      modalDataType: "" // 类型：insert/edit
    };
  },
  async created() {
    // 接口数据
    const lineNo = localStorage.getItem("loginLineNo");
    /* 1.顶部标签列表 */
    this.tabList = !this.isMock
      ? (await getWorkStationsByLineNo(lineNo)).data.data
      : tabList;
    if (this.tabList.length !== 0) {
      /* 2.自动选择第一个标签 */
      this.tabSelected = this.tabList[0].id;
      /* 3.产线列表 */
      // this.getData();
      /* 4.根据工位，渲染设备列表 */
      if (!this.isMock) {
        // this.equipmentListQc1 = (await findByFunctionType(
        //   this.tabList[0].funcTypeId
        // )).data.data;
        // this.equipmentListQc2 = (await findByFunctionType(
        //   this.tabList[1].funcTypeId
        // )).data.data;
        this.tabSelect(JSON.stringify(this.tabList[0]));
      } else {
        this.getData();
        this.equipmentListQc1 = [];
        this.equipmentListQc2 = [];
        equipmentList.forEach(equipment => {
          if (
            equipment.items.length !== 0 &&
            equipment.items.some(sop => sop.qc === 1)
          ) {
            this.equipmentListQc1.push(equipment);
          }
          if (
            equipment.items.length !== 0 &&
            equipment.items.some(sop => sop.qc === 2)
          ) {
            this.equipmentListQc2.push(equipment);
          }
        });
      }
    }
  },
  methods: {
    // 顶部tab被选择
    async tabSelect(tab) {
      this.tabSelected = JSON.parse(tab).id;
      this.tabSelectedMock = JSON.parse(tab).funcTypeId;
      if (!this.isMock) {
        this.tableLoading = true;
        this.equipmentList = (await findByFunctionType(
          this.tabSelectedMock
        )).data.data;
      }
      this.pageNum = 1;
      this.pageSize = 10;
      this.getData();
    },
    // 获取数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        const dataResult = (await findProLineByPage(
          this.pageNum,
          this.pageSize,
          this.tabSelected
        )).data.data;
        if (dataResult !== null) {
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
        this.tableDataOrg = proLineList[this.tabSelectedMock];
        this.refreshData();
      }
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"产线编号"升序
      this.tableDataOrg.sort(arraySort("lineNo", "asc"));
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
      this.modalData.lineNo = localStorage.getItem("loginLineNo");
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    edit(row) {
      this.modalDataType = "edit";
      this.modalDataOrg = row;
      this.modalData = JSON.parse(JSON.stringify(row));
      this.modalData.lineNo = this.modalData.lineNo.toString();
      this.modalData.rack = this.modalData.rack.toString();
      this.modalData.slot = this.modalData.slot.toString();
      this.modalShow = true;
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          this.modalData.qcIndex = this.tabSelected;
          switch (this.modalDataType) {
            case "insert":
              this.modalData.workStationId = this.tabSelected;
              if (!this.isMock) {
                // 接口数据
                const result = (await addLine(this.modalData)).data.status;
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
                this.modalData.equipmentName = getValueByKey(
                  equipmentList,
                  "id",
                  this.modalData.equipmentId,
                  "equipmentName"
                );
                // 随机生成sop的id
                this.modalData.id = Math.random()
                  .toString(36)
                  .substr(-10);
                if (
                  this.tableDataOrg.some(
                    item => item.lineNo.toString() === this.modalData.lineNo
                  )
                ) {
                  this.$Message.error("该产线已存在！");
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
                const result = (await editLine(this.modalData)).data.status;
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
                this.modalData.equipmentName = getValueByKey(
                  equipmentList,
                  "id",
                  this.modalData.equipmentId,
                  "equipmentName"
                );
                // 判断重复
                if (
                  this.tableDataOrg.some(
                    item => item.lineNo.toString() === this.modalData.lineNo
                  ) &&
                  this.modalData.lineNo !== this.modalDataOrg.lineNo.toString()
                ) {
                  this.$Message.error("该产线已存在！");
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
        title: "确定删除该设备？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = await removeLine(row.id);
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
</style>
