<template>
  <div class="dooya-container">
    <Card>
      <!-- 筛选 -->
      <div style="marginTop:10px">
        <Form ref="filterFormData"
              :model="filterFormData"
              :label-width="80"
              inline>
          <FormItem prop="user"
                    label="用户："
                    :label-width="70">
            <Select v-model="filterFormData.user"
                    placeholder="请选择用户类型"
                    style="width: 150px"
                    @on-change="refreshTable">
              <Option value="全部">全部</Option>
              <Option value="超级用户">超级用户</Option>
              <Option value="检测员">检测员</Option>
            </Select>
          </FormItem>
          <FormItem prop="time"
                    label="时间区间：">
            <!-- confirm -->
            <DatePicker type="datetimerange"
                        placeholder="请选择时间区间"
                        style="width: 280px"
                        @on-change="timeOnChange"
                        @on-ok="timeOnOk"></DatePicker>
            </Input>
          </FormItem>
          <FormItem :label-width="0">
            <Button type="primary"
                    @click="clearData">清空</Button>
            </Input>
          </FormItem>
        </Form>
      </div>
      <!-- 表格 -->
      <Table :data="tableData"
             :columns="tableColumns"
             size="large"
             stripe></Table>
      <!-- 分页 -->
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page show-sizer
                :total="tableDataAll.length"
                :current="1"
                @on-change="changePage"
                @on-page-size-change="changePageSize"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import list from './mockData/log';

export default {
  data () {
    return {
      // 原始数据 - 所有
      tableDataOrg: [],
      // 表格数据 - 筛选后所有
      tableDataAll: [],
      // 表格数据 - 当前页
      tableData: [],
      // 表头列项
      tableColumns: [
        {
          title: 'URL',
          key: 'URL',
          align: 'center',
          minWidth: 250,
          tooltip: true
        },
        {
          title: '类别',
          key: 'classification',
          align: 'center',
          minWidth: 120
        },
        {
          title: '消息',
          key: 'message',
          align: 'center',
          minWidth: 220
        },
        {
          title: '用户',
          key: 'user',
          align: 'center',
          minWidth: 120
        },
        {
          title: 'IP',
          key: 'logIP',
          align: 'center',
          minWidth: 150
        },
        {
          title: '时间',
          key: 'logTime',
          align: 'center',
          minWidth: 150
        }
      ],
      // 页码
      pageNum: 1,
      // 每页显示数量
      pageSize: 10,
      // 筛选表单
      filterFormData: {
        user: '全部'
      },
      // 时间区间
      timeArray: ['1900-00-00 00:00:00', '3000-00-00 00:00:00']
    };
  },
  created () {
    this.init();
  },
  methods: {
    // 表格数据初始化
    init () {
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
      this.tableDataOrg = list;
      this.refreshTable();
    },
    // 根据条件渲染页面数据
    refreshTable (value) {
      // console.log(this.filterFormData.user);
      // console.log(this.timeArray);
      // 全部符合筛选条件的数据 -> 计总数用
      this.tableDataAll = this.tableDataOrg.filter(row => {
        if (
          (row.user.indexOf(this.filterFormData.user).toString() > -1 ||
            this.filterFormData.user === '全部') &&
          (this.timeArray[0] < row.logTime && this.timeArray[1] > row.logTime)
        ) {
          return row;
        }
      });
      // 当前页要显示的数据
      this.tableData = this.tableDataAll.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    // timePicker - 数据发生改变
    timeOnChange (timeArray) {
      this.timeArray = timeArray;
    },
    // timePicker - 确认
    timeOnOk () {
      this.refreshTable();
    },
    // 清空筛选
    clearData () {
      this.filterFormData.user = '全部';
      this.timeArray = ['1900-00-00 00:00:00', '3000-00-00 00:00:00'];
      this.refreshTable();
    },
    // 分页
    changePage (pageNum) {
      this.pageNum = pageNum;
      this.refreshTable();
    },
    // 每页条数变化
    changePageSize (pageSize) {
      this.pageSize = pageSize;
      this.refreshTable();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
