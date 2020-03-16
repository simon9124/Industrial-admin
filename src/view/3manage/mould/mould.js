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
        defaultData: null, // 默认数据
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
    ]
  },
  {
    mouldName: "模板2",
    paramList: []
  },
  {
    mouldName: "模板3",
    paramList: []
  },
  {
    mouldName: "模板4",
    paramList: []
  },
  {
    mouldName: "模板5",
    paramList: []
  },
  {
    mouldName: "模板6",
    paramList: []
  },
  {
    mouldName: "模板7",
    paramList: []
  },
  {
    mouldName: "模板8",
    paramList: []
  },
  {
    mouldName: "模板9",
    paramList: []
  },
  {
    mouldName: "模板10",
    paramList: []
  },
  {
    mouldName: "模板11",
    paramList: []
  },
  {
    mouldName: "模板12",
    paramList: []
  }
];

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
    defaultData: null, // 默认数据
    elementType: "下拉单选", // 展现元素类型
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

export { obj, mouldList, paramList, dataTypeList, elementTypeList };
