<template>
  <div class="dooya-container">
    <Card>
      <Table :data="tableData"
             :columns="tableColumns"
             stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                :total="tableDataOrg.length"
                :current="1"
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
            :label-width="100">
        <FormItem label="名称："
                  prop="userName">
          <Input type="text"
                 v-model="modalData.userName"></Input>
        </FormItem>
        <FormItem label="用户组："
                  prop="userGroup">
          <Select v-model="modalData.userGroup">
            <Option value="测试组">测试组</Option>
            <Option value="开发组">开发组</Option>
            <Option value="产品组">产品组</Option>
          </Select>
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
import list from './mockData/account';

export default {
  data () {
    return {
      // 原始数据
      tableDataOrg: [],
      // 处理后的当页数据
      tableData: [],
      // 表头列项
      tableColumns: [
        {
          title: '账号',
          key: 'account',
          align: 'center',
          minWidth: 120
        },
        {
          title: '名称',
          key: 'userName',
          align: 'center',
          minWidth: 120
        },
        {
          title: '用户组',
          key: 'userGroup',
          align: 'center',
          minWidth: 120
        },
        {
          title: '登录',
          key: 'loginTime',
          align: 'center',
          render: (h, params) => {
            return h('div', params.row.login ? '是' : '否');
          },
          minWidth: 120
        },
        {
          title: '最近登录时间',
          key: 'loginTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                  icon: 'ios-create-outline'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.row);
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small',
                  icon: params.row.lock ? 'ios-key-outline' : 'ios-key'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.lock(params.row);
                  }
                }
              }),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                  icon: 'md-close'
                },
                on: {
                  click: () => {
                    this.delete(params.row);
                  }
                }
              })
            ]);
          }
        }
      ],
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
      // modal弹框 - 是否显示
      modalShow: false,
      // modal弹框 - 数据
      modalData: {},
      // modal弹框 - form规则
      formModalRule: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
      }
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取首页数据
    getData () {
      this.tableDataOrg = list;
      this.tableData = list.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    // 分页
    changePage (pageNum) {
      this.pageNum = pageNum;
      this.getData();
    },
    // 每页条数变化
    changePageSize (pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    // 点击按钮 - 详情
    edit (row) {
      this.modalShow = true;
      this.modalData = row;
    },
    // 点击表单按钮 - 确定
    handleSubmit () {
      this.$refs.formModalData.validate(valid => {
        if (valid) {
          this.$Message.success('修改成功！');
          this.modalShow = false;
        } else {
          this.$Message.error('修改失败！');
        }
      });
    },
    // 点击表单按钮 - 取消
    handleReset () {
      this.$refs.formModalData.validate(valid => {
        if (valid) {
          this.modalShow = false;
        } else {
          this.$Message.error('有未填写的内容！');
        }
      });
    },
    // 点击按钮 - 锁定/解锁
    lock (row) {
      row.lock = !row.lock;
      this.$Message.success('修改成功');
    },
    // 点击按钮 - 删除
    delete (row) {
      this.$Modal.confirm({
        title: '确定删除该用户？',
        onOk: () => {
          this.tableData.forEach(list => {
            if (row.account === list.account) {
              const index = this.tableDataOrg.indexOf(list);
              this.tableDataOrg.splice(index, 1);
            }
          });
          this.$Message.success('删除成功');
          this.getData();
        },
        closable: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
