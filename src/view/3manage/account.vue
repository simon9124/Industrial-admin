<template>
  <div class="dooya-container">
    <Card>
      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                @click="insert">新增用户</Button>
      </div>

      <!-- 表格 -->
      <Table :data="tableData"
             :loading="tableLoading"
             :columns="tableColumns"
             stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                transfer
                placement="top"
                :total="tableDataOrg.length"
                :current.sync="pageNum"
                :page-size-opts="[10, 50, 100, 200]"
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
           title="账号详情"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="账号："
                  prop="user_name">
          <Input type="text"
                 v-model.trim="modalData.user_name"
                 :disabled="userAccess[0]==='workshop_manager' && modalData.userAccess==='workshop_manager'"></Input>
        </FormItem>
        <FormItem label="姓名："
                  prop="display_name">
          <Input type="text"
                 v-model.trim="modalData.display_name"></Input>
        </FormItem>
        <FormItem label="手机号："
                  prop="user_phone"
                  class="phone">
          <Input type="text"
                 v-model.trim="modalData.user_phone"></Input>
        </FormItem>
        <FormItem label="用户组："
                  prop="group_id">
          <Select v-model="modalData.group_id">
            <Option v-for="group in userGroup"
                    :value="group.group_id"
                    :key="group.group_id">{{ group.group_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="角色："
                  prop="userAccess">
          <Select v-model="modalData.user_access"
                  @on-change="accessOnChange">
            <!-- multiple -->
            <!-- :max-tag-count="3" -->
            <Option value="admin"
                    :disabled="userAccess[0]!=='admin'">管理员</Option>
            <Option value="cestc"
                    :disabled="userAccess[0]!=='admin'&&userAccess[0]!=='cestc'">工程师</Option>
            <Option value="workshop_manager"
                    :disabled="userAccess[0]==='proline_leader'||userAccess[0]==='examine'">车间主管</Option>
            <Option value="proline_leader"
                    :disabled="userAccess[0]==='examine'">产线线长</Option>
            <Option value="examine">检测员</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="handleReset('formModalData')"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// import list from './mockData/account';
import {
  getUserList,
  insertUser,
  updateUser,
  deleteUser
} from "@/api/user/index";
import { getUseGroupList } from "@/api/userGroup/index";
// function
import { validateTel } from "@/libs/validate";
// vuex
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      // 原始数据
      tableDataOrg: [],
      // 处理后的当页数据
      tableData: [],
      // 表头列项
      tableColumns: [
        {
          title: "账号",
          key: "user_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "姓名",
          key: "display_name",
          align: "center",
          minWidth: 120
        },
        {
          title: "电话",
          key: "user_phone",
          align: "center",
          minWidth: 120
        },
        // {
        //   title: "用户组",
        //   key: "group_name",
        //   align: "center",
        //   minWidth: 120
        // },
        {
          title: "角色",
          key: "userAccess",
          align: "center",
          render: (h, params) => {
            /* eslint-disable */
            return h(
              "div",
              params.row.userAccess === "admin"
                ? "管理员"
                : params.row.userAccess === "cestc"
                ? "工程师"
                : params.row.userAccess === "workshop_manager"
                ? "车间主管"
                : params.row.userAccess === "proline_leader"
                ? "产线线长"
                : "检测员"
            );
          },
          minWidth: 120
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 180,
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
                    content: params.row.lock_flag === "0" ? "锁定" : "解锁",
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  h("Button", {
                    props: {
                      type: "warning",
                      size: "small",
                      icon:
                        params.row.lock_flag === "0"
                          ? "ios-key-outline"
                          : "ios-key"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.lock(params.row);
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
      ],
      // loading - table
      tableLoading: false,
      // loading - button
      buttonLoading: false,
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
      // modal弹框 - 是否显示
      modalShow: false,
      // modal弹框 - 数据
      modalData: {
        user_phone: ""
      },
      // modal弹框 - form规则
      formModalRule: {
        user_name: [
          {
            required: true,
            message: "请输入账户名",
            trigger: "change"
          },
          { type: "string", max: 20, message: "账户名过长", trigger: "change" }
        ],
        display_name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "change"
          },
          { type: "string", max: 10, message: "姓名过长", trigger: "change" }
        ],
        user_phone: [
          {
            required: true,
            trigger: "change",
            validator: function(rule, value, callback) {
              if (!validateTel(value) && value !== undefined) {
                callback(new Error("手机号格式不正确"));
              } else {
                callback();
              }
            }
          }
        ],
        group_id: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ],
        userAccess: [
          {
            required: true,
            validator: function(rule, value, callback) {
              if (value === "") {
                callback(new Error("请选择用户角色"));
              } else {
                callback();
              }
            },
            message: "请选择用户角色",
            trigger: "change"
          }
        ]
      },
      // modal弹框 - 用户组数据
      userGroup: [],
      // modal弹框 - 类型
      modalDataType: ""
    };
  },
  computed: {
    ...mapGetters(["userAccess", "userName"])
  },
  async created() {
    this.getData();
    // 用户组 -> select选框用
    this.userGroup = (await getUseGroupList()).data.data;
  },
  methods: {
    // 获取首页数据
    async getData() {
      this.tableLoading = true;
      this.tableDataOrg = (await getUserList()).data.data;
      // 车间主管只能看检测员、产线线长和自己信息
      if (this.userAccess[0] === "workshop_manager") {
        for (let i = this.tableDataOrg.length - 1; i >= 0; i--) {
          if (
            this.tableDataOrg[i].userAccess === "admin" ||
            this.tableDataOrg[i].userAccess === "cestc" ||
            (this.tableDataOrg[i].userAccess === "workshop_manager" &&
              this.tableDataOrg[i].user_name !== this.userName)
          ) {
            this.tableDataOrg.splice(i, 1);
          }
        }
      }
      this.refreshData();
      this.buttonLoading = false;
      this.tableLoading = false;
    },
    // 根据条件刷新数据
    refreshData() {
      this.tableData = this.tableDataOrg.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    // 分页
    changePage(pageNum) {
      this.pageNum = pageNum;
      this.refreshData();
    },
    // 每页条数变化
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.pageNum = 1;
      this.refreshData();
    },
    // 点击按钮 - 新增
    insert() {
      this.modalDataType = "insert";
      this.modalData = {};
      this.modalData.user_access = ["examine"];
      // this.modalData.user_access = [];
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      if (!this.isMock) {
        // 非mock时
        this.modalDataType = "edit";
        this.modalData = JSON.parse(JSON.stringify(row));
        this.modalShow = true;
      } else {
        // mock时
        this.modalDataType = "edit";
        this.modalData = JSON.parse(JSON.stringify(row));
        this.modalData.group_id =
          this.modalData.group_name === "开发组" ? "001" : "002";
        this.modalShow = true;
      }
    },
    // 用户角色被选择
    accessOnChange(value) {
      // console.log(value);
      // this.modalData.userAccess = value.join(",");
      this.modalData.userAccess = value;
      this.modalData.user_access = [this.modalData.user_access];
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      // console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          switch (this.modalDataType) {
            case "insert":
              this.modalData.userAccess = this.modalData.user_access.join(",");
              if (!this.isMock) {
                // 非mock时
                this.modalData.user_avator = "";
                if (this.modalData.user_phone === undefined)
                  this.modalData.user_phone = "";
                const result = (await insertUser(this.modalData)).data.status;
                if (result === 200) {
                  this.$refs.formModalData.resetFields();
                  this.$Message.success("添加成功！");
                }
                this.modalShow = false;
                this.getData();
              } else {
                // mock时
                this.modalData.group_name =
                  this.modalData.group_id === "001" ? "开发组" : "产品组";
                this.modalData.user_id = (
                  this.tableDataOrg.length + 1
                ).toString();
                this.tableDataOrg.push(this.modalData);
                this.refreshData();
                this.$Message.success("添加成功！");
                this.buttonLoading = false;
                this.modalShow = false;
              }
              break;
            case "edit":
              if (!this.isMock) {
                // 非mock时
                this.modalData.user_avator = "";
                const result = (await updateUser(this.modalData)).data.status;
                if (result === 200) {
                  this.$refs.formModalData.resetFields();
                  this.$Message.success("修改成功！");
                }
                this.modalShow = false;
                this.getData();
              } else {
                // mock时
                // console.log(this.modalData.user_id);
                this.tableData.forEach(list => {
                  if (this.modalData.user_id === list.user_id) {
                    this.$set(
                      list,
                      "group_name",
                      this.modalData.group_id === "001" ? "开发组" : "产品组"
                    );
                  }
                });
                this.refreshData();
                this.$Message.success("修改成功！");
                this.buttonLoading = false;
                this.modalShow = false;
              }
              break;
          }
        }
      });
    },
    // 点击表单按钮 - 取消
    handleReset() {
      this.$refs.formModalData.resetFields();
      this.modalShow = false;
    },
    // 点击按钮 - 锁定/解锁
    async lock(row) {
      row.lock_flag = row.lock_flag === "0" ? "1" : "0";
      if (!this.isMock) {
        // 非mock时
        const result = (await updateUser(row)).data.status;
        if (result === 200) {
          this.$Message.success(
            row.lock_flag === "1" ? "锁定成功！" : "解锁成功！"
          );
        }
      } else {
        // mock时
        this.$Message.success(
          row.lock_flag === 1 ? "锁定成功！" : "解锁成功！"
        );
      }
    },
    // 点击按钮 - 删除
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该用户？",
        onOk: async () => {
          if (!this.isMock) {
            // 非mock时
            const result = (await deleteUser(row.user_id)).data.status;
            if (result === 200) {
              this.$Message.success("删除成功");
            }
            this.getData();
          } else {
            // mock时
            this.tableData.forEach(list => {
              if (row.user_id === list.user_id) {
                const index = this.tableDataOrg.indexOf(list);
                this.tableDataOrg.splice(index, 1);
              }
            });
            this.$Message.success("删除成功");
            this.refreshData();
          }
        },
        closable: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.v-transfer-dom /deep/ {
  .ivu-modal {
    .ivu-form {
      .phone {
        label::before {
          content: "";
        }
      }
    }
  }
}
</style>
