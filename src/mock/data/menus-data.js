export default [
  // home
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: "Main",
    meta: {
      notCache: true,
      access: ["admin", "proline_leader"]
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首页概览",
          notCache: true,
          icon: "md-home",
          access: ["admin", "proline_leader"]
        },
        component: "single-page/home/home"
      }
    ]
  },

  // 检测驾驶舱 - 车间（管理员或车间主管）
  {
    path: "/control-leader-shop",
    name: "control-leader-shop",
    meta: {
      icon: "md-laptop",
      title: "驾驶舱",
      hideInBread: true,
      // hideInMenu: true,
      access: ["admin", "workshop_manager"]
    },
    component: "6inspector/controlCabin",
    children: []
  },

  // 检测驾驶舱 - 产线（非管理员或车间主管）
  {
    path: "/control-line",
    name: "control-line",
    meta: {
      icon: "md-laptop",
      title: "驾驶舱",
      hideInBread: true,
      access: ["proline_leader"]
    },
    component: "6inspector/controlCabinLine"
  },

  // 检测驾驶舱 - 产线（管理员和车间主管）
  {
    path: "/control-leader-line",
    name: "control-leader-line",
    meta: {
      icon: "md-laptop",
      title: "驾驶舱",
      hideInBread: true,
      hideInMenu: true,
      access: ["admin", "workshop_manager"]
    },
    component: "6inspector/controlCabinLine"
  },

  // 检测员
  {
    path: "/inspect",
    name: "inspect",
    meta: {
      hideInBread: true,
      access: ["admin", "proline_leader", "examine"]
    },
    component: "Main",
    children: [
      {
        path: "inspector",
        name: "inspector",
        meta: {
          icon: "md-person",
          title: "检测员",
          access: ["admin", "proline_leader", "examine"]
        },
        component: "1inspector/inspector"
      }
    ]
  },

  // 任务派发
  {
    path: "/task",
    name: "task",
    meta: {
      hideInBread: true,
      title: "任务管理",
      icon: "md-shuffle",
      access: ["admin", "proline_leader"]
    },
    component: "Main",
    children: [
      {
        path: "distribute",
        name: "distribute",
        meta: {
          title: "任务派发",
          access: ["admin", "proline_leader"]
        },
        component: "8taskManage/taskDistribution"
      },
      {
        path: "history",
        name: "history",
        meta: {
          title: "历史任务",
          access: ["admin", "proline_leader"]
        },
        component: "8taskManage/taskHistory"
      }
    ]
  },

  // mes演示
  // {
  //   path: "/erp",
  //   name: "erp",
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: "8taskManage/taskDistributionMes"
  // },

  // 查看SOP
  {
    path: "/sop",
    name: "sopMessage",
    meta: {
      hideInBread: true,
      access: ["admin", "proline_leader", "examine"]
    },
    component: "Main",
    children: [
      {
        path: "message",
        name: "message",
        meta: {
          title: "查看SOP",
          icon: "md-document",
          access: ["admin", "proline_leader", "examine"]
        },
        component: "8taskManage/sopMessage"
      }
    ]
  },

  // 条码打印
  {
    path: "/number",
    name: "number",
    meta: {
      hideInBread: true,
      access: ["admin", "proline_leader", "examine"]
    },
    component: "Main",
    children: [
      {
        path: "print",
        name: "print",
        meta: {
          icon: "md-print",
          title: "条码打印",
          access: ["admin", "proline_leader", "examine"]
        },
        component: "3manage/number"
      }
    ]
  },

  // 检测列表
  {
    path: "/electric",
    name: "electric",
    meta: {
      hideInBread: true,
      access: ["admin", "workshop_manager", "proline_leader"]
    },
    component: "Main",
    children: [
      {
        path: "electricSearch",
        name: "electricSearch",
        meta: {
          icon: "md-options",
          title: "检测列表",
          access: ["admin", "workshop_manager", "proline_leader"]
        },
        component: "2systemManage/electricSearch"
      }
    ]
  },

  // 追溯查询
  {
    path: "/check",
    name: "check",
    meta: {
      hideInBread: true,
      access: ["admin", "workshop_manager", "proline_leader", "examine"]
    },
    component: "Main",
    children: [
      {
        path: "checkSearch",
        name: "checkSearch",
        meta: {
          icon: "md-git-pull-request",
          title: "追溯查询",
          access: ["admin", "workshop_manager", "proline_leader", "examine"]
        },
        component: "2systemManage/checkSearch"
      }
    ]
  },

  // 异常确认
  {
    path: "/systemManage",
    name: "systemManage",
    meta: {
      hideInBread: true,
      title: "异常确认",
      icon: "md-bug",
      access: ["admin", "proline_leader"]
    },
    component: "Main",
    children: [
      {
        path: "checkReason",
        name: "checkReason",
        meta: {
          icon: "md-bug",
          title: "异常确认",
          access: ["admin", "proline_leader"]
        },
        component: "2systemManage/checkReason"
      }
    ]
  },

  // 管理中心
  {
    path: "/manage",
    name: "manage",
    meta: {
      hideInBread: true,
      title: "管理中心",
      icon: "md-settings",
      access: ["admin", "cestc", "workshop_manager", "proline_leader"]
    },
    component: "Main",
    children: [
      {
        path: "account",
        name: "account",
        meta: {
          title: "账号管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: "3manage/account"
      },
      {
        path: "role",
        name: "role",
        meta: {
          title: "角色管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: "3manage/role"
      },
      {
        path: "menu",
        name: "menu",
        meta: {
          title: "菜单管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: "3manage/menu"
      },
      {
        path: "snCode",
        name: "snCode",
        meta: {
          title: "组合管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: "3manage/snCode"
      },
      {
        path: "reject",
        name: "reject",
        meta: {
          title: "异常原因",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager", "proline_leader"]
        },
        component: "3manage/reject"
      }
    ]
  },

  // 配置中心
  {
    path: "/dispose",
    name: "dispose",
    meta: {
      hideInBread: true,
      title: "配置中心",
      icon: "md-build",
      access: ["admin", "cestc"]
    },
    component: "Main",
    children: [
      {
        path: "sop",
        name: "sop",
        meta: {
          title: "SOP配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/sop"
      },
      {
        path: "process",
        name: "process",
        meta: {
          title: "数据配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/process"
      },
      {
        path: "checkStandard",
        name: "checkStandard",
        meta: {
          title: "配方配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/checkStandard"
      },
      {
        path: "equipment",
        name: "equipment",
        meta: {
          title: "设备配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/equipment"
      },
      {
        path: "workStation",
        name: "workStation",
        meta: {
          title: "工位配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/workStation"
      },
      {
        path: "proLine",
        name: "proLine",
        meta: {
          title: "产线配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/proLine"
      },
      // {
      //   path: "handsontable",
      //   name: "handsontable",
      //   meta: {
      //     title: "动态表格",
      //     access: ["admin", "cestc"]
      //   },
      //   component: "3manage/hansontable/index"
      // },
      {
        path: "svg",
        name: "svg-drawing",
        meta: {
          title: "动态svg",
          access: ["admin", "cestc"]
        },
        component: "3manage/svg"
      },
      {
        path: "mould",
        name: "mould",
        meta: {
          title: "模板配置",
          access: ["admin", "cestc"]
        },
        component: "3manage/mould/index"
      }
    ]
  }

  // {
  //   path: "/401",
  //   name: "error_401",
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: "error-page/401"
  // },
  // {
  //   path: "/500",
  //   name: "error_500",
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: "error-page/500"
  // },
  // {
  //   path: "*",
  //   name: "error_404",
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: "error-page/404"
  // }
];
