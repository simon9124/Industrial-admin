const qc1ListMock = [
  {
    value: "JS-9-1.11",
    label: "JS-9-1.11",
    children: [
      {
        value: "A型",
        label: "A型",
        children: null
      },
      {
        value: "B型",
        label: "B型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.268",
    label: "JS-9-1.268",
    children: [
      {
        value: "R型电机",
        label: "R型电机",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.142",
    label: "JS-9-1.142",
    children: [
      {
        value: "B型",
        label: "B型",
        children: null
      },
      {
        value: "M型",
        label: "M型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.444",
    label: "JS-9-1.444",
    children: [
      {
        value: "A型",
        label: "A型",
        children: null
      }
    ]
  }
];

const qc2ListMock = [
  {
    value: "JS-9-1.146",
    label: "JS-9-1.146",
    children: [
      {
        value: "SS型",
        label: "SS型",
        children: null
      },
      {
        value: "A型",
        label: "A型",
        children: null
      },
      {
        value: "B型",
        label: "B型",
        children: null
      },
      {
        value: "123",
        label: "123",
        children: null
      },
      {
        value: "C型",
        label: "C型",
        children: null
      },
      {
        value: "D型",
        label: "D型",
        children: null
      },
      {
        value: "DD型",
        label: "DD型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.380",
    label: "JS-9-1.380",
    children: [
      {
        value: "SS型",
        label: "SS型",
        children: null
      },
      {
        value: "A型",
        label: "A型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.249",
    label: "JS-9-1.249",
    children: [
      {
        value: "S型",
        label: "S型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.224",
    label: "JS-9-1.224",
    children: [
      {
        value: "A型",
        label: "A型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.229",
    label: "JS-9-1.229",
    children: [
      {
        value: "A型",
        label: "A型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.445",
    label: "JS-9-1.445",
    children: [
      {
        value: "B型",
        label: "B型",
        children: null
      }
    ]
  },
  {
    value: "JS-9-1.234",
    label: "JS-9-1.234",
    children: [
      {
        value: "10型",
        label: "10型",
        children: null
      }
    ]
  }
];

const qc3ListMock = [
  {
    sop: "JS-9-1.300",
    sopDescription: "外观检测通用",
    qc: 3
  }
];

// 顶部tab列表
const tabList = [
  {
    id: 1,
    typeName: "综合检测"
  },
  {
    id: 2,
    typeName: "静音检测"
  },
  {
    id: 3,
    typeName: "外观检测"
  }
];

// 历史任务列表
const taskHistoryList = [
  {
    statusName: "正常",
    total: 0,
    qualified: 0,
    lineNo: 22,
    sn: 1009,
    productClass: "TF型",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 260,
    startTime: "09:30:00",
    endTime: "19:30:00",
    status: 1,
    createBy: 0,
    createTime: "2020-01-13 00:00:00",
    id: "1226afb6165e41a8b9596f7912380728"
  },
  {
    statusName: "正常",
    total: 22,
    qualified: 0,
    lineNo: 22,
    sn: 1009,
    productClass: "EEEBM",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 30,
    startTime: "11:30:00",
    endTime: "12:30:00",
    status: 1,
    createBy: 0,
    createTime: "2020-01-10 00:00:00",
    id: "a88c3e15a83d4254b466761aef16f623"
  },
  {
    statusName: "正常",
    total: 135,
    qualified: 14,
    lineNo: 22,
    sn: 1009,
    productClass: "RS型",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 127,
    startTime: "14:00:00",
    endTime: "18:30:00",
    status: 1,
    createBy: 0,
    createTime: "2020-01-10 00:00:00",
    id: "0e76b70c7da94a3181788927379565e4"
  },
  {
    statusName: "正常",
    total: 0,
    qualified: 0,
    lineNo: 22,
    sn: 1009,
    productClass: "A",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 200,
    startTime: "10:30:00",
    endTime: "21:30:00",
    status: 1,
    createBy: 0,
    createTime: "2020-01-09 00:00:00",
    id: "2a14a242dea14a3e988d353b9c636aa8"
  },
  {
    statusName: "中断",
    total: 386,
    qualified: 95,
    lineNo: 22,
    sn: 1009,
    productClass: "R",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 600,
    startTime: "10:30:00",
    endTime: "23:30:00",
    status: 2,
    createBy: 0,
    createTime: "2020-01-08 00:00:00",
    id: "b675d23487744a8ba0f38ed749d3af20"
  },
  {
    statusName: "正常",
    total: 180,
    qualified: 3,
    lineNo: 22,
    sn: 1014,
    productClass: "G",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 5,
    startTime: "17:30:00",
    endTime: "23:30:00",
    status: 1,
    createBy: 0,
    createTime: "2020-01-08 00:00:00",
    id: "88654306a2aa4c0dba4fbd8f60b6afaf"
  },
  {
    statusName: "中断",
    total: 356,
    qualified: 76,
    lineNo: 22,
    sn: 1014,
    productClass: "H",
    qc1SopTagId: null,
    qc2SopTagId: null,
    qc3SopTagId: null,
    taskCount: 361,
    startTime: "11:30:00",
    endTime: "23:30:00",
    status: 2,
    createBy: 0,
    createTime: "2020-01-08 00:00:00",
    id: "e65d9109dace4e4f9eb2f9147be9a810"
  }
];

export { qc1ListMock, qc2ListMock, qc3ListMock, tabList, taskHistoryList };
