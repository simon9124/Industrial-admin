// 角色列表
const roleList = [
  {
    roleName: "管理员",
    menuFunction: [
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
    role_id: 1
  },
  {
    roleName: "工程师",
    menuFunction: [
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
    role_id: 2
  },
  {
    roleName: "车间主管",
    menuFunction: [
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
    role_id: 3
  },
  {
    roleName: "产线线长",
    menuFunction: [
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
    role_id: 4
  },
  {
    roleName: "检测员",
    menuFunction: [
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
    role_id: 5
  }
];

// 菜单列表
const menuList = [
  {
    menuName: "首页概览",
    menuId: 1
  },
  {
    menuName: "车间驾驶舱",
    menuId: 2
  },
  {
    menuName: "产线驾驶舱",
    menuId: 3
  },
  {
    menuName: "检测员",
    menuId: 4
  },
  {
    menuName: "任务派发",
    menuId: 5
  },
  {
    menuName: "历史任务",
    menuId: 6
  },
  {
    menuName: "查看SOP",
    menuId: 7
  },
  {
    menuName: "条码打印",
    menuId: 8
  },
  {
    menuName: "检测列表",
    menuId: 9
  },
  {
    menuName: "追溯查询",
    menuId: 10
  },
  {
    menuName: "异常确认",
    menuId: 11
  },
  {
    menuName: "账号管理",
    menuId: 12
  },
  {
    menuName: "角色管理",
    menuId: 13
  },
  {
    menuName: "组合管理",
    menuId: 14
  },
  {
    menuName: "异常原因",
    menuId: 15
  },
  {
    menuName: "SOP配置",
    menuId: 16
  },
  {
    menuName: "数据配置",
    menuId: 17
  },
  {
    menuName: "配方配置",
    menuId: 18
  },
  {
    menuName: "设备配置",
    menuId: 19
  },
  {
    menuName: "工位配置",
    menuId: 20
  },
  {
    menuName: "产线配置",
    menuId: 21
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
