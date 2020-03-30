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
             stripe>
      </Table>

      <!-- 分页 -->
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
          <!-- <Select v-model="modalData.user_access"
                  @on-change="accessOnChange">
            multiple
            :max-tag-count="3"
            <Option value="admin"
                    :disabled="userAccess[0]!=='admin'">管理员</Option>
            <Option value="cestc"
                    :disabled="userAccess[0]!=='admin'&&userAccess[0]!=='cestc'">工程师</Option>
            <Option value="workshop_manager"
                    :disabled="userAccess[0]==='proline_leader'||userAccess[0]==='examine'">车间主管</Option>
            <Option value="proline_leader"
                    :disabled="userAccess[0]==='examine'">产线线长</Option>
            <Option value="examine">检测员</Option>
          </Select> -->
          <Select v-model="modalData.user_access"
                  @on-change="accessOnChange">
            <Option v-for="(role,i) in roleList"
                    :value="role.name"
                    :key="i">
              {{ role.title }}
            </Option>
          </Select>
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
// vuex
import { mapGetters } from "vuex";
import {
  userList, // 用户列表
  roleList // 角色列表
} from "./mockData/role";
// api
import {
  getUserList,
  insertUser,
  updateUser,
  deleteUser
} from "@/api/user/index";
import { getUseGroupList } from "@/api/userGroup/index"; // 获取用户组列表
import { getRolelist } from "@/api/role/index"; // 获取角色列表
// function
import { validateTel } from "@/libs/validate"; // 手机号验证
import {
  arraySort, // 对象数组根据key排序
  getValueByKey, // 根据对象数组某个key的value，查询另一个key的value
  resultCallback // 根据请求的status执行回调函数
} from "@/libs/dataHanding";

export default {
  data() {
    return {
      /* 全局 */
      roleList: [], // 全部角色列表 - select用
      userGroup: [], // 用户组列表 - select用
      /* table */
      tableDataOrg: [], // 原始数据
      tableData: [], // 处理后的当页数据
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
        {
          title: "角色",
          key: "userAccess",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              getValueByKey(
                this.roleList,
                "name",
                params.row.userAccess,
                "title"
              )
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
      ], // 表头列项
      total: 0, // 总数
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示数量
      /* loading */
      tableLoading: false, // table
      buttonLoading: false, // button
      /* modal */
      modalShow: false, // 是否显示
      modalDataType: "", // 类型 - insert or edit
      modalData: {
        user_name: "",
        display_name: "",
        user_phone: "",
        group_id: "",
        user_access: "",
        lock_flag: "0",
        user_avator: ""
      }, // 数据
      modalDataOrg: {}, // 数据 - 行内原始
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
              if (!validateTel(value) && value !== undefined && value !== "") {
                callback(new Error("手机号格式不正确"));
              } else {
                callback();
              }
            }
          }
        ],
        // group_id: [
        //   { required: true, message: "请选择用户组", trigger: "change" }
        // ],
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
      } // form规则
    };
  },
  computed: {
    ...mapGetters(["userAccess", "userName"])
  },
  async created() {
    this.getData();
    this.userGroup = !this.isMock
      ? (await getUseGroupList()).data.data || []
      : [];
    this.roleList = !this.isMock
      ? (await getRolelist()).data.data || []
      : roleList;
  },
  methods: {
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.tableDataOrg = (await getUserList()).data.data || [];
        this.refreshData();
        this.buttonLoading = false;
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = userList;
        this.refreshData();
        this.buttonLoading = false;
      }
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
    },
    // 根据条件刷新数据
    refreshData() {
      if (this.isMock) {
        // 按"user_name"升序
        this.tableDataOrg.sort(arraySort("user_name", "asc"));
      }
      // 分页 & 每页条数
      this.tableData = this.tableDataOrg.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
      // 如果是在删除之后获取的数据 -> 若删掉的是某一页的最后项且页码不是1，则自动获取前一页的数据
      if (this.tableData.length === 0 && this.tableDataOrg.length !== 0) {
        this.pageNum--;
        this.refreshData();
      }
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
      this.$refs.formModalData.resetFields();
      this.modalData.user_access = ["examine"];
      this.modalShow = true;
    },
    // 点击按钮 - 编辑
    async edit(row) {
      this.modalDataType = "edit";
      this.modalDataOrg = row;
      this.modalData = JSON.parse(JSON.stringify(row));
      // this.modalData.group_id =
      //   this.modalData.group_name === "开发组" ? "001" : "002";
      this.modalShow = true;
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
          this.modalData.user_avator = "";
          switch (this.modalDataType) {
            case "insert":
              this.modalData.userAccess = this.modalData.user_access.join(",");
              if (!this.isMock) {
                // 非mock时
                if (this.modalData.user_phone === undefined) {
                  this.modalData.user_phone = "";
                }
                const result = (await insertUser(this.modalData)).data.status;
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
                // mock时
                if (
                  this.tableDataOrg.some(
                    item => item.user_name === this.modalData.user_name
                  )
                ) {
                  // 判断重复
                  this.$Message.error("该账号已存在！");
                  this.buttonLoading = false;
                } else {
                  // 随机生成sop的id
                  this.modalData.user_id = Math.random()
                    .toString(36)
                    .substr(-10);
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
                // 非mock时
                const result = (await updateUser(this.modalData)).data.status;
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
                // mock时
                if (
                  this.tableDataOrg.some(
                    item => item.user_name === this.modalData.user_name
                  ) &&
                  this.modalData.user_name !== this.modalDataOrg.user_name
                ) {
                  // 判断重复
                  this.$Message.error("该账号已存在！");
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
    // 点击按钮 - 锁定/解锁
    async lock(row) {
      row.lock_flag = row.lock_flag === "0" ? "1" : "0";
      if (!this.isMock) {
        // 非mock时
        const result = (await updateUser(row)).data.status;
        resultCallback(
          result,
          row.lock_flag === "1" ? "锁定成功！" : "解锁成功！",
          () => {
            this.getData();
          }
        );
      } else {
        // mock时
        this.$set(
          this.tableDataOrg,
          (this.pageNum - 1) * this.pageSize + row._index,
          JSON.parse(JSON.stringify(row))
        );
        this.$Message.success(
          row.lock_flag === "1" ? "锁定成功！" : "解锁成功！"
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
            resultCallback(result, "删除成功！", () => {
              this.getData();
            });
          } else {
            // mock时
            this.tableDataOrg
              .slice(
                (this.pageNum - 1) * this.pageSize,
                this.pageNum * this.pageSize
              )
              .forEach((item, i) => {
                if (row.user_id === item.user_id) {
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
