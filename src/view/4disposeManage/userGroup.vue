<template>
  <div class="dooya-container">
    <Row :gutter="16">
      <Col :md="12"
           :sm="24"
           :xs="24">
      <Card>
        <p slot="title">
          <!-- <Checkbox @on-change="toggleSelectAll"></Checkbox> -->
          <Icon type="md-people" />
          &nbsp;用户组
        </p>

        <!-- buttons -->
        <!-- <Button slot="extra"
                type="error"
                icon="md-trash"
                size="small"
                style="margin-right:5px"
                @click="batcthDelete">批量删除</Button> -->
        <Button slot="extra"
                type="success"
                icon="md-add"
                size="small"
                @click="insert">用户组</Button>

        <!-- item -->
        <div v-for="(item,index) in userGroup"
             :key="index"
             class="group-item">
          <!-- <Checkbox v-model="item.check"></Checkbox> -->
          <span>{{item.group_name}}</span>
          <div class="group-item-buttons">
            <Button type="primary"
                    icon="ios-create-outline"
                    size="small"
                    style="margin-right:5px"
                    @click="edit(item)">
            </Button>
            <Button type="error"
                    icon="md-close"
                    size="small"
                    @click="deleteGroup(item)">
            </Button>
          </div>
        </div>

        <span class="group-item"></span>

        <!-- Modal -->
        <Modal v-model="modalShow"
               :mask-closable="false"
               :closable="false"
               footer-hide
               :title="isEdit?'用户组详情':'新增用户组'"
               @on-ok="handleSubmit">
          <Form ref="formModalData"
                :model="modalData"
                :rules="formModalRule"
                :label-width="80"
                @submit.native.prevent>
            <FormItem label="名称："
                      prop="group_name">
              <Input type="text"
                     v-model="modalData.group_name"></Input>
            </FormItem>
            <FormItem>
              <Button type="primary"
                      @click="handleSubmit('formModalData')">确定</Button>
              <Button @click="handleReset('formModalData')"
                      style="margin-left: 8px">取消</Button>
            </FormItem>
          </Form>
        </Modal>

      </Card>
      </Col>

    </Row>
  </div>
</template>

<script>
import {
  getUseGroupList,
  // getUserGroupData,
  insertUseGroup,
  updateUseGroup,
  deleteUseGroup
} from "@/api/userGroup/index";
// import userGroup from './mockData/userGroup';

export default {
  name: "inspector",
  data() {
    return {
      // 用户组数据
      // userGroup: userGroup,
      userGroup: [],
      // modal弹框 - 是否显示
      modalShow: false,
      // modal弹框 - 数据
      modalData: {},
      // modal弹框 - form规则
      formModalRule: {
        group_name: [
          { required: true, message: "请输入用户组名称", trigger: "blur" }
        ]
      },
      // 新增 or 编辑
      isEdit: true,
      // 是否已全选
      toggleSelect: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.userGroup = (await getUseGroupList()).data.data;
    },
    // 点击按钮 - 新增
    insert() {
      this.modalData = {};
      this.isEdit = false;
      this.modalShow = true;
    },
    // 点击按钮 - 详情
    async edit(item) {
      this.modalShow = true;
      this.isEdit = true;
      this.modalData = JSON.parse(JSON.stringify(item));
    },
    // 点击表单按钮 - 确定
    handleSubmit() {
      this.$refs.formModalData.validate(async valid => {
        if (valid) {
          switch (this.isEdit) {
            case true:
              if (!this.isMock) {
                // 非mock时
                await updateUseGroup(this.modalData);
                this.getData();
              } else {
                this.$Message.success("修改成功！");
                this.modalShow = false;
              }
              break;
            case false:
              if (!this.isMock) {
                // 非mock时
                await insertUseGroup(this.modalData);
                this.getData();
              } else {
                // mock时
                this.$Message.success("新增成功！");
                this.userGroup.push({
                  group_name: this.modalData.group_name,
                  check: false
                });
                this.modalShow = false;
              }
              break;
          }
        }
        this.modalShow = false;
      });
    },
    // 点击表单按钮 - 取消
    handleReset() {
      // if (this.isEdit) {
      //   this.$refs.formModalData.validate(valid => {
      //     if (valid) {
      this.modalShow = false;
      this.modalData = {};
      //     } else {
      //       this.$Message.error('有未填写的内容！');
      //     }
      //   });
      // } else {
      //   this.modalShow = false;
      // }
    },
    // 点击按钮 - 删除
    deleteGroup(item) {
      this.$Modal.confirm({
        title: "确定删除该用户组？",
        onOk: async () => {
          if (!this.isMock) {
            // 非mock时
            await deleteUseGroup(item.group_id);
            this.getData();
          } else {
            // mock时
            this.userGroup.forEach(group => {
              if (item.group_name === group.group_name) {
                const index = this.userGroup.indexOf(group);
                this.userGroup.splice(index, 1);
              }
            });
            this.$Message.success("删除成功");
          }
        },
        closable: true
      });
    },
    // 点击按钮 - 批量删除
    batcthDelete() {
      const multipleSelection = [];
      this.userGroup.forEach(group => {
        if (group.check === true) {
          multipleSelection.push(group);
        }
      });
      if (multipleSelection.length === 0) {
        this.$Message.warning("未选择数据");
      } else {
        this.$Modal.confirm({
          title: "确定删除该用户组？",
          onOk: () => {
            multipleSelection.forEach(group => {
              if (group.check === true) {
                const index = this.userGroup.indexOf(group);
                this.userGroup.splice(index, 1);
              }
            });
            this.toggleSelect = false;
          },
          closable: true
        });
      }
    },
    // 顶部全选
    toggleSelectAll() {
      this.userGroup.forEach(group => {
        group.check = !this.toggleSelect;
      });
      this.toggleSelect = !this.toggleSelect;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dooya-container /deep/ {
  .ivu-card {
    margin-bottom: 20px;
    .ivu-card-body {
      padding: 0;
    }
    .group-item {
      &:not(:last-child) {
        padding: 15px 16px;
        .ivu-checkbox-default {
          margin-right: 12px;
        }
      }
      &:not(:nth-last-child(2)) {
        border-bottom: 1px solid #e8eaec;
      }
      &-buttons {
        float: right;
      }
    }
  }
}
</style>
