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

    <!-- Modal - 角色 -->
    <Modal v-model="modalShowRole"
           :mask-closable="false"
           :closable="false"
           footer-hide
           :title="modalDataRoleType==='edit'?'编辑角色':'新增角色'"
           @on-ok="handleSubmitRole">
      <Form ref="formModalDataRole"
            :model="modalDataRole"
            :rules="formModalRule"
            :label-width="100"
            @submit.native.prevent>
        <FormItem label="名称："
                  prop="title">
          <Input type="text"
                 v-model.trim="modalDataRole.title"></Input>
        </FormItem>
        <FormItem label="描述："
                  prop="description">
          <Input type="text"
                 v-model.trim="modalDataRole.description"></Input>
        </FormItem>

        <FormItem>
          <Button type="primary"
                  @click="handleSubmitRole('formModalDataRole')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="modalShowRole=false"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- Modal - 用户 -->
    <Modal v-model="modalShowUser"
           :mask-closable="false"
           :closable="false"
           footer-hide
           title="关联用户"
           @on-ok="handleSubmitUser">
      <Form ref="formModalDataUser"
            :model="modalDataUser"
            :label-width="60"
            @submit.native.prevent>
        <FormItem label="用户："
                  prop="users"
                  class="users">

          <Select v-model="userSelectedId"
                  filterable
                  multiple
                  label-in-value
                  placeholder="添加用户"
                  style="margin:0 10px 0 0;width:340px"
                  @on-change="userOnChange">
            <Option v-for="(user,i) in userList"
                    :value="user.user_id"
                    :key="i"
                    :disabled="JSON.stringify(tableDataOrg).indexOf(user.display_name)>-1">
              {{ user.display_name }}
            </Option>
          </Select>

          <Button type="success"
                  size="small"
                  @click="addToUserSelect">添加</Button>

          <div style="margin-top:10px">
            <Tag v-for="(item,i) in userSelectList"
                 :key="i"
                 type="border"
                 color="primary"
                 closable
                 @on-close="deleteUserItem(i)">{{item.display_name}}</Tag>
          </div>

        </FormItem>

        <FormItem>
          <Button type="primary"
                  @click="handleSubmitUser('formModalDataUser')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="modalShowUser=false;userSelectedId = []"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

    <!-- Modal - 菜单 -->
    <Modal v-model="modalShowMenu"
           :mask-closable="false"
           :closable="false"
           footer-hide
           title="关联菜单"
           @on-ok="handleSubmitMenu">
      <Form ref="formModalDataMenu"
            :model="modalDataMenu"
            :label-width="60"
            @submit.native.prevent>
        <FormItem label="菜单："
                  prop="menus"
                  class="menu-function">

          <div v-for="(menu,i) in menuList"
               :key="i">
            <Tree :ref="'menu'+i"
                  :data="[menu]"
                  show-checkbox></Tree>
          </div>
        </FormItem>

        <FormItem>
          <Button type="primary"
                  @click="handleSubmitMenu('formModalDataMenu')"
                  :loading="buttonLoading">确定</Button>
          <Button @click="modalShowMenu=false;menuSelectedId=[];
                          menuList=JSON.parse(JSON.stringify(menuListOrg))"
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
// function
import {
  computedMenuData, // 菜单数据转换成iview树形数据结构(2层)
  arraySort, // 对象数组根据key排序
  resultCallback // 根据请求的status执行回调函数
  // getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
// api
import {
  getRolelist, // 获取角色列表
  addRole, // 新增角色
  updateRole, // 更新角色
  removeRole, // 删除角色
  getUsersByRole, // 根据角色id获取关联的用户
  updateRoleUser, // 角色 - 用户关系维护
  getMenusByRole, // 根据角色id获取关联的菜单
  updateRoleMenu // 角色 - 菜单关系维护
  // updateRoleMenu // 角色菜单关系维护
} from "@/api/role/index";
import { getUserList } from "@/api/user/index"; // 获取全部用户
import { getAllMenus } from "@/api/menu/index"; // 获取全部菜单

export default {
  data() {
    return {
      /* 全局 */
      userList: [], // 全部用户列表 - select用
      menuListOrg: [], // 全部菜单列表 - 原始数据
      menuList: [], // 全部菜单列表 - 渲染后的tree
      roleId: "", // 角色id - 维护关系用
      /* 每页 */
      tableDataOrg: [], // 原始数据
      tableData: [], // 处理后的当页数据
      tableColumns: [
        {
          title: "名称",
          key: "title",
          align: "center",
          minWidth: 120
        },
        {
          title: "功能",
          key: "menus",
          // align: "center",
          render: (h, params) => {
            return h("div", [
              params.row.menus.map(item => {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "blue"
                    }
                  },
                  !this.isMock ? item : item.functionName
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
                    content: "关联用户",
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  h("Button", {
                    props: {
                      type: "success",
                      size: "small",
                      icon: "ios-person-outline"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.relateUsers(params.row);
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
                    content: "关联菜单",
                    placement: "top",
                    transfer: true
                  }
                },
                [
                  h("Button", {
                    props: {
                      type: "info",
                      size: "small",
                      icon: "ios-menu-outline"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.relateMenus(params.row);
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
      modalShowRole: false, // 是否显示 - role
      modalShowUser: false, // 是否显示 - user
      modalShowMenu: false, // 是否显示 - menu
      modalDataRole: {
        title: "",
        description: ""
        // menus: [],
        // users: []
      }, // 数据 - role
      modalDataUser: {
        users: []
      }, // 数据 - user
      modalDataMenu: {
        menus: []
      }, // 数据 - menu
      modalDataRoleOrg: {}, // 数据 - role行内原始
      userSelectList: [], // 已选择的user - 标签列表
      userSelectedId: [], // select里选择的user - id
      userSelectedData: [], // select里选择的user - 整个data
      menuSelectList: [], // 已选择的menu - 接口数据
      menuSelectedId: [], // tree提交的menu - id
      // menuSelectedData: [], // tree里选择的menu - 整个data
      formModalRule: {
        title: [
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
        ],
        description: [
          {
            type: "string",
            max: 100,
            message: "描述过长",
            trigger: "change"
          }
        ]
      }, // form规则
      modalDataRoleType: "" // 类型：insert/edit
    };
  },
  async created() {
    this.getData();
    // 设置menuList的副本，每次关联时以副本为基准清空已选项
    this.menuListOrg = !this.isMock
      ? computedMenuData((await getAllMenus()).data.data) || []
      : computedMenuData(menuList);
    this.menuList = JSON.parse(JSON.stringify(this.menuListOrg));
    this.userList = !this.isMock
      ? (await getUserList()).data.data || []
      : userList;
  },
  methods: {
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.tableDataOrg = (await getRolelist()).data.data;
        // this.tableDataOrg = roleList;
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
      // 按"id"升序
      this.tableDataOrg.sort(arraySort("id", "asc"));
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
    /* 角色表单操作 */
    // 点击按钮 - 新增
    insert() {
      this.modalDataRoleType = "insert";
      this.$refs.formModalDataRole.resetFields();
      this.modalShowRole = true;
    },
    // 点击按钮 - 编辑
    async edit(row) {
      this.modalDataRoleType = "edit";
      this.modalDataRoleOrg = row;
      this.modalDataRole = JSON.parse(JSON.stringify(row));
      this.modalShowRole = true;
    },
    // 提交表单 - 角色
    handleSubmitRole() {
      // console.log(this.modalDataRole);
      this.$refs.formModalDataRole.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          switch (this.modalDataRoleType) {
            case "insert":
              if (!this.isMock) {
                // 接口数据
                const result = (await addRole(this.modalDataRole)).data.status;
                resultCallback(
                  result,
                  "添加成功！",
                  () => {
                    this.modalShowRole = false;
                    this.getData();
                  },
                  () => {
                    this.buttonLoading = false;
                  }
                );
                // if (result === 200) {
                //   this.$Message.success("添加成功！");
                // }
                // this.modalShowRole = false;
                // this.getData();
              } else {
                // mock时
                this.modalDataRole.id = (
                  this.tableDataOrg.length + 1
                ).toString();
                // 按"id"升序
                this.menuSelectList.sort(arraySort("functionId", "asc"));
                this.modalDataRole.menus = this.menuSelectList;
                this.modalDataRole.users = this.userSelectList;
                if (
                  this.tableDataOrg.some(
                    item => item.title === this.modalDataRole.title
                  )
                ) {
                  this.$Message.error("该角色已存在！");
                  this.buttonLoading = false;
                } else {
                  this.tableDataOrg.push(
                    JSON.parse(JSON.stringify(this.modalDataRole))
                  );
                  resultCallback(200, "添加成功！", () => {
                    this.refreshData();
                    this.buttonLoading = false;
                    this.modalShowRole = false;
                  });
                }
              }
              break;
            case "edit":
              if (!this.isMock) {
                // 非mock时
                const result = (await updateRole(this.modalDataRole)).data
                  .status;
                resultCallback(
                  result,
                  "修改成功！",
                  () => {
                    this.modalShowRole = false;
                    this.getData();
                  },
                  () => {
                    this.buttonLoading = false;
                  }
                );
              } else {
                // mock时
                // 按"id"升序
                this.menuSelectList.sort(arraySort("functionId", "asc"));
                // 判断重复
                if (
                  this.tableDataOrg.some(
                    item => item.title === this.modalDataRole.title
                  ) &&
                  this.modalDataRole.title !== this.modalDataRoleOrg.title
                ) {
                  this.$Message.error("该角色已存在！");
                  this.buttonLoading = false;
                } else {
                  this.$set(
                    this.tableDataOrg,
                    (this.pageNum - 1) * this.pageSize +
                      this.modalDataRole._index,
                    JSON.parse(JSON.stringify(this.modalDataRole))
                  );
                  resultCallback(200, "修改成功！", () => {
                    this.refreshData();
                    this.buttonLoading = false;
                    this.modalShowRole = false;
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
      if (row.users.length !== 0) {
        this.$message.error("该角色已关联用户，请先解除关联");
      } else if (row.menus.length !== 0) {
        this.$Modal.confirm({
          title: "删除角色将删除角色菜单关联，是否删除？",
          onOk: async () => {
            this.deleteOnOK(row);
          },
          closable: true
        });
      } else {
        this.$Modal.confirm({
          title: "确定删除该角色？",
          onOk: async () => {
            this.deleteOnOK(row);
          },
          closable: true
        });
      }
    },
    // 确认删除事件
    async deleteOnOK(row) {
      if (!this.isMock) {
        // 接口数据
        const result = (await removeRole(row.id)).data.status;
        resultCallback(result, "删除成功！", () => {
          this.getData();
        });
      } else {
        // mock数据
        this.tableDataOrg
          .slice(
            (this.pageNum - 1) * this.pageSize,
            this.pageNum * this.pageSize
          )
          .forEach((list, i) => {
            if (row.id === list.id) {
              this.tableDataOrg.splice(i, 1);
            }
          });
        resultCallback(200, "删除成功！", () => {
          this.refreshData();
        });
      }
    },
    /* 用户表单操作 */
    // 点击按钮 - 关联用户
    async relateUsers(row) {
      this.roleId = row.id;
      this.userSelectList = (await getUsersByRole(row.id)).data.data || [];
      this.modalShowUser = true;
    },
    // select框选择的数据发生变化 - user
    userOnChange(value) {
      this.userSelectedData = [];
      value.forEach(item => {
        this.userSelectedData.push({
          user_id: item.value,
          display_name: item.label
        });
      });
    },
    // 将select框内选择的user，添加到userSelectList
    addToUserSelect() {
      this.userSelectedData.forEach(item => {
        this.userSelectList.push(item);
      });
      // console.log(this.userSelectList);
      // 清空已选项
      this.userSelectedId = [];
    },
    // 删除已选择的user标签
    deleteUserItem(i) {
      this.userSelectList.splice(i, 1);
    },
    // 提交表单 - 用户
    async handleSubmitUser() {
      this.buttonLoading = true;
      const userIds = [];
      this.userSelectList.forEach(user => {
        userIds.push(user.user_id);
      });
      // console.log(userIds);
      const result = (
        await updateRoleUser({
          roleId: this.roleId,
          userIds: userIds
        })
      ).data.status;
      resultCallback(
        result,
        "修改成功！",
        () => {
          this.modalShowUser = false;
          this.getData();
        },
        () => {
          this.buttonLoading = false;
        }
      );
    },
    /* 菜单表单操作 */
    // 点击按钮 - 关联菜单
    async relateMenus(row) {
      this.roleId = row.id;
      this.menuSelectList = (await getMenusByRole(row.id)).data.data;
      // 根据menuSelectList，动态渲染menuList已选中的选项
      if (this.menuList.length > 0) {
        this.menuList.forEach(menu => {
          if (menu.children.length === 0) {
            // 如果没有子节点
            if (JSON.stringify(this.menuSelectList).indexOf(menu.title) > -1) {
              this.$set(menu, "checked", true);
            }
          } else {
            // 如果有子节点
            menu.children.forEach(_menu => {
              if (
                JSON.stringify(this.menuSelectList).indexOf(_menu.title) > -1
              ) {
                this.$set(_menu, "checked", true);
              }
            });
          }
        });
      }
      this.modalShowMenu = true;
    },
    // 提交表单 - 菜单
    async handleSubmitMenu() {
      /* 1获取所有的tree中被勾选的节点，concat成一个数组（数组对象） */
      let menuSelected = [];
      this.menuList.forEach((menu, i) => {
        let menuRef = "menu" + i;
        menuSelected = menuSelected.concat(
          this.$refs[menuRef][0].getCheckedNodes()
        );
      });
      // console.log(menuSelected);
      /* 2.将所有被勾选的节点（数组对象），处理成只保留id的一维数组 */
      this.menuSelected = [];
      menuSelected.forEach(menu => {
        this.menuSelected.push(menu.id);
      });
      // console.log(this.menuSelected);
      /* 3.调用接口 */
      const result = (
        await updateRoleMenu({
          roleId: this.roleId,
          menuIds: this.menuSelected
        })
      ).data.status;
      resultCallback(
        result,
        "修改成功！",
        () => {
          this.modalShowMenu = false;
          this.getData();
          // 清空选项
          this.menuList = JSON.parse(JSON.stringify(this.menuListOrg));
        },
        () => {
          this.buttonLoading = false;
        }
      );
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
      .ivu-tree {
        &-children {
          li {
            margin: 0;
          }
        }
      }
    }
  }
}
</style>
