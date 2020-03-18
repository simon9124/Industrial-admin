const obj = {
  name: "综合检测异常产品",
  sourceType: "Sql语句",
  source:
    "SELECT r.barcode,r.record_time,r.lineno,r.mark_reason_qc1 FROM result as r",
  header: {
    "!ref": "A1:E2",
    A1: {
      t: "s",
      v: "综合检测异常产品",
      r: "综合检测异常产品",
      h: "综合检测异常产品",
      w: "综合检测异常产品"
    },
    A2: {
      t: "s",
      v: "编号",
      r: "编号",
      h: "编号",
      w: "编号"
    },
    B2: {
      t: "s",
      v: "线号",
      r: "线号",
      h: "线号",
      w: "线号"
    },
    C2: {
      t: "s",
      v: "检测结果",
      r: "检测结果",
      h: "检测结果",
      w: "检测结果"
    },
    D2: {
      t: "s",
      v: "日期时间",
      r: "日期时间",
      h: "日期时间",
      w: "日期时间"
    },
    E2: {
      t: "s",
      v: "异常原因",
      r: "异常原因",
      h: "异常原因",
      w: "异常原因"
    },
    "!margins": {
      left: 0.7,
      right: 0.7,
      top: 0.75,
      bottom: 0.75,
      header: 0.3,
      footer: 0.3
    },
    "!merges": [
      {
        s: {
          c: 0,
          r: 0
        },
        e: {
          c: 4,
          r: 0
        }
      }
    ]
  },
  field: [
    // 查询结果的字段与Table表格的列对应关系
    {
      title: "编号", // table表格列名
      name: "barcode", // 对应数据源的属性名
      colTag: "A2" // 位置
    },
    {
      title: "线号",
      name: "lineno",
      colTag: "B2"
    },
    {
      title: "检测结果",
      name: "qc1_result",
      colTag: "C2"
    },
    {
      title: "异常原因",
      name: "mark_reason_qc1",
      colTag: "D2"
    },
    {
      title: "日期时间",
      name: "record_time",
      colTag: "E2"
    }
  ],
  condition: [
    // 查询条件配置信息
    {
      title: "是否处理", // 查询条件展现名
      name: "isResolved", // T查询条件系统名
      data: [
        // 数据源
        {
          index: 1,
          label: "不限"
        },
        {
          index: 2,
          label: "已处理"
        },
        {
          index: 3,
          label: "未处理"
        }
      ],
      labelName: "index", // 从数据源里展现的属性名  下拉选择/复选框时独有
      valueName: "label", // 从数据源取值的属性名    下拉选择/复选框时独有
      defaultData: null, // 默认数据
      elementType: "下拉框", // 展现元素类型
      dataType: "int", // 数据类型
      discription: "" // 备注
    },
    {
      title: "编号",
      name: "barCode",
      data: "",
      defaultData: "",
      elementType: "文本框",
      dataType: "string",
      discription: ""
    },
    {
      title: "日期",
      name: "record_time",
      data: "",
      defaultData: "",
      elementType: "日期",
      dataType: "datetime",
      discription: ""
    }
  ]
};

// 参数列表
const paramList = [
  {
    title: "是否处理", // 查询条件展现名
    name: "isResolved", // T查询条件系统名
    data: [
      // 数据源
      {
        index: 1,
        label: "不限"
      },
      {
        index: 2,
        label: "已处理"
      },
      {
        index: 3,
        label: "未处理"
      }
    ],
    labelName: "index", // 从数据源里展现的属性名  下拉选择/复选框时独有
    valueName: "label", // 从数据源取值的属性名    下拉选择/复选框时独有
    defaultData: "不限", // 默认数据
    elementType: "下拉单选", // 展现元素类型
    dataType: "int", // 数据类型
    discription: "" // 备注
  },
  {
    title: "编号",
    name: "barCode",
    data: [],
    defaultData: "",
    elementType: "文本框",
    dataType: "text",
    discription: ""
  },
  {
    title: "日期",
    name: "record_time",
    data: [],
    defaultData: "",
    elementType: "日期选择",
    dataType: "datetime",
    discription: ""
  }
];

// 数据类型列表
const dataTypeList = ["text", "int", "datetime"];

// 显示元素列表
const elementTypeList = [
  "文本框",
  "下拉单选",
  "下拉多选",
  "日期选择",
  "日期-时间选择"
];

// 模板表头
const excelHeader = {
  "!ref": "A1:AD5",
  A1: {
    t: "s",
    v: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
    r: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
    h: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
    w: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
    s: {
      font: {
        name: "宋体",
        sz: 14,
        color: {
          auto: 1
        }
      },
      border: {
        color: {
          auto: 1
        }
      },
      alignment: {
        /// 自动换行
        wrapText: 1,
        // 居中
        horizontal: "center",
        vertical: "center",
        indent: 0
      }
    }
  },
  A2: {
    t: "s",
    v: "班次",
    r: "班次",
    h: "班次",
    w: "班次"
  },
  B2: {
    t: "s",
    v: " ",
    r: " ",
    h: " ",
    w: " "
  },
  D2: {
    t: "s",
    v: "\t",
    r: "\t",
    h: " ",
    w: "\t"
  },
  E2: {
    t: "s",
    v: "点至",
    r: "点至",
    h: "点至",
    w: "点至"
  },
  G2: {
    t: "s",
    v: "点",
    r: "点",
    h: "点",
    w: "点"
  },
  Y2: {
    t: "s",
    v: " ",
    r: " ",
    h: " ",
    w: " "
  },
  Z2: {
    t: "s",
    v: "年",
    r: "年",
    h: "年",
    w: "年"
  },
  AA2: {
    t: "s",
    v: " ",
    r: " ",
    h: " ",
    w: " "
  },
  AB2: {
    t: "s",
    v: "月",
    r: "月",
    h: "月",
    w: "月"
  },
  AC2: {
    t: "s",
    v: " ",
    r: " ",
    h: " ",
    w: " "
  },
  AD2: {
    t: "s",
    v: "日",
    r: "日",
    h: "日",
    w: "日"
  },
  A3: {
    t: "s",
    v: "序号\t",
    r: "序号\t",
    h: "序号 ",
    w: "序号\t"
  },
  B3: {
    t: "s",
    v: "时间",
    r: "时间",
    h: "时间",
    w: "时间"
  },
  C3: {
    t: "s",
    v: "气泡",
    r: "气泡",
    h: "气泡",
    w: "气泡"
  },
  F3: {
    t: "s",
    v: "蓄热器",
    r: "蓄热器",
    h: "蓄热器",
    w: "蓄热器"
  },
  I3: {
    t: "s",
    v: "除氧器",
    r: "除氧器",
    h: "除氧器",
    w: "除氧器"
  },
  L3: {
    t: "s",
    v: "给水泵",
    r: "给水泵",
    h: "给水泵",
    w: "给水泵"
  },
  P3: {
    t: "s",
    v: "可移动段高压泵",
    r: "可移动段高压泵",
    h: "可移动段高压泵",
    w: "可移动段高压泵"
  },
  T3: {
    t: "s",
    v: "炉口段高压泵",
    r: "炉口段高压泵",
    h: "炉口段高压泵",
    w: "炉口段高压泵"
  },
  X3: {
    t: "s",
    v: "低压泵",
    r: "低压泵",
    h: "低压泵",
    w: "低压泵"
  },
  AB3: {
    t: "s",
    v: "主蒸汽管",
    r: "主蒸汽管",
    h: "主蒸汽管",
    w: "主蒸汽管"
  },
  AD3: {
    t: "s",
    v: "备注",
    r: "备注",
    h: "备注",
    w: "备注"
  },
  C4: {
    t: "s",
    v: "水位",
    r: "水位",
    h: "水位",
    w: "水位"
  },
  D4: {
    t: "s",
    v: "压力",
    r: "压力",
    h: "压力",
    w: "压力"
  },
  E4: {
    t: "s",
    v: "温度",
    r: "温度",
    h: "温度",
    w: "温度"
  },
  F4: {
    t: "s",
    v: "水位",
    r: "水位",
    h: "水位",
    w: "水位"
  },
  G4: {
    t: "s",
    v: "压力",
    r: "压力",
    h: "压力",
    w: "压力"
  },
  H4: {
    t: "s",
    v: "温度",
    r: "温度",
    h: "温度",
    w: "温度"
  },
  I4: {
    t: "s",
    v: "水位",
    r: "水位",
    h: "水位",
    w: "水位"
  },
  J4: {
    t: "s",
    v: "压力",
    r: "压力",
    h: "压力",
    w: "压力"
  },
  K4: {
    t: "s",
    v: "温度",
    r: "温度",
    h: "温度",
    w: "温度"
  },
  L4: {
    t: "s",
    v: "泵号",
    r: "泵号",
    h: "泵号",
    w: "泵号"
  },
  M4: {
    t: "s",
    v: "流量",
    r: "流量",
    h: "流量",
    w: "流量"
  },
  N4: {
    t: "s",
    v: "出口压力",
    r: "出口压力",
    h: "出口压力",
    w: "出口压力"
  },
  O4: {
    t: "s",
    v: "电机电流",
    r: "电机电流",
    h: "电机电流",
    w: "电机电流"
  },
  P4: {
    t: "s",
    v: "泵号",
    r: "泵号",
    h: "泵号",
    w: "泵号"
  },
  Q4: {
    t: "s",
    v: "流量",
    r: "流量",
    h: "流量",
    w: "流量"
  },
  R4: {
    t: "s",
    v: "出口压力",
    r: "出口压力",
    h: "出口压力",
    w: "出口压力"
  },
  S4: {
    t: "s",
    v: "电机电流",
    r: "电机电流",
    h: "电机电流",
    w: "电机电流"
  },
  T4: {
    t: "s",
    v: "泵号",
    r: "泵号",
    h: "泵号",
    w: "泵号"
  },
  U4: {
    t: "s",
    v: "流量",
    r: "流量",
    h: "流量",
    w: "流量"
  },
  V4: {
    t: "s",
    v: "出口压力",
    r: "出口压力",
    h: "出口压力",
    w: "出口压力"
  },
  W4: {
    t: "s",
    v: "电机电流",
    r: "电机电流",
    h: "电机电流",
    w: "电机电流"
  },
  X4: {
    t: "s",
    v: "泵号",
    r: "泵号",
    h: "泵号",
    w: "泵号"
  },
  Y4: {
    t: "s",
    v: "流量",
    r: "流量",
    h: "流量",
    w: "流量"
  },
  Z4: {
    t: "s",
    v: "出口压力",
    r: "出口压力",
    h: "出口压力",
    w: "出口压力"
  },
  AA4: {
    t: "s",
    v: "电机电流",
    r: "电机电流",
    h: "电机电流",
    w: "电机电流"
  },
  AB4: {
    t: "s",
    v: "流量",
    r: "流量",
    h: "流量",
    w: "流量"
  },
  AC4: {
    t: "s",
    v: "压力",
    r: "压力",
    h: "压力",
    w: "压力"
  },
  C5: {
    t: "s",
    v: "mm",
    r: "mm",
    h: "mm",
    w: "mm"
  },
  D5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  E5: {
    t: "s",
    v: "℃",
    r: "℃",
    h: "℃",
    w: "℃"
  },
  F5: {
    t: "s",
    v: "mm",
    r: "mm",
    h: "mm",
    w: "mm"
  },
  G5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  H5: {
    t: "s",
    v: "℃",
    r: "℃",
    h: "℃",
    w: "℃"
  },
  I5: {
    t: "s",
    v: "mm",
    r: "mm",
    h: "mm",
    w: "mm"
  },
  J5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  K5: {
    t: "s",
    v: "℃",
    r: "℃",
    h: "℃",
    w: "℃"
  },
  M5: {
    t: "s",
    v: "t/h",
    r: "t/h",
    h: "t/h",
    w: "t/h"
  },
  N5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  O5: {
    t: "s",
    v: "A",
    r: "A",
    h: "A",
    w: "A"
  },
  Q5: {
    t: "s",
    v: "t/h",
    r: "t/h",
    h: "t/h",
    w: "t/h"
  },
  R5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  S5: {
    t: "s",
    v: "A",
    r: "A",
    h: "A",
    w: "A"
  },
  U5: {
    t: "s",
    v: "t/h",
    r: "t/h",
    h: "t/h",
    w: "t/h"
  },
  V5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  W5: {
    t: "s",
    v: "A",
    r: "A",
    h: "A",
    w: "A"
  },
  Y5: {
    t: "s",
    v: "t/h",
    r: "t/h",
    h: "t/h",
    w: "t/h"
  },
  Z5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  AA5: {
    t: "s",
    v: "A",
    r: "A",
    h: "A",
    w: "A"
  },
  AB5: {
    t: "s",
    v: "t/h",
    r: "t/h",
    h: "t/h",
    w: "t/h"
  },
  AC5: {
    t: "s",
    v: "Mpa",
    r: "Mpa",
    h: "Mpa",
    w: "Mpa"
  },
  "!margins": {
    left: 0.7,
    right: 0.7,
    top: 0.75,
    bottom: 0.75,
    header: 0.3,
    footer: 0.3
  },
  "!merges": [
    {
      s: {
        c: 0,
        r: 0
      },
      e: {
        c: 29,
        r: 0
      }
    }, // A1
    {
      s: {
        c: 1,
        r: 1
      },
      e: {
        c: 2,
        r: 1
      }
    }, // B2
    {
      s: {
        c: 0,
        r: 2
      },
      e: {
        c: 0,
        r: 4
      }
    },
    {
      s: {
        c: 1,
        r: 2
      },
      e: {
        c: 1,
        r: 4
      }
    },
    {
      s: {
        c: 11,
        r: 3
      },
      e: {
        c: 11,
        r: 4
      }
    },
    {
      s: {
        c: 15,
        r: 3
      },
      e: {
        c: 15,
        r: 4
      }
    },
    {
      s: {
        c: 19,
        r: 3
      },
      e: {
        c: 19,
        r: 4
      }
    },
    {
      s: {
        c: 23,
        r: 3
      },
      e: {
        c: 23,
        r: 4
      }
    },
    {
      s: {
        c: 2,
        r: 2
      },
      e: {
        c: 4,
        r: 2
      }
    },
    {
      s: {
        c: 5,
        r: 2
      },
      e: {
        c: 7,
        r: 2
      }
    },
    {
      s: {
        c: 8,
        r: 2
      },
      e: {
        c: 10,
        r: 2
      }
    },
    {
      s: {
        c: 11,
        r: 2
      },
      e: {
        c: 14,
        r: 2
      }
    },
    {
      s: {
        c: 15,
        r: 2
      },
      e: {
        c: 18,
        r: 2
      }
    },
    {
      s: {
        c: 19,
        r: 2
      },
      e: {
        c: 22,
        r: 2
      }
    },
    {
      s: {
        c: 23,
        r: 2
      },
      e: {
        c: 26,
        r: 2
      }
    },
    {
      s: {
        c: 27,
        r: 2
      },
      e: {
        c: 28,
        r: 2
      }
    },
    {
      s: {
        c: 29,
        r: 2
      },
      e: {
        c: 29,
        r: 4
      }
    },
    {
      s: {
        c: 7,
        r: 1
      },
      e: {
        c: 23,
        r: 1
      }
    }
  ]
};

// 模板表头和参数对应关系
const excelField = [
  {
    title: "编号", // table表格列名
    name: "barcode", // 对应数据源的属性名
    colTag: "A2" // 位置
  },
  {
    title: "线号",
    name: "lineno",
    colTag: "B2"
  },
  {
    title: "检测结果",
    name: "qc1_result",
    colTag: "C2"
  },
  {
    title: "异常原因",
    name: "mark_reason_qc1",
    colTag: "D2"
  },
  {
    title: "日期时间",
    name: "record_time",
    colTag: "E2"
  }
];

// 模板列表
const mouldList = [
  {
    mouldName: "模板1",
    paramList: [
      {
        title: "是否处理", // 查询条件展现名
        name: "isResolved", // T查询条件系统名
        data: [
          // 数据源
          {
            index: 1,
            label: "不限"
          },
          {
            index: 2,
            label: "已处理"
          },
          {
            index: 3,
            label: "未处理"
          }
        ],
        labelName: "index", // 从数据源里展现的属性名  下拉选择/复选框时独有
        valueName: "label", // 从数据源取值的属性名    下拉选择/复选框时独有
        defaultData: "不限", // 默认数据
        elementType: "下拉单选", // 展现元素类型
        dataType: "int", // 数据类型
        discription: "" // 备注
      },
      {
        title: "编号",
        name: "barCode",
        data: [],
        defaultData: "",
        elementType: "文本框",
        dataType: "text",
        discription: ""
      },
      {
        title: "日期",
        name: "record_time",
        data: [],
        defaultData: "",
        elementType: "日期选择",
        dataType: "datetime",
        discription: ""
      }
    ],
    header: {
      "!ref": "A1:AD5",
      A1: {
        t: "s",
        v: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
        r: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
        h: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
        w: "唐山松汀钢铁有限公司第二炼钢厂 转炉汽化系统设备运行记录",
        s: {
          font: {
            name: "宋体",
            sz: 14,
            color: {
              auto: 1
            }
          },
          border: {
            color: {
              auto: 1
            }
          },
          alignment: {
            /// 自动换行
            wrapText: 1,
            // 居中
            horizontal: "center",
            vertical: "center",
            indent: 0
          }
        }
      },
      A2: {
        t: "s",
        v: "班次",
        r: "班次",
        h: "班次",
        w: "班次"
      },
      B2: {
        t: "s",
        v: " ",
        r: " ",
        h: " ",
        w: " "
      },
      D2: {
        t: "s",
        v: "\t",
        r: "\t",
        h: " ",
        w: "\t"
      },
      E2: {
        t: "s",
        v: "点至",
        r: "点至",
        h: "点至",
        w: "点至"
      },
      G2: {
        t: "s",
        v: "点",
        r: "点",
        h: "点",
        w: "点"
      },
      Y2: {
        t: "s",
        v: " ",
        r: " ",
        h: " ",
        w: " "
      },
      Z2: {
        t: "s",
        v: "年",
        r: "年",
        h: "年",
        w: "年"
      },
      AA2: {
        t: "s",
        v: " ",
        r: " ",
        h: " ",
        w: " "
      },
      AB2: {
        t: "s",
        v: "月",
        r: "月",
        h: "月",
        w: "月"
      },
      AC2: {
        t: "s",
        v: " ",
        r: " ",
        h: " ",
        w: " "
      },
      AD2: {
        t: "s",
        v: "日",
        r: "日",
        h: "日",
        w: "日"
      },
      A3: {
        t: "s",
        v: "序号\t",
        r: "序号\t",
        h: "序号 ",
        w: "序号\t"
      },
      B3: {
        t: "s",
        v: "时间",
        r: "时间",
        h: "时间",
        w: "时间"
      },
      C3: {
        t: "s",
        v: "气泡",
        r: "气泡",
        h: "气泡",
        w: "气泡"
      },
      F3: {
        t: "s",
        v: "蓄热器",
        r: "蓄热器",
        h: "蓄热器",
        w: "蓄热器"
      },
      I3: {
        t: "s",
        v: "除氧器",
        r: "除氧器",
        h: "除氧器",
        w: "除氧器"
      },
      L3: {
        t: "s",
        v: "给水泵",
        r: "给水泵",
        h: "给水泵",
        w: "给水泵"
      },
      P3: {
        t: "s",
        v: "可移动段高压泵",
        r: "可移动段高压泵",
        h: "可移动段高压泵",
        w: "可移动段高压泵"
      },
      T3: {
        t: "s",
        v: "炉口段高压泵",
        r: "炉口段高压泵",
        h: "炉口段高压泵",
        w: "炉口段高压泵"
      },
      X3: {
        t: "s",
        v: "低压泵",
        r: "低压泵",
        h: "低压泵",
        w: "低压泵"
      },
      AB3: {
        t: "s",
        v: "主蒸汽管",
        r: "主蒸汽管",
        h: "主蒸汽管",
        w: "主蒸汽管"
      },
      AD3: {
        t: "s",
        v: "备注",
        r: "备注",
        h: "备注",
        w: "备注"
      },
      C4: {
        t: "s",
        v: "水位",
        r: "水位",
        h: "水位",
        w: "水位"
      },
      D4: {
        t: "s",
        v: "压力",
        r: "压力",
        h: "压力",
        w: "压力"
      },
      E4: {
        t: "s",
        v: "温度",
        r: "温度",
        h: "温度",
        w: "温度"
      },
      F4: {
        t: "s",
        v: "水位",
        r: "水位",
        h: "水位",
        w: "水位"
      },
      G4: {
        t: "s",
        v: "压力",
        r: "压力",
        h: "压力",
        w: "压力"
      },
      H4: {
        t: "s",
        v: "温度",
        r: "温度",
        h: "温度",
        w: "温度"
      },
      I4: {
        t: "s",
        v: "水位",
        r: "水位",
        h: "水位",
        w: "水位"
      },
      J4: {
        t: "s",
        v: "压力",
        r: "压力",
        h: "压力",
        w: "压力"
      },
      K4: {
        t: "s",
        v: "温度",
        r: "温度",
        h: "温度",
        w: "温度"
      },
      L4: {
        t: "s",
        v: "泵号",
        r: "泵号",
        h: "泵号",
        w: "泵号"
      },
      M4: {
        t: "s",
        v: "流量",
        r: "流量",
        h: "流量",
        w: "流量"
      },
      N4: {
        t: "s",
        v: "出口压力",
        r: "出口压力",
        h: "出口压力",
        w: "出口压力"
      },
      O4: {
        t: "s",
        v: "电机电流",
        r: "电机电流",
        h: "电机电流",
        w: "电机电流"
      },
      P4: {
        t: "s",
        v: "泵号",
        r: "泵号",
        h: "泵号",
        w: "泵号"
      },
      Q4: {
        t: "s",
        v: "流量",
        r: "流量",
        h: "流量",
        w: "流量"
      },
      R4: {
        t: "s",
        v: "出口压力",
        r: "出口压力",
        h: "出口压力",
        w: "出口压力"
      },
      S4: {
        t: "s",
        v: "电机电流",
        r: "电机电流",
        h: "电机电流",
        w: "电机电流"
      },
      T4: {
        t: "s",
        v: "泵号",
        r: "泵号",
        h: "泵号",
        w: "泵号"
      },
      U4: {
        t: "s",
        v: "流量",
        r: "流量",
        h: "流量",
        w: "流量"
      },
      V4: {
        t: "s",
        v: "出口压力",
        r: "出口压力",
        h: "出口压力",
        w: "出口压力"
      },
      W4: {
        t: "s",
        v: "电机电流",
        r: "电机电流",
        h: "电机电流",
        w: "电机电流"
      },
      X4: {
        t: "s",
        v: "泵号",
        r: "泵号",
        h: "泵号",
        w: "泵号"
      },
      Y4: {
        t: "s",
        v: "流量",
        r: "流量",
        h: "流量",
        w: "流量"
      },
      Z4: {
        t: "s",
        v: "出口压力",
        r: "出口压力",
        h: "出口压力",
        w: "出口压力"
      },
      AA4: {
        t: "s",
        v: "电机电流",
        r: "电机电流",
        h: "电机电流",
        w: "电机电流"
      },
      AB4: {
        t: "s",
        v: "流量",
        r: "流量",
        h: "流量",
        w: "流量"
      },
      AC4: {
        t: "s",
        v: "压力",
        r: "压力",
        h: "压力",
        w: "压力"
      },
      C5: {
        t: "s",
        v: "mm",
        r: "mm",
        h: "mm",
        w: "mm"
      },
      D5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      E5: {
        t: "s",
        v: "℃",
        r: "℃",
        h: "℃",
        w: "℃"
      },
      F5: {
        t: "s",
        v: "mm",
        r: "mm",
        h: "mm",
        w: "mm"
      },
      G5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      H5: {
        t: "s",
        v: "℃",
        r: "℃",
        h: "℃",
        w: "℃"
      },
      I5: {
        t: "s",
        v: "mm",
        r: "mm",
        h: "mm",
        w: "mm"
      },
      J5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      K5: {
        t: "s",
        v: "℃",
        r: "℃",
        h: "℃",
        w: "℃"
      },
      M5: {
        t: "s",
        v: "t/h",
        r: "t/h",
        h: "t/h",
        w: "t/h"
      },
      N5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      O5: {
        t: "s",
        v: "A",
        r: "A",
        h: "A",
        w: "A"
      },
      Q5: {
        t: "s",
        v: "t/h",
        r: "t/h",
        h: "t/h",
        w: "t/h"
      },
      R5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      S5: {
        t: "s",
        v: "A",
        r: "A",
        h: "A",
        w: "A"
      },
      U5: {
        t: "s",
        v: "t/h",
        r: "t/h",
        h: "t/h",
        w: "t/h"
      },
      V5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      W5: {
        t: "s",
        v: "A",
        r: "A",
        h: "A",
        w: "A"
      },
      Y5: {
        t: "s",
        v: "t/h",
        r: "t/h",
        h: "t/h",
        w: "t/h"
      },
      Z5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      AA5: {
        t: "s",
        v: "A",
        r: "A",
        h: "A",
        w: "A"
      },
      AB5: {
        t: "s",
        v: "t/h",
        r: "t/h",
        h: "t/h",
        w: "t/h"
      },
      AC5: {
        t: "s",
        v: "Mpa",
        r: "Mpa",
        h: "Mpa",
        w: "Mpa"
      },
      "!margins": {
        left: 0.7,
        right: 0.7,
        top: 0.75,
        bottom: 0.75,
        header: 0.3,
        footer: 0.3
      },
      "!merges": [
        {
          s: {
            c: 0,
            r: 0
          },
          e: {
            c: 29,
            r: 0
          }
        }, // A1
        {
          s: {
            c: 1,
            r: 1
          },
          e: {
            c: 2,
            r: 1
          }
        }, // B2
        {
          s: {
            c: 0,
            r: 2
          },
          e: {
            c: 0,
            r: 4
          }
        },
        {
          s: {
            c: 1,
            r: 2
          },
          e: {
            c: 1,
            r: 4
          }
        },
        {
          s: {
            c: 11,
            r: 3
          },
          e: {
            c: 11,
            r: 4
          }
        },
        {
          s: {
            c: 15,
            r: 3
          },
          e: {
            c: 15,
            r: 4
          }
        },
        {
          s: {
            c: 19,
            r: 3
          },
          e: {
            c: 19,
            r: 4
          }
        },
        {
          s: {
            c: 23,
            r: 3
          },
          e: {
            c: 23,
            r: 4
          }
        },
        {
          s: {
            c: 2,
            r: 2
          },
          e: {
            c: 4,
            r: 2
          }
        },
        {
          s: {
            c: 5,
            r: 2
          },
          e: {
            c: 7,
            r: 2
          }
        },
        {
          s: {
            c: 8,
            r: 2
          },
          e: {
            c: 10,
            r: 2
          }
        },
        {
          s: {
            c: 11,
            r: 2
          },
          e: {
            c: 14,
            r: 2
          }
        },
        {
          s: {
            c: 15,
            r: 2
          },
          e: {
            c: 18,
            r: 2
          }
        },
        {
          s: {
            c: 19,
            r: 2
          },
          e: {
            c: 22,
            r: 2
          }
        },
        {
          s: {
            c: 23,
            r: 2
          },
          e: {
            c: 26,
            r: 2
          }
        },
        {
          s: {
            c: 27,
            r: 2
          },
          e: {
            c: 28,
            r: 2
          }
        },
        {
          s: {
            c: 29,
            r: 2
          },
          e: {
            c: 29,
            r: 4
          }
        },
        {
          s: {
            c: 7,
            r: 1
          },
          e: {
            c: 23,
            r: 1
          }
        }
      ]
    }
  },
  {
    mouldName: "模板2",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板3",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板4",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板5",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板6",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板7",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板8",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板9",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板10",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板11",
    paramList: [],
    header: {}
  },
  {
    mouldName: "模板12",
    paramList: [],
    header: {}
  }
];

export {
  obj,
  mouldList,
  paramList,
  dataTypeList,
  elementTypeList,
  excelHeader,
  excelField
};
