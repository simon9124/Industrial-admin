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
// const menuList = [
//   {
//     menuName: "首页概览",
//     menuId: 1
//   },
//   {
//     menuName: "车间驾驶舱",
//     menuId: 2
//   },
//   {
//     menuName: "产线驾驶舱",
//     menuId: 3
//   },
//   {
//     menuName: "检测员",
//     menuId: 4
//   },
//   {
//     menuName: "任务派发",
//     menuId: 5
//   },
//   {
//     menuName: "历史任务",
//     menuId: 6
//   },
//   {
//     menuName: "查看SOP",
//     menuId: 7
//   },
//   {
//     menuName: "条码打印",
//     menuId: 8
//   },
//   {
//     menuName: "检测列表",
//     menuId: 9
//   },
//   {
//     menuName: "追溯查询",
//     menuId: 10
//   },
//   {
//     menuName: "异常确认",
//     menuId: 11
//   },
//   {
//     menuName: "账号管理",
//     menuId: 12
//   },
//   {
//     menuName: "角色管理",
//     menuId: 13
//   },
//   {
//     menuName: "组合管理",
//     menuId: 14
//   },
//   {
//     menuName: "异常原因",
//     menuId: 15
//   },
//   {
//     menuName: "SOP配置",
//     menuId: 16
//   },
//   {
//     menuName: "数据配置",
//     menuId: 17
//   },
//   {
//     menuName: "配方配置",
//     menuId: 18
//   },
//   {
//     menuName: "设备配置",
//     menuId: 19
//   },
//   {
//     menuName: "工位配置",
//     menuId: 20
//   },
//   {
//     menuName: "产线配置",
//     menuId: 21
//   }
// ];
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
    id: "6",
    name: "manage",
    title: "配置中心",
    url: null,
    path: "/dispose",
    sort: 1,
    parenetId: "root",
    parenetPath: null,
    status: 1,
    description: "业务基础配置"
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
    description: "系统基础配置"
  }
];

// 用户列表
const userList = [
  "admin",
  "cestc",
  "workshop_manager",
  "proline_leader",
  "examine",
  "liuchaofan",
  "tuwenxuan",
  "wangmingxue",
  "zhangjiahui"
];

export { roleList, menuList, userList };
