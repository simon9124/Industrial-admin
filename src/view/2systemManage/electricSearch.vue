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
          minWidth: 120
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
          minWidth: 120
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
          minWidth: 120
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          width: 120,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  }
                  // on: {
                  //     click: () => {
                  //         this.show(params.index)
                  //     }
                  // }
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
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
