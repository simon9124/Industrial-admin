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
        <FormItem label="标识："
                  prop="name">
          <Input type="text"
                 v-model.trim="modalDataRole.name"
                 :disabled="modalDataRoleOrg.name==='admin'
                          ||modalDataRoleOrg.name==='cestc'
                          ||modalDataRoleOrg.name==='workshop_manager'
                          ||modalDataRoleOrg.name==='proline_leader'
                          ||modalDataRoleOrg.name==='test'"></Input>
        </FormItem>
        <FormItem label="名称："
                  prop="title">
          <Input type="text"
                 v-model.trim="modalDataRole.title"></Input>
        </FormItem>
        <FormItem label="上级："
                  prop="parentId">
          <Select v-model="modalDataRole.parentId">
            <Option v-for="(role,i) in roleSubList"
                    :value="role.id"
                    :key="i">
              {{ role.title }}
            </Option>
          </Select>
          <!-- <Input type="text"
                 v-model.trim="modalDataRole.parentId"></Input> -->
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
                    :value="user.id"
                    :key="i"
                    :disabled="JSON.stringify(userSelectList).indexOf(user.displayName)>-1">
              <!-- :disabled="JSON.stringify(userSelectList).indexOf(user.displayName)>-1" -->
              {{ user.displayName }}
            </Option>
          </Select>

          <Button type="success"
                  size="small"
                  @click="addToUserSelect">添加
          </Button>

          <div style="margin-top:10px">
            <Tag v-for="(item,i) in userSelectList"
                 :key="i"
                 type="border"
                 color="primary"
                 closable
                 @on-close="deleteUserItem(i)">{{item.displayName}}</Tag>
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
// vuex
import { mapGetters } from "vuex";
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
  resultCallback, // 根据请求的status执行回调函数
  getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
// api
import {
  getRolelist, // 获取角色列表
  getRoles, // 查询角色的下级角色
  addRole, // 新增角色
  updateRole, // 更新角色
  removeRole, // 删除角色
  getUsersByRole, // 根据角色id获取关联的用户
  updateRoleUser, // 角色 - 用户关系维护
  getMenusByRole, // 根据角色id获取关联的菜单
  updateRoleMenu // 角色 - 菜单关系维护
} from "@/api/role/index";
import { getUserList } from "@/api/user/index"; // 获取全部用户
import { getAllMenus } from "@/api/menu/index"; // 获取全部菜单

export default {
  data() {
    return {
      /* 全局 */
      userList: [], // 全部用户列表 - select用
      menuListNotComputed: [], // 全部菜单列表 - 原始数据未处理
      menuListOrg: [], // 全部菜单列表 - 原始数据处理后
      menuList: [], // 全部菜单列表 - 渲染后的tree
      roleSubList: [], // 当前角色的下级角色列表
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
          render: (h, params) => {
            return h("div", [
              params.row.menus.map(item => {
                return h(
                  "Tag",
                  {
                    props: {
                      color: "blue"
                    },
                    style: {
                      /* eslint-disable */
                      display:
                        getValueByKey(
                          this.menuListNotComputed,
                          this.isMock ? "id" : "title",
                          this.isMock ? item.id : item,
                          "path"
                        ) !== ""
                          ? "inline-block"
                          : "none"
                    }
                  },
                  !this.isMock ? item : item.title
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
                      icon: "md-close",
                      disabled:
                        params.row.name === "admin" ||
                        params.row.name === "cestc" ||
                        params.row.name === "workshop_manager" ||
                        params.row.name === "proline_leader" ||
                        params.row.name === "test"
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
        name: "",
        title: "",
        parentId: "",
        description: ""
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
      formModalRule: {
        name: [
          {
            required: true,
            message: "请输入角色标识",
            trigger: "change"
          },
          {
            type: "string",
            max: 30,
            message: "角色标识过长",
            trigger: "change"
          }
        ],
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
        parentId: [
          {
            required: true,
            message: "请选择上级角色",
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
  computed: {
    ...mapGetters(["userAccess"])
  },
  async created() {
    this.init();
    this.getData();
    this.getSubList();
  },
  methods: {
    // 初始化页面 -> userList 和 menuList
    async init() {
      // 未处理的menu数据 -> 非isMock时功能列表筛选用
      this.menuListNotComputed = !this.isMock
        ? (await getAllMenus()).data.data || []
        : menuList;
      // 设置menuList的副本，每次关联时以副本为基准清空已选项
      this.menuListOrg = computedMenuData(this.menuListNotComputed);
      this.menuList = JSON.parse(JSON.stringify(this.menuListOrg));
      this.userList = !this.isMock
        ? (await getUserList()).data.data || []
        : userList;
    },
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.tableLoading = true;
        this.tableDataOrg = (await getRolelist()).data.data;
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
    // 当前角色的可选上级角色列表
    async getSubList() {
      // 接口数据
      this.roleSubList = !this.isMock
        ? (await getRoles()).data.data || []
        : roleList;
      // 根角色 - 只有当前用户角色是admin或cestc时才有
      const rootList = this.userAccess.some(
        role => role.name === "admin" || role.name === "cestc"
      )
        ? [{ id: "root", title: "根角色", parenetId: null }]
        : [];
      // 根角色 + 当前用户的角色(按name值和接口数据比对去重) + 接口数据
      this.roleSubList = rootList
        .concat(
          this.userAccess.filter(role => {
            return this.roleSubList.every(_role => _role.name !== role.name);
          })
        )
        .concat(this.roleSubList);
      // console.log(this.roleSubList);
    },
    // 根据条件刷新数据
    refreshData() {
      if (this.isMock) {
        this.tableDataOrg.sort(arraySort("id", "asc")); // 按"id"升序
        this.tableDataOrg.forEach(role => {
          // 给每个role的users设置displayName
          role.users.forEach(user => {
            this.$set(
              user,
              "displayName",
              getValueByKey(this.userList, "id", user.id, "displayName")
            );
          });
          // 给每个role的menus设置title
          role.menus.forEach(menu => {
            this.$set(
              menu,
              "title",
              getValueByKey(this.menuListNotComputed, "id", menu.id, "title")
            );
          });
        });
        // console.log(this.tableDataOrg);
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
    /* 角色表单操作 */
    // 点击按钮 - 新增
    insert() {
      this.modalDataRoleType = "insert";
      this.$refs.formModalDataRole.resetFields();
      this.modalDataRoleOrg = JSON.parse(JSON.stringify(this.modalDataRole));
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
                /* 接口数据 */
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
              } else {
                /* mock数据 */
                if (
                  this.tableDataOrg.some(
                    item => item.name === this.modalDataRole.name
                  )
                ) {
                  this.$Message.error("该角色已存在！");
                  this.buttonLoading = false;
                } else {
                  var id = "1";
                  this.tableDataOrg.forEach(item => {
                    id === item.id && (id = (parseInt(id) + 1).toString());
                  });
                  this.modalDataRole.id = id; // 生成角色id，不能与现有的id重复
                  this.modalDataRole.menus = [];
                  this.modalDataRole.users = [];
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
                /* 接口数据 */
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
                /* mock数据 */
                if (
                  this.tableDataOrg.some(
                    item => item.name === this.modalDataRole.name
                  ) &&
                  this.modalDataRole.name !== this.modalDataRoleOrg.name
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
            row.id === list.id && this.tableDataOrg.splice(i, 1);
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
      this.userSelectList = !this.isMock
        ? (await getUsersByRole(row.id)).data.data || []
        : JSON.parse(JSON.stringify(row)).users;
      this.modalShowUser = true;
    },
    // select框选择的数据发生变化 - user
    userOnChange(value) {
      this.userSelectedData = [];
      value.forEach(item => {
        this.userSelectedData.push({
          id: item.value,
          displayName: item.label
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
      // console.log(this.userSelectList);
      const userIds = []; // 要执行的用户列表
      this.userSelectList.forEach(user => {
        !this.isMock && userIds.push(user.id);
        this.isMock &&
          userIds.push({
            id: user.id,
            displayName: user.displayName
          });
      });
      // console.log(userIds);
      if (!this.isMock) {
        /* 接口数据 */
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
      } else {
        /* mock数据 */
        // 1.在角色列表更新
        this.tableData.forEach((row, i) => {
          row.id === this.roleId && this.$set(row, "users", userIds);
        });
        // console.log(userIds, this.roleId);
        // console.log(this.userList);
        // 2.在用户列表更新
        this.userList.forEach(user => {
          // 判断新增绑定用户：外循环用户列表，内循环要更新的用户列表
          userIds.forEach(_user => {
            // 筛选二者id相同的用户
            if (user.id === _user.id) {
              // console.log(user);
              // 若这些用户的角色不含roleId，则给该用户的角色里添加该角色
              !user.roles.some(role => role.id === this.roleId) &&
                user.roles.push({
                  id: this.roleId,
                  name: getValueByKey(
                    this.tableDataOrg,
                    "id",
                    this.roleId,
                    "title"
                  )
                });
            }
          });
          // 判断删除绑定用户：外循环用户列表，内循环用户的角色
          user.roles.forEach((role, i) => {
            // 筛选角色id与roleId相同的用户 -> 找出包含这个角色的用户
            if (role.id === this.roleId) {
              // console.log(user);
              // 若要执行的更新列表里不含上述用户的id，则删除该id对应用户的该角色
              !userIds.some(_user => user.id === _user.id) &&
                user.roles.splice(i, 1);
            }
          });
        });
        // 3.回调函数
        resultCallback(200, "修改成功！", () => {
          this.refreshData();
          this.modalShowUser = false;
          this.buttonLoading = false;
        });
      }
    },
    /* 菜单表单操作 */
    // 点击按钮 - 关联菜单
    async relateMenus(row) {
      this.roleId = row.id;
      this.menuSelectList = !this.isMock
        ? (await getMenusByRole(row.id)).data.data || []
        : JSON.parse(JSON.stringify(row.menus));
      // console.log(this.menuSelectList);
      // 根据menuSelectList，动态渲染menuList已选中的选项
      this.menuList.length > 0 &&
        this.menuList.forEach(menu => {
          row.parentId === "root" && this.$set(menu, "disableCheckbox", true); // 根角色所有父节点禁止选择
          if (menu.children.length === 0) {
            // 如果没有子节点 -> 选中包含title的父节点
            this.menuSelectList.some(_menu => menu.title === _menu.title) &&
              this.$set(menu, "checked", true);
          } else {
            // 如果有子节点 -> 选中包含title的子节点
            menu.children.forEach(_menu => {
              this.menuSelectList.some(
                __menu => _menu.title === __menu.title
              ) && this.$set(_menu, "checked", true);
              row.parentId === "root" &&
                this.$set(_menu, "disableCheckbox", true); // 根角色所有子节点禁止选择
            });
          }
        });
      this.modalShowMenu = true;
    },
    // 提交表单 - 菜单
    async handleSubmitMenu() {
      this.buttonLoading = true;
      /* 1获取所有的tree中被勾选的节点，concat成一个数组（数组对象） */
      let menuSelected = [];
      this.menuList.forEach((menu, i) => {
        let menuRef = "menu" + i;
        menuSelected = menuSelected.concat(
          // this.$refs[menuRef][0].getCheckedNodes()
          this.$refs[menuRef][0].getCheckedAndIndeterminateNodes()
        );
      });
      // console.log(menuSelected);
      /* 2.处理被勾选的节点数组 -> 非mock时保留id / mock时保留id和title */
      this.menuSelected = [];
      menuSelected.forEach(menu => {
        !this.isMock && this.menuSelected.push(menu.id);
        this.isMock &&
          this.menuSelected.push({
            id: menu.id,
            title: menu.title
          });
      });
      // console.log(this.menuSelected);
      /* 3.调用接口 */
      if (!this.isMock) {
        /* 接口数据 */
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
      } else {
        /* mock数据 */
        this.tableData.forEach((row, i) => {
          if (row.id === this.roleId) {
            this.$set(row, "menus", this.menuSelected);
          }
        });
        resultCallback(200, "修改成功！", () => {
          this.modalShowMenu = false;
          this.refreshData();
          this.buttonLoading = false;
          // 清空选项
          this.menuList = JSON.parse(JSON.stringify(this.menuListOrg));
        });
      }
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
