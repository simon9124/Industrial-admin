import store from "@/store";
// import { Message } from "iview";

/**
 * 模拟数据
 */

// 用户列表
const USER_MAP = {
  admin: {
    id: "dea72145-1ff2-42de-ae94-6d936a74ba5c",
    userName: "admin",
    displayName: "管理员",
    phone: "13888888888",
    roles: [
      {
        id: "1",
        title: "管理员",
        name: "admin",
        parenetId: "2",
        parenetPath: "root.2",
        status: 1,
        description: "系统管理员，管理管理中心"
      }
    ],
    lockFlag: 0
  },
  cestc: {
    id: "eec11929-3c60-497b-942c-92a3dd3eeeb5",
    userName: "cestc",
    displayName: "工程师",
    phone: "13801380138",
    roles: [
      {
        id: "2",
        title: "工程师",
        name: "cestc",
        parenetId: "root",
        parenetPath: "root",
        status: 1,
        description: "所有权限"
      }
    ],
    lockFlag: 0
  },
  workshop_manager: {
    id: "75d5298a-2ba8-4308-80d7-cbed61ec420d",
    userName: "workshop_manager",
    displayName: "车间主管",
    phone: "",
    roles: [
      {
        id: "c51f88ccc20a4266be98d5b94851e953",
        title: "车间主管",
        name: "workshop_manager",
        parenetId: "1",
        parenetPath: "root.2.1",
        status: 1,
        description: "管理车间所有产线及生产问题"
      }
    ],
    lockFlag: 0
  },
  proline_leader: {
    id: "57095390-9c42-41d4-ad8b-51f059bc83ac",
    userName: "proline_leader",
    displayName: "产线线长",
    phone: "",
    roles: [
      {
        id: "54e3addd95d44f528c594e266f01a72f",
        title: "产线线长",
        name: "proline_leader",
        parenetId: "c51f88ccc20a4266be98d5b94851e953",
        parenetPath: "root.2.1.c51f88ccc20a4266be98d5b94851e953",
        status: 1,
        description: "测试"
      }
    ],
    lockFlag: 0
  },
  test: {
    id: "9d974bb4-2386-4bb8-98c5-499b95ad025c",
    userName: "test",
    displayName: "检测员",
    phone: "",
    roles: [
      {
        id: "2ce90dcc47ac4e0288139c01bbb11e16",
        title: "检测员",
        name: "test",
        parenetId: null,
        parenetPath: null,
        status: 1,
        description: ""
      }
    ],
    lockFlag: 0
  }
};

/**
 * 模拟事件
 */

// 用户登录 -> 将用户名设置为token
export const login = req => {
  req = JSON.parse(req.body);
  if (USER_MAP[req.userName] !== undefined) {
    return {
      status: 200,
      message: "成功！",
      data: USER_MAP[req.userName].userName
    };
  } else {
    return {
      status: 500,
      message: "用户名或密码错误！",
      data: null
    };
  }
};

// 获取用户信息 -> 用store.state.user.token去查询
export const getUserInfo = req => {
  // console.log(store.state.user.token);
  if (store.state.user.token !== null) {
    return {
      status: 200,
      message: "成功！",
      data: USER_MAP[store.state.user.token]
    };
  }
};

export const logout = req => {
  return null;
};
