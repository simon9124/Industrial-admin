<template>
  <div class="dooya-container">
    <Card>
      <!-- 筛选 -->
      <div style="margin: 10px 0">
        <Button style="margin-right: 10px"
                type="success"
                @click="createCode">生成条形码</Button>
        <Button type="primary">批量打印</Button>
      </div>
      <!-- 表格 -->
      <Table :data="tableData"
             :columns="tableColumns"
             stripe
             @on-selection-change="onSelectChange">
      </Table>
      <!-- 分页 -->
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
  </div>
</template>

<script>
import list from './mockData/number';
import JsBarcode from 'jsbarcode';

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
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标识',
          key: 'identification',
          align: 'center',
          minWidth: 120
        },
        {
          title: '同步时间',
          key: 'synchroTime',
          align: 'center',
          minWidth: 150
        },
        {
          title: '编号',
          key: 'number',
          align: 'center',
          minWidth: 150
        },
        {
          title: '是否使用',
          key: 'isUsed',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row;
            const color = row.isUsed === 1 ? 'success' : 'warning';
            const text = row.isUsed === 1 ? '已使用' : '未使用';
            return h(
              'Tag',
              {
                props: {
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: '条码',
          key: 'account',
          align: 'center',
          minWidth: 180,
          render: (h, params) => {
            return h('img', {
              class: 'barcode-' + params.row.number,
              props: {}
            });
          }
        },
        {
          title: '操作',
          key: 'action',
          fixed: 'right',
          minWidth: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'default',
                    size: 'small',
                    disabled:
                      params.row.isUsed === 1 || !params.row.isCreateCode
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.print(params.row);
                    }
                  }
                },
                '打印'
              ),
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
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
      // 选中的选项
      selection: []
    };
  },
  created () {
    this.getData();
  },
  methods: {
    // 获取首页数据
    getData () {
      this.tableDataOrg = list.map(row => {
        this.$set(row, 'isCreateCode', false);
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
    },
    // 点击按钮 - 打印
    print (row) {
      row.isUsed = 1;
      JsBarcode('.barcode-' + row.number, 'ROC12345', {
        format: 'CODE128', // 选择要使用的条形码类型
        lineColor: '#0aa', // 条形码颜色
        width: 1, // 条形码宽度
        height: 20, // 条形码高度
        text: row.number,
        value: '123',
        displayValue: true, // 是否在条形码下方显示文字
        textPosition: 'bottom' // 设置文本的垂直位置
      });
    },
    // 选项发生改变
    onSelectChange (selection) {
      this.selection = selection;
    },
    // 批量生成条形码
    createCode () {
      if (this.selection.length === 0) {
        this.$Message.warning('请选择数据！');
      } else {
      }
    }
    // 批量打印
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
