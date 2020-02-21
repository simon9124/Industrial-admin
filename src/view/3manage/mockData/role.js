// 角色列表
const roleList = [
  {
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
    title: "检测员",
    description: "检测员，负责检测产品",
    menus: [
      {
        functionName: "检测员",
        functionId: 4
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
        functionName: "追溯查询",
        functionId: 10
      }
    ],
    users: ["examine", "liuchaofan", "tuwenxuan", "wangmingxue", "zhangjiahui"],
    id: 5
  }
];

// 菜单列表
const menuList = [
  {
    id: "2",
    name: "account",
    title: "账号管理",
    url: "/manage/account",
    path: "/manage",
    sort: 10,
    parenetId: "1",
    parenetPath: "1",
    status: 1,
    description: "系统账号管理"
  },
  {
    id: "3",
    name: "role",
    title: "角色管理",
    url: "/manage/role",
    path: "/manage",
    sort: 9,
    parenetId: "1",
    parenetPath: "1",
    status: 1,
    description: "系统角色管理"
  },
  {
    id: "4",
    name: "sncode",
    title: "组合管理",
    url: "/manage/sncode",
    path: "/manage",
    sort: 8,
    parenetId: "1",
    parenetPath: "1",
    status: 1,
    description: "sop配方组合管理"
  },
  {
    id: "5",
    name: "reject",
    title: "异常原因",
    url: "/manage/reject",
    path: "/manage",
    sort: 7,
    parenetId: "1",
    parenetPath: "1",
    status: 1,
    description: "产品异常原因管理"
  },
  {
    id: "7",
    name: "sop",
    title: "SOP配置",
    url: "/dispose/sop",
    path: "/dispose",
    sort: 10,
    parenetId: "6",
    parenetPath: "6",
    status: 1,
    description: "SOP步骤配置"
  },
  {
    id: "11",
    name: "步骤1",
    title: "步骤1",
    url: "/dispose/sop/1",
    path: "/dispose",
    sort: 10,
    parenetId: "7",
    parenetPath: "7",
    status: 1,
    description: "SOP步骤配置"
  },
  {
    id: "12",
    name: "步骤2",
    title: "步骤2",
    url: "/dispose/sop/2",
    path: "/dispose",
    sort: 10,
    parenetId: "7",
    parenetPath: "7",
    status: 1,
    description: "SOP步骤配置"
  },
  {
    id: "8",
    name: "process",
    title: "数据配置",
    url: "/dispose/process",
    path: "/dispose",
    sort: 9,
    parenetId: "6",
    parenetPath: "6",
    status: 1,
    description: "数据配置"
  },
  {
    id: "13",
    name: "步骤1",
    title: "步骤1",
    url: "/dispose/process/1",
    path: "/dispose",
    sort: 10,
    parenetId: "8",
    parenetPath: "8",
    status: 1,
    description: "SOP步骤配置"
  },
  {
    id: "14",
    name: "步骤2",
    title: "步骤2",
    url: "/dispose/process/2",
    path: "/dispose",
    sort: 10,
    parenetId: "8",
    parenetPath: "8",
    status: 1,
    description: "SOP步骤配置"
  },
  {
    id: "6",
    name: "manage",
    title: "配置中心",
    url: null,
    path: "/dispose",
    sort: 1,
    parenetId: "root",
    parenetPath: null,
    status: 1,
    description: "业务基础配置",
    ico: "md-build"
  },
  {
    id: "1",
    name: "manage",
    title: "管理中心",
    url: null,
    path: "/manage",
    sort: 2,
    parenetId: "root",
    parenetPath: null,
    status: 1,
    description: "系统基础配置",
    ico: "md-settings"
  }
];

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
    user_access: ["admin"],
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

export { roleList, menuList, userList };
