<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <!-- :dot="!!messageUnreadCount" -->
      <Badge>
        <!-- <Avatar v-if="userAvator!==''"
                :src="userAvator" /> -->
        <img class="img-avator"
             src="@/assets/images/userAvatar.jpg" />
      </Badge>
      <Icon :size="18"
            type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <!-- <DropdownItem name="message">
          消息中心<Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem> -->
        <DropdownItem name="editUserPassword">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <!-- 修改密码 -->
    <Modal v-model="modalShow"
           :mask-closable="false"
           :closable="false"
           footer-hide
           title="账号详情"
           @on-ok="handleSubmit">
      <Form ref="formModalData"
            :model="modalData"
            :rules="formModalRule"
            :label-width="80"
            @submit.native.prevent>
        <FormItem label="账号："
                  prop="userName">
          <Input type="text"
                 disabled
                 v-model="modalData.userName"></Input>
        </FormItem>
        <FormItem label="原密码："
                  prop="oldPassword">
          <Input type="password"
                 v-model="modalData.oldPassword"></Input>
        </FormItem>
        <FormItem label="新密码："
                  prop="newPassword">
          <Input type="password"
                 v-model="modalData.newPassword"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary"
                  @click="handleSubmit('formModalData')">确定</Button>
          <Button @click="handleReset('formModalData')"
                  style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
import "./user.less";
import { mapActions, mapGetters } from "vuex";
// api
import { editUserPassword } from "@/api/login";
// import userAvator from '@/assets/images/userAvatar.jpg';

export default {
  name: "User",
  data() {
    return {
      // userAvator
      /* modal弹框 */
      modalShow: false, // 是否显示
      modalData: {}, // 数据
      formModalRule: {
        userName: [
          { required: true, message: "请填写用户名", trigger: "blur" }
        ],
        oldPassword: [
          { required: true, message: "请填写原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "请填写新密码", trigger: "blur" }
        ]
      } // form规则
    };
  },
  props: {
    userAvator: {
      type: String,
      default: ""
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(["userName"])
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    logout() {
      this.handleLogOut().then(() => {
        this.$router.push({
          path: "/login",
          name: "login",
          query: {
            lineNo: localStorage.getItem("loginLineNo")
          }
        });
      });
    },
    message() {
      this.$router.push({
        name: "message_page"
      });
    },
    handleClick(name) {
      switch (name) {
        case "editUserPassword":
          this.modalData = {};
          this.modalData.userName = this.userName;
          this.modalShow = true;
          break;
        case "logout":
          this.logout();
          break;
        case "message":
          this.message();
          break;
      }
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          if (!this.isMock) {
            const result = await editUserPassword(this.modalData);
            if (result.data.status === 200) {
              this.$Message.success("修改成功");
              this.modalShow = false;
            }
          } else {
            this.$Message.success("修改成功");
            this.modalShow = false;
          }
        }
      });
    },
    // 点击表单按钮 - 取消
    handleReset() {
      this.modalShow = false;
      this.$refs.formModalData.resetFields();
      this.modalData = {};
    }
  }
};
</script>
