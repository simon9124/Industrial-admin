  <!--
    动态表格组件
  -->

<template>
  <div style="position: relative"
       v-loading="loading"
       id="hot-preview">
    <HotTable :settings="settings"
              ref="hotable"></HotTable>
  </div>
  <!-- <el-button style="position:absolute;top:-52px;right:0"
               type="primary"
               icon="el-icon-view"
               size="small"
               @click="handleExcel()">保存列表
    </el-button> -->
  </div>
</template>

<script>
import HotTable from "@handsontable/vue";
import Bus from "@/libs/bus.js";

export default {
  name: "handsontable",
  components: {
    HotTable
  },
  data() {
    return {
      loading: false,
      settings: {
        data: [
          ["start", "mysqld.service"],
          ["stop", "nginx"],
          ["status", "ansible"]
        ],
        colHeaders: ["操作类型", "业务名称"], // 自定义列表头or 布尔值
        contextMenu: {
          // 自定义右键菜单，可汉化，默认布尔值
          items: {
            row_above: {
              name: "上方插入一行"
            },
            row_below: {
              name: "下方插入一行"
            },
            col_left: {
              name: "左方插入列"
            },
            col_right: {
              name: "右方插入列"
            },
            hsep1: "---------", // 提供分隔线
            remove_row: {
              name: "删除行"
            },
            remove_col: {
              name: "删除列"
            },
            hsep2: "---------", // 提供分隔线
            make_read_only: {
              name: "只读"
            },
            borders: {
              name: "表格线"
            },
            commentsAddEdit: {
              name: "添加备注"
            },
            commentsRemove: {
              name: "取消备注"
            },
            freeze_column: {
              name: "固定列"
            },
            unfreeze_column: {
              name: "取消列固定"
            }
          }
        }, // 右键效果
        className: "htMiddle htCenter", // 居中显示
        rowHeaders: true, // 行表头
        currentRowClassName: "currentRow", // 为选中行添加类名，可以更改样式
        currentColClassName: "currentCol", // 为选中列添加类名
        autoWrapRow: true, // 自动换行
        fillHandle: true, // 选中拖拽复制 possible values: true, false, "horizontal", "vertical"
        manualColumnFreeze: true, // 手动固定列
        manualColumnMove: true, // 手动移动列
        manualRowMove: true, // 手动移动行
        manualColumnResize: true, // 手工更改列距
        manualRowResize: true, // 手动更改行距
        comments: true, // 添加注释
        columnSorting: true, // 排序
        stretchH: "all", // 根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展,
        afterSelectionByProp: (
          row, // 起始行索引
          column, // 结束行索引
          row2, // 起始列索引
          column2, // 结束列索引
          preventScrolling,
          selectionLayerLevel
        ) => {
          // console.debug('当前行:' + row + '当前行' + row2)
          const rowData = [];
          if (row === row2) {
            // const rowData = this.$refs.hotable.table.getDataAtRow(row)
            rowData.push(this.$refs.hotable.table.getDataAtRow(row));
          } else {
            if (row < row2) {
              for (var i = row; i <= row2; i++) {
                rowData.push(this.$refs.hotable.table.getDataAtRow(i));
              }
            } else {
              for (var j = row2; j <= row; j++) {
                rowData.push(this.$refs.hotable.table.getDataAtRow(j));
              }
            }
          }
          this.$emit("rowSelectChange", rowData);
          preventScrolling.value = true;
        }
      },
      // 下载的表格项
      excelList: [],
      // 上传的表格项
      tableData: []
    };
  },
  created() {
    // 接受AddTags传递过来的表头
    Bus.$on("handleHeaders", colHeaders => {
      // 对比新表头 和 原数据 的数组长度
      // console.log(colHeaders.length)
      // console.log(this.settings.data[0].length)
      const i = colHeaders.length;
      if (i === this.settings.data[0].length) {
        this.settings.colHeaders = colHeaders;
      } else if (i > this.settings.data[0].length) {
        for (var j in this.settings.data) {
          for (var k = this.settings.data[j].length; k < i; k++) {
            this.settings.data[j].push("");
          }
        }
        this.settings.colHeaders = colHeaders;
      } else if (i < this.settings.data[0].length) {
        for (var m in this.settings.data) {
          this.settings.data[m] = this.settings.data[m].slice(0, i);
          this.settings.colHeaders = colHeaders;
        }
      }
    });
    this.init();
  },
  methods: {
    // 页面加载
    init() {
      this.$emit("handleExcel", this.settings);
    },
    handleExcel() {
      this.$emit("handleExcel", this.settings);
    }
  }
};
</script>

<style src="./handsontable.full.css"></style>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
#hot-preview {
  width: 100%;
  height: 158px;
  overflow: auto;
  // overflow-x: hidden;
  margin: 20px 0;
  .handsontable {
    height: 100%;
    /deep/ .ht_master {
      height: 100%;
      .wtHolder {
        height: 100% !important;
      }
    }
  }
}
#hot-preview /deep/ #hot-display-license-info {
  display: none;
}
</style>
