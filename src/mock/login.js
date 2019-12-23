import store from "@/store";
// import { Message } from "iview";

/**
 * 模拟数据
 */

// 用户列表
const USER_MAP = {
  admin: {
    id: null,
    user_id: "1001",
    user_name: "admin",
    display_name: "管理员",
    user_phone: "13112345678",
    user_avator: "",
    user_pwd: "123456",
    user_access: ["admin"],
    userAccess: "admin",
    group_id: "001",
    group_name: "开发组",
    lock_flag: "0"
  },
  proline_leader: {
    id: null,
    user_id: "6bc3842d-e03c-4ba0-ac73-7874c05b55a5",
    user_name: "proline_leader",
    display_name: "产线线长",
    user_phone: "",
    user_avator: "",
    user_pwd: "123456",
    user_access: ["proline_leader"],
    userAccess: "proline_leader",
    group_id: "585c5c93-992f-4d1b-b03c-1f555bdb7643",
    group_name: "测试组",
    lock_flag: "0"
  },
  workshop_manager: {
    id: null,
    user_id: "ed95778b-3578-4a35-94ae-f36fb4792a76",
    user_name: "workshop_manager",
    display_name: "车间主管",
    user_phone: "",
    user_avator: "",
    user_pwd: "123456",
    user_access: ["workshop_manager"],
    userAccess: "workshop_manager",
    group_id: "585c5c93-992f-4d1b-b03c-1f555bdb7643",
    group_name: "测试组",
    lock_flag: "0"
  },
  factor: {
    id: null,
    user_id: "c5c0ecdd-f969-4300-a187-f80a6251b773",
    user_name: "factor",
    display_name: "工程师",
    user_phone: "",
    user_avator: "",
    user_pwd: "123456",
    user_access: ["factor"],
    userAccess: "factor",
    group_id: "585c5c93-992f-4d1b-b03c-1f555bdb7643",
    group_name: "测试组",
    lock_flag: "0"
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
      data: USER_MAP[req.userName].user_name
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
