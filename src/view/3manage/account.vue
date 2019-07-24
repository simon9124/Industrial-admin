<template>
  <div class="dooya-container">
    <Card>
      <Table :data="tableData"
             :columns="tableColumns"
             stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="tableDataOrg.length"
                :current="1"
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </Card>
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
          key: 'account',
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
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.row);
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.show(params.row);
                    }
                  }
                },
                '锁定'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.show(params.row);
                    }
                  }
                },
                '删除'
              )
            ]);
          }
        }
      ],
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10
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
    show (row) {
      // console.log(row);
      const result = row.result === 1 ? '合格' : '不合格';
      this.$Modal.info({
        title: row.number,
        content: `线号：${row.lineNumber}<br>综合测试检测人：${row.testInspector}<br>静音间检测人：${row.muteInspector}<br>外观检测人：${row.appearanceInspector}<br>检测结果：${result}`,
        closable: true
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
