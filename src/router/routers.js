import Main from "@/components/main";

// import parentView from '@/components/parent-view';

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  // login
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Login - 登录",
      hideInMenu: true
    },
    component: () => import("@/view/login/login.vue")
  },

  // home
  {
    path: "/",
    name: "_home",
    redirect: "/home",
    component: Main,
    meta: {
      // hideInMenu: true,
      notCache: true,
      access: ["admin", "proline_leader"]
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          // hideInMenu: true,
          title: "首页概览",
          notCache: true,
          icon: "md-home",
          access: ["admin", "proline_leader"]
        },
        component: () => import("@/view/single-page/home")
      }
    ]
  },

  // epidemic
  // {
  //   path: "/epidemic",
  //   name: "epidemic",
  //   meta: {
  //     title: "疫情监控",
  //     hideInMenu: true
  //   },
  //   component: () => import("@/view/6inspector/epidemic.vue")
  // },

  // 错误收集
  {
    path: "/error_logger",
    name: "error_logger",
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: "error_logger_page",
        name: "error_logger_page",
        meta: {
          icon: "ios-bug",
          title: "错误收集"
        },
        component: () => import("@/view/single-page/error-logger.vue")
      }
    ]
  },

  // 检测驾驶舱 - 车间（非车间主管）
  // {
  //   path: "/control-shop",
  //   name: "control-shop",
  //   meta: {
  //     title: "驾驶舱",
  //     hideInBread: true,
  //     hideInMenu: true,
  //     access: ["admin"]
  //   },
  //   component: () => import("@/view/6inspector/controlCabin.vue")
  // },

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
    component: () => import("@/view/6inspector/controlCabin.vue")
  },

  // 检测驾驶舱 - 产线（非管理员或车间主管）
  {
    path: "/control-line",
    name: "control-line",
    meta: {
      icon: "md-laptop",
      title: "驾驶舱",
      hideInBread: true,
      // hideInMenu: true,
      access: ["proline_leader"]
    },
    component: () => import("@/view/6inspector/controlCabinLine.vue")
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
    component: () => import("@/view/6inspector/controlCabinLine.vue")
  },

  // 检测员
  {
    path: "/inspect",
    name: "inspect",
    meta: {
      hideInBread: true,
      access: ["admin", "proline_leader", "examine"]
    },
    component: Main,
    children: [
      {
        path: "inspector",
        name: "inspector",
        meta: {
          icon: "md-person",
          title: "检测员",
          access: ["admin", "proline_leader", "examine"]
        },
        component: () => import("@/view/1inspector/inspector.vue")
      }
    ]
  },

  // 操作行为分析
  // {
  //   path: '/operation',
  //   name: 'operation',
  //   meta: {
  //     icon: 'md-hand',
  //     title: '操作行为分析',
  //     hideInBread: true
  //   },
  //   component: () => import('@/view/7operationBehavior/controlCabin.vue')
  // },

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
    component: Main,
    children: [
      {
        path: "distribute",
        name: "distribute",
        meta: {
          title: "任务派发",
          access: ["admin", "proline_leader"]
        },
        component: () => import("@/view/8taskManage/taskDistribution.vue")
      },
      {
        path: "history",
        name: "history",
        meta: {
          title: "历史任务",
          access: ["admin", "proline_leader"]
        },
        component: () => import("@/view/8taskManage/taskHistory.vue")
      }
    ]
  },

  // mes演示
  {
    path: "/erp",
    name: "erp",
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: () => import("@/view/8taskManage/taskDistributionMes.vue")
  },

  // 查看SOP
  {
    path: "/sop",
    name: "sopMessage",
    meta: {
      hideInBread: true,
      access: ["admin", "proline_leader", "examine"]
    },
    component: Main,
    children: [
      {
        path: "message",
        name: "message",
        meta: {
          title: "查看SOP",
          icon: "md-document",
          access: ["admin", "proline_leader", "examine"]
        },
        component: () => import("@/view/8taskManage/sopMessage.vue")
      }
    ]
  },

  // 查看报表
  // {
  //   path: "/iframe",
  //   name: "iframe",
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: "chart",
  //       name: "chart",
  //       meta: {
  //         title: "查看报表",
  //         icon: "md-document"
  //       },
  //       component: () => import("@/view/8taskManage/iframe.vue")
  //     }
  //   ]
  // },

  // 条码打印
  {
    path: "/number",
    name: "number",
    meta: {
      hideInBread: true,
      access: ["admin", "proline_leader", "examine"]
    },
    component: Main,
    children: [
      {
        path: "print",
        name: "print",
        meta: {
          icon: "md-print",
          title: "条码打印",
          access: ["admin", "proline_leader", "examine"]
        },
        component: () => import("@/view/3manage/number.vue")
      }
    ]
  },

  // 实时监控
  // {
  //   path: "/mqtt",
  //   name: "mqtt",
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: "data",
  //       name: "data",
  //       meta: {
  //         icon: "md-analytics",
  //         title: "实时监控"
  //       },
  //       component: () => import("@/view/2systemManage/mqtt.vue")
  //     }
  //   ]
  // },

  // 检测列表
  {
    path: "/electric",
    name: "electric",
    meta: {
      hideInBread: true,
      access: ["admin", "workshop_manager", "proline_leader"]
    },
    component: Main,
    children: [
      {
        path: "electricSearch",
        name: "electricSearch",
        meta: {
          icon: "md-options",
          title: "检测列表",
          access: ["admin", "workshop_manager", "proline_leader"]
        },
        component: () => import("@/view/2systemManage/electricSearch.vue")
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
    component: Main,
    children: [
      {
        path: "checkSearch",
        name: "checkSearch",
        meta: {
          icon: "md-git-pull-request",
          title: "追溯查询",
          access: ["admin", "workshop_manager", "proline_leader", "examine"]
        },
        component: () => import("@/view/2systemManage/checkSearch.vue")
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
      icon: "md-options",
      access: ["admin", "proline_leader"]
    },
    component: Main,
    children: [
      {
        path: "checkReason",
        name: "checkReason",
        meta: {
          icon: "md-bug",
          title: "异常确认",
          access: ["admin", "proline_leader"]
        },
        component: () => import("@/view/2systemManage/checkReason.vue")
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
    component: Main,
    children: [
      {
        path: "account",
        name: "account",
        meta: {
          title: "账号管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: () => import("@/view/3manage/account.vue")
      },
      {
        path: "role",
        name: "role",
        meta: {
          title: "角色管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: () => import("@/view/3manage/role.vue")
      },
      {
        path: "menu",
        name: "menu",
        meta: {
          title: "菜单管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: () => import("@/view/3manage/menu.vue")
      },
      {
        path: "snCode",
        name: "snCode",
        meta: {
          title: "组合管理",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager"]
        },
        component: () => import("@/view/3manage/snCode.vue")
      },
      {
        path: "reject",
        name: "reject",
        meta: {
          title: "异常原因",
          icon: "md-settings",
          access: ["admin", "cestc", "workshop_manager", "proline_leader"]
        },
        component: () => import("@/view/3manage/reject.vue")
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
    component: Main,
    children: [
      {
        path: "sop",
        name: "sop",
        meta: {
          title: "SOP配置",
          access: ["admin", "cestc"]
        },
        component: () => import("@/view/3manage/sop.vue")
      },
      {
        path: "process",
        name: "process",
        meta: {
          title: "数据配置",
          access: ["admin", "cestc"]
        },
        component: () => import("@/view/3manage/process.vue")
      },
      {
        path: "checkStandard",
        name: "checkStandard",
        meta: {
          title: "配方配置",
          access: ["admin", "cestc"]
        },
        component: () => import("@/view/3manage/checkStandard.vue")
      },
      {
        path: "equipment",
        name: "equipment",
        meta: {
          title: "设备配置",
          access: ["admin", "cestc"]
        },
        component: () => import("@/view/3manage/equipment.vue")
      },
      {
        path: "workStation",
        name: "workStation",
        meta: {
          title: "工位配置",
          access: ["admin", "cestc"]
        },
        component: () => import("@/view/3manage/workStation.vue")
      },
      {
        path: "proLine",
        name: "proLine",
        meta: {
          title: "产线配置",
          access: ["admin", "cestc"]
        },
        component: () => import("@/view/3manage/proLine.vue")
      }
    ]
  },

  // 配置管理
  // {
  //   path: "/dispose",
  //   name: "dispose",
  //   meta: {
  //     hideInBread: true,
  //     title: "配置管理",
  //     icon: "ios-navigate"
  //   },
  //   component: Main,
  //   children: [
  //     // {
  //     //   path: 'log',
  //     //   name: 'log',
  //     //   meta: {
  //     //     title: '日志记录'
  //     //   },
  //     //   component: () => import('@/view/4disposeManage/log.vue')
  //     // },
  //     // {
  //     //   path: 'authority',
  //     //   name: 'authority',
  //     //   meta: {
  //     //     title: '权限管理',
  //     //     access: ['super_admin']
  //     //   },
  //     //   component: () => import('@/view/4disposeManage/authority.vue')
  //     // },
  //     {
  //       path: "userGroup",
  //       name: "userGroup",
  //       meta: {
  //         title: "用户组管理",
  //         access: ["super_admin"]
  //       },
  //       component: () => import("@/view/4disposeManage/userGroup.vue")
  //     },
  //     {
  //       path: "server",
  //       name: "server",
  //       meta: {
  //         title: "服务器信息"
  //       },
  //       component: () => import("@/view/4disposeManage/server.vue")
  //     }
  //     // {
  //     //   path: "canvas",
  //     //   name: "canvas",
  //     //   meta: {
  //     //     title: "canvas绘图"
  //     //   },
  //     //   component: () => import("@/view/4disposeManage/canvas.vue")
  //     // }
  //   ]
  // },

  // excel
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [

  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },

  {
    path: "/argu",
    name: "argu",
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: "params/:id",
        name: "params",
        meta: {
          icon: "md-flower",
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: "before_close_normal"
        },
        component: () => import("@/view/argu-page/params.vue")
      },
      {
        path: "query",
        name: "query",
        meta: {
          icon: "md-flower",
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import("@/view/argu-page/query.vue")
      }
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/404.vue")
  }
];
