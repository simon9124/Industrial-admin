// 用户列表
const userList = [
  {
    id: null,
    user_id: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
    user_name: "admin",
    display_name: "管理员",
    user_phone: "13888888888",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: [1],
    userAccess: "admin",
    group_id: "7",
    group_name: "产品组",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
    user_name: "cestc",
    display_name: "工程师",
    user_phone: "13801380138",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["cestc"],
    userAccess: "cestc",
    group_id: "4",
    group_name: "静音检测站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "ada9bf57-99ad-4ca6-8000-5b245c59af3d",
    user_name: "cgh",
    display_name: "陈国华",
    user_phone: "15910512300",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["cestc"],
    userAccess: "cestc",
    group_id: "1",
    group_name: "",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "f706830e-9b9f-498e-b1d9-536d7c366313",
    user_name: "chenguohua1",
    display_name: "陈国华1",
    user_phone: "15910512300",
    user_avator: "",
    user_pwd: "123456",
    user_access: ["examine"],
    userAccess: "examine",
    group_id: "d2e5ce63-0e12-403a-b144-cfc85782709f",
    group_name: "",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "9d974bb4-2386-4bb8-98c5-499b95ad025c",
    user_name: "examine",
    display_name: "检测员",
    user_phone: "",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["examine"],
    userAccess: "examine",
    group_id: "3",
    group_name: "综合检测站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "70f2ef02-9ee7-4062-b801-554ce00bb6a3",
    user_name: "liuchaofan",
    display_name: "刘超凡",
    user_phone: "",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["examine"],
    userAccess: "examine",
    group_id: "4",
    group_name: "静音检测站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "57095390-9c42-41d4-ad8b-51f059bc83ac",
    user_name: "proline_leader",
    display_name: "产线线长",
    user_phone: "",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["proline_leader"],
    userAccess: "proline_leader",
    group_id: "6",
    group_name: "条码站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "61144682-7438-47f1-9570-c7ddf6213832",
    user_name: "tuwenxuan",
    display_name: "涂文轩",
    user_phone: "",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["examine"],
    userAccess: "examine",
    group_id: "3",
    group_name: "综合检测站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "c151b4b4-3bdc-4522-933a-5de6157bf5b1",
    user_name: "wangmingxue",
    display_name: "王明雪",
    user_phone: "",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["examine"],
    userAccess: "examine",
    group_id: "4",
    group_name: "静音检测站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "75d5298a-2ba8-4308-80d7-cbed61ec420d",
    user_name: "workshop_manager",
    display_name: "车间主管",
    user_phone: "",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["workshop_manager"],
    userAccess: "workshop_manager",
    group_id: "5",
    group_name: "外观检测站",
    lock_flag: "0"
  },
  {
    id: null,
    user_id: "1c66b592-f522-456d-86b3-cdf2191abcb4",
    user_name: "zhangjiahui",
    display_name: "张家辉",
    user_phone: "14566786543",
    user_avator: "",
    user_pwd: "2019@cestc",
    user_access: ["examine"],
    userAccess: "examine",
    group_id: "3",
    group_name: "综合检测站",
    lock_flag: "0"
  }
];

// 角色列表
const roleList = [
  {
    name: "admin",
    title: "管理员",
    description: "系统管理员，管理管理中心",
    menus: [
      {
        functionName: "首页概览",
        functionId: 1
      },
      {
        functionName: "车间驾驶舱",
        functionId: 2
      },
      {
        functionName: "产线驾驶舱",
        functionId: 3
      },
      {
        functionName: "检测员",
        functionId: 4
      },
      {
        functionName: "任务派发",
        functionId: 5
      },
      {
        functionName: "历史任务",
        functionId: 6
      },
      {
        functionName: "查看SOP",
        functionId: 7
      },
      {
        functionName: "条码打印",
        functionId: 8
      },
      {
        functionName: "检测列表",
        functionId: 9
      },
      {
        functionName: "追溯查询",
        functionId: 10
      },
      {
        functionName: "异常确认",
        functionId: 11
      },
      {
        functionName: "账号管理",
        functionId: 12
      },
      {
        functionName: "角色管理",
        functionId: 13
      },
      {
        functionName: "组合管理",
        functionId: 14
      },
      {
        functionName: "异常原因",
        functionId: 15
      },
      {
        functionName: "SOP配置",
        functionId: 16
      },
      {
        functionName: "数据配置",
        functionId: 17
      },
      {
        functionName: "配方配置",
        functionId: 18
      },
      {
        functionName: "设备配置",
        functionId: 19
      },
      {
        functionName: "工位配置",
        functionId: 20
      },
      {
        functionName: "产线配置",
        functionId: 21
      }
    ],
    users: ["admin"],
    id: 1
  },
  {
    name: "cestc",
    title: "工程师",
    description: "系统工程师，管理配置中心",
    menus: [
      {
        functionName: "账号管理",
        functionId: 12
      },
      {
        functionName: "角色管理",
        functionId: 13
      },
      {
        functionName: "组合管理",
        functionId: 14
      },
      {
        functionName: "异常原因",
        functionId: 15
      },
      {
        functionName: "SOP配置",
        functionId: 16
      },
      {
        functionName: "数据配置",
        functionId: 17
      },
      {
        functionName: "配方配置",
        functionId: 18
      },
      {
        functionName: "设备配置",
        functionId: 19
      },
      {
        functionName: "工位配置",
        functionId: 20
      },
      {
        functionName: "产线配置",
        functionId: 21
      }
    ],
    users: ["cestc"],
    id: 2
  },
  {
    name: "workshop_manager",
    title: "车间主管",
    description: "车间主管，管理整个车间",
    menus: [
      {
        functionName: "车间驾驶舱",
        functionId: 2
      },
      {
        functionName: "产线驾驶舱",
        functionId: 3
      },
      {
        functionName: "检测列表",
        functionId: 9
      },
      {
        functionName: "追溯查询",
        functionId: 10
      },
      {
        functionName: "账号管理",
        functionId: 12
      },
      {
        functionName: "角色管理",
        functionId: 13
      },
      {
        functionName: "组合管理",
        functionId: 14
      },
      {
        functionName: "异常原因",
        functionId: 15
      }
    ],
    users: ["workshop_manager"],
    id: 3
  },
  {
    name: "proline_leader",
    title: "产线线长",
    description: "产线线长，管理单条产线",
    menus: [
      {
        functionName: "首页概览",
        functionId: 1
      },
      {
        functionName: "产线驾驶舱",
        functionId: 3
      },
      {
        functionName: "检测员",
        functionId: 4
      },
      {
        functionName: "任务派发",
        functionId: 5
      },
      {
        functionName: "历史任务",
        functionId: 6
      },
      {
        functionName: "查看SOP",
        functionId: 7
      },
      {
        functionName: "条码打印",
        functionId: 8
      },
      {
        functionName: "检测列表",
        functionId: 9
      },
      {
        functionName: "追溯查询",
        functionId: 10
      },
      {
        functionName: "异常确认",
        functionId: 11
      },
      {
        functionName: "异常原因",
        functionId: 15
      }
    ],
    users: ["proline_leader"],
    id: 4
  },
  {
    name: "examine",
    title: "检测员",
    description: "检测员，负责检测产品",
    menus: [
      {
        id: "8502de35df2c4d19ad337c5548f661b4",
        name: "sopMessage/message",
        title: "查看SOP",
        url: "sopMessage/message",
        path: "8taskManage/sopMessage",
        sort: 13,
        parenetId: "root",
        parenetPath: "root",
        status: 1,
        description: "",
        ico: "md-document"
      },
      {
        id: "c64f399d2c03445dbfa2b23c240e2dc6",
        name: "number/print",
        title: "条码打印",
        url: "number/print",
        path: "3manage/number",
        sort: 11,
        parenetId: "root",
        parenetPath: "root",
        status: 1,
        description: "",
        ico: "md-print"
      },
      {
        id: "6939e2b2b0fa4c5b942c365278a8aab3",
        name: "check/checkSearch",
        title: "追溯查询",
        url: "check/checkSearch",
        path: "2systemManage/checkSearch",
        sort: 7,
        parenetId: "root",
        parenetPath: "root",
        status: 1,
        description: "",
        ico: "md-git-pull-request"
      },
      {
        id: "013ad32e79c44427a8cad340fb056821",
        name: "report",
        title: "报表中心",
        url: "report",
        path: "",
        sort: 3,
        parenetId: "root",
        parenetPath: "root",
        status: 1,
        description: "",
        ico: "md-analytics"
      },
      {
        id: "82814bef61934f5aadb4e1e84608f414",
        name: "view",
        title: "异常产品报表",
        url: "view/12",
        path: "3manage/mould/reportView",
        sort: 1,
        parenetId: "013ad32e79c44427a8cad340fb056821",
        parenetPath: "root.013ad32e79c44427a8cad340fb056821",
        status: 1,
        description: "",
        ico: ""
      }
    ],
    users: ["examine", "liuchaofan", "tuwenxuan", "wangmingxue", "zhangjiahui"],
    id: 5
  }
];

// 菜单列表
const menuList = [
  {
    id: "e5a45a1b877a4aa78f3baaee6e1dcb65",
    name: "home",
    title: "首页概览",
    url: "/home",
    path: "single-page/home/home",
    sort: 21,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-home",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "5745a3d62b354300a282662b6825ed0f",
    name: "control-leader-shop",
    title: "驾驶舱",
    url: "6inspector/controlCabin",
    path: "",
    sort: 19,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-laptop",
    isOutSide: false,
    showLevel: 1
  },
  {
    id: "b058f93cee0c43199ce9af19f17cffa9",
    name: "inspect/inspector",
    title: "检测员",
    url: "inspect/inspector",
    path: "1inspector/inspector",
    sort: 17,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-person",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "ef93f8fe1b154de688bcbaab1a2a88ef",
    name: "task",
    title: "任务管理",
    url: "task",
    path: "",
    sort: 15,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-shuffle",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "8502de35df2c4d19ad337c5548f661b4",
    name: "sopMessage/message",
    title: "查看SOP",
    url: "sopMessage/message",
    path: "8taskManage/sopMessage",
    sort: 13,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-document",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "2",
    name: "account",
    title: "账号管理",
    url: "account",
    path: "3manage/account",
    sort: 13,
    parenetId: "d30bf0ff035c4e51875e7014ad46e1af",
    parenetPath: "root.d30bf0ff035c4e51875e7014ad46e1af",
    status: 1,
    description: "系统账号管理",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "3",
    name: "role",
    title: "角色管理",
    url: "role",
    path: "3manage/role",
    sort: 12,
    parenetId: "d30bf0ff035c4e51875e7014ad46e1af",
    parenetPath: "root.d30bf0ff035c4e51875e7014ad46e1af",
    status: 1,
    description: "系统角色管理",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "c64f399d2c03445dbfa2b23c240e2dc6",
    name: "number/print",
    title: "条码打印",
    url: "number/print",
    path: "3manage/number",
    sort: 11,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-print",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "23001d1a12fe43ceac9769ee08f899f2",
    name: "menu",
    title: "菜单管理",
    url: "menu",
    path: "3manage/menu",
    sort: 11,
    parenetId: "d30bf0ff035c4e51875e7014ad46e1af",
    parenetPath: "root.d30bf0ff035c4e51875e7014ad46e1af",
    status: 1,
    description: "",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "7",
    name: "sop",
    title: "SOP配置",
    url: "sop",
    path: "3manage/sop",
    sort: 10,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "SOP步骤配置",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "7a6bc598bead4430adf85cd56925e29a",
    name: "electric/electricSearch",
    title: "检测列表",
    url: "electric/electricSearch",
    path: "2systemManage/electricSearch",
    sort: 9,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-options",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "8",
    name: "process",
    title: "数据配置",
    url: "process",
    path: "3manage/process",
    sort: 9,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "数据配置",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "eafbc8e5c0fe4b3abe48fd27018a6c79",
    name: "checkStandard",
    title: "配方配置",
    url: "checkStandard",
    path: "3manage/checkStandard",
    sort: 8,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "66",
    name: "sncode",
    title: "组合管理",
    url: "sncode",
    path: "3manage/snCode",
    sort: 8,
    parenetId: "d30bf0ff035c4e51875e7014ad46e1af",
    parenetPath: "root.d30bf0ff035c4e51875e7014ad46e1af",
    status: 1,
    description: "sop配方组合管理",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "cd63fe39ae954aacbaea376da1235b81",
    name: "equipment",
    title: "设备配置",
    url: "equipment",
    path: "3manage/equipment",
    sort: 7,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "5",
    name: "reject",
    title: "异常原因",
    url: "reject",
    path: "3manage/reject",
    sort: 7,
    parenetId: "d30bf0ff035c4e51875e7014ad46e1af",
    parenetPath: "root.d30bf0ff035c4e51875e7014ad46e1af",
    status: 1,
    description: "产品异常原因管理",
    ico: null,
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "6939e2b2b0fa4c5b942c365278a8aab3",
    name: "check/checkSearch",
    title: "追溯查询",
    url: "check/checkSearch",
    path: "2systemManage/checkSearch",
    sort: 7,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-git-pull-request",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "5c6c5998a7d8426390bd7f2cfe7c1bcf",
    name: "workStation",
    title: "工位配置",
    url: "workStation",
    path: "3manage/workStation",
    sort: 6,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "3c557f993903480a8a5db6f472b8f36e",
    name: "proLine",
    title: "产线配置",
    url: "proLine",
    path: "3manage/proLine",
    sort: 5,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "cd306e3afe40442d971b2ddc6c1a02d4",
    name: "systemManage/checkReason",
    title: "异常确认",
    url: "systemManage/checkReason",
    path: "2systemManage/checkReason",
    sort: 5,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-bug",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "f938e2ef05d4496c9ba0934ce36d38df",
    name: "svg",
    title: "动态svg",
    url: "svg",
    path: "3manage/svg",
    sort: 4,
    parenetId: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    parenetPath: "root.0e1ddfaa1e7d49cdabd3aa045889e6d0",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "6b2d3c49373946989262e586d655dccf",
    name: "mould",
    title: "模板配置",
    url: "mould",
    path: "3manage/mould/index",
    sort: 3,
    parenetId: "013ad32e79c44427a8cad340fb056821",
    parenetPath: "root.013ad32e79c44427a8cad340fb056821",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "013ad32e79c44427a8cad340fb056821",
    name: "report",
    title: "报表中心",
    url: "report",
    path: "",
    sort: 3,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "",
    ico: "md-analytics",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "3db9fdd0ada749dab01149fa0248eb23",
    name: "distribute",
    title: "任务派发",
    url: "distribute",
    path: "8taskManage/taskDistribution",
    sort: 2,
    parenetId: "ef93f8fe1b154de688bcbaab1a2a88ef",
    parenetPath: "root.ef93f8fe1b154de688bcbaab1a2a88ef",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "d30bf0ff035c4e51875e7014ad46e1af",
    name: "manage",
    title: "管理中心",
    url: "manage",
    path: "",
    sort: 2,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "系统基础配置",
    ico: "md-settings",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "82814bef61934f5aadb4e1e84608f414",
    name: "view",
    title: "异常产品报表",
    url: "view/12",
    path: "3manage/mould/reportView",
    sort: 1,
    parenetId: "013ad32e79c44427a8cad340fb056821",
    parenetPath: "root.013ad32e79c44427a8cad340fb056821",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "e7dfaf2ec6aa482c93410d9b4e2323e5",
    name: "history",
    title: "历史任务",
    url: "history",
    path: "8taskManage/taskHistory",
    sort: 1,
    parenetId: "ef93f8fe1b154de688bcbaab1a2a88ef",
    parenetPath: "root.ef93f8fe1b154de688bcbaab1a2a88ef",
    status: 1,
    description: "",
    ico: "",
    isOutSide: false,
    showLevel: 3
  },
  {
    id: "0e1ddfaa1e7d49cdabd3aa045889e6d0",
    name: "dispose",
    title: "配置中心",
    url: "dispose",
    path: "",
    sort: 1,
    parenetId: "root",
    parenetPath: "root",
    status: 1,
    description: "业务基础配置",
    ico: "md-build",
    isOutSide: false,
    showLevel: 3
  }
];

// 菜单层级
const menuLevel = [
  {
    label: "不含菜单栏和面包屑",
    value: "1"
  },
  {
    label: "含菜单栏不含面包屑",
    value: "2"
  },
  {
    label: "含菜单栏和面包屑",
    value: "3"
  }
];

export { userList, roleList, menuList, menuLevel };
