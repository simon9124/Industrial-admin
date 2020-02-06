<template>
  <div class="dooya-container">
    <Card>
      <!-- 操作 -->
      <div style="margin: 10px 0">
        <Button type="success"
                icon="md-add"
                @click="insert">新增角色</Button>
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
           :title="modalDataType==='edit'?'编辑角色':'新增角色'"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="roleName">
          <Input type="text"
                 v-model.trim="modalData.roleName"></Input>
        </FormItem>
        <FormItem label="菜单："
                  prop="menuFunction"
                  class="menu-function">

          <!-- 多选框 -->
          <Select v-model="menuSelectedId"
                  filterable
                  multiple
                  label-in-value
                  placeholder="添加菜单"
                  style="margin:0 10px 0px 0;width:300px"
                  @on-change="menuOnChange">
            <Option v-for="menu in menuList"
                    :value="menu.menuName"
                    :key="menu.menuName"
                    :disabled="JSON.stringify(menuSelectList).indexOf(menu.menuName)>-1">
              {{ menu.menuName }}
            </Option>
          </Select>

          <!-- 按钮：添加SOP -->
          <Button type="success"
                  size="small"
                  @click="addToMenuSelect">添加</Button>

          <!-- tagList -->
          <div style="margin-top:10px">
            <Tag v-for="(item,i) in menuSelectList"
                 :key="i"
                 type="border"
                 color="primary"
                 closable
                 @on-close="deleteMenuItem(i)">{{item.functionName}}</Tag>
          </div>

        </FormItem>
        <FormItem label="用户："
                  prop="users"
                  class="users">

          <!-- 多选框 -->
          <Select v-model="userSelectedId"
                  filterable
                  multiple
                  label-in-value
                  placeholder="添加用户"
                  style="margin:0 10px 0 0;width:300px"
                  @on-change="userOnChange">
            <Option v-for="user in userList"
                    :value="user"
                    :key="user"
                    :disabled="JSON.stringify(userSelectList).indexOf(user)>-1">
              {{ user }}
            </Option>
          </Select>

          <!-- 按钮：添加SOP -->
          <Button type="success"
                  size="small"
                  @click="addToUserSelect">添加</Button>

          <!-- tagList -->
          <div style="margin-top:10px">
            <Tag v-for="(item,i) in userSelectList"
                 :key="i"
                 type="border"
                 color="primary"
                 closable
                 @on-close="deleteUserItem(i)">{{item}}</Tag>
          </div>

        </FormItem>

        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="modalShow=false;menuSelectedId = []"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
// mockData
import {
  roleList, // 角色列表
  menuList, // 菜单列表
  userList // 用户列表
} from "./mockData/role";
import {
  // getUserList,
  insertUser,
  updateUser,
  deleteUser
} from "@/api/user/index";
// import { getUseGroupList } from "@/api/userGroup/index";

export default {
  data() {
    return {
      /* 全局 */
      menuList: [], // 全部菜单列表 - select用
      userList: [], // 全部用户列表 - select用
      /* 每页 */
      tableDataOrg: [], // 原始数据
      tableData: [], // 处理后的当页数据
      tableColumns: [
        {
          title: "名称",
          key: "roleName",
          align: "center",
          minWidth: 120
        },
        {
          title: "功能",
          key: "menuFunction",
          // align: "center",
          render: (h, params) => {
            return h("div", [
              params.row.menuFunction.map(item => {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "blue"
                    }
                  },
                  item.functionName
                );
              })
            ]);
          },
          minWidth: 500
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          minWidth: 150,
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
      ], // 表头列项
      pageNum: 1, // 页码
      pageSize: 10, // 每页显示数量
      /* loading */
      tableLoading: false, // table
      buttonLoading: false, // button
      /* modal弹框 */
      modalShow: false, // 是否显示
      modalData: {
        roleName: "",
        menuFunction: [],
        users: []
      }, // 数据 - 获取或提交
      menuSelectList: [], // 已选择的menu - 标签列表
      menuSelectedId: [], // select里选择的menu - id
      menuSelectedData: [], // select里选择的menu - 整个data
      userSelectList: [], // 已选择的user - 标签列表
      userSelectedId: [], // select里选择的user - id
      userSelectedData: [], // select里选择的user - 整个data
      formModalRule: {
        roleName: [
          {
            required: true,
            message: "请输入角色名称",
            trigger: "change"
          },
          {
            type: "string",
            max: 10,
            message: "角色名称过长",
            trigger: "change"
          }
        ]
      }, // form规则
      modalDataType: "" // 类型：insert/edit
    };
  },
  async created() {
    this.getData();
    // 用户组 -> select选框用
    // this.userGroup = (await getUseGroupList()).data.data;
    this.menuList = menuList;
    this.userList = userList;
  },
  methods: {
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        // this.tableDataOrg = (await getUserList()).data.data;
        this.tableDataOrg = roleList;
        this.refreshData();
        this.buttonLoading = false;
        this.tableLoading = false;
      } else {
        // mock数据
        this.tableDataOrg = roleList;
        this.refreshData();
        this.buttonLoading = false;
      }
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
      this.$refs.formModalData.resetFields();
      this.menuSelectList = [];
      this.menuSelectedId = [];
      this.userSelectList = [];
      this.userSelectedId = [];
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(row) {
      this.modalDataType = "edit";
      this.modalData = JSON.parse(JSON.stringify(row));
      this.menuSelectList = this.modalData.menuFunction;
      this.userSelectList = this.modalData.users;
      this.modalShow = true;
    },
    // select框选择的数据发生变化 - menu
    menuOnChange(value) {
      this.menuSelectedData = [];
      value.forEach(item => {
        this.menuSelectedData.push({
          functionName: item.value
          // sop: item.label,
          // qc: getValueByKey(this.sopList, "id", item.value, "qc")
        });
      });
    },
    // 将select框内选择的menu，添加到menuSelectList
    addToMenuSelect() {
      this.menuSelectedData.forEach(item => {
        this.menuSelectList.push(item);
      });
      // console.log(this.menuSelectedData);
      // 清空已选项
      this.menuSelectedId = [];
    },
    // 删除已选择的menu标签
    deleteMenuItem(i) {
      this.menuSelectList.splice(i, 1);
    },
    // select框选择的数据发生变化 - user
    userOnChange(value) {
      this.userSelectedData = [];
      value.forEach(item => {
        this.userSelectedData.push(item.value);
      });
    },
    // 将select框内选择的user，添加到userSelectList
    addToUserSelect() {
      this.userSelectedData.forEach(item => {
        this.userSelectList.push(item);
      });
      // console.log(this.menuSelectedData);
      // 清空已选项
      this.userSelectedId = [];
    },
    // 删除已选择的user标签
    deleteUserItem(i) {
      this.userSelectList.splice(i, 1);
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
                // 接口数据
                const result = (await insertUser(this.modalData)).data.status;
                if (result === 200) {
                  this.$Message.success("添加成功！");
                }
                this.modalShow = false;
                this.getData();
              } else {
                // mock时
                this.modalData.role_id = (
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
                const result = (await updateUser(this.modalData)).data.status;
                if (result === 200) {
                  this.$Message.success("修改成功！");
                }
                this.modalShow = false;
                this.getData();
              } else {
                // mock时
                // console.log(this.modalData.role_id);
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
    // 点击按钮 - 删除
    delete(row) {
      this.$Modal.confirm({
        title: "确定删除该角色？",
        onOk: async () => {
          if (!this.isMock) {
            // 接口数据
            const result = (await deleteUser(row.role_id)).data.status;
            if (result === 200) {
              this.$Message.success("删除成功");
            }
            this.getData();
          } else {
            // mock数据
            this.tableData.forEach((list, i) => {
              if (row.role_id === list.role_id) {
                this.tableDataOrg.splice(i, 1);
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
.v-transfer-dom /deep/ {
  .ivu-modal {
    .ivu-form {
      .menu-function,
      .users {
        margin-bottom: 14px;
      }
    }
  }
}
</style>
