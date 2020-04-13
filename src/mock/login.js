import store from "@/store";
// mockData
import { userList } from "@/view/3manage/mockData/role"; // 用户列表

/**
 * 模拟数据
 */

// 用户列表
const USER_MAP = {};
userList.forEach(user => {
  USER_MAP[user.userName] = user;
});

/**
 * 模拟事件
 */

// 用户登录 -> 将用户名设置为token
export const login = req => {
  req = JSON.parse(req.body);
  if (USER_MAP[req.userName] !== undefined) {
    if (USER_MAP[req.userName].lockFlag === 0) {
      return {
        status: 200,
        message: "成功！",
        data: USER_MAP[req.userName].userName
      };
    } else {
      return {
        status: 500,
        message: "该用户已被锁定，请登录其他账号解锁",
        data: null
      };
    }
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
