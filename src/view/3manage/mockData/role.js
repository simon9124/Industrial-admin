// 角色列表
const roleList = [
  {
    roleName: "管理员",
    menuFunction: [
      {
        functionName: "首页概览"
      },
      {
        functionName: "车间驾驶舱"
      },
      {
        functionName: "产线驾驶舱"
      },
      {
        functionName: "检测员"
      },
      {
        functionName: "任务派发"
      },
      {
        functionName: "历史任务"
      },
      {
        functionName: "查看SOP"
      },
      {
        functionName: "条码打印"
      },
      {
        functionName: "检测列表"
      },
      {
        functionName: "追溯查询"
      },
      {
        functionName: "异常确认"
      },
      {
        functionName: "账号管理"
      },
      {
        functionName: "角色管理"
      },
      {
        functionName: "组合管理"
      },
      {
        functionName: "异常原因"
      },
      {
        functionName: "SOP配置"
      },
      {
        functionName: "数据配置"
      },
      {
        functionName: "配方配置"
      },
      {
        functionName: "设备配置"
      },
      {
        functionName: "工位配置"
      },
      {
        functionName: "产线配置"
      }
    ],
    users: ["admin"],
    role_id: 1
  },
  {
    roleName: "工程师",
    menuFunction: [
      {
        functionName: "账号管理"
      },
      {
        functionName: "角色管理"
      },
      {
        functionName: "组合管理"
      },
      {
        functionName: "异常原因"
      },
      {
        functionName: "SOP配置"
      },
      {
        functionName: "数据配置"
      },
      {
        functionName: "配方配置"
      },
      {
        functionName: "设备配置"
      },
      {
        functionName: "工位配置"
      },
      {
        functionName: "产线配置"
      }
    ],
    users: ["cestc"],
    role_id: 2
  },
  {
    roleName: "车间主管",
    menuFunction: [
      {
        functionName: "车间驾驶舱"
      },
      {
        functionName: "产线驾驶舱"
      },
      {
        functionName: "检测列表"
      },
      {
        functionName: "追溯查询"
      },
      {
        functionName: "账号管理"
      },
      {
        functionName: "角色管理"
      },
      {
        functionName: "组合管理"
      },
      {
        functionName: "异常原因"
      }
    ],
    users: ["workshop_manager"],
    role_id: 3
  },
  {
    roleName: "产线线长",
    menuFunction: [
      {
        functionName: "首页概览"
      },

      {
        functionName: "产线驾驶舱"
      },
      {
        functionName: "检测员"
      },
      {
        functionName: "任务派发"
      },
      {
        functionName: "历史任务"
      },
      {
        functionName: "查看SOP"
      },
      {
        functionName: "条码打印"
      },
      {
        functionName: "检测列表"
      },
      {
        functionName: "追溯查询"
      },
      {
        functionName: "异常确认"
      },
      {
        functionName: "异常原因"
      }
    ],
    users: ["proline_leader"],
    role_id: 4
  },
  {
    roleName: "检测员",
    menuFunction: [
      {
        functionName: "检测员"
      },
      {
        functionName: "查看SOP"
      },
      {
        functionName: "条码打印"
      },
      {
        functionName: "追溯查询"
      }
    ],
    users: ["examine", "liuchaofan", "tuwenxuan", "wangmingxue", "zhangjiahui"],
    role_id: 5
  }
];

// 菜单列表
const menuList = [
  {
    menuName: "首页概览"
  },
  {
    menuName: "车间驾驶舱"
  },
  {
    menuName: "产线驾驶舱"
  },
  {
    menuName: "检测员"
  },
  {
    menuName: "任务派发"
  },
  {
    menuName: "历史任务"
  },
  {
    menuName: "查看SOP"
  },
  {
    menuName: "条码打印"
  },
  {
    menuName: "检测列表"
  },
  {
    menuName: "追溯查询"
  },
  {
    menuName: "异常确认"
  },
  {
    menuName: "账号管理"
  },
  {
    menuName: "角色管理"
  },
  {
    menuName: "组合管理"
  },
  {
    menuName: "异常原因"
  },
  {
    menuName: "SOP配置"
  },
  {
    menuName: "数据配置"
  },
  {
    menuName: "配方配置"
  },
  {
    menuName: "设备配置"
  },
  {
    menuName: "工位配置"
  },
  {
    menuName: "产线配置"
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
