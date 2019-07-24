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
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import list from './mockData.js';

export default {
  data () {
    return {
      tableData: [],
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
          render: (h, params) => {
            const text = params.row.lineNumber;
            return h('div', text);
          },
          minWidth: 100
        },
        {
          title: '综合测试',
          key: 'testing',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const color = row.testing ? 'success' : 'error';
            const text = row.testing ? '合格' : '不合格';
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
            const color = row.mute ? 'success' : 'error';
            const text = row.mute ? '合格' : '不合格';
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
          key: 'appearance',
          align: 'center',
          render: (h, params) => {
            const row = params.row;
            const color = row.appearance === 1 ? 'success' : 'error';
            const text = row.appearance === 1 ? '合格' : '不合格';
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
      ],
      pageNum: 1,
      pageSize: 10
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取首页数据
    getData () {
      // 数据处理
      list.forEach(row => {
        this.$set(
          row,
          'veer',
          row.veer1Slip === 1 && row.veer2Slip === 1 && row.veer3Slip === 1
        );
        this.$set(
          row,
          'turn',
          row.turn1Slip === 1 && row.turn2Slip === 1 && row.turn3Slip === 1
        );
        this.$set(row, 'testing', row.veer && row.turn);
        this.$set(
          row,
          'mute',
          row.lowPressure === 1 &&
            row.decibel === 1 &&
            row.landing === 1 &&
            row.pressurization === 1
        );
        return row;
      });
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
