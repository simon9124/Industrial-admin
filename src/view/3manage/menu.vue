<template>
  <div class="dooya-container">
    <Card>
      <Row :gutter="20">

        <!-- left -->
        <Col :span="6">

        <!-- 操作 -->
        <Alert show-icon>当前选择：
          <span style="color:#2d8cf0;font-weight:bold;margin-right:10px">{{modalData.title}}</span>
          <span class="cancel"
                v-if="modalData.title!==''"
                style="color:#2d8cf0;cursor: pointer"
                @click="()=>{insert();if(menuType==='first'){modalData.parenetId='root'}}">取消选择</span>
        </Alert>

        <!-- tree -->
        <div v-for="(menu,i) in menuList"
             :key="i">
          <Tree :ref="'menu'+i"
                :data="[menu]"
                :render="renderContent"></Tree>
          <!-- show-checkbox -->
          <Spin size="large"
                fix
                v-if="treeLoading"></Spin>
        </div>

        </Col>

        <!-- right -->
        <Col :span="10">

        <!-- form -->
        <Form ref="formModalData"
              :model="modalData"
              :rules="formModalRule"
              :label-width="100"
              @submit.native.prevent>
          <FormItem label="类型："
                    class="menu-type">
            <Icon :type="menuType==='first'?'ios-list-box-outline':'ios-document-outline'" />
            {{menuType==='first'?'模块菜单':'页面菜单'}}
            <Button type="success"
                    icon="md-add"
                    size="small"
                    style="margin-left:10px"
                    :disabled="menuType==='first'"
                    @click="insert();menuType='first';modalData.parenetId='root'">新增模块</Button>
            <Button type="success"
                    icon="md-add"
                    size="small"
                    style="margin-left:10px"
                    :disabled="menuType==='notFirst'"
                    @click="insert();menuType='notFirst'">新增页面</Button>
          </FormItem>
          <FormItem label="上级："
                    prop="parenetId">
            <Input v-if="menuType==='first'"
                   type="text"
                   disabled
                   v-model.trim="modalData.parenetId"></Input>
            <Select v-else
                    v-model="modalData.parenetId">
              <Option v-for="menu in menuList"
                      :value="menu.id"
                      :key="menu.id">{{ menu.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="系统名："
                    prop="name">
            <Input type="text"
                   v-model.trim="modalData.name"
                   placeholder="英文系统名，20个字符以内"></Input>
          </FormItem>
          <FormItem label="展现名："
                    prop="title">
            <Input type="text"
                   v-model.trim="modalData.title"
                   placeholder="中文展现名，8个字符以内"></Input>
          </FormItem>
          <FormItem label="路径："
                    prop="url">
            <Input type="text"
                   v-model.trim="modalData.url"
                   placeholder="地址栏路径"></Input>
          </FormItem>
          <FormItem v-if="menuType!=='first'"
                    label="组件："
                    prop="path">
            <Input type="text"
                   v-model.trim="modalData.path"
                   placeholder="前端组件路径"></Input>
          </FormItem>
          <FormItem v-else
                    label="图标："
                    prop="ico">
            <icon-choose v-model="modalData.ico"></icon-choose>
          </FormItem>
          <FormItem label="排序："
                    prop="sort">
            <Input type="number"
                   v-model.trim="modalData.sort"
                   @on-keypress="taskCountOnPress"
                   @on-keyup="taskCountOnUp"></Input>
          </FormItem>
          <FormItem label="描述："
                    prop="description">
            <Input type="text"
                   v-model.trim="modalData.description"></Input>
          </FormItem>

          <FormItem>
            <Button type="primary"
                    @click="handleSubmit('formModalData')"
                    :loading="buttonLoading">{{modalDataType==='insert'?'新增':'保存修改'}}</Button>
            <Button @click="()=>{insert();if(menuType==='first'){modalData.parenetId='root'}}"
                    style="margin-left: 8px">{{modalDataType==='insert'?'清空':'新增'}}
            </Button>
            <Button v-if="modalDataType!=='insert'"
                    type="error"
                    @click="deleteMenu(modalData)"
                    style="margin-left: 8px">删除
            </Button>
          </FormItem>
        </Form>

        </Col>

      </Row>
    </Card>

  </div>
</template>

<script>
// mockData
import { menuList } from "./mockData/role"; // 菜单列表
// function
import {
  computedMenuData, // 菜单数据转换成iview树形数据结构(2层)
  arraySort, // 对象数组根据key排序
  resultCallback // 根据请求的status执行回调函数
  // getValueByKey // 根据对象数组某个key的value，查询另一个key的value
} from "@/libs/dataHanding";
import {
  getAllMenus, // 获取全部菜单
  addMenu, // 新增菜单
  updateMenu, // 更新菜单
  removeMenu // 删除菜单
} from "@/api/menu/index";
import IconChoose from "@/components/icons/icon-choose";

export default {
  components: {
    IconChoose
  },
  data() {
    return {
      /* 全局 */
      menuList: [], // 全部菜单列表 - 渲染后的tree
      /* 每页 */
      tableDataOrg: [], // 原始数据
      /* loading */
      treeLoading: false, // tree
      buttonLoading: false, // button
      /* modal弹框 */
      modalData: {
        name: "",
        title: "",
        url: "",
        path: "",
        sort: 0,
        parenetId: "",
        parenetPath: "",
        ico: "",
        description: "",
        children: []
      }, // 数据 - 获取或提交
      modalDataOrg: {}, // 数据 - 行内原始
      formModalRule: {
        name: [
          { required: true, message: "请输入系统名", trigger: "change" },
          { type: "string", max: 20, message: "系统名过长", trigger: "change" }
        ],
        title: [
          { required: true, message: "请输入展现名", trigger: "change" },
          { type: "string", max: 8, message: "展现名过长", trigger: "change" }
        ],
        url: [
          { required: true, message: "请输入地址栏路径", trigger: "change" }
        ],
        path: [
          { required: true, message: "请输入前端组件路径", trigger: "change" }
        ],
        parenetId: [
          { required: true, message: "请选择上级菜单", trigger: "change" }
        ],
        sort: [
          // { required: true, message: "请填写排序值", trigger: "change" }
          // { type: "string", max: 4, message: "排序值过大", trigger: "change" }
        ]
      }, // form规则
      modalDataType: "insert", // 类型：insert/edit
      menuType: "notFirst" // 菜单级别：first/notFirst
    };
  },
  async created() {
    this.getData();
  },
  methods: {
    // 获取首页数据
    async getData() {
      if (!this.isMock) {
        // 接口数据
        this.treeLoading = true;
        this.menuList = computedMenuData((await getAllMenus()).data.data || []);
        this.buttonLoading = false;
        this.treeLoading = false;
      } else {
        // mock数据
        this.menuList = computedMenuData(menuList);
        this.refreshData();
        this.buttonLoading = false;
      }
    },
    // 自定义菜单树的节点内容
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%",
            cursor: "pointer"
          },
          on: {
            click: () => {
              this.menuOnSelect(data);
            }
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: data.ico
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ])
        ]
      );
    },
    // 根据条件刷新数据
    refreshData() {
      // 按"id"升序
      this.tableDataOrg.sort(arraySort("role_id", "asc"));
    },
    // 点击按钮 - 新增
    insert() {
      this.modalDataType = "insert";
      // 强行重置表单
      this.modalData = {
        name: "",
        title: "",
        url: "",
        path: "",
        sort: 0,
        parenetId: "",
        parenetPath: "",
        ico: "",
        description: "",
        children: []
      };
      this.$refs.formModalData.resetFields();
    },
    // 选中菜单
    menuOnSelect(value) {
      this.modalDataType = "edit";
      // console.log(value);
      this.modalDataOrg = value;
      this.modalData = JSON.parse(JSON.stringify(value));
      this.menuType =
        this.modalData.parenetId === "root" ? "first" : "notFirst";
    },
    // 数量校验 - 禁止输入e和E和-和.
    taskCountOnPress(event) {
      if (
        event.key === "e" ||
        event.key === "E" ||
        event.key === "-" ||
        event.key === "."
      ) {
        event.preventDefault();
      }
    },
    // 数量校验 - 去掉0开头
    taskCountOnUp(event) {
      if (event.srcElement.value.slice(0, 1) === "0" && event.key === "0") {
        event.srcElement.value = parseInt(event.srcElement.value);
      }
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      // console.log(this.modalData);
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          this.buttonLoading = true;
          this.modalData.sort = parseInt(this.modalData.sort);
          switch (this.modalDataType) {
            case "insert":
              if (!this.isMock) {
                // 接口数据
                const result = (await addMenu(this.modalData)).data.status;
                resultCallback(
                  result,
                  "新增成功！",
                  () => {
                    this.getData();
                    this.insert();
                    this.buttonLoading = false;
                  },
                  () => {
                    this.buttonLoading = false;
                  }
                );
              } else {
                // mock时
                this.modalData.role_id = (
                  this.tableDataOrg.length + 1
                ).toString();
                if (
                  this.tableDataOrg.some(
                    item => item.roleName === this.modalData.roleName
                  )
                ) {
                  this.$Message.error("该角色已存在！");
                  this.buttonLoading = false;
                } else {
                  this.tableDataOrg.push(
                    JSON.parse(JSON.stringify(this.modalData))
                  );
                  resultCallback(200, "添加成功！", () => {
                    this.refreshData();
                    this.buttonLoading = false;
                  });
                }
              }
              break;
            case "edit":
              if (!this.isMock) {
                // 非mock时
                const result = (await updateMenu(this.modalData)).data.status;
                resultCallback(
                  result,
                  "修改成功！",
                  () => {
                    this.getData();
                    this.buttonLoading = false;
                  },
                  () => {
                    this.buttonLoading = false;
                  }
                );
              } else {
                // mock时
                // 判断重复
                if (
                  this.tableDataOrg.some(
                    item => item.roleName === this.modalData.roleName
                  ) &&
                  this.modalData.roleName !== this.modalDataOrg.roleName
                ) {
                  this.$Message.error("该角色已存在！");
                  this.buttonLoading = false;
                } else {
                  resultCallback(200, "修改成功！", () => {
                    this.refreshData();
                    this.buttonLoading = false;
                  });
                }
              }
              break;
          }
        }
      });
    },
    // 点击按钮 - 删除
    deleteMenu(data) {
      if (data.children.length !== 0) {
        this.$message.error("请先删除或解绑该菜单下的子菜单");
      } else {
        this.$Modal.confirm({
          title: "确定删除？",
          onOk: async () => {
            if (!this.isMock) {
              // 接口数据
              const result = (await removeMenu(data.id)).data.status;
              resultCallback(result, "删除成功！", () => {
                this.getData();
                this.insert();
              });
            } else {
              // mock数据
              resultCallback(200, "删除成功！", () => {
                this.refreshData();
              });
            }
          },
          closable: true
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-alert {
    // .cancel {
    //   cursor: pointer;
    // }
  }
  .ivu-tree {
    &-children {
      li {
        margin: 10px 0;
      }
    }
  }
  .ivu-form {
    .menu-type i {
      font-size: 16px;
      vertical-align: sub;
    }
  }
}
</style>
