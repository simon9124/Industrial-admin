<template>
  <div class="dooya-container">
    <Card>
      <Table :data="tableData"
             :columns="tableColumns"
             stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="100"
                :current="1"
                @on-change="changePage"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Mock from 'mockjs';

export default {
  data () {
    return {
      tableData: this.mockTableData(),
      tableColumns: [
        {
          title: '编号',
          key: 'number',
          align: 'center',
          minWidth: 150
        },
        {
          title: '线号',
          key: 'lineNumber',
          align: 'center',
          minWidth: 100
        },
        {
          title: '综合测试',
          key: 'testing',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const color = row.testing === 1 ? 'success' : 'error';
            const text = row.testing === 1 ? '合格' : '不合格';
            return h(
              'Tag',
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: '综合测试开始时间',
          key: 'testBeginTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: '综合测试检测人',
          key: 'testInspector',
          align: 'center',
          minWidth: 120
        },
        {
          title: '静音结果',
          key: 'mute',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const color = row.mute === 1 ? 'success' : 'error';
            const text = row.mute === 1 ? '合格' : '不合格';
            return h(
              'Tag',
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: '静音开始时间',
          key: 'muteBeginTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: '静音间检测人',
          key: 'muteInspector',
          align: 'center',
          minWidth: 120
        },
        {
          title: '外观检测人',
          key: 'appearanceInspector',
          align: 'center',
          minWidth: 120
        },
        {
          title: '检测结果',
          key: 'result',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const text =
              row.testing === 1 && row.mute === 1 ? '合格' : '不合格';
            const color = text === '合格' ? 'success' : 'error';
            return h(
              'Tag',
              {
                props: {
                  color: color
                }
              },
              text
            );
          },
          minWidth: 100
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 100,
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
                  on: {
                    click: () => {
                      this.show(params.row);
                    }
                  }
                },
                '详情'
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    // mock数据
    mockTableData () {
      let data = [];
      for (let i = 0; i < 10; i++) {
        data.push({
          number:
            '22Y13060E00' +
            Math.floor(Math.random() * 9) +
            Math.floor(Math.random() * 9),
          lineNumber: Math.floor(Math.random() * 99) + '#线',
          testing: Math.floor(Math.random() * 2 + 1),
          testBeginTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          testInspector: Mock.mock('@cname'),
          mute: Math.floor(Math.random() * 2 + 1),
          muteBeginTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
          muteInspector: Mock.mock('@cname'),
          appearanceInspector: Mock.mock('@cname'),
          result: Math.floor(Math.random() * 2 + 1)
        });
      }
      return data;
    },
    // 分页
    changePage () {
      this.tableData = this.mockTableData();
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
